"use client"
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Spinner from "@/components/spinner";
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css'

// interface defining the structure of the url parameter
interface UrlParameter{
    id: number;
}
export default function SummaryPage({params}: {params: Promise<UrlParameter>}){

    // state variables needed for the component
    const baseServerUrl  = process.env.NEXT_PUBLIC_SERVER_URL;
    const [summaryLoading, setSummaryLoading] = useState<boolean>(true);
    const [summary, setSummary] = useState<string>("");
    const { toast } = useToast();


    // function that retrieves summary id from the url
    async function getSummaryId(params: Promise<UrlParameter>): Promise<number>{
        try{
            const result = await params;
            const summary_id = result.id;
            return summary_id
        }
        catch(error){
            throw new Error("Failed to retrieve summary id from url")
        }
    }

    // function that reteives summary information from the server
    async function getSummary(summary_id: number){

        try{
            const response = await fetch(`${baseServerUrl}summary/${summary_id}/`);

            if (!response.ok){
                throw new Error("Failed to fetch from the server")
            }
            const data = await response.json()
            const summary = data["summary_points"];
            setSummary(summary);
        
        }
        catch(error){
            if (error instanceof Error){
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: `${error.message}. Please refresh the page or try again later.`
                })
            }
        }
        finally{
            setSummaryLoading(false);
        }
        
    }

    useEffect(()=>{
        getSummaryId(params)
        .then((test_id)=>{
            getSummary(test_id)
        })
      
    }, [])

    return (
        <div>
            {summaryLoading && <Spinner></Spinner>}
            <div className="summary-page-conatiner flex flex-col m-auto">
            {!summaryLoading && 
            <div className="summary-container">
                <ReactMarkdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
                >
                {summary}
                </ReactMarkdown>
            </div>
            }
            </div>
            
        </div>
    )
}