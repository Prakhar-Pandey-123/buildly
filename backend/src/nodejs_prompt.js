// we needs a structured way to tell the frontend(container) what files to create.
// Then your container can parse this structure.
// Node setup= index.js, package.json
export const nodeBasePrompt = `
  <boltArtifact
    id="project-import"
    title="Project Files"
  >

    <boltAction
      type="file"
      filePath="index.js"
    >
      // run \`node index.js\` in the terminal

      console.log(\`Hello Node.js v\${process.versions.node}!\`);
    </boltAction>

    <boltAction
      type="file"
      filePath="package.json"
    >
          {
      "name": "node-starter",
      "private": true,
      "type": "module",
      "scripts": {
        "dev": "node index.js",
        "start": "node index.js"
      },
      "dependencies": {
        "express": "^4.19.2",
        "cors": "^2.8.5"
      }
    }
    </boltAction>

  </boltArtifact>
`;
// LLM / Backend
//      ↓
// Structured XML-like response
//      ↓
// <boltArtifact>
//    <boltAction type="file" filePath="index.js">
//       code...
//    </boltAction>

//    <boltAction type="file" filePath="package.json">
//       ...
//    </boltAction>
// </boltArtifact>
//      ↓
// Frontend parser
//      ↓
// Understand each action
//      ↓
// WebContainer
//      ↓
// Create/write actual files
//      ↓
// Run commands