import style from "./style.css"

export default {
  async fetch(request: Request, env: Env) {

    const url = new URL(request.url)

    if (url.pathname === "/style.css") {
      return new Response(style, {
        headers: { "content-type": "text/css" }
      })
    }

    if (url.pathname === "/") {
      return new Response(indexPage(), {
        headers: { "content-type": "text/html" }
      })
    }

    if (url.pathname === "/planner") {
      return new Response(plannerPage(), {
        headers: { "content-type": "text/html" }
      })
    }

    if (url.pathname === "/tech") {
      return new Response(technicianPage(), {
        headers: { "content-type": "text/html" }
      })
    }

    return new Response("404", { status: 404 })
  }
}
