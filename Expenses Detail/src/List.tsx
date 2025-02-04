import React from 'react'
import EntryForm from './EntryForm'
import { useDataContext } from './DataContext'
import { useNavigate} from "react-router-dom"

type FormData = {
  id: number
  amount: string
  category: string
  title: string
  description: string
}

function List() {
  //entries state
  const { incomeEntries, expenseEntries, setIncomeEntries, setExpenseEntries } = useDataContext()
  const navigate = useNavigate()
  const handleSaveEntry = (newEntry: FormData) => {
    if (newEntry.category === 'Income') { //save data to income entries if its income
      setIncomeEntries([...incomeEntries, newEntry])
    } else {//same thing for expenses
      setExpenseEntries([...expenseEntries, newEntry])
    }
  }
// sum of the amount in separate list
  const incomeTotal = incomeEntries.reduce((sum, entry) => sum + parseFloat(entry.amount || '0'), 0)
  const expenseTotal = expenseEntries.reduce((sum, entry) => sum + parseFloat(entry.amount || '0'), 0)

  return (
    <div className="w-full max-w-4xl mx-auto mt-12">
      <h2 className="text-lg font-bold mb-4">Welcome</h2>

      <EntryForm
        initialData={{ id: 0, amount: '', category: 'Income', title: '', description: '' }}
        onSubmit={handleSaveEntry}
        onCancel={() => {}}
        isEditing={false}
        disableCancel={false}
      />

      <div className="flex justify-between mt-4">
        <div className="w-1/2 pr-4">
          <h3 className="text-md font-semibold mb-2">
            Income (Total: ${incomeTotal.toFixed(2)})
          </h3>
          <ul className="cursor-pointer bg-white shadow rounded-lg divide-y divide-gray-200">
            {incomeEntries.map((item) => (
              <li key={item.id} onClick={() => navigate('/expenses-detail')} className="p-4 flex justify-between items-center hover:bg-gray-100">
                {item.title} - ${item.amount}
              </li>
            ))}
          </ul>
        </div>

        <div className="w-1/2 pl-4">
          <h3 className="text-md font-semibold mb-2">
            Expenses (Total: ${expenseTotal.toFixed(2)})
          </h3>
          <ul className="cursor-pointer bg-white shadow rounded-lg divide-y divide-gray-200">
            {expenseEntries.map((item) => (
              <li key={item.id} onClick={() => navigate('/expenses-detail')} className="p-4 flex justify-between items-center hover:bg-gray-100">
                {item.title} - ${item.amount}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default List
