export default function Spinner(){
    return(
        <div className="flex flex-col h-full w-full absolute top-1/2 bottom-1/2 -translate-y-1/2 justify-center bg-white bg-opacity-80 z-10">
            <div className="`h-auto w-auto border-4 border-r-slate-400 border-l-slate-400 animate-spin border-t-blue-800 border-b-blue-800 p-24  m-auto rounded-full">
            </div>
        </div>
        
    )

}