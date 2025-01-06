import { useCompanyState } from "@/states/company"
import { useMeState } from "@/states/me"
import { useTokenState } from "@/states/token"
import { Navigate } from "react-router"

interface CheckingUserProps {
  children: React.ReactNode;
}

export default function CheckUserProvider({ children }: CheckingUserProps) {
  // const { me } = useMeState()
  // const { companies } = useCompanyState()
  // const { isAuthenticated } = useTokenState()
  // const isCreateCompanyPath = location.pathname.startsWith("/account/setup")
  // const isAuthPath = location.pathname.startsWith("/auth/login") || location.pathname.startsWith("/auth/register")
  //
  // if (me?.role === "owner" && companies.length === 0 && !isCreateCompanyPath) {
  //   return <Navigate to="/account/setup" />
  // }
  //
  // if (!isAuthenticated && !isAuthPath && !isCreateCompanyPath) {
  //   return <Navigate to="/auth/login" />
  // }

  return <>{children}</>
}

