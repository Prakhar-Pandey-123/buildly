

/*
eg-> input- either a file(wrapped in a folder structure like src/app.jsx) or a shell command

// the llm will tell only the files that we need to create not the folder , folder comes in format of a path eg - src/app.js and in useeffect in builder page we are getting all the 'create file' and creating a folder for every sub path eg src and then create a file app.jsx at last 

// rn the useeffect of builder page ,do not entertains the shell commands but is done when llm updates the package.json and then when user clicks on preview tab then web container runs npm install and then npm run dev hence its totally works

<boltArtifact id="project-import" title="react project">

    <boltAction type="file" filePath="src/App.jsx">
    console.log("Hello");
  </boltAction>

    <boltAction type="shell">
        node index.js
    </boltAction>
</bolArtifact>


output-
[{
    title:"project files",
    status:"pending"
},{
    title:"create eslint.config.js",
    type:createfile
    code:"import js from '@eslint/js';\nimport globals from 'globals';\n"

},{
    title:"run command",
    code:'node index.js"
    type:runscript
}]
input can have strings in middle so use regex
*/


//take output of the llm and parses into steps that will be displayed in stepslist 
export function parseXml(response){
    const xmlMatch= response.match(/<boltArtifact[^>]*>([\s\S]*?)<\/boltArtifact>/);
    // this will get the <boltartifact>.....</boltartifact>
    
    if(!xmlMatch){
        return [];
    }
    // index-0 has full content +boltartifact tags
    // index-1 has only inside content of artifact
    const xmlContent=xmlMatch[1];
    const steps=[];//contains final ans
    let stepId=1;//to give unique id to each

    const titleMatch=response.match(/title="([^"]*)"/);//get title of artifact
    const artifactTitle=titleMatch?titleMatch[1]:'Project Files'

// push the base folder that is shown by boltartifact eg- react folder/nodejs folder/project files folder
    steps.push({
        id:stepId++,
        title:artifactTitle,
        description:'',
        type:'CreateFolder',
        status:'pending'
    })

    // regex to get boltaction elements
    const actionRegex= /<boltAction\s+type="([^"]*)"(?:\s+filePath="([^"]*)")?>([\s\S]*?)<\/boltAction>/g;
    
    let match;
    while((match=actionRegex.exec(xmlContent)) !== null ){
        const [,type,filePath,content]=match;
        if(type==='file'){
            // if its a file creation
            steps.push({
                id:stepId++,
                title:`create ${filePath}||'file'`,
                description:'',
                type:'CreateFile',
                status:'pending',
                code:content.trim(),
                path:filePath
            })
        }
        else if(type==='shell'){
            steps.push({
                id:stepId++,
                title:'run command',
                description:'',
                type:RunScript,
                status:'pending',
                code:content.trim()
            })
        }
    }
    return steps
}