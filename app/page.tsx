"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import LandingPageCard from "@/components/niche_components/landing_page_card";


export default function Home() {
  const router = useRouter();

  // Message that appears in muted color after the main message, 
  const soft_message: string = "PreplyAI is the only AI model designed with an education-first focus to enrich students' learning experience, to boost understanding and confidence.";

  const card_1_title: string = "Education First"
  const card_1_message: string = "PreplyAI is the only AI model designed with an education-first focus to enrich students' learning experience, creating personalized environments to boost understanding and confidence. ";
  
  const card_2_title: string = "Limited Access";
  const card_2_message: string = "Sign up now for early access! The beta will be limited to a select number of users, so register today to be notified as soon as version 0.1 goes live.";
  
  const card_3_title: string = "Coming Soon";
  const card_3_message: string = "PreplyAI's beta launches in December 2024, just in time for finals! Students can soon access powerful tools to study and make exam prep more efficient and effective.";


  function naviagate_to_waitlist_form_page(){
    router.push("/waitlist/join");
  }

  return (
    <div className="flex flex-col justify-around min-h-dvh">

      <div className="flex flex-col justify-around lg:h-96 ">

        <div className="main-message-container flex justify-center mt-4 lg:mt-0">
          <h3 className="text-6xl text-center w-96">Revolutioning <span className="signature-color">Education</span> with <span className="signature-color">AI!</span></h3>
        </div>

        <div className="soft-message-container flex justify-center mt-4 lg:mt-0">
          <p className="w-auto text-center text-slate-500">{soft_message}</p>
        </div>

        <div className="call-to-action-container flex justify-center mt-4 lg:mt-0">
          <Button className="signature-color-btn" onClick={()=>naviagate_to_waitlist_form_page()}>Join Waitlist!</Button>
        </div>

      </div>

      <div className="landing-page-cards-container flex  flex-col  justify-center items-center lg:flex-row lg:justify-around">

        <LandingPageCard title={card_1_title} text={card_1_message}></LandingPageCard>
        <LandingPageCard title={card_2_title} text={card_2_message}></LandingPageCard>
        <LandingPageCard title={card_3_title} text={card_3_message}></LandingPageCard>

      </div>

    </div>
  );
}
