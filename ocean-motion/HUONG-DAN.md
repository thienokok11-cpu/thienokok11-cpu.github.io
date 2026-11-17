# Ocean Motion — Website cảnh biển HTML5 & CSS3

## Cách mở

1. Giải nén toàn bộ tệp `ocean-motion.zip`.
2. Vào thư mục `ocean-motion`, mở `index.html` bằng Chrome, Edge hoặc Firefox.
3. Nhấn các mục trên thanh điều hướng hoặc thẻ khám phá để chuyển trang.

Website chạy trực tiếp từ tệp, không cần cài đặt, mạng, máy chủ, JavaScript hoặc thư viện bên ngoài. Nút tải mã nguồn trên bản trực tuyến tải chính tệp ZIP này. Trong bản đã giải nén, nút tải được đổi thành liên kết Hướng dẫn vì bạn đã có toàn bộ mã nguồn.

## Các tệp chính

| Tệp | Chức năng |
| --- | --- |
| index.html | Trang chủ, cảnh biển minh họa và liên kết đến mọi trang con |
| tho-lan.html | Ba thợ lặn di chuyển ngang và lặn xuống, nổi lên |
| sinh-vat-bien.html | Cá mập, rùa, đàn cá vàng và đàn cá xa |
| toan-canh.html | Tất cả nhân vật xuất hiện trong cảnh biển rộng |
| style.css | Toàn bộ giao diện, responsive, hoạt ảnh và điều khiển |
| assets/ | Bảy ảnh WebP gốc được cung cấp và biểu tượng website |

## Các yêu cầu đã thực hiện

- Dùng đủ bảy ảnh gốc, không thay ảnh nhân vật.
- Cảnh biển nằm ngang, có tia sáng, bọt khí, cát, san hô, rong biển vẽ bằng CSS.
- Ba thợ lặn bơi lên xuống độc lập, đồng thời di chuyển ngang.
- Cá mập bơi nhanh hơn rùa; các đàn cá có tốc độ riêng.
- Chạm biên ngang thì nhân vật lật hướng và bơi ngược lại, không biến mất rồi xuất hiện ở mép kia.
- Trang chủ `index.html` liên kết trực tiếp đến ba trang con. Mọi trang đều có liên kết về trang chủ.
- Có tạm dừng/tiếp tục, chọn tốc độ 0.5× / 1× / 2× và biển đêm, hoàn toàn bằng HTML/CSS.
- Bố cục thích ứng điện thoại. Có hỗ trợ bàn phím, văn bản thay thế ảnh và cài đặt giảm chuyển động.

## Cách hoạt động của hoạt ảnh

Mỗi nhân vật gồm nhiều lớp để các chuyển động không ghi đè lên nhau:

1. `.lane`: giới hạn chiều rộng vùng bơi, đặt kích thước và thời gian riêng.
2. `.traveller`: chạy `swim-horizontal`, thay đổi `left` từ 0 đến `calc(100% - var(--size))` rồi về 0.
3. `.float-body`: chạy `diver-depth` để thợ lặn xuống/lên hoặc `gentle-float` để sinh vật nhấp nhô nhẹ.
4. `.sprite`: chạy `turn-around`, dùng `scaleX(1)` và `scaleX(-1)` để quay đầu.

Hai hoạt ảnh `swim-horizontal` và `turn-around` dùng cùng `--duration`, cùng `--delay`. `steps(1, end)` giữ hướng nhìn suốt nửa chu kỳ và đổi hướng ngay ở biên, thay vì thu hẹp hình ảnh dần.

Đây là mô phỏng chạm biên đã xác định bằng keyframes CSS, không phải phép phát hiện va chạm bằng JavaScript. Các nhân vật không va chạm với nhau và có thể bơi qua nhau.

### Thời gian mặc định ở tốc độ 1×

| Nhân vật | Chu kỳ ngang: đi + về | Chu kỳ dọc: xuống + lên |
| --- | --- | --- |
| Thợ lặn đỏ | 28 giây | 16 giây |
| Thợ lặn xanh dương | 36 giây | 18 giây |
| Thợ lặn xanh lá | 42 giây | 22 giây |
| Cá mập | 20 giây | Nhấp nhô nhẹ |
| Rùa biển | 40 giây | Nhấp nhô nhẹ |
| Đàn cá vàng | 30 giây | Nhấp nhô nhẹ |
| Đàn cá xa | 54 giây | Nhấp nhô nhẹ |

`animation-delay` âm giúp các nhân vật bắt đầu ở những vị trí khác nhau. `--size` sử dụng `clamp()` để co giãn theo màn hình. Chỉnh `--duration`, `--y`, `--depth` trong `style.css` để đổi tốc độ, vị trí và độ sâu lặn.

### Điều khiển không dùng JavaScript

- Checkbox `#pause` và bộ chọn `:checked ~ .stage` đổi `animation-play-state` thành `paused`.
- Radio `#slow`, `#normal`, `#fast` thay `--pace` lần lượt thành 2, 1, 0.5. Thời lượng được nhân với `--pace` nên số nhỏ hơn làm cảnh chạy nhanh hơn.
- Checkbox `#night` bật một lớp phủ tối bằng CSS để tạo biển đêm.
- Khi đổi tốc độ, CSS tính lại tiến độ từ thời lượng mới nên nhân vật có thể đổi vị trí ngay lúc chuyển. Sau đó chuyển động và quay đầu vẫn đồng bộ.
- Tab để chọn điều khiển, Space để bật/tắt checkbox, phím mũi tên để đổi tốc độ trong nhóm radio.
- Nếu hệ điều hành bật “Giảm chuyển động”, hoạt ảnh dừng và trang hiện thông báo. Tắt tùy chọn đó để xem chuyển động.

## Công nghệ

HTML5 ngữ nghĩa: `header`, `nav`, `main`, `section`, `aside`, `footer`.
CSS3: `@keyframes`, `animation`, `transform`, `gradient`, `transition`, media queries, biến CSS, Grid và Flexbox.

Tất cả hình ảnh nhân vật là ảnh được người dùng cung cấp. Tốc độ trong bảng là thông số hoạt ảnh minh họa, không phải vận tốc sinh học thực tế.


## Cập nhật
Favicon thay bằng ảnh SVG bạn gửi. ambience.js bổ sung chọn cảnh, màu nền, âm lượng và tự thử phát nhạc. Chuyển động vẫn dùng CSS. Trình duyệt chặn tự phát thì nhấn Bật nhạc biển. Nhạc Sóng êm là bản tổng hợp không lời gốc, lưu tại assets/sea-music.wav; có thể thay bằng nhạc riêng và sửa src của audio. Các cảnh là phối cảnh minh họa, không mô phỏng hệ sinh thái địa lý chính xác.
