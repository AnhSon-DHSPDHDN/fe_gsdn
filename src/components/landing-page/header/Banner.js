import React from 'react';
import { Carousel } from 'antd';

export default function Banner() {
  return (
    <Carousel autoplay className="header__carousel">
      <div className="header__carousel-content banner1">
        <div className="carousel-caption">
          <h1>Uy tín - Chất lượng.</h1>
          <p>Chúng tôi cam kết làm việc chuyên nghiệp và uy tín với chất lượng đảm bảo hàng đầu. Được thành lập với sứ mệnh mang lại niềm hạnh phúc cho quý gia đình trước sự tiến bộ của con em mình trong học tập</p>
        </div>
      </div>
      <div className="header__carousel-content banner2">
        <div className="carousel-caption">
          <h1>Chặng đường phát triển.</h1>
          <p>Phát triển trong bối cảnh nhu cầu dạy thêm - học thêm với hình thức gia sư tại nhà đang phát triển mạnh mẽ do guồng quay của cuộc sống khiến các bậc phụ huynh có ít thời gian cho con cái mình hơn</p>
        </div>
      </div>
      <div className="header__carousel-content banner3">
        <div className="carousel-caption">
          <h1>Học - Học nữa - Học mãi.</h1>
        </div>
      </div>
    </Carousel>
  )
}
