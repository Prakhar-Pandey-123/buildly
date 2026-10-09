import { CheckCircle, Circle, Clock } from "lucide-react";


// to show the list of all the steps and along with if its done/in-progress/completed

export function StepsList({steps,currentStep,setCurrentStep}){
  return(
    <div className="bg-gray-900 rounded-lg shadow-lg p-4 h-full overflow-auto">
      <h2 className="text-lg font-semibold mb-4 text-gray-100">
        Build Steps
      </h2>
      <div className="space-y-4">
        {
          steps.map((step)=>(
            <div
              key={step.id}
              className={`p-1 rounded-lg cursor-pointer transition-colors ${
                currentStep===step.id
                ? 'bg-gray-800 border border-gray-700'
                : 'hover:bg-gray-800'
              }`}
              onClick={()=>setCurrentStep(step.id)}// onstepclick is a usestate fn that sets the current step to the step.id
            >

              <div className="flex items-center grap-2">
                {
                  step.status==='completed'
                  ?(
                    <CheckCircle className="w-5 h-5 text-green-500">
                    </CheckCircle>
                  ):(
                    step.status==='in-progress'
                  ?(<Clock className="w-5 h-5 text-blue-499"></Clock>)
                  :(<Circle className="w-5 h-5 text-gray-600"></Circle>)
                )}
                <h3 className="font-medium text-gray-100">{step.title}</h3>
              </div>
              <p className="text-sm text-gray-400 mt-2">{step.description}</p>
            </div>
          ))
        }

      </div>

    </div>
  )
}