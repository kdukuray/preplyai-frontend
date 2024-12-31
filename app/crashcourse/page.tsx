"use client";
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import  { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/spinner";
import { getOrCreateUuid } from "@/custom_utils/utility_functions";
import { useToast } from "@/hooks/use-toast";

export default function CrashCourseGenerator(){

    // state variables needed for page
    const baseServerUrl  = process.env.NEXT_PUBLIC_SERVER_URL;
    const [formIsLoading, setFormIsLoading] = useState(false);
    const [preplyaiUserId, setPreplyaiUserId] = useState<string | null>();
    const router = useRouter();
    const { toast } = useToast();

    // variable defining the structure of the crash course form
    const crashCourseFormSchema = z.object({
        topic: z.string().min(5, "Topics should be at least 5 characters long"),
        course: z.string().min(5, "Courses must be at least 2 characters long")
    })

    // actual crash course form 
    const crashCourseForm = useForm<z.infer<typeof crashCourseFormSchema>>({
        resolver: zodResolver(crashCourseFormSchema),
        defaultValues: {topic: "", course: ""}
    })

    // funcion that generates a crahs course and pushes user to the generated crash course's page
    async function generateCrashCourse(){
        setFormIsLoading(true)
        // construct payload
        const topic = crashCourseForm.getValues().topic
        const course = crashCourseForm.getValues().course
        const payload = new FormData();
        payload.append("topic", topic);
        payload.append("course", course);
        payload.append("generator_uuid", `${preplyaiUserId}`);

        try{
            const response =  await fetch(`${baseServerUrl}crash-course/generate-crash-course/`, {
                method: "POST",
                body: payload
                }
            )
            if (!response.ok){
                throw new Error("Failed to fetch from the server.")
            }
            const data = await response.json()
            const new_crash_course_id = data["new_crash_course_id"]
            router.push(`/crashcourse/${new_crash_course_id}/`);
            
        }
        catch(error){
            if (error instanceof Error){
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: `${error.message}. Please try again later.`
                })
            }

        }
        finally{
            setFormIsLoading(true);
        }    
        
    }


    useEffect(()=>{
        setPreplyaiUserId(getOrCreateUuid());
    }, [])


    return (
        <div>
            {formIsLoading && 
            <Spinner></Spinner>
            }
            <h3 className="text-4xl text-center w-96 m-auto">Get a <span className="signature-color">crash course</span> to master any <span className="signature-color">topic</span></h3>
            <Form {...crashCourseForm}>
                <form className="w-5/6 md:w-1/2 border p-16 border-slate-300 rounded-sm m-auto mt-6 block" onSubmit={crashCourseForm.handleSubmit(generateCrashCourse)}>
                    <FormField
                    name="topic"
                    control={crashCourseForm.control}
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Topic</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Example: Derivatives"></Input>
                            </FormControl>
                            <FormDescription>Enter a topic for a quick crash course</FormDescription>
                        </FormItem>
                    )}
                    >
                    </FormField>


                    <FormField
                    name="course"
                    control={crashCourseForm.control}
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Course</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Example: Calculus 1"></Input>
                            </FormControl>
                            <FormDescription>Enter the topic's Course</FormDescription>
                        </FormItem>
                        )}
                    >

                    </FormField>
                    <Button className="signature-color-btn m-auto mt-7 block">Generate Crash Course</Button>
                </form>

            </Form>

        </div>
    )
}