"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { type Expense, CATEGORY_COLORS } from "@/types/expense"

interface ExpenseChartsProps {
  expenses: Expense[]
}

// Palette de couleurs pour le graphique en barres (évolution mensuelle)
const CHART_COLORS = [
  "#3b82f6", // blue-500
  "#10b981", // emerald-500
  "#f59e0b", // amber-500
  "#ef4444", // red-500
  "#8b5cf6", // violet-500
  "#06b6d4", // cyan-500
  "#84cc16", // lime-500
  "#f97316", // orange-500
  "#ec4899", // pink-500
  "#6366f1", // indigo-500
]

export function ExpenseCharts({ expenses }: ExpenseChartsProps) {
  // Agrège les dépenses par catégorie pour le graphique en camembert
  const categoryData = expenses.reduce(
    (acc, expense) => {
      const existing = acc.find((item) => item.category === expense.category)
      if (existing) {
        existing.amount += expense.amount
      } else {
        acc.push({
          category: expense.category,
          amount: expense.amount,
          color: CATEGORY_COLORS[expense.category],
        })
      }
      return acc
    },
    [] as Array<{ category: string; amount: number; color: string }>,
  )

  // Agrège les dépenses par mois pour le graphique en barres
  const monthlyData = expenses.reduce(
    (acc, expense) => {
      const date = new Date(expense.date)
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
      const monthName = date.toLocaleDateString("fr-FR", { month: "short", year: "numeric" })

      const existing = acc.find((item) => item.month === monthKey)
      if (existing) {
        existing.amount += expense.amount
      } else {
        acc.push({
          month: monthKey,
          monthName,
          amount: expense.amount,
        })
      }
      return acc
    },
    [] as Array<{ month: string; monthName: string; amount: number; color?: string }>,
  )

  // Trie les données mensuelles par ordre chronologique
  monthlyData.sort((a, b) => a.month.localeCompare(b.month))

  // Assigne une couleur unique à chaque mois
  monthlyData.forEach((item, index) => {
    item.color = CHART_COLORS[index % CHART_COLORS.length]
  })

  // Formate un montant en franc CFA pour l'affichage
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
    }).format(amount)
  }

  // Composant personnalisé pour les tooltips des graphiques
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{label}</p>
          <p className="text-primary">{formatAmount(payload[0].value)}</p>
        </div>
      )
    }
    return null
  }

  if (expenses.length === 0) {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Répartition par catégorie</CardTitle>
            <CardDescription>Graphique en camembert de vos dépenses</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Aucune donnée à afficher</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Évolution mensuelle</CardTitle>
            <CardDescription>Comparaison de vos dépenses par mois</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Aucune donnée à afficher</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="border-transparent shadow-xl rounded-none bg-cyan-400">
        <CardHeader>
          <CardTitle>Répartition par catégorie</CardTitle>
          <CardDescription>Visualisez la répartition de vos dépenses par catégorie</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ category, percent }) => `${category} ${((percent ?? 0) * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="amount"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatAmount(value as number)} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="rounded-none border-transparent shadow-xl bg-cyan-400">
        <CardHeader>
          <CardTitle>Évolution mensuelle</CardTitle>
          <CardDescription>Comparez vos dépenses mois par mois</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="monthName" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={60} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `${value}F CFA`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                {monthlyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
