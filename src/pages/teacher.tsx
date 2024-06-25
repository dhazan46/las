import React from 'react';
import { Flex, Box, Text } from "@chakra-ui/react";
import Lottie from 'react-lottie';
import animationData from '../lottie/anima1.json'; // אנימציית Lottie
import Navigation from '../components/navigation/navigation'; // רכיב הניווט

const TeacherHeader = (): JSX.Element => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <Flex flexDirection="column" minHeight="100vh"> {/* כיוון מעלה-מטה */}
      <Navigation /> {/* קומפוננטת הניווט */}
      
      <Flex flexDirection="column" alignItems="center"> {/* התוכן המרכזי */}
        <Flex
          mt={["25px", "65px", "20px", "20px", "20px"]}
          color="#151515"
          fontWeight="bold"
          fontSize={["45px", "65px", "80px", "110px", "110px"]}
        >
          <Text>Start earn</Text>
          <Text color="#346DFC" ml="6">money</Text>
        </Flex>

        <Text
          mt={["-25px", "-30px", "-55px", "-55px", "-55px"]}
          color="#151515"
          fontWeight="bold"
          fontSize={["45px", "65px", "85px", "120px", "120px"]}
        >
          today
        </Text>

        {/* אנימציית Lottie */}
        <Flex mt={["0px", "34px", "-10px", "-10px", "-10px"]}>
          <Lottie
            options={defaultOptions}
            height={400}
            width={600}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default TeacherHeader;
