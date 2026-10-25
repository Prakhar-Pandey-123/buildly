export const reactBasePrompt = `
<boltArtifact
  id="project-import"
  title="Project Files"
>
  <boltAction
    type="file"
    filePath="index.html"
  >
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#ffffff" />
    <title>React App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
  </boltAction>

  <boltAction
    type="file"
    filePath="package.json"
  >
{
  "name": "react-javascript-starter",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "lucide-react": "^0.344.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.18",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "vite": "^5.4.2"
  }
}
  </boltAction>

  <boltAction
    type="file"
    filePath="postcss.config.js"
  >
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
  </boltAction>

  <boltAction
    type="file"
    filePath="tailwind.config.js"
  >
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
  </boltAction>

  <boltAction
    type="file"
    filePath="vite.config.js"
  >
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
  </boltAction>

  <boltAction
    type="file"
    filePath="src/App.jsx"
  >
function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <p className="text-lg text-gray-800">
        Start prompting (or editing) to see magic happen :)
      </p>
    </div>
  );
}

export default App;
  </boltAction>

  <boltAction
    type="file"
    filePath="src/index.css"
  >
@tailwind base;
@tailwind components;
@tailwind utilities;

html,
body,
#root {
  min-height: 100%;
}

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}
  </boltAction>

  <boltAction
    type="file"
    filePath="src/main.jsx"
  >
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
  </boltAction>
</boltArtifact>
`;