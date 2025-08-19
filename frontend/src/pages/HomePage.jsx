import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  HStack,
  IconButton,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/productStore";
export default function HomePage() {
  const { fetchProducts, products, removeProduct  } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = (id) => {
    removeProduct(id);
    fetchProducts();
  };

   const cardBg = useColorModeValue("white", "gray.800");
  const cardBorder = useColorModeValue("gray.200", "gray.700");
  const headingColor = useColorModeValue("gray.800", "gray.100");
  const priceColor = useColorModeValue("teal.600", "teal.300");

  return (
    <Container maxW="6xl" py={10}>
      <Heading mb={8} textAlign="center" color={headingColor}>
        Product List
      </Heading>

      {products.length === 0 ? (
        <Box textAlign="center" py={20}>
          <Text fontSize="xl" mb={4} color={headingColor}>
            No products found. Why not create one?
          </Text>
          <Button as={Link} to="/create" colorScheme="teal" size="lg">
            Create Product
          </Button>
        </Box>
      ) : (
        <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
          {products.map((product) => (
            <GridItem
              key={product.id}
              borderWidth="1px"
              borderRadius="xl"
              overflow="hidden"
              shadow="md"
              bg={cardBg}
              borderColor={cardBorder}
              transition="transform 0.2s, box-shadow 0.2s"
              _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
            >
              <Image
                src={product.image}
                alt={product.name}
                objectFit="cover"
                w="100%"
                h="200px"
              />
              <Box p={4}>
                <Stack spacing={2}>
                  <Heading size="md" color={headingColor}>
                    {product.name}
                  </Heading>
                  <Text fontWeight="bold" color={priceColor}>
                    ${product.price}
                  </Text>
                </Stack>

                {/* Action buttons */}
                <HStack spacing={3} mt={4}>
                  <IconButton
                    as={Link}
                    to={`/edit/${product._id}`}
                    icon={<FiEdit />}
                    aria-label="Edit Product"
                    colorScheme="blue"
                    size="sm"
                    variant="outline"
                  />
                  <IconButton
                    onClick={() => handleDelete(product?.
_id)}
                    icon={<FiTrash />}
                    aria-label="Delete Product"
                    colorScheme="red"
                    size="sm"
                    variant="outline"
                  />
                </HStack>
              </Box>
            </GridItem>
          ))}
        </Grid>
      )}
    </Container>
  );
}
