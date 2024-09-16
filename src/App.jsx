import React, { useEffect, useState } from 'react'
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import Task from './components/tasks/Task.jsx';


const App = () => {
  const url = 'http://localhost:5000'
  const [data, setData] = useState({
    "task": ""
  })

  const [active, setActive] = useState(true)

  const onchangeHandle = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const fetchData = async (event) => {
    event.preventDefault();
    const response = await axios.post(`${url}/task/add`, data)
    if (response.data.success) {
      setData({
        'task': ''
      })
      toast.success(response.data.message);
      setActive(true)
    } else {
      toast.error(response.data.message);
      console.log(error)
    }
  }
  return (
    <div className='app'>
      <ToastContainer position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Zoom />

      <div className="form">
        <div className="heading">
          <h2>To-Do App</h2>
        </div>
        <form className="serch" onSubmit={fetchData}>
          <input className="form-control" type="text" placeholder="Enter a Task.." required name="task" aria-label="default input example" onChange={onchangeHandle} value={data.name} />
          <button type="submit" className="btn btn-primary">AddTask</button>
        </form>
      </div>
      <div className="task">
        <Task active={active} url={url}/>
      </div>
    </div>
  )
}

export default App
