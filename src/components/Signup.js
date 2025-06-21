import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [cred, setCred] = useState({email:"",password:""});
    const navigate = useNavigate(); 

    const auth_token = localStorage.getItem('token');
    useEffect(() => {
      if (auth_token) {
        navigate('/');
      }
    }, [auth_token,navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name:cred.name,email:cred.email,password:cred.password }),
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            localStorage.setItem('token',json.token);
            navigate('/');
        }else{
            alert('invalid credential');
        }
    }
    const onChange = (e) => {
        setCred({...cred,[e.target.name]:e.target.value});
    }

    return (
        <>
            <div className='my-4'>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name="name" value={cred.name} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name="email" value={cred.email} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" value={cred.password} onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Signup
