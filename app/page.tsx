"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExpenseForm } from "@/components/expense-form"
import { ExpenseList } from "@/components/expense-list"
import { ExpenseCharts } from "@/components/expense-charts"
import { ExpenseSummary } from "@/components/expense-summary"
import { ThemeToggle } from "@/components/theme-toggle"
import type { Expense } from "@/types/expense"

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null)

  // Charger les dépenses depuis localStorage au démarrage
  useEffect(() => {
    const savedExpenses = localStorage.getItem("expenses")
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses))
    }
  }, [])

  // Sauvegarder les dépenses dans localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses))
  }, [expenses])

  // Ajoute une nouvelle dépense à la liste avec un ID unique basé sur timestamp
  const addExpense = (expense: Omit<Expense, "id">) => {
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString(),
    }
    setExpenses((prev) => [newExpense, ...prev])
  }

  // Met à jour une dépense existante et sort du mode édition
  const updateExpense = (updatedExpense: Expense) => {
    setExpenses((prev) => prev.map((expense) => (expense.id === updatedExpense.id ? updatedExpense : expense)))
    setEditingExpense(null)
  }

  // Supprime une dépense de la liste par son ID
  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id))
  }

  // Active le mode édition pour une dépense spécifique
  const startEditing = (expense: Expense) => {
    setEditingExpense(expense)
  }

  // Annule le mode édition et remet le formulaire en mode ajout
  const cancelEditing = () => {
    setEditingExpense(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl bg-sky-200">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            {/* Espace réservé pour le logo */}
            <div className="w-12 h-12 rounded-lg flex items-center justify-center border-2 bg-transparent border-transparent border-none shadow-none">
              <img src="/favicon.png" alt="Logo" className="w-14 h-14 object-contain" />
            </div>
            <div>
              <h1 className="text-sky-500 opacity-100 shadow-none font-bold text-3xl bg-transparent border-transparent">
                Miang
              </h1>
              <p className="mt-2 text-cyan-600">Suivez et analysez vos dépenses quotidiennes</p>
            </div>
          </div>
          <ThemeToggle />
        </div>

        <div className="grid gap-6 mb-8">
          <ExpenseSummary expenses={expenses} />
        </div>

        <Tabs defaultValue="expenses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="expenses">Dépenses</TabsTrigger>
            <TabsTrigger value="charts">Graphiques</TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
          </TabsList>

          <TabsContent value="expenses" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="bg-cyan-400 border-transparent shadow-xl rounded-none">
                <CardHeader>
                  <CardTitle>{editingExpense ? "Modifier la dépense" : "Ajouter une dépense"}</CardTitle>
                  <CardDescription>
                    {editingExpense ? "Modifiez les détails de votre dépense" : "Enregistrez une nouvelle dépense"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ExpenseForm
                    onSubmit={(expense) => {
                      if (editingExpense) {
                        // expense is of type Expense
                        updateExpense(expense as Expense)
                      } else {
                        // expense is of type Omit<Expense, "id">
                        addExpense(expense as Omit<Expense, "id">)
                      }
                    }}
                    editingExpense={editingExpense}
                    onCancel={cancelEditing}
                  />
                </CardContent>
              </Card>

              <Card className="bg-cyan-400 border-transparent shadow-xl rounded-none">
                <CardHeader>
                  <CardTitle>Dépenses récentes</CardTitle>
                  <CardDescription>Vos dernières dépenses enregistrées</CardDescription>
                </CardHeader>
                <CardContent>
                  <ExpenseList expenses={expenses.slice(0, 5)} onEdit={startEditing} onDelete={deleteExpense} />
                </CardContent>
              </Card>
            </div>

            <Card className="bg-cyan-400 border-transparent shadow-xl rounded-none">
              <CardHeader>
                <CardTitle>Toutes les dépenses</CardTitle>
                <CardDescription>Liste complète de vos dépenses</CardDescription>
              </CardHeader>
              <CardContent>
                <ExpenseList expenses={expenses} onEdit={startEditing} onDelete={deleteExpense} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="charts">
            <ExpenseCharts expenses={expenses} />
          </TabsContent>

          <TabsContent value="settings">
            <Card className="bg-cyan-400 border-transparent rounded-none shadow-xl">
              <CardHeader>
                <CardTitle>Paramètres</CardTitle>
                <CardDescription>Configurez votre application</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Mode sombre</h3>
                    <p className="text-sm text-muted-foreground">Basculer entre le mode clair et sombre</p>
                  </div>
                  <ThemeToggle />
                </div>
                <div className="pt-4 border-t">
                  <h3 className="font-medium mb-2">Données</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Total de {expenses.length} dépense{expenses.length !== 1 ? "s" : ""} enregistrée
                    {expenses.length !== 1 ? "s" : ""}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Les données sont automatiquement sauvegardées dans votre navigateur
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
