// for investors to view all startups that have pitched to them

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useFetch from '@/hooks/use-fetch';
import { useUser } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import { BarLoader } from 'react-spinners';
import { getStartups } from '../api/apiStartup';
// import StartupCard from '../components/startup-card';

const StartupListing = () => {


  const [searchQuery, setSearchQuery] = useState("");
  const [founderName, setfounderName] = useState("");
  const [industry_id, setindustry_id] = useState("");
  const { user, isLoaded } = useUser();

  const {
    fn:fnStartups,
    data:Startups,
    loading:loadingStartups,
   }=useFetch(getStartups);

   console.log("fetched data: ", Startups);

//  const { fn: fnindustries, data: industries } = useFetch(getCompanies);

//  useEffect(() => {
//   if(isLoaded) fnCompanies();
//  },[isLoaded]);

//  useEffect(() => {
//   if(isLoaded) fnStartups();
//  },[isLoaded, founderName, industry_id, searchQuery]);

//  const handleSearch = (e) => {
//   e.preventDefault();
//   let formData = new FormData(e.target);

//   const query = formData.get("search-query");
//   if (query) setSearchQuery(query);
//  };

//  const clearFilters = () => {
//   setSearchQuery("");
//   setindustry_id("");
//   setfounderName("");
//  };

//  if(!isLoaded){
//   return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
// }

//   return (
//     <div>
//       <h1 className='mb-6 gradient-title font-extrabold text-6xl sm:text-7xl text-center'>
//         Latest Startups
//       </h1>

//       {/* add filters here */}

//        <div className='flex flex-col sm:flex-row gap-2'>
      
//     <Select value={industry_id} onValueChange={(value) => setIndustry_id(value)}>
//           <SelectTrigger>
//             <SelectValue placeholder="Filter by Industry" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectGroup>
//               {Array.isArray(industries) && industries.length > 0 ? (
//                 industries.map(({ name, id }) => (
//                   <SelectItem key={id} value={id}>
//                     {name}
//                   </SelectItem>
//                 ))
//               ) : (
//                 <SelectItem disabled>No Industries Available</SelectItem>
//               )}
//             </SelectGroup>
//           </SelectContent>
//         </Select>
//     <Button onClick={clearFilters} variant="destructive" className="sm:w-1/2" >
//           Clear Filters
//     </Button>
//   </div>

//     {loadingStartups && (
//       <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
//     )}

//     {loadingStartups === false && (
//       <div className='mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
//         {Startups?.length ?(
//           Startups.map((startup)=>{
//             return( <StartupCard
//             key={startup.id}
//             job={startup}
//              />
//             );
//           })
//         ):(
//           <div>No startups fouund</div>
//         )}
//         </div>
//     )}
 
//     </div>
//   )
};

export default StartupListing ;