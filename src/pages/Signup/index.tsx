import React, { useState } from 'react';
import {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBInput,
}
    from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import type { inputUser } from '../../lib/types';
import { apiSignUp } from '../../lib/api';

export function Signup() {
    const [user, setUser] = useState<inputUser>({name: '', surname: '', login: '', password: ''})
    const [error, setError] = useState<String>("")
    const navigate = useNavigate()  

    const handleSubmit = ( event:React.FormEvent<HTMLFormElement> ) => {
        event.preventDefault()
        if(!user.name.trim()){
            setError("Please fill your name")
        }else{
            setError("")
            apiSignUp(user)
            .then(response => {
                console.log(response)
                if (response.status != 'ok' && response.message) {
                    setError(response.message)
                }else{
                    navigate("/login")
                }
            })
        }
        // axios.post

    }
    return (
        <MDBContainer fluid>
            <MDBRow className='d-flex justify-content-center align-items-center'>
                <MDBCol lg='8'>
                    <MDBCard className='my-5 rounded-3' style={{ maxWidth: '600px' }}>
                        <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img3.webp' className='w-100 rounded-top' alt="Sample photo" />
                        <MDBCardBody className='px-5'>
                            <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Registration Info</h3>
                            <p>Already have an account? <Link to={'/login'}>Login Now</Link></p>
                            {error && <p style={{color:'red'}}>{error}</p>}
                            <form onSubmit={handleSubmit}>
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Name'
                                    type='text'
                                    value={user.name}
                                    onChange={event => setUser({...user, name:event.target.value})}
                                />
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Surname'
                                    type='text'
                                    value={user.surname}
                                    onChange={event => setUser({...user, surname:event.target.value})}
                                />
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Login'
                                    type='text'
                                    value={user.login}
                                    onChange={event => setUser({...user, login:event.target.value})}
                                />
                                <MDBInput
                                    wrapperClass='mb-4'
                                    label='Password'
                                    type='text'
                                    value={user.password}
                                    onChange={event => setUser({...user, password:event.target.value})}
                                />
                                <button type='submit' className='btn btn-outline-info' >Submit</button>
                            </form>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}
