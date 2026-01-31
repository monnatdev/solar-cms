'use client';

import { useState } from 'react';
import {
  calculateSolarSystem,
  validateCalculatorInput,
  formatCurrency,
  formatCapacity,
  formatPaybackPeriod,
} from '@/lib/utils/calculator';
import type { CalculatorFormData, CalculatorResult, LocationType, ElectricSystem } from '@/types/calculator';

export default function SolarCalculator() {
  const [formData, setFormData] = useState<CalculatorFormData>({
    locationType: 'residential',
    monthlyBill: 3000,
    electricSystem: 'single-phase',
    dayNightRatio: 60,
  });

  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleLocationChange = (location: LocationType) => {
    setFormData({ ...formData, locationType: location });
    setResult(null);
    setError(null);
  };

  const handleElectricSystemChange = (system: ElectricSystem) => {
    setFormData({ ...formData, electricSystem: system });
    setResult(null);
    setError(null);
  };

  const handleMonthlyBillChange = (value: string) => {
    // If empty string, set to empty (will show placeholder)
    if (value === '') {
      setFormData({ ...formData, monthlyBill: 0 });
      setResult(null);
      setError(null);
      return;
    }
    
    // Remove all leading zeros
    const cleanValue = value.replace(/^0+/, '');
    
    // If after removing zeros we have empty string, it means user typed only zeros
    if (cleanValue === '') {
      setFormData({ ...formData, monthlyBill: 0 });
      setResult(null);
      setError(null);
      return;
    }
    
    // Convert to number
    const numValue = parseFloat(cleanValue) || 0;
    setFormData({ ...formData, monthlyBill: numValue });
    setResult(null);
    setError(null);
  };

  const handleDayNightRatioChange = (value: number) => {
    setFormData({ ...formData, dayNightRatio: value });
    setResult(null);
    setError(null);
  };

  const handleCalculate = () => {
    setIsCalculating(true);
    setError(null);

    // Validate input
    const validationErrors = validateCalculatorInput(formData);
    if (validationErrors.length > 0) {
      setError(validationErrors[0].message);
      setIsCalculating(false);
      return;
    }

    try {
      // Calculate result
      const calculationResult = calculateSolarSystem(formData);
      setResult(calculationResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'เกิดข้อผิดพลาดในการคำนวณ');
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <section id="calculator" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              คำนวณความคุ้มค่าโซล่าเซลล์
            </h2>
            <p className="text-lg text-gray-600">
              กรอกข้อมูลเพื่อประเมินขนาดระบบและความคุ้มค่าในการติดตั้งโซล่าเซลล์
            </p>
          </div>

          {/* Calculator Form */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
            {/* Location Type - Only 2 choices */}
            <div className="mb-8">
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                ประเภทสถานที่ติดตั้ง
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { 
                    value: 'residential' as LocationType, 
                    label: 'ที่อยู่อาศัย',
                    icon: (
                      <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    )
                  },
                  { 
                    value: 'industrial' as LocationType, 
                    label: 'โรงงานและธุรกิจ',
                    icon: (
                      <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    )
                  },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleLocationChange(option.value)}
                    className={`p-6 rounded-xl border-2 transition-all duration-200 flex flex-col items-center gap-3 ${
                      formData.locationType === option.value
                        ? 'border-orange-400 bg-orange-50 shadow-md'
                        : 'border-gray-200 hover:border-orange-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className={formData.locationType === option.value ? 'text-orange-500' : 'text-gray-600'}>
                      {option.icon}
                    </div>
                    <div className="font-medium text-gray-900 text-center">{option.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Monthly Bill */}
            <div className="mb-8">
              <label htmlFor="monthlyBill" className="block text-lg font-semibold text-gray-900 mb-4">
                ค่าไฟฟ้าต่อเดือน (บาท)
              </label>
              <input
                id="monthlyBill"
                type="number"
                min="0"
                step="100"
                value={formData.monthlyBill === 0 ? '' : formData.monthlyBill}
                onChange={(e) => handleMonthlyBillChange(e.target.value)}
                className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                placeholder="กรอกค่าไฟฟ้าต่อเดือน"
              />
              <p className="mt-2 text-sm text-gray-500">
                ค่าไฟฟ้าเฉลี่ยต่อเดือนจากบิลไฟฟ้าของคุณ
              </p>
            </div>

            {/* Electric System */}
            <div className="mb-8">
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                ระบบไฟฟ้า
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { value: 'single-phase' as ElectricSystem, label: 'ไฟฟ้า 1 เฟส', description: 'สำหรับบ้านพักอาศัยทั่วไป' },
                  { value: 'three-phase' as ElectricSystem, label: 'ไฟฟ้า 3 เฟส', description: 'สำหรับอาคารพาณิชย์และโรงงาน' },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleElectricSystemChange(option.value)}
                    className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                      formData.electricSystem === option.value
                        ? 'border-orange-400 bg-orange-50 shadow-md'
                        : 'border-gray-200 hover:border-orange-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-medium text-gray-900 mb-1">{option.label}</div>
                    <div className="text-sm text-gray-600">{option.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Day/Night Ratio Slider */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <label htmlFor="dayNightRatio" className="text-lg font-semibold text-gray-900">
                  สัดส่วนการใช้ไฟกลางวัน
                </label>
                <span className="text-2xl font-bold text-orange-500">{formData.dayNightRatio}%</span>
              </div>
              <div className="relative">
                <input
                  id="dayNightRatio"
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={formData.dayNightRatio}
                  onChange={(e) => handleDayNightRatioChange(parseInt(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #FFA726 0%, #FFA726 ${formData.dayNightRatio}%, #e5e7eb ${formData.dayNightRatio}%, #e5e7eb 100%)`,
                  }}
                />
                <div className="flex justify-between mt-3 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                    0% (ใช้กลางคืนทั้งหมด)
                  </span>
                  <span className="flex items-center gap-1">
                    100% (ใช้กลางวันทั้งหมด)
                    <svg className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-500">
                ระบุสัดส่วนการใช้ไฟฟ้าในช่วงกลางวัน (06:00-18:00) เพื่อประเมินประสิทธิภาพโซล่าเซลล์
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {/* Calculate Button */}
            <button
              type="button"
              onClick={handleCalculate}
              disabled={isCalculating}
              className="w-full py-4 px-6 text-lg font-semibold text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 rounded-lg hover:from-orange-500 hover:via-orange-600 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
            >
              {isCalculating ? 'กำลังคำนวณ...' : 'คำนวณความคุ้มค่า'}
            </button>

            {/* Results */}
            {result && (
              <div className="mt-8 pt-8 border-t-2 border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  ผลการคำนวณ
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Recommended Capacity */}
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
                    <div className="text-sm font-medium text-orange-600 mb-2">ขนาดระบบที่แนะนำ</div>
                    <div className="text-3xl font-bold text-gray-900">
                      {formatCapacity(result.recommendedCapacity)}
                    </div>
                  </div>

                  {/* Estimated Cost */}
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
                    <div className="text-sm font-medium text-orange-600 mb-2">ค่าใช้จ่ายโดยประมาณ</div>
                    <div className="text-3xl font-bold text-gray-900">
                      {formatCurrency(result.estimatedCost)}
                    </div>
                  </div>

                  {/* Monthly Savings */}
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
                    <div className="text-sm font-medium text-orange-600 mb-2">ประหยัดต่อเดือน</div>
                    <div className="text-3xl font-bold text-gray-900">
                      {formatCurrency(result.monthlySavings)}
                    </div>
                  </div>

                  {/* Payback Period */}
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
                    <div className="text-sm font-medium text-orange-600 mb-2">ระยะเวลาคืนทุน</div>
                    <div className="text-3xl font-bold text-gray-900">
                      {formatPaybackPeriod(result.paybackPeriod)}
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="mt-6 p-4 bg-orange-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>หมายเหตุ:</strong> ผลการคำนวณเป็นเพียงการประมาณการเบื้องต้น 
                    ค่าใช้จ่ายและผลประหยัดจริงอาจแตกต่างกันไปตามสภาพพื้นที่ติดตั้ง 
                    คุณภาพอุปกรณ์ และปัจจัยอื่นๆ กรุณาติดต่อเราเพื่อรับคำปรึกษาและใบเสนอราคาที่แม่นยำ
                  </p>
                </div>

                {/* CTA Button */}
                <div className="mt-6 text-center">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 rounded-lg hover:from-orange-500 hover:via-orange-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    ติดต่อขอใบเสนอราคา
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
