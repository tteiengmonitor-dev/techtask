export function plannerPage(){

return `

<h2>Create Task</h2>

<div class="card">

<div style="margin-bottom:10px">
Job ID<br>
<input id="job_id" style="width:100%">
</div>

<div style="margin-bottom:10px">
Task Name<br>
<input id="task_name" style="width:100%">
</div>

<div style="margin-bottom:10px">
Task Date<br>
<input id="task_date" type="date">
</div>

<div style="margin-bottom:10px">
Priority<br>
<select id="priority">
<option value="normal">Normal</option>
<option value="urgent">Urgent</option>
</select>
</div>

<div style="margin-bottom:10px">
Detail<br>
<textarea id="detail" style="width:100%"></textarea>
</div>

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
task_name: document.getElementById("task_name").value,
task_date: document.getElementById("task_date").value,
priority: document.getElementById("priority").value,
detail: document.getElementById("detail").value,
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