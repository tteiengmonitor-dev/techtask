import { renderHtml } from "./renderHtml"
import { plannerPage } from "./pages/planner"
import { technicianPage } from "./pages/technician"

function getUser(request: Request) {

  const cookie = request.headers.get("Cookie") || ""
  const match = cookie.match(/user=([^;]+)/)

  if (!match) return null

  return JSON.parse(decodeURIComponent(match[1]))
}

export default {

async fetch(request: Request, env: Env) {

const url = new URL(request.url)
const user = getUser(request)

const GAS_URL = "https://script.google.com/macros/s/AKfycbzIUzPRTYpMJTOkBnG8AhiwBcaTAyjowSFiFfmxv-dQKhzJKn8HyyOqHhfs7ZDFnBWDDQ/exec"



/* LOGIN PAGE */

if (url.pathname === "/") {

const html = `
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

return new Response(renderHtml("Login", html), {
headers: { "content-type": "text/html" }
})
}



/* LOGIN PROCESS */

if (url.pathname === "/login" && request.method === "POST") {

const form = await request.formData()

const emp_id = form.get("empid")
const password = form.get("password")

const res = await fetch(GAS_URL, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({
action: "login",
emp_id,
password
})
})

const data = await res.json()

if (data.status === "success") {

const cookie = `user=${encodeURIComponent(JSON.stringify(data))}; Path=/; HttpOnly`

if (data.role === "planner") {
return new Response(null, {
status: 302,
headers: { "Location": "/planner", "Set-Cookie": cookie }
})
}

if (data.role === "technician") {
return new Response(null, {
status: 302,
headers: { "Location": "/tech", "Set-Cookie": cookie }
})
}

}

return new Response("Login Failed")
}



/* LOGOUT */

if (url.pathname === "/logout") {

return new Response(null, {
status: 302,
headers: {
"Location": "/",
"Set-Cookie": "user=; Path=/; Max-Age=0"
}
})
}



/* PLANNER PAGE */

if (url.pathname === "/planner") {

if (!user) return Response.redirect(new URL("/", request.url), 302)

return new Response(
renderHtml("Planner", plannerPage(), user),
{ headers: { "content-type": "text/html" } }
)
}



/* TECHNICIAN PAGE */

if (url.pathname === "/tech") {

if (!user) return Response.redirect(new URL("/", request.url), 302)

return new Response(
renderHtml("Technician", technicianPage(), user),
{ headers: { "content-type": "text/html" } }
)
}



/* CREATE TASK (planner) */

if (url.pathname === "/api/task/create" && request.method === "POST") {

if (!user) return Response.json({ error: "not login" }, { status: 401 })

const body: any = await request.json()

const taskId = "TASK-" + Date.now()

await env.DB.prepare(`
INSERT INTO tasks
(task_id, job_id, detail, task_date, start_time_plan, finish_time_plan, created_by)
VALUES (?, ?, ?, ?, ?, ?, ?)
`)
.bind(
taskId,
body.job_id,
body.detail,
body.task_date,
body.start_time_plan,
body.finish_time_plan,
user.emp_id
)
.run()



/* assign technicians */

for (const empId of body.technicians) {

const empTaskId = crypto.randomUUID()

await env.DB.prepare(`
INSERT INTO emp_tasks
(emp_task_id, task_id, emp_id, status)
VALUES (?, ?, ?, 'planned')
`)
.bind(empTaskId, taskId, empId)
.run()

}

return Response.json({ success: true, task_id: taskId })

}



/* TECHNICIAN TASK LIST */

if (url.pathname === "/api/mytasks") {

if (!user) return Response.json({ error: "not login" }, { status: 401 })

const date = url.searchParams.get("date")

const result = await env.DB.prepare(`
SELECT
et.emp_task_id,
t.task_id,
t.job_id,
t.detail,
t.start_time_plan,
t.finish_time_plan,
et.status,

r.runtime_id,
CASE
WHEN r.runtime_id IS NOT NULL THEN 1
ELSE 0
END as runtime_open

FROM emp_tasks et

JOIN tasks t
ON et.task_id = t.task_id

LEFT JOIN runtime_logs r
ON r.emp_task_id = et.emp_task_id
AND r.end_time IS NULL

WHERE et.emp_id = ?
AND t.task_date = ?

ORDER BY t.start_time_plan
`)
.bind(user.emp_id, date)
.all()

return Response.json(result)

}



/* START RUNTIME */

if (url.pathname === "/api/runtime/start" && request.method === "POST") {

if (!user) return Response.json({ error: "not login" }, { status: 401 })

const body: any = await request.json()

/* check already running */

const open = await env.DB.prepare(`
SELECT runtime_id
FROM runtime_logs
WHERE emp_id = ?
AND end_time IS NULL
LIMIT 1
`)
.bind(user.emp_id)
.first()

if (open) {
return Response.json({ error: "already working" }, { status: 400 })
}

const runtimeId = crypto.randomUUID()

await env.DB.prepare(`
INSERT INTO runtime_logs
(runtime_id, emp_task_id, emp_id, start_time)
VALUES (?, ?, ?, datetime('now'))
`)
.bind(runtimeId, body.emp_task_id, user.emp_id)
.run()

return Response.json({
success: true,
runtime_id: runtimeId
})

}



/* STOP RUNTIME */

if (url.pathname === "/api/runtime/stop" && request.method === "POST") {

const body: any = await request.json()

await env.DB.prepare(`
UPDATE runtime_logs
SET end_time = datetime('now')
WHERE runtime_id = ?
`)
.bind(body.runtime_id)
.run()

return Response.json({ success: true })

}



/* FINISH TASK */

if (url.pathname === "/api/task/finish" && request.method === "POST") {

const body: any = await request.json()

await env.DB.prepare(`
UPDATE emp_tasks
SET status='done'
WHERE emp_task_id = ?
`)
.bind(body.emp_task_id)
.run()

return Response.json({ success: true })

}



/* TECHNICIANS LIST */

if (url.pathname === "/api/technicians") {

const res = await fetch(GAS_URL, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ action: "technicians" })
})

const data = await res.json()

return Response.json(data)

}



return new Response("404", { status: 404 })

}

} satisfies ExportedHandler<Env>;
