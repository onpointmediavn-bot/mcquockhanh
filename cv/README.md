# DIGITAL CV / PROFESSIONAL PROFILE — NGUYỄN QUỐC KHÁNH

Hồ sơ nghề nghiệp trực tuyến chuyên nghiệp (Digital CV / Professional Portfolio) dành riêng cho **Nguyễn Quốc Khánh** (MC · Giảng viên · Trainer · Media).

Thiết kế theo triết lý **EDITORIAL · PROFESSIONAL · MINIMAL · PREMIUM**, tập trung vào tính trung thực, học thuật, dễ đọc và thể hiện trọn vẹn năng lực thực tế, không sử dụng yếu tố bán hàng/quảng cáo.

---

## 📁 Cấu Trúc Thư Mục

```
CV QUỐC KHÁNH/
├── index.html            # File HTML chính chứa toàn bộ nội dung và cấu trúc CV
├── css/
│   └── style.css         # Hệ thống giao diện Editorial Minimal, bảng màu, typography, responsive & in ấn
├── js/
│   └── main.js           # Điều khiển thanh menu dính, lightbox ảnh, video player modal và bộ lọc
├── assets/
│   ├── favicon.svg       # Biểu tượng thương hiệu cá nhân QK
│   └── images/           # Thư mục lưu trữ hình ảnh chuẩn hóa cho web
│       ├── hero-portrait.jpg     # Ảnh chân dung trang đầu
│       ├── ai-class-*.jpg        # Ảnh các lớp đào tạo AI
│       ├── mc-kids-*.jpg         # Ảnh đào tạo MC Nhí và kỹ năng giao tiếp
│       ├── mc-*.jpg              # Ảnh dẫn chương trình các sự kiện
│       └── media-*.jpg           # Ảnh hoạt động sản xuất media
├── ẢNH /                 # Thư mục lưu trữ ảnh gốc chất lượng cao của anh Khánh
└── README.md             # Tài liệu hướng dẫn sử dụng và cập nhật nội dung
```

---

## 🛠️ Hướng Dẫn Tùy Chỉnh & Cập Nhật

### 1. Thay Đổi Ảnh Chân Dung & Thư Viện Ảnh
- Các ảnh hiển thị trên website được lưu trong thư mục `assets/images/`.
- Để thay ảnh chân dung chính ở đầu trang: Bạn chỉ cần chép file ảnh mới vào `assets/images/hero-portrait.jpg` (khuyến nghị tỉ lệ 4:5 hoặc 3:4, độ phân giải sắc nét).
- Để thêm hoặc đổi ảnh trong thư viện MC / Đào tạo:
  Mở file `index.html`, tìm đến section `<section id="mc">` hoặc `<section id="dao-tao">`, chỉnh sửa đường dẫn trong thẻ `<img>` và hàm `openLightbox()`:
  ```html
  <div class="gallery-card" onclick="openLightbox('assets/images/anh-moi.jpg', 'Tên Sự Kiện Mới', 'Vai trò: MC Chính')">
    <img src="assets/images/anh-moi.jpg" alt="Mô tả ảnh" class="gallery-img">
  </div>
  ```

### 2. Cập Nhật Link Video Trong "Video Archive"
- Mở file `index.html`, tìm đến phần `<section id="portfolio">`.
- Trong mỗi thẻ `.video-card`, bạn có thể thay đổi link nhúng YouTube trong hàm `openVideoModal`:
  ```html
  onclick="openVideoModal('Tiêu đề video mới', 'Thông tin vai trò', 'https://www.youtube.com/embed/MA_VIDEO_YOUTUBE?autoplay=1')"
  ```
  *(Mẹo: Thay `MA_VIDEO_YOUTUBE` bằng ID của video trên YouTube, ví dụ link `youtube.com/watch?v=AbCd123` thì ID là `AbCd123`)*.

### 3. Cập Nhật Thông Tin Liên Hệ & Số Điện Thoại
- Số điện thoại và Email được đặt ở:
  1. Thẻ liên hệ nhanh ở đầu trang (`#hero`).
  2. Bảng thông tin chi tiết ở chân trang (`#lien-he`).
- Bạn có thể mở `index.html` và tìm kiếm `0936.607.183` hoặc `0823.072.888` để cập nhật số mới.

### 4. Bổ Sung Dòng Thời Gian Sự Nghiệp (Timeline)
- Tại mục `<section id="timeline">`, đã thiết lập sẵn khối `[BỔ SUNG THÔNG TIN]`.
- Khi có thêm dự án mới hoặc mốc năm mới, bạn chỉ cần sao chép một khối `.timeline-entry` và cập nhật thông tin.

### 5. In CV Hoặc Lưu File PDF
- Ở góc phải thanh Menu trên cùng có nút **"In CV / PDF"**.
- Khi bấm nút này (hoặc bấm tổ hợp phím `Ctrl + P` / `Cmd + P` trên trình duyệt), giao diện sẽ tự động chuyển sang chế độ in chuẩn tài liệu (loại bỏ menu, nút bấm, nền màu và giữ lại bố cục hồ sơ chữ đen nền trắng trang nhã để nộp hồ sơ xin việc hoặc lưu thành file PDF).

---

## 🌐 Cách Mở & Xem Trang Web Trên Máy Tính
- **Cách đơn giản nhất**: Nhấp đúp chuột trực tiếp vào file `index.html` để mở bằng bất kỳ trình duyệt nào (Chrome, Safari, Edge, Firefox).
- **Xem qua máy chủ nội bộ (Local Server)**:
  Mở Terminal trong thư mục dự án và chạy:
  ```bash
  python3 -m http.server 8000
  ```
  Sau đó mở trình duyệt truy cập: `http://localhost:8000`

---

## 📋 Cam Kết Về Chuẩn Dữ Liệu
Hồ sơ được thiết lập tuân thủ nghiêm ngặt các số liệu thực tế được cung cấp:
- **06+ Năm** MC & Dẫn chương trình.
- **03+ Năm** Giảng dạy & Đào tạo.
- **04+ Năm** Báo chí & Truyền hình.
- Học vấn: Cử nhân ngành Quan hệ Công chúng.
- Chứng chỉ: Chứng nhận Giảng dạy Ứng dụng AI (CES GLOBAL), Generative AI (Digital Marketing Career), Generative AI (Introduction and Applications).
