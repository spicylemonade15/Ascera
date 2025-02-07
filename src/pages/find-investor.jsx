// for founders to find investors for their startup

import { useEffect, useState } from "react";
import { getInvestors } from "../api/apiInvestor";
import InvestorCard from "../components/investor-card";
import { useUser } from "@clerk/clerk-react";
import useFetch from "../hooks/use-fetch";
import { BarLoader } from "react-spinners";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { State } from "country-state-city";

const FindInvestor = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [company_name, setCompany_name] = useState("");


  const { isLoaded } = useUser();

  const {
    fn:fnInvestors,
    data:investors,
    loading:loadingInvestors,
   } = useFetch(getInvestors, {

    name,
    company_name,
    industry,
    location,
    searchQuery,
   });

   console.log("fetched data: ", investors);

 useEffect(() => {
  if(isLoaded) fnInvestors();
 },[isLoaded, industry, name, company_name, location, searchQuery]);

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
  setCompany_name("");
 };

 if(!isLoaded){
  return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
}

  return (
    <div>
      <h1 className='mb-6 gradient-title font-extrabold text-6xl sm:text-7xl text-center'>
        Find Investors
      </h1>

      {/* add filters here */}
      <form onSubmit={handleSearch} className="h-14 flex flex-row w-full gap-2 items-center mb-3">
      <Input type="text" placeholder="Search Investors by Name.." name="search-query" className="h-full flex-1 px-4 text-md"/>
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

        <form onSubmit={handleSearch} className="h-9 flex flex-row w-full gap-2 items-center mb-3">
      <Input type="text" placeholder="filter Investors by Company Name.." name="search-query" className="h-full flex-1 px-4 text-md"/>
    </form>
    <Button onClick={clearFilters} variant="destructive" className="sm:w-1/2" >
          Clear Filters
    </Button>
  </div>

    {loadingInvestors && (
      <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
    )}

    {loadingInvestors === false && (
      <div className='mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {investors?.length ?(
          investors.map((investor)=>{
            return( <InvestorCard
            key={investor.id}
            investor={investor}
             />
            );
          })
        ):(
          <div>No investors found</div>
        )}
        </div>
    )}
 
    </div>
  )
};

export default FindInvestor;