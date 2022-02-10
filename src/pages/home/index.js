import React, { Component } from 'react'
import HomeStyle from './index.module.less'
import Child from './child/test'
import {reqUser} from '../../service/api'
import img from '../../assets/img/test.png'
import img2 from '../../assets/img/test2.png'

export default class Home extends Component {
  state = {
    list: []
  }
  componentDidMount () {
    reqUser({user: 'sheriff'}).then(res => {
      res = res.data
      this.setState({
        list: res.list
      })
    }).catch(err => {
      console.log(err.msg)
    })
  }
  render() {
    const {list} = this.state
    return (
      <div>
        <h1 className={HomeStyle.name}>Home</h1>
        <div className='fs-12'>我使用common的样式</div>
        <p className={HomeStyle.desc}>我是home，我是home，我是home，我是home，我是home</p>
        <Child/>
        {
          list.map((item, index) => {
            return <p key={index}>{item}</p>
          })
        }
        <img src={img} alt="" />

        <img src={img} alt="" />

        <img src={img2} alt="" />
      </div>
    )
  }
}
