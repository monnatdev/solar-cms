/**
 * Solar Calculator Utility Functions
 * 
 * This module contains the core calculation logic for the Solar Calculator feature.
 * It implements the formula specified in the design document to calculate:
 * - Recommended solar system capacity
 * - Estimated installation cost
 * - Payback period
 * - Monthly savings
 * 
 * Requirements: 2.5, 2.6
 */

import type {
  CalculatorFormData,
  CalculatorResult,
  CalculatorConstants,
  LocationMultipliers,
  CalculatorValidationError,
  LocationType,
} from '@/types/calculator';

/**
 * Constants for solar system calculations
 * These values are static and cannot be modified through CMS
 */
export const CALCULATOR_CONSTANTS: CalculatorConstants = {
  ELECTRICITY_RATE: 4.5, // THB per kWh (average rate in Thailand)
  SOLAR_COST_PER_KW: 45000, // THB per kW installed
  PEAK_SUN_HOURS: 4.5, // hours per day (Thailand average)
  SYSTEM_EFFICIENCY: 0.85, // 85% efficiency
};

/**
 * Location multipliers for different installation types
 * These adjust the recommended capacity based on location characteristics
 */
export const LOCATION_MULTIPLIERS: LocationMultipliers = {
  residential: 1.0,
  commercial: 1.2,
  industrial: 1.5,
};

/**
 * Validates calculator input data
 * 
 * @param input - The calculator form data to validate
 * @returns Array of validation errors (empty if valid)
 */
export function validateCalculatorInput(
  input: CalculatorFormData
): CalculatorValidationError[] {
  const errors: CalculatorValidationError[] = [];

  // Validate monthly bill
  if (input.monthlyBill <= 0) {
    errors.push({
      field: 'monthlyBill',
      message: 'กรุณากรอกค่าไฟฟ้าที่มากกว่า 0',
    });
  }

  if (input.monthlyBill > 1000000) {
    errors.push({
      field: 'monthlyBill',
      message: 'ค่าไฟฟ้าสูงเกินไป กรุณาตรวจสอบอีกครั้ง',
    });
  }

  // Validate day/night ratio
  if (input.dayNightRatio < 0 || input.dayNightRatio > 100) {
    errors.push({
      field: 'dayNightRatio',
      message: 'สัดส่วนการใช้ไฟต้องอยู่ระหว่าง 0-100%',
    });
  }

  // Validate location type
  const validLocationTypes: LocationType[] = ['residential', 'commercial', 'industrial'];
  if (!validLocationTypes.includes(input.locationType)) {
    errors.push({
      field: 'locationType',
      message: 'กรุณาเลือกประเภทสถานที่ติดตั้ง',
    });
  }

  // Validate electric system
  const validElectricSystems = ['single-phase', 'three-phase'];
  if (!validElectricSystems.includes(input.electricSystem)) {
    errors.push({
      field: 'electricSystem',
      message: 'กรุณาเลือกระบบไฟฟ้า',
    });
  }

  return errors;
}

/**
 * Calculates solar system specifications based on input parameters
 * 
 * This function implements the formula from the design document:
 * 1. Calculate daily consumption from monthly bill
 * 2. Adjust for day/night usage ratio
 * 3. Calculate required capacity based on peak sun hours and efficiency
 * 4. Apply location multiplier
 * 5. Calculate costs and savings
 * 6. Calculate payback period
 * 
 * @param input - The calculator form data
 * @returns Calculation results with recommended capacity, cost, payback period, and savings
 * @throws Error if input validation fails
 */
export function calculateSolarSystem(
  input: CalculatorFormData
): CalculatorResult {
  // Validate input first
  const validationErrors = validateCalculatorInput(input);
  if (validationErrors.length > 0) {
    throw new Error(
      `Invalid input: ${validationErrors.map((e) => e.message).join(', ')}`
    );
  }

  const {
    ELECTRICITY_RATE,
    SOLAR_COST_PER_KW,
    PEAK_SUN_HOURS,
    SYSTEM_EFFICIENCY,
  } = CALCULATOR_CONSTANTS;

  // Step 1: Calculate daily consumption
  const monthlyConsumption = input.monthlyBill / ELECTRICITY_RATE; // kWh
  const dailyConsumption = monthlyConsumption / 30; // kWh per day

  // Step 2: Adjust for day/night ratio
  // Only the daytime usage can be offset by solar panels
  const dayUsageRatio = input.dayNightRatio / 100;
  const effectiveDailyConsumption = dailyConsumption * dayUsageRatio;

  // Step 3: Calculate required capacity
  // Capacity = Daily Consumption / (Peak Sun Hours × Efficiency)
  const requiredCapacity =
    effectiveDailyConsumption / (PEAK_SUN_HOURS * SYSTEM_EFFICIENCY);

  // Step 4: Apply location multiplier
  const locationMultiplier = LOCATION_MULTIPLIERS[input.locationType];
  const recommendedCapacity = requiredCapacity * locationMultiplier;

  // Round to 0.1 kW (one decimal place)
  const roundedCapacity = Math.ceil(recommendedCapacity * 10) / 10;

  // Step 5: Calculate costs
  const estimatedCost = roundedCapacity * SOLAR_COST_PER_KW;

  // Step 6: Calculate savings
  // Daily generation = Capacity × Peak Sun Hours × Efficiency
  const dailyGeneration = roundedCapacity * PEAK_SUN_HOURS * SYSTEM_EFFICIENCY;
  const monthlySavings = dailyGeneration * 30 * ELECTRICITY_RATE;

  // Step 7: Calculate payback period
  // Payback Period = Total Cost / Annual Savings
  const annualSavings = monthlySavings * 12;
  const paybackPeriod = estimatedCost / annualSavings;

  // Return results with proper rounding
  return {
    recommendedCapacity: Math.round(roundedCapacity * 10) / 10, // 1 decimal place
    estimatedCost: Math.round(estimatedCost), // Whole number
    paybackPeriod: Math.round(paybackPeriod * 10) / 10, // 1 decimal place
    monthlySavings: Math.round(monthlySavings), // Whole number
  };
}

/**
 * Formats currency value to Thai Baht string
 * 
 * @param amount - The amount in THB
 * @returns Formatted string with comma separators
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Formats capacity value with unit
 * 
 * @param capacity - The capacity in kW
 * @returns Formatted string with unit
 */
export function formatCapacity(capacity: number): string {
  return `${capacity.toFixed(1)} kW`;
}

/**
 * Formats payback period with unit
 * 
 * @param years - The payback period in years
 * @returns Formatted string with unit
 */
export function formatPaybackPeriod(years: number): string {
  return `${years.toFixed(1)} ปี`;
}
