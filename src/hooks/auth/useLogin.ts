import { useTokenState } from "@/states/token"
import { AuthApi } from "@/types/growyApi"
import { useMutation } from "@tanstack/react-query"
import { useGetMe } from "./useGetMe"
import { useGetCompanies } from "../company/useGetCompanies"
import { commonApiClient } from "@/utils/apiClient"

// owner
// email: owner@gmail.com
// password: Owner123+
//
// user1
// email: user1@gmail.com
// password: User123+

const login = async (_email: string, _password: string) => {
  const { configuration, basePath, axiosInstance } = commonApiClient()
  const authApi = new AuthApi(configuration, basePath, axiosInstance)
  const response = await authApi.authLoginPost(
    {
      email: "owner@gmail.com",
      password: "Owner123+"
    }
  )
  return response.data.data
}

interface LoginProps {
  email: string;
  password: string;
}

export const useLogin = () => {
  const { setToken, setAuthenticated } = useTokenState()
  const { mutate: getMe } = useGetMe()
  const { mutate: getCompanies } = useGetCompanies()

  const query = useMutation({
    mutationKey: ["login"],
    mutationFn: ({ email, password }: LoginProps) => login(email, password),
    onSuccess: (data) => {
      setToken(data)
      getMe()
      getCompanies()
      setAuthenticated(true)
    },
  })


  return query
}
