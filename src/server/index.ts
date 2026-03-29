import { SidekickIntegratedCovenantServer } from "@covenant-rpc/sidekick-bun-adapter"
import { covenant } from "@/covenant"


export const covenantServer = new SidekickIntegratedCovenantServer(covenant, {
  contextGenerator: () => {},
  derivation: () => {},
});
