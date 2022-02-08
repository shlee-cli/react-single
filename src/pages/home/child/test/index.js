import React, { Component } from 'react';
import StyleWrap from './index.module.less'

export default class Child extends Component {
  render() {
    return <div className={StyleWrap.color}>Child</div>;
  }
}
