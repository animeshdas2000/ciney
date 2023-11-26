import React from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link"

function NavBar() {
  const { data: session } = useSession()
  let authBtn
  session
    ? (authBtn = <button onClick={() => signOut()}>Sign Out</button>)
    : (authBtn = <button onClick={() => signIn()}>Sign In</button>)
  return (
    <>
      <div className="text-center flex justify-evenly max-w-xl content-center mx-auto py-8 ">
        <Link href="/">Home</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/dashboard/movies">Movies</Link>
        {authBtn}
      </div>
    </>
  )
}

export default NavBar
