import { useState, useContext, useEffect, useRef } from 'react'
import './task.css'
import { userContext } from '../../Context/userContext'
import axios from 'axios';

import { AiFillDelete } from 'react-icons/ai';


export default function Task() {
    const { token, settoken, loader, setloader } = useContext(userContext)

    const [Planned, setPlanned] = useState()
    const [listPlanned, setlistPlanned] = useState()
    const [Ongoing, setOngoing] = useState()

    const [Plannedbtn, setPlannedbtn] = useState()
    const [Completedbtn, setCompletedbtn] = useState()
    const [Ongoingbtn, setOngoingbtn] = useState()

    const [Completed, setCompleted] = useState()
    const [addtask, setaddtask] = useState()

    const descriptionRef = useRef()
    const ddescriptionRef = useRef()
    const dddescriptionRef = useRef()
    const statusRef = useRef()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            //   setloader(true)
            axios.post(`${process.env.REACT_APP_BASE_URL}/task/tasks`, {
                token: localStorage.getItem('token'),
                "userId": localStorage.getItem('id'),
                "status": "Planned"
            }
            ).then(function (response) {
                if (response.data.result == true) {
                    //console.log("Planned useEffect ");
                    setlistPlanned(response.data.response)
                    setPlanned(true)
                }
                else {
                    // setloader(false)
                    settoken(localStorage.clear('token'))
                }
            }).catch(function (error) {
                //   setloader(false)
                alert(error)
            });
        }

    }, [])


    function handlePlanned(event) {

        const style = {
            backgroundColor : "#0000ff",
            color : "#ffffff"
        }
        
        event.target.style = style

        if (localStorage.getItem('token')) {    
            setOngoing(false)
            setCompleted(false)
            //   setloader(true)
            axios.post(`${process.env.REACT_APP_BASE_URL}/task/tasks`, {
                token: localStorage.getItem('token'),
                "userId": localStorage.getItem('id'),
                "status": "Planned"
            }
            ).then(function (response) {
                if (response.data.result == true) {
                    //console.log("Planned");
                    setlistPlanned(response.data.response)
                    setPlanned(true)
                    setTimeout(() => {
                        console.log(listPlanned)
                    },2000 );
                }
                else {
                    // setloader(false)
                    settoken(localStorage.clear('token'))
                }
            }).catch(function (error) {
                //   setloader(false)
                alert(error)
            });
        }

    }

    function handleOnGoing(event) {
        
        if (localStorage.getItem('token')) {
            setPlanned(false)
            setCompleted(false)
            //   setloader(true)
            axios.post(`${process.env.REACT_APP_BASE_URL}/task/tasks`, {
                token: localStorage.getItem('token'),
                "userId": localStorage.getItem('id'),
                "status": "Ongoing"
            }
            ).then(function (response) {
                if (response.data.result == true) {
                    //console.log("ongoing");
                    setlistPlanned(response.data.response)
                    setOngoing(true)
                }
                else {
                    // setloader(false)
                    settoken(localStorage.clear('token'))
                }
            }).catch(function (error) {
                //   setloader(false)
                alert(error)
            });
        }
    }

    function handleCompleted(event) {
        if (localStorage.getItem('token')) {
            setPlanned(false)
            setOngoing(false)
            //   setloader(true)
            axios.post(`${process.env.REACT_APP_BASE_URL}/task/tasks`, {
                token: localStorage.getItem('token'),
                "userId": localStorage.getItem('id'),
                "status": "Completed"
            }
            ).then(function (response) {
                if (response.data.result == true) {
                    //console.log("Completed");
                    setlistPlanned(response.data.response)
                    setCompleted(true)
                }
                else {
                    // setloader(false)
                    settoken(localStorage.clear('token'))
                }
            }).catch(function (error) {
                //   setloader(false)
                alert(error)
            });
        }
    }

    function handleAddTask() {
        setaddtask(true)
    }

    function handleAddTaskCancel() {
        setaddtask()
    }

    function handleupdateStatus(event){
        
        if (localStorage.getItem('token')) {
            console.log(event.target.value)
            console.log(event.target.id)
            axios.put(`${process.env.REACT_APP_BASE_URL}/task/status`, {
                token: localStorage.getItem('token'),
                
                "filter":{
                    // "userId":localStorage.getItem('id'),
                    "_id":event.target.id
              },
              
              "update":{
                "status": event.target.value
              }
            }
            ).then(function (response) {
                if(response.data.result==true){
                    window.location.reload(false);
                    //console.log(response.data)
                }
            }).catch(function (error) {
                //   setloader(false)
                alert(error)
            });
        }
    }

    function handleCreateTask(event){        
        event.preventDefault()
        // alert(titleRef.current.value)
        if(localStorage.getItem('token')) {

            console.log(dddescriptionRef.current.value)

            axios.post(`${process.env.REACT_APP_BASE_URL}/task/create`, {
                token: localStorage.getItem('token'),
                "userId":localStorage.getItem('id'),
                "title":dddescriptionRef.current.value,
                "description":descriptionRef.current.value,
                "status":statusRef.current.value
            }
            ).then(function (response) {
                //console.log(response.data)
                if(response.data.result==true){
                    setaddtask()
                    window.location.reload(false)
                }
                else if(response.data.result==false){
                    alert("Something Went Wrong!")
                    window.location.reload(false);
                }
            }).catch(function (error) {
                //   setloader(false)
                alert(error)
                window.location.reload(false);
            });
        }

    }

    function handleDeleteTask(key){
        if(localStorage.getItem('token')){
            console.log("govind")
            axios.put(`${process.env.REACT_APP_BASE_URL}/task/delete`,{
                "token": localStorage.getItem('token'),
                "_id":key
            }
            ).then(function (response) {
                if(response.data.result==true){
                    window.location.reload(false);
                    //console.log(response.data)
                }
            }).catch(function (error) {
                //   setloader(false)
                alert(error)
            });
        }
    }

    function getDeleteKey(event, key){
        handleDeleteTask(key)
    }


   
    return (

       <>
           {(addtask) &&
                <div className="addtask">
                    <div className="form">
                
                            <div className="formDescription">
                                <label htmlFor="">Title</label><br />
                                <input type="text" ref={descriptionRef} />
                            </div>

                            <div className="formDescription">
                                <label htmlFor="">Description</label><br />
                                <input type="text" ref={dddescriptionRef} />
                            </div>

                            <div className='formcurrentStatus'>
                                <label htmlFor="">Current Status :</label><br />
                                <select ref={statusRef}>
                                    <option value="Planned">Planned</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Ongoing">Ongoing</option>
                                </select>
                            </div>


                            <div className="add">
                                <input type="submit" value="Add" className="addbtn" onClick={handleCreateTask}/>

                                <input type="submit" value="Cancel"
                                    className="cancelbtn" onClick={handleAddTaskCancel} />
                            </div>

                    </div>
                </div>
            }
            <div className='taskSection'>
                <div className="taskboard">
                    {localStorage.getItem('name') + "'s Task Board"}
                </div>

                <input type="submit" value="Add New Task" className="AddNewTaskBtn" onClick={handleAddTask} />

                <div className="statusSection">
                    <input type="submit" value="Planned" className='btn planned plannedbtn' onClick={handlePlanned} />

                    <input type="submit" value="Ongoing" className='btn ongoing ongoingbtn' onClick={handleOnGoing} />

                    <input type="submit" value="Completed" className='btn Completed Completedbtn' onClick={handleCompleted} />
                </div>

                {(Planned) &&
                    <div className="taskList">
                        <div className="taskListInner">
                            <hr />
                            
                                {listPlanned.map((item) =>{

                                    return(
                                            <div className="taskCard planned">

                                                    <div className='taskCardTop'>
                                                    <select id={item._id} onChange={handleupdateStatus}>
                                                        <option value="Planned">Planned</option>
                                                        <option value="Completed">Completed</option>
                                                        <option value="Ongoing">Ongoing</option>
                                                    </select>

                                                    <button className='deleteBtn'  onClick={event => getDeleteKey(event, item._id)} key={item._id}>
                                                    <AiFillDelete size={20}/>
                                                    </button>
                                                    </div>

                                                    <div className="title">{item.title}</div>
                                                    <div className="description">{item.description}</div>
                                            </div>    
                                    )
                                })} 
                        </div>
                    </div>
                }

                {(Ongoing) &&
                    <div className="ongoingList taskList">
                        <div className="taskListInner">
                        <hr />
                                {listPlanned.map((item) =>{
                                    return(
                                            <div className="taskCard ongoing" >
                                                <div className='taskCardTop'>
                                                    <select id={item._id} onChange={handleupdateStatus}>
                                                        <option value="Ongoing">Ongoing</option>
                                                        <option value="Planned">Planned</option>
                                                        <option value="Completed">Completed</option>
                                                    </select>

                                                    <button className='deleteBtn'  onClick={event => getDeleteKey(event, item._id)} key={item._id}>
                                                    <AiFillDelete size={20}/>
                                                    </button>
                                                </div>
                                                    <div className="title">{item.title}</div>
                                                    <div className="description">{item.description}</div>
                                            </div>    
                                    )
                                })} 
                        </div>
                    </div>
                }

                {(Completed) &&
                    <div className="compledtedList taskList">
                        <div className="taskListInner">
                        <hr />

                                {listPlanned.map((item) =>{

                                    return(
                                            <div className="taskCard Completed">
                                                 <div className='taskCardTop'>
                                                    <select  id={item._id} onChange={handleupdateStatus}>
                                                        <option value="Completed">Completed</option>
                                                        <option value="Planned">Planned</option>
                                                        <option value="Ongoing">Ongoing</option>
                                                    </select>
                                                    <button className='deleteBtn'  onClick={event => getDeleteKey(event, item._id)} key={item._id}>
                                                    <AiFillDelete size={20}/>
                                                    </button>
                                                </div>
                                                    <div className="title">{item.title}</div>
                                                    <div className="description">{item.description}</div>
                                            </div>    
                                    )
                                })} 
                        </div>
                    </div>
                }

            </div>
        </>
    )
}