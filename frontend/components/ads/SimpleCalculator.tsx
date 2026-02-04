'use client';

import { useState } from 'react';
import { TrendingUp, Zap, DollarSign, Calendar } from 'lucide-react';

export default function SimpleCalculator() {
  const [monthlyBill, setMonthlyBill] = useState<string>('');
  const [result, setResult] = useState<{
    systemSize: number;
    monthlySavings: number;
    yearlySavings: number;
    estimatedCost: number;
    paybackYears: number;
  } | null>(null);

  const calculateSavings = () => {
    const bill = parseFloat(monthlyBill);
    if (!bill || bill <= 0) {
      alert('กรุณาใส่ค่าไฟที่ถูกต้อง');
      return;
    }

    // คำนวณตามสูตร
    // สมมติใช้ไฟ 60% ในเวลากลางวัน
    const dayUsagePercent = 0.6;
    
    // คำนวณขนาดระบบ (3.0 kW สำหรับค่าไฟ ~3000 บาท)
    const systemSize = Math.round((bill / 1000) * 10) / 10; // ประมาณ 1 kW ต่อ 1000 บาท
    
    // คำนวณการประหยัด (60% ของค่าไฟ)
    const savingsPercent = dayUsagePercent;
    const monthlySavings = Math.round(bill * savingsPercent);
    const yearlySavings = monthlySavings * 12;
    
    // ราคาติดตั้ง (ประมาณ 50,000 บาทต่อ kW)
    const pricePerKW = 50000;
    const estimatedCost = Math.round(systemSize * pricePerKW);
    
    // คำนวณระยะเวลาคืนทุน
    const paybackYears = parseFloat((estimatedCost / yearlySavings).toFixed(1));

    setResult({
      systemSize,
      monthlySavings,
      yearlySavings,
      estimatedCost,
      paybackYears,
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('th-TH').format(amount);
  };

  return (
    <div className="space-y-8">
      {/* Input Section */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="space-y-6">
          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-3">
              ค่าไฟฟ้าต่อเดือนของคุณ (บาท)
            </label>
            <input
              type="number"
              value={monthlyBill}
              onChange={(e) => setMonthlyBill(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  calculateSavings();
                }
              }}
              placeholder="เช่น 3,000"
              className="w-full px-6 py-4 text-2xl font-bold text-center border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
            />
            <p className="mt-2 text-sm text-gray-500 text-center">
              ดูจากบิลค่าไฟฟ้าของคุณ
            </p>
          </div>

          <button
            onClick={calculateSavings}
            className="w-full py-4 px-6 text-lg font-semibold text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 rounded-lg hover:from-orange-500 hover:via-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            คำนวณเลย
          </button>
        </div>
      </div>

      {/* Results Section */}
      {result && (
        <div className="space-y-6 animate-fade-in">
          {/* Main Result */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-8 border-2 border-orange-200">
            <div className="text-center">
              <p className="text-sm font-medium text-orange-600 mb-2">คุณจะประหยัดได้</p>
              <p className="text-5xl font-bold text-orange-600 mb-2">
                {formatCurrency(result.monthlySavings)} บาท
              </p>
              <p className="text-lg text-gray-700">ต่อเดือน</p>
              <div className="mt-4 pt-4 border-t border-orange-200">
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(result.yearlySavings)} บาท/ปี
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* System Size */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-1">ขนาดระบบที่แนะนำ</p>
                  <p className="text-2xl font-bold text-gray-900">{result.systemSize} kW</p>
                  <p className="text-xs text-gray-500 mt-1">เหมาะสมกับการใช้ไฟของคุณ</p>
                </div>
              </div>
            </div>

            {/* Estimated Cost */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-1">ค่าใช้จ่ายโดยประมาณ</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(result.estimatedCost)} บาท</p>
                  <p className="text-xs text-gray-500 mt-1">รวมติดตั้งและอุปกรณ์</p>
                </div>
              </div>
            </div>

            {/* Payback Period */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-50 rounded-lg">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-1">ระยะเวลาคืนทุน</p>
                  <p className="text-2xl font-bold text-gray-900">{result.paybackYears} ปี</p>
                  <p className="text-xs text-gray-500 mt-1">หลังจากนั้นเป็นกำไรสุทธิ</p>
                </div>
              </div>
            </div>

            {/* Lifetime Savings */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-orange-50 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-1">ประหยัดรวม 25 ปี</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(result.yearlySavings * 25)} บาท
                  </p>
                  <p className="text-xs text-gray-500 mt-1">ตลอดอายุการใช้งาน</p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900 mb-2">หมายเหตุ:</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• การคำนวณนี้สมมติว่าคุณใช้ไฟ 60% ในเวลากลางวัน</li>
                  <li>• ผลลัพธ์เป็นการประมาณการเบื้องต้น</li>
                  <li>• ค่าใช้จ่ายจริงขึ้นอยู่กับสภาพพื้นที่และอุปกรณ์ที่เลือก</li>
                  <li>• ติดต่อเราเพื่อรับใบเสนอราคาที่แม่นยำ</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 rounded-lg hover:from-orange-500 hover:via-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              ขอใบเสนอราคาฟรี
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
