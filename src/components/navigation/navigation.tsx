import { Flex, Image, Text, Button } from "@chakra-ui/react";
import { NavLink, Link } from "react-router-dom";
import { useCart } from "../../providers/cartProvider"; // ייבוא נכון
import logo from "../../svg/logo.svg";
import search from "../../svg/search.svg";
import cartSvg from "../../svg/cart.svg";

const NavigationComp = (): JSX.Element => {
    const { cart } = useCart();
    const userName = localStorage.getItem('userName'); // קבלת שם המשתמש מ-Local Storage

    const navItems = [
        { name: "Home", link: "/", id: 1 },
        { name: "Teacher", link: "/teacher", id: 2 },
        { name: "Courses", link: "/shop", id: 3 },
        { name: "My Courses", link: "/cart", id: 4 },
        { name: "login", link: "/singin", id: 4 },
        
    ];

    return (
        <Flex
            w="full"
            h="60px"
            p="3"
            justifyContent="space-between"
            alignItems="center"
        >
            <Flex alignItems="center" gap="15px">
                <Link to="/">
                    <Image cursor="pointer" w="120px" src={logo} />
                </Link>

                {navItems.map((item) => (
                    <NavLink
                        key={item.id}
                        to={item.link}
                        style={({ isActive }) =>
                            isActive ? { color: "#000000", fontWeight: "bold" } : {}
                        }
                    >
                        <Text
                            fontSize="17px"
                            fontWeight="500"
                        >
                            {item.name}
                        </Text>
                    </NavLink>
                ))}
            </Flex>

            <Flex gap="10px">
                {userName && <Text>שלום 👋, {userName}!</Text>} {/* הצגת שם המשתמש */}

                <Image
                    cursor="pointer"
                    w="26px"
                    src={search}
                    display={["none", "none", "block", "block", "block"]}
                />

                <Link to="/cart">
                    <Flex position="relative">
                        <Image cursor="pointer" w="26px" src={cartSvg} />
                        {cart.length > 0 && (
                            <Flex
                                position="absolute"
                                top="-2px"
                                right="-2px"
                                bg="#F05454"
                                rounded="50%"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Text fontWeight="500" fontSize="13px">
                                    {cart.length}
                                </Text>
                            </Flex>
                        )}
                    </Flex>
                </Link>

                <Link to="/signup">
                    <Button
                        h="25px"
                        bg="transparent"
                        fontSize="17px"
                        borderLeftColor="#D9D9D9"
                        rounded="0"
                        _hover={{}}
                    >
                    </Button>
                </Link>
            </Flex>
        </Flex>
    );
};

export default NavigationComp;
