import * as trpcNext from "@trpc/server/adapters/next"
import { appRouter } from "../../../server/routers/_app"
import { connect } from "../../../lib/db"

// export API handler
// @see https://trpc.io/docs/server/adapters
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: async () => {
    await connect()
    return {}
  },
  onError(opts) {
    console.error("Error:", opts.error)
  },
})
