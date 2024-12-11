import { v4 as uuidv4 } from "uuid";
export function getOrCreateUuid(){
    if (typeof window != undefined){
        const preply_ai_demo_user_uuid = localStorage.getItem("preply_ai_demo_user_uuid");
        if (!preply_ai_demo_user_uuid){
            const preply_ai_demo_user_uuid = uuidv4();
            localStorage.setItem("preply_ai_demo_user_uuid", preply_ai_demo_user_uuid)
        }
        return preply_ai_demo_user_uuid;
    }
    return null;
}