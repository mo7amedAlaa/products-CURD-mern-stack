import {
  Flex,
  Box,
  HStack,
  Icon,
  Link as ChakraLink,
  Heading,
  useColorModeValue,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import { MdAddToPhotos } from "react-icons/md";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

export default function Navbar() {
  const bg = useColorModeValue("gray.100", "gray.900");
  const text = useColorModeValue("gray.800", "white");
  const hoverText = useColorModeValue("teal.600", "teal.300");

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box bg={bg} px={6} shadow="md">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        {/* Logo */}
        <Heading size="md" color={text}>
          MyShop
        </Heading>

        {/* Nav Links */}
        <HStack spacing={8} alignItems="center">
          <ChakraLink
            as={Link}
            to="/"
            fontWeight="medium"
            _hover={{ color: hoverText }}
          >
            Home
          </ChakraLink>

          <ChakraLink
            as={Link}
            to="/create"
            display="flex"
            alignItems="center"
            gap={1}
            fontWeight="medium"
            _hover={{ color: hoverText }}
          >
            Create
            <Icon as={MdAddToPhotos} boxSize={5} color="blue.400" />
          </ChakraLink>

          {/* Dark Mode Toggle */}
          <IconButton
            aria-label="Toggle dark mode"
            onClick={toggleColorMode}
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            variant="ghost"
            size="md"
          />
        </HStack>
      </Flex>
    </Box>
  );
}
