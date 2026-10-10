import { useEffect, useState } from "react";
import {WebContainer} from "@webcontainer/api"

// so that we can use this container in a component like= const webContainer = useWebContainer();
export function useWebContainer(){
    const [webContainer,setWebContainer]=useState();

    async function main(){
        const webContainerInstance=await WebContainer.boot();
        setWebContainer(webContainerInstance);
    }

    useEffect(()=>{
        main();
    },[])

    return webContainer;
}