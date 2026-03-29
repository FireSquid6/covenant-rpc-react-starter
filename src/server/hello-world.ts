import { covenantServer } from ".";


export default function defineHelloWorld() {
  covenantServer.defineProcedure("helloWorld", {
    procedure: ({ inputs }) => {
      return {
        message: `Hello, ${inputs.name}!`,
      }
    },
    resources: () => [],
  });
}
