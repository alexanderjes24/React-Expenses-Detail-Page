import React, { useState, useEffect } from 'react'

//data form
type FormData = {
  id: number
  amount: string
  category: string
  title: string
  description: string
}

//Optinal error
type Errors = {
    amount?: string
    category?: string
    title?: string
    description?: string
  }


//for pre-existing data to edit
type EntryFormProps = {
  initialData?: FormData // Data to pre-fill for editing (optional for add mode)
  onSubmit: (data: FormData) => void // Callback to handle form submission
  onCancel: () => void // Callback to cancel editing
  isEditing: boolean // Flag to indicate if we are in editing mode
  disableCancel?: boolean// Disable option fro cancel button
}

//Entry form
function EntryForm({ initialData, onSubmit, onCancel, isEditing, disableCancel }:EntryFormProps){
  const [formData, setFormData] = useState<Omit<FormData, 'id'>>({ // exclude id
    amount: '',
    category: '',
    title: '',
    description: '',
  })

  //error state
  const [errors, setErrors] = useState<Errors>({})
  
  //side effort for editing data
  useEffect(() => {
    if (isEditing && initialData) {
      setFormData({
        amount: initialData.amount,
        category: initialData.category,
        title: initialData.title,
        description: initialData.description,
      })
    }
  }, [isEditing, initialData])

  //Validation for form
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
//handle changes in input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

// handle input and check error
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    const newItem: FormData = {
      id: isEditing ? initialData!.id : Date.now(),
      amount: parseFloat(formData.amount).toFixed(2),
      category: formData.category,
      title: formData.title,
      description: formData.description,
    }
    onSubmit(newItem) // Trigger the onSubmit callback to handle saving the entry
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
            <option value="Expense">Expense</option>
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
          <button type="submit" className="btn btn-dark w-75 mr-2">
            {isEditing ? 'Save Changes' : 'Add Entry'}
          </button>
       
          {disableCancel && (<button onClick={onCancel} className="btn btn-dark w-75">
        Cancel
      </button>)}
      </div>
      </form>
    </div>
  )
}

export default EntryForm
