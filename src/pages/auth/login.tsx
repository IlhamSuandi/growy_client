import { Button } from "@/components/ui/button"
import { MaterialInput } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useGoogleLogin } from "@/hooks/auth/useGoogleLogin"
import { useLogin } from "@/hooks/auth/useLogin"
import { useState } from "react"

export default function LoginPage() {
  const { mutate: login } = useLogin()
  const googleLogin = useGoogleLogin()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center p-5'>
      <div className='w-full max-w-md text-center p-10 overflow-hidden border rounded-lg'>
        <h1 className='text-2xl font-semibold'>Welcome Back</h1>
        <p className='mb-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus, illo!</p>

        <form className='relative flex flex-col gap-4'>
          <MaterialInput
            name='email'
            type='email'
            placeholder='Email'
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <MaterialInput
            name='password'
            type="password"
            placeholder='Password'
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type='submit' className='w-full' onClick={() => login({ email, password })}>
            Login
          </Button>
        </form>

        <div className='w-full flex my-4 justify-center items-center gap-2'>
          <Separator className='shrink h-[2px]' />
          <p>or</p>
          <Separator className='shrink h-[2px]' />
        </div>
        <div className='flex flex-col gap-2'>
          <Button variant="outline" className='w-full' onClick={googleLogin}>
            <img src="/google.png" alt="google" className='w-5 h-5' />
            Sign in with Google
          </Button>
          <a href="/auth/register">register page</a>
        </div>
      </div>
    </div>
  )
}
