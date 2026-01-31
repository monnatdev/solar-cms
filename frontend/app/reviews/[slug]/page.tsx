import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getReviewBySlug, getAllPublishedReviews } from '@/lib/api/reviews';
import ImageWithFallback from '@/components/common/ImageWithFallback';
import Breadcrumb from '@/components/common/Breadcrumb';

interface ReviewDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  try {
    const reviews = await getAllPublishedReviews();
    return reviews.map((review) => ({
      slug: review.slug,
    }));
  } catch (error) {
    console.error('Error generating static params for reviews:', error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: ReviewDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  
  try {
    const review = await getReviewBySlug(resolvedParams.slug);

    if (!review) {
      return {
        title: 'ไม่พบผลงาน',
        description: 'ไม่พบผลงานที่คุณกำลังค้นหา',
      };
    }

    const imageUrl =
      typeof review.featuredImage === 'string'
        ? review.featuredImage
        : review.featuredImage.url || '';

    return {
      title: `${review.title} | SolarPro`,
      description: review.description || `ผลงานการติดตั้ง ${review.title}`,
      openGraph: {
        title: review.title,
        description: review.description || `ผลงานการติดตั้ง ${review.title}`,
        type: 'website',
        url: `/reviews/${resolvedParams.slug}`,
        siteName: 'SolarPro',
        locale: 'th_TH',
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: review.title,
          },
        ],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'ผลงาน',
      description: 'ผลงานการติดตั้งของเรา',
    };
  }
}

export default async function ReviewDetailPage({
  params,
}: ReviewDetailPageProps) {
  const resolvedParams = await params;
  const review = await getReviewBySlug(resolvedParams.slug);

  if (!review) {
    notFound();
  }

  const featuredImageUrl =
    typeof review.featuredImage === 'string'
      ? review.featuredImage
      : review.featuredImage.url || '';

  const featuredImageAlt =
    typeof review.featuredImage === 'string'
      ? review.title
      : review.featuredImage.alt || review.title;

  const galleryImages =
    review.gallery?.map((item) => {
      const imageUrl =
        typeof item.image === 'string' ? item.image : item.image.url || '';
      const imageAlt =
        typeof item.image === 'string' ? review.title : item.image.alt || review.title;
      return { url: imageUrl, alt: imageAlt };
    }) || [];

  const relatedService = review.relatedService && typeof review.relatedService !== 'string'
    ? review.relatedService
    : null;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Navigation with Dark Blue Header */}
      <header className="bg-[#0F172A] text-white">
        <div className="container mx-auto px-6 py-6">
          <Breadcrumb
            items={[
              { label: 'หน้าแรก', href: '/' },
              { label: 'ผลงานการติดตั้ง', href: '/reviews' },
              { label: review.title },
            ]}
          />
        </div>
      </header>

      {/* Main Content */}
      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Article Header */}
        <header className="mb-12">
          {/* Header Label */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-orange-600"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-orange-600 uppercase tracking-wider">
              {review.header}
            </p>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {review.title}
          </h1>

          {/* Related Service Link */}
          {relatedService && (
            <div className="mb-6">
              <Link
                href={`/services/${relatedService.slug}`}
                className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                บริการ: {relatedService.title}
              </Link>
            </div>
          )}

          {/* Featured Image */}
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl bg-gray-100">
            <ImageWithFallback
              src={featuredImageUrl}
              alt={featuredImageAlt}
              className="w-full h-full object-cover"
            />
          </div>
        </header>

        {/* Review Description */}
        {review.description && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">รายละเอียดโครงการ</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{review.description}</p>
            </div>
          </section>
        )}

        {/* Image Gallery */}
        {galleryImages.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">แกลเลอรี่</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gray-100"
                >
                  <ImageWithFallback
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    fallbackSrc="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Call to Action Section */}
        <section className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 rounded-2xl p-8 md:p-12 text-center shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ต้องการงานคุณภาพแบบนี้?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            ติดต่อเราวันนี้เพื่อเริ่มโปรเจกต์ของคุณ
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/#contact"
              className="inline-block px-8 py-4 bg-white text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              ติดต่อเรา
            </a>
            {relatedService && (
              <Link
                href={`/services/${relatedService.slug}`}
                className="inline-block px-8 py-4 bg-orange-700 text-white font-semibold rounded-lg hover:bg-orange-800 transition-colors duration-200 border-2 border-white"
              >
                ดูบริการ {relatedService.title}
              </Link>
            )}
          </div>
        </section>
      </article>

      {/* Related Reviews Section */}
      <aside className="bg-gray-50 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            ผลงานอื่นๆ ที่น่าสนใจ
          </h2>
          <div className="text-center">
            <Link
              href="/reviews"
              className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-800 font-semibold transition-colors"
            >
              <span>ดูผลงานทั้งหมด</span>
              <svg
                className="w-5 h-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}
