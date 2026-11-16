import { useUser, useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from 'react-router';
import { setTokenGetter } from './lib/axios';
import './index.css';

import CodePage from './pages/CodePage';
import DashBoard from "./pages/DashBoard";
import HomePage from "./pages/HomePage";
import ProblemPage from "./pages/ProblemPage";
import SessionPage from "./pages/SessionPage";
import ResumeInterviewPage from "./pages/ResumeInterviewPage";

function App() {
    const { isSignedIn, isLoaded } = useUser();
    const { getToken } = useAuth();

    useEffect(() => {
        setTokenGetter(() => getToken());

        return () => {
            setTokenGetter(null);
        };
    }, [getToken]);

    if (!isLoaded) return null;

    return (
        <>
            <Routes>
                <Route path="/" element={!isSignedIn ? <HomePage /> : <Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={isSignedIn ? <DashBoard /> : <Navigate to="/" />} />
                <Route path="/resume-interview" element={isSignedIn ? <ResumeInterviewPage /> : <Navigate to="/" />} />
                <Route path="/problems" element={isSignedIn ? <ProblemPage /> : <Navigate to="/" />} />
                <Route path="/problem/:id" element={isSignedIn ? <CodePage /> : <Navigate to="/" />} />
                <Route path="/session/:id" element={isSignedIn ? <SessionPage /> : <Navigate to="/" />} />
            </Routes>

            <Toaster />
        </>
    );
}

export default App;