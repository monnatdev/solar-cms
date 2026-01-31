import Image from 'next/image';
import { Calculator, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  header: string;
  title: string;
  description?: string;
  media: {
    type: 'image' | 'video';
    url: string;
    alt?: string;
  };
}

export default function HeroSection({ header, title, description, media }: HeroSectionProps) {
  return (
    <section className="relative w-full min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        {media.type === 'image' ? (
          <Image
            src={media.url}
            alt={media.alt || title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={90}
          />
        ) : (
          <video
            src={media.url}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            aria-label={media.alt || title}
          >
            <track kind="captions" />
          </video>
        )}
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-900/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-16 md:py-24">
        <div className="max-w-2xl space-y-6">
          {/* Title with gradient text */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            {header} <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">{title}</span>
          </h1>

          {/* Description */}
          {description && (
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-xl">
              {description}
            </p>
          )}

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a
              href="#calculator"
              className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 rounded-lg hover:from-orange-500 hover:via-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Calculator className="w-5 h-5 mr-2" />
              คำนวณความคุ้มค่า
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-gray-700 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              ติดต่อเรา
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
