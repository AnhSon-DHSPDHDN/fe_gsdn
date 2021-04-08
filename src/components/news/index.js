import { Col, Divider, Row } from 'antd'
import React from 'react'
import './style.scss'

export default function New(props) {
  const { data } = props;
  const mapDataToViews = (data) => {
    let result = <></>
    if (data.length > 0) {
      result = data.map((dataItem, index) => {
        return <div key={index}>
          <Row gutter={6} className="news-item">
            <Col span={8}>
              <img src={dataItem?.image}></img>
            </Col>
            <Col span={16} className="news-item__content">
              <a
                className="news-item__content-title"
                target="_blank"
                href={dataItem?.link}
              >
                {dataItem?.title}
              </a>
              <p className="news-item__content-main">
                {dataItem?.description}
              </p>
            </Col>
          </Row>
          <Divider />
        </div>
      })
    }
    return result
  }
  return (
    <div className="news homepage">
      <Row>
        <div className="news-container">
          {mapDataToViews(data)}
          {/* <Row gutter={6} className="news-item">
            <Col span={8}>
              <img src="http://localhost:4000/avatar/avatar-1617807663474.jpg"></img>
            </Col>
            <Col span={16} className="news-item__content">
              <a
                className="news-item__content-title"
                target="_blank"
                href="https://kenh14.vn/xon-xao-chuyen-rich-kid-2k4-di-hoc-them-quen-mang-thuoc-lay-the-den-2-ty-dong-ra-ke-tam-20210318234730033.chn"
              >
                Xôn xao chuyện rich kid 2k4 đi học thêm: Quên mang thước, lấy thẻ đen 2 tỷ đồng ra kẻ tạm?
                Xôn xao chuyện rich kid 2k4 đi học thêm: Quên mang thước, lấy thẻ đen 2 tỷ đồng ra kẻ tạm?
              </a>
              <p className="news-item__content-main">
                Ai cũng biết rich kid là dàn thiếu gia, tiểu thư đến từ những gia đình cực giàu. Nhưng giàu cỡ nào thì không có con số cụ thể, tất cả chỉ được thể hiện qua ảnh check-in hàng hiệu, siêu xe hay biệt thự siêu to khổng lồ thôi.
                Ai cũng biết rich kid là dàn thiếu gia, tiểu thư đến từ những gia đình cực giàu. Nhưng giàu cỡ nào thì không có con số cụ thể, tất cả chỉ được thể hiện qua ảnh check-in hàng hiệu, siêu xe hay biệt thự siêu to khổng lồ thôi.
                Ai cũng biết rich kid là dàn thiếu gia, tiểu thư đến từ những gia đình cực giàu. Nhưng giàu cỡ nào thì không có con số cụ thể, tất cả chỉ được thể hiện qua ảnh check-in hàng hiệu, siêu xe hay biệt thự siêu to khổng lồ thôi.
              </p>
            </Col>
          </Row>
          <Divider />
          <Row gutter={6} className="news-item">
            <Col span={8}>
              <img src="http://localhost:4000/avatar/avatar-1617807663474.jpg"></img>
            </Col>
            <Col span={16} className="news-item__content">
              <a
                className="news-item__content-title"
                target="_blank"
                href="https://kenh14.vn/xon-xao-chuyen-rich-kid-2k4-di-hoc-them-quen-mang-thuoc-lay-the-den-2-ty-dong-ra-ke-tam-20210318234730033.chn"
              >
                Xôn xao chuyện rich kid 2k4 đi học thêm: Quên mang thước, lấy thẻ đen 2 tỷ đồng ra kẻ tạm?
                Xôn xao chuyện rich kid 2k4 đi học thêm: Quên mang thước, lấy thẻ đen 2 tỷ đồng ra kẻ tạm?
              </a>
              <p className="news-item__content-main">
                Ai cũng biết rich kid là dàn thiếu gia, tiểu thư đến từ những gia đình cực giàu. Nhưng giàu cỡ nào thì không có con số cụ thể, tất cả chỉ được thể hiện qua ảnh check-in hàng hiệu, siêu xe hay biệt thự siêu to khổng lồ thôi.
                Ai cũng biết rich kid là dàn thiếu gia, tiểu thư đến từ những gia đình cực giàu. Nhưng giàu cỡ nào thì không có con số cụ thể, tất cả chỉ được thể hiện qua ảnh check-in hàng hiệu, siêu xe hay biệt thự siêu to khổng lồ thôi.
                Ai cũng biết rich kid là dàn thiếu gia, tiểu thư đến từ những gia đình cực giàu. Nhưng giàu cỡ nào thì không có con số cụ thể, tất cả chỉ được thể hiện qua ảnh check-in hàng hiệu, siêu xe hay biệt thự siêu to khổng lồ thôi.
              </p>
            </Col>
          </Row>
          <Divider /> */}
        </div>
      </Row>
    </div>
  )
}
