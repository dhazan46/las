import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Text, Flex, Box } from "@chakra-ui/react";
import Layout from "../layout/layout";

interface Product {
    id: number;
    desc: string;
    price: string;
    videos: string;
    description: string; // הוספת שדה התיאור
}

const CryptoProductPage = (): JSX.Element => {
    const { id } = useParams<{ id?: string }>(); // קבלת ה-serial מה-URL
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        if (!id) {
            return; // אם ה-serial לא קיים, לא להמשיך
        }

        const fetchProduct = async () => {
            try {
                const token = localStorage.getItem('jwt'); // קבלת ה-token מה-localStorage
                const response = await fetch(`http://localhost:8001/api/product/${id}/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Product not found');
                }
                const data: Product = await response.json();
                setProduct(data); // הגדרת כתובת ה-URL במצב המקומי
            } catch (error) {
                console.error('Error fetching product:', error);
                setProduct(null);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) {
        return <Text>Product not found or serial does not match</Text>;
    }

    return (
        <Layout>
            <Container maxW="container.xl" mt="8">
                <Flex direction="column" alignItems="center">
                    <Text fontSize="2xl" fontWeight="bold" mb="4">{product.desc}</Text>
                    <Text fontSize="md" mb="4">{product.description}</Text> {/* הצגת התיאור */}
                    <Box mb="4">
                        <video width="560" height="315" controls>
                            <source src={product.videos} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </Box>
                </Flex>
            </Container>
        </Layout>
    );
};

export default CryptoProductPage;
