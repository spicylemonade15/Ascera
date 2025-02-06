// for investors to create their profile

import { useUser } from "@clerk/clerk-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { State } from "country-state-city"
import { useEffect } from "react"
import { addInvestor, getInvestors } from "../api/apiInvestor"
// import { getCompanies } from "../api/apiCompanies"
import useFetch from "../hooks/use-fetch"
import { BarLoader } from "react-spinners"
import { Button } from "../components/ui/button"
import MDEditor from "@uiw/react-md-editor"
import { Navigate, useNavigate } from "react-router-dom"
// import AddCompanyDrawer from "../components/add-company-drawer"

const schema = z.object({
  name: z.string().min(1, { message: "Name is required"}),
  description: z.string().min(1, { message: "Description is required"}),
  location: z.string().min(1, { message: "Select a location"}),
  industry: z.string().min(1, { message: "Select an industry"}),
  company_name: z.string().min(1, { message: "Company name is required"}),
})

const InvestorProfile = () => {

  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const { 
     register,
     control, 
     handleSubmit, 
     formState: { errors }
    } = useForm(
      {
        defaultValues: {
          name: "",
          location: "",
          industry: "",
          company_name: "",
        },
        resolver: zodResolver(schema),
      }
    )

    // creating investors
  const {
    loading: loadingCreateInvestor,
    error: errorCreateInvestor,
    data: dataCreateInvestor,
    fn: fnCreateInvestor, 
  } = useFetch(addInvestor)

  const onSubmit = (data) => {
    fnCreateInvestor({
      ...data,
      investor_id: user.id,
    })
  }
  
  useEffect(()=>{
    console.log(dataCreateInvestor);
    if(dataCreateInvestor?.length>0) navigate("/startups")
  }, [loadingCreateInvestor])
  // function to handle status change

  return (
    <div>
      <h1 className="gradient-title font-extrabold text-5xl sm:text-7xl text-center pb-8">Profile Creation</h1>
      <form onSubmit={handleSubmit(onSubmit)} className = "flex flex-col gap-4 p-4 pb-0">
      <Input placeholder="Name" {...register("title")} />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}

        <Controller name="industry" control ={control} render={({field})=>(
          <Select value={field.value} onValueChange={field.onChange}>
          <SelectTrigger className="w-52">
            <SelectValue placeholder="Select an industry"/>
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

)}
  />
        
        <Input placeholder="Company Name" {...register("company_name")} />
        {errors.company_name && <p className="text-red-500">{errors.title.message}</p>}

        <Textarea placeholder="Description" {...register("description")} />
        {errors.description && (<p className="text-red-500">{errors.description.message}</p>)}
<div className="flex gap-4 items-center">

<Controller name="location" control ={control} render={({field})=>(
<Select value={field.value} onValueChange={field.onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Choose Location" />
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

)}
  />
  
    </div>
    {errors.location && (
      <p className="text-red-500">{errors.location.message}</p>
    )}
    {/* add industry enum type to profile creation */}

    {errors.requirements && (
      <p className="text-red-500">{errors.requirements.message}</p>
    )}
    {errorCreateInvestor?.message && (
      <p className="text-red-500">{errorCreateInvestor?.message}</p>
    )}
    {loadingCreateInvestor && <BarLoader width={"100%"} color="#36d7b7" />}
    <Button type="submit" variant="blue" size="lg" className="mt-2">Submit</Button>
    </form>
      
      
    </div>
  )
}

export default InvestorProfile