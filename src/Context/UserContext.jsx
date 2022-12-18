import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { link } from "../linkAPI";


const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState({});
    const [isAuth, setIsAuth] = useState({
        auth: false,
        rol: ""
    });

    function parseJwt(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    };

    const validateUser = async () => {
        const hasToken = localStorage.getItem('dulce-token') || "";
        if (hasToken) {
            const { uid } = parseJwt(hasToken);
            await fetch(`${link}users/${uid}`)
                .then(data => data.json())
                .then(({ user }) => {
                    if (user) {
                        setUser(user)
                        setIsAuth({
                            auth: true,
                            rol: user.rol
                        })
                    } else {
                        setIsAuth({
                            auth: false,
                            rol: ""
                        })
                    }
                });
            return true;
        } else return false;

        
    }

    useEffect(() => {
        validateUser();
    }, [])

    return (
        <UserContext.Provider value={{ user, isAuth, validateUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;