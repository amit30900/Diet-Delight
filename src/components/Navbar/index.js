import React, { useState, useEffect } from 'react'
import { Nav, NavbarContainer, NavLogo, MobileIcon, NavMenu, NavItem, NavLinks, NavBtnlink, NavButton, NavMenuUp, NavMenuDown } from './NavbarElement';

import { FaBars, FaUserCircle } from 'react-icons/fa'
import logo from "../../assets/logo.png"

import axios from '../../axiosInstance'
import { Cookies } from 'react-cookie'

import { animateScroll as scroll } from 'react-scroll'

import { useSelector, useDispatch } from 'react-redux'
import { login, logout, selectUser } from '../../features/userSlice'
import { resetToken, setToken } from '../../features/tokenSlice'
import { useHistory } from 'react-router-dom';



const Navbar = ({ toggle }) => {

    let history = useHistory();
    const dispatch = useDispatch();
    const cookie = new Cookies();
    const user = useSelector(selectUser);

    const [nav, setNav] = useState(false);


    useEffect(() => {

        const ac = new AbortController();

        axios.get('user', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then((res) => {
            dispatch(login({
                id: res.data.id,
                name: res.data.name,
                email: res.data.email,
                mobile: res.data.mobile,
                first_name: res.data.first_name,
                last_name: res.data.last_name,
            }))
        }).catch(err => console.log(err))

        return () => ac.abort();

    }, [dispatch])


    const handleLogout = () => {
        localStorage.clear();
        cookie.remove("access_token")
        cookie.remove("refresh_token")
        dispatch(resetToken())
        dispatch(logout());
        axios.get('logout').catch(err => console.log(err))
        history.go(0)
    }


    const changeNav = () => {
        if (window.scrollY > 200) {
            setNav(true)
        } else {
            setNav(false);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", changeNav);
    }, [nav]);

    const toggleHome = () => {
        scroll.scrollToTop({
            spy: true,
            smooth: true,
            offset: -80,
            duration: 200
        });
    }

    return (
        <>
            <Nav nav={nav}>
                <NavbarContainer>
                    <NavLogo onClick={toggleHome}
                    >
                        <img style={{ objectFit: "contain", height: "80px", marginLeft: "0px" }} src={logo} alt="logo" />
                    </NavLogo>
                    <MobileIcon onClick={toggle}>
                        <FaBars />
                    </MobileIcon>
                    <NavMenu>
                        <NavMenuUp>
                            {user ?
                                (<>
                                    <div style={{
                                        display: "flex",
                                        alignItems: "center",
                                        cursor: "pointer"
                                    }}>
                                        <h3 style={{
                                            color: "purple",
                                            padding: "5px 5px 0px 5px",
                                            fontFamily: "Roboto Condensed Regular",
                                            letterSpacing: "1px"
                                        }} >{`Hello ${user.first_name}`}</h3>
                                        <FaUserCircle style={{
                                            color: "purple",
                                            height: "23px",
                                            width: "23px",
                                            margin: "0px 10px 0 5px"

                                        }} />
                                    </div>
                                </>) :
                                (<>
                                    <NavButton >
                                        <NavBtnlink color="white" background="purple" to="/signin">Sign in</NavBtnlink>
                                    </NavButton>
                                    <NavButton>
                                        <NavBtnlink to="/signup">Sign Up</NavBtnlink>
                                    </NavButton>
                                </>)}
                        </NavMenuUp>
                        <NavMenuDown>
                            <NavItem>
                                <NavLinks to="about">Our Story</NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks
                                    to="menu"
                                    spy={true}
                                    smooth={true}
                                    offset={-80}
                                    duration={200}
                                >Menus</NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks
                                    to="plan"
                                    spy={true}
                                    smooth={true}
                                    offset={-80}
                                    duration={200}
                                >Meal Plan</NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks
                                    to="expert"
                                    spy={true}
                                    smooth={true}
                                    offset={-80}
                                    duration={200}
                                >Consulting</NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks to="about">Blog</NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks to="about">Contact Us</NavLinks>
                            </NavItem>
                            {user ?
                                (<>
                                    <div style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        height: "48px"
                                    }} >
                                        <p
                                            style={{
                                                color: "purple",
                                                fontFamily: "Roboto Condensed Regular",
                                                fontSize: "1rem",
                                                fontWeight: "bold",
                                                cursor: "pointer",
                                            }}
                                            onClick={handleLogout}
                                        >Logout</p>
                                    </div>
                                </>) : null}
                        </NavMenuDown>
                    </NavMenu>
                </NavbarContainer>
            </Nav>
        </>
    )
}

export default Navbar;
