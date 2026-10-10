# Buildly 🚀

**Buildly is an AI-powered app builder that turns natural-language prompts into working web applications.**

Describe the application you want to build, and Buildly uses AI to generate project files, apply changes, install dependencies, and run the application directly in your browser.

Instead of manually setting up a project and writing every file from scratch, you can start with a prompt and iteratively improve the generated application through follow-up instructions.

## ✨ Features

- **Prompt-to-App Generation:** Describe your idea in plain English and generate a web application.
- **AI-Powered Code Generation:** Generate project files and code based on your requirements.
- **File Explorer:** Browse the generated project's file and folder structure.
- **Code Viewer:** Inspect the generated source code.
- **Iterative Editing:** Send follow-up prompts to modify existing files and improve your application.
- **Browser-Based Runtime:** Run applications inside a browser-based development environment using WebContainers.
- **Dependency Installation:** Install compatible npm packages required by the generated project.
- **Live Preview:** View the running application and see your changes in action.

## 🛠️ Tech Stack

**Frontend**
- React.js
- JavaScript / JSX
- Tailwind CSS
- Axios

**Backend**
- Node.js
- Express.js
- Gemini API for AI-powered generation

**Runtime & Tooling**
- WebContainers API
- npm
- Vite

## 🏗️ How It Works

1. **Enter a prompt:** Describe the application you want to build.
2. **Generate a project plan:** The backend uses AI to interpret your requirements and determine the initial project structure.
3. **Generate code:** The AI produces file contents and development actions.
4. **Apply changes:** Buildly processes the generated actions and updates the project's files.
5. **Run the application:** The files are mounted into a WebContainer, where dependencies can be installed and the development server started.
6. **Preview and iterate:** Inspect the generated code, view the running application, and submit additional prompts to make changes.

## 📁 Project Structure

The project is organized into a frontend and backend:

```text
Buildly/
├── backend/
│   ├── src/
│   │   └── index.js
│   └── .env
│
└── frontend/
    └── src/
        ├── components/
        ├── hooks/
        ├── App.jsx
        └── ...
```

*The structure above is illustrative; actual filenames and folders may differ as the project evolves.*

## ⚙️ Getting Started

### Prerequisites

- Node.js and npm
- A Gemini API key
- A modern browser that supports WebContainers

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd Buildly
```

### 2. Configure the backend

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file and configure the required environment variables:

```env
GEMINI_API_KEY=your_gemini_api_key
PORT=3000
```

Use the actual environment variable names expected by your backend implementation.

Start the backend using the script configured in your `package.json`, for example:

```bash
npm run dev
```

### 3. Configure the frontend

Open a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

Configure the frontend's backend URL to point to your running backend server.

### 4. Start building

Open the frontend in your browser, enter a prompt describing your application, and let Buildly generate your starting project.

> Note: The exact commands, environment variables, and configuration depend on the current implementation. WebContainer support also depends on browser compatibility and the environment in which the application is hosted.

## 🔐 Environment Variables

Keep API keys and other secrets in environment variables. Never commit your actual API keys or `.env` files to GitHub.

Add appropriate entries to `.gitignore`, such as:

```gitignore
node_modules/
.env
.env.*
!.env.example
dist/
```

If you need to share the required configuration, provide an `.env.example` containing placeholder values only.

## 🎯 Project Goal

Buildly explores how AI can simplify the software development workflow by combining natural-language instructions, code generation, file management, and an in-browser development environment.

The goal is to make building and iterating on web applications faster and more accessible, while allowing developers to inspect and modify the generated code instead of treating the application as a black box.

## 🚧 Future Improvements

- Structured AI responses with JSON Schema and Zod validation
- More reliable file updates and error recovery
- Persistent projects across page refreshes
- Improved dependency and command handling
- Better handling of build errors and AI-generated fixes
- Project export and Git integration

## 📄 License

Choose and add a license before distributing the project for reuse.
