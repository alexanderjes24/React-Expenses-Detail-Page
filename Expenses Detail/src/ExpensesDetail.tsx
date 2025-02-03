import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

type FormData = {
  id: number
  amount: string
  category: string
  title: string
  description: string
}

function ExpensesDetailPage() {
  //State manager
  const [incomeEntries, setIncomeEntries] = useState<FormData[]>([])
  const [expenseEntries, setExpenseEntries] = useState<FormData[]>([])
  const [editingEntry, setEditingEntry] = useState<FormData | null>(null)
  const [isEditingIncome, setIsEditingIncome] = useState<boolean>(false) // Track whether editing income or expense
  const navigate = useNavigate()

  //Load data from LocalStorage
  useEffect(() => {
    const incomeList = JSON.parse(localStorage.getItem('incomeList') || '[]')
    const expensesList = JSON.parse(localStorage.getItem('expensesList') || '[]')
    setIncomeEntries(incomeList)
    setExpenseEntries(expensesList)
  }, [])
//Handle edit using State
  const handleEdit = (entry: FormData, category: string) => {
    setEditingEntry(entry)
    setIsEditingIncome(category === 'Income') //Set income to true
  }
//Save edited data
  const handleSave = () => {
    if (editingEntry) {
      if (isEditingIncome) {// If its Income
        const updatedEntries = incomeEntries.map((entry) =>
          entry.id === editingEntry.id ? editingEntry : entry
        )
        setIncomeEntries(updatedEntries)
        localStorage.setItem('incomeList', JSON.stringify(updatedEntries))
      } else { //if its Expenses
        const updatedEntries = expenseEntries.map((entry) =>
          entry.id === editingEntry.id ? editingEntry : entry
        )
        setExpenseEntries(updatedEntries)
        localStorage.setItem('expensesList', JSON.stringify(updatedEntries))
      }
      alert('Entry updated successfully!')
      setEditingEntry(null)
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto mt-10">
      <Navbar />
      <h2 className="text-2xl font-bold mb-6 text-center">All Entries</h2>

      <div className="flex gap-8">
        {/* Income Section */}
        <div className="w-1/2">
          <h3 className="text-lg font-semibold mb-4">Income</h3>
          {incomeEntries.length === 0 ? (
            <p className="text-gray-500">No income entries found.</p>
          ) : (
            <ul className="bg-white shadow rounded-lg divide-y divide-gray-200">
              {incomeEntries.map((entry) => (
                <li key={entry.id} className="p-4 hover:bg-gray-100">
                  <div>
                    <p><strong>Title:</strong> {entry.title}</p>
                    <p><strong>Amount:</strong> ${entry.amount}</p>
                    <p><strong>Description:</strong> {entry.description}</p>
                  </div>
                  <button
                    onClick={() => handleEdit(entry, 'Income')}
                    className="mr-2 mt-2 bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded focus:outline-none"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(entry.id, 'Income')}
                    className="mt-2 bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded focus:outline-none"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Expense Section */}
        <div className="w-1/2">
          <h3 className="text-lg font-semibold mb-4">Expenses</h3>
          {expenseEntries.length === 0 ? (
            <p className="text-gray-500">No expense entries found.</p>
          ) : (
            <ul className="bg-white shadow rounded-lg divide-y divide-gray-200">
              {expenseEntries.map((entry) => (
                <li key={entry.id} className="p-4 hover:bg-gray-100">
                  <div>
                    <p><strong>Title:</strong> {entry.title}</p>
                    <p><strong>Amount:</strong> ${entry.amount}</p>
                    <p><strong>Description:</strong> {entry.description}</p>
                  </div>
                  <button
                    onClick={() => handleEdit(entry, 'Expense')}
                    className="mr-2 mt-2 bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded focus:outline-none"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(entry.id, 'Expense')}
                    className="mt-2 bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded focus:outline-none"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Edit Form */}
      {editingEntry && (
        <div className="fixed inset-0 backdrop-brightness-50 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-xl font-semibold mb-4">{`Edit ${isEditingIncome ? 'Income' : 'Expense'}`}</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSave()
              }}
            >
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={editingEntry.title}
                  onChange={(e) =>
                    setEditingEntry((prev: FormData | null) => (prev ? { ...prev, title: e.target.value } : prev))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">Amount</label>
                <input
                  type="number"
                  value={editingEntry.amount}
                  onChange={(e) =>
                    setEditingEntry((prev: FormData | null) => (prev ? { ...prev, amount: e.target.value } : prev))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
                <input
                  type="text"
                  value={editingEntry.description}
                  onChange={(e) =>
                    //update the state 
                    setEditingEntry((prev: FormData | null) => (prev ? { ...prev, description: e.target.value } : prev))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded focus:outline-none"
              >
                Save Changes
              </button>
            </form>
            <button
              onClick={() => setEditingEntry(null)}
              className="mt-4 bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded focus:outline-none"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <button className='btn btn-dark' onClick={() => navigate('/home')}>back</button>
    </div>
  )

  function handleDelete(id: number, category: string) {
    if (category === 'Income') {
      const updatedEntries = incomeEntries.filter((entry) => entry.id !== id)
      setIncomeEntries(updatedEntries)
      localStorage.setItem('incomeList', JSON.stringify(updatedEntries))
    } else {
      const updatedEntries = expenseEntries.filter((entry) => entry.id !== id)
      setExpenseEntries(updatedEntries)
      localStorage.setItem('expensesList', JSON.stringify(updatedEntries))
    }

    alert('Entry deleted successfully!')
  }
}

export default ExpensesDetailPage
