import React from 'react';
import { Row, Col } from 'antd';
import Product from '../../../assets/imgs/product.svg';
import './mission.scss'
import ScrollAnimation from 'react-animate-on-scroll';

export default function Mission() {
  return (
    <div id="mission">
      <Row className="mission__container">
        <Col className="mission__container-left" sm={24} md={12}>
          <ScrollAnimation animateIn='flipInY'
            animateOut='flipOutY'>
            <h1>SỨ MỆNH THƯƠNG HIỆU</h1>
            <p>
              “Uy tín tạo dựng thành công” là triết lý hoạt động của Gia sư Đà Nẵng.
              Mọi cá nhân trong tập thể đều ý thức rằng, chất lượng dịch vụ và sự hài lòng của phụ
              huynh chính là chìa khóa dẫn đến thành công. Vì thế, mỗi cá nhân luôn nỗ lực không ngừng
              để hoàn thiện mình. Từ việc nâng cao trình độ đội ngũ giáo viên cơ hữu đến việc tuyển
              chọn đội ngũ gia sư chất lượng cao nhằm đáp ứng mọi yêu cầu khắt khe của quý vị phụ huynh.
              Tất cả được chuyên nghiệp hóa nhằm đi đầu trong việc xây dựng một hình ảnh dịch
              vụ gia sư tại Đà Nẵng nói riêng và Việt Nam nói chung đồng bộ, chuẩn mực, chất lượng cao.
              Nhân rộng giá trị tri thức cho xã hội và góp phần đẩy mạnh sự phát triển của nền giáo dục
              nước nhà hội nhập quốc tế.
                    </p>
          </ScrollAnimation>
        </Col>
        <Col className="mission__container-right" sm={24} md={12}>
          <ScrollAnimation animateIn='bounceInRight'
            animateOut='bounceOutLeft'>
            <img src={Product}></img>
          </ScrollAnimation>
        </Col>
      </Row>
    </div>
  )
}
