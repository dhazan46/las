import React, { useState, useEffect } from 'react';
import { Flex, Text, FormControl, FormLabel, Input, Button, useToast } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const toast = useToast();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post('http://127.0.0.1:8001/login/', { username, password });
            const token = res.data.access;
            localStorage.setItem('jwt', token);

            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            const decoded = JSON.parse(jsonPayload);
            const userName = decoded.username;
            localStorage.setItem('userName', userName);

            toast({
                title: 'התחברת בהצלחה!',
                description: `ברוך הבא, ${userName}`,
                status: 'success',
                duration: 5000,
                isClosable: true,
            });

            navigate('/');
        } catch (error) {
            console.error('Login error:', error);
            toast({
                title: 'שגיאה',
                description: 'התחברות נכשלה. בדוק את שם המשתמש והסיסמה ונסה שוב.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    useEffect(() => {
        const savedUserName = localStorage.getItem('userName');
        if (savedUserName) {
            console.log('Welcome back,', savedUserName);
        }
    }, []);

    return (
        <Flex direction="column" align="center" minHeight="100vh">
            <Flex direction="column" alignItems="center" p="4">
                <Flex alignItems="flex-start" mt="60px">
                    {/* כאן ניתן להוסיף אנימציה או תמונה לפי העדפתך */}
                    <Text fontSize="6xl" fontWeight="bold" color="#346DFC">Login</Text>
                </Flex>

                <Flex direction="column" mt="10" width="300px">
                    <FormControl>
                        <FormLabel>Username</FormLabel>
                        <Input
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </FormControl>

                    <FormControl mt="4">
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormControl>

                    <Button mt="6" colorScheme="teal" onClick={handleLogin}>Login</Button>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Login;
