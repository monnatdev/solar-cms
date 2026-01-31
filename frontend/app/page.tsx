import dynamic from 'next/dynamic';
import Link from 'next/link';
import HeroSection from '@/components/home/HeroSection';
import { getAllPublishedServices } from '@/lib/api/services';
import { getAllPublishedReviews } from '@/lib/api/reviews';
import { getAllPublishedArticles } from '@/lib/api/articles';
import ServiceCardSimple from '@/components/services/ServiceCardSimple';
import ReviewCardSimple from '@/components/reviews/ReviewCardSimple';
import ArticleCardSimple from '@/components/articles/ArticleCardSimple';

// Code splitting: Dynamically import heavy client components
const SolarCalculator = dynamic(() => import('@/components/home/SolarCalculator'), {
  loading: () => (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  ),
});

const LeadForm = dynamic(() => import('@/components/forms/LeadForm'), {
  loading: () => (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  ),
});

export default async function Home() {
  // Fetch content for home page
  let services = [];
  let reviews = [];
  let articles = [];

  try {
    [services, reviews, articles] = await Promise.all([
      getAllPublishedServices(),
      getAllPublishedReviews(),
      getAllPublishedArticles(),
    ]);
  } catch (error) {
    console.error('Error fetching content:', error);
  }

  // Limit to 3 items each for home page
  const featuredServices = services.slice(0, 3);
  const featuredReviews = reviews.slice(0, 4);
  const featuredArticles = articles.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        header="พลังงานสะอาดเพื่ออนาคต"
        title="โซล่าเซลล์"
        description="เปลี่ยนบ้านหรือธุรกิจของคุณด้วยพลังงานสะอาดและหมุนเวียน ประหยัดค่าไฟ เพิ่มมูลค่าอสังหาริมทรัพย์ และลดการปล่อยคาร์บอน"
        media={{
          type: 'image',
          url: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop',
          alt: 'แผงโซล่าเซลล์บนหลังคาพร้อมท้องฟ้าสีฟ้า',
        }}
      />

      {/* Solar Calculator Section */}
      <section id="calculator" className="py-16 bg-gray-50">
        <SolarCalculator />
      </section>

      {/* Our Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              บริการของเรา
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              โซลูชั่นโซล่าเซลล์ครบวงจรสำหรับทุกความต้องการ
            </p>
          </div>

          {featuredServices.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                {featuredServices.map((service) => (
                  <ServiceCardSimple
                    key={service.id}
                    slug={service.slug}
                    image={typeof service.featuredImage === 'string' ? service.featuredImage : service.featuredImage?.url || 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop'}
                    title={service.title}
                    header={service.header}
                  />
                ))}
              </div>

              <div className="text-center">
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
                >
                  ดูบริการทั้งหมด
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">ยังไม่มีบริการ</h3>
              <p className="text-gray-600">กำลังเตรียมข้อมูลบริการสำหรับคุณ</p>
            </div>
          )}
        </div>
      </section>

      {/* Installation Portfolio Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ผลงานการติดตั้ง
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              ชมผลงานการติดตั้งโซล่าเซลล์ล่าสุดของเรา
            </p>
          </div>

          {featuredReviews.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {featuredReviews.map((review) => (
                  <ReviewCardSimple
                    key={review.id}
                    slug={review.slug}
                    image={typeof review.featuredImage === 'string' ? review.featuredImage : review.featuredImage?.url || 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop'}
                    header={review.header}
                    title={review.title}
                    relatedService={review.relatedService && typeof review.relatedService !== 'string' ? {
                      title: review.relatedService.title,
                      slug: review.relatedService.slug,
                    } : undefined}
                  />
                ))}
              </div>

              <div className="text-center">
                <Link
                  href="/reviews"
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
                >
                  ดูผลงานทั้งหมด
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">ยังไม่มีผลงาน</h3>
              <p className="text-gray-600">กำลังเตรียมข้อมูลผลงานสำหรับคุณ</p>
            </div>
          )}
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              บทความล่าสุด
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              ติดตามข้อมูลและความรู้เกี่ยวกับพลังงานโซล่าเซลล์
            </p>
          </div>

          {featuredArticles.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                {featuredArticles.map((article) => (
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

              <div className="text-center">
                <Link
                  href="/articles"
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
                >
                  ดูบทความทั้งหมด
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">ยังไม่มีบทความ</h3>
              <p className="text-gray-600">กำลังเตรียมข้อมูลบทความสำหรับคุณ</p>
            </div>
          )}
        </div>
      </section>

      {/* Lead Form Section */}
      <LeadForm />
    </div>
  );
}
