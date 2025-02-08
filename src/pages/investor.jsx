import { useUser } from "@clerk/clerk-react";
import useFetch from "../hooks/use-fetch";
import { useParams } from "react-router-dom";
import { getSingleInvestor } from "../api/apiInvestor";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import { Briefcase, DoorClosed, DoorOpen, MapPinIcon } from "lucide-react";
import MDEditor from "@uiw/react-md-editor"
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@radix-ui/react-select";
// import { updateHiringStatus } from "../api/apiJobs";
// import ApplyJobDrawer from "../components/apply-job";
import InvestorCard from "../components/investor-card";
import { getMyStartups } from "../api/apiStartup";
import { checkPitched, pitchToInvestor } from "../api/apiPitch";
import { Button } from "../components/ui/button";

const InvestorPage = () => {
  const { isLoaded, user } = useUser();
  const { id } = useParams();

  // fetching a single investor
  const {
    loading: loadingInvestor,
    data: investor,
    fn: fnInvestor,
  } = useFetch(getSingleInvestor, {
    id: id,
  });

  // fetching startup details 
  const {
    loading: loadingStartup,
    data: startup,
    fn: fnStartup,
    } = useFetch(getMyStartups, {
      founder_id: user?.id
    })
  
    const { 
      loading: loadingPitch, 
      fn: fnPitch 
    } = useFetch(pitchToInvestor, {
      founder_id: user?.id, 
      sname: startup?.name, 
      description: startup?.description, 
      location: startup?.location, 
      industry: startup?.industry, 
      investor_id: investor?.investor_id
    });

  const handleStatusChange = (value) => {
    const isOpen = value === "open";
    fnPitchStatus(isOpen).then(() => fnJob());
  };

  // check if already pitched
  const {
    data: isPitched,
    fn: fnCheckPitched
  } = useFetch(checkPitched, {
    founder_id: user?.id,
    investor_id: investor?.investor_id,
  })

  useEffect(() => {
    if (isLoaded) fnInvestor()
  }, [isLoaded]);

  if (!isLoaded || loadingInvestor) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="flex flex-col gap-8 mt-5">
      <div className="flex flex-col-reverse gap-6 md:flex-row justify-between items-center">
      <h1 className="gradient-title font-extrabold pb-3 text-4xl sm:text-6xl">{investor?.name}</h1>
      {/* <img src={investor?.company?.logo_url} className="h-12" alt={investor?.name} /> */}
    </div>

    <div className="flex justify-between">
      <div className="flex gap-2">
        <MapPinIcon />
        {investor?.location}
      </div>
      <div className="flex gap-2">
        <Briefcase /> Industry: {investor?.industry}
      </div>
      {/* <div className="flex gap-2">
       {investor?.isOpen ? (<><DoorOpen/> Open</> ): ( <><DoorClosed/> Closed</> )}
      </div> */}
    </div>

    <h2 className="text-2xl sm:text-3xl font-bold">About the investor</h2>
    <p className="sm:text-lg">{investor?.description}</p>

    {/* <h2 className="text-2xl sm:text-3xl font-bold">
      What we are looking for
    </h2>
    <MDEditor.Markdown source={investor?.requirements} className="bg-transparent sm:text-lg"/> */}

    {/* render applications */}
    {/* {startup?.recruiter_id !== user?.id && (
      <ApplystartupDrawer startup={startup} user={user} fetchstartup={fnstartup} applied={startup?.applications?.find((ap) => ap.candidate_id === user.id)} />
    )}

    {loadingHiringStatus && <BarLoader width={"100%"} color="#36d7b7" />}
    {startup?.applications?.length > 0 && startup?.recruiter_id === user?.id && (
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl sm:text-3xl font-bold">Applications</h2>
        {startup?.applications.map((application)=>{
          return <ApplicationCard key={application.id} application={application} />
        })}
      </div>
    )} */}

    {/* hiring status */}
    {/* {user?.unsafeMetadata?.role === "Founder"  && (
      <Select onValueChange={handleStatusChange}>
      <SelectTrigger className={`w-full ${startup?.isOpen ? "bg-green-950" : "bg-red-950"}`}>
        <SelectValue placeholder={"Hiring Status " + (startup?.isOpen ? "( Open )" : "( Closed )")}
        />
      </SelectTrigger>
      <SelectContent>
          <SelectItem value="open">
          Open
        </SelectItem>
        <SelectItem value="closed">
          Closed
        </SelectItem>
      </SelectContent>
    </Select>
  )} */}

  {/* pitching status */}
  {isPitched?  (
    <div>We are pitched</div>
  ): (<div><Button variant="blue" onClick={fnPitch}>Pitch</Button></div>)}
    </div>
  )
}



export default InvestorPage