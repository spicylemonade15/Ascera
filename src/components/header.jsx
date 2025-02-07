import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from './ui/button'
import { SignedIn, SignedOut,  SignIn,  UserButton, useUser } from '@clerk/clerk-react'
import { BriefcaseBusiness, Heart, PenBox, UserRoundPen } from 'lucide-react'


// header component 
const Header = () => {

  // create const to show sign in and function to update it 
  const [showSignIn, setShowSignIn] = useState("");

  // create user from useUser hook in clerk to get user details
  const { user } = useUser();

  // create const search to get URL and function to update it 
  const [search, setSearch] = useSearchParams();

  // arrow function to show sign in if user is not signed in 
  useEffect(() => {
    // get sign in from URL
    if (search.get('sign-in')) 
      setShowSignIn(true); // if sign in is true, update show sign in
  }, [search]) // update showSignIn whenever search (URL) is changing 

  // handle click outside the show sign in div element
  const handleClickOutside = (e) => {
    // inside e.target is signIn and e.currentTarget is the parent div, outside they are same
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setSearch({});
    }
  }

  return (
    <>
      <nav className='py-4 flex justify-between items-center'>
        <Link>
        <img src="/logo.png" className='h-20' />
        </Link>

        {/* <Button variant="outline">Login</Button> */}
      <div>
        <SignedOut>

          {/* on click set showSignIn to true */}
        <Button onClick={() => setShowSignIn(true)}>Login</Button>

      </SignedOut>
      <SignedIn>
      
               <UserButton appearance={{
                elements:{
                   avatarBox: "w-10 h-10",
                },
             }}>
                <UserButton.MenuItems>

                {user?.unsafeMetadata?.role === "Founder" && (
                <UserButton.Link
                label="Post a Startup"
                labelIcon={<UserRoundPen size={15}/>}
                href='/post-startup'
                />)}

                {user?.unsafeMetadata?.role === "Founder" &&
                (<UserButton.Link
                label="My Investors"
                labelIcon={<BriefcaseBusiness size={15}/>}
                href='/my-investors'
                />)}

              {
              user?.unsafeMetadata?.role === "Investor" && (
              <UserButton.Link
                label="Create Profile"
                labelIcon={<BriefcaseBusiness size={15}/>}
                href='/profile'
                />)
              
              }

                 { user?.unsafeMetadata?.role === "Investor" && (
                    <UserButton.Link
                  label="My Profile"
                  labelIcon={<UserRoundPen size={15}/>}
                  href='/profile'
                  />
                  )}

                { user?.unsafeMetadata?.role === "Investor" && (
                    <UserButton.Link
                  label="Startups"
                  labelIcon={<BriefcaseBusiness size={15}/>}
                  href='/startups'
                  />
                  )}
                
                </UserButton.MenuItems>
                </UserButton>
      </SignedIn>
      </div>
            
      </nav> 

    {/* showSignIn component */}
    {showSignIn &&  (
      <div onClick = {handleClickOutside} className="fixed inset-0 flex justify-center items-center">
        {/* redirect to onboarding page if signed in */}
        <SignIn forceRedirectUrl="/onboarding" />
      </div>
    )}
    </>

  )
}
export default Header