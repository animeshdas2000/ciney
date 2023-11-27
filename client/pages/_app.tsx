import "../styles/globals.css"
import type { AppProps } from "next/app"
import Layout from "../components/Layout"
import { SessionProvider } from "next-auth/react"
import { trpc } from "../utils/trpc"
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}

export default trpc.withTRPC(MyApp)
