import React,{lazy} from 'react'

const Home = lazy(()=>import(/* webpackChunkName: "home" */ '../pages/home'))
const About = lazy(()=>import(/* webpackChunkName: "about" */ '../pages/about'))

let routes = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/about',
    component: About
  }
]

export default routes