export function renderHtml(){

return `

<!DOCTYPE html>
<html>

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Tech Task Manager</title>

<link rel="stylesheet" href="/style.css">

</head>

<body>

<div class="header">
⚡ Tech Task Manager
</div>

<div class="container">

<div class="grid">

<a class="card" href="/planner">
<div class="card-title">Planner Dashboard</div>
<div class="card-desc">
Create jobs and plan technician tasks
</div>
</a>

<a class="card" href="/tech">
<div class="card-title">Technician Panel</div>
<div class="card-desc">
Technician task list and runtime control
</div>
</a>

</div>

</div>

</body>
</html>

`
}
