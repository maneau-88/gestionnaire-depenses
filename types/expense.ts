export interface Expense {
  id: string
  name: string
  amount: number
  category: "Nourriture" | "Transport" | "Logement" | "Loisirs" | "Autres"
  date: string
}

export const CATEGORIES = ["Nourriture", "Transport", "Logement", "Loisirs", "Autres"] as const

export const CATEGORY_COLORS = {
  Nourriture: "hsl(210, 80%, 50%)",
  Transport: "hsl(50, 90%, 50%)",
  Logement: "hsl(120, 70%, 45%)",
  Loisirs: "hsl(280, 70%, 55%)",
  Autres: "hsl(0, 70%, 50%)",
}
