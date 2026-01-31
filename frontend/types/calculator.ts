/**
 * Solar Calculator types
 */

/**
 * Location type for solar installation
 */
export type LocationType = 'residential' | 'commercial' | 'industrial';

/**
 * Electric system type
 */
export type ElectricSystem = 'single-phase' | 'three-phase';

/**
 * Calculator form input data
 */
export interface CalculatorFormData {
  locationType: LocationType;
  monthlyBill: number;
  electricSystem: ElectricSystem;
  dayNightRatio: number; // 0-100 (percentage of day usage)
}

/**
 * Calculator result
 */
export interface CalculatorResult {
  recommendedCapacity: number; // kW
  estimatedCost: number; // THB
  paybackPeriod: number; // years
  monthlySavings: number; // THB
}

/**
 * Calculator constants (used in calculation logic)
 */
export interface CalculatorConstants {
  ELECTRICITY_RATE: number; // THB per kWh
  SOLAR_COST_PER_KW: number; // THB per kW installed
  PEAK_SUN_HOURS: number; // hours per day
  SYSTEM_EFFICIENCY: number; // 0-1 (e.g., 0.85 = 85%)
}

/**
 * Location multipliers for different installation types
 */
export interface LocationMultipliers {
  residential: number;
  commercial: number;
  industrial: number;
}

/**
 * Calculator validation error
 */
export interface CalculatorValidationError {
  field: keyof CalculatorFormData;
  message: string;
}
