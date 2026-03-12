import { indexPage } from "./pages/index";
import { plannerPage } from "./pages/planner";
import { technicianPage } from "./pages/technician";

export default {
  async fetch(request: Request, env: Env) {

    const url = new URL(request.url);

    if (url.pathname === "/") {
      return new Response(indexPage(), {
        headers: { "content-type": "text/html" }
      });
    }

    if (url.pathname === "/planner") {
      return new Response(plannerPage(), {
        headers: { "content-type": "text/html" }
      });
    }

    if (url.pathname === "/tech") {
      return new Response(technicianPage(), {
        headers: { "content-type": "text/html" }
      });
    }

    return new Response("404", { status: 404 });
  }
};
