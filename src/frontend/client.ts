import { covenant } from "@/covenant";
import { CovenantReactClient } from "@covenant-rpc/react";
import { httpClientToServer, httpClientToSidekick } from "@covenant-rpc/client";

export const client = new CovenantReactClient(covenant, {
  sidekickConnection: httpClientToSidekick("http://localhost:3000/api/covenant"),
  serverConnection: httpClientToServer("http://localhost:3000/api/covenant", {}),
});
