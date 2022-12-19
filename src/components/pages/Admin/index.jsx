import NavbarAdminLY from '../../NavbarAdmin';
import { AdminProductos } from './Productos';
import { BsBagPlusFill } from 'react-icons/bs';
import { useState } from 'react';
import './style.css';
import { AddProduct } from './Modals/AddProduct';
import { EditProduct } from './Modals/EditProduct';

export const Admin = () => {
    
    const [showAgregar, setShowAgregar] = useState(false);
    const [showEditar, setShowEditar] = useState(false);
    const [productoEdited, setProductoEdited] = useState({});
    const [reload, setReload] = useState(false);

    return (
        <section id='admin'>
            <NavbarAdminLY />
            <div className="container mt-5">
                <button className='btn btn-primary mb-5' onClick={() => setShowAgregar( true )}>Agregar <BsBagPlusFill /></button>
                <AdminProductos reload={reload} setShow={setShowEditar} setProducto={setProductoEdited}/>
            </div>
            <AddProduct reload={reload} setReload={setReload} show={showAgregar} setShow={setShowAgregar} />
            <EditProduct reload={reload} setReload={setReload} show={showEditar} setShow={setShowEditar} producto={productoEdited}/>
        </section>
    )
}
