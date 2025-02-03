import React from "react"
import { useNavigate } from 'react-router-dom'

type ListProps = {
  entries: {
    id: number
    amount: string
    category: string
    title: string
    description: string
  }[]
 // Accepting the prop
}

function List({ entries }: ListProps) {
  const navigate = useNavigate()
  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <h2 className="text-lg font-bold mb-4">List</h2>
      <div className="flex justify-between">

        {/* Income List */}
        <div className="w-1/2 pr-4">
          <h3 className="text-md font-semibold mb-2">Income</h3>
          <ul className="bg-white shadow rounded-lg divide-y divide-gray-200">
            {entries
              .filter((item) => item.category === "Income")
              .map((item) => (
                <li
                  key={item.id}
                  className="p-4 flex justify-between items-center hover:bg-gray-100 cursor-pointer"
                  onClick={() => navigate('/expenses-detail')}
                 // Event handler
                >
                  {item.title} - ${item.amount} ({item.category})
                </li>
              ))}
          </ul>
        </div>

        {/* Expenses List */}
        <div className="w-1/2 pl-4">
          <h3 className="text-md font-semibold mb-2">Expenses</h3>
          <ul className="bg-white shadow rounded-lg divide-y divide-gray-200">
            {entries
              .filter((item) => item.category === "Expense")
              .map((item) => (
                <li
                  key={item.id}
                  className="p-4 flex justify-between items-center hover:bg-gray-100 cursor-pointer"
                  onClick={() => navigate('/expenses-detail')} 
                  // Event handler
                >
                  {item.title} - ${item.amount} ({item.category})
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default List
