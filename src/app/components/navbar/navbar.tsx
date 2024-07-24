import React from 'react'

function Navbar() {
  return (
    <div className='p-4 md:p-6 bg-[#f4f8fb] fixed md:static w-full '>
      <div className='flex justify-between'>
        <header className='text-[13px] text-[#293670]'>
          <h1 className='font-bold text-[16px] md:text-[22px] text-[#293670]'>Doctor Form</h1>
          {/* <ul className='flex items-center font-bold gap-1'>
            <li>Dashstyle</li>
            <li>/</li>
            <li>Projects</li>
            <li>/</li>
            <li>Overview</li>
          </ul> */}
        </header>
        {/* <div className="log text-[14px] text-[#0C223A]">
          <h2>log out</h2>
        </div> */}
      </div>
    </div>
  )
}

export default Navbar