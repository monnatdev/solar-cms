/**
 * Tests for Solar Calculator Utility Functions
 * 
 * These tests verify:
 * - Input validation
 * - Calculation accuracy
 * - Edge cases
 * - Error handling
 */

import { describe, it, expect } from 'vitest';
import {
  calculateSolarSystem,
  validateCalculatorInput,
  formatCurrency,
  formatCapacity,
  formatPaybackPeriod,
  CALCULATOR_CONSTANTS,
  LOCATION_MULTIPLIERS,
} from './calculator';
import type { CalculatorFormData } from '@/types/calculator';

describe('validateCalculatorInput', () => {
  it('should accept valid input', () => {
    const input: CalculatorFormData = {
      locationType: 'residential',
      monthlyBill: 3000,
      electricSystem: 'single-phase',
      dayNightRatio: 60,
    };
    const errors = validateCalculatorInput(input);
    expect(errors).toHaveLength(0);
  });

  it('should reject negative monthly bill', () => {
    const input: CalculatorFormData = {
      locationType: 'residential',
      monthlyBill: -100,
      electricSystem: 'single-phase',
      dayNightRatio: 50,
    };
    const errors = validateCalculatorInput(input);
    expect(errors).toHaveLength(1);
    expect(errors[0].field).toBe('monthlyBill');
    expect(errors[0].message).toContain('มากกว่า 0');
  });

  it('should reject zero monthly bill', () => {
    const input: CalculatorFormData = {
      locationType: 'residential',
      monthlyBill: 0,
      electricSystem: 'single-phase',
      dayNightRatio: 50,
    };
    const errors = validateCalculatorInput(input);
    expect(errors).toHaveLength(1);
    expect(errors[0].field).toBe('monthlyBill');
  });

  it('should reject excessively high monthly bill', () => {
    const input: CalculatorFormData = {
      locationType: 'residential',
      monthlyBill: 2000000,
      electricSystem: 'single-phase',
      dayNightRatio: 50,
    };
    const errors = validateCalculatorInput(input);
    expect(errors.some(e => e.field === 'monthlyBill')).toBe(true);
  });

  it('should reject day/night ratio > 100', () => {
    const input: CalculatorFormData = {
      locationType: 'residential',
      monthlyBill: 3000,
      electricSystem: 'single-phase',
      dayNightRatio: 150,
    };
    const errors = validateCalculatorInput(input);
    expect(errors).toHaveLength(1);
    expect(errors[0].field).toBe('dayNightRatio');
    expect(errors[0].message).toContain('0-100%');
  });

  it('should reject day/night ratio < 0', () => {
    const input: CalculatorFormData = {
      locationType: 'residential',
      monthlyBill: 3000,
      electricSystem: 'single-phase',
      dayNightRatio: -10,
    };
    const errors = validateCalculatorInput(input);
    expect(errors).toHaveLength(1);
    expect(errors[0].field).toBe('dayNightRatio');
  });

  it('should reject invalid location type', () => {
    const input = {
      locationType: 'invalid' as any,
      monthlyBill: 3000,
      electricSystem: 'single-phase',
      dayNightRatio: 50,
    };
    const errors = validateCalculatorInput(input);
    expect(errors.some(e => e.field === 'locationType')).toBe(true);
  });

  it('should reject invalid electric system', () => {
    const input = {
      locationType: 'residential',
      monthlyBill: 3000,
      electricSystem: 'invalid' as any,
      dayNightRatio: 50,
    };
    const errors = validateCalculatorInput(input);
    expect(errors.some(e => e.field === 'electricSystem')).toBe(true);
  });

  it('should return multiple errors for multiple invalid fields', () => {
    const input: CalculatorFormData = {
      locationType: 'residential',
      monthlyBill: -100,
      electricSystem: 'single-phase',
      dayNightRatio: 150,
    };
    const errors = validateCalculatorInput(input);
    expect(errors.length).toBeGreaterThan(1);
  });
});

describe('calculateSolarSystem', () => {
  it('should calculate correctly for residential with 60% day usage', () => {
    const input: CalculatorFormData = {
      locationType: 'residential',
      monthlyBill: 3000,
      electricSystem: 'single-phase',
      dayNightRatio: 60,
    };
    const result = calculateSolarSystem(input);

    // All results should be positive
    expect(result.recommendedCapacity).toBeGreaterThan(0);
    expect(result.estimatedCost).toBeGreaterThan(0);
    expect(result.paybackPeriod).toBeGreaterThan(0);
    expect(result.monthlySavings).toBeGreaterThan(0);

    // Verify calculation logic
    const monthlyConsumption = 3000 / CALCULATOR_CONSTANTS.ELECTRICITY_RATE;
    const dailyConsumption = monthlyConsumption / 30;
    const effectiveDailyConsumption = dailyConsumption * 0.6;
    const requiredCapacity = effectiveDailyConsumption / 
      (CALCULATOR_CONSTANTS.PEAK_SUN_HOURS * CALCULATOR_CONSTANTS.SYSTEM_EFFICIENCY);
    const expectedCapacity = Math.ceil(requiredCapacity * LOCATION_MULTIPLIERS.residential * 10) / 10;

    expect(result.recommendedCapacity).toBe(expectedCapacity);
    expect(result.estimatedCost).toBe(Math.round(expectedCapacity * CALCULATOR_CONSTANTS.SOLAR_COST_PER_KW));
  });

  it('should calculate correctly for commercial location', () => {
    const input: CalculatorFormData = {
      locationType: 'commercial',
      monthlyBill: 10000,
      electricSystem: 'three-phase',
      dayNightRatio: 70,
    };
    const result = calculateSolarSystem(input);

    expect(result.recommendedCapacity).toBeGreaterThan(0);
    expect(result.estimatedCost).toBeGreaterThan(0);
    expect(result.paybackPeriod).toBeGreaterThan(0);
    expect(result.monthlySavings).toBeGreaterThan(0);
  });

  it('should calculate correctly for industrial location', () => {
    const input: CalculatorFormData = {
      locationType: 'industrial',
      monthlyBill: 50000,
      electricSystem: 'three-phase',
      dayNightRatio: 80,
    };
    const result = calculateSolarSystem(input);

    expect(result.recommendedCapacity).toBeGreaterThan(0);
    expect(result.estimatedCost).toBeGreaterThan(0);
    expect(result.paybackPeriod).toBeGreaterThan(0);
    expect(result.monthlySavings).toBeGreaterThan(0);
  });

  it('should apply correct location multipliers', () => {
    const baseInput: CalculatorFormData = {
      locationType: 'residential',
      monthlyBill: 5000,
      electricSystem: 'single-phase',
      dayNightRatio: 60,
    };

    const residentialResult = calculateSolarSystem(baseInput);
    const commercialResult = calculateSolarSystem({ ...baseInput, locationType: 'commercial' });
    const industrialResult = calculateSolarSystem({ ...baseInput, locationType: 'industrial' });

    // Commercial should have higher capacity than residential
    expect(commercialResult.recommendedCapacity).toBeGreaterThan(residentialResult.recommendedCapacity);
    
    // Industrial should have higher capacity than commercial
    expect(industrialResult.recommendedCapacity).toBeGreaterThan(commercialResult.recommendedCapacity);
  });

  it('should handle 0% day usage (edge case)', () => {
    const input: CalculatorFormData = {
      locationType: 'residential',
      monthlyBill: 3000,
      electricSystem: 'single-phase',
      dayNightRatio: 0,
    };
    const result = calculateSolarSystem(input);

    // With 0% day usage, capacity should be 0 or very small
    expect(result.recommendedCapacity).toBeGreaterThanOrEqual(0);
  });

  it('should handle 100% day usage', () => {
    const input: CalculatorFormData = {
      locationType: 'residential',
      monthlyBill: 3000,
      electricSystem: 'single-phase',
      dayNightRatio: 100,
    };
    const result = calculateSolarSystem(input);

    expect(result.recommendedCapacity).toBeGreaterThan(0);
    expect(result.estimatedCost).toBeGreaterThan(0);
  });

  it('should throw error for invalid input', () => {
    const input: CalculatorFormData = {
      locationType: 'residential',
      monthlyBill: -100,
      electricSystem: 'single-phase',
      dayNightRatio: 50,
    };

    expect(() => calculateSolarSystem(input)).toThrow('Invalid input');
  });

  it('should return properly rounded values', () => {
    const input: CalculatorFormData = {
      locationType: 'residential',
      monthlyBill: 3333,
      electricSystem: 'single-phase',
      dayNightRatio: 55,
    };
    const result = calculateSolarSystem(input);

    // Capacity should have 1 decimal place
    expect(result.recommendedCapacity).toBe(Math.round(result.recommendedCapacity * 10) / 10);
    
    // Cost should be whole number
    expect(result.estimatedCost).toBe(Math.round(result.estimatedCost));
    
    // Payback period should have 1 decimal place
    expect(result.paybackPeriod).toBe(Math.round(result.paybackPeriod * 10) / 10);
    
    // Savings should be whole number
    expect(result.monthlySavings).toBe(Math.round(result.monthlySavings));
  });

  it('should calculate reasonable payback period', () => {
    const input: CalculatorFormData = {
      locationType: 'residential',
      monthlyBill: 3000,
      electricSystem: 'single-phase',
      dayNightRatio: 60,
    };
    const result = calculateSolarSystem(input);

    // Payback period should be reasonable (typically 5-15 years for solar)
    expect(result.paybackPeriod).toBeGreaterThan(0);
    expect(result.paybackPeriod).toBeLessThan(30); // Should not exceed 30 years
  });

  it('should have consistent cost and savings relationship', () => {
    const input: CalculatorFormData = {
      locationType: 'residential',
      monthlyBill: 5000,
      electricSystem: 'single-phase',
      dayNightRatio: 70,
    };
    const result = calculateSolarSystem(input);

    // Verify payback period calculation
    const annualSavings = result.monthlySavings * 12;
    const calculatedPayback = result.estimatedCost / annualSavings;
    
    // Should be approximately equal (allowing for rounding)
    expect(Math.abs(result.paybackPeriod - calculatedPayback)).toBeLessThan(0.2);
  });
});

describe('formatCurrency', () => {
  it('should format Thai Baht correctly', () => {
    expect(formatCurrency(45000)).toContain('45,000');
    expect(formatCurrency(1000000)).toContain('1,000,000');
  });

  it('should handle zero', () => {
    const result = formatCurrency(0);
    expect(result).toBeDefined();
  });

  it('should not show decimal places', () => {
    const result = formatCurrency(45000.99);
    expect(result).not.toContain('.99');
  });
});

describe('formatCapacity', () => {
  it('should format capacity with kW unit', () => {
    expect(formatCapacity(5.5)).toBe('5.5 kW');
    expect(formatCapacity(10.0)).toBe('10.0 kW');
  });

  it('should show one decimal place', () => {
    expect(formatCapacity(5.567)).toBe('5.6 kW');
  });
});

describe('formatPaybackPeriod', () => {
  it('should format payback period with year unit in Thai', () => {
    expect(formatPaybackPeriod(8.5)).toBe('8.5 ปี');
    expect(formatPaybackPeriod(10.0)).toBe('10.0 ปี');
  });

  it('should show one decimal place', () => {
    expect(formatPaybackPeriod(8.567)).toBe('8.6 ปี');
  });
});

describe('Constants', () => {
  it('should have correct calculator constants', () => {
    expect(CALCULATOR_CONSTANTS.ELECTRICITY_RATE).toBe(4.5);
    expect(CALCULATOR_CONSTANTS.SOLAR_COST_PER_KW).toBe(45000);
    expect(CALCULATOR_CONSTANTS.PEAK_SUN_HOURS).toBe(4.5);
    expect(CALCULATOR_CONSTANTS.SYSTEM_EFFICIENCY).toBe(0.85);
  });

  it('should have correct location multipliers', () => {
    expect(LOCATION_MULTIPLIERS.residential).toBe(1.0);
    expect(LOCATION_MULTIPLIERS.commercial).toBe(1.2);
    expect(LOCATION_MULTIPLIERS.industrial).toBe(1.5);
  });
});
