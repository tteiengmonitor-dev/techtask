export function technicianPage(){

return `

<h2>Technician Tasks</h2>

<div id="taskList" class="card">
Loading tasks...
</div>

<script>

async function loadTasks(){

const res = await fetch("/api/mytasks")
const data = await res.json()

const list = document.getElementById("taskList")

if(!data.results || data.results.length === 0){
list.innerHTML = "<p>No tasks assigned</p>"
return
}

list.innerHTML = data.results.map(t => \`

<div style="margin-bottom:15px">

<b>\${t.task_name}</b><br>
Job: \${t.job_id}<br>
Date: \${t.task_date}<br>
Status: \${t.status}<br><br>

<button onclick="startTask('\${t.emp_task_id}')">
Start
</button>

<button onclick="finishTask('\${t.emp_task_id}')">
Finish
</button>

</div>

\`).join("")

}

async function startTask(id){

await fetch("/api/task/start",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
emp_task_id:id
})
})

loadTasks()

}

async function finishTask(id){

await fetch("/api/task/finish",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
emp_task_id:id
})
})

loadTasks()

}

loadTasks()

</script>

`

}
