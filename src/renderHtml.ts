export function renderHtml(title: string, content: string){

return `

<!DOCTYPE html>
<html>

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>${title}</title>

<link rel="stylesheet" href="/style.css">

</head>

<body>

<div class="header">
⚡ Tech Task Manager
</div>

<div class="container">

<div style="margin-bottom:20px;color:#9aa4ad">

<a href="/" style="color:#00d4ff;text-decoration:none">
Tech Task Manager
</a>

${title ? ` > ${title}` : ""}

</div>

${content}

</div>

</body>
</html>

`
}
