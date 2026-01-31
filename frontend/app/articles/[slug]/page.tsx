import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { getArticleBySlug, getAllPublishedArticles } from '@/lib/api/articles';
import ImageWithFallback from '@/components/common/ImageWithFallback';
import Breadcrumb from '@/components/common/Breadcrumb';

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

interface ArticleDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  try {
    const articles = await getAllPublishedArticles();
    return articles.map((article) => ({
      slug: article.slug,
    }));
  } catch (error) {
    console.error('Error generating static params for articles:', error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: ArticleDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  
  try {
    const article = await getArticleBySlug(resolvedParams.slug);

    if (!article) {
      return {
        title: 'ไม่พบบทความ',
        description: 'ไม่พบบทความที่คุณกำลังค้นหา',
      };
    }

    const imageUrl =
      typeof article.featuredImage === 'string'
        ? article.featuredImage
        : article.featuredImage.url || '';

    const metaTitle = article.seo?.metaTitle || article.title;
    const metaDescription =
      article.seo?.metaDescription ||
      article.excerpt ||
      `อ่านบทความ ${article.title} - SolarPro`;
    const keywords = article.seo?.keywords || 'โซล่าเซลล์, พลังงานแสงอาทิตย์, บทความ';

    return {
      title: metaTitle,
      description: metaDescription,
      keywords: keywords.split(',').map((k) => k.trim()),
      openGraph: {
        title: metaTitle,
        description: metaDescription,
        type: 'article',
        publishedTime: article.publishedDate,
        url: `/articles/${resolvedParams.slug}`,
        siteName: 'SolarPro',
        locale: 'th_TH',
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: article.title,
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
      title: 'บทความ',
      description: 'อ่านบทความของเรา',
    };
  }
}

function formatThaiDate(dateString: string): string {
  const date = new Date(dateString);
  const thaiMonths = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ];
  
  const day = date.getDate();
  const month = thaiMonths[date.getMonth()];
  const year = date.getFullYear() + 543;
  
  return `${day} ${month} ${year}`;
}

export default async function ArticleDetailPage({
  params,
}: ArticleDetailPageProps) {
  const resolvedParams = await params;
  const article = await getArticleBySlug(resolvedParams.slug);

  if (!article) {
    notFound();
  }

  const featuredImageUrl =
    typeof article.featuredImage === 'string'
      ? article.featuredImage
      : article.featuredImage.url || '';

  const featuredImageAlt =
    typeof article.featuredImage === 'string'
      ? article.title
      : article.featuredImage.alt || article.title;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Navigation with Blue Header */}
      <header className="bg-[#0F172A] text-white">
        <div className="container mx-auto px-6 py-6">
          <Breadcrumb
            items={[
              { label: 'หน้าแรก', href: '/' },
              { label: 'บทความและความรู้', href: '/articles' },
              { label: article.title },
            ]}
          />
        </div>
      </header>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-orange-600 uppercase tracking-wider">
              {article.header}
            </p>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Published Date */}
          <div className="flex items-center text-gray-600 mb-8">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <time dateTime={article.publishedDate}>
              {formatThaiDate(article.publishedDate)}
            </time>
          </div>

          {/* Featured Image */}
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl bg-gray-100 mb-8">
            <ImageWithFallback
              src={featuredImageUrl}
              alt={featuredImageAlt}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Excerpt */}
          {article.excerpt && (
            <p className="text-xl text-gray-700 leading-relaxed border-l-4 border-orange-500 pl-6 italic">
              {article.excerpt}
            </p>
          )}
        </header>

        {/* Article Content */}
        <section className="prose prose-lg max-w-none mb-12">
          <RichTextRenderer content={article.content} />
        </section>

        {/* Call to Action Section */}
        <section className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 rounded-2xl p-8 md:p-12 text-center shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            สนใจติดตั้งระบบโซล่าเซลล์?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            ติดต่อเราวันนี้เพื่อรับคำปรึกษาฟรีและคำนวณความคุ้มค่า
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/#contact"
              className="inline-block px-8 py-4 bg-white text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              ติดต่อเรา
            </a>
            <Link
              href="/articles"
              className="inline-block px-8 py-4 bg-orange-700 text-white font-semibold rounded-lg hover:bg-orange-800 transition-colors duration-200 border-2 border-white"
            >
              อ่านบทความอื่นๆ
            </Link>
          </div>
        </section>
      </article>

      {/* Related Articles Section */}
      <aside className="bg-gray-50 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            บทความอื่นๆ ที่น่าสนใจ
          </h2>
          <div className="text-center">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-800 font-semibold transition-colors"
            >
              <span>ดูบทความทั้งหมด</span>
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
