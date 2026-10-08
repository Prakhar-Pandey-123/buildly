import {useLocation} from "react-router-dom";
import {useState} from "react"

export function Builder(){
    
    const location=useLocation();
    const {prompt}=location.state;
//cause we did this -> navigate("/builder", {
//   state: {
//     prompt: "Build me a todo app"
//   }
// });

    return(
        <div className="">

        </div>
    )
}