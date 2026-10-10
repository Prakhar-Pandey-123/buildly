import { useEffect, useState } from "react";
import {useLocation} from "react-router-dom"
import { useWebContainer } from "../hooks/useWebContainer";
import axios from "axios"
import {BACKEND_URL} from "../config"
import {StepsList} from "../components/StepsList"
import { Loader } from "../components/Loader";
import {FileExplorer} from "../components/FileExplorer"
import {TabView} from "../components/TabView"
import {CodeEditor} from "../components/CodeEditor"



export function Builder(){
    // to get the state(variable data) from other page(home) to this page
    const location =useLocation(); 
    const {prompt}=location.state;

    const [llmMessages,setLlmMessages]=useState();// this will act as history of prev convo to the llm

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
// [
//   {
//     name: "src",
//     type: "folder",
//     path: "/src",
//     children: [
//       {
//         name: "App.tsx",
//         type: "file",
//         path: "/src/App.tsx",
//         content: "function App() { ... }"
//       }]}]

    const [templateSet,setTemplateSet]=useState(false);
    // templateSet = false → Show the loader
// templateSet = true , loading = false → Show the textarea and Send button.

    const [userPrompt,setUserPrompt]=useState("")// this is for storing the further query messages of the user after intial web is made by llm
    

    async function init(){
        const response=await axios.post(`${BACKEND_URL}/template`,{
            prompt:prompt.trim()
        });
        setTemplateSet(true);
        const {prompts,uiPrompts}=response.data;
        // parse the xml we got from uiprompts(be) then add it to the steps 
        setSteps( parseXml(uiPrompts[0]).map((x) =>({
            ...x,
            status:'pending'
        }) ))

        setLoading(true);

        // prompts=2 system prompts that came from backend->
        // telling llm the files that are already present+use's prompt
        const stepsResponse=await axios.post(`${BACKEND_URL}/chat`,{
            messages:[...prompts,prompt].map(content=>({
                role:'user',
                content
            }))
        })

        setLoading(false);
        // set the steps we got from llm 
        setSteps(s=>[...s,...parseXml(stepsResponse.data.response).map(x=>({
            ...x,
            status:'pending'
        }))])

        // store the chat history
        setLlmMessages([...prompts,prompt].map(content=>({
            role:'user',
            content
        })))

        setLlmMessages(x=>[...x,{
            role:'assistant',
            content:stepsResponse.data.response
        }])
    }


    useEffect(()=>{
        init()
    },[])

    return(
        <div className="min-h-screen bg-gray-900 flex flex-col">
            <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
                <h1 className="text-xl font-semibold text-gray-100">
                    Buildly-the website builder
                </h1>
                <p className="text-sm text-gray-400 mt-1">Prompt: {prompt}</p>
            </header>

        <div className="flex-1 overflow-hidden">
            <div className="h-full grid grid-cols-4 gap-6 p-6">
                <div className="col-span-1 space-y-6 overflow-auto">
                    <div>
                        <div className="max-h-[75vh] overflow-scroll">
                            <StepsList
                            steps={steps}
                            currentStep={currentStep}
                            setCurrentStep={setCurrentStep}
                            ></StepsList>
                        </div>
                        <div>
                            <div className="flex">
                                <br />
                                {/* now showing the input box for further prompts  */}
                            {(loading || !templateSet) && <Loader></Loader>}
                            {/* if not loading or we already got initial template then show the query box */}
                            {!(loading || !templateSet) &&<div className="flex">
                            <textarea value={userPrompt}
                            onChange={(e)=>{
                                setUserPrompt(e.target.value)
                            }}
                            className="p-2 w-full"
                            >
                            </textarea>
                            <button 
                            // send to the llm
                            onClick={async()=>{
                            const newMessage={
                                role:'user',
                                content:userPrompt
                            } 
                            setLoading(true)

                            // provide the llm the history of chat+user prompt
                            const stepsResponse=await axios.post(`${BACKEND_URL}/chat`,{
                                messages:[...llmMessages,newMessage]
                            })
                            setLoading(false)

                            setLlmMessages(x=>[...x,newMessage]);

                            setLlmMessages(x=>[...x,{
                                role:'assistant',
                                content:stepsResponse.data.response
                            }]);

                            setSteps(s=>[...s,...parseXml(stepsResponse.data.response).map(x=>({
                                ...x,
                            status:'pending'
                            }))])

                            }}
                            className="bg-purple-400 px-4"
                            >
                                Send
                            </button>
                            
                            
                            </div>}

                            </div>
                        </div>
                    </div>

                </div>
                <div className="col-span-1">
                    <FileExplorer
                        files={files}
                        setSelectedFile={setSelectedFile}
                    >
                    </FileExplorer>
                </div>
                <div className="col-span-2 bg-gray-900 rounded-lg shadow-lg p-4 h-[calc(100vh-8rem)]">
                    <TabView
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    >
                    </TabView>
                    <div className="h-[calc(100%-4rem)]">
                    {
                        activeTab==='code'
                        ?(<CodeEditor
                            file={selectedFile}
                        ></CodeEditor>)
                        :(
                           <PreviewFrame>
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