import { serve } from "bun";
import index from "./frontend/index.html";
import { covenantServer } from "./server";

const server = serve({
  routes: {
    // handle the request with covenant 
    "/api/covenant": (req) => covenantServer.handle(req),
    "/socket": (req, s) => covenantServer.handleSocket(req, s),

    // serve our index html for all other routes
    "/*": index,
  },

  // this is needed to make sidekick work
  websocket: covenantServer.getWebsocket(),

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
