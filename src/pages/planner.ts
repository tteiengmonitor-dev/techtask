export function plannerPage(){

return `

<div class="planner-layout">

<!-- LEFT PANEL -->
<div class="planner-left">

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

</div>


<!-- RIGHT PANEL -->
<div class="planner-right">

<h2>Technician Gantt Chart</h2>

<div id="ganttChart">
Loading schedule...
</div>

</div>

</div>


<style>

.planner-layout{
display:flex;
gap:30px;
align-items:flex-start;
}

.planner-left{
width:420px;
}

.planner-right{
flex:1;
}

.card{
background:#fff;
padding:20px;
border-radius:10px;
box-shadow:0 2px 10px rgba(0,0,0,0.1);
}

#ganttChart{
background:#fff;
border-radius:10px;
padding:20px;
min-height:400px;
box-shadow:0 2px 10px rgba(0,0,0,0.1);
}

</style>


<script>

const GAS_URL = "https://script.google.com/macros/s/AKfycbzIUzPRTYpMJTOkBnG8AhiwBcaTAyjowSFiFfmxv-dQKhzJKn8HyyOqHhfs7ZDFnBWDDQ/exec"


window.addEventListener("DOMContentLoaded", () => {

document.getElementById("task_date").value =
new Date().toISOString().slice(0,10)

loadTechnicians()
loadGantt()

})


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

if(technicians.length === 0){
alert("Please select technician")
return
}

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

loadGantt()

}



async function loadGantt(){

try{

const res = await fetch("/api/emptask")

const data = await res.json()

renderGantt(data)

}catch(e){

document.getElementById("ganttChart").innerHTML =
"Cannot load schedule"

}

}



function renderGantt(tasks){

if(!tasks || tasks.length === 0){

document.getElementById("ganttChart").innerHTML =
"No task today"

return

}

const techMap = {}

tasks.forEach(t=>{

if(!techMap[t.emp_id]){
techMap[t.emp_id] = []
}

techMap[t.emp_id].push(t)

})


let html = ""


Object.keys(techMap).forEach(emp=>{

html += \`
<div style="margin-bottom:10px">
<b>\${emp}</b><br>
\`

techMap[emp].forEach(t=>{

html += \`
<div style="
display:inline-block;
background:#4caf50;
color:white;
padding:4px 10px;
border-radius:6px;
margin-right:6px;
font-size:12px;
">
\${t.detail}
</div>
\`

})

html += "</div>"

})


document.getElementById("ganttChart").innerHTML = html

}

</script>

`

}
