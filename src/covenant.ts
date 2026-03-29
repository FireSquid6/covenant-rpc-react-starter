import z from "zod";
import { query, mutation, declareCovenant, channel } from "@covenant-rpc/core";


export const covenant = declareCovenant({
  procedures: {
    helloWorld: query({
      input: z.object({
        name: z.string(),
      }),
      output: z.object({
        message: z.string(),
      })
    }),

    getStore: query({
      input: z.null(),
      output: z.string(),
    }),
    setStore: mutation({
      input: z.string(),
      output: z.null(),
    })
  },
  channels: {
    chatRoom: channel({
      connectionRequest: z.object({
        username: z.string(),
        password: z.string(),
      }),
      connectionContext: z.object({
        username: z.string(),
      }),
      clientMessage: z.object({
        text: z.string(),
      }),
      serverMessage: z.object({
        text: z.string(),
        timestamp: z.number(),
        username: z.string(),
      }),
      params: ["channelId"],
    }),
  },
});
