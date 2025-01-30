// defining the over layout of the web app 

import { Outlet } from "react-router-dom"

const AppLayout = () => {
  return (
    <div>AppLayout
      <Outlet />
    </div>
  )
}

export default AppLayout