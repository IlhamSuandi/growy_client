import { useMeState } from "@/states/me"
import { MeApi } from "@/types/growyApi"
import { commonApiClient } from "@/utils/apiClient"
import { useMutation } from "@tanstack/react-query"

const getMe = async () => {
  const { configuration, basePath, axiosInstance } = commonApiClient()
  const meApi = new MeApi(configuration, basePath, axiosInstance)
  const response = await meApi.meGet()
  return response.data.data
}

export const useGetMe = () => {
  const { setMe } = useMeState()

  const mutation = useMutation({
    mutationKey: ["me"],
    mutationFn: getMe,
    onSuccess: (data) => {
      setMe(data)
    },
    onError: async (error: any) => {
      const errorData = await error.response.json()
      console.error("Error getting user data:", errorData.message)
      setMe(undefined)
    },
  })

  return mutation
}
