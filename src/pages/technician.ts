export function technicianPage(){

return `

<html>

<head>

<title>Technician</title>

<link rel="stylesheet" href="/css/style.css">

</head>

<body>

<div class="header">Technician Tasks</div>

<div class="container">

<div id="taskList"></div>

</div>

<script>

async function loadTasks(){

const res = await fetch("/api/tasks")
const data = await res.json()

const el = document.getElementById("taskList")

el.innerHTML = data.map(t=>\`
<div class="card">
${t.title}
<button onclick="start(${t.id})">Start</button>
</div>
\`).join("")

}

loadTasks()

</script>

</body>

</html>

`

}
