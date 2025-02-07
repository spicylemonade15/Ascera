import { Boxes, BriefcaseBusiness, Dam, DamIcon, Download, School } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { updatePitchStatus } from "../api/apiPitch";

const PitchCard = ({ pitch, isFounder = false }) => {

    const { 
        loading: loadingInvestingStatus, fn: fnInvestingStatus 
    } = useFetch(updatePitchStatus,
        {
            startup_id: application.startup_id,
        }
    );

    const handleStatusChange = (status) => {
        fnInvestingStatus(status);
    }

  return (
  <Card>
    {<BarLoader width={"100%"} color="#36d7b7"/>}
    <CardHeader>
        <CardTitle className="flex justify-between font-bold">
            {isFounder
            ? `${pitch?.Startup?.name} at ${application?.Startup?.industry?.name}`
        : application?.name}
        {/* <Download
        size={18}
        className="bg-white text-black rounded-full h-8 w-8 p-1.5 cursor-pointer"
        onClick={handleDownload}
        /> */}
        </CardTitle>
    </CardHeader>

    <CardContent className='flex flex-col gap-4 flex-1'>
        <div className="flex flex-col md:flex-row justify-between">
             <div className="flex gap-2 items-center">
                <BriefcaseBusiness size={15}/> {application?.experience} Past StartUps(if any!)
             </div>

             <div className="flex gap-2 items-center">
                <School size={15}/> {application?.industry}
             </div>

             <div className="flex gap-2 items-center">
                <Boxes size={15}/> Description: {application?.description}
             </div>
        </div>
        <hr />
    </CardContent>
    <CardFooter className='flex justify-between'>
        <span>{new Date(application?.created_at).toLocaleDateString()}</span>
        {isFounder ? (
            <span className="capitalize font-bold text-green-400">
                Status: {application?.status}
                </span>
            ) :( 
                <Select onValueChange={handleStatusChange} defaultValue={application.status} >
                    <SelectTrigger className='w-52'>
                        <SelectValue
                            placeholder= "Application Status"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="pitching">Pitched</SelectItem>
                        <SelectItem value="accepted">Accepted</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                </Select>
            )}
        </CardFooter>
    </Card>
  );
};

export default PitchCard;