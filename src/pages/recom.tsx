import React, { useState, useEffect } from 'react';
import { Flex, Text, Container } from "@chakra-ui/react";
import axios from 'axios';

const RecommendedCourse = () => {
  const [recommendedCourse, setRecommendedCourse] = useState('');

  useEffect(() => {
    const fetchRecommendedCourse = async () => {
      try {
        const response = await axios.get('http://localhost:8001/api/recommend_course');
        setRecommendedCourse(response.data.recommended_course);
      } catch (error) {
        console.error('Error fetching recommended course:', error);
      }
    };

    fetchRecommendedCourse();
  }, []);

  return (
    <Container maxW="container.md" mt="8">
      <Flex direction="column" bg="gray.100" p="6" borderRadius="lg" boxShadow="md">
        <Text fontSize="xl" fontWeight="bold" mb="4">Recommended Course:</Text>
        <Text mb="4">{recommendedCourse}</Text>
        {/* ניתן להוסיף פרטים נוספים כמו תיאור, משך זמן ומחיר כפי שמתאים */}
      </Flex>
    </Container>
  );
};

export default RecommendedCourse;
