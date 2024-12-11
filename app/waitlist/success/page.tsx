import instagram_logo from "../../../images/instagram-logo.svg";
import linkedin_logo from "../../../images/linkedin-logo.svg";
import tiktok_logo from "../../../images/tiktok-logo.svg";
import discord_logo from "../../../images/discord-logo.svg";
import SocialMediaCard from "@/components/niche_components/social_media_card";
export default function JoinedWaitlist(){

    const softMessage: string = "🎉 Success! You've been added to the PreplyAI waitlist. 🚀 Get ready to elevate your test prep experience—you're one step closer to smarter study sessions. Stay tuned!"
    const instagramLink: string = "https://www.instagram.com/preplyai/?utm_source=ig_web_button_share_sheet";
    const linkedinLink: string = "https://x.com/preplyai";
    const discordLink: string = "https://discord.gg/xpuvWQwwnZ";
    const tiktokLink: string = "https://www.tiktok.com/@preplyai";


    return (
        <div>
           
            <div className="main-message-container flex justify-center mt-4 lg:mt-0">
                <h3 className="text-4xl text-center w-96">You have <span className="signature-color">successfully</span> joined the waitlist for <span className="signature-color">Preply AI!</span></h3>
            </div>

            <div className="soft-message-container flex justify-center mt-10">
                <p className="w-auto text-center text-slate-500">{softMessage}</p>
            </div>

            <div className="flex flex-col justify-center items-center mt-20">
                <p className="mb-10 text-slate-600 text-lg">Also consider following us on social media to stay up to date!</p>

                <div className="flex flex-row justify-around lg:w-1/4">

                    <SocialMediaCard image_alt_text="instgarm-logo" image_src={instagram_logo} tooltip_content="Instagram" link={instagramLink}/>
                    <SocialMediaCard image_alt_text="linkedin-logo" image_src={linkedin_logo} tooltip_content="Linked In" link={linkedinLink}/>
                    <SocialMediaCard image_alt_text="Discord-logo" image_src={discord_logo} tooltip_content="Discord" link={discordLink}/>
                    <SocialMediaCard image_alt_text="Tiktok-logo" image_src={tiktok_logo} tooltip_content="Tiktok"link={tiktokLink}/>
                    
                </div>

            </div>

        
        </div>
    )
}