// for investors to view all startups that have pitched to them

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useFetch from '@/hooks/use-fetch';
import { useUser } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import { BarLoader } from 'react-spinners';
import { getStartups } from '../api/apiStartup';
import { State } from 'country-state-city';
import StartupCard from '../components/startup-card';
// import StartupCard from '../components/startup-card';

const StartupListing = () => {


  const [searchQuery, setSearchQuery] = useState("");
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");
  const { isLoaded } = useUser();

  const {
    fn:fnStartups,
    data:startups,
    loading:loadingStartups,
   } = useFetch(getStartups, {
    location,
    industry,
    searchQuery,
   });

   console.log("fetched data: ", startups);

 useEffect(() => {
  if(isLoaded) fnStartups();
 },[isLoaded, industry, location, searchQuery]);

 const handleSearch = (e) => {
  e.preventDefault();
  let formData = new FormData(e.target);

  const query = formData.get("search-query");
  if (query) setSearchQuery(query);
 };

 const clearFilters = () => {
  setSearchQuery("");
  setIndustry("");
  setLocation("");
 };

 if(!isLoaded){
  return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
}

  return (
    <div>
      <h1 className='mb-6 gradient-title font-extrabold text-6xl sm:text-7xl text-center'>
        Pitched Startups
      </h1>

      {/* add filters here */}
      <form onSubmit={handleSearch} className="h-14 flex flex-row w-full gap-2 items-center mb-3">
      <Input type="text" placeholder="Search Startups by Title.." name="search-query" className="h-full flex-1 px-4 text-md"/>
      <Button type="submit" className="h-full sm:w-28" variant="blue">
        Search
      </Button>
    </form>

       <div className='flex flex-col sm:flex-row gap-2'>
      <Select value={location} onValueChange={(value) => setLocation(value)}>
      <SelectTrigger>
        <SelectValue placeholder="Filter by Location" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
        {State.getStatesOfCountry("IN").map(({name})=>{
          return (
          <SelectItem key={name} value={name}>
          {name}
        </SelectItem>
        )
      })}
        </SelectGroup>
      </SelectContent>
    </Select>

    <Select value={industry} onValueChange={(value) => setIndustry(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Industry" />
          </SelectTrigger>
          <SelectContent>
                        <SelectItem value="EdTech">EdTech</SelectItem>
                      <SelectItem value="Logistics">Logistics</SelectItem>
                      <SelectItem value="Ecommerce">Ecommerce</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                      <SelectItem value="AI">AI</SelectItem>
                      <SelectItem value="FinTech">Logistics</SelectItem>
                       
                    </SelectContent>
        </Select>
    <Button onClick={clearFilters} variant="destructive" className="sm:w-1/2" >
          Clear Filters
    </Button>
  </div>

    {loadingStartups && (
      <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
    )}

    {loadingStartups === false && (
      <div className='mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {startups?.length ?(
          startups.map((startup)=>{
            return( <StartupCard
            key={startup.id}
            startup={startup}
             />
            );
          })
        ):(
          <div>No startups found</div>
        )}
        </div>
    )}
 
    </div>
  )
};

export default StartupListing ;