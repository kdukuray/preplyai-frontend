"use client";
import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css'
import { useToast } from "@/hooks/use-toast";

// interface defining the structure of the queston's options
interface QuestionOptoins{
    letter: string,
    value: string
}

// interface defining the structure of the question
interface Question{
    id: number,
    prompt: string,
    options: QuestionOptoins[],
    answer: string,
    user_selection?: string,
}

// interface defining the structure of the url parameter
interface UrlParameter{
    id: number;
}

// interface that defines the structure if a user's selection
interface UserSelectioin{
    index: number;
    selection: string;
}

export default function Test({params}: {params: Promise<UrlParameter>}){
    const baseClinetUrl = "http://127.0.0.1:3000/"
    const baseServerUrl  = process.env.NEXT_PUBLIC_SERVER_URL;
    const { toast } = useToast();

    // variables that need state and their setter functions
    const [allQuestoins, setAllQuestoins] = useState<Question[]>([]);
    const [loadingTest, setLoadingTest] = useState<boolean>(true);
    const [questionsAnswered, setQuestionsAnswered] = useState<boolean>(false);
    const [explanations, set_explanations] = useState<Record<number, string>>({});
    const [explanationsLoading, setExplanationsLoading] = useState<Record<number, boolean>>({})
    const [score, setScore] = useState<number>()
    const [result, setResult] = useState<string>()
    const router = useRouter();
    const [userSelections, setUserSelections] = useState<Record<number, string>>({});
    
    // function to get the test_id from the url parameter - has been refactored
    async function getTestId(params: Promise<UrlParameter>): Promise<number>{
        try{
            const result: UrlParameter = await params;
            const test_id: number = result.id;
            return test_id;
        }
        catch (error){
            if (error instanceof Error){
                console.error(error.message)
            }
            throw new Error("Failed to retrieve test ID.");
        }
        
    }

    // Function to retrieve a test from the server - has been refactored
    async function getTest(test_id: number){
        try{
            const response = await fetch(`${baseServerUrl}practice-test/get-practice-test/${test_id}`);
            if (!response.ok){
                throw new Error("Failed to fetch from the server");
            }

            const data = await response.json()
            setAllQuestoins(JSON.parse(data["questions"]))
           
        }
        catch (error){
            if (error instanceof SyntaxError){
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: `${error.message}. Please try again later.`
                 
                })
            }
            else if (error instanceof Error){
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: `${error.message}. Please try again later.`
                });
            }
        }
        finally{
            setLoadingTest(false);
        }
        
    }
  
    // function that handles the user selction of options - has been refactored
    function selectAnswer(question_id: number, user_selection: string){
        // Updates the user selection dictionary with every new user selection entry
        setUserSelections({
            ...userSelections,
            [question_id]: user_selection
        })     
    }

    // function to compute test details (result and percentage correct) -  has been refactored
    function computeTestDetails(){
        let score: number = 0;
        for (let i = 0; i < allQuestoins.length; i++){
            if (allQuestoins[i].answer == allQuestoins[i].user_selection){
                score++;
            }
            setScore((score/allQuestoins.length)*100);
            setResult(`${score}/${allQuestoins.length}`);
        }
    }

    // function to scroll to the top of the screen (after the practice test has been completed) - has been refacored
    function scrollToTop(){
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }

    // function that grades the test - has been refactored
    function gradeTest(){
        const answered_questions: Question[] = []
        allQuestoins.map((question, index)=>{
            question.user_selection = userSelections[index] 
            answered_questions.push(question)

        })
        setQuestionsAnswered(true);
        setAllQuestoins(answered_questions);
        computeTestDetails();
        scrollToTop();
    }

    
    // function to explain the correct answer to a question
    // has been refactored
    async function explainAnswer(index: number, prompt: string, correct_answer: string | undefined, user_selection: string | undefined){
        // construct payload
        const payload  = new FormData()
        payload.append("index", `${index}`);
        payload.append("correct_answer", `${correct_answer}`);
        payload.append("user_selection", `${user_selection}`);

        try {
            const response = await fetch(`${baseServerUrl}practice-test/explain-answer/`, {
                method: "POST",
                body: payload
            });

            if (!response.ok){
                throw new Error("Failed to fetch from the server")
            }

            const data = await response.json()
            set_explanations((previous_explanations)=>({
                ...previous_explanations,
                [index]: data["explanation"]
            }))
    
            setExplanationsLoading((previous_explanations_loading)=>({
                ...previous_explanations_loading,
                [index]: false
            }))
        }
        catch(error){
            if (error instanceof SyntaxError){
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: `${error.message}. Please try again later.`
                })
            }
            else if (error instanceof Error){
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: `${error.message}. Please try again later.`
                })
                
            }

        }
    }

    // function to retake the same test - has been refcatored
    async function retakeTest(){
        const test_id = await getTestId(params);
        router.push(`${baseClinetUrl}testprep/test/${test_id}/`);
        
    }
    
    useEffect(()=>{
        getTestId(params)
        .then((test_id: number)=>{
            getTest(test_id)
        })
    }, [])

    return (
        <>
        {loadingTest && <Spinner></Spinner>}

        <div className="flex flex-col justify-center items-center relative">

            { questionsAnswered && 
            <div className="flex flex-row justify-between w-2/3 mb-10">
                <div className="w-1/2">
                    <p className="text-3xl w-2/3 font-bold text-slate-600">Don't worry, you got this young blood</p>
                </div>

                <div className="flex flex-row justify-start w-1/2">
                    <div className="w-1/3 flex flex-col justify-between">
                        <p className="inline text-xl font-bold text-slate-600 text-center">Score</p>
                        <p className="font-bold text-2xl text-center text-slate-800 ">{`${score}%`}</p>
                    </div>    
                        
                    <div className=" w-1/3 flex flex-col justify-between">
                        <p className="inline text-xl font-bold text-slate-600 text-center">Result</p>
                        <p className="font-bold text-2xl text-center text-slate-800 ">{`${result}`}</p>
                    </div>  

                    <div className="w-1/3 flex flex-col justify-between">
                        <p className="inline text-xl font-bold text-slate-600 text-center">Time</p>
                        <p className="font-bold text-2xl text-center text-slate-800 ">3 min</p>
                    </div>  
                </div> 
            </div>
            }
            
            {allQuestoins && <>

                {allQuestoins.map((question, index)=>(
                    <div className="testprep-question w-2/3 lg:w-1/2 h-auto mb-16 relative" key={index}>
                    <div className="text-xl lg:text-2xl text-slate-800">
                        <ReactMarkdown
                          remarkPlugins={[remarkMath]}
                          rehypePlugins={[rehypeKatex]}
                        >
                          
                        {`${index+1} . ${question.prompt}`}
                            
                        </ReactMarkdown>
                        
                        </div>
                    <RadioGroup className="mt-7" onValueChange={(user_selction)=>selectAnswer(index, user_selction)}>
                            {question.options.map((option)=>(
                                    <div key={`${question.id}${option.letter}`} className={clsx("flex items-center p-1", {
                                        "opacity-60": questionsAnswered && !((option.letter == question.answer || option.letter ==  question.user_selection)),
                                        "border-2 rounded-md": questionsAnswered && (option.letter == question.answer || option.letter ==  question.user_selection),
                                        "border-red-400 ": questionsAnswered && (option.letter != question.answer),
                                        "border-green-400": questionsAnswered && (option.letter == question.answer) 

                                    })}>
                                        <RadioGroupItem value={option.letter} className="mr-3 h-6 w-6"/>
                                        <Label className={clsx("text-xl font-medium", {
                                            "text-slate-800": !(questionsAnswered && (option.letter == question.answer || option.letter ==  question.user_selection)),
                                            "text-red-700": questionsAnswered && (option.letter != question.answer),
                                            "text-green-700": questionsAnswered && (option.letter == question.answer) 
                                        })}>
                                            <ReactMarkdown
                                            remarkPlugins={[remarkMath]}
                                            rehypePlugins={[rehypeKatex]}
                                            >
                                                {option.value}
                                            </ReactMarkdown>
                                          
                                            </Label>
                                    </div>
                            
                            ))}
                    </RadioGroup>
                    {questionsAnswered && <Button className="signature-color-btn m-auto block mt-5 mb-5" 
                    onClick={()=>{
                        setExplanationsLoading((prev_explanations_loading)=>({
                            ...prev_explanations_loading,
                            [index]: true
                        }))
                        const correct_option = question.options.find(opt => opt.letter === question.answer)?.value;
                        const user_selection = question.options.find(opt => opt.letter === question.user_selection)?.value;
                        explainAnswer(index, question.prompt, correct_option, user_selection)}}>
                        Explain
                    </Button>}
                    {explanationsLoading[index] && 
                    <Spinner/>
                    } 
                    {explanations[index] && 
                    <div className="text-xl text-slate-800 border-2 p-4 rounded-md border-green-300">
                        <ReactMarkdown
                        remarkPlugins={[remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                        >
                                {explanations[index]}
                        </ReactMarkdown>
                    </div>
                    
                    } 
                </div>

                ))}
            </>}

            <div className="fixed bottom-0 w-full h-20 flex bg-white justify-center items-center border-t-2 border-t-slate-100 lg:flex-row">
                { questionsAnswered? 
                <>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <div className="w-52 mr-2 ml-2 signature-color bg-white border-2 rounded-md p-2 border-slate-200 font-bold text-lg" onClick={()=>retakeTest()}>Retake Test</div>
                            </TooltipTrigger>
                            <TooltipContent className="font-semibold">Retake this test</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    
                </>:
                <div className="absolute signature-color bg-white border-2 border-slate-200 w-40 rounded-md p-2 text-lg text-center font-bold cursor-pointer" onClick={()=> gradeTest()}>Submit Test</div>

                }
                
            </div>
                  
        </div>
        </>
    )
}