import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";

const Onboarding = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate()
  // taking input from the user as a founder or investor and respond accordingly. 

  const handleRoleSelection=async()=>{
    await user.update({
      unsafemetadata: { role },
    }).then(()=>{
      navigate(role === "founder" ? "/" : "/");
     })
     .catch((err)=> {
      console.error("Error updating role:",err);
     });
  };

  useEffect(() => {
    if(user.unsafemetadata.role){
      navigate(
        user.unsafemetadata.role === "investor" ? "" : ""
      );
    }

  }, [user])

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    //creating two buttons founfer and investor for both of them to login and acess the website accordingly.
    <div className="flex flex-col items-center justify-center mt-32">
      <h2 className="gradient-title font-extrabold text-7x1 sm:text-8x1 tracking-tighter">
        I am a..
      </h2>
      <div className="mt-16 grid grid-cols-2 gap-4 w-full md:px-40">
        <Button variant="blue" classsName="h-36 text-2x1 "
        onClick={() =>handleRoleSelection("Founder")}>
          Founder
         </Button>
         <Button variant="destructive" classsName="h-36 text-2x1"
        onClick={() =>handleRoleSelection("Investor")}>
         
         Investor
         </Button>
      </div>
    </div>
  );
};

export default Onboarding;
