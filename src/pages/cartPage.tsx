import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Container, Divider, Flex, Text } from "@chakra-ui/layout";
import { Link } from "react-router-dom";
import Layout from "../layout/layout";
import { useCart, useCartAction } from "../providers/cartProvider";

const CartPage = (): JSX.Element => {
  const { cart } = useCart();
  const dispatch = useCartAction();

  const handleInc = (cartItem: any) => {
    dispatch({ type: "ADD_TO_CART", payload: cartItem });
  };

  const handleDec = (cartItem: any) => {
    dispatch({ type: "DEC_PRODUCT", payload: cartItem });
  };

  return (
    <Layout>
      <Container
        minH="70vh"
        maxW="container.xl"
        style={{ fontFamily: "ralewayBold" }}
      >
        <Text mt="8" fontSize="35px" fontWeight="600">
          Your course
        </Text>
        <Flex
          w="full"
          justifyContent="space-between"
          alignItems={["center", "center", "center", "center", "flex-start"]}
          flexDir={[
            "column-reverse",
            "column-reverse",
            "column-reverse",
            "column-reverse",
            "row",
          ]}
        >
          <Flex flexDir="column" w="full" alignItems="center">
            {cart.length ? (
              cart.map((c: any) => (
                <Link to={`/product/${c.id}`} key={c.id}>
                  <Flex
                    mt="10"
                    bg="#f8fafd"
                    shadow="sm"
                    rounded="14px"
                    w={["full", "full", "full", "900px", "900px"]}
                    h={["370px", "370px", "370px", "170px", "170px"]}
                    flexDir={["column", "column", "column", "row", "row"]}
                  >
                    <Flex
                      rounded="14"
                      bg={c.bg}
                      w={["full", "full", "full", "340px", "340px"]}
                      h={["200px", "200px", "200px", "full", "full"]}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Image
                        w={["200px", "200px", "220px", "160px", "160px"]}
                        src={c.image}
                        objectFit="cover"
                      />
                    </Flex>
                    <Flex
                      w="full"
                      justifyContent="space-between"
                      h={["150px", "150px", "150px", "auto", "auto"]}
                    >
                      <Flex
                        mb="2"
                        ml="4"
                        flexDir="column"
                        mt="2"
                        justifyContent="space-between"
                        h={["full", "full", "full", "auto", "auto"]}
                      >
                        <Flex flexDir="column">
                          <Text fontSize="25px" fontWeight="600">
                            {c.name}
                          </Text>
                          <Text
                            color="#7E7E7E"
                            mt="-1"
                            fontSize="13px"
                            w="500px"
                            display={["none", "none", "block", "block", "block"]}
                            style={{ fontFamily: "ralewayMedium" }}
                          >
                            {c.desc.slice(0, 140)}
                          </Text>
                        </Flex>
                      </Flex>
                      <Flex
                        mr="4"
                        mt="3"
                        mb="3"
                        flexDir="column"
                        alignItems="flex-end"
                        justifyContent="space-between"
                        style={{ fontFamily: "ralewayMedium" }}
                      >
                        <Text>{c.pric}</Text>
                        <Flex alignItems="center">
                          <Flex
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Flex
                              w="25px"
                              h="25px"
                              justifyContent="center"
                              alignItems="center"
                              cursor="pointer"
                              onClick={(e) => {
                                e.preventDefault();
                                handleDec(c);
                              }}
                            >
                              <Text
                                _selection={{ bg: "transparent" }}
                                fontWeight="md"
                                fontSize="22px"
                              >
                                
                              </Text>
                            </Flex>
                            <Flex
                              w="25px"
                              h="25px"
                              justifyContent="center"
                              alignItems="center"
                            >
                              <Text
                                _selection={{ bg: "transparent" }}
                                fontWeight="md"
                                fontSize="22px"
                              >
                                {c.qt}
                              </Text>
                            </Flex>
                            <Flex
                              w="25px"
                              h="25px"
                              justifyContent="center"
                              alignItems="center"
                              cursor="pointer"
                              onClick={(e) => {
                                e.preventDefault();
                                handleInc(c);
                              }}
                            >
                              <Text
                                _selection={{ bg: "transparent" }}
                                fontWeight="md"
                                fontSize="22px"
                              >
                                
                              </Text>
                            </Flex>
                          </Flex>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Flex>
                </Link>
              ))
            ) : (
              <Flex
                mt="20"
                w="full"
                alignItems="center"
                flexDir="column"
                style={{ fontFamily: "ralewayBold" }}
              >
                <Text fontSize="36px" fontWeight="700">
                  There is no active course yet !
                </Text>
                <Link to="/shop">
                  <Button
                    bg="#191919"
                    color="#f9fafd"
                    _hover={{ bg: "#363636" }}
                    _active={{ bg: "#191919" }}
                    mt="5"
                    _focus={{}}
                    w="140px"
                    style={{ fontFamily: "ralewayRegular" }}
                  >
                    go back
                  </Button>
                </Link>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Container>
    </Layout>
  );
};

export default CartPage;
