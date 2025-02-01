import React from 'react'
import { Link } from 'react-router-dom'
import {Button} from './ui/button'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
const Header = () => {
  return (
    <div>
      <nav className='py-2 flex justify-between items-center'>
        <Link>
        <img src="/logo.png" className='h-10' />
        </Link>

        {/* <Button variant="outline">Login</Button> */}

        <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>

      </nav>
    </div>
  )
}

export default Header