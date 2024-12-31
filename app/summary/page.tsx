"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Spinner from "@/components/spinner";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function Summarize(){

    // state variables needed for component
    const baseServerUrl  = process.env.NEXT_PUBLIC_SERVER_URL
    const [generatingSummary, setGeneratingSummary] = useState<boolean>(false);
    const router = useRouter();
    const { toast } = useToast()


    // definition of the structure of the summarize pdf form
    const summarizePdfFormSchema = z.object({
        source_pdf: z.custom<File>((file) => file instanceof File && file.type === "application/pdf", {
            message: "The uploaded file must be a PDF.",
        })
    })

    // definition of the summarize form schema
    const summarizePdfForm = useForm<z.infer<typeof summarizePdfFormSchema>>({
        resolver: zodResolver(summarizePdfFormSchema)
    })

    // function that naviagtes to a sumary page after the summary has been created
    async function navigateToSummary(summary_id: number){
        router.push(`/summary/${summary_id}`)

    }

    // funciton that handles the generation of a summary and pushes user to the generated summary's page
    async function generateSummary(){
        setGeneratingSummary(true)
        // construct payload
        const uploaded_file = summarizePdfForm.getValues("source_pdf");
        const payload = new FormData();

        payload.append("source_pdf", uploaded_file);
        try{
            const response = await fetch(`${baseServerUrl}summary/generate/`, {
                method: "POST",
                body: payload
            })
            if (!response.ok){
                throw new Error("Failed to generate summary");
            }
            const data = await response.json();
            const summary_id = data["new_summary_id"]
            navigateToSummary(summary_id);
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
            setGeneratingSummary(false);
        }
    }

    return (
    <>
    <div>
    <h3 className="text-4xl text-center w-96 m-auto">Get a <span className="signature-color">concise </span> & <span className="signature-color">understandable</span> summary of any <span className="signature-color">PDF </span>document</h3>
        <div className="flex justify-center items-center">
            {generatingSummary && <Spinner></Spinner>}

            <Form {...summarizePdfForm}>
                    <form className="w-5/6 md:w-1/2 border p-16 border-slate-300 rounded-sm mt-6" 
                    onSubmit={summarizePdfForm.handleSubmit(generateSummary)}
                    >
                        <FormField
                        control={summarizePdfForm.control}
                        name="source_pdf"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel>Source PDF</FormLabel>
                                <FormControl>
                                    <Input 
                                    type="file"
                                    accept="application/pdf"

                                    onChange={(e)=>{
                                        const uploaded_file = e.target.files?.[0];
                                        if (uploaded_file){
                                            summarizePdfForm.setValue("source_pdf", uploaded_file, {shouldValidate: true})
                                        }
                                    }}
                                    
                                    ></Input>
                                </FormControl>
                            </FormItem>
                            )}
                        >
                        </FormField>
                        <Button className="signature-color-btn w-28 m-auto block mt-10 text-center">Summarize</Button>
                    </form>

                </Form>    

        </div>

            
    </div>
    </>)
}