import React, { createContext, useContext, useState, useEffect } from 'react';

// הגדרת סוג עבור UserContext
interface UserContextType {
    userName: string | null;
    setUserName: (name: string | null) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const useUser = () => {
    return useContext(UserContext); // פונקציה לקבלת המידע מ-Context
};

const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [userName, setUserName] = useState<string | null>(null);

    useEffect(() => {
        const savedUserName = localStorage.getItem('userName');
        if (savedUserName) {
            setUserName(savedUserName); // שחזור שם המשתמש
        }
    }, []);

    return (
        <UserContext.Provider value={{ userName, setUserName }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
