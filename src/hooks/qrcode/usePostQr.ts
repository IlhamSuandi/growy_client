import { useTokenState } from "@/states/token"
import { QrCodeApi } from "@/types/growyApi"
import { defaultHeaders } from "@/utils/requestHeaders"
import { useMutation } from "@tanstack/react-query"

async function postQrCode(accessToken?: string, userId?: string) {
  if (!userId || !accessToken) {
    throw new Error("Missing userId or accessToken")
  }

  const qrCodeApi = new QrCodeApi()
  const response = await qrCodeApi.qrcodePost(
    { request: { userId } },
    defaultHeaders()
  )

  return response.data
}

export const usePostQr = () => {
  const { token } = useTokenState()

  return useMutation({
    mutationKey: ["qrCode"],
    mutationFn: (userId?: string) => {
      if (!token?.accessToken) throw new Error("Authentication token is missing.")
      if (!userId) throw new Error("UserId is missing.")
      return postQrCode(token?.accessToken, userId)
    },
    onSuccess: (data) => {
      console.log("QR code data:", data)
    },
    onError: async (error: any) => {
      const errorData = await error.response.json()
      console.error("Error creating QR code:", errorData.message)
    },
  })
}
