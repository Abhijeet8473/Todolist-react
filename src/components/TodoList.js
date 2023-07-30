import React, {useEffect, useState} from 'react';
import CreateTask from '../modals/createTask';
import Card from './Card';

const TodoList = () => {
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([])

    useEffect(() =>{
        let arr = localStorage.getItem("taskList");
        if(arr){
            let obj = JSON.parse(arr);
            setTaskList(obj)
        }
    }, []);

    const toggle = () =>{
        setModal(!modal);
    }

    const saveTask = (taskObj) => {``
        let tempList = taskList
        tempList.push(taskObj)
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(taskList)
        setModal(false)
    }

    const deleteTask = (index) =>{
        let tempList = [...taskList]; // Create a copy of taskList to avoid directly modifying it
        tempList.splice(index, 1);
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
        window.location.reload()
    }

    const updateListArray = (obj, index) => {
        const updatedTaskList = [...taskList];
        updatedTaskList[index] = { ...updatedTaskList[index], ...obj };
        localStorage.setItem("taskList", JSON.stringify(updatedTaskList));
        setTaskList(updatedTaskList);
        window.location.reload();
    };
      
    return (
        <>
        <div className="header text-center" >
            <h3 > Todo List </h3>  
            <button className = "btn btn-primary mt-2" onClick= {() => setModal(true)}> Create Task </button> 
        </div>
        <div className="task-container">
        {taskList && taskList.map((obj, index) => (
        <Card key={`card_${index}`} taskObj={obj} index={index} deleteTask={deleteTask} updateListArray={updateListArray} />))}
        </div>
        <CreateTask toggle = {toggle} modal = {modal} save = {saveTask}/>
        </>
    );
};

export default TodoList;