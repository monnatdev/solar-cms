import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          ไม่พบผลงานที่คุณกำลังค้นหา
        </h2>
        <p className="text-gray-600 mb-8">
          ผลงานที่คุณกำลังมองหาอาจถูกลบหรือย้ายไปแล้ว
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/reviews"
            className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
          >
            ดูผลงานทั้งหมด
          </Link>
          <Link
            href="/"
            className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
          >
            กลับหน้าแรก
          </Link>
        </div>
      </div>
    </div>
  );
}
