import { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Heart, MapPinIcon, Trash2Icon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from "./ui/button"
import useFetch from '../hooks/use-fetch'
// import { deleteJob, saveJob } from '../api/apiJobs'
import { BarLoader } from 'react-spinners'
import { getStartups } from '../api/apiStartup'

const StartupCard = ({
  startup,
}) => {
    const {user} = useUser();
  const { 
    loading: loadingStartup,
    fn: fnStartup,
    data: startups,
  } = useFetch(getStartups);

//   const {
//     fn: fnSavedJob, 
//     data: savedJob, 
//     loading: loadingSavedJob,
//   } = useFetch(saveJob, {
//     alreadySaved: saved,
//   });
  
//   const handleSaveJob = async () =>{
//     await fnSavedJob({
//       user_id: user.id,
//       job_id: job.id,
//     });
//     onJobSaved();
//   };

//   const handleDeleteJob = async() => {
//     await fnDeleteJob();
//     onJobSaved();
//   };

//   useEffect(()=> {
//     if(savedJob!==undefined) setSaved(savedJob?.length > 0)
//   }, [savedJob]);

  return (
  <Card className="flex flex-col">
    {loadingStartup && (
      <BarLoader className="mt-4" width={"100%"} color="#36d7b7" />
    )}
    <CardHeader className="flex">
      <CardTitle className="flex justify-between font-bold">{startup.name}
      {/* {isMyJob && (
        <Trash2Icon fill="red" size={18} className="text-red-300 cursor-pointer" onClick={handleDeleteJob} />
      )} */}
      </CardTitle>
    </CardHeader>

    <CardContent className="flex flex-col gap-4 flex-1">
      <div className="flex justify-between">
        
        <div className ="flex gap-2 items-center">
          <MapPinIcon size={15} /> {startup.location}
        </div>
      </div>
      <hr />
      {startup.description.substring(0, startup.description.indexOf("."))}.
    </CardContent>
    <CardFooter className="flex gap-2">
      <Link to={`/startup/${startup.id}`} className="flex-1">
      <Button variant="secondary" className="w-full">
        More Details</Button></Link>
        {/* {!isMystartup && (
          <Button variant="outline" className="w-15" onClick={handleSavestartup} disabled={loadingSavedstartup}>

            {saved ? (
            <Heart size={20} stroke="red" fill="red" />
            ) : (
              <Heart size={20} />
            )} 
          </Button>
        )} */}
    </CardFooter>
  </Card>
  );
};

export default StartupCard;