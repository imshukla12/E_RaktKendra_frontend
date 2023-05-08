import React from 'react'
import logo from "../images/logo.png"

const Navbar = () => {
    return (
        <nav className="bg-red-700 border-red-600 dark:bg-red-700 top-0 w-full z-20 left-0 dark:border-red-600">
            <div className="max-w-full mx-auto px-0 sm:px-6 lg:px-8">
                <div className="flex flex-row justify-between h-16">
                    <div className="flex-shrink-0 flex items-center p-4">
                        <a href='/'><img src={logo} alt="logo" className="w-auto h-9" /></a>
                    </div>
                    <div className="flex flex-row items-center justify-end">
                        <div className="relative flex flex-row items-center justify-end space-x-4">
                            <div><a href='/' className='text-white font-medium font-serif hover:text-blue-200'>Home</a></div>
                            {/* <div className='text-white font-medium font-serif'>User</div> */}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )

}

export default Navbar