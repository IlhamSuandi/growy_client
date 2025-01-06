import { useTokenState } from "@/states/token"

export const defaultHeaders = (): RequestInit => {
  const token = useTokenState.getState().token

  if (!token?.accessToken) {
    throw new Error("Authentication token is missing.")
  }

  return {
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
    },
  }
}
