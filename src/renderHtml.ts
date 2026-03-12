export function renderHtml(title:string, content:string, user?:any){

const profile = user ? `
<div style="display:flex;gap:12px;align-items:center">

<div class="profile">

<div class="profile-name">${user.name}</div>

<div class="profile-role">${user.role}</div>

</div>

<a href="/logout" style="
padding:6px 10px;
border:1px solid #2b3440;
border-radius:6px;
">Logout</a>

</div>
` : ""

return `
<!DOCTYPE html>
<html>

<head>

<meta charset="UTF-8">

<title>${title}</title>

<link rel="stylesheet" href="public/style.css">

</head>

<body>

<div class="header">

<div>⚡ Tech Task Manager</div>

${profile}

</div>

<div class="container">

${content}

</div>

</body>
</html>
`
}
