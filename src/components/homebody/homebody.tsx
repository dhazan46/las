import React from 'react';
import {
  Container,
  Flex,
  Text,
  Box,
  Image,
  Button,
  Center,
} from "@chakra-ui/react";
import { useFormik } from 'formik';
import { useCart, useCartAction } from "../../providers/cartProvider";
import { products } from "../../data/data";
import { CheckInCart } from "../../utils/checkInCart";
import mapIcon from "../../svg/map.svg";
import goldenCup from "../../svg/goldenCup.svg";
import bikerIcon from "../../svg/bikerIcon.svg";
import Card from "../../common/card";
import Questionnaire from "../../pages/Questionnaire";

interface Product {
  id: number;
  name: string;
  price: number;
  offPrice: number;
  desc: string;
  bg: string;
  image: string;
  size: number;
  color: string;
}

const HomeBody = (): JSX.Element => {
  const dispatch = useCartAction();
  const { cart } = useCart();

  const addToCart = (product: Product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const companyItems = [
    { name: "crypto", id: 1 },
    { name: "development", id: 2 },
    { name: "forex", id: 3 },
    { name: "ux/ui", id: 4 },
  ];

  const blogItems = [
    {
      title: "Introduction to Computer Science",
      desc: "Master the fundamentals of computer science, including programming, algorithms, and problem-solving.",
      icon: mapIcon,
      id: 1,
    },
    {
      title: "Data Analysis with Python",
      desc: "Learn data manipulation, visualization, and statistical analysis using Python programming language.",
      icon: goldenCup,
      id: 2,
    },
    {
      title: "Android App Development",
      desc: "Build mobile applications for Android devices, covering UI design, app architecture, and integration.",
      icon: bikerIcon,
      id: 3,
    },
  ];

  return (
    <Container maxW="container.xl">
      {/* כאן מוצגת השאלון */}
      <Questionnaire />

      <Center mt="10">
        <Text
          textAlign="center"
          fontSize={["15px", "18px"]}
          fontWeight="600"
          color="#A6A6A6"
        >
          Over 200+ trusted teachers around the world
        </Text>
      </Center>

      <Flex
        justifyContent="space-between"
        alignItems="center"
        flexDirection={["column", "row"]}
        flexWrap="wrap"
        mt="10"
      >
        {companyItems.map((item) => (
          <Text
            key={item.id}
            fontSize={["13px", "18px"]}
            fontWeight="700"
            color="#A6A6A6"
          >
            {item.name}
          </Text>
        ))}
      </Flex>

      <Text
        mt="20"
        fontWeight="bold"
        fontSize={["30px", "46px"]}
        color="#191919"
      >
        New courses
      </Text>

      <Flex
        justifyContent={["center", "center", "space-between"]}
        flexWrap="wrap"
      >
        {products.slice(-3).map((product) => (
          <Card
            key={product.id}
            rounded="22px"
            w="365px"
            h="365px"
          >
            <Flex
              w="full"
              h="236px"
              justifyContent="center"
              alignItems="center"
              bg={product.bg}
            >
              <Image w="270px" objectFit="cover" src={product.image} />
            </Flex>

            <Flex p="4" justifyContent="space-between">
              <Flex flexDirection="column">
                <Text fontWeight="700" fontSize="23px">
                  {product.name}
                </Text>
                <Text
                  fontSize="13px"
                  color="#7E7E7E"
                  w="230px"
                  overflow="hidden"
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                >
                  {product.desc}
                </Text>
              </Flex>
            </Flex>

            <Center>
              <Button
                fontSize="14px"
                border="1px solid"
                borderColor="#191919"
                rounded="8"
                h="30px"
                w="92%"
                variant="outline"
                onClick={() => addToCart(product)}
              >
                {CheckInCart(cart, product) ? "In my courses" : "Start Now"}
              </Button>
            </Center>
          </Card>
        ))}
      </Flex>
    </Container>
  );
};

export default HomeBody;
