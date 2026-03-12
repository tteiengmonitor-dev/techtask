import { renderHtml } from "./renderHtml"
import { plannerPage } from "./pages/planner"
import { technicianPage } from "./pages/technician"

export default {

async fetch(request:Request, env:Env){

const url = new URL(request.url)

/* CSS */

if(url.pathname === "/style.css"){

const css = `
:root{
--primary:#00ff9c;
--secondary:#00d4ff;
--warning:#ffc107;
--danger:#ff4d4f;
--bg:#0d0f12;
--panel:#15191f;
--border:#2b3440;
--text:#e6e6e6;
}

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

.card{
background:#15191f;
border:1px solid #2b3440;
border-radius:8px;
padding:20px;
margin-top:20px;
}

.card a {
  display:block;
  color:#00ff9c;
  text-decoration:none;
}

.card a:hover{
  color:#00d4ff;
}

a {
  color: #00ff9c;
  text-decoration: none;
}

a:hover {
  color: #00d4ff;
}

a:visited {
  color: #00ff9c;
}
`

return new Response(css,{
headers:{ "content-type":"text/css"}
})

}

/* DASHBOARD */

if(url.pathname === "/"){

const content = `

<div class="card">
<a href="/planner">Planner Dashboard</a>
</div>

<div class="card">
<a href="/tech">Technician Panel</a>
</div>

`

return new Response(renderHtml("",content),{
headers:{ "content-type":"text/html"}
})

}

/* PLANNER */

if(url.pathname === "/planner"){
return new Response(plannerPage(),{
headers:{ "content-type":"text/html"}
})
}

/* TECH */

if(url.pathname === "/tech"){
return new Response(technicianPage(),{
headers:{ "content-type":"text/html"}
})
}

return new Response("404",{status:404})

}

} satisfies ExportedHandler<Env>;
