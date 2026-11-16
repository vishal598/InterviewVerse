import { useUser } from '@clerk/clerk-react';
import { useState } from 'react';
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from 'react-router';
import './index.css';

import CodePage from './pages/CodePage';
import DashBoard from "./pages/DashBoard";
import HomePage from "./pages/HomePage";
import ProblemPage from "./pages/ProblemPage";
import SessionPage from "./pages/SessionPage"
import ResumeInterviewPage from "./pages/ResumeInterviewPage"

function App() {
const [count, setCount] = useState(0)
const {isSignedIn,isLoaded}=useUser();
{/*flicker effect*/}
if(!isLoaded)return null;

  return (
    <>
    <Routes>
    <Route path="/" element={!isSignedIn?<HomePage/>:<Navigate to={"/dashboard"}/>}/>
    <Route path="/dashboard" element={isSignedIn?<DashBoard/>:<Navigate to={"/"}/>}/>
    <Route path="/resume-interview" element={isSignedIn?<ResumeInterviewPage/>:<Navigate to={"/"}/>}/>
    <Route path="/problems" element={isSignedIn?<ProblemPage/>:<Navigate to={"/"}/>}/>
    <Route path="/problem/:id" element={isSignedIn?<CodePage/>:<Navigate to={"/"}/>}/>
    <Route path="/session/:id" element={isSignedIn?<SessionPage/>:<Navigate to={"/"}/>}/>
  </Routes>
  <Toaster/>
    </>
  )
}

export default App
