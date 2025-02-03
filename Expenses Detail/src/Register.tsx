import  React,{ useState } from "react"
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const[name,setName] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    
    // validation
    const nameValidator = (name:string) =>{
        if (name.trim()===''){
            return 'Name cannot be empty'
        }
        const nameRegex = /^[a-zA-Z]+$/ // Only letters allowed
        if (!nameRegex.test(name)) {
            return 'Name cannot contain numbers or special characters'
        }
        if (name.length < 6 || name.length > 8) { //Must be more than 6 characters and less than 8
            return 'Name must be between 6 to 8 characters'
          }
        return ''
    }

    //handle submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const errorValidator = nameValidator(name)
        if (errorValidator){
            setError(errorValidator) //Checking Error
        }else{
             //go to Home Page
            navigate('/home')

        }

    }
    return (

    <div className="Register">
        <h1>Hi There!</h1>
        <p>Welcome to practical project!<br/>
        Kindly insert your username to continue</p>

        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input 
                type="text" 
                className={`form-control ${error ? 'is-invalid' : ''} w-75`} 
                id="nameInput" 
                placeholder="Username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
                {error && <small className="text-danger">{error}</small>}
            </div>
            <button type="submit" className="btn btn-dark w-75">Let's Go!</button>
        </form>
    </div>
  )
}

export default Register