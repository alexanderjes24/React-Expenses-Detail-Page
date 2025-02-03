import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import List from './List'

//data from form
type FormData = {
  id: number
  amount: string
  category: string
  title: string
  description: string
}

//error
type Errors = {
  amount?: string
  category?: string
  title?: string
  description?: string
}

function Home() {
  const [formData, setFormData] = useState<Omit<FormData, 'id'>>({
    amount: '',
    category: '',
    title: '',
    description: '',
  })

  const [errors, setErrors] = useState<Errors>({})
  const [entries, setEntries] = useState<FormData[]>([])

  //Load entries from localStorage 
  useEffect(() => {
    const savedIncomeList = localStorage.getItem('incomeList')
    const savedExpensesList = localStorage.getItem('expensesList')
    
    const allEntries: FormData[] = []
    //Add entries to the array
    if (savedIncomeList) {
      allEntries.push(...JSON.parse(savedIncomeList)) 
    }
    if (savedExpensesList) {
      allEntries.push(...JSON.parse(savedExpensesList))
    }

    setEntries(allEntries)
  }, [])

  //Error validation
  const validateForm = () => {
    let validationErrors: Errors = {}

    if (!formData.amount || !/^\d+(\.\d{1,2})?$/.test(formData.amount)) {
      validationErrors.amount = 'Amount must be a valid number with up to two decimal places.'
    }

    if (!formData.category) {
      validationErrors.category = 'Please select a category.'
    }

    if (!formData.title || formData.title.length > 30) {
      validationErrors.title = 'Title is required and must not exceed 30 characters.'
    }

    if (!formData.description || formData.description.length > 150) {
      validationErrors.description = 'Description is required and must not exceed 150 characters.'
    }
//Update error state
    setErrors(validationErrors)
    //Return validation status
    return Object.keys(validationErrors).length === 0
  }

  //handle input changes and updata value
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

//Handle info submit in the form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    //Validation checker
    if (!validateForm()) return
  //create new entry
    const newItem: FormData = {
      id: Date.now(),
      amount: parseFloat(formData.amount).toFixed(2),
      category: formData.category,
      title: formData.title,
      description: formData.description,
    }
  //Update state for entries
    const updatedEntries = [...entries, newItem]
    setEntries(updatedEntries)
  
    //Update localStorage independently for each category
    if (formData.category === 'Income') {
      const incomeList = updatedEntries.filter(item => item.category === 'Income')
      localStorage.setItem('incomeList', JSON.stringify(incomeList))
    } else if (formData.category === 'Expense') {
      const expensesList = updatedEntries.filter(item => item.category === 'Expense')
      localStorage.setItem('expensesList', JSON.stringify(expensesList))
    }
  //Reset form and error
    setFormData({
      amount: '',
      category: '',
      title: '',
      description: '',
    })
    setErrors({})
  }


  return (
    <>
      <Navbar />
      <div className="m-12 text-center">
        <h1 className="text-green-950">Welcome!</h1>
      </div>
      {/* Input Form */}
      <div className="w-full max-w-md mx-auto">
      <form
          className="bg-white shadow-2xl rounded-lg px-10 pt-10 pb-10 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-6">
            <label htmlFor="amount" className="block text-gray-700 text-sm font-bold mb-2">
              Amount (e.g., 10.50):
            </label>
            <input
              type="text"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              placeholder="Enter amount"
              className={`form-control ${
                errors.amount ? 'is-invalid' : ''}`}
            />
            {errors.amount && <p className="text-danger">{errors.amount}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">
              Category:
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-md ${
                errors.category ? 'border-red-500' : 'border-gray-300'
              } text-gray-700 focus:outline-none`}>
              <option value="" disabled>
                Select a category
              </option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option> {/* Changed to Expense */}
            </select>
            {errors.category && <p className="text-danger">{errors.category}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter title"
              className={`form-control ${
                errors.title ? 'is-invalid' : ''}`}
            />
            {errors.title && <p className="text-danger">{errors.title}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter description"
              className={`form-control ${
                errors.description ? 'is-invalid' : ''}`}
            ></textarea>
            {errors.description && <p className="text-danger">{errors.description}</p>}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="btn btn-dark w-75"
            >
              Add Entry
            </button>
          </div>
        </form>
      </div>

      {/* List of Entries */}
      <List entries={entries}/>
    </>
  )
}

export default Home
