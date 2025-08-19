import {
    Button,
    Container,
    FormControl,
    FormLabel,
    Input,
    Spinner,
    useToast
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProductStore } from "../store/productStore";

export default function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { updateProduct, fetchProductById, loading } = useProductStore();

  const [form, setForm] = useState({ name: "", price: "", image: "" });
  const [loadingProduct, setLoadingProduct] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      const result = await fetchProductById(id);
      if (result.success) {
        setForm({
          name: result.data.name,
          price: result.data.price,
          image: result.data.image,
        });
      } else {
        toast({
          title: "Error",
          description: result.message,
          status: "error",
        });
        navigate("/");
      }
      setLoadingProduct(false);
    };

    loadProduct();
  }, [id, fetchProductById, toast, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(id)
    const result = await updateProduct({ _id: id, ...form });
    if (result.success) {
      toast({
        title: "Success",
        description: result.message,
        status: "success",
        duration: 3000,
      });
      navigate("/");
    } else {
      toast({
        title: "Error",
        description: result.message,
        status: "error",
        duration: 3000,
      });
    }
  };

  if (loadingProduct) {
    return (
      <Container maxW="md" py={10} textAlign="center">
        <Spinner size="xl" color="teal.500" />
      </Container>
    );
  }

  return (
    <Container maxW="md" py={10}>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel>Name</FormLabel>
          <Input name="name" value={form.name} onChange={handleChange} />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Price</FormLabel>
          <Input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel>Image URL</FormLabel>
          <Input name="image" value={form.image} onChange={handleChange} />
        </FormControl>

       <Button
  type="submit"
  colorScheme="teal"
  isFullWidth
  isDisabled={loading.update}
  leftIcon={loading.update ? <Spinner size="sm" /> : null}
>
  {loading.update ? "Updating..." : "Update Product"}
</Button>
      </form>
    </Container>
  );
}
