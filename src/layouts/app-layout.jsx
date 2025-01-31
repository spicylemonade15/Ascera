// defining the over layout of the web app 

import { Outlet } from "react-router-dom"
import Header from "../components/header"

const AppLayout = () => {
  return (
    <div>
      <div className="grid-backgorund"></div>
      <main className="min-h-screen container p-10">
        <Header/>
      <Outlet />
      </main>
      <div className="p-10 text-left bg-gray-900 mt-10">
        Made by Trailblazers 🔥
      </div>
    </div>
  )
};

export default AppLayout