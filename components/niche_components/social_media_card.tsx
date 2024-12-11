import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import Image from "next/image";
import Link from "next/link";
interface SocialMediaCardData{
    image_src: any,
    image_alt_text: string
    tooltip_content: string,
    link: string
}
export default function SocialMediaCard(props: SocialMediaCardData){
    return (
        <div>
            <Link href={props.link} target="_blank">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                        <div className="p-4 hover:shadow-lg hover:border-2 rounded-full transition-all">
                            <Image className="object-contain h-10 w-10" alt={props.image_alt_text} src={props.image_src}/>
                        </div>
                        </TooltipTrigger>
                        <TooltipContent>{props.tooltip_content}</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </Link>

        </div>
                     
    )

}