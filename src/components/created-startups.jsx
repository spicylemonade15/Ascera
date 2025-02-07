import { getMyJobs } from "@/api/apijobs";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/clerk-react"
import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import JobCard from "./job-card";

const CreateStartups = () => {
    const {user} = useUser();

    const {
        loading: loadingCreatedStartups,
        data: createdStartups,
        fn: fnCreatedStartups,
      } = useFetch(getStartups, {
        investor_id: user.id,
      });

      useEffect(() => {
        fnCreatedStartups();
      },[]);

      if(loadingCreatedStartups){
        return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
      }

  return (
    <div>
        <div className='mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {createdStartups?.length ?(
          createdStartups.map((startup)=>{
            return( <JobCard 
            key={startup.id}
            startup={startup}
            isMyStartup
            />
            ); 
          })
        ):(
          <div>No Startups fouund</div>
        )}
        </div>
    </div>
  )
}

export default CreateStartups