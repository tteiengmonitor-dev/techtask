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

<label><input type="checkbox" value="36901"> 36901</label><br>
<label><input type="checkbox" value="47510"> 47510</label><br>
<label><input type="checkbox" value="48123"> 48123</label><br>

<br>

<button onclick="createTask()">Create Task</button>

</div>

<script>

async function createTask(){

const technicians = [...document.querySelectorAll("input[type=checkbox]:checked")]
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

alert("Task created: "+result.task_id)

}

</script>

`

}
