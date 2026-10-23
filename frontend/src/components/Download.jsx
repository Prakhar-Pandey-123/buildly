
import { useState } from "react";
import JSZip from "jszip"
import toast from "react-hot-toast"
import { Download as DownloadIcon } from "lucide-react";


export function Download({files}){

    const [isDownloading,setIsDownloading]=useState(false);

    async function downloadProject() {
        if(!files|| files.length===0){
            toast.error("No project files available to download");
            return;
        }
        //files are being downloaded and user again clicked download so do return 
        if(isDownloading) return;
        setIsDownloading(true);
        const toastId=toast.loading("Preparing your project ZIP...");
        
        let url;
        try{
            const zip=new JSZip();
            function addFiles(items,zip){
                items.forEach((item)=>{
                    if(item.type==="folder"){
                        //if its a folder then move inside that folder, recursively and add a folder in the zip
                        const subFolder=zip.folder(item.name);
                        addFiles(item.children||[],subFolder);
                    }
                    else if(item.type==="file"){
                        // its a file=add that file into zip 
                        zip.file(item.name,item.content??"");
                    }
                })    
            }
            addFiles(files,zip);
            const blob=await zip.generateAsync({
                type:"blob",
                compression:"DEFLATE",
                compressionOptions:{level:6}
            })
            url=URL.createObjectURL(blob);

            const link=document.createElement("a");
            link.href=url;
            link.download="buidly-project.zip";
            document.body.appendChild(link);
            link.click();
            link.remove();
            toast.success("Project ZIP downloaded successfully",{
                id:toastId
            })
        } 
        catch(e){
            console.log("project download failed",e);
            toast.error("Failed to create project ZIP",{
                id:toastId
            })
        }
        finally{
            setIsDownloading(false);
        }
    }

    return(
        <button
            onClick={downloadProject}
            disabled={isDownloading}
            className="flex shrink-0 items-center gap-2 rounded-xl
                bg-gradient-to-r from-indigo-500 to-blue-500
                px-4 py-2 text-sm font-medium text-white
                shadow-lg shadow-indigo-600/20 transition
                hover:from-indigo-400 hover:to-blue-400
                disabled:cursor-wait disabled:opacity-60"
        >
            <DownloadIcon
                size={16}
            >
            </DownloadIcon>
            
            {isDownloading?"Preparing ZIP...":"Download ZIP"}
        </button>
    )
}