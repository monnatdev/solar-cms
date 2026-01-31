import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPublishedReviews } from '@/lib/api/reviews';
import ReviewCardSimple from '@/components/reviews/ReviewCardSimple';
import Breadcrumb from '@/components/common/Breadcrumb';
import { Review } from '@/types/review';

export const metadata: Metadata = {
  title: 'ผลงานการติดตั้ง | SolarPro',
  description: 'ชมผลงานการติดตั้งโซล่าเซลล์ล่าสุดของเรา',
};

function transformReviewToCardProps(review: Review) {
  const imageUrl = typeof review.featuredImage === 'string' 
    ? review.featuredImage 
    : review.featuredImage.url || '';

  const relatedService = review.relatedService && typeof review.relatedService !== 'string'
    ? {
        id: review.relatedService.id,
        title: review.relatedService.title,
        slug: review.relatedService.slug,
      }
    : undefined;

  return {
    id: review.id,
    image: imageUrl,
    header: review.header,
    title: review.title,
    relatedService,
  };
}

export const dynamic = 'force-dynamic';

export default async function ReviewsPage() {
  let reviews: Review[] = [];
  let error: string | null = null;

  try {
    reviews = await getAllPublishedReviews();
  } catch (err) {
    console.error('Error fetching reviews:', err);
    error = 'Unable to load reviews. Please try again later.';
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
              { label: 'ผลงานการติดตั้ง' },
            ]}
          />
          
          {/* Header Content */}
          <div className="text-center space-y-4 mt-8">
            <h1 className="text-4xl md:text-5xl font-bold">
              ผลงานการติดตั้ง
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              ชมผลงานการติดตั้งโซล่าเซลล์ล่าสุดของเรา
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {!error && reviews.length === 0 && (
          <div className="bg-gray-50 rounded-lg p-12 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">ยังไม่มีผลงาน</h2>
            <p className="text-gray-600">กรุณาตรวจสอบอีกครั้งในภายหลัง</p>
          </div>
        )}

        {!error && reviews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((review) => (
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
        )}
      </main>

      {/* CTA Section */}
      {!error && reviews.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ต้องการงานคุณภาพแบบนี้?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              ติดต่อเราวันนี้เพื่อเริ่มโปรเจกต์ของคุณ
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
