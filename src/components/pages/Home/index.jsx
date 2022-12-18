import React, { useContext, useEffect, useState } from 'react'
import { Badge, Button } from 'react-bootstrap'
import { ControlledCarousel } from '../../Carousel'
import NavbarLY from '../../Navbar'
import { ProductItem } from '../../Products/ItemProduct'
import { RiShoppingCart2Fill } from 'react-icons/ri'
import { Cart } from '../../Cart';
import './style.css'
import CartContext from '../../../Context/CartContext'
import { ToastAlert } from '../../Toast'
import axios from 'axios'
import { link } from '../../../linkAPI'
import UserContext from '../../../Context/UserContext'

export const Home = () => {

    const [products, setProducts] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [productsLength, setProductsLength] = useState(0);
    const [totalCompra, setTotalCompra] = useState(0);
    const [reload, setReload] = useState(false);
    const [alert, setAlert] = useState({
        text: "",
        title: "",
        type: "",
        show: false
    })
    const { cartItems, cleanCart } = useContext(CartContext);
    const { user } = useContext(UserContext);

    useEffect(() => {

        setTimeout(() => {
            fetch('http://localhost:3000/api/dulces')
                .then(res => res.json())
                .then(json => {
                    setProducts(json)
                })
        }, 500)

    }, [reload]);

    useEffect(() => {
        setProductsLength(
            cartItems.reduce((previous, current) => previous + current.amount, 0)
        );
        setTotalCompra(
            cartItems.reduce((previous, current) => previous + current.amount * current.precio, 0)
        )
    }, [cartItems])

    const realizarCompra = async () => {

        const compra = {
            cant: productsLength,
            total: totalCompra,
            productos: cartItems
        }

        setShowCart(false);
        cleanCart();

        const { ok, msg, ...res } = await axios.post(
            `${link}users/compra/${user._id}`,
            compra
        ).then(resp => resp.data)
            .catch(error => error.response.data);

        if (ok) {
            setAlert({
                text: "Tu compra se ha realizado de manera correcta, pronto enviaremos tus dulces",
                title: "Compra exitosa",
                type: "success",
                show: true
            })
            setReload(!reload);
        } else {
            setAlert({
                text: "No hemos podido procesar tu compra, por favor intentalo más tarde",
                title: "Error en la compra",
                type: "danger",
                show: true
            })
        }
        setTimeout(() => {
            setAlert({
                text: "",
                title: "",
                type: "",
                show: false
            })
        }, 5000)

    }


    return (
        <>
            <ToastAlert actions={alert} setToggle={setAlert} />
            <NavbarLY />
            <div className='carousel'>
                <ControlledCarousel />
            </div>
            <div className="container my-5 content-dulces text-center">
                <h1>Aquí tenemos tus <br /></h1>
                <span className='dulce'>🍬Dulces Favoritos 🍭</span>
                <div className="dulces-cont text-start">
                    {
                        products.map(item => item.stock !== 0 && <ProductItem key={item._id} product={item} />)
                    }
                </div>
            </div>
            <Button className='cart-button' variant="dark" onClick={() => setShowCart(true)}>
                <RiShoppingCart2Fill />
                {
                    productsLength !== 0 &&
                    <Badge bg="success">
                        {productsLength}
                    </Badge>
                }
            </Button>
            <Cart realizarCompra={realizarCompra} showCart={showCart} setShowCart={setShowCart} total={totalCompra} />
        </>
    )
}
