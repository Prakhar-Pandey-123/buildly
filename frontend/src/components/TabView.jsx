import React from "react"
import { Code2,Eye } from "lucide-react"

// to show the 2 tabs(buttons) and change the active tab on clicks
export function TabView({activeTab,setActiveTab}){
    return(
        <div className="flex space-x-2 mb-4">
            <button
                onClick={()=>{
                    setActiveTab('code')
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                    activeTab==='code'
                    ?'bg-gray-700 text-gray-100'
                    :'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
                }`}
            >
                <Code2 className="w-4 h-4"></Code2>
                Code
            </button>

            <button
                onClick={()=>{
                    setActiveTab('preview')
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                    activeTab==='preview'
                    ? 'bg-gray-700 text-gray-100'
                    :'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
                }`}
            >
                <Eye className="w-4 h-4"></Eye>
                Preview
            </button>
        </div>
    )
}