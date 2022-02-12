import React, { Component } from 'react'
import { connect } from "react-redux";
import HomeStyle from './index.module.less'
import Child from './child/test'
import img from '../../assets/img/test.png'
import {getUser} from '../../store/actions'

class Home extends Component {
  componentDidMount () {
    this.props.getUser({user: 'sheriff'})
  }
  render() {
    const {name, address, profession} = this.props.user
    console.log(this.props.user)
    return (
      <div>
        <h1 className={HomeStyle.name}>Home</h1>
        <div className='fs-12'>我使用common的样式</div>
        <p className={HomeStyle.desc}>我是home，我是home，我是home，我是home，我是home</p>
        <Child/>
        <div>
          姓名： {name} <br />
          住址：{address} <br />
          职业：{profession}
        </div>
        <img src={img} alt="" />
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {getUser} // 把ajax请求函数传入到组件内
)(Home)


function testaaa(){
  console.log('liwenjing')
}