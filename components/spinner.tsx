interface SpinnerDetails{
    radius: string,
}

export default function Spinner(props: SpinnerDetails){


    return(
        <div className="flex justify-center items-center min-h-96 w-full bg-opacity-80 absolute bg-white p-56">
            <div className={`h-${props.radius} w-${props.radius} border-4 animate-spin border-r-slate-400 border-l-slate-400 border-t-blue-800 border-b-blue-800 p-20 rounded-full`}>
            
            </div>
        </div>
        
    )

}