"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Expense } from "@/types/expense"
import { ActivityIcon, Calendar, PieChart } from "lucide-react"

interface ExpenseSummaryProps {
  expenses: Expense[]
}

export function ExpenseSummary({ expenses }: ExpenseSummaryProps) {
  // Calcule le montant total de toutes les dépenses
  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  // Filtre les dépenses du mois en cours
  const monthlyExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date)
    return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear
  })

  // Calcule le total des dépenses du mois en cours
  const monthlyTotal = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0)

  // Compte le nombre de catégories uniques utilisées
  const categoriesCount = new Set(expenses.map((expense) => expense.category)).size

  // Formate un montant en franc CFA avec la devise 
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
    }).format(amount)
  }

  // Retourne le nom du mois actuel en français
  const getMonthName = () => {
    return new Date().toLocaleDateString("fr-FR", { month: "long" })
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="bg-sky-500 shadow-xl text-transparent border-transparent rounded-none transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-sky-600 cursor-pointer">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white">Total des dépenses</CardTitle>
          <ActivityIcon className="h-4 w-4 bg-transparent text-white transition-transform duration-300 hover:rotate-12" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{formatAmount(totalAmount)}</div>
          <p className="text-xs text-white">
            {expenses.length} dépense{expenses.length !== 1 ? "s" : ""} enregistrée{expenses.length !== 1 ? "s" : ""}
          </p>
        </CardContent>
      </Card>

      <Card className="bg-sky-500 text-transparent shadow-xl border-transparent rounded-none transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-sky-600 cursor-pointer">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white">Ce mois-ci</CardTitle>
          <Calendar className="h-4 w-4 text-white transition-transform duration-300 hover:rotate-12" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">{formatAmount(monthlyTotal)}</div>
          <p className="text-xs text-white">
            {monthlyExpenses.length} dépense{monthlyExpenses.length !== 1 ? "s" : ""} en {getMonthName()}
          </p>
        </CardContent>
      </Card>

      <Card className="bg-sky-500 text-white shadow-xl border-transparent rounded-none transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-sky-600 cursor-pointer">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Catégories utilisées</CardTitle>
          <PieChart className="h-4 w-4 text-white transition-transform duration-300 hover:rotate-12" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{categoriesCount}</div>
          <p className="text-xs text-white">sur 5 catégories disponibles</p>
        </CardContent>
      </Card>
    </div>
  )
}
