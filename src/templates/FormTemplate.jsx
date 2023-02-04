import React from 'react'
import { Route } from 'react-router-dom'

export default function FormTemplate(props) {
  return <Route exact path={props.path} render={(propsRoute)=>{
    return <>
        <props.component {...propsRoute.component}/>
    </>
  }}>

  </Route>
}
