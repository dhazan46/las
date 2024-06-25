import React, { useState } from 'react';
import { useFormik } from 'formik';
import {
  Container,
  Flex,
  FormControl,
  FormLabel,
  Select,
  Button,
  Text,
} from '@chakra-ui/react';

const Questionnaire = () => {
  const [serverResponse, setServerResponse] = useState('');

  const formik = useFormik({
    initialValues: {
      interests: '',
      experienceLevel: '',
      goals: '',
      weeklyTime: '',
    },
    onSubmit: async (values) => {
      try {
        const response = await fetch('http://localhost:8001/api/recommend_course/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
        const data = await response.json();
        console.log('Received response from server:', data);
        setServerResponse(data.recommended_course); // שמירת התשובה מהשרת במשתנה state להצגה בעמוד

        // כאן תוכל להוסיף טיפול נוסף בהתאם לתשובה שקיבלת מהשרת
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
  });

  return (
    <Container maxW="container.md" mt="8">
      <Flex direction="column" bg="gray.100" p="6" borderRadius="lg" boxShadow="md">
        <form onSubmit={formik.handleSubmit}>
          <FormControl mb="4">
            <FormLabel>What are your interests?</FormLabel>
            <Select
              name="interests"
              onChange={formik.handleChange}
              value={formik.values.interests}
            >
              <option value="">Select interest</option>
              <option value="Programming">Programming</option>
              <option value="Data Science">Data Science</option>
              <option value="Design">Design</option>
              <option value="Business">Business</option>
              <option value="Language Learning">Language Learning</option>
            </Select>
          </FormControl>

          <FormControl mb="4">
            <FormLabel>What is your experience level in the subject?</FormLabel>
            <Select
              name="experienceLevel"
              onChange={formik.handleChange}
              value={formik.values.experienceLevel}
            >
              <option value="">Select experience level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </Select>
          </FormControl>

          <FormControl mb="4">
            <FormLabel>What are your goals for taking this course?</FormLabel>
            <Select
              name="goals"
              onChange={formik.handleChange}
              value={formik.values.goals}
            >
              <option value="">Select goals</option>
              <option value="Career advancement">Career advancement</option>
              <option value="Personal interest">Personal interest</option>
              <option value="Skill development">Skill development</option>
            </Select>
          </FormControl>

          <FormControl mb="4">
            <FormLabel>How much time are you willing to invest weekly?</FormLabel>
            <Select
              name="weeklyTime"
              onChange={formik.handleChange}
              value={formik.values.weeklyTime}
            >
              <option value="">Select weekly study time</option>
              <option value="Less than 5 hours">Less than 5 hours</option>
              <option value="5-10 hours">5-10 hours</option>
              <option value="More than 10 hours">More than 10 hours</option>
            </Select>
          </FormControl>

          {/* הודעת התשובה מהשרת */}
          {serverResponse && (
            <Text mt="4" fontWeight="bold">
              Recommended Course: {serverResponse}
            </Text>
          )}

          <Button type="submit" colorScheme="blue" mt="4">
            Submit
          </Button>
        </form>
      </Flex>
    </Container>
  );
};

export default Questionnaire;
