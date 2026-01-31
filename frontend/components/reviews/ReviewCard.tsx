import Image from 'next/image';
import Link from 'next/link';
import { ReviewCardProps } from '@/types/review';
import { getImageAlt, getLoadingAttribute } from '@/lib/utils/image';
import { IMAGE_CONFIG } from '@/lib/constants/config';

interface ReviewCardComponentProps extends ReviewCardProps {
  index?: number;
  priority?: boolean;
}

export default function ReviewCard({
  id,
  image,
  header,
  title,
  relatedService,
  index = 0,
  priority = false,
}: ReviewCardComponentProps) {
  const loading = priority ? 'eager' : getLoadingAttribute(index, IMAGE_CONFIG.lazyLoadThreshold);
  const shouldPrioritize = priority || index < IMAGE_CONFIG.lazyLoadThreshold;

  return (
    <article className="group">
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
        {/* Image with Badge */}
        <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100">
          <Image
            src={image}
            alt={getImageAlt(undefined, title)}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            loading={loading}
            priority={shouldPrioritize}
            quality={IMAGE_CONFIG.quality}
          />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full">
              {header}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
            {title}
          </h3>
          {relatedService && (
            <p className="text-sm text-gray-600 line-clamp-2">
              {relatedService.title}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}
