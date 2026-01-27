# คำแนะนำในการ Restart Server

## ปัญหาที่แก้ไข:
1. ✅ แก้ไข `onError` handler ใน Server Component โดยสร้าง Client Component แยก
2. ✅ เพิ่ม image quality configuration ใน next.config.ts
3. ✅ เพิ่ม `serverURL` ใน payload.config.ts เพื่อแก้ปัญหา media path
4. ✅ เพิ่ม `PAYLOAD_PUBLIC_SERVER_URL` ใน .env

## ขั้นตอนการ Restart:

### 1. Restart Backend Server:
```bash
cd backend
# หยุด server ที่กำลังรันอยู่ (Ctrl+C)
npm run dev
```

### 2. Restart Frontend Server:
```bash
cd frontend
# หยุด server ที่กำลังรันอยู่ (Ctrl+C)
npm run dev
```

### 3. ตรวจสอบว่า Backend รันที่ port 3001:
- เปิด http://localhost:3001/admin
- ตรวจสอบว่า login ได้

### 4. ตรวจสอบว่า Frontend รันที่ port 3000:
- เปิด http://localhost:3000
- ตรวจสอบว่าหน้าเว็บแสดงผลถูกต้อง

## หมายเหตุ:
- ถ้ารูปภาพยังไม่แสดง ให้ลองอัพโหลดรูปใหม่ใน Payload CMS
- Media files จะต้องอยู่ที่ http://localhost:3001/media/[filename]
- ถ้ามี error เกี่ยวกับ image quality ให้ clear cache: `rm -rf frontend/.next`

## การแก้ไขที่ทำไปแล้ว:

### 1. สร้าง ArticleCardSimple.tsx (Client Component):
- ย้าย `onError` handler ไปยัง Client Component
- ใช้ `useState` เพื่อจัดการ image fallback

### 2. อัพเดท next.config.ts:
- เพิ่ม `qualities: [75, 85, 90]` เพื่อรองรับ quality ที่ใช้

### 3. อัพเดท payload.config.ts:
- เพิ่ม `serverURL` เพื่อให้ media files มี full URL

### 4. อัพเดท .env:
- เพิ่ม `PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3001`

## ตรวจสอบ Media URL:
หลังจาก restart แล้ว ให้ตรวจสอบว่า media URL ใน response จาก API มีรูปแบบ:
```
http://localhost:3001/media/filename.jpg
```

ไม่ใช่:
```
/media/filename.jpg
```
