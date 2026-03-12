import { renderHtml } from "../renderHtml"

export function plannerPage(){

const content = `

<h2>Create Job</h2>

<input placeholder="Job title">

<button>Create</button>

`

return renderHtml("Planner Dashboard", content)

}
