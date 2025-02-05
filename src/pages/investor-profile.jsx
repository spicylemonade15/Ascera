// for investors to create their profile

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select" 

import { useEffect, useState } from "react"
import { getInvestors } from "../api/apiInvestor"
import useFetch from "../hooks/use-fetch"

const InvestorProfile = () => {

  const [isLoaded, setIsLoaded] = useState(false);

  const {
    data: investors,
    fn: fnInvestor
  } = useFetch(getInvestors);

  useEffect(()=>{
    if (isLoaded) fnInvestor();
  }, [isLoaded]);

  console.log("Investor data fetchec: ", investors)

  return (
    <>
    <h1 className="flex items-center ">Profile Creation</h1>
    <div>investors info: 
      
    
</div>
    </>
  )
}

export default InvestorProfile