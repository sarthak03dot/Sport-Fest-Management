import React from 'react'

const currentRoute = () => {
  return (
    <div>
      <h4>current Route : {window.location.pathname}</h4>
      console.log(window.location.pathname);
    </div>
  )
}

export default currentRoute;  