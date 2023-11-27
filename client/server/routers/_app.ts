import {z} from "zod";
import {procedure,router} from "../trpc"
import userRouter from "./user.router"

export const appRouter = router({
    user: userRouter,
//     hello: procedure.input(z.object({
//         text: z.string(),
//     }))
//     .query((opts)=>{
//         return {greeting: `hello ${opts.input.text}`,
//    } })
})

export type AppRouter = typeof appRouter;