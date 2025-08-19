import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  VStack,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/productStore";

export default function CreateProductPage() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const toast = useToast();
  const { addProduct } = useProductStore();

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { success, message } = await addProduct(product);

    toast({
      title: success ? "Success!" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
      position: "top",
    });

    if (success) {
      // reset form
      setProduct({
        name: "",
        price: "",
        image: "",
      });
    }
  };

  const cardBg = useColorModeValue("white", "gray.800");

  return (
    <Container maxW="lg" py={10}>
      <Box
        p={6}
        borderWidth="1px"
        borderRadius="xl"
        boxShadow="lg"
        bg={cardBg}
      >
        <Heading size="lg" textAlign="center" mb={6}>
          Create New Product
        </Heading>

        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl id="name" isRequired>
              <FormLabel>Product Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                placeholder="Enter product name"
              />
            </FormControl>

            <FormControl id="price" isRequired>
              <FormLabel>Price</FormLabel>
              <Input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder="Enter price"
              />
            </FormControl>

            <FormControl id="image" isRequired>
              <FormLabel>Image URL</FormLabel>
              <Input
                type="text"
                name="image"
                value={product.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </FormControl>

            {product.image && (
              <Image
                src={product.image}
                alt="Preview"
                boxSize="150px"
                objectFit="cover"
                borderRadius="lg"
                shadow="md"
                mt={2}
              />
            )}

            <Button colorScheme="teal" type="submit" w="full">
              Save Product
            </Button>
          </VStack>
        </form>
      </Box>
    </Container>
  );
}
