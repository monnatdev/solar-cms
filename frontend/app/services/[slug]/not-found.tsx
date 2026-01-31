/**
 * Not Found Page for Service Detail
 * 
 * Displayed when a service with the given slug is not found
 */

import Link from 'next/link';

export default function ServiceNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-blue-100">
            <svg
              className="w-12 h-12 text-blue-600"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          ไม่พบบริการ
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          ขออภัย เราไม่พบบริการที่คุณกำลังค้นหา บริการนี้อาจถูกลบหรือย้ายไปแล้ว
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/services"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            ดูบริการทั้งหมด
          </Link>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-colors duration-200"
          >
            กลับหน้าแรก
          </Link>
        </div>
      </div>
    </div>
  );
}
