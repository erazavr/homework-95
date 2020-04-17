import React from 'react';
import FacebookLogin from "../../FacebookLogin/FacebookLogin";

const AnonymousMenu = () => (
        <>
            {/*<NavItem>*/}
            {/*    <NavLink tag={RouterNavLink} to="/register" exact>Регистрация</NavLink>*/}
            {/*</NavItem>*/}
            {/*<NavItem>*/}
            {/*    <NavLink tag={RouterNavLink} to="/login" exact>Войти </NavLink>*/}
            {/*</NavItem>*/}
            <FacebookLogin/>
        </>
);

export default AnonymousMenu;