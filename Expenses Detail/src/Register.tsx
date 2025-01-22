import  React,{ useState } from "react"
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const[name,setName] = useState('')
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const nameValidator = (name:string) =>{
        const nameRegex = /^[a-zA-Z]{6,8}$/
        if (!nameRegex.test(name)){
            if (name.length < 6 || name.length >= 8){
                return "Name must be between 6 to 8 character"
            }
            return "Name cannot contain numbers or special characrers"
        }
        return '';
    }
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const errorValidator = nameValidator(name)
        if (errorValidator){
            setError(errorValidator)
        }else{
            setError('')
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