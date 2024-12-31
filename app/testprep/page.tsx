"use client";
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Spinner from "@/components/spinner";
import { getOrCreateUuid } from "@/custom_utils/utility_functions";
import { useToast } from "@/hooks/use-toast";

export default function TestPrep(){

    // state variables needed for the component
    const baseServerUrl  = process.env.NEXT_PUBLIC_SERVER_URL;
    const [processingForm, setProcessingForm] = useState<boolean>(false)
    const router = useRouter();
    const { toast } = useToast()

    // schema defining the structure of the sorce material type form
    const sourceMaterialTypeFormScehema = z.object({
        material: z.string()
    })

    // defintion of the source matrial type form
    const sourceMaterialTypeForm = useForm<z.infer<typeof sourceMaterialTypeFormScehema>>({
        resolver: zodResolver(sourceMaterialTypeFormScehema),
        defaultValues: {material: "topics"}
    })

    // variable used to watch the state of the source material type to change the form accordingly
    const sourceMaterial = sourceMaterialTypeForm.watch();

    // schema defining the structure of the sorce material form
    const sourceMaterialFormSchema = z.object({
        subject: z.string().min(2, "Subject name must be at least 2 chars long."),
        source_material: z.union([
            z.string().min(5, "Topics must be at least 5 characters long"),
            z.custom<File>((file) => file instanceof File && file.type === "application/pdf", {
                message: "The uploaded file must be a PDF.",
            }
            )
        ])
    })

    // defintion of the source matrial form
    const sourceMaterialForm = useForm<z.infer<typeof sourceMaterialFormSchema>>({
        resolver: zodResolver(sourceMaterialFormSchema),
        defaultValues: {subject: "", source_material: ""}
    });

    // function to generate a new test and push user to the next page
    async function generateTest(){

        // set processing form to true to start loading spinner
        setProcessingForm(true)

        // construct the payload to be sent to the server
        const subject: string = sourceMaterialForm.getValues().subject
        const sourceMaterial: any = sourceMaterialForm.getValues().source_material
        const sourceMaterialType: string = sourceMaterialTypeForm.getValues().material
        const preplyaiUserId = getOrCreateUuid();
        const payload = new FormData();
        payload.append("source_material_type", sourceMaterialType)
        payload.append("subject", subject);
        payload.append("source_material", sourceMaterial)
        payload.append("generator_uuid", `${preplyaiUserId}`)

        try{
            const response = await fetch(`${baseServerUrl}practice-test/generate-test/`, {
                method: "POST",
                body: payload,
            })

            if (!response.ok){
            
                throw new Error("Bad Response from the server");
            }
            const response_data = await response.json();
            const new_test_id = response_data.id;
            router.push(`testprep/test/${new_test_id}/`)

        }
        catch(error){
            if (error instanceof Error){
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: `${error.message}. Please try again later`
                })
            }
        }
        finally{
            setProcessingForm(false);
        }
    }

    return (
        <div>
            {processingForm && <Spinner/>}
            <h3 className="text-4xl text-center w-96 m-auto">Create a <span className="signature-color">practice test</span> to help you better prepare for <span className="signature-color">exams</span></h3>
            
            {/* Form to choose the type of source material to use */}
            <Form {...sourceMaterialTypeForm}>
                <form className="m-auto w-96 block space-y-6">
                    <FormField
                    control={sourceMaterialTypeForm.control}
                    name="material"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Source Material</FormLabel>
                                <Select defaultValue={"topics"} onValueChange={field.onChange}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Source Material"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Source Material</SelectLabel>
                                                <SelectItem value="topics">Topics</SelectItem>
                                                <SelectItem value="questions">Questions</SelectItem>
                                                <SelectItem value="notes">Notes</SelectItem>
                                            </SelectGroup>
                                    </SelectContent>
                                </Select>
                                    <FormDescription>Source Material</FormDescription>
                                    <FormMessage/>
                                
                        </FormItem>
                    )}
                    />
                </form>
            </Form>


            <div className="flex justify-center items-center">
            {/* Form to enter source material to geerate practice test */}
            <Form {...sourceMaterialForm}>
                <form className="w-5/6 md:w-1/2 border p-16 border-slate-300 rounded-sm mt-6" onSubmit={sourceMaterialForm.handleSubmit(generateTest)}>
                    <FormField 
                    control={sourceMaterialForm.control}
                    name="subject"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel className="font-bold">Subject</FormLabel>
                            <FormControl>
                                <Input {...field}/>
                            </FormControl>
                        </FormItem>

                    )}
                    />

                    <FormField 
                    control={sourceMaterialForm.control}
                    name="source_material"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel className="font-bold resize-none">Topics</FormLabel>
                            <FormControl>
                                {sourceMaterial.material == "topics"? 
                                <Textarea {...field} 
                                value={typeof field.value === "string" ? field.value : ""}
                                /> : 
                                <Input 
                                type="file" 
                                accept="application/pdf"
                                onChange={(e)=>{
                                    const uploaded_file = e.target.files?.[0];
                                    if (uploaded_file){
                                        sourceMaterialForm.setValue("source_material", uploaded_file, {shouldValidate: true});
                                    } 
                                }}
                                /> }
                            </FormControl>
                        </FormItem>

                    )}
                    />
                    <Button className="w-1/2 m-auto block mt-8 signature-color-btn">Create</Button>
                </form>

            </Form>
        
            </div>
        
        </div>
    )
}