/**
 * Solar Calculator API Route
 * 
 * This API endpoint handles POST requests to calculate solar system specifications
 * based on user input. It validates the input and returns calculation results.
 * 
 * Requirements: 2.5
 */

import { NextRequest, NextResponse } from 'next/server';
import { calculateSolarSystem, validateCalculatorInput } from '@/lib/utils/calculator';
import type { CalculatorFormData, CalculatorResult } from '@/types/calculator';

/**
 * POST /api/calculator
 * 
 * Calculates solar system specifications based on input parameters
 * 
 * @param request - Next.js request object containing calculator input data
 * @returns JSON response with calculation results or error message
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate required fields
    if (!body.locationType || body.monthlyBill === undefined || !body.electricSystem || body.dayNightRatio === undefined) {
      return NextResponse.json(
        {
          error: 'Missing required fields',
          message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
          details: {
            required: ['locationType', 'monthlyBill', 'electricSystem', 'dayNightRatio'],
          },
        },
        { status: 400 }
      );
    }

    // Construct calculator input
    const input: CalculatorFormData = {
      locationType: body.locationType,
      monthlyBill: Number(body.monthlyBill),
      electricSystem: body.electricSystem,
      dayNightRatio: Number(body.dayNightRatio),
    };

    // Validate input
    const validationErrors = validateCalculatorInput(input);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          message: 'ข้อมูลที่กรอกไม่ถูกต้อง',
          details: validationErrors,
        },
        { status: 400 }
      );
    }

    // Calculate solar system specifications
    const result: CalculatorResult = calculateSolarSystem(input);

    // Return successful response
    return NextResponse.json(
      {
        success: true,
        data: result,
      },
      { status: 200 }
    );
  } catch (error) {
    // Handle unexpected errors
    console.error('Calculator API error:', error);

    return NextResponse.json(
      {
        error: 'Internal server error',
        message: 'เกิดข้อผิดพลาดในการคำนวณ กรุณาลองใหม่อีกครั้ง',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/calculator
 * 
 * Returns API information (method not allowed for actual calculations)
 */
export async function GET() {
  return NextResponse.json(
    {
      message: 'Solar Calculator API',
      description: 'Use POST method to calculate solar system specifications',
      endpoint: '/api/calculator',
      method: 'POST',
      requiredFields: {
        locationType: 'residential | commercial | industrial',
        monthlyBill: 'number (THB)',
        electricSystem: 'single-phase | three-phase',
        dayNightRatio: 'number (0-100)',
      },
      responseFields: {
        recommendedCapacity: 'number (kW)',
        estimatedCost: 'number (THB)',
        paybackPeriod: 'number (years)',
        monthlySavings: 'number (THB)',
      },
    },
    { status: 200 }
  );
}
