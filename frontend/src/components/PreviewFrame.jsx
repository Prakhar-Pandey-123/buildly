import { useEffect, useState } from "react";

export function PreviewFrame({ webContainer }) {
    const [url, setUrl] = useState("");

    useEffect(() => {
        if (!webContainer) return;

        let devProcess;
        let cancelled = false;

        // listen first, so we never miss the event
        const unsubscribe = webContainer.on("server-ready", (port, serverUrl) => {
            console.log("[Preview] server ready:", port, serverUrl);
            if (!cancelled) setUrl(serverUrl);
        });

        (async () => {
            try {
                const installProcess = await webContainer.spawn("npm", ["install"]);
                installProcess.output
                    .pipeTo(new WritableStream({ write(d) { console.log("[npm install]", d); } }))
                    .catch(() => {});

                const code = await installProcess.exit;
                if (code !== 0) {
                    console.error("[Preview] npm install failed");
                    return;
                }
                if (cancelled) return;

                devProcess = await webContainer.spawn("npm", ["run", "dev"]);
                devProcess.output
                    .pipeTo(new WritableStream({ write(d) { console.log("[npm run dev]", d); } }))
                    .catch(() => {});
            } catch (err) {
                console.error("[Preview] startup failed:", err);
            }
        })();

        // cleanup: runs when you switch to the Code tab or leave the page
        return () => {
            cancelled = true;
            unsubscribe?.();
            devProcess?.kill();
        };
    }, [webContainer]);

    return (
        <div className="h-full flex items-center justify-center text-gray-400">
            {!url && <p className="mb-2">Loading...</p>}
            {url && (
                <iframe
                    title="Generated website preview"
                    width="100%"
                    height="100%"
                    src={url}
                />
            )}
        </div>
    );
}
// import { useEffect, useState } from "react";

// export function PreviewFrame({ files, webContainer }) {
//     const [url, setUrl] = useState("");

//     async function main() {
//         console.log("[Preview] main() started");
//         console.log("[Preview] webContainer:", webContainer);
//         console.log("[Preview] files:", files);

//         if (!webContainer) {
//             console.error("[Preview] WebContainer is undefined!");
//             return;
//         }

//         try {
//             console.log("[Preview] Starting npm install...");

//             const installProcess = await webContainer.spawn(
//                 "npm",
//                 ["install"]
//             );

//             console.log("[Preview] npm install process created");

//             installProcess.output.pipeTo(
//                 new WritableStream({
//                     write(data) {
//                         console.log("[npm install]", data);
//                     }
//                 })
//             ).catch(err => {
//                 console.error("[npm install] Output stream error:", err);
//             });

//             const installExitCode = await installProcess.exit;

//             console.log("[Preview] npm install exit code:", installExitCode);

//             if (installExitCode !== 0) {
//                 console.error("[Preview] npm install FAILED");
//                 return;
//             }

//             console.log("[Preview] Registering server-ready listener...");

//             webContainer.on("server-ready", (port, url) => {
//                 console.log("[Preview] Server is ready!");
//                 console.log("[Preview] Port:", port);
//                 console.log("[Preview] URL:", url);

//                 setUrl(url);
//             });

//             console.log("[Preview] Starting npm run dev...");

//             const devProcess = await webContainer.spawn(
//                 "npm",
//                 ["run", "dev"]
//             );

//             console.log("[Preview] Dev server process created");

//             devProcess.output.pipeTo(
//                 new WritableStream({
//                     write(data) {
//                         console.log("[npm run dev]", data);
//                     }
//                 })
//             ).catch(err => {
//                 console.error("[npm run dev] Output stream error:", err);
//             });

//             devProcess.exit.then(code => {
//                 console.log("[Preview] Dev server exited with code:", code);

//                 if (code !== 0) {
//                     console.error("[Preview] Dev server stopped unexpectedly");
//                 }
//             });

//         } catch (error) {
//             console.error("[Preview] Startup failed:", error);
//         }
//     }

//     useEffect(() => {
//         console.log("[Preview] useEffect triggered");
//         console.log("[Preview] WebContainer available:", !!webContainer);

//         if (webContainer) {
//             main();
//         }
//     }, [webContainer]);

//     return (
//         <div className="h-full flex items-center justify-center text-gray-400">
//             {!url && (
//                 <div className="text-center">
//                     <p className="mb-2">Loading...</p>
//                 </div>
//             )}

//             {url && (
//                 <iframe
//                     title="Generated website preview"
//                     width="100%"
//                     height="100%"
//                     src={url}
//                 />
//             )}
//         </div>
//     );
// }

// // import { useEffect, useState } from "react";


// // export function PreviewFrame({files,webContainer}){
// //     const [url,setUrl]=useState("");
    
// //     async function main(){
// //         const installProcess=await webContainer.spawn('npm',['install']);
// //         installProcess.output.pipeTo(new WritableStream({
// //             write(data){
// //                 console.log(data);
// //             }
// //         }))
// //         await webContainer.spawn('npm',['run','dev']);
// //         webContainer.on('server-ready',(port,url)=>{
// //             console.log("url=",url)
// //             console.log("port",port)
// //             setUrl(url);
// //         })
// //     }

// //     useEffect(()=>{
// //         main()
// //     },[]);

// //     return(
// //         <div className="h-full flex items-center justify-center text-gray-400">
// //             {/* if there is no url then show loading if here is url show website in an iframe */}
// //             {
// //                 !url && <div className="text-center">
// //                     <p className="mb-2">
// //                         Loading...
// //                     </p>
// //                 </div>
// //             }
// //             {
// //                 url && <iframe width={"100%"}
// //                     height={"100%"}
// //                     src={url}
// //                 ></iframe>
// //             }
// //         </div>
// //     )
// // }