import React, { useEffect, useState } from 'react'
import { HiPencil, HiTrash } from 'react-icons/hi'
import { TbExternalLink } from 'react-icons/tb'
import { Table } from 'react-bootstrap'
import { link } from '../../../../linkAPI';

export const AdminProductos = ({setShow, setProducto, reload}) => {

    const [productos, setProductos] = useState([]);

    useEffect( () => {
        setTimeout(() => {
            fetch(`${link}dulces`)
                .then(res => res.json())
                .then(json => {
                    setProductos(json)
                })
        }, 500)
    }, [reload])

    const handleEdit = ( item ) => {
        setProducto( item );
        setShow( true )
    }

    return (
        <div>
            <Table striped bordered hover variant='dark'>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Imagen</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productos.map( (item, i) => (
                            <tr key={i}>
                                <td>{item.nombre}</td>
                                {
                                    item.descripcion ?
                                    <td>{item.descripcion}</td>
                                    :
                                    <td>No hay descripción</td>
                                }
                                <td>{Number(item.precio).toLocaleString('en')}</td>
                                <td>{item.stock}</td>
                                { item.img && <td><a href={item.img} target='_blank'><TbExternalLink /></a></td> }
                                <td>
                                    <button className='btn btn-primary' onClick={() => handleEdit( item )}><HiPencil /></button>
                                    <button className='btn btn-danger ms-2'><HiTrash /></button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    )
}
