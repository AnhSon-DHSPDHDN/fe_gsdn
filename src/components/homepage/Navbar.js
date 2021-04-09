import React, { useContext, useEffect, useRef, useState } from 'react';
import { Row, Col, Button } from 'antd';
import './homepage.scss';
import Logo from '../../assets/imgs/logoText.png'
import VN from '../../assets/imgs/VN.png'
import { Input } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import MessageOutlined from '../../assets/imgs/messageImage.png';
import { InfoMeContext } from '../../contexts/context/InfoMe'
import { TypeContextInfoMe } from '../../configs/typeContext';
import { List, Avatar } from 'antd';
import axiosClient from '../../untils/axiosClient';

export default function Navbar() {
  const history = useHistory()
  const infoMeContext = useContext(InfoMeContext)
  const [searchValue, setSearchValue] = useState('')
  const [dataCustomer, setDataCustomer] = useState([])
  const [visibleDropdown, setVisibleDropdown] = useState(false)
  const typingTimeoutRef = useRef(null)
  const dropdownRef = useRef(null)

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchValue(value)

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    typingTimeoutRef.current = setTimeout(() => {
      onSearch(value)
    }, 500)
  }

  const onSearch = value => {
    axiosClient.get('/customers', {
      params: {
        fullName: value
      }
    }).then(res => {
      if (res.status === 200) {
        setDataCustomer(res.data?.data)
        setVisibleDropdown(true)
      } else throw new Error()
    }).catch(err => {
      console.log(err);
    })
  };

  const handleClickOutSide = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setVisibleDropdown(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutSide);
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide)
    }
  }, [])

  const onLogout = () => {
    localStorage.removeItem('access-token');
    localStorage.removeItem('me');
    infoMeContext.dispatch({
      type: TypeContextInfoMe.CLEAR_INFO_ME
    })
    history.push('/login')
  }
  const avatar = JSON.parse(localStorage.getItem('me')).avatar
  return (
    <div className="navbar">
      <Row justify="space-around" className="navbar__main">
        <div className="navbar__main-left">
          <Row>
            <Col span={10}>
              <Link to="/home">
                <img src={Logo}></img>
              </Link>
            </Col>
            <Col span={14}>
              <Input.Search
                placeholder="Tìm kiếm..."
                allowClear
                onChange={handleSearchChange}
              />
              {visibleDropdown ? <div ref={dropdownRef} className="dropdown-container">
                <List
                  itemLayout="horizontal"
                  dataSource={dataCustomer}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src={item?.avatar} />}
                        title={<Link to={`/home/profile/${item?._id}`}>{item?.fullName}</Link>}
                      />
                    </List.Item>
                  )}
                ></List>
              </div>
                : null
              }
            </Col>
          </Row>
        </div>
        <div className="navbar__main-right">
          <Row>
            <ul>
              <li><img src={VN} style={{ borderRadius: '0%', width: '50px' }}></img></li>
              <li><Link to="/home/me">Trang cá nhân</Link></li>
              <li><Link to="/home">Thuê gia sư</Link></li>
              <li><Link to="/home/news">Bảng tin</Link></li>
              <li><Link to="/home/messenger"><div className="icon-image">
                <img src={MessageOutlined}></img>
                <div className="notification">12</div>
              </div></Link></li>
              <li><img src={infoMeContext.data?.avatar !== '' ?
                infoMeContext.data?.avatar : avatar
              }></img></li>
              <li><Button type="primary" onClick={onLogout}>Đăng xuất</Button></li>
            </ul>
          </Row>
        </div>
      </Row>
    </div>
  )
}
