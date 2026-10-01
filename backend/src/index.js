import {GoogleGenAI} from "@google/genai"
import "dotenv/config"
import express from "express"
import { reactBasePrompt } from "./react_prompt.js"
import {nodeBasePrompt} from "./nodejs_prompt.js"
import { getSystemPrompt } from "./system_prompt.js"


const ai=new GoogleGenAI({
    apiKey:process.env.GEMINI_API_KEY
})

const app=express();
app.use(express.json());

//for knowing if we are building react or nodejs and then giving intial setup commands
app.post("/template",async(req,res)=>{
    const prompt=req.body.prompt;
    // this is user's pure prompt

    const response=await ai.models.generateContent({
        model:"gemini-3.5-flash-lite",
        contents:prompt,
        config:{
            systemInstruction:`return either node or react based on what do u think this project should be.only return a single word either 'node' or 'react'.do not return anything extra`
        }
    })
    const answer=response.text;
    if(answer=="react"){
        // prompts are for llm, uiprompts are for frontend/we containers
        return res.json({
            prompts:["we supports JSX syntax with Tailwind CSS classes, React hooks, and Lucide React for icons. Do not install other packages for UI themes, icons, etc","these are the files that are already present for react- eslint.config.js, index.html, package.json, postcss.config.js, tailwind.config.js, tsconfig.app.json, tsconfig.json, tsconfig.node.json, vite.config.ts, src/App.tsx, src/index.css, src/main.tsx, src/vite-env.d.ts"],
            uiPrompts:[reactBasePrompt]
        })
    }
    if(answer=="node"){
        return res.json({
            prompts:["these are the files that are already present for node= index.js, package.json"],
            uiPrompts:[nodeBasePrompt]
        })
    }
    return res.status(403).json({
        message:"you can't access this"
    })
})


app.post("/chat",async(req,res)=>{
    const messages=req.body.messages;
    const response=await ai.models.generateContent({
        model:"gemini-3.5-flash-lite",
        contents:[""],
        config:{
            systemInstruction:getSystemPrompt()
        }
    })
    return res.json({
        response:response.text
    })
})

app.listen(3000,()=>{
    console.log("app is listening at the port 3000")
});