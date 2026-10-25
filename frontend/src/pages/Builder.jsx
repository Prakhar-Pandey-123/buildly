import { useEffect, useState } from "react";
import {useLocation, useNavigate} from "react-router-dom"
import { useWebContainer } from "../hooks/useWebContainer";
import axios from "axios"
import {BACKEND_URL} from "../config"
import {StepsList} from "../components/StepsList"
import { Loader } from "../components/Loader";
import {FileExplorer} from "../components/FileExplorer"
import {TabView} from "../components/TabView"
import {CodeEditor} from "../components/CodeEditor"
import {parseXml} from "../steps.js"
import {PreviewFrame} from "../components/PreviewFrame.jsx"
import {Wand2} from 'lucide-react'
import { Download } from "../components/Download.jsx";
import toast from "react-hot-toast";



export function Builder(){
    const navigate= useNavigate();
    // to get the state(variable data) from other page(home) to this page
    const location =useLocation(); 
    const {prompt}=location.state;

    const [llmMessages,setLlmMessages]=useState([]);// this will act as history of prev convo to the llm

    const [loading,setLoading]=useState(false);//show the loader

    const webcontainer=useWebContainer();//to run off backend on the frontend

    const [currentStep,setCurrentStep]=useState(1);//just for highlighting the step on which the user clicked last
    
    const [activeTab,setActiveTab]=useState("code"); //to show code editor if tab is code else show previewframe 

    const [selectedFile,setSelectedFile]=useState(null);//code editor need to show it

    const [steps,setSteps]=useState([]);//shows list of all the steps that be/llm gave to the fe after they are parsed
// [
//   {
//     type: "CreateFile",
//     path: "/src/App.tsx",
//     code: "function App() { ... }",
//     status: "pending"
//   },
//   {
//     type: "CreateFile",
//     path: "/src/components/Navbar.tsx",
//     code: "function Navbar() { ... }",
//     status: "pending"
//   }
// ]

    const [files,setFiles]=useState([]);//this contains every code file that file/folder explorer shows 

//     name: "src",
//     type: "folder",
//     path: "/src",
//     children: [
//       {
//         name: "component",
//         type: "folder",
//         path: "/src/component",
//         children: [
//           {
//             name: "app.jsx",
//             type: "file",
//             path: "/src/component/app.jsx",
//             content: "..." // app.jsx code
//           },
//           {
//             name: "button.jsx",
//             type: "file",
//             path: "/src/component/button.jsx",
//             content: "..." // button.jsx code
//           }
//         ]]

    const [templateSet,setTemplateSet]=useState(false);
    // templateSet = false → Show the loader
// templateSet = true , loading = false → Show the bottom textarea and Send button.

    const [userPrompt,setUserPrompt]=useState("")// this is for storing the further query messages of the user after intial web is made by llm
    

    async function init(){
        try{
        const response=await axios.post(`${BACKEND_URL}/template`,{
            prompt:prompt.trim()
        });
        setTemplateSet(true);
    
        const {prompts,uiPrompts}=response.data;
        // console.log("prompts from /template",prompts);
        // console.log("uiprompt from /template",uiPrompts);
    

        // parse the xml we got from uiprompts(be) then add it to the steps 
        setSteps( parseXml(uiPrompts[0]).map((x) =>({
            ...x,
            status:'pending'
        }) ))
        // console.log("steps after /template",steps);

        setLoading(true);

        // prompts=2 system prompts that came from backend->
        // telling llm the files that are already present+use's prompt

        const stepsResponse=await axios.post(`${BACKEND_URL}/chat`,{
            messages:[...prompts,prompt].map(content=>({
                role:'user',
                parts:[{text:content}]
            }))
        });

        setLoading(false);
        // console.log("response form /chat",stepsResponse.data.response)
        // set the steps we got from llm 
        setSteps(s=>[...s,...parseXml(stepsResponse.data.response).map(x=>({
            ...x,
            status:'pending'
        }))])
        // console.log("steps after /chat",steps);

                // store the chat history
            setLlmMessages([
            ...prompts.map(content => ({
                role: "user",
                parts: [{ text: content }]
            })),
            {
                role: "user",
                parts: [{ text: prompt }]
            },
            {
                role: "model",
                parts: [{ text: stepsResponse.data.response }]
            }
            ]);
        }
            catch (error) {
                    if (error.response?.status === 403) {
                        toast.error("Unsupported prompt")
                    } else {
                        console.error("Error:", error.message);
                    }
                    navigate("/");
            }
    }


    useEffect(()=>{
        init()
    },[])

// ======== this is for creating all files from the 'steps', that will be shown in file explorer=========

useEffect(()=>{
    // pick up all the steps that are still pending
    const pending=steps.filter(({status})=>status==='pending');

    // if nothing is pending then stop, this replaces updateHappened and prevents infinite updates
    if(pending.length===0) return;

    let originalFiles=[...files];

    pending.forEach(step=>{
        if(step?.type==='CreateFile'){
            // filter(Boolean) removes empty strings, so "/src/App.jsx" and "src/App.jsx" both work
            let parsedPath=step.path?.split("/").filter(Boolean)??[]; //["src","components","app.jsx"]

            let currentFileStructure=[...originalFiles];
            let finalAnswerRef=currentFileStructure
            let currentFolder=""
            while(parsedPath.length){//as long as items are present we will loop through else it is over(we keep popping from the front)

                currentFolder=`${currentFolder}/${parsedPath[0]}`
                // first it becomes src then src/component then src/component/app.jsx
                let currentFolderName=parsedPath[0];
                // get the current folder/file name

                parsedPath=parsedPath.slice(1);
                //remove the current file/folder from current path

                if(!parsedPath.length){
                    // it is file =app.jsx from src/component/app.jsx
                    let file=currentFileStructure.find(x=>x.path===currentFolder)
                    if(!file){
                        // file dont exist=create new one
                        currentFileStructure.push({
                            name:currentFolderName,
                            type:'file',
                            path:currentFolder,
                            content:step.code
                        })
                    }
                    else{//update the code=file is already there
                        file.content=step.code;
                    }
                }
                else{//its a folder
                    let folder=currentFileStructure.find(x=>x.path===currentFolder)
                    if(!folder){//create a new folder and then latter push the files in the children of this folder
                        currentFileStructure.push({
                            name:currentFolderName,
                            type:'folder',
                            path:currentFolder,
                            children:[]
                        })
                    }
                    // then move into the children of this folder eg-src->childre=component
                    currentFileStructure=currentFileStructure.find(x=>x.path===currentFolder).children;
                }
            }
            originalFiles=finalAnswerRef;
        }
    })

    setFiles(originalFiles)

    // mark ONLY the steps we just processed as completed, not every step
    const doneIds=new Set(pending.map(s=>s.id));
    setSteps(prev=>
        prev.map(s=>doneIds.has(s.id)?{...s,status:'completed'}:s)
    )
    // console.log("files after use effect of builder",files);
},[steps,files])

//==================== this is for creating structure as required by webContainer during mouting files/folders in it and then mount it into webcontainer==================

useEffect(()=>{
    const createMountStructure=(files)=>{
        // the outer fn to create whole structure as req by webcontainer
        const mountStructure={};
        // object that will contain final structure as-
//         const files = [
//     {
//         name: "package.json",
//         type: "file",
//         content: '{"scripts":{"dev":"vite"}}'
//     },
//     {
//         name: "src",
//         type: "folder",
//         children: [
//             {
//                 name: "App.jsx",
//                 type: "file",
//                 content: "function App() { return <h1>Hello</h1> }"
//             }
//         ]
    const processFile=(file,isRootFolder)=>{
        // recursive fn to create structure
        //isrootfolder is bool that tells if folder/file is in root directory or not
        if(file.type==='folder'){
            //for folder create a folder entry
            mountStructure[file.name]={
                directory:file.children?
                Object.fromEntries(
                    file.children.map(child=>[child.name,processFile(child,false)])
                )
                :{}
                // if that folder has children then call the recursive fn for every children file 
            }
            }
            else if(file.type==='file'){
                // if it is rootfolder then just put it in struct
                if(isRootFolder){
                    mountStructure[file.name]={
                        file:{
                            contents:file.content||''
                        }
                    }
                }
                else{
                    // else return , coz it is been called by root folder
                    return{
                        file:{
                            contents:file.content||''
                        }
                    }
                }
            }
            return mountStructure[file.name]
    }
    // call the recursive fn for every root file/folder
    files.forEach(file=>processFile(file,true));
    return mountStructure;
    }

    const mountStructure=createMountStructure(files)
    // call the base fn for the 'files'
    // console.log("mounted structure-",mountStructure);
    // put it into the webcontainer
    webcontainer?.mount(mountStructure);

},[files,webcontainer]);


    return(
        <div className="relative min-h-screen overflow-hidden bg-[#070a12] text-slate-100 flex flex-col">

            {/* background glows, style only */}
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[-12rem] h-[28rem] w-[50rem] max-w-full -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[120px]" />
            <div aria-hidden="true" className="pointer-events-none absolute bottom-[-12rem] right-[-8rem] h-[26rem] w-[26rem] rounded-full bg-sky-500/10 blur-[120px]" />

            <header className="relative z-10 flex items-center gap-4 border-b border-white/10 bg-white/[0.03] px-6 py-4 backdrop-blur">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-sky-400 shadow-lg shadow-indigo-500/30 cursor-pointer"
                    onClick={()=>{
                        navigate("/")
                    }}
                >
                    <Wand2 className="h-4 w-4 text-white" />
                </div>
                <div className="min-w-0">
                    <h1 className="text-xl font-semibold tracking-tight text-white">
                        Buildly-the website builder
                    </h1>
                    <p className="mt-0.5 truncate text-sm text-slate-400">Prompt: {prompt}</p>
                </div>

                <Download files={files} />
            </header>

        <div className="relative z-10 flex-1 overflow-hidden">
            <div className="h-full grid grid-cols-4 gap-4 p-4">
                <div className="col-span-1 space-y-6 overflow-auto rounded-2xl border border-white/10 bg-[#0c111c] p-4 text-slate-300 shadow-2xl shadow-indigo-950/40">
                    <div>
                        <div className="max-h-[75vh] overflow-y-auto pr-1">
                            <StepsList
                            steps={steps}
                            currentStep={currentStep}
                            setCurrentStep={setCurrentStep}
                            ></StepsList>
                        </div>
                        <div>
                            <div className="mt-4 flex">
                                <br />
                                {/* now showing the input box for further prompts  */}
                            {(loading || !templateSet) && <Loader></Loader>}
                            {/* if not loading or we already got initial template then show the query box */}
                            {!(loading || !templateSet) &&<div className="flex w-full items-stretch gap-2">
                            <textarea value={userPrompt}
                            onChange={(e)=>{
                                setUserPrompt(e.target.value)
                            }}
                            className="h-12 w-full resize-none rounded-xl border border-white/10 bg-[#070a12] p-3 text-sm leading-relaxed text-slate-100 placeholder-slate-500 outline-none transition focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-500/30"
                            >
                            </textarea>
                            <button 
                            // send to the llm
                            onClick={async()=>{
                            const newMessage={
                                role:'user',
                                parts:[{text:userPrompt}]
                            } 
                            setLoading(true)

                            // provide the llm the history of chat+user prompt
                            const stepsResponse=await axios.post(`${BACKEND_URL}/chat`,{
                                messages:[...llmMessages,newMessage]
                            })
                            setLoading(false)

                            setLlmMessages(x => [
                                ...x,
                                newMessage,
                                {
                                    role: "model",
                                    parts: [{ text: stepsResponse.data.response }]
                                }
                            ]);

                            setSteps(s=>[...s,...parseXml(stepsResponse.data.response).map(x=>({
                                ...x,
                            status:'pending'
                            }))])
                            setUserPrompt("");

                            }}
                            className="rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 px-4 text-sm font-medium text-white shadow-lg shadow-indigo-600/30 transition hover:from-indigo-400 hover:to-blue-400 hover:shadow-indigo-500/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 active:scale-[0.98]"
                            >
                                Send
                            </button>
                            
                            
                            </div>}

                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-span-1 overflow-auto rounded-2xl border border-white/10 bg-[#0c111c] p-4 text-slate-300 shadow-2xl shadow-indigo-950/40">
                    <FileExplorer
                        files={files}
                        setSelectedFile={setSelectedFile}
                    >
                    </FileExplorer>
                </div>
                <div className="col-span-2 h-[calc(100vh-8rem)] rounded-2xl border border-white/10 bg-[#0c111c] p-4 text-slate-300 shadow-2xl shadow-indigo-950/50">
                    <TabView
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    >
                    </TabView>
                    <div className="h-[calc(100%-4rem)] overflow-hidden rounded-xl border border-white/10 bg-[#070a12]">
                    {
                        activeTab==='code'
                        ?(<CodeEditor
                            file={selectedFile}
                        ></CodeEditor>)
                        :(
                           <PreviewFrame
                                files={files}
                                webContainer={webcontainer}
                            >
                           </PreviewFrame> 
                        )
                    }

                    </div>

                </div>
                
            </div>

        </div>

        </div>
    )
    
}


