import { configureWeb3Modal } from "./connection";
import Header from "./components/Header";
import {Routes, Route, Navigate} from "react-router-dom";
import { useState } from "react";
import RegisterName from "./components/Register";
import Hero from "./components/Hero";
import { ToastContainer } from "react-toastify";  
import Chat from "./components/Chat";
import "./output.css";


configureWeb3Modal();


function App() {
  return(
    <>
        <Header /> 
        <Routes>
          <Route path="/" element={<RegisterName />}></Route>
          <Route path="/chat" element={<Chat />}></Route>
        </Routes>
        
        <ToastContainer theme="light" hideProgressBar={true} />
    </>
  );
} 

export default App;






















// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
