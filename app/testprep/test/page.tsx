"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";


interface q_optoins{
    letter: string,
    value: string
}

interface Question{
    id: number,
    prompt: string,
    options: q_optoins[],
    answer: string
}

const mock_question: Question = {
    id: -1,
    prompt: "Lorem ipsum dolor sit amet, consectetur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum?",
    options: [
        {letter: "A", value: "There are 4 butteflies in the pond"},
        {letter: "B", value: "There are 4 butteflies in the pond"},
        {letter: "C", value: "There are 4 butteflies in the pond"},
        {letter: "D", value: "There are 4 butteflies in the pond"}

    ],
    answer: "C"
}


export default function Test(){

    function gradeTest(){
        console.log("Test Graded!");
    }

    const all_questions: Question[] = [];
    for (let i = 0; i < 10; i++){
        all_questions.push({...mock_question, id: i});
    }


    return (
        <div className="flex flex-col justify-center items-center">

            {all_questions.map((question)=>(
                <div className="testprep-question w-2/3 lg:w-1/2 h-auto mb-16" key={question.id}>
                <p className="text-xl lg:text-2xl text-slate-800">{`${question.id+1}. ${question.prompt}`}</p>
                <RadioGroup className="mt-7">
                        {question.options.map((option)=>(
                            <div key={option.letter} className="flex items-center p-1">
                                <RadioGroupItem value={option.letter} className="mr-3 h-6 w-6"/>
                                <Label className="text-xl text-slate-800">{option.value}</Label>
                            </div>

                        ))}
                        
                </RadioGroup>
            </div>


            ))}

            <div className="fixed bottom-0 w-full h-20 flex bg-white justify-center items-center border-t-2 border-t-slate-100">
                <Button className="signature-color bg-white border-2 border-slate-200 w-32 text-lg font-bold" onClick={()=> gradeTest()}>Submit Test</Button>
            </div>

            

        </div>
    )
}