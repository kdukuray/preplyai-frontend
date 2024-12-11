"use client"
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Spinner from "@/components/spinner";

// interface defining the structure of the url parameter
interface UrlParameter{
    id: number;
}
export default function SummaryPage({params}: {params: Promise<UrlParameter>}){

    // state variables needed for the component
    const baseServerUrl  = "https://preplyai-87b9b3124981.herokuapp.com/"
    const [allSummaryPoints, setAllSummaryPoints] = useState<any[]>([]);
    const [summaryLoading, setSummaryLoading] = useState<boolean>(true);
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
 
        const all_summary_points_parsed = [];

        try{
            const response = await fetch(`${baseServerUrl}summary/${summary_id}/`);

            if (!response.ok){
                throw new Error("Failed to fetch from the server")
            }
            const data = await response.json()
            const summary_points_in_data = data["summary_points"]
            for (let i  = 0; i < summary_points_in_data.length; i++){
                all_summary_points_parsed.push(JSON.parse(summary_points_in_data[i]))
            }
            setAllSummaryPoints(all_summary_points_parsed);
        
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
      
    }, [getSummaryId, getSummary])

    return (
        <div>
            {summaryLoading && <Spinner></Spinner>}
            <div className="summary-page-conatiner flex flex-col m-auto">
            {!summaryLoading && 
            allSummaryPoints.map((summary: any, summaryIndex: number)=>(
                <div key={summaryIndex} className="border-b-2 pb-10 mt-10 border-b-blacks">
                    <h3 className="main-point text-3xl font-extrabold mb-4">Main Point: {summary["main_topic"]}</h3>
                    <ol>

                    {summary["key_points"].map((key_point: any, keyPointIndex: number)=>(
                        <div key={keyPointIndex} className=" mb-5">
                            <h5 className="font-semibold text-lg mb-5">{keyPointIndex+1}. {key_point["key_point"]}</h5>
                            <ol className="ml-20">
                                {key_point["supporting_details"].map((supportingDocument: any, supportingDetailsIndex: number)=>(
                                    <li className="list-disc text-lg" key={supportingDetailsIndex}>{supportingDocument}</li>
                                ))}
                            </ol>
                         
                        </div>
                        
                    ))}

                    </ol>
                    <h5 className="font-semibold text-lg mb-5">Additonal Points</h5>
                    <ol>
                        {summary["additional_insights"].map((additionalInsights: any, additionalInsightsIndex: number)=>(
                            <li className="list-disc text-lg" key={additionalInsightsIndex}>{additionalInsights}</li>
                        ))}
                    </ol>

                </div>
                
            ))
            }
            </div>
            
        </div>
    )
}