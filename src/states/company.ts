import { ModelCompany } from "@/types/growyApi"
import { create } from "zustand"

type State = {
  companies: ModelCompany[]
}

type Actions = {
  setCompanies: (companies: ModelCompany[]) => void
}

export const useCompanyState = create<State & Actions>((set) => ({
  companies: [],
  setCompanies: (companies) => set({ companies }),
}))
