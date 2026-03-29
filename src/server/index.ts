import { SidekickIntegratedCovenantServer } from "@covenant-rpc/sidekick-bun-adapter"
import { covenant } from "@/covenant"
import { defineChat } from "./chat";
import defineStore from "./store";
import defineHelloWorld from "./hello-world";


export const covenantServer = new SidekickIntegratedCovenantServer(covenant, {
  contextGenerator: () => {},
  derivation: () => {},
});


// it's important to implement everything
defineHelloWorld();
defineStore();
defineChat();
covenantServer.assertAllDefined();
