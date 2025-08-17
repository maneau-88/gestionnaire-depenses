"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { type Expense, CATEGORY_COLORS } from "@/types/expense"
import { Edit, Trash2 } from "lucide-react"

interface ExpenseListProps {
  expenses: Expense[]
  onEdit: (expense: Expense) => void
  onDelete: (id: string) => void
}

export function ExpenseList({ expenses, onEdit, onDelete }: ExpenseListProps) {
  if (expenses.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Aucune dépense enregistrée</p>
        <p className="text-sm">Ajoutez votre première dépense pour commencer</p>
      </div>
    )
  }

  // Formate une date en format français lisible
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  }

  // Formate un montant en franc CFA avec la devise
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
    }).format(amount)
  }

  return (
    <div className="space-y-3 max-h-96 overflow-y-auto">
      {expenses.map((expense) => (
        <Card key={expense.id} className="hover:shadow-md transition-shadow bg-cyan-200 border-transparent">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium">{expense.name}</h3>
                  <Badge
                    variant="secondary"
                    style={{
                      backgroundColor: CATEGORY_COLORS[expense.category] + "20",
                      color: CATEGORY_COLORS[expense.category],
                    }}
                  >
                    {expense.category}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{formatDate(expense.date)}</span>
                  <span className="font-semibold text-lg">{formatAmount(expense.amount)}</span>
                </div>
              </div>
              <div className="flex gap-1 ml-4">
                <Button size="sm" variant="ghost" onClick={() => onEdit(expense)} className="h-8 w-8 p-0">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onDelete(expense.id)}
                  className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
