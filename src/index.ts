import { renderHtml } from "./renderHtml"
import { plannerPage } from "./pages/planner"
import { technicianPage } from "./pages/technician"

function getUser(request:Request){

const cookie = request.headers.get("Cookie") || ""
const match = cookie.match(/user=([^;]+)/)

if(!match) return null

return JSON.parse(decodeURIComponent(match[1]))

}

function headerProfile(user:any){

if(!user) return ""

return `
<div style="
display:flex;
gap:15px;
align-items:center;
font-size:14px;
color:#e6e6e6;
">

<span>${user.name} (${user.role})</span>

<a href="/logout" class="logout-btn">Logout</a>

</div>
`

}

export default {

async fetch(request:Request, env:Env){

const url = new URL(request.url)

const GAS_URL = "https://script.google.com/macros/s/AKfycbzIUzPRTYpMJTOkBnG8AhiwBcaTAyjowSFiFfmxv-dQKhzJKn8HyyOqHhfs7ZDFnBWDDQ/exec"

const user = getUser(request)

/* CSS */

import style from "./style.css"

if(url.pathname === "/style.css"){

return new Response(style,{
headers:{
"content-type":"text/css"
}

})

}

/* LOGIN PAGE */

if(url.pathname === "/"){

const content = `

<div class="card">

<h2>Login</h2>

<form method="POST" action="/login">

<input name="empid" placeholder="Employee ID"
style="width:100%;padding:10px;margin-bottom:10px" required>

<input type="password" name="password"
placeholder="Password"
style="width:100%;padding:10px;margin-bottom:10px" required>

<button style="padding:10px 20px">Login</button>

</form>

</div>

`

return new Response(renderHtml("Login",content),{
headers:{ "content-type":"text/html"}
})

}

/* LOGIN PROCESS */

if(url.pathname === "/login" && request.method === "POST"){

const form = await request.formData()

const emp_id = form.get("empid")
const password = form.get("password")

const res = await fetch(GAS_URL,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
action:"login",
emp_id,
password
})
})

const data = await res.json()

if(data.status === "success"){

const cookie = `user=${encodeURIComponent(JSON.stringify(data))}; Path=/; HttpOnly`

if(data.role === "planner"){

return new Response(null,{
status:302,
headers:{
"Location":"/menu",
"Set-Cookie":cookie
}
})

}

if(data.role === "technician"){

return new Response(null,{
status:302,
headers:{
"Location":"/tech",
"Set-Cookie":cookie
}
})

}

}

return new Response("Login Failed")

}

/* LOGOUT */

if(url.pathname === "/logout"){

return new Response(null,{
status:302,
headers:{
"Location":"/",
"Set-Cookie":"user=; Path=/; Max-Age=0"
}
})

}

/* MENU (planner only) */

if(url.pathname === "/menu"){

if(!user) return Response.redirect("/",302)

const content = `

<div class="card">
<a href="/planner">Planner Dashboard</a>
</div>

<div class="card">
<a href="/tech">Technician Panel</a>
</div>

`

return new Response(renderHtml("Planner Menu",content),{
headers:{ "content-type":"text/html"}
})

}

/* PLANNER */

if(url.pathname === "/planner"){

if(!user) return Response.redirect("/",302)

return new Response(
renderHtml(
"Planner Dashboard",
plannerPage(),
user
),
{
headers:{ "content-type":"text/html"}
})

}

/* TECHNICIAN */

if(url.pathname === "/tech"){

if(!user) return Response.redirect("/",302)

return new Response(
renderHtml(
"Technician Panel",
technicianPage(),
user
),
{
headers:{ "content-type":"text/html"}
})

}

return new Response("404",{status:404})

}

} satisfies ExportedHandler<Env>;
