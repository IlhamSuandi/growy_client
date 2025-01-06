import { useGoogleCallback } from "@/hooks/auth/useGoogleLogin"
import { useRenewToken } from "@/hooks/auth/useRenewToken"
import { useTokenState } from "@/states/token"
import { getTokenRemainingTime } from "@/utils/token"
import { useCallback, useEffect, useRef } from "react"
import { Navigate, useLocation, useNavigate, useSearchParams } from "react-router"
import Loading from "@/components/app/Loading"

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const { token, isAuthenticated, isFinishSetup } = useTokenState()
  const { mutate: getNewToken, } = useRenewToken()
  const { mutate: googleLogin } = useGoogleCallback()

  const isAuthPath = location.pathname.startsWith("/auth/login") || location.pathname.startsWith("/auth/register")
  const isCallback = location.pathname.startsWith("/google/callback")
  const isCreateCompanyPath = location.pathname.startsWith("/account/setup")

  // Google login callback
  useEffect(() => {
    if (!isCallback) {
      return
    }
    const state = searchParams.get("state")
    const code = searchParams.get("code")

    if (!state || !code) {
      return
    }
    googleLogin({ code, state })
  }, [googleLogin, searchParams, isCallback])

  // Token expiration checker
  // const checkTokenExpiration = useCallback(() => {
  //   if (!isAuthenticated) {
  //     return navigate("/auth/login")
  //   }
  //
  //   const tokenRemainingTime = getTokenRemainingTime(token?.access_token)
  //   const expirationThreshold = 1000 * 60 // 60 seconds
  //   // console.log("tokenRemainingTime", tokenRemainingTime)
  //
  //   if (tokenRemainingTime <= expirationThreshold) {
  //     return getNewToken()
  //   }
  // }, [isAuthenticated, token, navigate, getNewToken])
  //
  // const intervalRef = useRef<NodeJS.Timeout>()
  //
  // // Effect to monitor token expiration
  // useEffect(() => {
  //   intervalRef.current = setInterval(checkTokenExpiration, 1000)
  //
  //   // Cleanup function to clear the interval
  //   return () => clearInterval(intervalRef.current)
  // }, [isAuthenticated, isAuthPath, navigate, checkTokenExpiration, token])
  //
  // if (isCreateCompanyPath && !isAuthenticated) {
  //   return <Navigate to='/auth/login' />
  // }

  if (isCallback) {
    return <Loading />
  }

  if ((isAuthenticated || token) && !isFinishSetup && !isCreateCompanyPath) {
    return <Navigate to='/account/setup' />
  }

  if (!(isAuthenticated || token) && !isAuthPath) {
    return <Navigate to='/auth/login' />
  }

  if ((isAuthenticated || token) && isAuthPath) {
    return <Navigate to='/' />
  }

  return <>{children}</>
}
