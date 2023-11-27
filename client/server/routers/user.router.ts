import {z} from "zod"
import userModel from "../../lib/models/user.model"
import {procedure,router} from "../trpc"

const userRouter = router({
    status:procedure.input(z.object({
        text: z.string(),
    })).query(({input})=>{
        return {
            status: `Working ${input.text}`
        }
    }),
    setData: procedure
    .input(z.object({
    text: z.string(),
    }))
    .query(async({input,ctx})=>{
        const userModelData = await userModel().create({
            name:"Test",
            email:"test@email.com"
        });
        return{
            greeting: userModelData
        }
    })

    // setData: procedure
    //     .input(z.object({
    //     text: z.string(),
    //     }))
    //     .query(async({input,ctx})=>{
    //         const userModelData = await userModel().create({
    //             name:"Test",
    //             email:"test@email.com"
    //         });
    //         return{
    //             greeting: userModelData
    //         }
    //     })
})

export default userRouter