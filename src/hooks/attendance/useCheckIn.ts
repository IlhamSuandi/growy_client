import { useTokenState } from "@/states/token"
import { AttendanceApi, DtoCheckInResponse } from "@/types/growyApi"
import { defaultHeaders } from "@/utils/requestHeaders"
import { useMutation } from "@tanstack/react-query"

const checkIn = async (accessToken?: string) => {
  if (!accessToken) {
    throw new Error("Missing authentication or check-in token")
  }

  const attendanceApi = new AttendanceApi()
  const response = await attendanceApi.attendanceCheckInPost(
    {
      request: {
        location: "jakarta",
      },
    },
    defaultHeaders()
  )

  return response.data
}

export const useCheckIn = () => {
  const { token } = useTokenState()

  return useMutation<DtoCheckInResponse | undefined, any>({
    mutationKey: ["checkin"],
    mutationFn: () => {
      if (!token?.accessToken) throw new Error("Authentication token is missing.")
      return checkIn(token.accessToken)
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
