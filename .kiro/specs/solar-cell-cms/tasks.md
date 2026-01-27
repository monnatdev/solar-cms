# แผนการพัฒนา: Solar Cell CMS

## ภาพรวม

แผนการพัฒนานี้แบ่งการสร้างระบบ CMS สำหรับธุรกิจโซล่าเซลล์ออกเป็นขั้นตอนที่ชัดเจน โดยเริ่มจากการตั้งค่าโครงสร้างพื้นฐาน ไปจนถึงการพัฒนาฟีเจอร์ต่างๆ และการทดสอบ ระบบใช้ Next.js สำหรับ Frontend และ Payload CMS สำหรับ Backend

## Tasks

- [x] 1. ตั้งค่าโครงสร้างโปรเจกต์ (แยก 2 repositories)
  - [x] 1.1 สร้าง Frontend Repository
    - สร้างโปรเจกต์ Next.js 14+ ด้วย App Router และ TypeScript
    - ติดตั้งและตั้งค่า Tailwind CSS
    - สร้างโครงสร้างโฟลเดอร์ (components, lib, types, app)
    - กำหนด environment variables (NEXT_PUBLIC_PAYLOAD_API_URL)
    - _Requirements: ทุก Requirements_
  
  - [x] 1.2 สร้าง Backend Repository (Payload CMS)
    - สร้างโปรเจกต์ Payload CMS แยกต่างหาก
    - ตั้งค่า MongoDB connection
    - กำหนด environment variables (DATABASE_URI, PAYLOAD_SECRET)
    - ตั้งค่า CORS เพื่ออนุญาต requests จาก Frontend domain
    - _Requirements: ทุก Requirements_

- [x] 2. สร้าง Payload CMS Collections และ API
  - [x] 2.1 สร้าง Media Collection
    - กำหนด upload configuration (image sizes, mime types)
    - ตั้งค่า static URL และ directory
    - เพิ่ม alt text field
    - _Requirements: 3.2, 4.2, 5.2_
  
  - [x] 2.2 สร้าง Articles Collection
    - กำหนด fields (title, header, slug, excerpt, content, featuredImage, publishedDate, status)
    - เพิ่ม SEO metadata group (metaTitle, metaDescription, keywords)
    - ตั้งค่า access control (public read, admin write)
    - เพิ่ม slug auto-generation hook
    - _Requirements: 5.1, 5.2, 5.4, 7.1-7.6_
  
  - [x] 2.3 สร้าง Services Collection
    - กำหนด fields (title, header, slug, description, featuredImage, gallery, status)
    - เพิ่ม SEO metadata group
    - ตั้งค่า access control
    - เพิ่ม slug auto-generation hook (reuse from Articles)
    - _Requirements: 3.1-3.5, 8.1-8.6_
  
  - [x] 2.4 สร้าง Reviews Collection
    - กำหนด fields (title, header, description, featuredImage, gallery, relatedService, status)
    - เพิ่ม relationship กับ Services
    - ตั้งค่า access control
    - _Requirements: 4.1-4.4, 9.1-9.6_
  
  - [x] 2.5 สร้าง Leads Collection
    - กำหนด fields (fullName, phone, email)
    - เพิ่ม validation rules (phone pattern, email format)
    - ตั้งค่า access control (public create, admin read only, no update/delete)
    - เพิ่ม beforeValidate hook สำหรับ sanitize phone number
    - เพิ่ม afterChange hook สำหรับ logging
    - _Requirements: 6.1-6.4, 10.1-10.5_

- [x] 3. Checkpoint - ทดสอบ Payload CMS
  - ตรวจสอบว่า Payload CMS รันได้และเข้าถึง admin panel ได้
  - ทดสอบสร้าง/แก้ไข/ลบข้อมูลในแต่ละ collection
  - ตรวจสอบ API endpoints ทำงานถูกต้อง
  - ถามผู้ใช้หากมีคำถาม

- [x] 4. สร้าง Frontend Types และ API Client
  - [x] 4.1 สร้าง TypeScript interfaces
    - สร้าง types/payload.ts สำหรับ base types
    - สร้าง types/article.ts สำหรับ Article types
    - สร้าง types/service.ts สำหรับ Service types
    - สร้าง types/review.ts สำหรับ Review types
    - สร้าง types/lead.ts สำหรับ Lead types
    - สร้าง types/media.ts สำหรับ Media types
    - สร้าง types/calculator.ts สำหรับ Calculator types
    - สร้าง types/index.ts เพื่อ export ทั้งหมด
    - _Requirements: 7.6, 8.6, 9.6, 10.5_
  
  - [x] 4.2 สร้าง API Client functions
    - สร้าง lib/api/payload.ts สำหรับ base API client
    - สร้าง lib/api/articles.ts สำหรับ Articles API
    - สร้าง lib/api/services.ts สำหรับ Services API
    - สร้าง lib/api/reviews.ts สำหรับ Reviews API
    - สร้าง lib/api/leads.ts สำหรับ Leads API
    - เพิ่ม error handling สำหรับทุก API call
    - _Requirements: 7.6, 8.6, 9.6, 10.5_
  
  - [x] 4.3 สร้าง Utility functions
    - สร้าง lib/utils/image.ts สำหรับ image optimization helpers
    - สร้าง lib/utils/validation.ts สำหรับ form validation
    - สร้าง lib/constants/config.ts สำหรับ app configuration
    - _Requirements: 13.2, 13.4_

- [ ]* 4.4 เขียน property test สำหรับ API Integration
  - **Property 7: API Integration - Content Retrieval**
  - **Validates: Requirements 7.6, 8.6, 9.6**

- [x] 5. สร้าง Layout Components
  - [x] 5.1 สร้าง Header Component
    - สร้าง components/layout/Header.tsx
    - แสดง navigation menu (Home, Services, Reviews, Articles, Contact)
    - รองรับ responsive design (mobile menu)
    - _Requirements: 14.1-14.4_
  
  - [x] 5.2 สร้าง Footer Component
    - สร้าง components/layout/Footer.tsx
    - แสดงข้อมูลติดต่อ (phone, email, address)
    - แสดง social media links
    - _Requirements: 14.1-14.4_
  
  - [x] 5.3 อัพเดท Main Layout
    - แก้ไข app/layout.tsx เพื่อรวม Header และ Footer
    - กำหนด SEO metadata defaults
    - เพิ่ม semantic HTML structure (header, main, footer)
    - _Requirements: 15.1, 15.2_

- [ ]* 5.4 เขียน property test สำหรับ Semantic HTML
  - **Property 9: Semantic HTML Structure**
  - **Validates: Requirements 5.5, 15.1**

- [x] 6. สร้าง Hero Section
  - [x] 6.1 สร้าง HeroSection component
    - สร้าง components/home/HeroSection.tsx
    - แสดง Text Header และ Title
    - รองรับทั้ง image และ video
    - ใช้ Tailwind CSS สำหรับ styling
    - รองรับ responsive design
    - _Requirements: 1.1-1.4_
  
  - [x] 6.2 อัพเดท Home page
    - แก้ไข app/page.tsx เพื่อใช้ HeroSection component
    - เพิ่ม static content สำหรับ hero section
    - _Requirements: 1.1-1.4_

- [ ]* 6.1 เขียน unit tests สำหรับ Hero Section
  - ทดสอบว่าแสดง header และ title
  - ทดสอบว่าแสดง media (image/video)
  - _Requirements: 1.1, 1.2_

- [ ] 7. สร้าง Solar Calculator
  - [x] 7.1 สร้าง calculation logic
    - สร้าง lib/utils/calculator.ts
    - implement calculateSolarSystem function ตาม design
    - เพิ่ม input validation
    - เพิ่ม TypeScript types
    - _Requirements: 2.5, 2.6_
  
  - [x] 7.2 สร้าง SolarCalculator component
    - สร้าง components/home/SolarCalculator.tsx
    - เพิ่ม checkbox สำหรับเลือกประเภทสถานที่
    - เพิ่ม input field สำหรับค่าไฟฟ้า
    - เพิ่ม checkbox สำหรับระบบไฟฟ้า
    - เพิ่ม progress bar/slider สำหรับสัดส่วนกลางวัน/กลางคืน
    - แสดงผลการคำนวณ
    - _Requirements: 2.1-2.6_
  
  - [x] 7.3 สร้าง API route สำหรับ calculator
    - สร้าง app/api/calculator/route.ts
    - รับ POST request พร้อม calculation input
    - return calculation result
    - _Requirements: 2.5_
  
  - [x] 7.4 อัพเดท Home page
    - เพิ่ม SolarCalculator component ใน app/page.tsx
    - _Requirements: 2.1-2.6_

- [x]* 7.5 เขียน unit tests สำหรับ Calculator
  - ทดสอบ validation สำหรับ negative monthly bill
  - ทดสอบ validation สำหรับ day/night ratio นอกช่วง
  - ทดสอบ validation สำหรับ invalid location type
  - ทดสอบ calculation accuracy
  - _Requirements: 2.5_

- [ ]* 7.6 เขียน property test สำหรับ Solar Calculator
  - **Property 1: Solar Calculator Calculation Accuracy**
  - **Validates: Requirements 2.5**

- [x] 8. Checkpoint - ทดสอบ Hero และ Calculator
  - ตรวจสอบว่า Hero Section แสดงผลถูกต้อง
  - ทดสอบ Solar Calculator ด้วย input ต่างๆ
  - ตรวจสอบ responsive design
  - ถามผู้ใช้หากมีคำถาม

- [ ] 9. สร้าง Services Page
  - [x] 9.1 สร้าง ServiceCard component
    - สร้าง components/services/ServiceCard.tsx
    - แสดง image, header, title
    - เพิ่ม link ไปหน้ารายละเอียด
    - ใช้ design ที่แตกต่างจาก card อื่น
    - รองรับ lazy loading สำหรับรูปภาพ
    - _Requirements: 3.1, 3.2, 3.6, 13.4_
  
  - [x] 9.2 สร้าง Services List Page
    - สร้าง app/services/page.tsx
    - ดึงข้อมูล services จาก Payload CMS API
    - แสดง ServiceCard ในรูปแบบ grid layout
    - เพิ่ม error handling
    - _Requirements: 3.1, 3.4_
  
  - [x] 9.3 สร้าง Service Detail Page
    - สร้าง app/services/[slug]/page.tsx
    - แสดงรายละเอียดบริการ (description, gallery)
    - เพิ่ม SEO metadata
    - ใช้ semantic HTML
    - _Requirements: 3.3, 3.5, 15.1, 15.2_

- [ ]* 9.4 เขียน property test สำหรับ Service Card
  - **Property 2: Service Card Content Completeness**
  - **Validates: Requirements 3.2, 3.3**

- [ ]* 9.5 เขียน property test สำหรับ SEO Metadata
  - **Property 8: SEO Metadata Rendering**
  - **Validates: Requirements 3.5, 5.4, 15.2, 15.4**

- [ ] 10. สร้าง Reviews Page
  - [x] 10.1 สร้าง ReviewCard component
    - สร้าง components/reviews/ReviewCard.tsx
    - แสดง image, header, title
    - เพิ่ม link ไป related service (ถ้ามี)
    - ใช้ design ที่แตกต่างจาก card อื่น
    - รองรับ lazy loading สำหรับรูปภาพ
    - _Requirements: 4.1, 4.2, 4.5, 13.4_
  
  - [x] 10.2 สร้าง Reviews List Page
    - สร้าง app/reviews/page.tsx
    - ดึงข้อมูล reviews จาก Payload CMS API
    - แสดง ReviewCard ในรูปแบบ grid layout
    - เพิ่ม error handling
    - _Requirements: 4.1, 4.4_

- [ ]* 10.3 เขียน property test สำหรับ Review Card
  - **Property 3: Review Card Content and Relationship**
  - **Validates: Requirements 4.2, 4.3**

- [ ] 11. สร้าง Articles Page
  - [x] 11.1 สร้าง ArticleCard component
    - สร้าง components/articles/ArticleCard.tsx
    - แสดง image, header, title, excerpt, publishedDate
    - เพิ่ม link ไปหน้ารายละเอียด
    - ใช้ design ที่แตกต่างจาก card อื่น
    - รองรับ lazy loading สำหรับรูปภาพ
    - _Requirements: 5.6, 13.4_
  
  - [x] 11.2 สร้าง Articles List Page
    - สร้าง app/articles/page.tsx
    - ดึงข้อมูล articles จาก Payload CMS API
    - แสดง ArticleCard ในรูปแบบ grid layout
    - เพิ่ม pagination หรือ infinite scroll
    - เพิ่ม error handling
    - _Requirements: 5.3_
  
  - [x] 11.3 สร้าง Article Detail Page
    - สร้าง app/articles/[slug]/page.tsx
    - แสดงบทความเต็ม (header, title, content, media)
    - render rich text content
    - เพิ่ม SEO metadata
    - ใช้ semantic HTML (article, section, header tags)
    - _Requirements: 5.1, 5.2, 5.4, 5.5_

- [ ]* 11.4 เขียน property test สำหรับ Article Content
  - **Property 4: Article Content Completeness**
  - **Validates: Requirements 5.2**

- [x] 12. Checkpoint - ทดสอบ Content Pages
  - ตรวจสอบว่า Services, Reviews, Articles pages แสดงผลถูกต้อง
  - ทดสอบ navigation ระหว่างหน้า
  - ตรวจสอบ SEO metadata
  - ถามผู้ใช้หากมีคำถาม

- [ ] 13. สร้าง Lead Form
  - [x] 13.1 สร้าง validation logic
    - สร้าง lib/utils/validation.ts
    - เพิ่ม validateLeadForm function
    - เพิ่ม validation rules (fullName, phone, email)
    - _Requirements: 6.1, 6.3_
  
  - [x] 13.2 สร้าง LeadForm component
    - สร้าง components/forms/LeadForm.tsx
    - เพิ่ม input fields (fullName, phone, email)
    - เพิ่ม client-side validation
    - แสดง error messages
    - เพิ่ม submit button
    - _Requirements: 6.1, 6.3_
  
  - [x] 13.3 สร้าง form submission logic
    - เรียก Payload CMS API เพื่อบันทึก lead
    - จัดการ success/error states
    - แสดง success message หลัง submit
    - ไม่มี auto-reply
    - _Requirements: 6.2, 6.4_
  
  - [x] 13.4 เพิ่ม LeadForm ใน Home page
    - เพิ่ม LeadForm component ใน app/page.tsx
    - _Requirements: 6.1-6.4_

- [ ]* 13.3 เขียน property test สำหรับ Lead Form - Valid Data
  - **Property 5: Lead Form Validation - Valid Data**
  - **Validates: Requirements 6.2**

- [ ]* 13.4 เขียน property test สำหรับ Lead Form - Invalid Data
  - **Property 6: Lead Form Validation - Invalid Data**
  - **Validates: Requirements 6.3**

- [ ]* 13.5 เขียน unit tests สำหรับ Lead Form validation
  - ทดสอบ validation สำหรับ short full name
  - ทดสอบ validation สำหรับ invalid phone format
  - ทดสอบ validation สำหรับ invalid email format
  - ทดสอบ success case ด้วย valid data
  - _Requirements: 6.1, 6.2, 6.3_

- [ ] 14. เพิ่ม SEO และ Performance Optimizations
  - [x] 14.1 สร้าง sitemap.xml
    - สร้าง app/sitemap.ts
    - generate sitemap จาก articles, services, reviews
    - update sitemap เมื่อมีเนื้อหาใหม่
    - _Requirements: 15.3_
  
  - [x] 14.2 เพิ่ม Image Optimization
    - ใช้ Next.js Image component ในทุก component
    - กำหนด image sizes สำหรับ responsive breakpoints
    - เพิ่ม lazy loading attributes
    - _Requirements: 13.2, 13.4_
  
  - [x] 14.3 เพิ่ม Code Splitting
    - ใช้ dynamic imports สำหรับ heavy components
    - optimize bundle size
    - _Requirements: 13.3_
  
  - [x] 14.4 เพิ่ม Open Graph Tags
    - เพิ่ม OG tags สำหรับทุกหน้า
    - รองรับ social media sharing
    - _Requirements: 15.4_

- [ ]* 14.5 เขียน property test สำหรับ Image Optimization
  - **Property 10: Image Optimization and Lazy Loading**
  - **Validates: Requirements 13.2, 13.4**

- [ ]* 14.6 เขียน unit test สำหรับ Sitemap Generation
  - ทดสอบว่า sitemap มี URLs ของ content ทั้งหมด
  - ทดสอบ XML format ถูกต้อง
  - _Requirements: 15.3_

- [x] 15. Responsive Design Testing และ Adjustments
  - ทดสอบทุกหน้าบน Desktop (1920px+)
  - ทดสอบทุกหน้าบน Tablet (768px-1919px)
  - ทดสอบทุกหน้าบน Mobile (320px-767px)
  - ปรับแต่ง layout และ spacing ตามความเหมาะสม
  - _Requirements: 14.1-14.4_

- [ ]* 15.1 สร้าง Dashboard (Optional)
  - สร้าง custom dashboard component ใน Payload CMS
  - แสดงสถิติ (จำนวน articles, services, reviews, leads)
  - เพิ่ม charts/graphs สำหรับ visualization
  - _Requirements: 12.1-12.5_

- [x] 16. Integration Testing
  - ทดสอบ end-to-end flow: ส่งฟอร์ม lead → บันทึกใน CMS → แสดงใน admin panel
  - ทดสอบ content creation flow: สร้าง article ใน CMS → แสดงใน frontend
  - ทดสอบ authentication flow: login → access admin panel → logout
  - _Requirements: ทุก Requirements_

- [x] 17. Performance Testing
  - รัน Lighthouse CI สำหรับทุกหน้าหลัก
  - ตรวจสอบ FCP, LCP, TTI, CLS metrics
  - optimize ตามผลที่ได้
  - _Requirements: 13.1-13.4_

- [x] 18. Final Checkpoint และ Deployment Preparation
  - รัน tests ทั้งหมด (unit, property, integration)
  - ตรวจสอบ code quality (linting, type checking)
  - เตรียม environment variables สำหรับ production
  - สร้าง deployment documentation
  - ถามผู้ใช้หากมีคำถามหรือต้องการปรับแต่งเพิ่มเติม

## หมายเหตุ

- Tasks ที่มีเครื่องหมาย `*` เป็น optional และสามารถข้ามได้เพื่อให้ได้ MVP เร็วขึ้น
- แต่ละ task อ้างอิง requirements เฉพาะเจาะจงเพื่อความชัดเจน
- Checkpoints ช่วยให้มั่นใจว่าแต่ละส่วนทำงานถูกต้องก่อนไปต่อ
- Property tests ตรวจสอบความถูกต้องแบบสากล
- Unit tests ตรวจสอบตัวอย่างเฉพาะและ edge cases

## สถานะปัจจุบัน (Current Status)

### ✅ เสร็จสมบูรณ์แล้ว (Completed)
- Task 1.1: Frontend Repository Setup
- Task 1.2: Backend Repository Setup (Payload CMS)
- Task 2.1: Media Collection
- Task 2.2: Articles Collection
- Task 2.3: Services Collection
- Task 2.4: Reviews Collection
- Task 2.5: Leads Collection
- Task 3: Checkpoint - ทดสอบ Payload CMS
- Task 4.1: สร้าง TypeScript interfaces
- Task 4.2: สร้าง API Client functions
- Task 4.3: สร้าง Utility functions
- Task 5.1: สร้าง Header Component
- Task 5.2: สร้าง Footer Component
- Task 5.3: อัพเดท Main Layout
- Task 6.1: สร้าง HeroSection component
- Task 6.2: อัพเดท Home page
- Task 7.1: สร้าง calculation logic
- Task 7.5: เขียน unit tests สำหรับ Calculator (optional)

### 🚧 กำลังดำเนินการ (In Progress)
- ไม่มี

### ⏭️ ขั้นตอนถัดไป (Next Steps)
1. Task 7.2: สร้าง SolarCalculator component
2. Task 7.3: สร้าง API route สำหรับ calculator (optional)
3. Task 7.4: อัพเดท Home page เพื่อเพิ่ม SolarCalculator
4. Task 8: Checkpoint - ทดสอบ Hero และ Calculator
5. Task 9: สร้าง Services Page
