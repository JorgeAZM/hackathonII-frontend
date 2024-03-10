import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "../components/NotFound";
import Login from "./Login";
import Calendar from "./Calendar";
import Sistemas from "./Sistemas";

export default function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profesor" element={<Calendar />} />
                <Route path="/tecnico" element={<Sistemas />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}