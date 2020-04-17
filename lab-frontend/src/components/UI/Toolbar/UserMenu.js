import React from 'react';
import {DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink, UncontrolledDropdown} from "reactstrap";
import {NavLink as RouterNavLink} from "react-router-dom";

const UserMenu = ({user, logout}) => {
    return (
        <UncontrolledDropdown nav inNavbar>
            <Nav className="ml-auto" navbar>
                {user.role === 'admin' ? (
                <NavItem>
                    <NavLink tag={RouterNavLink} to="/admin_office" exact>Офис админа</NavLink>
                </NavItem>): null}
                <NavItem>
                    <NavLink tag={RouterNavLink} to="/cocktailBuilder" exact>Добавить коктейл</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={RouterNavLink} to="/myCocktails" exact>Мои коктейли</NavLink>
                </NavItem>
                <DropdownToggle nav caret>
                    Привет, {user.firstName || user.username}!
                </DropdownToggle>
                <DropdownMenu right>
                    {user.avatar ?
                        user.facebookId ?
                        <DropdownItem disabled>
                                <img style={{width: '100px'}} src={user.avatar} alt=""/>
                        </DropdownItem>:
                        <DropdownItem disabled>
                            <img style={{width: '100px'}} src={`http://localhost:8000/uploads/${user.avatar}`} alt=""/>
                        </DropdownItem>   : null
                    }
                    {user.avatar ?
                        <DropdownItem divider />: null
                    }
                    <DropdownItem onClick={logout}>
                        Logout
                    </DropdownItem>
                </DropdownMenu>
            </Nav>

        </UncontrolledDropdown>
    );
};
export default UserMenu;