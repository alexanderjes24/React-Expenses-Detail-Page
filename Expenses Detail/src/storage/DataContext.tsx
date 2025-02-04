import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

type FormData = {
  id: number
  amount: string
  category: string
  title: string
  description: string
}
// Defines the structure for form entries
type DataContextType = {
  incomeEntries: FormData[]
  expenseEntries: FormData[]
  setIncomeEntries: (entries: FormData[]) => void
  setExpenseEntries: (entries: FormData[]) => void
}
//data context created
const DataContext = createContext<DataContextType | undefined>(undefined)

// Children type
type DataProviderProps = {
  children: ReactNode
}
//Data provide component
export const DataProvider = ({ children }: DataProviderProps) => {
  const [incomeEntries, setIncomeEntries] = useState<FormData[]>([])
  const [expenseEntries, setExpenseEntries] = useState<FormData[]>([])

  // Load initial data from localStorage
  useEffect(() => {
    const storedIncome = JSON.parse(localStorage.getItem('incomeEntries') || '[]')
    const storedExpenses = JSON.parse(localStorage.getItem('expenseEntries') || '[]')
    console.log('Loaded from storage:', { storedIncome, storedExpenses })
    setIncomeEntries(storedIncome)
    setExpenseEntries(storedExpenses)
  }, [])
  //save data
  useEffect(() => {
    console.log('Saving income entries to storage:', incomeEntries)
    localStorage.setItem('incomeEntries', JSON.stringify(incomeEntries))
  }, [incomeEntries])
  
  useEffect(() => {
    console.log('Saving expense entries to storage:', expenseEntries)
    localStorage.setItem('expenseEntries', JSON.stringify(expenseEntries))
  }, [expenseEntries])
  return (
    <DataContext.Provider value={{ incomeEntries, expenseEntries, setIncomeEntries, setExpenseEntries }}>
      {children}
    </DataContext.Provider>
  )
}
//Custom Hook
export const useDataContext = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider')
  }
  return context
}
