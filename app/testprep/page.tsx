"use client";
import { z } from "zod"
import {useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
export default function TestPrep(){

    const topic_list_form_schema = z.object({
        subject: z.string().min(2, "Please enter a string"),
        topics: z.string().min(2, "f")
    })

    const topic_list_form = useForm<z.infer<typeof topic_list_form_schema>>({
        resolver: zodResolver(topic_list_form_schema),
        defaultValues: {subject: "", topics: ""}
    });

    const seed_type_form_schema = z.object({
        seed: z.string()
    })

    const seed_type_form = useForm<z.infer<typeof seed_type_form_schema>>({
        resolver: zodResolver(seed_type_form_schema),
        defaultValues: {seed: ""}
    })

    const seedValue = seed_type_form.watch();




    return (
        <div>
            <h3 className="text-4xl text-center w-96 m-auto">Create a <span className="signature-color">practice test</span> to help you better prepare for <span className="signature-color">exams</span></h3>
            <Form {...seed_type_form}>
                <form className="m-auto w-96 block space-y-6">
                    <FormField
                    control={seed_type_form.control}
                    name="seed"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>Seed</FormLabel>
                                <Select defaultValue={"toics"} onValueChange={field.onChange}>
                                    {/* {console.log(seed_type_form.getValues().seed)} */}
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="seed"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                       
                                            <SelectItem value="topics">Topics</SelectItem>
                                            <SelectItem value="questions">Questions</SelectItem>
                                            <SelectItem value="notes">Notes</SelectItem>
                                        
                                    </SelectContent>
                                </Select>
                                    <FormDescription>Your seed type</FormDescription>
                                    <FormMessage/>
                                
                        </FormItem>
                    )}
                    />
                </form>

            </Form>
            <div className="flex justify-center items-center">
            { seedValue.seed == "topics" && (
                <Form {...topic_list_form}>
                    <form className="w-5/6 md:w-1/2 border p-16 border-slate-300 rounded-sm mt-6">
                        <FormField 
                        control={topic_list_form.control}
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
                        control={topic_list_form.control}
                        name="topics"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel className="font-bold resize-none">Topics</FormLabel>
                                <FormControl>
                                    <Textarea {...field}/>
                                </FormControl>
                            </FormItem>

                        )}
                        />
                        <Button className="w-1/2 m-auto block mt-8 signature-color-btn">Create</Button>
                    </form>
                </Form>)}




                { seedValue.seed == "questions" && (
                <Form {...topic_list_form}>
                    <form className="w-5/6 md:w-1/2 border p-16 border-slate-300 rounded-sm mt-6">

                        <FormField 
                        control={topic_list_form.control}
                        name="topics"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel className="font-bold resize-none">Question Paper</FormLabel>
                                <FormControl>
                                    <Input type="file" {...field}/>
                                </FormControl>
                                <FormDescription>File must be in pdf format</FormDescription>
                            </FormItem>

                        )}
                        />
                        <Button className="w-1/2 m-auto block mt-8 signature-color-btn">Create</Button>
                    </form>
                </Form>)}


                { seedValue.seed == "notes" && (
                <Form {...topic_list_form}>
                    <form className="w-5/6 md:w-1/2 border p-16 border-slate-300 rounded-sm mt-6">

                        <FormField 
                        control={topic_list_form.control}
                        name="topics"
                        render={({field})=>(
                            <FormItem>
                                <FormLabel className="font-bold resize-none">Notes</FormLabel>
                                <FormControl>
                                    <Input type="file" {...field}/>
                                </FormControl>
                                <FormDescription>File must be in pdf format</FormDescription>
                            </FormItem>

                        )}
                        />
                        <Button className="w-1/2 m-auto block mt-8 signature-color-btn">Create</Button>
                    </form>
                </Form>)}


            </div>
            
            

        </div>
    )
}