import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";
import { pitchToInvestor } from "../api/apiPitch";

// const schema = z.object({
//     experience: z
//     .string()
//     .min(1, { message: "Past Experience(if any!)"})
//     .int(),
//     industry: z.string().min(1, {message: "Industry is required" }),
//     description: z.string().min(1, {message: "Give brief description about your Startup"})
// });
  
const PitchStartupDrawer = ({user, startup, pitched = false, fetchStartup }) => {

    // const {
    //     register,
    //     handleSubmit,
    //     control,
    //     formState: { errors },
    //         reset,
    // } = useForm({
    //     resolver: zodResolver(schema),
    // });

    const {
        loading: loadingPitch,
        error: errorPitch,
        fn: fnPitch,
    } = useFetch(pitchToInvestor);

    const onSubmit = (data) => {
        fnPitch({
            ...data,  
            startup_id: startup.id,
            founder_id: user.id,
            name: user.fullName,
            status: "pitched",
        }).then(() => {
            fetchStartup();
            reset();
        })
    };

  return (
    <Drawer open={applied ? false : undefined} >
    <DrawerTrigger asChild>
        <Button 
        size='lg'
        variant={startup?.isUninvested && !pitched ? "blue" : "destructive"}
        disabled={!startup?.isUninvested || pitched}>
            {startup?.isUninvested ? (pitched ? "Pitched" : "Pitch") : "Investment Closed"}
        </Button>
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>
            Pitch for {startup?.name} at {startup?.industry?.name}
        </DrawerTitle>
        <DrawerDescription>Please Fill the form below.</DrawerDescription>
      </DrawerHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4 pb-0">
            <Input
                type="text"
                placeholder="Past Startup Experience"
                className="flex-1"
                {...register("experience")}
            />
            {errors.experience && (
                <p className="text-red-500">{errors.experience.message}</p>
            )}

            <Input
                type="text"
                placeholder="Industry "
                className="flex-1"
                {...register("industry")}
            />
            {errors.industry && (
                <p className="text-red-500">{errors.industry.message}</p>
            )}

            <Input
                type="text"
                placeholder="Description "
                className="flex-1"
                {...register("description")}
            />
            
            {/* <Controller
                name="education"
                control={control}
                render={({field}) =>(
                    <RadioGroup 
                        onValueChange={field.onChange} {...field}>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Intermediate" id="intermediate" />
                            <Label htmlFor="intermediate">Intermediate</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Graduate" id="graduate" />
                            <Label htmlFor="graduate">Graduate</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Post Graduate" id="post-graduate" />
                            <Label htmlFor="post-graduate">Post Graduate</Label>
                        </div>
                    </RadioGroup>
                )}
            /> */}
            {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
            )}
            
            {errorPitch?.message && (
                <p className="text-red-500">{errorPitch?.message}</p>
            )}
            {loadingPitch && <BarLoader width={"100%"} color="#36d7b7" />}

             <Button type="submit" variant="blue" size="lg">
             Pitch
            </Button>
        </form>

      <DrawerFooter>
       
        <DrawerClose asChild> 
          <Button variant="outline">Cancel</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
  
  )
};

export default PitchStartupDrawer;