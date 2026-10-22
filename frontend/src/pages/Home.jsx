import { useState } from "react"
import {useNavigate} from "react-router-dom"
import {
  Wand2, Code2, Eye, MessageSquare, ListChecks, FolderTree,
  Server, Zap, Terminal, Check, Sparkles
} from 'lucide-react'

// ---------- static content (only used for display) ----------
const features=[
  {
    icon:Sparkles,
    title:"Prompt to website",
    text:"Write what you want in plain words. Buildly plans the files and writes a working React + Tailwind website for you.",
    big:true
  },
  {
    icon:Server,
    title:"Node + Express backends",
    text:"Need an API or a small server instead? Ask for it and get clean Node.js code.",
  },
  {
    icon:ListChecks,
    title:"Step-by-step build",
    text:"Watch every file get created as a step, so you always know what changed.",
  },
  {
    icon:FolderTree,
    title:"File explorer",
    text:"Browse the full project in folders, just like in your own editor.",
  },
  {
    icon:Code2,
    title:"Code editor",
    text:"Click any file to read the code that was generated for it.",
  },
  {
    icon:Eye,
    title:"Live preview",
    text:"Your project installs and runs right inside the browser, so you see the real website, not a screenshot.",
    big:true
  },
  {
    icon:MessageSquare,
    title:"Edit by chatting",
    text:"Ask for changes after the first build. The conversation is remembered, so each request builds on the last one.",
  },
  {
    icon:Zap,
    title:"Nothing to install",
    text:"No setup, no terminal, no config. Open the page and start building.",
  },
]

const howItWorks=[
  {title:"Describe it", text:"Type the website you have in mind. A few lines are enough."},
  {title:"Watch it build", text:"Files appear one by one while the live preview spins up."},
  {title:"Refine it", text:"Ask for tweaks in the chat box until it looks right."},
]

export function Home(){
    const [prompt,setPrompt]=useState("");
    const navigate=useNavigate();

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(prompt.trim()){
            navigate('/builder',{
                state:{prompt}
            })
        }
    }
    return(
    <div className="relative min-h-screen overflow-hidden bg-[#070a12] text-slate-100 flex flex-col">

      {/* ---------- background decoration (pure style, no logic) ---------- */}
      {/* faint grid that fades out towards the edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[60rem] bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]"
      />
      {/* soft glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-10rem] h-[32rem] w-[52rem] max-w-full -translate-x-1/2 rounded-full bg-indigo-600/25 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10rem] top-[48rem] h-[28rem] w-[28rem] rounded-full bg-sky-500/10 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-10rem] top-[95rem] h-[28rem] w-[28rem] rounded-full bg-indigo-500/10 blur-[120px]"
      />

      {/* ---------- top bar ---------- */}
      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center px-6 py-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-sky-400 shadow-lg shadow-indigo-500/30">
            <Wand2 className="h-4 w-4 text-white" />
          </div>
          <span className="text-base font-semibold tracking-tight text-slate-100">Buildly</span>
        </div>
      </header>

      {/* ---------- hero: heading + composer ---------- */}
      <main className="relative z-10 flex flex-col items-center px-4 pb-8 pt-10 sm:pt-16">
        <div className="w-full max-w-2xl">

          <div className="mb-10 text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-6xl sm:leading-[1.05]">
              Website Builder AI
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
              Describe your dream website, and we'll help you build it step by step
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* gradient hairline border around the composer */}
            <div className="rounded-2xl bg-gradient-to-b from-white/25 via-white/10 to-white/5 p-px shadow-2xl shadow-indigo-950/60 transition-shadow focus-within:from-indigo-400/70 focus-within:via-indigo-500/30 focus-within:to-sky-400/30 focus-within:shadow-indigo-600/20">
              <div className="rounded-[15px] bg-[#0c111c] p-3">
                <textarea
                    value={prompt}
                    onChange={(e)=>setPrompt(e.target.value)}
                    placeholder="Describe the website you want to build... "
                    aria-label="Describe the website you want to build"
                    className="h-36 w-full resize-none rounded-xl bg-transparent p-3 text-base leading-relaxed text-slate-100 placeholder-slate-500 outline-none"
                >
                </textarea>

                <button type="submit"
                    className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 px-6 py-3 font-medium text-white shadow-lg shadow-indigo-600/30 transition hover:from-indigo-400 hover:to-blue-400 hover:shadow-indigo-500/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c111c] active:scale-[0.99]"
                >
                    <Wand2 className="h-4 w-4" />
                    Generate website
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* ---------- product preview: a static picture of the builder ---------- */}
        <div className="mt-20 w-full max-w-5xl">
          <div className="rounded-2xl bg-gradient-to-b from-white/20 to-white/0 p-px shadow-2xl shadow-indigo-950/70">
            <div className="overflow-hidden rounded-[15px] bg-[#0a0e18]">

              {/* window bar */}
              <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-white/15" />
                <span className="h-3 w-3 rounded-full bg-white/15" />
                <span className="h-3 w-3 rounded-full bg-white/15" />
                <span className="ml-3 truncate text-xs text-slate-500">Buildly: portfolio website</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[14rem_12rem_1fr]">
                {/* steps */}
                <div className="border-b border-white/10 p-4 md:border-b-0 md:border-r">
                  <p className="mb-3 text-xs font-medium text-slate-500">Build steps</p>
                  <ul className="space-y-2.5 text-sm">
                    {["Project Files","create package.json","create src/App.jsx","create src/Hero.jsx","run command"].map((s)=>(
                      <li key={s} className="flex items-center gap-2 text-slate-300">
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-400/15">
                          <Check className="h-3 w-3 text-emerald-300" />
                        </span>
                        <span className="truncate">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* file tree */}
                <div className="hidden border-r border-white/10 p-4 md:block">
                  <p className="mb-3 text-xs font-medium text-slate-500">Files</p>
                  <ul className="space-y-2 font-mono text-[13px] text-slate-400">
                    <li>package.json</li>
                    <li>index.html</li>
                    <li>src</li>
                    <li className="pl-4 text-indigo-300">App.jsx</li>
                    <li className="pl-4">Hero.jsx</li>
                    <li className="pl-4">main.jsx</li>
                  </ul>
                </div>

                {/* code */}
                <div className="p-4">
                  <p className="mb-3 text-xs font-medium text-slate-500">src/App.jsx</p>
                  <pre className="overflow-x-auto font-mono text-[13px] leading-6 text-slate-400"><code>
<span className="text-indigo-300">function</span> <span className="text-sky-300">App</span>() {"{"}
{"\n  "}<span className="text-indigo-300">return</span> (
{"\n    "}&lt;<span className="text-sky-300">div</span> <span className="text-slate-300">className</span>=<span className="text-emerald-300">"min-h-screen bg-gray-950"</span>&gt;
{"\n      "}&lt;<span className="text-sky-300">Hero</span> /&gt;
{"\n    "}&lt;/<span className="text-sky-300">div</span>&gt;
{"\n  "})
{"\n"}{"}"}
                  </code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ---------- how it works ---------- */}
      <section className="relative z-10 mx-auto w-full max-w-5xl px-6 pt-28">
        <div className="max-w-xl">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            From idea to running site in three moves
          </h2>
          <p className="mt-4 text-slate-400">
            You never leave the page. Describe, watch, and adjust.
          </p>
        </div>

        <ol className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {howItWorks.map((s,i)=>(
            <li key={s.title} className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <span className="text-5xl font-semibold tracking-tight text-white/10">{i+1}</span>
              <h3 className="mt-4 text-lg font-medium text-slate-100">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------- features ---------- */}
      <section className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-8 pt-28">
        <div className="max-w-xl">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Everything you need to build in one place
          </h2>
          <p className="mt-4 text-slate-400">
            A full workspace in your browser: plan, code, preview and refine.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {features.map(({icon:Icon,title,text,big})=>(
            <div
              key={title}
              className={`rounded-2xl border border-white/10 p-6 ${
                big
                  ? "md:col-span-2 bg-gradient-to-br from-indigo-500/15 via-white/[0.03] to-sky-400/10"
                  : "bg-white/[0.03]"
              }`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-indigo-500/30 to-sky-400/20">
                <Icon className="h-5 w-5 text-indigo-200" />
              </div>
              <h3 className="mt-5 text-lg font-medium text-slate-100">{title}</h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-400">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- stack strip ---------- */}
      <section className="relative z-10 mx-auto w-full max-w-5xl px-6 pt-20">
        <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3 text-slate-300">
            <Terminal className="h-5 w-5 text-indigo-300" />
            <span className="text-sm">Built on the tools you already know</span>
          </div>
          <ul className="flex flex-wrap gap-2 text-sm text-slate-300">
            {["React","Tailwind CSS","Vite","Node.js","Express","Lucide icons"].map((t)=>(
              <li key={t} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1">{t}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- footer ---------- */}
      <footer className="relative z-10 mx-auto mt-24 w-full max-w-5xl border-t border-white/10 px-6 py-8">
        <div className="flex items-center gap-2.5 text-sm text-slate-500">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-sky-400">
            <Wand2 className="h-3 w-3 text-white" />
          </div>
          Buildly, the website builder
        </div>
      </footer>
    </div>
    )
}
export default Home//













// old code ------------------------------------------->>>>>
// import { useState } from "react"
// import {useNavigate} from "react-router-dom"
// import {Wand2} from 'lucide-react'

// export function Home(){
//     const [prompt,setPrompt]=useState("");
//     const navigate=useNavigate();

//     const handleSubmit=(e)=>{
//         e.preventDefault();
//         if(prompt.trim()){
//             navigate('/builder',{
//                 state:{prompt}
//             })
//         }
//     }
//     return(
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
//       <div className="max-w-2xl w-full">
//         <div className="text-center mb-8">
//           <div className="flex justify-center mb-4">
//             <Wand2 className="w-12 h-12 text-blue-400" />
//           </div>
//           <h1 className="text-4xl font-bold text-gray-100 mb-4">
//             Website Builder AI
//           </h1>
//           <p className="text-lg text-gray-300">
//             Describe your dream website, and we'll help you build it step by step
//           </p>
//         </div>
//         <form onSubmit={handleSubmit} className="space-y-4">
//             <textarea
//                 value={prompt}
//                 onChange={(e)=>setPrompt(e.target.value)}
//                 placeholder="Describe the website you want to build... "
//                 className="w-full h-32 p-4  bg-gray-900 text-gray-100 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none placeholder-gray-500"
//             >
//             </textarea>
//             <button type="submit"
//                 className="w-full mt-4 bg-blue-600 text-gray-100 py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
//             >
//                 Generate website 
//             </button>
//         </form>
//         </div>
//         </div>
//     )
// }
// export default Home