import Link from 'next/link'
import React from 'react'

interface NavLink {
  display: string
  path: string
  icon: React.ReactNode
}

const navLinks: NavLink[] = [
  { display: 'Dashboard', path: '/admin/dashboard', icon: <i className="ri-pie-chart-line h-8 w-8 content-center pl-2"></i> },
  { display: 'Tours', path: '/admin/tours', icon: <i className="ri-shopping-bag-4-line h-8 w-8 content-center  pl-2"></i> },
  { display: 'Bookings', path: '/admin/bookings', icon: <i className="ri-folder-6-line h-8 w-8 content-center  pl-2 "></i> },
  { display: 'Reviews', path: '/admin/reviews', icon: <i className="ri-chat-smile-ai-line h-8 w-8 content-center pl-2" /> },
  { display: 'Users', path: '/admin/users', icon: <i className="ri-id-card-line h-8 w-8 content-center pl-2 "></i> },
  { display: 'Notifications', path: '/admin/notifications', icon: <i className="ri-notification-4-line h-8 w-8 content-center pl-2"></i> },
]

const SideBar = () => {
  return (
    <div className="flex flex-col my-6 justify-center w-[90%] mx-auto">
      <img src="/logo.png" alt="Logo" className='w-[70%] mx-auto' />

      <div id="card__group" className='mt-6 flex flex-col gap-2'>
        {navLinks.map(({ display, path, icon }) => (
          <Link
            key={path}
            href={path}
            className="flex items-center w-full rounded-3xl focus:bg-[#0000000A] hover:bg-[#0000000A] text-sm lg:text-xl py-2"
          >
            <div className="flex items-center content-center">
              {icon}
              {display}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SideBar
