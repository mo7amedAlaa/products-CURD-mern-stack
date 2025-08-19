import { create } from "zustand";

export const useProductStore = create((set) => ({
    products: [],
    loading: {
        fetch: false,
        update: false,
        add: false,
        delete: false,
    },

    setProducts: (products) => set({ products }),

    fetchProducts: async () => {
        set((state) => ({ loading: { ...state.loading, fetch: true } }));
        try {
            const res = await fetch("/api/products");
            const data = await res.json();
            set({ products: data.data });
            return { success: true, data: data.data };
        } catch (err) {
            return { success: false, message: err.message };
        } finally {
            set((state) => ({ loading: { ...state.loading, fetch: false } }));
        }
    },

    fetchProductById: async (id) => {
        set((state) => ({ loading: { ...state.loading, fetch: true } }));
        try {
            const res = await fetch(`/api/products/${id}`);
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to fetch product");
            return { success: true, data: data.data };
        } catch (err) {
            return { success: false, message: err.message };
        } finally {
            set((state) => ({ loading: { ...state.loading, fetch: false } }));
        }
    },
    addProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            return { success: false, message: "All fields are required" };
        }

        try {
            const res = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newProduct),
            });

            if (!res.ok) {
                throw new Error("Failed to add product");
            }

            const data = await res.json();
            set((state) => ({
                products: [...state.products, data.data],
            }));

            return { success: true, message: "Product added successfully" };
        } catch (err) {
            return { success: false, message: err.message };
        }
    },
    updateProduct: async (product) => {
        set((state) => ({ loading: { ...state.loading, update: true } }));
        try {
            const res = await fetch(`/api/products/${product._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(product),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to update product");

            set((state) => ({
                products: state.products.map((p) =>
                    p._id === product._id ? { ...p, ...product } : p
                ),
            }));

            return { success: true, message: "Product updated successfully" };
        } catch (err) {
            return { success: false, message: err.message };
        } finally {
            set((state) => ({ loading: { ...state.loading, update: false } }));
        }
    },
    removeProduct: async (id) => {
        const res = await fetch(`/api/products/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
    },
}));

