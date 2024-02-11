import type { NextPage } from "next"
import Head from "next/head"
import styles from "../styles/Home.module.css"
import screen from "../public/screen.svg"
import Image from "next/image"
import seat_lg from "../public/seats-lg.svg"
import { trpc } from "../utils/trpc"
import { ChangeEvent, useState } from "react"
const Home: NextPage = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  // const hello = trpc.user.getUser.useQuery({
  //   id: "65bf6dbedbd649973a8d4ce8",
  // })

  // const mutation = trpc.user.setUser.useMutation()

  // const mutateData = () => {
  //   mutation.mutate({ name, email })
  // }
  // if (hello.isLoading) {
  //   return <>Loading...</>
  // }
  return (
    <div>
      <Head>
        <title>Ciney</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto">
        <main className={styles.main}>
          <h1 className="text-[7rem] pt-2 font-extrabold">Ciney</h1>
          <Image src={screen} alt="Ciney" />
          <Image src={seat_lg} alt="seat" width={700} height={100} />
        </main>
      </div>
    </div>
  )
}

export default Home
