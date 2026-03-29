import { store } from "@/store";
import { covenantServer } from ".";


export default function defineStore() {
  // these procedures update and fetch the same resource (/store), so
  // an automatic refresh for any listened getStore procedures will be 
  // called if a setStore procedure is called
  covenantServer.defineProcedure("getStore", {
    procedure: () => {
      return store.getStore();
    },
    resources: () => ["/store"],
  });

  covenantServer.defineProcedure("setStore", {
    procedure: ({ inputs }) => {
      store.setStore(inputs);
      return null;
    },
    resources: () => ["/store"],
  })
}
