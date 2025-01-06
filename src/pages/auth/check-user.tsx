import { useGetCompanies } from "@/hooks/company/useGetCompanies"
import { useCompanyState } from "@/states/company"
import { useMeState } from "@/states/me"
import { useTokenState } from "@/states/token"
import { useEffect } from "react"
import { Navigate, useNavigate } from "react-router"

export default function CheckUser() {
  // const { me } = useMeState()
  // const navigate = useNavigate()
  // const { setAuthenticated } = useTokenState()
  // const { mutate: getCompanies, data, isSuccess } = useGetCompanies()
  // const { companies } = useCompanyState()
  //
  // useEffect(() => {
  //   if (me?.role === "owner") {
  //     getCompanies()
  //     if (isSuccess) {
  //       console.log("company data:", data?.company)
  //       setAuthenticated(true)
  //       navigate("/")
  //     } else return
  //   }
  // }, [companies, data, getCompanies, isSuccess, me, navigate, setAuthenticated])

  //
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
  // if (!isAuthenticated && !isAuthPath) {
  //   return <Navigate to="/auth/login" />
  // }

  return (
    <div>check user</div>
  )
}

