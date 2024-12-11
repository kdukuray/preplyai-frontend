"use client";
import logo from "../images/preplyai-logo-no-bg.png";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar(){
  const router = useRouter();

  // function to navigate to about page
  function navigateToAbout(){
    router.push("/about")
  }
  // function to navgigate to discord channel
  function navigateToDiscord(){
    router.push("https://discord.gg/xpuvWQwwnZ");

  }
    return(
        <nav className="flex flex-row justify-between border-b-2 border-b-slate-100 pl-3 pr-3 h-16 mb-10 fixed bg-white w-full bg-opacity-100 z-10">
        <Link href="/">
          <div className="preplyai-nav-signage flex flex-row w-40 justify-center items-center cursor-pointer" >
            <Image alt="preplyai-logo" src={logo} className="h-16 object-contain w-16"/>
            <p className="signature-color w-22 text-lg">Preply AI</p>
          </div>
        </Link>

        <div className="nav-bar-actions w-60 flex justify-end items-center">
          <Button className="signature-color-btn" onClick={()=>navigateToDiscord()}>Contact Devs</Button>
          <Button className="signature-color-btn m-2" onClick={()=>navigateToAbout()}>About PreplyAI</Button>
        </div>
      </nav>
    );
}