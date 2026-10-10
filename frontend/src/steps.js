

/*
parse input xml came from llm/be and convert it into steps.
eg-> input-
<boltArtifact id="project-import" title="project files">
    <boltAction type="file" filePath="eslint.config.js">
        import js from '@eslint/js';
        import globals from 'globals';
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
    type:"steptype.createfile"
    code:"import js from '@eslint/js';\nimport globals from 'globals';\n"

},{
    title:"run command",
    code:'node index.js"
    type:steptype.runscript
}]
input can have strings in middle so use regex
*/

export function parseXml(response){

    const xmlMatch=response.match(/<boltArtifact[^>]*>([\s\S]*?)<\/boltArtifact>/);

    if(!xmlMatch){
        return [];
    }
    const xmlContent=xmlMatch[1];
    const steps=[];
    let stepId=1;
    

}