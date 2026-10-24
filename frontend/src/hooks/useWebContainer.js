import { useEffect, useState } from "react";
import { WebContainer } from "@webcontainer/api";

// outside React, so it survives Builder unmounting and remounting
let bootPromise = null;

function getWebContainer() {
    if (!bootPromise) {
        bootPromise = WebContainer.boot().catch((err) => {
            bootPromise = null;
            throw err;
        });
    }
    return bootPromise;
}

export function useWebContainer() {
    const [webContainer, setWebContainer] = useState();

    useEffect(() => {
        let cancelled = false;

        (async () => {
            try {
                const instance = await getWebContainer();

                // remove files left over from the previous website
                const entries = await instance.fs.readdir("/");
                await Promise.all(
                    entries.map((name) =>
                        instance.fs.rm(`/${name}`, { recursive: true, force: true })
                    )
                );

                if (!cancelled) setWebContainer(instance);
            } catch (err) {
                console.error("WebContainer setup failed:", err);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, []);

    return webContainer;
}
// import { useEffect, useState } from "react";
// import {WebContainer} from "@webcontainer/api"

// // so that we can use this container in a component like= const webContainer = useWebContainer();
// export function useWebContainer(){
//     const [webContainer,setWebContainer]=useState();

//     async function main(){
//         const webContainerInstance=await WebContainer.boot();
//         setWebContainer(webContainerInstance);
//     }

//     useEffect(()=>{
//         main();
//     },[])

//     return webContainer;
// }