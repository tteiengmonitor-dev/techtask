export function plannerPage(){

return `

<html>

<head>

<title>Planner</title>

<link rel="stylesheet" href="/css/style.css">

</head>

<body>

<div class="header">Planner Dashboard</div>

<div class="container">

<h2>Create Job</h2>

<input id="jobTitle" placeholder="Job name">

<button onclick="createJob()">Create</button>

</div>

<script>

async function createJob(){

const title = document.getElementById("jobTitle").value

await fetch("/api/jobs",{
method:"POST",
body:JSON.stringify({title})
})

alert("job created")

}

</script>

</body>

</html>

`

}
