import { Card, CardHeader, CardContent, CardTitle } from "../ui/card"
import Image from "next/image";
import logo from "../../images/preplyai-logo-no-bg.png"

interface LandingPageCardData{
    title: string,
    text: string,
}

export default function LandingPageCard(props: LandingPageCardData){
    return(
        <Card className="w-96 mt-4 lg:mt-0 h-52">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Image alt="preplyai-logo" className="object-contain h-12 w-12" src={logo}/>
              <p className="inline">{props.title}</p></CardTitle>
          </CardHeader>
          <CardContent>
          <p className="text-sm text-slate-600">{props.text}</p>
          </CardContent>

        </Card>

    )

}