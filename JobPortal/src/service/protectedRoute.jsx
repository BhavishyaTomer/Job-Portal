import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem("user");
        const ParsedUser=JSON.parse(user)
        const role =ParsedUser.role
        if (role==="Job seeker") {
            navigate("/redirect");
        }
    }, []);

    return children;
};

export default ProtectedRoute;
