import { ModelUser } from "@/types/growyApi"
import { create } from "zustand"
import { persist } from "zustand/middleware"

type State = {
  me: ModelUser | undefined
}

type Actions = {
  setMe: (token: ModelUser | undefined) => void
}

export const useMeState = create<State & Actions>()(
  persist(
    (set) => ({
      me: undefined,
      setMe: (me) => set({ me }),
    }),
    {
      name: "me",
    }
  )
)
