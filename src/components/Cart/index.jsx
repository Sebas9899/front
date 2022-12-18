import { useContext } from 'react';
import { Modal, ListGroup, Button } from 'react-bootstrap'
import CartContext from '../../Context/CartContext';
import { ItemCart } from './ItemCart';

export const Cart = ({showCart, setShowCart, total, realizarCompra}) => {

    const { cartItems } = useContext(CartContext);

    return (
        <Modal show={showCart} onHide={() => setShowCart(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Carrito - ${Number(total).toLocaleString('en')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {cartItems.length === 0 && <p>Tu carrito esta vacío</p>}
                <ListGroup variant="flush">
                    {
                        cartItems.map((item, i) => (
                            <ItemCart key={i} producto={item}/>
                        ))
                    }
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowCart(false)}>
                    Cerrar
                </Button>
                <Button disabled={cartItems.length === 0} variant="success" onClick={realizarCompra}>
                    Confirmar compra
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
