import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPublishedArticles } from '@/lib/api/articles';
import ArticleCardSimple from '@/components/articles/ArticleCardSimple';
import Breadcrumb from '@/components/common/Breadcrumb';
import { Article } from '@/types/article';

/**
 * Generate metadata for the articles page
 */
export const metadata: Metadata = {
  title: 'บทความ | SolarPro',
  description: 'อ่านบทความและความรู้เกี่ยวกับระบบโซล่าเซลล์ พลังงานแสงอาทิตย์ และเทคโนโลยีพลังงานสะอาด',
};

/**
 * Articles List Page Component
 */
export const dynamic = 'force-dynamic';

export default async function ArticlesPage() {
  let articles: Article[] = [];
  let error: string | null = null;

  // Fetch articles with error handling
  try {
    articles = await getAllPublishedArticles();
  } catch (err) {
    console.error('Error fetching articles:', err);
    error = 'ไม่สามารถโหลดข้อมูลบทความได้ กรุณาลองใหม่อีกครั้ง';
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header with Dark Blue */}
      <header className="bg-[#0F172A] text-white">
        <div className="container mx-auto px-6 py-8">
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: 'หน้าแรก', href: '/' },
              { label: 'บทความและความรู้' },
            ]}
          />
          
          {/* Header Content */}
          <div className="text-center space-y-4 mt-8">
            <h1 className="text-4xl md:text-5xl font-bold">
              บทความและความรู้
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              เรียนรู้เกี่ยวกับระบบโซล่าเซลล์ พลังงานแสงอาทิตย์ และเทคโนโลยีพลังงานสะอาด
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16">
        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <div className="flex items-center justify-center gap-2 text-red-600 mb-2">
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h2 className="text-lg font-semibold">เกิดข้อผิดพลาด</h2>
            </div>
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!error && articles.length === 0 && (
          <div className="bg-gray-50 rounded-lg p-12 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              ยังไม่มีบทความ
            </h2>
            <p className="text-gray-600">
              กรุณาตรวจสอบอีกครั้งในภายหลัง
            </p>
          </div>
        )}

        {/* Articles Grid */}
        {!error && articles.length > 0 && (
          <div className="space-y-8">
            {/* Articles count */}
            <div className="flex items-center justify-between">
              <p className="text-gray-600">
                พบ <span className="font-semibold text-gray-900">{articles.length}</span> บทความ
              </p>
            </div>

            {/* Grid Layout - 3 columns for simpler cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <ArticleCardSimple
                  key={article.id}
                  slug={article.slug}
                  image={typeof article.featuredImage === 'string' ? article.featuredImage : article.featuredImage?.url || 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop'}
                  title={article.title}
                  header={article.header}
                  excerpt={article.excerpt}
                  publishedDate={article.publishedDate}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Call to Action Section */}
      {!error && articles.length > 0 && (
        <section className="bg-gray-50 py-16 mt-16">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              สนใจติดตั้งระบบโซล่าเซลล์?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              ติดต่อเราวันนี้เพื่อรับคำปรึกษาฟรีและคำนวณความคุ้มค่า
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 rounded-lg hover:from-orange-500 hover:via-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg"
            >
              ติดต่อเรา
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
