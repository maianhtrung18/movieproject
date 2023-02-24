import React from 'react'
import { Route } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";


export default function HomeTemplate(props) {
  return <Route exact path={props.path} render={(propsRoute) => { 
    return <>
    <Header/>
    <props.component {...propsRoute} />
    <Footer/>
    </>
   }} />
}
