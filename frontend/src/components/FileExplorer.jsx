import { FolderTree, File, ChevronRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';



function FileNode({item,depth,onFileClick}){
    const [isExpanded,setIsExpanded]=useState(false);

    const handleClick=()=>{
        if(item.type==="folder"){
            setIsExpanded(!isExpanded)
        }
        else{
            onFileClick(item)
        }
    }
    return(
        <div className='slect-none'>
            <div>
                
            </div>

        </div>
    )
};


/*
    fileitem = name,
    type:file|folder,
    children:fileitem,
    content,
    path
*/
// here files is of the type fileitem and onfileselect is a fn
export function FileExplorer({files,onFileSelect}){
    return(
        <div className="bg-gray-900 rounded-lg shadow-lg p-4 h-full overflow-auto">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-100">
                <FolderTree className="w-5 h-5" />
                File Explorer
            </h2>
            <div className="space-y-1">
                {
                    files.map((file,index)=>(
                        <FileNode
                            key={`${file.path}-${index}`}
                            item={file}
                            depth={0}
                            onFileClick={onFileSelect}
                        >
                        </FileNode>
                    ))
                }
            </div>
        </div>
    )
}