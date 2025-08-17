"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { type Expense, CATEGORIES } from "@/types/expense"

interface ExpenseFormProps {
  onSubmit: (expense: Omit<Expense, "id"> | Expense) => void
  editingExpense?: Expense | null
  onCancel?: () => void
}

export function ExpenseForm({ onSubmit, editingExpense, onCancel }: ExpenseFormProps) {
  const [name, setName] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState<string>("")
  const [date, setDate] = useState("")

  // Remplit le formulaire avec les données de la dépense en cours d'édition
  useEffect(() => {
    if (editingExpense) {
      setName(editingExpense.name)
      setAmount(editingExpense.amount.toString())
      setCategory(editingExpense.category)
      setDate(editingExpense.date)
    } else {
      // Réinitialise le formulaire pour un nouvel ajout
      setName("")
      setAmount("")
      setCategory("")
      setDate(new Date().toISOString().split("T")[0])
    }
  }, [editingExpense])

  // Définit la date par défaut à aujourd'hui pour les nouvelles dépenses
  useEffect(() => {
    if (!editingExpense) {
      setDate(new Date().toISOString().split("T")[0])
    }
  }, [editingExpense])

  // Gère la soumission du formulaire (ajout ou modification)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !amount || !category || !date) {
      return
    }

    const expenseData = {
      name,
      amount: Number.parseFloat(amount),
      category: category as Expense["category"],
      date,
    }

    if (editingExpense) {
      onSubmit({ ...expenseData, id: editingExpense.id })
    } else {
      onSubmit(expenseData)
      // Réinitialise le formulaire après ajout réussi
      setName("")
      setAmount("")
      setCategory("")
      setDate(new Date().toISOString().split("T")[0])
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nom de la dépense</Label>
        <Input
          className="border-sky-300 shadow-xl"
          id="name"
          type="text"
          placeholder="Ex: Courses, Essence, Restaurant..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">Montant (F CFA)</Label>
        <Input
          className="border-sky-300 shadow-xl"
          id="amount"
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>

      <div className="border-transparent shadow-none">
        <Label htmlFor="category">Catégorie</Label>
        <Select value={category} onValueChange={setCategory} required>
          <SelectTrigger className="shadow-xl border-transparent">
            <SelectValue placeholder="Sélectionnez une catégorie" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="date">Date</Label>
        <Input
          className="border-sky-300 shadow-xl"
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <div className="flex gap-2">
        <Button type="submit" className="flex-1 bg-sky-500">
          {editingExpense ? "Modifier" : "Ajouter"}
        </Button>
        {editingExpense && onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Annuler
          </Button>
        )}
      </div>
    </form>
  )
}
