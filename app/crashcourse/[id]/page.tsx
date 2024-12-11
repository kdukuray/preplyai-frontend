"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { useEffect, useState } from "react"
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css'
import { useToast } from "@/hooks/use-toast";
import Spinner from "@/components/spinner";

// interface to define the structure of the url parameter
interface UrlPrameter{
    id: number;
}
export default function CrashCourse({params}: {params: Promise<UrlPrameter>}){

    // state varaibles needed for the component to work
    const baseClinetUrl = "http://127.0.0.1:3000/"
    const baseServerUrl  = "https://preplyai-87b9b3124981.herokuapp.com/"
    const [crashCourse, setCrashCourse] = useState("")
    const [crashCourseResources, setCrashCourseResources] = useState<any[]>()
    const [crashCourseLoading, setCrashCourseLoading] = useState<boolean>(true);
    const { toast } = useToast()

    // function to get retrueve crash course ID from the url parameter
    async function getCrashCourseId(): Promise<number>{
        try{
            const result = await params;
            const crash_course_id = result.id
            return crash_course_id
        }
        catch(error){
            throw new Error("Failed to retrieve crash course ID.")
        }
        
    }

    // funciton to get crash courses from the server
    async function getCrashCourse(crash_course_id: number){
        // construct payload 
        const payload = new FormData();
        payload.append("crash_course_id", `${crash_course_id}`)

        try{
            const response =  await fetch(`${baseServerUrl}crash-course/get-crash-course/`, {
                method: "POST",
                body: payload
            });

            if (!response.ok){
                throw new Error("Failed to fetch from the server");
            }
            const data: any =  await response.json()
            setCrashCourse(data["content"]);
            setCrashCourseResources(JSON.parse(data["resources"]))

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
            setCrashCourseLoading(false);

        }
       
    }

    useEffect(()=>{
        getCrashCourseId()
        .then((crash_course_id)=>{
            getCrashCourse(crash_course_id)
           
        })
    }, [])

    return (
        <div className="crash-course-page">
            {crashCourseLoading && <Spinner></Spinner> }
            <div className="crash-course-container md:pr-24 md:pl-24 pr-3 pl-20">

                <ReactMarkdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                >
                    {crashCourse}
                </ReactMarkdown>
                {crashCourseResources && 
                <>
                <h1>Additional Resouces</h1>
                <div className="flex flex-wrap">
                    {crashCourseResources.map((resource, index)=>(
                        <div key={index} className="inline mb-3">
                            <Link href={resource.url} target="_blank">
                                <Card  className="hover:shadow-lg hover:shadow-slate-200 transition-all">
                                    <CardHeader className="font-bold text-center text-2xl">{resource.title}</CardHeader>
                                    <CardContent className="text-lg">
                                        <p><strong>Type: </strong>{resource.type}</p>
                                        <p><strong>Difficulty: </strong>{resource.difficulty}</p>
                                        <p><strong>Description: </strong>{resource.description}</p>
                                        <p><strong>Estimated Completion Time: </strong>{resource.estimatedCompletionTime}</p>

                                    </CardContent>
                                </Card>
                            </Link>
                        </div>
                    ))}
                </div>
                </>
                    
                }

            </div>
           
      
        </div>

    )
}