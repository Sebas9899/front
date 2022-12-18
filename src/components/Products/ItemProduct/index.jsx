import { useContext, useEffect, useState } from 'react';
import { Badge } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { RiShoppingCart2Fill } from 'react-icons/ri'
import { MdRemoveShoppingCart } from 'react-icons/md'
import CartContext from '../../../Context/CartContext';

export const ProductItem = ({ product }) => {

    const [buttonAdd, setButtonAdd] = useState(true);
    const { addItemToCart, completlyRemove, cartItems } = useContext(CartContext);

    const handleAdd = () => {
        addItemToCart( product )
    }

    const handleRemove = () => {
        completlyRemove( product )
    }

    useEffect(() => {

        const inCartItem = cartItems.find( item => item._id === product._id );
        if ( inCartItem ) {
            setButtonAdd( false );
        }
        else setButtonAdd( true );

    }, [cartItems])

    return (
        <Card style={{ width: '100%' }}>
            <Card.Img style={{height:"100px", height:" 250px", objectFit: "cover", objectPosition: "top"}} variant="top" src={product.img} />
            <Card.Body>
                <Badge bg="success">
                    $ {Number(product.precio).toLocaleString('en')}
                </Badge>{' '}
                {
                    product.stock < 3 &&
                    <Badge bg="danger">
                        Ultimas unidades
                    </Badge>
                }
                <Card.Title>{product.nombre}</Card.Title>
                {
                    buttonAdd ?
                    <Button onClick={handleAdd} variant="primary">Agregar <RiShoppingCart2Fill /></Button>
                    :
                    <Button onClick={handleRemove} variant="secondary">Quitar <MdRemoveShoppingCart /></Button>
                }
            </Card.Body>
        </Card>
    );
}