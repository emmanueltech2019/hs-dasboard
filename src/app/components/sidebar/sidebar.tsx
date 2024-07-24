"use client"
import React, { useState } from 'react'
import Link from 'next/link'

function Sidebar() {
    const [toggle, setToggle] = useState(false)

    const handleToggle = () => {
      setToggle(!toggle)
    }
  return (
    <div className={!toggle ? 'fixed -left-[80%] smm:left-[-300px] lg:static bg-[#2a5fc1] text-[#fff] p-4 w-[300px] min-h-[100%] z-50 transition-all duration-700 ease-in-out' : 'fixed left-[0%] lg:static bg-[#2a5fc1] text-[#fff] p-4 w-[300px] min-h-[100vh] z-50 transition-all duration-700 ease-in-out'}>
        {/* <div className="logo lg:fixed left-[8%]">
            <h1 className='text-[40px] text-center mt-[.5rem]'><span className=' rotate-[100deg]'>R</span>R</h1>
        </div> */}

        <nav className='mt-[4rem] lg:fixed top-[15%]'>
            {/* <h3 className='text-[14px]'>MAIN</h3> */}
            <ul className=' text-[16px] flex flex-col gap-[1rem] list-disc ms-[4rem] mt-[1rem]'>
                <Link href="/dashboard/Admin">
                  <li>Doctor Form</li>
                </Link>
                {/* <Link href="/dashboard/users">
                  <li>User Dashboard</li>
                </Link>
                <Link href="/dashboard">
                  <li>Activity Log</li>
                </Link> */}
            </ul>
        <div className="toggle bg-[#2a5fc1] rounded-full p-3 px-5 absolute -right-[38%] top-[10%] shadow-md cursor-pointer lg:hidden" onClick={handleToggle}>
          <span className={!toggle ? 'text-[16px] text-[#fff] font-bold transition-all duration-700 ease-in-out' : 'text-[16px] text-[#fff] font-bold opacity-[0.5] transition-all duration-700 ease-in-out ps-3'}> &gt; </span>
      </div>
        </nav>
    </div>
  )
}

export default Sidebar