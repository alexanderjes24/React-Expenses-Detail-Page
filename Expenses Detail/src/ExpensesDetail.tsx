import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import EntryForm from './EntryForm'
import { useDataContext } from './DataContext'

type FormData = {
  id: number
  amount: string
  category: string
  title: string
  description: string
}

function ExpensesDetailPage() {
  const { incomeEntries, expenseEntries, setIncomeEntries, setExpenseEntries } = useDataContext()
  const [editingEntry, setEditingEntry] = useState<FormData | null>(null)
  const navigate = useNavigate()

  // Handle state of the editing entry
  const handleEdit = (entry: FormData) => {
    setEditingEntry(entry)
  }

  const handleSave = (updatedEntry: FormData) => {
    // Check if the entry moved between categories
    const isIncome = updatedEntry.category === 'Income'
    
    if (isIncome) {
      // Remove from expense list and add to income list
      setExpenseEntries(expenseEntries.filter(entry => entry.id !== updatedEntry.id))
      setIncomeEntries([...incomeEntries.filter(entry => entry.id !== updatedEntry.id), updatedEntry])
    } else {
      // Remove from income list and add to expense list
      setIncomeEntries(incomeEntries.filter(entry => entry.id !== updatedEntry.id))
      setExpenseEntries([...expenseEntries.filter(entry => entry.id !== updatedEntry.id), updatedEntry])
    }
  
    alert('Entry updated successfully!')
    setEditingEntry(null)
  }

  // Check id and delete
  const handleDelete = (id: number, category: string) => {
    if (category === 'Income') {
      const updatedEntries = incomeEntries.filter((entry) => entry.id !== id)
      setIncomeEntries(updatedEntries)
    } else {
      const updatedEntries = expenseEntries.filter((entry) => entry.id !== id)
      setExpenseEntries(updatedEntries)
    }

    alert('Entry deleted successfully!')
  }

  return (
    <div className="w-full max-w-5xl mx-auto mt-10">
      <Navbar />
      <h2 className="text-2xl font-bold mb-6 text-center">All Entries</h2>

      <div className="flex gap-8">
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
                    onClick={() => handleEdit(entry)}
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
                    onClick={() => handleEdit(entry)}
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

      {editingEntry && (
        <div className="fixed inset-0 backdrop-brightness-20 bg-opacity-50 flex justify-center items-center">
          <div className=" p-6 rounded-lg shadow-lg w-1/3">
            <EntryForm
              initialData={editingEntry}
              onSubmit={handleSave}
              onCancel={() => setEditingEntry(null)}
              isEditing={true}
              disableCancel={true}
            />
          </div>
        </div>
      )}

      <button className="btn btn-dark mt-4" onClick={() => navigate('/home')}>
        Back
      </button>
    </div>
  )
}

export default ExpensesDetailPage
