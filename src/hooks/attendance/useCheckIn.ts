import { useTokenState } from "@/states/token"
import { AttendanceApi, DtoCheckInResponse } from "@/types/growyApi"
import { commonApiClient } from "@/utils/apiClient"
import { useMutation } from "@tanstack/react-query"

const checkIn = async (accessToken?: string) => {
  if (!accessToken) {
    throw new Error("Missing authentication or check-in token")
  }

  const { configuration, basePath, axiosInstance } = commonApiClient()
  const attendanceApi = new AttendanceApi(configuration, basePath, axiosInstance)
  const response = await attendanceApi.attendanceCheckInPost(
    {
      location: "jakarta",
    },
  )

  return response.data.data
}

export const useCheckIn = () => {
  const { token } = useTokenState()

  return useMutation<DtoCheckInResponse | undefined, any>({
    mutationKey: ["checkin"],
    mutationFn: () => {
      if (!token?.access_token) throw new Error("Authentication token is missing.")
      return checkIn(token.access_token)
    },
    onSuccess: (data) => {
      console.log("Check-in successful:", data)
    },
    onError: async (error) => {
      const errorData = await error.response.json()
      console.error("Check-in error:", errorData.error)
    },
  })
}
