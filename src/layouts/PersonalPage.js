import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import HomePageLayout from '../components/HomePageLayout'
import Personal from '../components/personal/Personal'
import { Message, ModeViewProfile } from '../configs/config'
import axiosClient from '../untils/axiosClient'
import { InfoMeContext } from '../contexts/context/InfoMe'
import { TypeContextInfoMe } from '../configs/typeContext'
import FormData from 'form-data'

export default function PersonalPage(props) {
  const history = useHistory()
  const [dataProfile, setDataProfile] = useState(null)
  const infoMeContext = useContext(InfoMeContext)

  let modeProfile = ModeViewProfile.ME_PROFILE;
  if (history.location.pathname.includes('/me')) {
    modeProfile = ModeViewProfile.ME_PROFILE
  } else if (history.location.pathname.includes('/profile')) {
    modeProfile = ModeViewProfile.ORTHER_PROFILE
  }
  const fetchDataProfile = () => {
    if (modeProfile === ModeViewProfile.ORTHER_PROFILE) {
      const { id } = props.match.params
      axiosClient.get(`/customers/${id}`).then(res => {
        if (res.status === 200) {
          setDataProfile(res.data)
        }
      }).catch(err => {
        console.log(err);
      })
    } else if (modeProfile === ModeViewProfile.ME_PROFILE) {
      const { _idCustomer } = JSON.parse(localStorage.getItem('me'))
      if (_idCustomer) {
        axiosClient.get(`/customers/${_idCustomer}`).then(res => {
          if (res.status === 200) {
            setDataProfile(res.data)
          }
        }).catch(err => {
          console.log(err);
        })
      }
    }
  }
  const updateDataCustomer = (customer) => {
    const _idCustomer = JSON.parse(localStorage.getItem('me'))._idCustomer
    axiosClient.post('/customers', { id: _idCustomer, customer: { ...customer } })
      .then(res => {
        if (res.status === 200) {
          setDataProfile(res.data.customer)
          alert(Message.THANH_CONG);
          fetchNewInfoMe()
        }
      }).catch(err => {
        console.log(err);
      })
  }
  const fetchNewInfoMe = () => {
    axiosClient.get('/login/me')
      .then(async res => {
        if (res.status === 200) {
          await infoMeContext.dispatch({
            type: TypeContextInfoMe.GET_INFO_ME,
            data: res.data
          })
        } else throw new Error()
      }).catch(err => {
        console.log(err);
      })
  }

  const handleChangAvatar = (file) => {
    const bodyImage = new FormData()
    bodyImage.append('avatar', file)
    axiosClient.post('/customers/upload', bodyImage)
      .then(res => {
        if (res.status === 200) {
          setDataProfile(res.data.customer)
          fetchNewInfoMe()
        }
      }).catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {
    fetchDataProfile()
  }, [])
  return (
    <div id="personal">
      <HomePageLayout>
        <Personal mode={modeProfile}
          data={dataProfile}
          updateDataCustomer={updateDataCustomer}
          handleChangAvatar={handleChangAvatar}
        />
      </HomePageLayout>
    </div>
  )
}
