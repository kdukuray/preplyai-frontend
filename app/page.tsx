"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-dvh">
      <div className="home-page-content">

        <div className="main-message-container flex justify-center mt-2 lg:mt-0">
          <h3 className="text-5xl text-center w-96">Revolutioning <span className="signature-color">Education</span> with <span className="signature-color">AI!</span></h3>
        </div>

        <div className="soft-message-container flex flex-col justify-center mt-4 mb-4 lg:mt-0">

          <p className="w-auto text-center text-slate-500 mb-2">We currently offer the following services:</p>


          <div className="service flex justify-center items-center flex-col mb-2">
            <p className="w-auto text-center text-slate-500 mb-2"><strong>PDF Summarization:</strong> Effortlessly summarize PDFs of any length for quick insights.</p>
            <Link href="/testprep/">
              <div className="home-page-action w-80 border-2 border-red-200 h-14 rounded-md m-2 flex justify-center items-center hover:shadow-md transition-all hover:bg-red-100 cursor-pointer">
                <h4 className="text-center text-xl">Take Prcatice Test</h4>
              </div>
            </Link>
          </div>


          <div className="service flex justify-center items-center flex-col mb-2">
            <p className="w-auto text-center text-slate-500 mb-2"><strong>Practice Test Generation:</strong> Create customized practice tests based on past questions, homework, personal notes, or any topic of your choice.</p>
            <Link href="/summary/">
              <div className="home-page-action w-80 border-2 border-blue-200 h-14 rounded-md m-2 flex justify-center items-center hover:shadow-md transition-all hover:bg-blue-100 cursor-pointer">
                <h4 className="text-center text-xl">Generate PDF Summary</h4>
              </div>
            </Link>
          </div>


          <div className="service flex justify-center items-center flex-col mb-2">
            <p className="w-auto text-center text-slate-500 mb-2"><strong>Crash Course Generation:</strong>Quickly get up to speed on any subject, complete with curated resources to explore the topic further in depth.</p>
            <Link href="/crashcourse/">
              <div className="home-page-action w-80 border-2 border-green-200 h-14 rounded-md m-2 flex justify-center items-center hover:shadow-md transition-all hover:bg-green-100 cursor-pointer">
                <h4 className="text-center text-xl">Get Crash Course</h4>
              </div>
            </Link>
          </div>


        </div>


      </div>


    </div>
  );
}
