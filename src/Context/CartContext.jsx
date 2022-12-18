import { createContext, useState, useEffect } from "react";


const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState([]);

    const cleanCart = () => setCartItems([]);

    const addItemToCart = (product) => {
        const inCart = cartItems.find(
            (productInCart) => productInCart._id === product._id
        );
        if ( product.stock === 1) return false;
        
        if (inCart) {
            setCartItems(
                cartItems.map((productInCart) => {
                    if (productInCart._id === product._id) {
                        productInCart.stock = productInCart.stock - 1;
                        return { ...productInCart, amount: productInCart.amount + 1 };
                    }
                    else {
                        return productInCart;
                    }
                })
            );
        }
        else {
            product.amount = 1;
            setCartItems([...cartItems, product]);
        }

    }

    const completlyRemove = product => {

        setCartItems(
            cartItems.filter(productInCart => productInCart._id !== product._id)
        )

    }


    const deleteItemToCart = product => {
        const inCart = cartItems.find(
            (productInCart) => productInCart._id === product._id
        );

        if (inCart.amount === 1) {
            setCartItems(
                cartItems.filter(productInCart => productInCart._id !== product._id)
            )
        }

        else {
            setCartItems(
                cartItems.map((productInCart) => {
                    if (productInCart._id === product._id) {
                        return { ...inCart, amount: inCart.amount - 1, stock: inCart.stock + 1 }
                    } else return productInCart;
                }));
        }
    };

    return (
        <CartContext.Provider value={{ cleanCart, cartItems, addItemToCart, deleteItemToCart, completlyRemove }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;