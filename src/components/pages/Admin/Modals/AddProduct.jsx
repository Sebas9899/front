import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { uploadImage } from '../../../../helpers/handleImage';
import { link } from '../../../../linkAPI';
import { ToastAlert } from '../../../Toast';

export const AddProduct = ({ show, setShow, reload, setReload }) => {

    const handleClose = () => setShow(false);
    const [loading, setLoading] = useState(false);
    const [warn, setWarn] = useState({
        text: "",
        type: "",
        title: "",
        show: false
    });
    const [img, setImg] = useState("");
    const [inputs, setInputs] = useState
    ({
        nombre: "",
        descripcion: "",
        precio: "",
        stock: ""
    })
    const handleInputs = e => {
        setInputs({
            ...inputs,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async () => {

        const myData= inputs;
        setLoading( true );

        if ( !!img ) {
            const { data, status } = await uploadImage( img );
            if ( status === 200 ) {
                myData.img = data.secure_url;
            }
        };

        const { ok, msg, ...rest} = await axios.post(`${link}dulces`, myData)
        .then( resp => resp.data )
        .catch( error => error.response.data )

        if ( ok ) {
            setWarn({
                text: msg,
                type: "success",
                title: "Creación exitosa",
                show: true
            })
            setInputs
            ({
                nombre: "",
                descripcion: "",
                precio: "",
                stock: ""
            })
        }
        else {
            setWarn({
                text: "Hubo un fallo en la creación",
                type: "danger",
                title: "Error",
                show: true
            })
        }

        setLoading( false );
        setReload( !reload );

    }

    useEffect(() => {
        setInputs
        ({
            nombre: "",
            descripcion: "",
            precio: "",
            stock: ""
        })
    }, [show])

    return (
        <>
            <Modal show={show} onHide={handleClose} animation={false}>
                <ToastAlert actions={warn} setToggle={setWarn} />
                <Modal.Header closeButton>
                    <Modal.Title>Agregar producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form> 
                        <div className="row mx-1 mb-3">
                            <Form.Control value={inputs.nombre} onChange={handleInputs} name='nombre' className='col' type="text" placeholder="Nombre" />
                            <Form.Control value={inputs.precio} onChange={handleInputs} name='precio' className='col ms-1' type="number" placeholder="Precio" />
                        </div>

                        <Form.Control value={inputs.descripcion} onChange={handleInputs} name='descripcion' className='mb-3' type="text" placeholder="Descripción" />
                        <div className="row mx-1 mb-3">
                            <Form.Control value={inputs.stock} onChange={handleInputs} name='stock' className='col' type="text" placeholder="Stock" />
                            <Form.Control onChange={e => setImg( e.target.files[0]) } className='col ms-1' type="file" />
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {
                        loading ? 
                        <Button variant="primary" disabled>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                        Loading...
                      </Button>
                      :
                        <Button variant="primary" onClick={handleSubmit}
                        disabled={!inputs.nombre ||!inputs.stock ||!inputs.precio}
                        >
                            Agregar
                        </Button>
                    }
                </Modal.Footer>
            </Modal>
        </>
    );
}