import './SignInUp.css'
import { useState, useRef, useContext } from 'react'
import axios from 'axios'
import { ThreeCircles } from 'react-loader-spinner'
import {userContext} from '../../Context/userContext'



export default function Login() {
    const [loader, setloader] = useState(false)
    const { token, settoken } = useContext(userContext)

    const [ResMessage, setresMessage] = useState('')

    const [view, setview] = useState(true)
    const [login, setlogin] = useState("Not Logged in")

    const numberRef = useRef()
    const passwordRef = useRef()




    function handleLogin(event) {
        event.preventDefault();
        if (numberRef.current.value === '' || passwordRef.current.value === '') {
            alert("please enter phone number and password")
        }
        else {
            setloader(true)
            axios.post(`${process.env.REACT_APP_BASE_URL}/user/login`, {
                mobNumber: numberRef.current.value,
                password: passwordRef.current.value
            }
            ).then(function (response) {
                    // console.log(response)
                    if (response.data.result == true) {
                        settoken(true)
                        setloader(false)
                        localStorage.setItem('token', response.data.token);
                        localStorage.setItem('name', response.data.name);
                        localStorage.setItem('id', response.data.id);

                    }
                    else {
                        setloader(false)
                        setresMessage(response.data.message + ".");
                        setTimeout(() => {
                            setresMessage('')
                        }, 2000);
                    }
                })
                .catch(function (error) {
                    setloader(false)
                    alert(error)
                });


        }
    }
    const regMobNumber = useRef()
    const regName = useRef()
    const regPassword = useRef()


    function handleRegister(e) {
        e.preventDefault()
        if (regName.current.value === '' || regMobNumber.current.value === '' || regPassword.current.value === '') {
            alert("please enter phone number and password")
        }
        else {
            setloader(true)
            axios.post(`${process.env.REACT_APP_BASE_URL}/user/register`, {
                name: regName.current.value,
                mobNumber: regMobNumber.current.value,
                password: regPassword.current.value
            }
            )
                .then(function (response) {
                    console.log(response)
                    if (response.data.result == true) {
                        settoken(true)
                        setloader(false)
                        localStorage.setItem('token', response.data.token);
                        localStorage.setItem('id', response.data.id);
                        localStorage.setItem('name', response.data.name);
                    }
                    else {
                        setloader(false)
                        setresMessage(response.data.message + ".")
                        setTimeout(() => {
                            setresMessage('')
                        }, 2000);
                    }

                })
                .catch(function (error) {
                    setloader(false)
                    alert(error)
                });
        }

    }



    return (
        <>
            {(loader) &&
                <div className="loader">
                    <div className="loaderElement">
                        <ThreeCircles
                            height="100"
                            width="100"
                            color="#0000ff"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                            ariaLabel="three-circles-rotating"
                            outerCircleColor=""
                            innerCircleColor=""
                            middleCircleColor=""
                        />
                    </div>
                </div>
            }

            {(!loader)&&
            <>
            {(view) &&
                <div className='loginWrapper'>
                    <div className="headline">
                        Sign In to GTask
                    </div>
                    <div className='ResMessage'>{ResMessage}</div>
                    
                                           
                    <input type="number" className="passwordField" placeholder='Enter phone number' required={true} ref={numberRef} />
                
                    <input type="password" className="passwordField" placeholder='Enter the Password' required={true} ref={passwordRef} />

                    <button className="loginBtn" onClick={handleLogin}>Login</button>
                    <div className='line'>Or</div>
                    <button className="loginBtn registerBtn" onClick={() => setview(false)}>Register</button>
                </div>
            }


            {(!view) &&
                <div className='loginWrapper'>

                    <form onSubmit={handleRegister}>

                        <div className="headline">
                            SignUp to GTask
                        </div>

                        <div className='ResMessage'>{ResMessage}</div>

                    
                            <input type="number" className="passwordField" placeholder='Enter phone number' required={true} ref={regMobNumber} />
                


                        <input type="text" className="passwordField fullName" placeholder='Enter Your Full Name' required={true} ref={regName} />

                        <input type="password" className="passwordField" placeholder='Enter the Password' required={true} ref={regPassword} />

                        <button className="loginBtn" >Register</button>

                    </form>

                    <div className='line'>Or</div>
                    <button className="loginBtn registerBtn" onClick={() => setview(true)}>Login</button>

                </div>
            }
            </>
            } 


        </>
    )
}


