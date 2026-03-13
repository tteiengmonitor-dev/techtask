export function technicianPage(){

return `

<h2>Technician Tasks</h2>

<div style="margin-bottom:15px">

<label>Select Date</label>
<input type="date" id="taskDate">

</div>

<div id="taskList">
Loading tasks...
</div>

<style>

.task-card{
display:flex;
justify-content:space-between;
border:1px solid #ddd;
padding:15px;
margin-bottom:12px;
border-radius:6px;
background:white;
}

.task-left{
max-width:70%;
}

.task-title{
font-weight:bold;
font-size:16px;
margin-bottom:5px;
}

.task-right{
display:flex;
flex-direction:column;
gap:6px;
}

.btn{
padding:6px 12px;
border:none;
border-radius:4px;
cursor:pointer;
}

.btn-start{
background:#2ecc71;
color:white;
}

.btn-stop{
background:#f1c40f;
color:black;
}

.btn-finish{
background:#3498db;
color:white;
}

.btn-disabled{
background:#aaa;
color:#666;
cursor:not-allowed;
}

</style>

<script>

document.getElementById("taskDate").value =
new Date().toISOString().slice(0,10)

document.getElementById("taskDate")
.addEventListener("change",loadTasks)

async function loadTasks(){

const date =
document.getElementById("taskDate").value

const res = await fetch("/api/mytasks?date="+date)

const data = await res.json()

const list = document.getElementById("taskList")

if(!data.results || data.results.length === 0){

list.innerHTML = "<p>No tasks assigned</p>"
return

}

list.innerHTML = data.results.map(t => {

const startStopButton = renderStartStop(t)
const finishButton = renderFinish(t)

return \`

<div class="task-card">

<div class="task-left">

<div class="task-title">
\${t.detail || t.task_name}
</div>

<div>
Job: \${t.job_id}
</div>

<div>
Plan: \${t.start_time_plan || "-"} → \${t.finish_time_plan || "-"}
</div>

<div>
Status: \${t.status}
</div>

</div>

<div class="task-right">

\${startStopButton}

\${finishButton}

</div>

</div>

\`

}).join("")

}

function renderStartStop(task){

if(task.status === "done"){

return '<button class="btn btn-disabled" disabled>Start</button>'

}

if(task.runtime_open){

return \`
<button class="btn btn-stop"
onclick="stopTask('\${task.runtime_id}')">
Stop
</button>
\`

}

return \`
<button class="btn btn-start"
onclick="startTask('\${task.emp_task_id}')">
Start
</button>
\`

}

function renderFinish(task){

if(task.status === "done"){

return '<button class="btn btn-disabled" disabled>Finish</button>'

}

return \`
<button class="btn btn-finish"
onclick="finishTask('\${task.emp_task_id}')">
Finish
</button>
\`

}

async function startTask(empTaskId){

await fetch("/api/runtime/start",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
emp_task_id:empTaskId
})
})

loadTasks()

}

async function stopTask(runtimeId){

await fetch("/api/runtime/stop",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
runtime_id:runtimeId
})
})

loadTasks()

}

async function finishTask(empTaskId){

await fetch("/api/task/finish",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
emp_task_id:empTaskId
})
})

loadTasks()

}

loadTasks()

</script>

`

}
