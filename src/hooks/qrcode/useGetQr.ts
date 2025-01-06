import { useTokenState } from "@/states/token"
import { QrCodeApi } from "@/types/growyApi"
import { defaultHeaders } from "@/utils/requestHeaders"
import { useMutation } from "@tanstack/react-query"

async function getQrCode(accessToken?: string, userId?: string) {
  if (!userId || !accessToken) {
    throw new Error("Missing userId or accessToken")
  }

  const qrCodeApi = new QrCodeApi()
  const response = await qrCodeApi.qrcodeGet(
    {
      userId
    },
    defaultHeaders()
  )

  return response.data
}

export const useGetQr = () => {
  const { token } = useTokenState()

  return useMutation({
    mutationKey: ["qrCode"],
    mutationFn: (userId?: string) => {
      if (!token?.accessToken) throw new Error("Authentication token is missing.")
      return getQrCode(token?.accessToken, userId)
    },
    onSuccess: (data) => {
      console.log("QR code data:", data)
    },
    onError: async (error: any) => {
      const errorData = await error.response.json()
      console.error("Check-in error:", errorData.message)
    },
  })
}
