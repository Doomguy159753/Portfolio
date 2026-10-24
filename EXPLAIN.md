# อธิบายโค้ดทีละบรรทัด — โปรเจค Portfolio

> **หมายเหตุ:** หน้าตาและโครง HTML ถูกออกแบบใหม่ (แนวทาง "เอกสารทำงาน" / dossier)
> ตัวเลขบรรทัด ชื่อคลาส และตัวอย่างโค้ดในคู่มือนี้จึงอ้างอิง **เวอร์ชันก่อนหน้า**
> ส่วน JavaScript (`assets/js/main.js`) และพฤติกรรมหลักยังใช้งานเหมือนเดิม;
> โครงสร้างใหม่สรุปไว้ใน `README.md` หัวข้อ "แนวทางการออกแบบ"


คู่มืออธิบายการทำงานของทุกบรรทัดในโปรเจคนี้
ไฟล์ทั้งหมด: `index.html` (568 บรรทัด) · `assets/css/style.css` (1,530 บรรทัด) · `assets/js/main.js` (277 บรรทัด) · `assets/images/favicon.svg` (12 บรรทัด)

---

# หลักการ: 3 ไฟล์ทำงานร่วมกันอย่างไร

```
เบราว์เซอร์เปิด index.html
        │
        ├─► อ่าน <head>  → โหลด style.css (หน้าตา) + ฟอนต์ Google
        ├─► อ่าน <body>  → แสดงโครงเนื้อหา (HTML)
        └─► ถึง <script> → โหลด main.js (พฤติกรรม) แล้วรัน init()
```

| ไฟล์ | หน้าที่ | คำเปรียบเทียบ |
| --- | --- | --- |
| `index.html` | โครงกระดูก + เนื้อหาทั้งหมด | โครงบ้านและข้าวของ |
| `style.css` | สี ตำแหน่ง ขนาด แอนิเมชัน | ทาสี ติดวอลล์เปเปอร์ จัดเฟอร์นิเจอร์ |
| `main.js` | การตอบสนองต่อผู้ใช้ | สวิตช์ไฟ ปุ่มกด ลิ้นชัก |

**สำคัญ:** HTML ไม่รู้จัก CSS/JS, CSS เรียกใช้ผ่าน `class`, JS เรียกใช้ผ่าน `id` และ `class`
ถ้าชื่อใน 3 ไฟล์ไม่ตรงกัน ฟีเจอร์นั้นจะ "ไม่ทำงาน" นี่คือจุดที่ต้องระวังที่สุดเวลาแก้โค้ด

---

# บทที่ 1 — `index.html` (568 บรรทัด)

## 1.1 ส่วนหัว `<head>` (บรรทัด 1–26)

```html
1   <!DOCTYPE html>                          ← บอกเบราว์เซอร์ว่านี่คือ HTML5
2   <html lang="th">                          ← ภาษาหลักของหน้า = ไทย
3     <head>                                  ← ข้อมูลที่ "ไม่แสดงผล" แต่ใช้ตั้งค่า
4       <meta charset="UTF-8" />              ← ชุดตัวอักษร UTF-8 ถ้าไม่มีบรรทัดนี้
                                                 ตัวไทยจะกลายเป็น ????
5       <meta name="viewport" content="width=device-width, initial-scale=1" />
                                              ← เปิดใช้ responsive พอเปิดบนมือถือ
                                                 เว็บจะเท่ากับความกว้างจอจริง (ไม่ย่อจนอ่านยาก)
6       <title>นราวิชญ์ ศิริ | Portfolio</title> ← ข้อความแท็บเบราว์เซอร์ + ผลค้นหา Google
7       <meta name="description" content="..." /> ← คำอธิบายสั้นๆ ตอนโชว์ใน Google Search
8       <meta name="author" content="..." />      ← ผู้สร้าง
9      <meta name="theme-color" content="#2563eb" /> ← สีแถบ Address bar บนมือถือ
12      <link rel="icon" ... href="assets/images/favicon.svg" /> ← ไอคอนแท็บ
15-17   <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                                              ← "จองล่วงหน้า" การเชื่อมต่อไปยังเซิร์ฟเวอร์ฟอนต์
                                                 ทำให้โหลดฟอนต์ไวกว่า (preconnect คือ TCP+TLS ล่วงหน้า)
19-23   <link href=".../css2?family=Noto+Sans+Thai:wght@300..700&family=Prompt:wght@400..700"
            rel="stylesheet" />               ← โหลดฟอนต์ 2 ตัวจาก Google Fonts:
                                                   Prompt     = หัวข้อ (ตัวหนา ดูทันสมัย)
                                                   Noto Sans Thai = เนื้อความ (อ่านง่าย)
                                                 &display=swap = แสดงตัวหนังสือด้วยฟอนต์ระบบไปก่อน
                                                                 แล้วค่อยสลับเมื่อฟอนต์โหลดเสร็จ (ไม่บล็อกหน้า)
24-25   <link rel="stylesheet" href="assets/css/style.css" />  ← โหลดสไตล์หลัก
```

## 1.2 องค์ประกอบลอย 2 ชิ้น (บรรทัด 27–31)

```html
27  <!-- แถบความคืบหน้าการเลื่อนหน้า -->
28  <div class="scroll-progress" id="scrollProgress" aria-hidden="true"></div>
```
- แท่งสีน้ำเงินบางๆ ติดอยู่ขอบบนจอ (จะถูก `position: fixed` ตรึงไว้ใน CSS บรรทัด 379)
- `id` จำเป็น เพราะ JS ต้องหา element นี้เพื่อเปลี่ยนความกว้าง
- `aria-hidden="true"` = บอกโปรแกรมอ่านจอ (ผู้พิการทางสายตา) ว่า "ข้าม element นี้" เพราะเป็นแค่ของตกแต่ง

```html
31  <a class="skip-link" href="#home">ข้ามไปยังเนื้อหาหลัก</a>
```
- ลิงก์สำหรับคนกด `Tab` ด้วยคีย์บอร์ด จะกระโดดเข้าเนื้อหาหลักทันที
- ปกติจะซ่อนอยู่นอกจอ (`top: -60px` ที่ CSS บรรทัด 136) และโผล่มาเฉพาะตอนได้โฟกัส

## 1.3 ส่วนหัวและเมนู (บรรทัด 33–68)

```html
34  <header class="site-header" id="siteHeader">
```
- `header` = แถบติดขอบบนจอ → CSS กำหนด `position: fixed` จึงไม่เลื่อนหายไป
- `id="siteHeader"` ใช้โดย JS เพื่อ "เพิ่มเงาเมื่อเลื่อนหน้า" (add class `is-scrolled`)

```html
35    <div class="container header-inner">
```
- `container` = จำกัดความกว้างสูงสุด 1140px และจัดกึ่งกลาง (CSS 156) → หน้าจอกว้างจะไม่ยืดไปสุดจอ
- `header-inner` = `display: flex` ทำให้โลโก้อยู่ซ้าย เมนูอยู่ขวา (CSS 410)

```html
36      <a class="brand" href="#home" aria-label="กลับไปหน้าแรก">
37        <span class="brand-mark">NS</span>        ← กล่องสี่เหลี่ยมสีน้ำเงินใส่ตัวย่อ NS
38        <span class="brand-text">
39          <strong>นราวิชญ์ ศิริ</strong>          ← ชื่อตัวหนา
40          <small>IT Support &amp; Frontend Developer</small>  ← ตำแหน่ง ตัวเล็กกว่า
                                                   `&amp;` คือ & ที่เขียนอย่างถูกต้อง (HTML escape)
43      </a>
```

```html
44      <nav class="nav" id="primaryNav" aria-label="เมนูหลัก">
45        <ul class="nav-list">
46          <li><a class="nav-link" href="#home">หน้าแรก</a></li>       ← href="#..." คือข้ามไป
47          <li><a class="nav-link" href="#about">เกี่ยวกับ</a></li>    element ที่มี id ตรงกัน
48          <li><a class="nav-link" href="#skills">ทักษะ</a></li>       เช่น #about → <section id="about">
49          <li><a class="nav-link" href="#experience">ประสบการณ์</a></li>
50          <li><a class="nav-link" href="#projects">ผลงาน</a></li>
51          <li><a class="nav-link" href="#contact">ติดต่อ</a></li>
52        </ul>
54        <a class="btn btn-primary btn-sm nav-cta" href="#contact">จ้างงาน / ติดต่อ</a>
```
- เมนูทั้งหมดเป็น **ลิงก์ภายใน** ไม่ใช่หน้าเว็บแยก → คลิกแล้ว "เลื่อน" ไปที่ส่วนนั้น
- `js:113` จะใส่ class `active` ให้ลิงก์ที่กำลังดูอยู่ (เปลี่ยนเป็นปุ่มสีน้ำเงิน)

```html
56      <button
58        class="nav-toggle"
58        id="navToggle"
61        aria-label="เปิด-ปิดเมนู"
62        aria-expanded="false"        ← ค่า true/false บอกสถานะเมนูให้โปรแกรมอ่านจอ
63        aria-controls="primaryNav"   ← ระบุว่าปุ่มนี้ควบคุม element ไหน
64      >
65        <span></span><span></span><span></span>   ← ขีด 3 ขีดของไอคอนแฮมเบอร์เกอร์
66      </button>
```
- ปุ่มนี้ `display: none` บนจอใหญ่ และ `display: flex` บนจอ ≤ 860px (CSS 1327)
- ขีด 3 ขีดจะหมุนเป็นกากบาทเมื่อเปิดเมนู (CSS 518–528 `is-open`)

## 1.4 Hero / หน้าแรก (บรรทัด 70–143)

```html
70  <main>                                   ← เครื่องหมายว่า "นี่คือเนื้อหาหลัก"
72    <section class="hero" id="home">        ← section แรก = เป้าหมายของลิงก์ #home
73      <div class="hero-glow" aria-hidden="true"></div>
                                             ← วงกลมเบลอสีน้ำเงินจางๆ (CSS 543 ใช้ radial-gradient)
                                                ไม่มีเนื้อหา → ซ่อนจาก screen reader
75      <div class="container hero-grid">
```
- `hero-grid` → `display: grid; grid-template-columns: 1.15fr 0.85fr` (CSS 557)
  - `fr` = fraction (สัดส่วน) → ซ้ายกว้างกว่าขวา ประมาณ 53% : 47%
  - มี 2 ลูก: `hero-text` (ซ้าย) และ `hero-media` (ขวา)

```html
76        <div class="hero-text reveal">     ← class "reveal" = จะค่อยๆ โผล่ตอนเลื่อนถึง (JS 155)
77          <p class="hero-eyebrow">
78            <span class="dot" aria-hidden="true"></span> ยินดีต้อนรับสู่เว็บไซต์ส่วนตัว
```
- `dot` คือจุดเขียวเล็กๆ + เขียวเรือง (CSS 577 `box-shadow: 0 0 0 4px` ทำให้เป็นวงแหวน)
- ตัวพ่อ `hero-eyebrow` เป็น pill ขาวขอบบาง (CSS 562)

```html
81          <h1 class="hero-title">
82            สวัสดีครับ ผม<br />
83            <span class="text-gradient">นราวิชญ์ ศิริ</span>
84          </h1>
```
- `<h1>` = หัวข้อชั้น 1 → Google ถือว่าเป็น "หัวข้อหลักของหน้า" (SEO สำคัญ หน้าควรมี h1 แค่ 1 อัน)
- `<br />` ขึ้นบรรทัดใหม่
- `text-gradient` → CSS 591 ใช้ `background-clip: text` + `color: transparent`
  **หลักการ:** สร้างพื้นหลังไล่สี แล้ว "ตัดรูปทรงให้เหลือแค่ส่วนที่เป็นตัวหนังสือ" จึงดูเหมือนตัวอักษรไล่สี

```html
86          <ul class="role-tags" aria-label="ตำแหน่งที่สนใจ">
87            <li>IT Support</li>
88            <li>Frontend Developer</li>
89            <li>Network / Wi-Fi Setup</li>
90          </ul>
```
- แท็กป้ายตำแหน่งงาน 3 อัน (CSS 598 ทำให้มีเงาและขอบสีน้ำเงินอ่อน)

```html
92          <p class="hero-desc"> ... </p>     ← ย่อหน้าวัตถุประสงค์ (สีเทา `--muted`)
98          <div class="hero-actions">
99            <a class="btn btn-primary" href="#contact">ติดต่อผม</a>
100           <a class="btn btn-outline" href="#experience">ดูประสบการณ์</a>
101           <button class="btn btn-ghost" type="button" id="printBtn">พิมพ์ / บันทึก PDF</button>
102         </div>
```
- **สังเกต:** 2 ตัวแรกเป็น `<a>` (ต้องมี `href`) → กระโดดไปส่วนนั้น
- ตัวที่ 3 เป็น `<button>` **ไม่มี href** เพราะไม่ได้ไปไหน แต่ต้อง "สั่งงาน" (JS เรียก `window.print()`)
- `id="printBtn"` คือจุดเชื่อมต่อที่ `js:260` ใช้ผูก event

```html
104         <ul class="hero-facts">
105           <li><span class="fact-label">อายุ</span>
106               <span class="fact-value">26 ปี</span></li>
...          ← การศึกษา / พื้นที่
111         </ul>
```
- CSS 632 ตั้ง `grid-template-columns: repeat(3, minmax(0, 1fr))` → 3 คอลัมน์เท่ากัน
- `minmax(0,1fr)` กันบล็อลุ่มเพราะเนื้อหายาว (ปัญหาคลาสสิกของ CSS Grid)
- `border-top` คั่นจากส่วนบน (CSS 636)

```html
120       <div class="hero-media reveal">
121         <div class="photo-frame">
122           <img
123             src="assets/images/profile.png"     ← path แบบสัมพัทธ์ (relative)
                                                      = อยู่ถัดจาก index.html นั่นเอง
124             alt="รูปถ่ายของ นราวิชญ์ ศิริ"       ← "ข้อความสำรอง" เมื่อรูปโหลดไม่ขึ้น
                                                      และใช้โดยโปรแกรมอ่านจอ (จำเป็นต้องมี)
125             width="270" height="360"            ← บอกขนาดจริงของรูป
                                                      → เบราว์เซอร์จองพื้นที่ไว้ล่วงหน้า
                                                      (กันรูปเด้งดันเนื้อหาตอนโหลดเสร็จ = CLS)
127             loading="eager"                    ← โหลดทันที (เพราะอยู่บนสุดของหน้า)
128           />
129         </div>
131         <div class="hero-card">
132           <span class="hero-card-icon" aria-hidden="true">💻</span>
134           <div><strong>พร้อมเริ่มงาน</strong>
135                <span>IT Support · Frontend</span></div>
139       </div>
141       <div class="hero-wave" aria-hidden="true"></div>
```
- `photo-frame` (CSS 666) ให้พื้นหลังไล่สีน้ำเงินเป็นกรอบ + `box-shadow` เงาลึก
- `::after` (CSS 675) วางทับ 10px เอาไว้ทำขอบในสีขาวโปร่ง
- `hero-card` (CSS 693) ติด **absolute** กับ `bottom:-18px; left:50%; transform: translateX(-50%)`
  → ตรึงกึ่งกลางขอบล่างของรูป โผล่ลงมา 18px
- `hero-wave` (CSS 732) ใช้ `clip-path: polygon(...)` ตัดเป็นลายคลื่นด้านล่าง

## 1.5 เกี่ยวกับ / ข้อมูลส่วนตัว (บรรทัด 145–242)

```html
145     <section class="section" id="about">
147       <header class="section-head reveal">
148         <span class="section-kicker">เกี่ยวกับผม</span>   ← ป้ายเล็กๆ เหนือหัวข้อ
149         <h2 class="section-title">ข้อมูลส่วนตัว &amp; วัตถุประสงค์</h2>
150         <p class="section-sub">...</p>                     ← คำโปรยใต้หัวข้อ
153       </header>
155       <div class="about-grid">                             ← grid 2 คอลัมน์ (CSS 744)
```
- **รูปแบบของทุก section:** `section` → `container` → `section-head` → เนื้อหา
  ท้ายสุดปิด `</section>` ซ้อนกัน 3 ชั้นให้เรียบร้อย

```html
157         <article class="card card-pad reveal">             ← การ์ดซ้าย
159           <h3 class="card-title"><span class="icon-badge">👤</span> ข้อมูลส่วนตัว</h3>
162           <dl class="info-list">                            ← Definition List
163             <div class="info-row">
164               <dt>ชื่อ-นามสกุล</dt>                         ← คำศัพท์ (dt = definition term)
165               <dd>นราวิชญ์ ศิริ</dd>                        ← คำอธิบาย (dd = definition data)
166             </div>
...
180               <dt>อีเมล</dt>
181               <dd><a href="mailto:Narawit120943@proton.me">...</a></dd>
184               <dt>เบอร์ติดต่อ</dt>
185               <dd><a href="tel:0931670569">093-167-0569</a></dd>
188               <dt>GitHub</dt>
190                 <a href="https://github.com/DOOMGUY39527"
                       target="_blank"                        ← เปิดแท็บใหม่
                       rel="noopener noreferrer">             ← ป้องกันหน้าใหม่เข้าถึง
                                                                 window.opener (ช่องโหว่ความปลอดภัย)
198           </dl>
196         </article>
200         <article class="card card-pad card-accent reveal"> ← การ์ดน้ำเงินเข้ม (วัตถุประสงค์)
211         <article class="card card-pad reveal">              ← การ์ดภาษา
215           <ul class="lang-list"> ...
227         <article class="card card-pad reveal">              ← การ์ดงานอดิเรก
231           <ul class="chip-list"> ...  <li class="chip">ศึกษา IT</li> ...
```
- `mailto:` เปิดโปรแกรมอ่านอีเมล / `tel:` เปิดแอปโทรออก → ใช้ได้ทั้งบนคอมและมือถือ
- `<dl>` เหมาะกับ "ชื่อ: ค่า" มากกว่าตาราง เพราะค้นหาได้และอ่านด้วยเสียงได้ดีกว่า

## 1.6 ทักษะและความสามารถ (บรรทัด 244–319)

```html
244     <section class="section section-alt" id="skills">
```
- `section-alt` = ไล่สีพื้นหลังต่างจาก section ปกติ (CSS 168) → ทำให้ส่วนสลับขาว/ฟ้าดูมีจังหวะ

```html
254         <article class="card card-pad skill-card reveal">   ← การ์ด IT Support
255           <span class="skill-icon">🛠️</span>
257           <ul class="bullet-list"> ...
266         <article class="card card-pad skill-card reveal">   ← การ์ด Programming
270             <div class="progress-group">
271               <div class="progress-item">
272                 <div class="progress-head">
273                   <span>Python</span>
274                   <span class="progress-pct">70%</span>
276                 <div class="progress-track"><span class="progress-bar" data-level="70"></span></div>
```
- แถบ 1 ชิ้น = 3 ชั้น: `progress-item` > `progress-track` (ราง) > `progress-bar` (ตัวเติม)
- **`data-level="70"` คือ contract ระหว่าง HTML กับ JS**
  - HTML บอกค่า
  - `js:193` อ่านด้วย `bar.getAttribute("data-level")`
  - `js:194` เขียนเป็น `bar.style.width = "70%"`
  - ตอนแรก CSS กำหนด `width: 0` (บรรทัด 890) แถบจึงยังว่างเปล่าอยู่ → พอ JS เติมค่า
    `transition: width 1.1s` (CSS 893) จะทำให้แถบ "วิ่งขยาย" อย่างสวยงาม
- ถ้าแก้ % ให้แก้ทั้ง `progress-pct` (ตัวเลขที่เห็น) และ `data-level` (ความกว้างจริง) ให้ตรงกัน
- จบด้วยการ์ด Soft Skills (306)

## 1.7 ประสบการณ์การทำงาน (บรรทัด 321–396)

```html
329         <ol class="timeline">                ← ใช้ <ol> (Ordered List) เพราะมีลำดับเวลา
330           <!-- 1 -->
331           <li class="timeline-item reveal">
332             <span class="timeline-dot" aria-hidden="true"></span>   ← จุดกลมบนเส้น
333             <div class="timeline-card card">
334               <div class="timeline-head">
336                 <h3 class="timeline-role">FRONTEND DEVELOPER (ฝึกงาน)</h3>
337                 <p class="timeline-org">บริษัท นาโนคอฟฟี่...</p>
341                 <span class="badge">เมษายน 2566 – พฤษภาคม 2566</span>
343               <ul class="bullet-list"> ... 6 ข้อ ...
353           </li>
354           <!-- 2 --> งานดูดวงไพ่ทาโรต์ ...
373           <!-- 3 --> พนักงานจ้างเหมา ...
396         </ol>
```
- เส้น timeline ไม่ได้เป็น element จริง เป็น `::before` ของ `.timeline` (CSS 908)
  วาง `left: 9px; width: 2px` ยาวตั้งแต่บนสุดถึงล่างสุด แล้ว `timeline-dot` (CSS 922)
  ถูกวาง `left: -34px` (เลื่อนออกนอก `<li>`) ให้ไปตกบนเส้นพอดี
- `.timeline-head` มี `border-bottom: 1px dashed` (CSS 946) = เส้นประคั่นระหว่างหัวข้อกับรายละเอียด

## 1.8 ประวัติการศึกษา (บรรทัด 398–428)

```html
406         <div class="edu-grid">              ← grid 2 คอลัมน์ (CSS 964)
407           <article class="card card-pad edu-card reveal">
408             <div class="edu-icon">🏫</div>    ← กล่องเหลี่ยมสีน้ำเงินใส่อีโมจิ
409             <div class="edu-body">
410               <span class="badge">2559 – 2562</span>
411               <h3 class="edu-degree">ระดับมัธยม</h3>
412               <p class="edu-school">โรงเรียนแม่แตง</p>
416           <article ...> ปริญญาตรี / มหาวิทยาลัยแม่โจ้ / สาขาวิชาวิทยาการคอมพิวเตอร์
```
- `.edu-card` เป็น `display: flex` (CSS 972) → ไอคอนซ้าย เนื้อหาขวา
- `flex-shrink: 0` ที่ `.edu-icon` (CSS 983) กันไอคอนถูกบีบเวลาจอแคบ

## 1.9 โปรเจคส่วนตัว (บรรทัด 430–488)

```html
438         <div class="projects-grid">         ← grid 3 คอลัมน์ (CSS 1016)
439           <article class="card project-card reveal">
440             <div class="project-top"><span class="project-emoji">🧾</span></div>
443             <div class="project-body">
444               <h3 class="project-title">เว็บคำนวณค่าลดหย่อนภาษีส่วนบุคคล</h3>
448               <ul class="chip-list"> <li class="chip chip-sm">Web Application</li> ...
454           </article>
455           <article ...> ระบบจัดการข้อมูลด้วย PYTHON
469           <article ...> การตั้งค่าเครือข่ายในบ้าน
```
- `.project-card` มี `overflow: hidden` (CSS 1022) → มุมโค้งของการ์ดตัดรูปภายในให้ไม่ล้นออก
- `.project-top` (CSS 1029) เป็นกล่องสูง 130px ไล่สีฟ้า + `border-bottom` กั้นกับเนื้อหา
- `.project-body` ใช้ `display: flex; flex-direction: column; flex: 1` (CSS 1044)
  → การ์ด 3 ใบสูงเท่ากันเสมอ ไม่ว่าเนื้อหายาวแค่ไหน

## 1.10 ติดต่อ (บรรทัด 490–550)

```html
490     <section class="section section-contact" id="contact">
492       <div class="contact-card reveal">      ← การ์ดน้ำเงินใหญ่ (CSS 1072)
493         <div class="contact-main">           ← ซ้าย: หัวข้อ + ปุ่ม
494           <span class="section-kicker">ติดต่อ</span>
495           <h2 class="contact-title">พร้อมร่วมงานกับทีมของคุณ</h2>
501           <div class="contact-actions">
502             <a class="btn btn-primary" href="mailto:...">ส่งอีเมล</a>
505             <a class="btn btn-outline" href="tel:0931670569">โทร 093-167-0569</a>
505             <a class="btn btn-ghost" href="https://github.com/..." target="_blank" ...>
517         <ul class="contact-list">            ← ขวา: รายการติดต่อ 4 ชิ้น
518           <li><span class="contact-icon">✉️</span> ...
```
- `contact-card` เป็น `grid-template-columns: 1.1fr 0.9fr` (CSS 1074)
- `::after` (CSS 1085) ทำลูกกลมสีขาวโปร่ง 380px คร่อมมุมขวาล่างเป็นลายตกแต่ง

## 1.11 ส่วนท้ายและของที่เหลือ (บรรทัด 552–568)

```html
552     </main>
555     <footer class="site-footer">
556       <div class="container footer-inner">
557         <p>© <span id="year">2026</span> นราวิชญ์ ศิริ — Portfolio</p>
558         <p class="footer-note">สร้างด้วย HTML, CSS และ JavaScript</p>
561     </footer>
563     <button class="to-top" id="toTop" type="button" aria-label="กลับขึ้นด้านบน">↑</button>
566     <script src="assets/js/main.js"></script>
567   </body>
```
- `<span id="year">2026</span>` คือ "ตัวยึด" ให้ `js:275` เขียนปีปัจจุบันทับเอง
- `<script>` อยู่ **ท้ายสุดของ body** จงใจ → โหลด HTML เสร็จก่อนแล้วค่อยโหลด JS
  ถ้าย้ายขึ้น `<head>` โดยไม่มี `defer` เว็บจะขาวค้างตอนโหลด JS
- `<script>` ไม่มี `async/defer` ปกติ → JS หยุดรอ DOM ทันที แต่โค้ดก็ยังรอ
  `DOMContentLoaded` ที่ `js:23` ซ้ำอีกชั้นเพื่อความแน่นอน

---

# บทที่ 2 — `assets/css/style.css` (1,530 บรรทัด)

ไฟล์นี้แบ่ง 14 หมวดตามสารบัญที่เขียนไว้บรรทัด 1–21

## 2.1 หมวด 1: Design Tokens (บรรทัด 23–64)

```css
26  :root {
28    --blue-50: #eff6ff;
     ...
38    --white: #ffffff;
39    --bg: #f6f9ff;              ← สีพื้นหลังเว็บ (ฟ้าจางๆ)
40    --bg-soft: #eef4ff;
41    --navy: #0f172a;            ← สีตัวอักษรหัวข้อ (เข้มเกือบดำ)
42    --text: #1e293b;            ← สีตัวอักษรเนื้อความ
43    --muted: #64748b;           ← สีตัวอักษรรอง (เทา)
44    --border: #e2e8f0;
47    --shadow-sm/md/lg: ...      ← 3 ระดับของเงา
52    --radius-sm: 10px; --radius: 16px; --radius-lg: 24px; --radius-full: 999px;
58    --container: 1140px;  --header-h: 74px;
62    --font-head: "Prompt", ...;  --font-body: "Noto Sans Thai", ...;
64  }
```
- ชื่อขึ้นต้น `--` เรียกว่า **CSS Custom Property** (ตัวแปร CSS)
- ประโยชน์: แก้สีน้ำเงินหลัก **จุดเดียว** ที่นี่ ทุกปุ่ม/ลิงก์ในเว็บเปลี่ยนตาม
- ใช้ด้วย `var(--blue-600)`
- `:root` คือ `<html>` → ตัวแปรนี้สืบทอดไปทุก element (CSS มี cascade หรือการสืบทอดค่า)

## 2.2 หมวด 2: รีเซ็ตและค่าพื้นฐาน (บรรทัด 66–151)

```css
75  html {
76    scroll-behavior: smooth;                    ← เมื่อกระโดดด้วย #anchor จะ "เลื่อนอย่างนุ่มนวล"
                                                      ไม่ใช่กระเด้งทันที
77    scroll-padding-top: calc(var(--header-h) + 16px);
                                                   ← เลื่อนถึงหัวข้อแล้วเว้นที่ไว้ 74px ด้านบน
                                                   เพราะ header ติดขอบบน (fixed) ไม่งั้นหัวข้อจะถูกทับ
78    -webkit-text-size-adjust: 100%;
79  }
81  body {
83    font-family: var(--font-body);
84    font-size: 16px;
85    line-height: 1.75;                          ← ระยะบรรทัด 1.75 เท่า = ไทยอ่านง่าย (ต้องมีที่ให้สระ)
86    color: var(--text);
87    background-color: var(--bg);
88    overflow-x: hidden;                         ← ปิดการเลื่อนแนวนอน กันหน้าล้นจอ
89  }
91  h1,h2,h3,h4 { font-family: var(--font-head); color: var(--navy); ... }
103  a { color: var(--blue-600); transition: color .2s ease; }   ← ลิงก์ = สีน้ำเงิน + เปลี่ยนสีเนียนๆ
113 img { max-width: 100%; display: block; }     ← กันรูปล้นกริด ต้องมี display:block
                                                      เพราะ img เป็น inline ตามธรรมชาติ (มีช่องว่างใต้รูป)
118 ul,ol { margin:0; padding:0; list-style:none; }   ← รีเซ็ตรายการให้ว่าง
129 :focus-visible { outline: 3px solid var(--blue-500); ... }
                                                   ← วงโฟกัสสีน้ำเงิน 3px เฉพาะตอนกด Tab
                                                      (ไม่โผล่ตอนคลิกเมาส์ → ดูไม่เกะกะ)
136 .skip-link { position: absolute; top: -60px; ... }   ← ซ่อนไว้นอกจอด้านบน
148 .skip-link:focus { top: 12px; }              ← เฉพาะตอนได้โฟกัสถึงโผล่ลงมา
```

## 2.3 หมวด 3: องค์ประกอบใช้ซ้ำ (บรรทัด 153–388)

```css
156 .container { max-width: var(--container); margin: 0 auto; padding: 0 24px; }
                                                   ← margin auto ซ้าย-ขวา = จัดกึ่งกลาง
                                                   ← padding 24px กันเนื้อติดขอบจอ
163 .section { padding: 96px 0; }                 ← ระยะห่างบน-ล่างของแต่ละส่วน
168 .section-alt { background: linear-gradient(...); border-top/bottom: 1px solid ...; }

174 .section-head { max-width: 640px; margin: 0 auto 56px; text-align: center; }
                                                   ← หัวข้อส่วนถูกบังคับให้แคบ 640px กึ่งกลาง
                                                   ← margin ล่าง 56px เว้นที่ให้เนื้อหา
180 .section-kicker { display: inline-block; ... border-radius: var(--radius-full); }
                                                   ← ทำเป็นป้ายวงรี (ค่าเดียวกับ 999px = ครึ่งหนึ่ง
                                                     ของความสูง → กลายเป็นวงกลม/แคปซูลเสมอ)

206 .card {
207   background: var(--white);
208   border: 1px solid var(--border);
209   border-radius: var(--radius);               ← มุมโค้ง 16px
210   box-shadow: var(--shadow-sm);
211   transition: transform .25s, box-shadow .25s, border-color .25s;
212 }
214 .card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); border-color: var(--blue-200); }
                                                   ← เลื่อนเมาส์ → การ์ดเด้งขึ้น 4px
220 .card-pad { padding: 28px; }                  ← ระยะห่างภายในการ์ด
224 .card-title { display: flex; gap: 10px; border-bottom: 1px dashed ...; }
                                                   ← flex + gap = จัดไอคอนกับข้อความเรียงกัน
                                                     โดยไม่ต้องใส่ margin ทีละตัว
234 .card-accent { background: linear-gradient(160deg, var(--blue-600), var(--blue-900)); }
                                                   ← การ์ดวัตถุประสงค์เป็นไล่สีเข้ม
                                                   ← ภายในมี `.card-accent .card-title` (240)
                                                     = เลือก descendant (ลูกหลาน) ของ .card-accent
                                                     ที่มี class card-title เท่านั้น → ตัวหนังสือเป็นขาว

261 .btn { display: inline-flex; align-items: center; justify-content: center;
           padding: 13px 26px; border-radius: var(--radius-full);
           border: 2px solid transparent; cursor: pointer;
           transition: transform .2s, ...; white-space: nowrap; }
277 .btn:hover { transform: translateY(-2px); }   ← ปุ่มเด้งขึ้นตอนชี้
281 .btn-primary { background: var(--blue-600); color: #fff; box-shadow: ...; }
292 .btn-outline { background: transparent; color: var(--blue-700); border-color: var(--blue-200); }
304 .btn-ghost   { background: var(--white); color: var(--text); border-color: var(--border); }
321 .badge / 340 .chip / 349 .chip-sm                     ← ป้ายและแท็ก (สีฟ้าจาง ขอบบาง วงรี)
355 .bullet-list { display: grid; gap: 8px; }
360 .bullet-list li { position: relative; padding-left: 22px; color: var(--muted); }
367 .bullet-list li::before {
368     content: "";                               ← สร้าง "ของปลอม" ขึ้นมาใน ::before
369     position: absolute; left: 4px; top: .7em;
372     width: 7px; height: 7px; border-radius: 50%; background: var(--blue-500);
376 }
                                                   ← นี่คือจุดกลมหน้ารายการ ไม่ใช่อีโมจิ
                                                   ← ต้อง position:absolute ซ้อนบน li ที่เป็น relative
379 .scroll-progress { position: fixed; top:0; left:0; height:3px; width:0; z-index:150; }
                                                   ← fixed = ติดจอ ไม่เลื่อนไปกับหน้า
                                                   ← z-index 150 สูงกว่า header (100) → ทับอยู่บนสุด
                                                   ← width เริ่มที่ 0 → JS ค่อยๆ ขยาย
```

## 2.4 หมวด 4: Header & เมนู (บรรทัด 390–528)

```css
393 .site-header {
394   position: fixed; inset: 0 0 auto 0;          ← inset 4 ค่า = top right bottom left
                                                      ได้ top:0 right:0 left:0 → ติดขอบบนเต็มความกว้าง
396   height: var(--header-h);                     ← สูง 74px (ต้องตรงกับ scroll-padding-top)
398   background: rgba(255,255,255,.85);
399   backdrop-filter: blur(12px);                 ← เบลอเนื้อหาที่อยู่ใต้ header (glass effect)
397   z-index: 100;                                ← ให้อยู่เหนือเนื้อหาปกติ
402   transition: ...;
405 }
405 .site-header.is-scrolled { border-bottom-color: var(--border); box-shadow: ...; }
                                                   ← ใส่เงาเฉพาะตอนเลื่อนหน้า (JS 44)
410 .header-inner { height: 100%; display: flex; align-items: center; justify-content: space-between; }
                                                   ← space-between = ชิดซ้ายสุดและขวาสุด
473 .nav-link { ... border-radius: var(--radius-full); transition: background-color .2s; }
484 .nav-link:hover { background: var(--blue-50); color: var(--blue-700); }
489 .nav-link.active { background: var(--blue-600); color: #fff; }
                                                   ← เมนูที่กำลังดู = ปุ่มสีน้ำเงิน (JS 110 เปิด class นี้)
495 .nav-toggle { display: none; flex-direction: column; gap: 5px; width: 46px; height: 46px; }
                                                   ← เดสก์ท็อปซ่อน พอจอแคบกว่า 860px
                                                     media query (1352) จะสั่ง display:flex
509 .nav-toggle span { display: block; height: 2px; background: var(--navy); transition: transform .25s; }
518 .nav-toggle.is-open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
522 .nav-toggle.is-open span:nth-child(2) { opacity: 0; }
526 .nav-toggle.is-open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
                                                   ← nth-child(1/2/3) = เลือกลูกคนที่ 1/2/3
                                                   ← ขีดบนเลื่อนลง+หมุน 45°, ขีดกลางจางหาย, ขีดล่างเลื่อนขึ้น+หมุน -45°
                                                     ผลลัพธ์ = กากบาท (≡ ปิดเมนู)
```

## 2.5 หมวด 5: Hero (บรรทัด 530–739)

```css
533 .hero {
535   padding: calc(var(--header-h) + 72px) 0 120px;
                                                   ← หักส่วนที่ header บังออก 74+72=146px
536   background: radial-gradient(...) , radial-gradient(...) , linear-gradient(...);
                                                   ← ซ้อน gradient 3 ชั้น
                                                   ← radial = กลม (วงแสง), linear = ตรง
541 }
543 .hero-glow { position: absolute; top:-140px; right:-120px; width:460px; height:460px;
                border-radius: 50%; background: radial-gradient(...); pointer-events: none; }
                                                   ← pointer-events:none = คลิกทะลุได้
                                                     ไม่บังปุ่มข้างใต้
554 .hero-grid { display: grid; grid-template-columns: 1.15fr .85fr; gap: 60px; align-items: center; }
1295 .hero-media { order: -1; }  ← ใน @media 1024 (1290 .hero-grid) ทำให้รูปขึ้นก่อนบนจอเล็ก
591 .text-gradient { background: linear-gradient(...); background-clip: text; color: transparent; }
623 .hero-actions { display: flex; flex-wrap: wrap; gap: 12px; }
                                                   ← flex-wrap ให้ปุ่มห่อเป็นบรรทัดใหม่บนจอแคบ
684 .photo-frame img { aspect-ratio: 3 / 4; object-fit: cover; }
                                                   ← object-fit:cover = ย่อ/ครอปรูปให้เต็มช่อง
                                                     โดยไม่บิดเบี้ยว (สำคัญมากกับภาพคน)
666 .photo-frame { width: min(320px,100%); background: linear-gradient(...); border-radius: 24px; }
                                                   ← min() = เลือกค่าน้อยกว่า ไม่ให้เกินจอ
693 .hero-card { position: absolute; bottom: -18px; left: 50%; transform: translateX(-50%); }
                                                   ← สูตรกลางสูตรคลาสสิก:
                                                     left:50% แล้วถอยหลังครึ่งความกว้างของตัวเอง
                                                     ด้วย translateX(-50%) → อยู่กึ่งกลางพอดี
732 .hero-wave { position: absolute; bottom: -1px; height: 60px; background: var(--bg);
                 clip-path: polygon(0 62%, 15% 44%, ...); }
                                                   ← กำหนดจุด 8 จุดเป็นค่า % แล้วตัดรูปทรงเป็นคลื่น
```

## 2.6 หมวด 6–10: ส่วนเนื้อหา (บรรทัด 741–1061)

```css
744 .about-grid  { display: grid; grid-template-columns: 1.05fr .95fr; gap: 28px; align-items: start; }
                                                   ← align-items:start = ซ้าย-ขวาไม่บังคับให้สูงเท่ากัน
                                                     (ถ้าเป็น stretch การ์ดซ้ายจะยืดยาวตามขวา)
761 .info-row { display: grid; grid-template-columns: 130px 1fr; border-bottom: 1px dashed ...; }
                                                   ← 2 คอลัมน์: ชื่อ field 130px ตายตัว / ค่าเหลือพื้นที่
799 .lang-list li { display: flex; justify-content: space-between; }
                                                   ← flex + space-between = ชิดซ้ายสุดและขวาสุด
828 .skills-grid { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 24px; }
                                                   ← repeat(3, ...) = 3 คอลัมน์เท่ากัน
879 .progress-track { height: 8px; background: var(--blue-50); border: 1px solid ...; overflow: hidden; }
887 .progress-bar   { width: 0; height: 100%; background: linear-gradient(...);
                      transition: width 1.1s cubic-bezier(.22,1,.36,1); }
                                                   ← cubic-bezier = ฟังก์ชันจังหวะ (ease-out แรง)
                                                   ← width:0 = จุดเริ่ม  JS ค่อยเติมให้
899 .timeline { position: relative; padding-left: 34px; display: grid; gap: 26px; max-width: 900px; }
908 .timeline::before { content:""; position: absolute; left: 9px; top: 12px; bottom: 12px;
                        width: 2px; background: linear-gradient(...); }
                                                   ← top 12px + bottom 12px = ยืดเต็มความสูงของ timeline
                                                     โดยไม่ต้องรู้ความสูงล่วงหน้า
922 .timeline-dot { position: absolute; left: -34px; top: 26px; width: 20px; height: 20px;
                    border-radius: 50%; background: #fff; border: 4px solid var(--blue-500); }
                                                   ← ซ้ายติดลบ = ถอยออกนอก <li> มารับเส้น
964 .edu-grid { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); }
972 .edu-card { display: flex; gap: 20px; align-items: flex-start; }
1016 .projects-grid { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); }
1022 .project-card { overflow: hidden; display: flex; flex-direction: column; padding: 0; }
1044 .project-body { display: flex; flex-direction: column; flex: 1; gap: 10px; }
                                                   ← flex:1 = ยืดเต็มที่เหลือของการ์ด
                                                     → ป้าย chip ด้านล่างทุกใบชิดกัน
```

## 2.7 หมวด 11: ติดต่อ & Footer (บรรทัด 1063–1222)

```css
1072 .contact-card { display: grid; grid-template-columns: 1.1fr .9fr; gap: 40px;
                     padding: 48px; border-radius: 24px;
                     background: linear-gradient(150deg, var(--blue-700), var(--blue-900)); }
1085 .contact-card::after { content:""; position: absolute; right:-120px; bottom:-140px;
                            width:380px; height:380px; border-radius:50%; ... }
                                                   ← การ์ดต้องมี position:relative ถึงจะให้
                                                     ::after อ้างอิงได้ (ดูที่ 1072 บรรทัดถัดไป)
1108 .contact-card .section-kicker { background: rgba(255,255,255,.14); color:#fff; }
                                                   ← selector ซ้อน 2 ชั้น = "kicker ที่อยู่ใน contact-card"
                                                     ทับค่าเดิมโดยไม่ต้องไปแก้ของเดิม
1201 .site-footer { background: var(--navy); padding: 26px 0; color: rgba(255,255,255,.75); }
```

## 2.8 หมวด 12: แอนิเมชัน (บรรทัด 1224–1284)

```css
1227 .reveal {
1228   opacity: 0;                  ← โปร่งใส (มองไม่เห็น)
1229   transform: translateY(24px); ← อยู่ต่ำกว่าปกติ 24px
1230   transition: opacity .7s, transform .7s cubic-bezier(.22,1,.36,1);
1231 }
1233 .reveal.is-visible { opacity: 1; transform: none; }
                                                   ← JS ใส่ class is-visible เมื่อ element เข้าจอ
                                                     → transition ทำให้ค่อยๆ โผล่และเลื่อนขึ้น
                                                   ← ถ้าไม่มี JS เลย? element จะค้างที่ opacity:0
                                                     (จุดอ่อนที่ต้องรู้: ให้ JS คือ "ทางเดียว" ที่จะเห็น)
                                                     → ส่วน prefers-reduced-motion ด้านล่างช่วยบางกรณี
1270 @media (prefers-reduced-motion: reduce) {
1271   html { scroll-behavior: auto; }
1275   .reveal { opacity: 1; transform: none; transition: none; }
1281 }
                                                   ← เคารพผู้ใช้ที่ปิดแอนิเมชันในระบบ
                                                     (คนที่มีอาการเวียนศีรษะจากการเคลื่อนไหว)
1238 .to-top { position: fixed; right: 22px; bottom: 22px; width: 48px; height: 48px;
              opacity: 0; visibility: hidden; transform: translateY(12px);
              transition: opacity .25s, transform .25s, visibility .25s; }
1259 .to-top.is-visible { opacity: 1; visibility: visible; transform: none; }
                                                   ← visibility ต้อง transition ด้วย ไม่งั้นปุ่ม
                                                     ยังคลิกได้ทั้งที่มองไม่เห็น
```

## 2.9 หมวด 13: Responsive (บรรทัด 1286–1454)

```css
1289 @media (max-width: 1024px) {        ← แท็บเล็ตแนวนอน / แล็ปท็อปจอเล็ก
1290   .hero-grid { grid-template-columns: 1fr; gap: 72px; }   ← คอลัมน์เดียว ทับซ้อนบนล่าง
1295   .hero-media { order: -1; }        ← รูปขึ้นก่อน
1303   .skills-grid, .projects-grid { grid-template-columns: repeat(2, ...); }
1308   .about-grid, .contact-card { grid-template-columns: 1fr; }
1318 @media (max-width: 860px) {         ← จอมือถือ แนวตั้ง
1319   :root { --header-h: 66px; }       ← ปรับตัวแปร :root ให้ทุกที่ที่ใช้ var(--header-h) ตามไปด้วย
1332   .nav { position: fixed; top: var(--header-h); ...; visibility: hidden; opacity: 0; transform: translateY(-14px); }
1354   .nav.is-open { visibility: visible; opacity: 1; transform: none; }
                                                   ← ซ่อน-แสดงเมนูด้วย visibility+opacity+transform
                                                     (visibility ทำให้ Tab ข้ามเมนูที่ปิดอยู่ได้)
1410 @media (max-width: 640px) {         ← มือถือจอเล็ก
1419   .skills-grid, .projects-grid, .edu-grid { grid-template-columns: 1fr; }
1437   .hero-actions .btn, .contact-actions .btn { flex: 1 1 100%; }  ← ปุ่มเต็มความกว้าง
```
- **หลักการ: Mobile First ย้อนกลับ** → เขียนค่าปกติไว้ก่อน (จอใหญ่) แล้วใช้
  `max-width` หดเล็กลงเรื่อยๆ ค่าที่เขียนทีหลังชนะเพราะซ้ำ selector แล้ว
- จุดสำคัญ: **`--header-h` ต้องเปลี่ยนพร้อมกัน** เพราะ `scroll-padding-top` (บรรทัด 77) และ
  `top:` ของเมนูมือถือ (1340) ต่างพึ่งพาตัวแปรเดียวกัน

## 2.10 หมวด 14: โหมดพิมพ์ (บรรทัด 1456–1530)

```css
1459 @media print {
1470   .site-header, .nav-toggle, .to-top, .scroll-progress,
          .hero-actions, .skip-link, .contact-actions { display: none !important; }
                                                   ← ตอนพิมพ์ไม่ต้องการเมนู/ปุ่ม
                                                   ← !important ใช้ที่นี่เพราะต้องชนะ rules อื่น
1482   .section { padding: 18px 0; break-inside: avoid; }
                                                   ← break-inside:avoid = กันให้เนื้อหาแต่ละส่วน
                                                     ไม่ถูกตัดคร่อม 2 หน้ากระดาษ
1489   .contact-card { background: #fff !important; padding: 0; box-shadow: none; }
                                                   ← การ์ดน้ำเงินเข้มจะเปลืองหมึก จึงยกเลิก
1517   .reveal { opacity: 1 !important; transform: none !important; }
                                                   ← จำเป็นมาก: ตอนพิมพ์ไม่มี scroll
                                                     IntersectionObserver ไม่ทำงาน
                                                     ถ้าไม่บังคับ opacity 1 จะพิมพ์กระดาษเปล่า
1526   a { color: #000; text-decoration: underline; }  ← ลิงก์เป็นดำขีดเส้นใต้ ไม่ต้องพึ่งสี
1530 }
```

---

# บทที่ 3 — `assets/js/main.js` (277 บรรทัด)

## 3.1 โครงสร้างโดยรวม (อ่านก่อนทุกส่วน)

```js
16  (function () {          ← ห่อทั้งไฟล์ใน IIFE (Immediately Invoked Function Expression)
17    "use strict";         ← เปิด strict mode: จับ typo ที่ปกติ JS ปล่อยผ่าน เช่น
                                การลืม var จะโยน error แทนที่จะสร้าง global variable
18
20    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                                ← อ่านค่าจากระบบ: ผู้ใช้เปิด "ลดการเคลื่อนไหว" ไหม?
                                  ถ้า true → ข้ามแอนิเมชันทั้งหมด
23    document.addEventListener("DOMContentLoaded", init);
                                ← รอให้ DOM ถูกสร้างครบก่อนรัน init
                                  (ถ้า JS อยู่ท้าย body ส่วนใหญ่ DOM พร้อมแล้ว
                                   แต่กันไว้เผื่อเปลี่ยนตำแหน่งไฟล์ในอนาคต)
25    function init() {
26      setupHeader();         ← 8 ฟังก์ชันนี้ถูกเรียงตาม "งานที่ทำ"
27      setupMobileNav();
28      setupReveal();
29      setupProgressBar();
30      setupScrollProgress();
31      setupToTop();
32      setupPrintButton();
33      setupFooterYear();
34    }
```

**เหตุผลที่ใช้ IIFE:** ทุกตัวแปร/ฟังก์ชันจะถูกขังไว้ใน scope ของ closure นี้
ไม่รั่วไปเป็นตัวแระระดับ global (`window.setupHeader`) → ชนชื่อกับไลบรารีอื่นได้ยาก

## 3.2 `setupHeader()` (บรรทัด 39–51)

```js
39  function setupHeader() {
40    var header = document.getElementById("siteHeader");   ← หา element จาก id ใน HTML 34
41    if (!header) return;              ← "ป้องกันไว้ก่อน": ถ้าไม่เจอ (HTML ถูกลบไป) ก็จบเงียบๆ
                                           ดีกว่าให้ JS ทั้งไฟล์พัง
43    var onScroll = function () {
44      header.classList.toggle("is-scrolled", window.scrollY > 10);
        };
        │     │              │              │
        │     │              │              └─ force: ถ้าเป็น true → เพิ่ม class
        │     │              │                  ถ้า false → ลบ class
        │     │              │                  (นี่คือ boolean expression ที่ประเมินทุกครั้งที่ scroll)
        │     │              └─ ระยะเลื่อนปัจจุบัน (px จากขอบบน)
        │     └─ ทำงานกับชุด class ของ element
        └─ ฟังก์ชันที่จะถูกเรียกซ้ำๆ
47    onScroll();                         ← ตั้งค่ารอบแรกทันที (เผื่อโหลดหน้าแล้วอยู่กลางหน้า)
48    window.addEventListener("scroll", onScroll, { passive: true });
        }
        └─ passive: true = บอกเบราว์เซอร์ว่า handler นี้จะไม่เรียก preventDefault()
           → เบราว์เซอร์เลื่อนหน้าต่อได้เลยโดยไม่ต้องรอ JS → การเลื่อนลื่นขึ้น
```

## 3.3 `setupMobileNav()` (บรรทัด 54–95)

```js
54  function setupMobileNav() {
55    var toggle = document.getElementById("navToggle");     ← HTML 58
56    var nav    = document.getElementById("primaryNav");    ← HTML 44
57    if (!toggle || !nav) return;
59    var closeNav = function () {
60      nav.classList.remove("is-open");
61      toggle.classList.remove("is-open");
62      toggle.setAttribute("aria-expanded", "false");   ← อัปเดตค่าให้โปรแกรมอ่านจอด้วย
63    };
65    toggle.addEventListener("click", function () {
66      var isOpen = nav.classList.toggle("is-open");   ← toggle() คืนค่าเป็น true/false
                                                         บอกว่า "ตอนนี้เปิดหรือปิด" หลังกด
67      toggle.classList.toggle("is-open", isOpen);      ← ให้ปุ่มฮัมเบอร์เกอร์เป็นตามเมนู
68      toggle.setAttribute("aria-expanded", String(isOpen));  ← String() แปลง boolean → "true"/"false"
69    });
72    nav.addEventListener("click", function (event) {
73      if (event.target.closest("a")) closeNav();
        });
        └─ คลิกลิงก์ในเมนู → ปิดเมนู
        └─ event.target = element ที่ถูกคลิกจริง (อาจเป็น <li> หรือ <a> ภายใน)
        └─ .closest("a") = ไล่ขึ้นไปหา ancestor ตัวแรกที่เป็น <a>
           → จึงจับได้ทั้งตอนคลิกที่ข้อความและคลิกที่พื้นที่ว่างของ <a>
77    document.addEventListener("keydown", function (event) {
78      if (event.key === "Escape") closeNav();
        });
82    document.addEventListener("click", function (event) {
83      if (!nav.classList.contains("is-open")) return;      ← เมนูปิดอยู่ → จบเลย
84      if (nav.contains(event.target) || toggle.contains(event.target)) return;
        });
        └─ คลิก "นอกเมนู" → ปิดเมนู (ตรงกับพฤติกรรมแอปทั่วไป)
        └─ กันปิดผิด: ถ้าคลิกอยู่ในเมนูหรือที่ปุ่มเอง ไม่ต้องปิด
89    window.addEventListener("resize", function () {
90      if (window.innerWidth > 860) closeNav();   ← ตัวเลข 860 ต้องตรงกับ @media (max-width: 860px)
        });                                         ที่ CSS 1318 ถ้าแก้อันหนึ่งต้องแก้อีกอันด้วย
93    highlightNavOnScroll();                      ← ไปทำงานย่อยต่อ (97)
94  }
```

## 3.4 `highlightNavOnScroll()` (บรรทัด 97–152) — ส่วนที่ซับซ้อนที่สุด

```js
97   function highlightNavOnScroll() {
98     var links = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));
         └─ querySelectorAll คืน NodeList (มี forEach แต่ไม่มี map)
         └─ Array.prototype.slice.call(...) = แปลงเป็น Array จริง เพื่อใช้ .map/.filter ได้
101    var sections = links
102      .map(function (link) {
103        var id = link.getAttribute("href");        ← "#about"
104        return id && id.charAt(0) === "#" ? document.querySelector(id) : null;
         });
         └─ เปลี่ยนจากลิงก์ → element ของ section จริง
         └─ charAt(0)==="#" คัดลิงก์ภายในเท่านั้น
106    .filter(Boolean);      ← เอา null ออก (Boolean(null)=false)
108    if (!sections.length) return;
110    var setActive = function (id) {
111      links.forEach(function (link) {
112        var isActive = link.getAttribute("href") === "#" + id;
113        link.classList.toggle("active", isActive);
114        if (isActive) {
115          link.setAttribute("aria-current", "true");   ← บอกโปรแกรมอ่านจอว่า "หน้านี้"
116        } else {
117          link.removeAttribute("aria-current");
118        }
119      });
120    };
122    if (!("IntersectionObserver" in window)) {      ← เบราว์เซอร์เก่าไม่มี API นี้
124      window.addEventListener("scroll", function () {   ← ใช้วิธีเดิมคือคำนวณจาก scrollY
127        var current = sections[0];
128        sections.forEach(function (section) {
129          if (window.scrollY >= section.offsetTop - 140) current = section;
           });
131        setActive(current.id);
         }, { passive: true });
         return;
136    }
138    var observer = new IntersectionObserver(
139      function (entries, obs) {
140        entries.forEach(function (entry) {
141          if (entry.isIntersecting) setActive(entry.target.id);
           });
         },
144      { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
147    sections.forEach(function (section) { observer.observe(section); });
150  }
```

**`rootMargin: "-45% 0px -50% 0px"`** คือหัวใจของฟีเจอร์นี้:
- ย่อพื้นที่ตรวจจับของ viewport ลง 45% บน และ 50% ล่าง
- เหลือแถบกลางจอแค่ 5% (ระหว่าง 45% ถึง 50% จากด้านบน)
- แปลว่า **section ไหนที่ "ข้ามแถบกลางจอ" ถือว่ากำลังถูกอ่านอยู่** → ไฮไลต์เมนูตัวนั้น
- ถ้าไม่มี rootMargin จะไฮไลต์ทุก section ที่โผล่แม้แต่ 1px ที่ขอบล่าง → สลับไปมาพร่ำเพรื่อ

**`threshold: 0`** = ยิง callback ทันทีที่ element แตะพื้นที่ตรวจจับ (ไม่ต้องรอให้เข้า 50%)

## 3.5 `setupReveal()` (บรรทัด 155–186)

```js
155  function setupReveal() {
156    var items = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
157    if (!items.length) return;
160    if (!("IntersectionObserver" in window) || reduceMotion) {
161      items.forEach(function (item) { item.classList.add("is-visible"); });
           └─ ทางเลือก A: ไม่มี IntersectionObserver หรือผู้ใช้ปิดแอนิเมชัน
              → แสดงทุกอย่างทันที ไม่มี animation (และสำคัญ: กันหน้าขาวเปล่า)
164      return;
165    }
167    var observer = new IntersectionObserver(
168      function (entries, obs) {
169        entries.forEach(function (entry) {
170          if (!entry.isIntersecting) return;
171          entry.target.classList.add("is-visible");   ← ใส่ class → CSS 1233 ค่อยๆ fade in
172          obs.unobserve(entry.target);                ← เลิกเฝ้า → ประหยัดงาน, ไม่ย้อนกลับ
           });
         },
175      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
           └─ threshold 0.12 = เห็นอย่างน้อย 12% ถึงจะยิง
           └─ rootMargin ล่าง -60px = กระตุ้นก่อนจริงถึงขอบล่าง 60px (ดูเนียนขึ้น)
179    items.forEach(function (item, index) {
180      item.style.transitionDelay = (index % 4) * 70 + "ms";
           └─ index % 4 → วน 0,1,2,3 → 0ms,70ms,140ms,210ms แล้วเริ่มใหม่
              ผล = การ์ดโผล่ทีละใบเป็นจังหวะ (stagger) ไม่ใช่พร้อมกันเป๊ะ
181      observer.observe(item);
182    });
183  }
```

## 3.6 `setupProgressBar()` (บรรทัด 188–219)

```js
188  function setupProgressBar() {
189    var bars = Array.prototype.slice.call(document.querySelectorAll(".progress-bar"));
190    if (!bars.length) return;
192    var fill = function (bar) {
193      var level = Number(bar.getAttribute("data-level")) || 0;
           └─ getAttribute คืน string ("70") → Number() แปลงเป็น 70
           └─ || 0 = ถ้า null/NaN → ใช้ 0 (ป้องกัน width: NaN% ซึ่ง browser ไม่สนใจอยู่ดี)
194      bar.style.width = level + "%";            ← แก้ inline style ความกว้าง
195      bar.style.setProperty("--print-width", level + "%");
           └─ ตั้งตัวแปร CSS ระดับ element → CSS print (1523) อ่าน var(--print-width)
              เวลาพิมพ์แถบจะถูกเซ็ตให้ถูกต้องโดยไม่ต้องพึ่ง JS
196    };
198    if (!("IntersectionObserver" in window) || reduceMotion) { bars.forEach(fill); return; }
203    var observer = new IntersectionObserver(
204      function (entries, obs) {
205        entries.forEach(function (entry) {
206          if (!entry.isIntersecting) return;
207          fill(entry.target);
208          obs.unobserve(entry.target);        ← เติมครั้งเดียว ไม่ต้องทำซ้ำ
           });
         },
211      { threshold: 0.4 });                   ← เห็น 40% ถึงเริ่ม (แถบอยู่กลางจอพอดี)
215    bars.forEach(function (bar) { observer.observe(bar); });
217  }
```

## 3.7 `setupScrollProgress()` (บรรทัด 222–238)

```js
222  function setupScrollProgress() {
223    var bar = document.getElementById("scrollProgress");   ← HTML 28
224    if (!bar) return;
226    var update = function () {
227      var doc = document.documentElement;        ← <html>
228      var scrollable = doc.scrollHeight - doc.clientHeight;
           └─ scrollHeight = ความสูงทั้งหมดของหน้า
           └─ clientHeight = ความสูงพื้นที่ที่เห็นจริง (viewport)
           └─ ผลต่าง = ระยะที่ยังเลื่อนได้อีก (px)
229      var percent = scrollable > 0 ? (doc.scrollTop / scrollable) * 100 : 0;
           └─ สามเหลี่ยม ? : แทน if/else แบบย่อ
           └─ ป้องกันหารด้วย 0 (หน้าสั้นมากจนเลื่อนไม่ได้ → ไม่ต้องคำนวณ)
230      bar.style.width = Math.min(percent, 100) + "%";   ← Math.min กันเกิน 100%
232    };
233    update();                                          ← คำนวณรอบแรก
234    window.addEventListener("scroll", update, { passive: true });
235    window.addEventListener("resize", update);          ← จอเปลี่ยนขนาด → สัดส่วนเปลี่ยน
236  }
```

## 3.8 `setupToTop()` (บรรทัด 241–257)

```js
241  function setupToTop() {
242    var button = document.getElementById("toTop");      ← HTML 563
243    if (!button) return;
245    var onScroll = function () {
246      button.classList.toggle("is-visible", window.scrollY > 500);   ← เลื่อนเกิน 500px ถึงโผล่
247    };
249    onScroll();
250    window.addEventListener("scroll", onScroll, { passive: true });
252    button.addEventListener("click", function () {
253      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
           └─ ถ้าผู้ใช้ปิดแอนิเมชัน → กระโดดทันที (auto)
              ไม่งั้น → เลื่อนอย่างนุ่มนวล
254    });
255  }
```

## 3.9 `setupPrintButton()` และ `setupFooterYear()` (บรรทัด 260–277)

```js
260  function setupPrintButton() {
261    var button = document.getElementById("printBtn");   ← HTML 101
262    if (!button) return;
264    button.addEventListener("click", function () {
265      window.print();           ← เปิดกล่องโต้ตอบพิมพ์ของเบราว์เซอร์
266    });                          (ผู้ใช้เลือก "บันทึกเป็น PDF" ได้จากที่นั่น)
267  }
272  function setupFooterYear() {
273    var year = document.getElementById("year");         ← HTML 557
274    if (!year) return;
275    year.textContent = String(new Date().getFullYear());  ← ปีปัจจุบัน 2026
276  }
```

**`textContent` vs `innerHTML`:** ใช้ `textContent` เสมอเมื่อเป็นข้อความล้วน
เพราะ `innerHTML` ตีความแท็ก HTML → ถ้าวันหนึ่งมีคนใส่ `<script>` ในค่า
จะกลายเป็นการรันโค้ด (XSS) `textContent` escape ให้อัตโนมัติ

---

# บทที่ 4 — `assets/images/favicon.svg` (12 บรรทัด)

```svg
2  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="NS">
       └─ viewBox 64x64 = พื้นที่วาดเสมือน ช่วยให้สเกลได้ทุกขนาด
4    <defs>
5      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">    ← ไล่สีทแยงมุม
7        <stop offset="0%" stop-color="#3b82f6" />
8        <stop offset="100%" stop-color="#1e3a8a" />
9      </linearGradient>
10   </defs>
11   <rect width="64" height="64" rx="16" fill="url(#g)" />    ← มุมโค้ง 16px เทียบกับโลโก้บนเว็บ
13   <text x="32" y="43" text-anchor="middle" font-size="28" font-weight="700" fill="#fff">NS</text>
                                                                       └─ x=32,y=43 ≈ กึ่งกลาง
```
SVG ทำงานได้เป็น favicon โดยตรง เพราะเป็น **เวกเตอร์** → คมทุกขนาด
และน้ำหนักเบากว่า PNG

---

# บทที่ 5 — แผนผังการเรียกใช้ (ใครเรียกใคร)

```
HTML                         CSS                          JS
─────────────────────────────────────────────────────────────────────
id="siteHeader"     34  ──────────────────────►  setupHeader        39
id="navToggle"      58  ──────────────────────►  setupMobileNav     54
id="primaryNav"     44  ──────────────────────►  setupMobileNav     56
class .nav-link          .nav-link.active 464 ◄─ highlightNavOnScroll 97
class .reveal       ทั้งไฟล์ ────────────────►  setupReveal       155
data-level=70        276 ──────────────────────►  setupProgressBar  188
id="scrollProgress"  28  ──────────────────────►  setupScrollProgress 222
id="toTop"          563  ──────────────────────►  setupToTop        241
id="printBtn"       101  ──────────────────────►  setupPrintButton  260
id="year"           557  ──────────────────────►  setupFooterYear   270
class .card .btn .section  ◄── class ต้องตรงกัน ──┘
```

**กฎทอง:** แก้อะไรสักอย่าง ให้ไล่ 3 ไฟล์
1. HTML — มี `id`/`class` ที่ต้องใช้ไหม
2. CSS — มี rule ที่อิง class เดียวกันไหม
3. JS — มี `getElementById`/`querySelector` ชี้ไหม

---

# บทที่ 6 — วิธีแก้ไขตามที่ต้องการแก้

| ต้องการแก้ | แก้ที่ไฟล์ | บรรทัด |
| --- | --- | --- |
| เปลี่ยนสีน้ำเงินทั้งเว็บ | `style.css` | 26–64 (`--blue-600` ฯลฯ) |
| เปลี่ยนข้อความ/ข้อมูลส่วนตัว | `index.html` | 155–199 |
| เพิ่ม/ลบเมนู | `index.html` 44–53 + `style.css` ไม่ต้องแก้ + `main.js` ไม่ต้องแก้ |
| เพิ่มทักษะภาษาโปรแกรม | `index.html` | 268–303 (คัดลอก `.progress-item` 1 ชุด) |
| เปลี่ยน % ทักษะ | `index.html` | แก้ทั้ง `70%` และ `data-level="70"` |
| แก้ความกว้างจอเปลี่ยนเป็นคอลัมน์ | `style.css` | 1289 / 1318 / 1410 |
| แก้แถบเมนูติดขอบ (offset หัวข้อ) | `style.css` | 77 (`scroll-padding-top`) |
| แก้ระยะไฮไลต์เมนู | `main.js` | 144 (`rootMargin`) |
| แก้ตำแหน่งที่ปุ่ม "ขึ้นบน" โผล่ | `main.js` | 246 (ค่า 500) |

---

# บทที่ 7 — จุดที่ควรระวังเมื่อแก้โค้ด

1. **ชื่อ `id` ห้ามซ้ำ** หนึ่งไฟล์หนึ่ง id → `getElementById` คืนตัวแรกที่เจอเท่านั้น
2. **ความกว้างระหว่าง HTML และ JS ต้องตรง** — `860px` ที่ `main.js:90` และ `style.css:1318`
3. **ตัวแปรใน `:root`** เปลี่ยนที่เดียวมีผลทุกที่ (นั่นคือข้อดี แต่ก็แปลว่าแก้แล้วเปลี่ยนหมด)
4. **การ์ดเริ่มต้น `opacity: 0`** ถ้าปิด JS จะมองไม่เห็นเนื้อหา →
   เวลาใส่ฟีเจอร์ใหม่ ให้คิดถึง "ผู้ใช้ที่ไม่มี JS" เสมอ
5. **Emoji ใน `<span>`** ต้องมี `aria-hidden="true"` ไม่โปรแกรมอ่านจอจะออกเสียงอีโมจิรบกวน
6. **`var(--font-head)`** ระบุหลาย fallback เรียงกัน → ถ้าโหลด Google Fonts ไม่ได้ (ออฟไลน์)
   เว็บยังอ่านได้ด้วยฟอนต์ระบบ หน้าเว็บไม่พัง
7. **CSS `!important`** ใช้เฉพาะใน `@media print` (1459–1530) เพราะต้องชนะทุก rule
   ไม่ควรใช้พร่ำเพรื่อ เพราะจะทำลายลำดับความสำคัญของ CSS (cascade)
