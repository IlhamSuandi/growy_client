import { Button } from "@/components/ui/button"
import { useLogout } from "@/hooks/auth/useLogout"
import { useMeState } from "@/states/me"

export default function Home() {
  const { me } = useMeState()
  const { mutate: logout } = useLogout()
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
      <h1>Hello!, {me?.username}</h1>
      <Button onClick={() => logout()}>
        Log out
      </Button>
    </div>
  )
}
