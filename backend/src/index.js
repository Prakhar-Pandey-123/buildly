import {GoogleGenAI} from "@google/genai"
import "dotenv/config"
import express from "express"
import { reactBasePrompt } from "./react_prompt.js"
import {nodeBasePrompt} from "./nodejs_prompt.js"
import { getSystemPrompt } from "./system_prompt.js"
import cors from "cors";

const ai=new GoogleGenAI({
    apiKey:process.env.GEMINI_API_KEY
})

const app=express();
app.use(express.json());
app.use(cors());

//for knowing if we are building react or nodejs and then giving intial setup commands
app.post("/template",async(req,res)=>{
    try{
    const prompt=req.body.prompt;
    // this is user's pure prompt
    console.log("input for /template",prompt);

    const response=await ai.models.generateContent({
        model:"gemini-3.5-flash-lite",
        contents:prompt,
        config:{
            systemInstruction:`return either node or react based on what do u think this project should be.if the prompt is not about web development project then return 'else'.only return a single word either 'node' or 'react' or 'else'.do not return anything extra`
        }
    })
    const answer=response.text;
    console.log("response of template route",response.text);
    if(answer=="react"){
        // prompts are for llm, uiprompts are for frontend/we containers
        
        return res.json({
            prompts:["create a BASIC REACT WEBSITE ,DO NOT WRITE BACKEND OR EXPRESS ,JUST FRONTEND IN REACT,we supports JSX syntax with Tailwind CSS classes, React hooks, and Lucide React for icons. Do not install other packages for UI themes, icons, etc","these are the files that are already present for react- eslint.config.js, index.html, package.json, postcss.config.js, tailwind.config.js, vite.config.js, src/App.jsx, src/index.css, src/main.jsx"],
            uiPrompts:[reactBasePrompt]
        })
    }
    if(answer=="node"){
        return res.json({
            prompts:["create a BASIC NODE JS BACKEND, these are the files that are already present for node= index.js, package.json"],
            uiPrompts:[nodeBasePrompt]
        })
    }
    return res.status(403).json({
        message:"you can't access this"
    })
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            message:'server not working'
        })
    }
})


app.post("/chat",async(req,res)=>{
    try{
    const messages=req.body.messages;
    console.log("input for /chat",messages);
    const response=await ai.models.generateContent({
        model:"gemini-3.5-flash-lite",
        contents:messages,
        config:{
            systemInstruction:getSystemPrompt()
        }
    })
    console.log("response of chat route",response.text);
    return res.json({
        response:response.text
    })
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            message:'server not working'
        })
    }
})
// response.text
app.listen(3000,()=>{
    console.log("app is listening at the port 3000")
});