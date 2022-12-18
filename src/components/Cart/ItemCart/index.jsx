import { useContext, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { IoIosRemoveCircle, IoMdAddCircle } from 'react-icons/io';
import { MdCancel } from 'react-icons/md';
import CartContext from '../../../Context/CartContext';


export const ItemCart = ({producto}) => {

    const { addItemToCart, deleteItemToCart } = useContext(CartContext);
    const [sinStock, setSinStock] = useState();
    const handleAddItem = () => {
        setSinStock(addItemToCart(producto));
    }
    const handleRemove = () => {
        setSinStock(deleteItemToCart(producto));
    }

    return (
        <ListGroup.Item style={{ display: "flex", justifyContent: "space-between" }}>
            <div><strong>{producto.amount}</strong> - {producto.nombre}</div>
            <div>
                <button onClick={handleRemove} className='btn-cart'>Eliminar <IoIosRemoveCircle color='red' /></button>
                {
                    sinStock === undefined ?
                    <button className='btn-cart' onClick={handleAddItem}>Agregar <IoMdAddCircle color='green'/></button>
                    :
                    <button className='btn-cart'>Sin stock <MdCancel color='lightgray' /></button>
                }
            </div>
            <div><p>${Number(producto.precio * producto.amount).toLocaleString('en')}</p></div>
        </ListGroup.Item>
    )
}
