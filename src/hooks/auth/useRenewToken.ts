import { useTokenState } from "@/states/token"
import { AuthApi } from "@/types/growyApi"
import { commonApiClient } from "@/utils/apiClient"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router"

const renewToken = async () => {
  const { configuration, basePath, axiosInstance } = commonApiClient()
  const authApi = new AuthApi(configuration, basePath, axiosInstance)
  const response = await authApi.authTokenRenewGet()
  return response.data.data
}

export const useRenewToken = () => {
  const { setToken, setAuthenticated } = useTokenState()
  const navigate = useNavigate()

  return useMutation({
    mutationKey: ["renewToken"],
    mutationFn: renewToken,
    retry: 1,
    onSuccess: (data) => {
      setToken(data)
      setAuthenticated(true)
    },
    onError: () => {
      setToken(undefined)
      setAuthenticated(false)
      navigate("/auth/login")
    },
  })
}
