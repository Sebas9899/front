import { useContext, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import UserContext from '../../Context/UserContext';

import './style.css'

const NavbarLY = () => {

    const [menuProfile, setMenuProfile] = useState(false);
    const { user, validateUser } = useContext(UserContext);

    const handleLogout = async () => {
        localStorage.clear();
        await validateUser();
        location.href = "/login";
    }

    const userNombre = `${user.nombre.split(" ")[0]} ${user.nombre.split(" ")[1] ? user.nombre.split(" ")[1].slice(0,1)+"." : ""}`;

    return (
        <>
            <Navbar bg="primary" variant="dark" fixed='top'>
                <Container>
                    <Navbar.Brand href="#home">Dulcería</Navbar.Brand>
                    <Nav className="ms-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#pricing">Productos</Nav.Link>
                        <div className="profile" onClick={ () => setMenuProfile(!menuProfile)}>
                            <p>{userNombre}</p>
                            <img src={user.img} alt="user" />
                        </div>
                    </Nav>
                </Container>
            </Navbar>
            {
                menuProfile &&
                <div className="menu-profile">
                    <li>Perfil</li>
                    <li>Mi cuenta</li>
                    <li onClick={handleLogout} className='log-out'>Cerrar sesión</li>
                </div>
            }
        </>
    )
}

export default NavbarLY