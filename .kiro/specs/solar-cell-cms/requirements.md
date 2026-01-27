# เอกสารความต้องการระบบ (Requirements Document)

## บทนำ

ระบบ CMS สำหรับธุรกิจโซล่าเซลล์เป็นแพลตฟอร์มเว็บแอปพลิเคชันที่ออกแบบมาเพื่อให้ธุรกิจโซล่าเซลล์สามารถจัดการเนื้อหา แสดงบริการ รวบรวมข้อมูล Lead และให้เครื่องมือคำนวณความคุ้มค่าแก่ลูกค้า ระบบประกอบด้วยส่วนหน้าบ้าน (Frontend) ที่พัฒนาด้วย Next.js และ Tailwind CSS สำหรับผู้ใช้งานทั่วไป และส่วนหลังบ้านใช้ Payload CMS (3rd party) สำหรับผู้ดูแลระบบในการจัดการเนื้อหา

## อภิธานศัพท์ (Glossary)

- **System**: ระบบ CMS สำหรับธุรกิจโซล่าเซลล์ทั้งหมด
- **Frontend**: ส่วนหน้าบ้านที่พัฒนาด้วย Next.js และ Tailwind CSS สำหรับผู้ใช้งานทั่วไป
- **Payload_CMS**: ระบบจัดการเนื้อหา (Content Management System) แบบ Headless CMS ที่ใช้เป็น 3rd party
- **CMS**: หมายถึง Payload_CMS
- **Admin**: ผู้ดูแลระบบที่มีสิทธิ์เข้าถึง Payload_CMS
- **User**: ผู้ใช้งานทั่วไปที่เข้าชมเว็บไซต์
- **Lead**: ข้อมูลผู้สนใจที่ส่งผ่านฟอร์มติดต่อ
- **Article**: บทความที่แสดงในเว็บไซต์
- **Service**: บริการที่ธุรกิจนำเสนอ
- **Review**: รีวิวผลงานการติดตั้งโซล่าเซลล์
- **Solar_Calculator**: เครื่องมือคำนวณความคุ้มค่าโซล่าเซลล์
- **Hero_Section**: ส่วนแสดงเนื้อหาหลักด้านบนของหน้าเว็บ
- **Card**: องค์ประกอบ UI ที่แสดงข้อมูลสรุปในรูปแบบการ์ด
- **Rich_Text_Content**: เนื้อหาที่รองรับการจัดรูปแบบข้อความแบบหลากหลาย
- **SEO_Metadata**: ข้อมูล Meta tags สำหรับการเพิ่มประสิทธิภาพ SEO
- **Authentication**: กระบวนการยืนยันตัวตนของผู้ใช้งาน
- **Responsive_Design**: การออกแบบที่รองรับการแสดงผลบนหลายขนาดหน้าจอ

## ความต้องการ (Requirements)

### Requirement 1: Hero Section

**User Story:** ในฐานะผู้ใช้งาน ฉันต้องการเห็นเนื้อหาหลักที่น่าสนใจเมื่อเข้าสู่เว็บไซต์ เพื่อให้เข้าใจภาพรวมของธุรกิจได้ทันที

#### Acceptance Criteria

1. THE Hero_Section SHALL แสดง Text Header และ Title
2. THE Hero_Section SHALL แสดง Image หรือ Video
3. THE Hero_Section SHALL แสดงเนื้อหาแบบ Static ที่ไม่สามารถแก้ไขผ่าน CMS ได้
4. THE Hero_Section SHALL รองรับ Responsive_Design สำหรับทั้ง Desktop และ Mobile

### Requirement 2: Solar Calculator

**User Story:** ในฐานะผู้ใช้งาน ฉันต้องการคำนวณความคุ้มค่าของการติดตั้งโซล่าเซลล์ เพื่อประเมินความเหมาะสมก่อนตัดสินใจ

#### Acceptance Criteria

1. THE Solar_Calculator SHALL แสดง Checkbox สำหรับเลือกประเภทสถานที่ติดตั้ง
2. THE Solar_Calculator SHALL แสดง Input Field สำหรับกรอกค่าไฟฟ้าต่อเดือน
3. THE Solar_Calculator SHALL แสดง Checkbox สำหรับเลือกระบบไฟฟ้า
4. THE Solar_Calculator SHALL แสดง Progress Bar สำหรับกำหนดสัดส่วนการใช้ไฟกลางวันและกลางคืน
5. WHEN ผู้ใช้งานกรอกข้อมูลครบถ้วน THEN THE Solar_Calculator SHALL คำนวณและแสดงผลประมาณการ
6. THE Solar_Calculator SHALL ใช้สูตรคำนวณที่กำหนดไว้แบบ Static และไม่สามารถแก้ไขผ่าน CMS ได้
7. THE Solar_Calculator SHALL ไม่มีการเชื่อมต่อกับระบบชำระเงิน

### Requirement 3: Services Page

**User Story:** ในฐานะผู้ใช้งาน ฉันต้องการดูบริการที่ธุรกิจนำเสนอ เพื่อเลือกบริการที่ตรงกับความต้องการ

#### Acceptance Criteria

1. THE System SHALL แสดง Services ในรูปแบบ Card Layout
2. WHEN แสดง Service Card THEN THE System SHALL แสดงรูปภาพ Header และ Title
3. WHEN ผู้ใช้งานคลิกที่ Service Card THEN THE System SHALL แสดงหน้ารายละเอียดของบริการนั้น
4. THE System SHALL รองรับการจัดการ Services ผ่าน CMS
5. THE System SHALL รองรับ SEO_Metadata สำหรับแต่ละ Service
6. THE Service Card Layout SHALL มี Design ที่แตกต่างจาก Review Card และ Article Card เพื่อความสวยงามและเหมาะสมกับเนื้อหาบริการ

### Requirement 4: Installation Reviews

**User Story:** ในฐานะผู้ใช้งาน ฉันต้องการดูรีวิวผลงานการติดตั้ง เพื่อสร้างความเชื่อมั่นในคุณภาพงาน

#### Acceptance Criteria

1. THE System SHALL แสดง Reviews ในรูปแบบ Card Layout
2. WHEN แสดง Review Card THEN THE System SHALL แสดงรูปภาพผลงาน Header และ Title
3. THE System SHALL เชื่อมโยง Review กับ Service ที่เกี่ยวข้อง
4. THE System SHALL รองรับการจัดการ Reviews ผ่าน CMS
5. THE Review Card Layout SHALL มี Design ที่แตกต่างจาก Service Card และ Article Card เพื่อความสวยงามและเหมาะสมกับการแสดงผลงาน

### Requirement 5: Article Detail Page

**User Story:** ในฐานะผู้ใช้งาน ฉันต้องการอ่านบทความที่มีรายละเอียด เพื่อเพิ่มความรู้เกี่ยวกับโซล่าเซลล์

#### Acceptance Criteria

1. THE System SHALL แสดง Article ทีละ 1 บทความต่อหน้า
2. WHEN แสดง Article THEN THE System SHALL แสดง Header Title Rich_Text_Content และ Image หรือ Video
3. THE System SHALL รองรับการจัดการ Articles ผ่าน CMS
4. THE System SHALL รองรับ SEO_Metadata สำหรับแต่ละ Article
5. THE System SHALL ใช้ Semantic HTML สำหรับโครงสร้างบทความ
6. WHEN แสดงรายการ Articles ในรูปแบบ Card THEN THE Article Card Layout SHALL มี Design ที่แตกต่างจาก Service Card และ Review Card เพื่อความสวยงามและเหมาะสมกับเนื้อหาบทความ

### Requirement 6: Lead Form

**User Story:** ในฐานะผู้ใช้งาน ฉันต้องการส่งข้อมูลติดต่อ เพื่อให้ธุรกิจติดต่อกลับมา

#### Acceptance Criteria

1. THE System SHALL แสดงฟอร์มที่มีฟิลด์ ชื่อ-นามสกุล เบอร์โทร และอีเมล
2. WHEN ผู้ใช้งานกรอกข้อมูลและคลิกปุ่ม Submit THEN THE System SHALL บันทึกข้อมูล Lead ลงใน CMS
3. WHEN ผู้ใช้งานกรอกข้อมูลไม่ครบถ้วน THEN THE System SHALL แสดงข้อความแจ้งเตือนและป้องกันการ Submit
4. THE System SHALL ไม่มีระบบตอบกลับอัตโนมัติหลังจากส่งฟอร์ม

### Requirement 7: CMS Article Management

**User Story:** ในฐานะ Admin ฉันต้องการจัดการบทความผ่าน Payload CMS เพื่อเผยแพร่เนื้อหาที่เป็นปัจจุบัน

#### Acceptance Criteria

1. WHEN Admin เข้าสู่ระบบ Payload_CMS THEN THE Payload_CMS SHALL แสดงรายการ Articles ทั้งหมด
2. THE Payload_CMS SHALL รองรับการสร้าง Article ใหม่
3. THE Payload_CMS SHALL รองรับการแก้ไข Article ที่มีอยู่
4. THE Payload_CMS SHALL รองรับการลบ Article
5. WHEN Admin สร้างหรือแก้ไข Article THEN THE Payload_CMS SHALL อนุญาตให้กรอก SEO_Metadata
6. THE Frontend SHALL ดึงข้อมูล Articles จาก Payload_CMS ผ่าน API

### Requirement 8: CMS Service Management

**User Story:** ในฐานะ Admin ฉันต้องการจัดการบริการผ่าน Payload CMS เพื่ออัพเดทข้อมูลบริการให้ตรงกับความเป็นจริง

#### Acceptance Criteria

1. WHEN Admin เข้าสู่ระบบ Payload_CMS THEN THE Payload_CMS SHALL แสดงรายการ Services ทั้งหมด
2. THE Payload_CMS SHALL รองรับการสร้าง Service ใหม่
3. THE Payload_CMS SHALL รองรับการแก้ไข Service ที่มีอยู่
4. THE Payload_CMS SHALL รองรับการลบ Service
5. WHEN Admin สร้างหรือแก้ไข Service THEN THE Payload_CMS SHALL อนุญาตให้กรอก SEO_Metadata
6. THE Frontend SHALL ดึงข้อมูล Services จาก Payload_CMS ผ่าน API

### Requirement 9: CMS Review Management

**User Story:** ในฐานะ Admin ฉันต้องการจัดการรีวิวผลงานผ่าน Payload CMS เพื่อแสดงผลงานที่น่าเชื่อถือ

#### Acceptance Criteria

1. WHEN Admin เข้าสู่ระบบ Payload_CMS THEN THE Payload_CMS SHALL แสดงรายการ Reviews ทั้งหมด
2. THE Payload_CMS SHALL รองรับการสร้าง Review ใหม่
3. THE Payload_CMS SHALL รองรับการแก้ไข Review ที่มีอยู่
4. THE Payload_CMS SHALL รองรับการลบ Review
5. WHEN Admin สร้างหรือแก้ไข Review THEN THE Payload_CMS SHALL อนุญาตให้เชื่อมโยงกับ Service ที่เกี่ยวข้อง
6. THE Frontend SHALL ดึงข้อมูล Reviews จาก Payload_CMS ผ่าน API

### Requirement 10: CMS Lead Management

**User Story:** ในฐานะ Admin ฉันต้องการดูข้อมูล Lead ผ่าน Payload CMS เพื่อติดตามและติดต่อกลับลูกค้าที่สนใจ

#### Acceptance Criteria

1. WHEN Admin เข้าสู่ระบบ Payload_CMS THEN THE Payload_CMS SHALL แสดงรายการ Leads ทั้งหมด
2. WHEN Admin คลิกที่ Lead THEN THE Payload_CMS SHALL แสดงรายละเอียดข้อมูลติดต่อ
3. THE Payload_CMS SHALL แสดงวันที่และเวลาที่ Lead ส่งข้อมูลเข้ามา
4. THE Payload_CMS SHALL ไม่รองรับการแก้ไขหรือลบข้อมูล Lead
5. WHEN ผู้ใช้งานส่งฟอร์ม Lead THEN THE Frontend SHALL บันทึกข้อมูลลง Payload_CMS ผ่าน API

### Requirement 11: CMS Authentication

**User Story:** ในฐานะ Admin ฉันต้องการเข้าสู่ระบบ Payload CMS อย่างปลอดภัย เพื่อป้องกันการเข้าถึงโดยไม่ได้รับอนุญาต

#### Acceptance Criteria

1. THE Payload_CMS SHALL มีระบบ Authentication ในตัว
2. WHEN Admin กรอก Email และ Password ที่ถูกต้อง THEN THE Payload_CMS SHALL อนุญาตให้เข้าสู่ระบบ
3. WHEN Admin กรอก Email หรือ Password ที่ไม่ถูกต้อง THEN THE Payload_CMS SHALL แสดงข้อความแจ้งเตือนและป้องกันการเข้าสู่ระบบ
4. WHEN Admin ไม่ได้ Login THEN THE Payload_CMS SHALL ป้องกันการเข้าถึงหน้าจัดการเนื้อหา
5. THE Payload_CMS SHALL รองรับการ Logout

### Requirement 12: CMS Dashboard

**User Story:** ในฐานะ Admin ฉันต้องการเห็นภาพรวมข้อมูลสำคัญใน Payload CMS เพื่อติดตามสถานะระบบได้อย่างรวดเร็ว

#### Acceptance Criteria

1. WHEN Admin เข้าสู่ระบบ Payload_CMS THEN THE Payload_CMS SHALL แสดง Dashboard
2. THE Dashboard SHALL แสดงจำนวน Articles ทั้งหมด
3. THE Dashboard SHALL แสดงจำนวน Services ทั้งหมด
4. THE Dashboard SHALL แสดงจำนวน Reviews ทั้งหมด
5. THE Dashboard SHALL แสดงจำนวน Leads ที่เข้ามาใหม่

### Requirement 13: Performance Optimization

**User Story:** ในฐานะผู้ใช้งาน ฉันต้องการให้เว็บไซต์โหลดเร็ว เพื่อประสบการณ์การใช้งานที่ดี

#### Acceptance Criteria

1. THE System SHALL โหลดหน้าเว็บภายใน 3 วินาที บนการเชื่อมต่ออินเทอร์เน็ตความเร็วปานกลาง
2. THE System SHALL ใช้ Image Optimization สำหรับรูปภาพทั้งหมด
3. THE System SHALL ใช้ Code Splitting สำหรับ JavaScript
4. THE System SHALL ใช้ Lazy Loading สำหรับรูปภาพและเนื้อหาที่อยู่นอกหน้าจอ

### Requirement 14: Responsive Design

**User Story:** ในฐานะผู้ใช้งาน ฉันต้องการเข้าถึงเว็บไซต์จากอุปกรณ์ต่างๆ เพื่อความสะดวกในการใช้งาน

#### Acceptance Criteria

1. THE System SHALL รองรับการแสดงผลบน Desktop (1920px ขึ้นไป)
2. THE System SHALL รองรับการแสดงผลบน Tablet (768px - 1919px)
3. THE System SHALL รองรับการแสดงผลบน Mobile (320px - 767px)
4. WHEN ขนาดหน้าจอเปลี่ยน THEN THE System SHALL ปรับ Layout ให้เหมาะสมโดยอัตโนมัติ

### Requirement 15: SEO Support

**User Story:** ในฐานะเจ้าของธุรกิจ ฉันต้องการให้เว็บไซต์ติดอันดับบน Search Engine เพื่อเพิ่มโอกาสในการเข้าถึงลูกค้า

#### Acceptance Criteria

1. THE System SHALL ใช้ Semantic HTML สำหรับโครงสร้างหน้าเว็บทั้งหมด
2. THE System SHALL รองรับ Meta Tags (title, description, keywords) สำหรับทุกหน้า
3. THE System SHALL สร้าง Sitemap XML โดยอัตโนมัติ
4. THE System SHALL รองรับ Open Graph Tags สำหรับการแชร์บน Social Media
5. WHEN Admin สร้างเนื้อหาใหม่ THEN THE System SHALL อนุญาตให้กำหนด SEO_Metadata
