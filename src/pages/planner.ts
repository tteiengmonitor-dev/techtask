export function plannerPage(){

return `

<h2>Create Task</h2>

<div class="card">

<div>
Job ID<br>
<input id="job_id" style="width:100%">
</div>

<br>

<div>
Task Detail<br>
<textarea id="detail" style="width:100%"></textarea>
</div>

<br>

<div>
Task Date<br>
<input id="task_date" type="date">
</div>

<br>

<div style="display:flex;gap:20px">

<div>
Start Time<br>
<input id="start_time" type="time">
</div>

<div>
Finish Time<br>
<input id="finish_time" type="time">
</div>

</div>

<br>

<h3>Assign Technician</h3>

<div id="techList">
Loading technicians...
</div>

<br>

<button onclick="createTask()">Create Task</button>

</div>

<script>

const GAS_URL = "https://script.google.com/macros/s/AKfycbzIUzPRTYpMJTOkBnG8AhiwBcaTAyjowSFiFfmxv-dQKhzJKn8HyyOqHhfs7ZDFnBWDDQ/exec"

document.getElementById("task_date").value =
new Date().toISOString().slice(0,10)


async function loadTechnicians(){

const res = await fetch("/api/technicians")

const data = await res.json()

const list = document.getElementById("techList")

list.innerHTML = data.map(t => \`

<label>
<input type="checkbox" value="\${t.emp_id}">
\${t.emp_id} \${t.name}
</label><br>

\`).join("")

}

async function createTask(){

const technicians = [...document.querySelectorAll("#techList input:checked")]
.map(e=>e.value)

const data = {

job_id: document.getElementById("job_id").value,
detail: document.getElementById("detail").value,
task_date: document.getElementById("task_date").value,
start_time_plan: document.getElementById("start_time").value,
finish_time_plan: document.getElementById("finish_time").value,
technicians: technicians

}

const res = await fetch("/api/task/create",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(data)
})

const result = await res.json()

alert("Task created: " + result.task_id)

}

loadTechnicians()

</script>

`

}
