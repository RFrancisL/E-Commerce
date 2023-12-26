import { createContext, useContext, useState } from "react"
import { useEffect } from "react";
export const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext)
}
export function CarritoProvider({ children }) {
    const [carrito, setCarrito] = useState([]);

    const addToLocalStorage = (cart) => {
        localStorage.setItem('carrito', JSON.stringify(cart));
    };

    const addToCarrito = (product) => {
        const inCarrito = carrito.find((prod) => prod.id === product.id);
        
        if (inCarrito) {
            // Si el producto ya está en el carrito, actualiza la cantidad
            const updatedCarrito = carrito.map((prod) => 
                prod.id === product.id ? { ...prod, quantity: prod.quantity + 1 } : prod
            );
            setCarrito(updatedCarrito);
            addToLocalStorage(updatedCarrito);
        } else {
            // Si el producto no está en el carrito, agrégalo con cantidad 1
            const newCarrito = [...carrito, { ...product, quantity: 1 }];
            setCarrito(newCarrito);
            addToLocalStorage(newCarrito);
        }
    };
    

    const deleteToCarrito = (id) => {
        const newCarrito = carrito.filter((prod) => prod.id !== id);
        setCarrito(newCarrito);
        addToLocalStorage(newCarrito);
    };
    
    const getEmptyCarrito = () => {
        setCarrito([]);
        localStorage.removeItem('carrito');
    };

    const getTotalPrice = () => {   
        return carrito.reduce((total, prod) => total + prod.price * prod.quantity, 0);
    };

    useEffect(() => {
        const savedCarrito = localStorage.getItem('carrito');
        
        //verifico si savedCarrito es null o undefined
        if (savedCarrito) {
            try {
                setCarrito(JSON.parse(savedCarrito));
            } catch (error) {
                console.error("Error parsing carrito from localStorage:", error);
                localStorage.removeItem('carrito');
            }
        }
    }, []);

    const cartValues = {
        carrito,
        addToCarrito,
        deleteToCarrito,
        getEmptyCarrito,
        getTotalPrice,
    };

    return (
        <CartContext.Provider value={cartValues}>
            {children}
        </CartContext.Provider>
    );
}


