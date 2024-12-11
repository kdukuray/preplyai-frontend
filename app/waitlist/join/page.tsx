"use client";
import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";


const firebaseConfig = {
    apiKey: "AIzaSyCxAyQ3ZOp2LkwBbVhqDa2cA7a0CSbr25s",
    authDomain: "preplyai.firebaseapp.com",
    projectId: "preplyai",
    storageBucket: "preplyai.firebasestorage.app",
    messagingSenderId: "380144169075",
    appId: "1:380144169075:web:6b00e4c6aec41498bdfa06",
    measurementId: "G-14FG5QJ18F"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const email_collection_reference = collection(db, "waitlistEmails");


export default function JoinWaitlist(){

    // state variables need for the component
    const [processing_form, setProcessingForm] = useState<boolean>(false);
    const { toast } = useToast();

    // Message that appears in muted color after the main message, 
    const soft_message: string = "Preply AI is coming soon to a limited number of users. Join the waitlist to get notified as soon as it goes live";
    const router = useRouter();

    // form structure definition
    const fromSchema = z.object({
        email: z.string().email("Please enter a valid email")
    })

    // actual form definiton
    const form = useForm<z.infer<typeof fromSchema>>({
        resolver: zodResolver(fromSchema),
        defaultValues: {email: ""}
    })

    // function to add people to the waitlist
    async function addToWaitlist(values: z.infer<typeof fromSchema>){
        setProcessingForm(true);

        // constrcut payload
        const new_email = {email: values.email};

        try{
            const response = await addDoc(email_collection_reference, new_email)
            if (!response.id){
                throw new Error()
            }
            router.push("/waitlist/success");

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
            setProcessingForm(false)

        }
        
;    }
    
    return(
        <div>
            {processing_form && <Spinner/>}
            <div className="main-message-container flex justify-center mt-4 lg:mt-0">
                <h3 className="text-3xl text-center w-96"><span className="signature-color">AI</span> that helps you <span className="signature-color">learn</span> better!</h3>
            </div>

            <div className="soft-message-container flex justify-center mt-2">
                <p className="w-auto text-center text-slate-500">{soft_message}</p>
            </div>

            <div className="flex justify-center flex-col items-center">
                <Form {...form}>
                    <form className="w-96 border p-16 border-slate-300 rounded-sm mt-6" onSubmit={form.handleSubmit(addToWaitlist)}>
                        <FormField
                        control={form.control}
                        name="email"
                        render={({field})=> (
                            <FormItem>
                                <FormLabel className="font-bold">Email: </FormLabel>
                                <FormControl>
                                    <Input {...field}/>
                                </FormControl>
                                <FormDescription>Enter email to join waitlist</FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}>

                        </FormField>
                        <Button disabled={form.formState.isSubmitting} className="mt-8 block w-full signature-color-btn">Join</Button>
                    </form>
                </Form>
            
            </div>
          
        </div>
    )







}