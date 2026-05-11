import {useState} from 'react'

import Profile from './User/Profile';
import ChangeInfo from './User/ChangeInfo';
import ChangeEmail from './User/ChangeEmail';
import ChangePassword from './User/ChangePassword';
import ChangeImg from './User/ChangeImg';
import Delete from './User/Delete';
import Setting from './User/Setting';

export default function HomeDashboard() {
 
  const [activeComponent , setActiveComponent] = useState("profile");

  const menuItems = [
    {id:"profile", label:"Profile", component:<Profile/>},
    {id:"changeInfo", label:"Change Info", component:<ChangeInfo/>},
    {id:"changeEmail", label:"Change Email", component:<ChangeEmail/>},
    {id:"changePassword", label:"Change Password", component:<ChangePassword/>},
    {id:"changeImg", label:"Change Image", component:<ChangeImg/>},
    {id:"delete", label:"Delete", component:<Delete/>},
    {id:"setting", label:"Setting", component:<Setting/>},
  ];

  const activeItem = menuItems.find((item) => item.id === activeComponent);

  return (
<div className="text-white h-screen">

      <div className="flex  min-h-screen">

        {/* Left Side */}
        <div className="w-[20%] bg-amber-500 p-4 space-y-3">

          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveComponent(item.id)}
              className={`block w-full text-left p-2 rounded ${
                activeComponent === item.id ? "bg-black text-white" : ""
              }`}
            >
              {item.label}
            </button>
          ))}

        </div>

        {/* Right Side */}
        <div className="w-[80%] bg-[#571c05]">
          {activeItem?.component}
        </div>

      </div>

    </div>  )
}
