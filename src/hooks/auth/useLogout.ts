import { useTokenState } from "@/states/token"
import { useMeState } from "@/states/me"
import { AuthApi } from "@/types/growyApi"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import { commonApiClient } from "@/utils/apiClient"

const logout = async () => {
  const { configuration, basePath, axiosInstance } = commonApiClient()
  const authApi = new AuthApi(configuration, basePath, axiosInstance)
  const response = await authApi.authLogoutPost()
  return response.data
}

export const useLogout = () => {
  const { setToken, setAuthenticated } = useTokenState()
  const { setMe } = useMeState()

  const navigate = useNavigate()

  return useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: () => {
      setToken(undefined)
      setAuthenticated(false)
      setMe(undefined)
      navigate("/auth/login")
    },
    onError: () => {
      setToken(undefined)
      setAuthenticated(false)
      setMe(undefined)
      navigate("/auth/login")
    },
  })

}
