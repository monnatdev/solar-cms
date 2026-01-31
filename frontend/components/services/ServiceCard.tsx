import Image from 'next/image';
import Link from 'next/link';
import { ServiceCardProps } from '@/types/service';
import { getImageAlt, getLoadingAttribute } from '@/lib/utils/image';
import { IMAGE_CONFIG } from '@/lib/constants/config';

interface ServiceCardComponentProps extends ServiceCardProps {
  index?: number;
  priority?: boolean;
}

export default function ServiceCard({
  id,
  image,
  header,
  title,
  slug,
  index = 0,
  priority = false,
}: ServiceCardComponentProps) {
  const loading = priority ? 'eager' : getLoadingAttribute(index, IMAGE_CONFIG.lazyLoadThreshold);
  const shouldPrioritize = priority || index < IMAGE_CONFIG.lazyLoadThreshold;

  return (
    <article className="group">
      <Link href={`/services/${slug}`} className="block">
        <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          {/* Image */}
          <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
            <Image
              src={image}
              alt={getImageAlt(undefined, title)}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              loading={loading}
              priority={shouldPrioritize}
              quality={IMAGE_CONFIG.quality}
            />
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-orange-500 transition-colors">
              {title}
            </h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {header}
            </p>
            <div className="flex items-center text-orange-500 font-medium text-sm group-hover:text-orange-600">
              View Details
              <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
