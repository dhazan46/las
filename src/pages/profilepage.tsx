import React, { useState, useEffect } from 'react';
import {
  Flex,
  Box,
  Text,
  Image,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
} from '@chakra-ui/react';

const ProfilePage = () => {
  const [username, setUsername] = useState(''); // שם משתמש בדוגמה
  const [email, setEmail] = useState('johndoe@example.com'); // כתובת דוא"ל בדוגמה
  const [editMode, setEditMode] = useState(false); // מצב עריכה למידע המשתמש

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleSave = () => {
    // לשמור את השינויים במצב עריכה
    setEditMode(false);
    // כאן יש לשלוח את המידע לשרת או לאכסן בצד לקוח
  };

  const handleLogout = () => {
    localStorage.removeItem('username'); // מחיקת שם המשתמש מה-Local Storage
    setUsername(''); // איפוס שם המשתמש בסטייט המקומי
    // ניתן להפנות לדף ההתחברות או לעמוד אחר בהתאם לדרישות האפליקציה
    window.location.href = '/login'; // לדוגמה, הפנייה לדף ההתחברות
  };

  return (
    <Flex flexDirection="column" alignItems="center" mt="8">
      <Box maxW="500px" w="full" p="4" bg="white" shadow="md" rounded="lg">
        <Flex justifyContent="space-between" alignItems="center" mb="4">
          <Text fontSize="2xl" fontWeight="bold">
            My Profile
          </Text>
          {!editMode && (
            <Button onClick={() => setEditMode(true)} colorScheme="blue">
              Edit
            </Button>
          )}
        </Flex>
        <Flex justifyContent="center" mb="4">
          <Image
            src="https://bit.ly/sage-adebayo"
            alt="Profile Picture"
            boxSize="150px"
            objectFit="cover"
            rounded="full"
          />
        </Flex>
        <FormControl mb="4">
          <FormLabel>Username</FormLabel>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            isDisabled={!editMode}
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isDisabled={!editMode}
          />
          <FormHelperText>We'll never share your email.</FormHelperText>
        </FormControl>
        {editMode && (
          <Flex justifyContent="flex-end">
            <Button onClick={handleSave} colorScheme="green" mr="2">
              Save
            </Button>
            <Button onClick={() => setEditMode(false)} colorScheme="red">
              Cancel
            </Button>
          </Flex>
        )}
        {username && (
          <Flex justifyContent="flex-end" mt="4">
            <Button onClick={handleLogout} colorScheme="gray">
              Logout
            </Button>
          </Flex>
        )}
      </Box>
    </Flex>
  );
};

export default ProfilePage;
