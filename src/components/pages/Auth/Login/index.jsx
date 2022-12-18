import axios from 'axios';
import { useContext, useState } from 'react'
import { Button, Form, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import UserContext from '../../../../Context/UserContext';
import { link } from '../../../../linkAPI';
import { ToastAlert } from '../../../Toast';
import './style.css'

export const Login = () => {

    const { validateUser, user } = useContext(UserContext);

    const [loading, setLoading] = useState(false);
    const [warn, setWarn] = useState({
        text: "",
        type: "",
        title: "",
        show: false
    });
    const [form, setForm] = useState({
        correo: "",
        password: ""
    })
    const navigate = useNavigate();

    // Funciones
    const handleInput = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading( true );
        
        const { ok, msg, ...res } = await axios.post(`${link}auth/login`, {correo: form.correo, password: form.password})
        .then(({data}) => data )
        .catch(error => error.response.data )

        setLoading( false );

        if ( !ok ) {
            setWarn({
                text: msg,
                type: "danger",
                title: "Error al iniciar sesión",
                show: true
            })
        } else {
            setForm({
                correo: "",
                password: ""
            });
            localStorage.setItem("dulce-token", res.token);
            await validateUser();
            navigate('/')
        }
    }

    return (
        <section id="login">
            <ToastAlert actions={warn} setToggle={setWarn} />
            <div className="container">
                <div className="row contenido-login">
                    <div className="data">
                        <Form onSubmit={handleSubmit}>
                            <div className="row">
                                <h4 className='text-primary'>Log in</h4>
                            </div>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Correo electrónico</Form.Label>
                                <Form.Control value={form.correo} onChange={handleInput} name='correo' type="email" placeholder="ej. john@gmail.com" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control value={form.password} onChange={handleInput} name='password' type="password" placeholder="******" />
                            </Form.Group>
                            <Button variant="primary" type="submit" disabled={!form.correo || !form.password}>
                                { loading ? <Spinner size='sm' animation="border" variant="light" /> : "Ingresar"}
                            </Button>
                            <p>Aun no tienes una cuenta? Regístrate <Link to='/signup'>aquí</Link></p>
                        </Form>
                    </div>
                </div>
            </div>
        </section>
    )
}
