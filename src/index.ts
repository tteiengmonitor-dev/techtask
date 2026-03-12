export default {
  async fetch(request, env) {

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Tech Task Manager</title>

<style>

/* ===== INDUSTRIAL THEME ===== */

body{
background:#0d0f12;
color:#e6e6e6;
font-family:Segoe UI,system-ui;
margin:0;
}

.header{
background:#15191f;
padding:20px;
border-bottom:1px solid #2b3440;
font-size:22px;
font-weight:600;
color:#00d4ff;
}

.container{
padding:30px;
max-width:1200px;
margin:auto;
}

.grid{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
gap:20px;
}

.card{
background:#15191f;
border:1px solid #2b3440;
border-radius:8px;
padding:20px;
cursor:pointer;
transition:0.2s;
}

.card:hover{
background:#1d232b;
transform:translateY(-3px);
}

.card-title{
font-size:18px;
margin-bottom:10px;
color:#00ff9c;
}

.card-desc{
font-size:13px;
color:#9aa4ad;
}

.status{
margin-top:10px;
font-size:12px;
}

.ok{color:#2ecc71;}
.warn{color:#f1c40f;}
.danger{color:#ff4d4f;}

.footer{
margin-top:40px;
font-size:12px;
color:#666;
text-align:center;
}

</style>

</head>

<body>

<div class="header">
⚡ Tech Task Manager
</div>

<div class="container">

<div class="grid">

<div class="card">
<div class="card-title">📋 Planner Dashboard</div>
<div class="card-desc">
Create jobs and plan technician tasks
</div>
<div class="status ok">System Ready</div>
</div>

<div class="card">
<div class="card-title">👨‍🔧 Technician Panel</div>
<div class="card-desc">
Technician task list and runtime control
</div>
<div class="status warn">Waiting tasks</div>
</div>

<div class="card">
<div class="card-title">📊 Supervisor Monitor</div>
<div class="card-desc">
Live technician work status
</div>
<div class="status ok">Monitoring</div>
</div>

<div class="card">
<div class="card-title">🗄 Database</div>
<div class="card-desc">
D1 database management
</div>
<div class="status ok">Connected</div>
</div>

</div>

<div class="footer">
Tech Task System • Cloudflare Worker
</div>

</div>

</body>
</html>
`;

    return new Response(html, {
      headers: { "content-type": "text/html;charset=UTF-8" }
    });

  }
};
