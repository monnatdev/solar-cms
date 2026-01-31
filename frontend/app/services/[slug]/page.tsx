import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { getServiceBySlug, getAllPublishedServices } from '@/lib/api/services';
import ImageWithFallback from '@/components/common/ImageWithFallback';
import Breadcrumb from '@/components/common/Breadcrumb';

// Code splitting: Dynamically import RichTextRenderer
const RichTextRenderer = dynamic(() => import('@/components/services/RichTextRenderer'), {
  loading: () => (
    <div className="animate-pulse space-y-4">
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      <div className="h-4 bg-gray-200 rounded w-4/6"></div>
    </div>
  ),
  ssr: true,
});

interface ServiceDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  try {
    const services = await getAllPublishedServices();
    return services.map((service) => ({
      slug: service.slug,
    }));
  } catch (error) {
    console.error('Error generating static params for services:', error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  
  try {
    const service = await getServiceBySlug(resolvedParams.slug);

    if (!service) {
      return {
        title: 'ไม่พบบริการ',
        description: 'ไม่พบบริการที่คุณกำลังค้นหา',
      };
    }

    const imageUrl =
      typeof service.featuredImage === 'string'
        ? service.featuredImage
        : service.featuredImage.url || '';

    const metaTitle = service.seo?.metaTitle || service.title;
    const metaDescription =
      service.seo?.metaDescription ||
      `รายละเอียดบริการ ${service.title} - SolarPro`;
    const keywords = service.seo?.keywords || 'โซล่าเซลล์, บริการติดตั้ง, พลังงานแสงอาทิตย์';

    return {
      title: metaTitle,
      description: metaDescription,
      keywords: keywords.split(',').map((k) => k.trim()),
      openGraph: {
        title: metaTitle,
        description: metaDescription,
        type: 'website',
        url: `/services/${resolvedParams.slug}`,
        siteName: 'SolarPro',
        locale: 'th_TH',
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: service.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: metaTitle,
        description: metaDescription,
        images: [imageUrl],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'บริการ',
      description: 'รายละเอียดบริการของเรา',
    };
  }
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const resolvedParams = await params;
  const service = await getServiceBySlug(resolvedParams.slug);

  if (!service) {
    notFound();
  }

  const featuredImageUrl =
    typeof service.featuredImage === 'string'
      ? service.featuredImage
      : service.featuredImage.url || '';

  const featuredImageAlt =
    typeof service.featuredImage === 'string'
      ? service.title
      : service.featuredImage.alt || service.title;

  const galleryImages =
    service.gallery?.map((item) => {
      const imageUrl =
        typeof item.image === 'string' ? item.image : item.image.url || '';
      const imageAlt =
        typeof item.image === 'string' ? service.title : item.image.alt || service.title;
      return { url: imageUrl, alt: imageAlt };
    }) || [];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Navigation with Blue Header */}
      <header className="bg-[#0F172A] text-white">
        <div className="container mx-auto px-6 py-6">
          <Breadcrumb
            items={[
              { label: 'หน้าแรก', href: '/' },
              { label: 'บริการของเรา', href: '/services' },
              { label: service.title },
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
                aria-hidden="true"
              >
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-orange-600 uppercase tracking-wider">
              {service.header}
            </p>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {service.title}
          </h1>

          {/* Featured Image */}
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl bg-gray-100">
            <ImageWithFallback
              src={featuredImageUrl}
              alt={featuredImageAlt}
              className="w-full h-full object-cover"
            />
          </div>
        </header>

        {/* Service Description */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">รายละเอียดบริการ</h2>
          <RichTextRenderer content={service.description} />
        </section>

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
            สนใจบริการนี้?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            ติดต่อเราวันนี้เพื่อรับคำปรึกษาฟรีและใบเสนอราคาสำหรับบริการ {service.title}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/#contact"
              className="inline-block px-8 py-4 bg-white text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              ติดต่อเรา
            </a>
            <Link
              href="/services"
              className="inline-block px-8 py-4 bg-orange-700 text-white font-semibold rounded-lg hover:bg-orange-800 transition-colors duration-200 border-2 border-white"
            >
              ดูบริการอื่นๆ
            </Link>
          </div>
        </section>
      </article>

      {/* Related Services Section */}
      <aside className="bg-gray-50 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            บริการอื่นๆ ที่น่าสนใจ
          </h2>
          <div className="text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-800 font-semibold transition-colors"
            >
              <span>ดูบริการทั้งหมด</span>
              <svg
                className="w-5 h-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
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
