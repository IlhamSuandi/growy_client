import { useCallback } from "react"
import { useTokenState } from "@/states/token"
import { AuthApi } from "@/types/growyApi"
import { useMutation } from "@tanstack/react-query"
import { useGetMe } from "./useGetMe"
import { useNavigate } from "react-router"
import { commonApiClient } from "@/utils/apiClient"
import { useGetCompanies } from "../company/useGetCompanies"

export const useGoogleLogin = () => {
  const login = useCallback(() => {
    const apiUrl = import.meta.env.VITE_API_URL
    if (!apiUrl) {
      console.error("VITE_API_URL is not defined in your environment variables")
      return
    }

    window.location.href = `${apiUrl}/auth/google/login`
  }, [])

  return login
}

type GoogleCallback = {
  code: string;
  state: string;
}

const googleCallback = async ({ code, state }: GoogleCallback) => {
  const { configuration, basePath, axiosInstance } = commonApiClient()
  const authApi = new AuthApi(configuration, basePath, axiosInstance)
  const response = await authApi.authGoogleCallbackGet(state, code)
  return response.data
}

export const useGoogleCallback = () => {
  const { setToken, setAuthenticated } = useTokenState()
  const { mutate: getMe } = useGetMe()
  const { mutate: getCompanies } = useGetCompanies()
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: ({ code, state }: GoogleCallback) => googleCallback({ code, state }),
    onSuccess: (data) => {
      setToken(data.data)
      getMe()
      setAuthenticated(true)
      getCompanies()
      navigate("/")
    },
    onError: () => {
      setToken(undefined)
      setAuthenticated(false)
    },
  })


  return mutation
}
