import { indexPage } from "./pages/index"
import { plannerPage } from "./pages/planner"
import { technicianPage } from "./pages/technician"

import { getJobs } from "./api/jobs"
import { getTasks } from "./api/tasks"

export default {

async fetch(request: Request, env: Env) {

const url = new URL(request.url)

if(url.pathname === "/"){
  return new Response(indexPage(),{headers:{ "content-type":"text/html"}})
}

if(url.pathname === "/planner"){
  return new Response(plannerPage(),{headers:{ "content-type":"text/html"}})
}

if(url.pathname === "/tech"){
  return new Response(technicianPage(),{headers:{ "content-type":"text/html"}})
}

if(url.pathname === "/api/jobs"){
  return getJobs(env)
}

if(url.pathname === "/api/tasks"){
  return getTasks(env)
}

return new Response("404",{status:404})

}

} satisfies ExportedHandler<Env>
