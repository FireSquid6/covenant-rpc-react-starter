import { covenant } from "@/covenant";
import { CovenantClient } from "@covenant-rpc/client";
import { httpClientToServer, httpClientToSidekick } from "@covenant-rpc/client";



export const client = new CovenantClient(covenant, {
  sidekickConnection: httpClientToSidekick("http://localhost:3000/api/covenant"),
  serverConnection: httpClientToServer("http://localhost:3000/api/covenant", {}),
});
