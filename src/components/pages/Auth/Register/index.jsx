import axios from 'axios';
import { useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { link } from '../../../../linkAPI';
import { ToastAlert } from '../../../Toast';
import '../Login/style.css'

export const Register = () => {

    const [loading, setLoading] = useState(false);
    const [warn, setWarn] = useState({
        text: "",
        type: "",
        title: "",
        show: false
    });
    const [form, setForm] = useState({
        correo: "",
        password: "",
        nombre: ""
    })

    const handleInput = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const user = {
            nombre: form.nombre,
            correo: form.correo.toLowerCase(),
            password: form.password,
            rol: 'USER_ROLE'
        }

        const {ok, msg, ...rest} = await axios.post(`${link}users`, user)
        .then( resp => resp.data )
        .catch( error => error.response.data )

        if ( ok ) {
            setWarn({
                text: 'Tu registro ha sido exitoso. Nos alegra que seas parte de nosotros',
                type: "success",
                title: "Registro exitoso",
                show: true
            })
            setForm({
                correo: "",
                password: "",
                nombre: ""
            })
        } 
        if (rest.errors){
            setWarn({
                text: rest.errors[0],
                type: "danger",
                title: "Error en el registro",
                show: true
            })
        } 
        if ( !ok ) {
            setWarn({
                text: rest.errors[0].msg,
                type: "danger",
                title: "Error en el registro",
                show: true
            })
        }

    }

    return (
        <section id="login">
        <ToastAlert actions={warn} setToggle={setWarn} />
        <div className="container">
            <div className="row contenido-login">
                <div className="data">
                    <Form onSubmit={handleSubmit} style={{width:"300px"}}>
                        <div className="row">
                            <h4 className='text-primary'>Sign up</h4>
                        </div>
                        <Form.Group className="mb-1" controlId="formBasicName">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control value={form.nombre} onChange={handleInput} name='nombre' type="text" placeholder="ej. John Doe" />
                        </Form.Group>
                        <Form.Group className="mb-1" controlId="formBasicEmail">
                            <Form.Label>Correo electrónico</Form.Label>
                            <Form.Control value={form.correo} onChange={handleInput} name='correo' type="email" placeholder="ej. john@gmail.com" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control value={form.password} onChange={handleInput} name='password' type="password" placeholder="******" />
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={!form.correo || !form.password || !form.nombre}>
                            { loading ? <Spinner size='sm' animation="border" variant="light" /> : "Registrar"}
                        </Button>
                        <p>Ya tienes una cuenta? <Link to='/login'>Log in</Link></p>
                    </Form>
                </div>
            </div>
        </div>
    </section>
    )
}
