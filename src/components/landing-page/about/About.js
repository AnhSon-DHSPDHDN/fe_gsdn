import React from 'react';
import { Row, Col } from 'antd';
import './about.scss';
import DeveloperSVG from '../../../assets/imgs/developer.svg';
import Graphs from '../../../assets/imgs/graphs.svg';
import ScrollAnimation from 'react-animate-on-scroll';

export default function About() {
  return (
    <div id="about">
      <Row className="about__container">
        <Col className="about__container-left" sm={24} md={12}>
          <ScrollAnimation animateIn='flipInY'
            animateOut='flipOutY'>
            <h1>GIA SƯ ĐÀ NẴNG</h1>
            <p>
              "Tiền thân là Trung tâm hỗ trợ việc làm cho sinh viên" trực thuộc Trường Đại Học Sư Phạm ĐHĐN,
               mỗi nấc thang trong hành trình 10 năm phát triển bền vững của Gia sư Đà Nẵng được xây dựng từ hơn
               5.000 trái tim đầy nhiệt huyết,
               đam mê dành cho công việc gia sư dạy kèm tại nhà.
          </p>
          </ScrollAnimation>
        </Col>
        <Col className="about__container-right" sm={24} md={12}>
          <ScrollAnimation animateIn='bounceInRight'
            animateOut='bounceOutLeft'>
            <img src={DeveloperSVG}></img>
          </ScrollAnimation>
        </Col>
      </Row>
      <Row className="about__container-bottom" justify="center">
        <Col span={12}>
          <h1>QUÁ TRÌNH PHÁT TRIỂN</h1>
          <p>
            Đi lên từ nền tảng vững chắc ở cả ba vị trí: Học sinh, sinh viên và phụ huynh,
            tập thể Gia sư Đà Nẵng luôn lắng nghe và thấu hiểu những tâm tư nguyện vọng của phụ huynh học sinh.
            Đặc biệt trong bối cảnh nhu cầu “dạy thêm – học thêm” với hình thức gia sư tại nhà đang phát triển
            mạnh mẽ do guồng quay của cuộc sống khiến các bậc phụ huynh có ít thời gian dành cho con cái mình hơn.
          </p>
          <button className="active">Bắt đầu</button>
        </Col>
      </Row>
      <Row className="about__container">
        <Col className="about__container-left" sm={24} md={12}>
          <img src={Graphs}></img>
        </Col>
        <Col className="about__container-right" sm={24} md={12}>
          <ScrollAnimation animateIn='bounceInRight'
            animateOut='bounceOutLeft'>
            <h1>HÀNH ĐỘNG THỰC TIỄN</h1>
            <p>
              Mọi hoạt động tại GS Đà Nẵng đều được chuyên biệt hóa dù là khâu nhỏ nhất. Tại đây,
              có đội ngũ chuyên viên chuyên trách thực hiện nhiệm vụ chăm sóc khách hàng 24/24h,
              họ đại diện cho công ty hỗ trợ khách hàng kịp thời mọi lúc, mọi nơi, giải đáp mọi thắc
              mắc đến khi khách hàng thực sự hài lòng về các vấn đề liên quan đến chất lượng giảng dạy
              của gia sư Đà Nẵng.
            </p>
          </ScrollAnimation>
        </Col>
      </Row>
    </div>
  )
}
