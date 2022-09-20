import { useState,createContext,useEffect} from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import SignInUp from './Components/SignInUp/SignInUp'
import Task from './Components/Tasks/Task'
import {userContext} from './Context/userContext'
import { ThreeCircles } from 'react-loader-spinner'
import axios from 'axios';



function App() {  
  const [token, settoken] =  useState(false)
  const [loader, setloader] = useState()


  useEffect(() => {
    if (localStorage.getItem('token')) {
      setloader(true)
      axios.post(`${process.env.REACT_APP_BASE_URL}/user/verify`, {
        token: localStorage.getItem('token')
      }
      ).then(function (response) {
          if (response.data.result == true){
            setloader(false)
            // console.log(response)
            settoken(true)
          }
          else {
            setloader(true)
            settoken(localStorage.clear('token'))
          }
        }).catch(function (error) {
          setloader(true)
          alert(error)
        });

    }

  }, [])




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
          <userContext.Provider value={{token, settoken,loader,setloader}}>
            <div className="App">
              <Navbar/>

              {(!token)&&
              <SignInUp/>
              }

              {(token)&&
                <Task/>
              }
              
            </div>
          </userContext.Provider>
    }
    </>
  );
}

export default App;
