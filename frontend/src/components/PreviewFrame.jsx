import { useEffect, useState } from "react";


export function PreviewFrame({files,webContainer}){
    const [url,setUrl]=useState("");
    
    async function main(){
        const installProcess=await webContainer.spawn('npm',['install']);
        installProcess.output.pipeTo(new WritableStream({
            write(data){
                console.log(data);
            }
        }))
        await webContainer.spawn('npm',['run','dev']);
        webContainer.on('server-ready',(port,url)=>{
            console.log("url=",url)
            console.log("port",port)
            setUrl(url);
        })
    }

    useEffect(()=>{
        main()
    },[]);

    return(
        <div className="h-full flex items-center justify-center text-gray-400">
            {/* if there is no url then show loading if here is url show website in an iframe */}
            {
                !url && <div className="text-center">
                    <p className="mb-2">
                        Loading...
                    </p>
                </div>
            }
            {
                url && <iframe width={"100%"}
                    height={"100%"}
                    src={url}
                ></iframe>
            }
        </div>
    )
}