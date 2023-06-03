// import logo from './logo.svg';
import './App.css';
import OffcanvasExample from './component/navbar/navbar';
import { useState, useEffect } from "react"
import Context from './context';
import Client from './component/client';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './component/admin/login/login';
import Panel from './component/admin/panel/panel';
const server = "http://localhost:5000/"

function App() {
  const [data, setData] = useState(false)
  const [posts , setPosts] = useState(false)
  const [currentPage , setCurrentPage] = useState(1)
  const [admin , setAdmin] = useState(false)
  
  useEffect(() => {
    fetch(server + "post/all" , {
      credentials:"include"
    })
      .then(data => data.json())
      .then(res => {
        console.log(res);
        setData(res.post)
        setPosts(res.post)
        setAdmin(res.isAdmin)
      })
  }, [])


  return (
    <Context.Provider value={{server , setCurrentPage , currentPage , admin , setAdmin , setPosts  , deleteData:setData}}>
      <Routes>
        <Route path='ses-admin' element={<Login/>} />
        <Route path='/pages/admin-panel' element={<Panel/>} />
        <Route path='/' element={(
            <>
              <Client data={posts}/>
              <OffcanvasExample data={data} setData={setPosts} style={{ zIndex: "1000" }} />
            </>
          )} />
        <Route path='*' element={<Navigate to={"/"} />} />
      </Routes>
    </Context.Provider>
  );
}



export default App;
