import { renderHtml } from "../renderHtml"

export function technicianPage(){

const content = `

<h2>Technician Tasks</h2>

<div class="card">
Example task
<button>Start</button>
</div>

`

return renderHtml("Technician Panel", content)

}
