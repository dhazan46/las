import {
  Container,
  Divider,
  Flex,
  Image,
  Select,
  Text,
  Button,
  Center,
} from "@chakra-ui/react";
import { useCartAction, useCart } from "../providers/cartProvider";
import { Link } from "react-router-dom";
import Card from "../common/card";
import { products } from "../data/data";
import Layout from "../layout/layout";
import { CheckInCart } from "../utils/checkInCart";

// הגדרת סוג המוצר (Product interface)
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

const ShopPage = (): JSX.Element => {
  const dispatch = useCartAction(); // יוזמת פעולה על העגלה
  const { cart } = useCart(); // קבלת מצב העגלה

  // הגדרת סוג לפרמטר 'product'
  const addToCart = (product: Product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <Layout>
      <Container maxW="container.xl">
        <Flex mt="10" justifyContent="space-between">
          <Flex flexDirection="column">
            <Text
              fontSize={["27px", "27px", "35px", "35px", "35px"]}
              fontWeight="600"
              color="#191919"
            >
              Find your favorite course 🔍
            </Text>
            <Text
              fontSize={["14px", "15px", "17px", "17px", "17px"]}
              color="#7E7E7E"
            >
              Your profession could be 🤖.
            </Text>
          </Flex>

          <Select
            w="230px"
            h="30px"
            fontSize="15px"
            placeholder="Select option"
            style={{ fontFamily: "ralewayMedium" }}
          >
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
          </Select>
        </Flex>

        <Divider mt="8" mb="8" borderColor="#E3E3E3" />

        <Flex justifyContent={["center", "center", "center", "space-between"]} flexWrap="wrap">
          {products.map((product) => (
            <Card
              key={product.id} // מיקום 'key' למניעת בעיות
              flexDir="column"
              w="365px"
              h="365px"
              boxShadow="sm"
            >
              <Flex
                w="full"
                h="236px"
                rounded="22px"
                justifyContent="center"
                alignItems="center"
                bg={product.bg}
              >
                <Image w="270px" objectFit="cover" src={product.image} />
              </Flex>

              <Link to={`/course/${product.id}`}> {/* שימוש בנתיב URL ללא 'state' */}
                <Flex p="4" justifyContent="space-between">
                  <Flex flexDir="column">
                    <Text
                      fontWeight="700"
                      fontSize="23px"
                      color="#191919"
                    >
                      {product.name}
                    </Text>
                    <Text
                      fontSize="13px"
                      color="#7E7E7E"
                      overflow="hidden"
                      whiteSpace="nowrap"
                      textOverflow="ellipsis"
                    >
                      {product.desc}
                    </Text>
                  </Flex>
                </Flex>
              </Link>

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
                  {CheckInCart(cart, product) ? "In my courses" : "start now"}
                </Button>
              </Center>
            </Card>
          ))}
        </Flex>
      </Container>
    </Layout>
  );
};

export default ShopPage; // היצוא של הקומפוננטה
