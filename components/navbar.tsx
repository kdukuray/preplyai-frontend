"use client";
import logo from "../images/preplyai-logo-no-bg.png";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Navbar(){

  const router = useRouter();

  function naviagate_to_waitlist_form_page(){
    router.push("/waitlist/join/");
  }

    return(
        <nav className="flex flex-row justify-between border-b-2 border-b-slate-100 pl-3 pr-3">
        <div className="preplyai-nav-signage flex flex-row w-40 justify-center items-center">
          <Image alt="preplyai-logo" src={logo} className="h-16 object-contain w-16"/>
          <p className="signature-color w-22 text-lg">Preply AI</p>
        </div>

        <div className="nav-bar-actions w-60 flex justify-between items-center">
          <Button className="signature-color-btn">Contact Devs</Button>
          <Button className="signature-color-btn" onClick={()=>naviagate_to_waitlist_form_page()}>Join Waitlist</Button>
        </div>
      </nav>
    );
}