import React, { useState } from 'react';
import { Flex, Text, FormControl, FormLabel, Input, Button, Divider, Link } from "@chakra-ui/react";
import Lottie from 'react-lottie';
import animationData from '../lottie/sing.json';
import Navigation from '../components/navigation/navigation';
import { FaGoogle, FaFacebook, FaApple } from 'react-icons/fa'; // אייקונים לשירותים חיצוניים
import axios from 'axios';

const TeacherHeader = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const MY_SERVER = "http://127.0.0.1:8001/register";

    const handleRegister = () => {
        axios.post(MY_SERVER, { username, password, email })
            .then(res => console.log("Register done"))
            .catch(err => console.error("Registration error:", err)); // טיפול בשגיאות
    };

    return (
        <Flex flexDirection="column" minHeight="100vh">
            <Navigation />

            <Flex flexDirection="row" justifyContent="space-between" alignItems="center" p="4">
                <Flex alignItems="flex-start" mt="60px">
                    <Lottie options={{ loop: true, autoplay: true, animationData }} height={500} width={500} />
                </Flex>

                <Flex flexDirection="column" alignItems="flex-start">
                    <Flex
                        mt={["5px", "25px", "10px", "10px", "10px"]}
                        color="#151515"
                        fontWeight="bold"
                        fontSize={["35px", "45px", "60px", "90px", "90px"]}
                    >
                        <Text>Create</Text>
                        <Text color="#346DFC" ml="6">Account</Text>
                    </Flex>

                    {/* כפתורי שירותים חיצוניים */}
                    <Flex flexDirection="column" mt="10">
                        <Flex mb="6" justifyContent="space-between" width="100%">
                            <Button
                                leftIcon={<FaGoogle />}
                                colorScheme="red"
                                variant="outline"
                                w="full"
                                mr="2"
                            >
                                Sign up with Google
                            </Button>
                            <Button
                                leftIcon={<FaFacebook />}
                                colorScheme="facebook"
                                variant="outline"
                                w="full"
                                mr="2"
                            >
                                Sign up with Facebook
                            </Button>
                            <Button
                                leftIcon={<FaApple />}
                                colorScheme="blackAlpha"
                                variant="outline"
                                w="full"
                            >
                                Sign up with Apple
                            </Button>
                        </Flex>

                        <Divider my="6" />

                        {/* שדות טופס ההרשמה */}
                        <FormControl>
                            <FormLabel>Username</FormLabel>
                            <Input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </FormControl>

                        <FormControl mt="4">
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>

                        <FormControl mt="4">
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>

                        <Button
                            mt="6"
                            colorScheme="teal"
                            w="full"
                            onClick={handleRegister} // חשוב! מפעיל את פונקציית ההרשמה
                        >
                            Sign Up
                        </Button>

                        <Text mt="4">
                            Already have an account? <Link color="blue.500" href="/singin">Login here</Link>
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default TeacherHeader;
