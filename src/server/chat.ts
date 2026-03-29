import { covenantServer } from ".";


export function defineChat() {
  covenantServer.defineChannel("chatRoom", {
    onConnect({ inputs, reject }) {
      // dummy logic for an invalid password
      if (inputs.password === "invalid") {
        // client argument indicates that the client made the mistake.
        // Internal errors should have "server" as the second argument
        reject("Password was invalid!", "client");
      }

      // we return the context necessary for this
      // connection
      return {
        username: inputs.username,
      }
    },
    onMessage({ inputs, context, params }) {
      // respond into the same channel with a new message
      covenantServer.sendMessage("chatRoom", params, {
        username: context.username,
        timestamp: Date.now(),
        text: inputs.text, 
      });
    },
  });
}
