import {GoogleGenAI} from "@google/genai"
import "dotenv/config"


const ai=new GoogleGenAI({
    apiKey:process.env.GEMINI_API_KEY
})

async function main() {
    const response=await ai.models.generateContent({
        model:"gemini-3.5-flash-lite",
        contents:[
            "what is the current date ?"],
        config:{
            systemInstruction:`you are a helful agent`
        }
    })
    console.log(response.text);
}
main();
console.log("hi")

