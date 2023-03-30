import React from 'react';
// styles
import '../styles/index.scss'

// firestore
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import store from 'Firebase/firebase.config';

// component
import AddComponent from './components/Add.component';
import ListComponent from './components/List.component';
import ConfigComponent from './components/Config.component';
import HeaderComponent from './components/Header.component';
import MsgComponent from './components/Msg.component';

// images
import HeaderDarkMobile from '../public/images/bg-mobile-dark.jpg';
import HeaderDarkDesktop from '../public/images/bg-desktop-dark.jpg'
import HeaderLightMobile from '../public/images/bg-mobile-light.jpg'
import HeaderLightDesktop from '../public/images/bg-mobile-light.jpg'
// icon
import {BiLoaderAlt} from 'react-icons/bi';


import { useState } from 'react';
import { useEffect } from 'react';



const Todo = () => {
    const [Tasks,setTasks]=useState([])
    const [TasksAll,setTaskAll]=useState([])
    const [Theme,setTheme]=useState("dark")
    const [Id,setId]=useState(null)
    const [CurrentFilter,setCurrentFilter]=useState("all")
    const [Reset,setReset]=useState(false)
    const [Loading,setLoading]=useState(true)
    useEffect(()=>{
        onSnapshot(collection(store,"tasks"),(snapshot)=>{
            let temp=[];
            snapshot.docs.forEach((doc)=>{
                temp.push({...doc.data(),id:doc.id})
            });
            setLoading(false);
            setTasks(temp);
            setTaskAll(temp)

            const completed=temp.filter((task)=>task.completed)
            let arrCompleted=[];
            completed.forEach((item)=>{
                arrCompleted.push(item.id)
            });
            setCompleted(arrCompleted)
        })
    },[])

    const setCompleted = (newId) => setId(newId);
    const changeTheme=(newTheme)=>setTheme(newTheme);
    const getAllTasks=()=>(setTasks(TaskAll),setCurrentFilter("all"))
    const getActiveTasks=(activeTasks)=>(setTasks(activeTasks),setCurrentFilter("active"))
    const getCompletedTasks=(completedTasks)=>(setTasks(completedTasks),setCurrentFilter("completed"))
    const reset = (isReset)=>setReset(isReset)
    return (
        <div>
            <img src={HeaderDarkMobile} className="img-dark-mobile" alt='mobile header dark'/>
            <img src={HeaderDarkDesktop} className="img-dark-desktop" alt='desktop header drak'/>
            <img src={HeaderLightDesktop} className="img-light-desktop" alt='desktop header light'/>
            <img src={HeaderLightMobile} className="img-light-mobile" alt='mobile header light'/>

            <div className={"content"+Theme}>
                <HeaderComponent changeTheme={changeTheme}/>
                <AddComponent countTask={Tasks.length} setReset={reset} reset={Reset}/>
                {
                    Loading?
                    <div className='loading'>
                        <h2>Loading...</h2>
                        <BiLoaderAlt className='icon-loading'/>
                    </div>
                    :null
                }
                <MsgComponent tasks={Tasks} filter={CurrentFilter} loading={Loading}/>
                <ListComponent list={Tasks} />
                <ConfigComponent
                    numTasks={Tasks.length}
                    completed={Id}
                    staticTasks={TasksAll}
                    getAll={getAllTasks}
                    getActive={getActiveTasks}
                    getCompleted={getCompletedTasks}
                    reset={Reset}
                />
            </div>
        </div>
    );
}

export default Todo;
