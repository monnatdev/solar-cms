import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin, Sun } from 'lucide-react';

interface ContactInfo {
  phone: string;
  email: string;
  address: string;
}

interface SocialLink {
  platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin';
  url: string;
}

interface FooterProps {
  contactInfo?: ContactInfo;
  socialLinks?: SocialLink[];
}

const defaultContactInfo: ContactInfo = {
  phone: '02-123-4567',
  email: 'info@solarpro.co.th',
  address: '123 ถนนพลังงาน แขวงสุขุมวิท เขตวัฒนา กรุงเทพฯ 10110',
};

const defaultSocialLinks: SocialLink[] = [
  {
    platform: 'facebook',
    url: 'https://facebook.com/solarpro',
  },
  {
    platform: 'twitter',
    url: 'https://twitter.com/solarpro',
  },
  {
    platform: 'instagram',
    url: 'https://instagram.com/solarpro',
  },
  {
    platform: 'linkedin',
    url: 'https://linkedin.com/company/solarpro',
  },
];

const getSocialIcon = (platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin') => {
  switch (platform) {
    case 'facebook':
      return <Facebook className="w-5 h-5" />;
    case 'twitter':
      return <Twitter className="w-5 h-5" />;
    case 'instagram':
      return <Instagram className="w-5 h-5" />;
    case 'linkedin':
      return <Linkedin className="w-5 h-5" />;
  }
};

export default function Footer({ 
  contactInfo = defaultContactInfo, 
  socialLinks = defaultSocialLinks 
}: FooterProps = {}) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0F172A] text-gray-300">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info with gradient logo */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 p-2 rounded-lg shadow-md">
                <Sun className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">SolarPro</span>
                <span className="text-xs text-gray-400">โซลูชั่นพลังงานแสงอาทิตย์</span>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm">
              ผู้นำด้านการติดตั้งระบบโซล่าเซลล์ มอบโซลูชั่นพลังงานสะอาดและหมุนเวียนสำหรับบ้านและธุรกิจ
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">ลิงก์ด่วน</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-orange-400 transition-colors">
                  หน้าแรก
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-orange-400 transition-colors">
                  บริการ
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-orange-400 transition-colors">
                  ผลงาน
                </Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-orange-400 transition-colors">
                  บทความ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">ติดต่อเรา</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <a
                  href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                  className="hover:text-orange-400 transition-colors"
                >
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="hover:text-orange-400 transition-colors"
                >
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                <address className="not-italic">{contactInfo.address}</address>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">ติดตามเรา</h4>
            <p className="text-sm text-gray-400">
              ติดตามเราบนโซเชียลมีเดียเพื่อรับข้อมูลและเคล็ดลับเกี่ยวกับพลังงานแสงอาทิตย์
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 p-2.5 rounded-lg hover:bg-gradient-to-r hover:from-orange-400 hover:to-orange-600 transition-all duration-300"
                  aria-label={`ติดตามเราบน ${social.platform}`}
                >
                  {getSocialIcon(social.platform)}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-10 pt-8 text-center text-sm text-gray-400">
          <p>
            &copy; {currentYear} SolarPro โซลูชั่นพลังงานแสงอาทิตย์ สงวนลิขสิทธิ์
          </p>
        </div>
      </div>
    </footer>
  );
}
