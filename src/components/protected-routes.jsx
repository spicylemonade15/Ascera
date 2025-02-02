import { useUser } from '@clerk/clerk-react'
import { Navigate, useLocation } from 'react-router-dom';


// creating protected route function
const ProtectedRoute = ({ children }) => {
    
    // to check loading and sign in status
    const { isSignedIn, user, isLoaded } = useUser();

    // to find pathname using useLocation
    const { pathname } = useLocation();

    // if not signed in then navigate to landing page
    if (isLoaded && !isSignedIn && isSignedIn!==undefined) {
        return <Navigate to="/?sign-in=true"/>;
    } 

    // if user exists but has not chosen role and is trying to access some other pages 
    if (user!== undefined && !user?.unsafeMetadata?.role && pathname!=="/onboarding")
        return <Navigate to ="/onboarding" />;

    // return the page user is trying to access otherwise 
    return children;
};

export default ProtectedRoute;
