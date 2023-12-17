import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Header = () => {
  const { currentUser } = useSelector((state) => state.user)
  return (
    <div className='bg-slate-700'>
        <div className='flex justify-between items-center max-w-6xl p-3 mx-auto'>
            <Link to='/'>
            <h1 className='text-2xl font-bold'>Auth</h1>
            </Link>
            <ul className='flex gap-3'>
                <Link to='/' >
                <li>Home</li>
                </Link>
                <Link to='/about'>
                <li>About</li>
                </Link>
                {/* <Link to='/profile'>
                  {currentUser ? (<img src={currentUser.profilePicture } alt='profile' className='h-8 w-8 rounded-full object-cover'/>):(<li>Sign In</li>)}
                
                </Link> */}
            </ul>
        </div>
    </div>
  )
}

export default Header