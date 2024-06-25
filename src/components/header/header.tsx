import React, { useState, useEffect } from 'react';
import { Flex, Text } from "@chakra-ui/react";
import animationData from '../../lottie/stu.json'; 
import Lottie from 'react-lottie';
import axios from 'axios';

const Header = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('http://127.0.0.1:8001/api/user/profile/', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setUsername(response.data.username);
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      }
    };

    fetchProfile();
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <Flex flexDirection="column" alignItems="center">
      <Flex
        mt={["25px", "65px", "20px", "20px", "20px"]}
        color="#151515"
        fontWeight="bold"
        fontSize={["45px", "65px", "80px", "110px", "110px"]}
      >
        <Text>Start learn</Text>
        <Text color="#346DFC" ml="6">profession</Text>
      </Flex>

      <Text
        mt={["-25px", "-30px", "-55px", "-55px", "-55px"]}
        color="#346DFC"
        fontWeight="bold"
        fontSize={["45px", "65px", "85px", "120px", "120px"]}
      >
        today
      </Text>

      {username && (
        <Text mt="4" fontSize="20px" color="#346DFC">
          שלום, {username}
        </Text>
      )}

      <Flex mt={["0px", "34px", "-10px", "-10px", "-10px"]}>
        <Lottie
          options={defaultOptions}
          height={400} // גובה, לשנות לפי הצורך
          width={600}  // רוחב, לשנות לפי הצורך
        />
      </Flex>
    </Flex>
  );
};

export default Header;
