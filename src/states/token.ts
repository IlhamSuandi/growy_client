import { DtoTokenResponse } from "@/types/growyApi"
import { create } from "zustand"
import { persist } from "zustand/middleware"

type State = {
  token: DtoTokenResponse | undefined
  isAuthenticated: boolean
  isFinishSetup: boolean
}

type Actions = {
  setToken: (token: DtoTokenResponse | undefined) => void
  setAuthenticated: (isAuthenticated: boolean) => void
  setFinishedSetup: (isFinishSetup: boolean) => void
}

export const useTokenState = create<State & Actions>()(
  persist(
    (set) => ({
      token: undefined,
      isAuthenticated: false,
      isFinishSetup: false,
      setToken: (token) => set({ token }),
      setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
      setFinishedSetup: (isFinishSetup) => set({ isFinishSetup })
    }),
    {
      name: "access_token",
    }
  )
)
