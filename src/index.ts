export function indexPage(){

return `

<!DOCTYPE html>
<html>

<head>

<title>Tech Task Manager</title>

<link rel="stylesheet" href="/css/style.css">

</head>

<body>

<div class="header">
⚡ Tech Task Manager
</div>

<div class="container">

<div class="grid">

<a class="card" href="/planner">
<div class="card-title">Planner Dashboard</div>
<div class="card-desc">Create job and plan technician tasks</div>
</a>

<a class="card" href="/tech">
<div class="card-title">Technician Panel</div>
<div class="card-desc">Technician task list</div>
</a>

</div>

</div>

</body>

</html>

`

}
