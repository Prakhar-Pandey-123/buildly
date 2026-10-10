import { ChevronDown, ChevronRight, FolderTree,File } from "lucide-react";
import { useState } from "react";

//       [selectedFile, setSelectedFile] 

//  recursively show all the folders if it is clicked then show all its files too
function FileNode({item,depth,setSelectedFile}){
    const [isExpanded,setIsExpanded]=useState(false);//intially all folders are not expanded hence dont show files 
    const handleClick=()=>{//a folder/file is clicked
        if(item.type==='folder'){
            setIsExpanded(!isExpanded);//show all its files
        }
        else{//set the file as [selectedfile , setSelectedFile] 
            setSelectedFile(item);
        }
    }
    return(
        <div className="select-none">
{/* Text selection is when you highlight text using your mouse */}
            <div className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded-md cursor-pointer"
            style={{ paddingLeft: `${depth * 1.5}rem` }}
            onClick={handleClick}>
            {
               item.type==='folder'&&(
                <span className="text-gray-400">{isExpanded
                ?(<ChevronDown className="w-4 h-4"></ChevronDown>
                ):(<ChevronRight className="w-4 h-4"></ChevronRight>)}
                </span>
               )}

               {
                item.type==='folder'
                ?(<FolderTree className="w-4 h-4 text-blue-400"></FolderTree>)
                :(<File className="w-4 h-4 text-gray-400"></File>)
               }
               </div>
               {//if the folder is expanded then show its files
                item.type==='folder' && isExpanded && item.children &&(
                    <div>
                        {
                            item.children.map((child,index)=>(
                                <FileNode 
                                    key={`${child.path}-${index}`}
                                    item={child}
                                    setSelectedFile={setSelectedFile}
                                >
                                </FileNode>
                            ))
                        }
                    </div>
                )
               }
        </div>
    )

}


// to show the list of all created files/folders 
// setselectedfile=bcoz code editor need to show that file 
export function FileExplorer({files,setSelectedFile}){
    // onfileselect is usestate fn called [selectedfile , setSelectedFile] 
    <div className="bg-gray-900 rounded-lg shadow-lg p-4 h-full overflow-auto">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-100">
            <FolderTree className="w-5 h-5"></FolderTree>
            File Explorer
        </h2>
        <div className="space-y-1">
            {
                files.map((file,index)=>{
                    return(
                        <FileNode
                        key={`${file.path}-${index}`}
                        item={file}
                        depth={0}
                        setSelectedFile={setSelectedFile}
                        >
                        </FileNode>
                    )
                })
            }
        </div>
    </div>
}