import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';


import { AiOutlineLeft, AiOutlineRight, AiOutlineMenu, AiOutlineDown, AiOutlineUp } from 'react-icons/ai'
import { BiUserCircle } from 'react-icons/bi'

import axios from '../../axiosInstance'

import { useHistory } from 'react-router-dom';
import { selectAdmin, SetFalse, SetTrue } from '../../features/userSlice'
import { resetMealPlan, resetQuestion, resetTemp } from '../../features/adminSlice'
import { useSelector, useDispatch } from 'react-redux'

import styled from 'styled-components';
import { Cookies } from 'react-cookie';
import Home from './home'

import ListofUser from './user/ListofUser';
import PostUser from './user/PostUser';

import ListofQuestions from './questions/ListofQuestions';
import AddQuestion from './questions/AddQuestion';

import ListofConsultants from './consultant/ListofConsultants';

import ListofMealPlan from './Mealplan/ListofMealPlan';
import AddMealPlan from './Mealplan/AddMealPlan';
import PostConsultant from './consultant/PostConsultant';


const Items = styled.h3`
    width:100%;
    text-align:center;  
    margin: 5px 0;
    font-family:"Roboto Condensed Regular";
    cursor:pointer;
    letter-spacing: 1px;
    font-size:1.2rem;
`

const MiniItems = styled.h5`
    text-align:right;
    padding:0 10px;
    font-size:0.9rem;
    cursor:pointer;
    margin:3px 0;
`

const Set = styled.div`
    display:flex;
    flex-direction:column;
`

const Info = styled.h3`
    text-align:center;  
    font-family:"Roboto Condensed Regular";
    cursor:pointer;
    font-size:1.2rem;
    font-weight:300;
`

const Logout = styled.div`
    display:flex;
    align-items:center;
    margin-left:auto;
    padding:0 20px;

    @media only screen and (max-width:500px){
        padding:0;
    }

`

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

export default function PersistentDrawerLeft() {

    let history = useHistory();
    const dispatch = useDispatch();
    const cookie = new Cookies()

    const classes = useStyles();
    const theme = useTheme();

    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(false)

    const [user1, setUser1] = useState(false)
    const [user2, setUser2] = useState(false)

    const [question1, setQuestion1] = useState(false)
    const [question2, setQuestion2] = useState(false)

    const [consultant1, setConsultant1] = useState(false)
    const [consultant2, setConsultant2] = useState(false)

    const [meal1, setMeal1] = useState(false)
    const [meal2, setMeal2] = useState(false)


    const [home, setHome] = useState(true)
    const [question, setQuestions] = useState(false)
    const [consultant, setConsultant] = useState(false)
    const [meal, setMeal] = useState(false)
    const [report, setReport] = useState(false)
    const [discount, setDiscount] = useState(false)
    const [customer, setCustomer] = useState(false)

    useEffect(() => {
        dispatch(resetTemp())
        dispatch(resetQuestion())
        dispatch(resetMealPlan())
    }, [dispatch])

    const Admin = useSelector(selectAdmin)

    if (localStorage.getItem('isAdmin')) {
        dispatch(SetTrue());
    }

    const handleLogout = (e) => {
        e.preventDefault();

        axios.get('logout').then(res => console.log(res)).catch(err => console.log(err))
        dispatch(SetFalse())
        cookie.remove("access_token")
        localStorage.clear();
        history.push("/");
    }


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <>
            {   Admin ?
                (<div className={classes.root}>
                    <CssBaseline />
                    <AppBar
                        position="fixed"
                        className={clsx(classes.appBar, {
                            [classes.appBarShift]: open,
                        })}
                    >
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                className={clsx(classes.menuButton, open && classes.hide)}
                            >
                                <AiOutlineMenu />
                            </IconButton>
                            <Info>
                                Admin Dashboard
                           </Info>
                            <Logout onClick={handleLogout}>
                                <Items>
                                    LOGOUT
                        </Items>
                                <BiUserCircle style={{ width: "30px", height: "30px", margin: "0 5px" }} />
                            </Logout>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        className={classes.drawer}
                        variant="persistent"
                        anchor="left"
                        open={open}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        <div className={classes.drawerHeader}>
                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === 'ltr' ? <AiOutlineLeft /> : <AiOutlineRight />}
                            </IconButton>
                        </div>
                        <Divider />
                        <List color="primary">
                            <Items value={home}
                                onClick={() => {
                                    setHome(true)
                                    setUser1(false)
                                    setUser2(false)
                                    setQuestion1(false)
                                    setQuestion2(false)
                                    setConsultant1(false)
                                    setConsultant2(false)
                                }}
                            >
                                Dashboard
                        </Items>
                            <Divider />
                            <div style={{ display: 'flex', alignItems: "center" }}>
                                <Items value={user}
                                    onClick={() => {
                                        setUser(!user)
                                    }}
                                >
                                    USER
                                </Items>
                                {user ? (<AiOutlineUp style={{ marginRight: "10px" }} />) : (<AiOutlineDown style={{ marginRight: "10px" }} />)}
                            </div>
                            {user &&
                                (<>
                                    <Set>
                                        <Divider />
                                        <MiniItems value={user1} onClick={() => {
                                            setUser1(true)
                                            setUser2(false)
                                            setQuestion1(false)
                                            setQuestion2(false)
                                            setConsultant1(false)
                                            setConsultant2(false)
                                            setMeal1(false)
                                            setMeal2(false)
                                            setHome(false)
                                        }}>All User</MiniItems>
                                        <Divider />
                                        <MiniItems value={user2} onClick={() => {
                                            setUser2(true)
                                            setUser1(false)
                                            setQuestion1(false)
                                            setQuestion2(false)
                                            setConsultant1(false)
                                            setConsultant2(false)
                                            setMeal1(false)
                                            setMeal2(false)
                                            setHome(false)

                                        }}>Add New User</MiniItems>
                                        <Divider />
                                    </Set>
                                </>)}
                            <Divider />
                            <div style={{ display: 'flex', alignItems: "center" }}>
                                <Items value={question}
                                    onClick={() => {
                                        setQuestions(!question)
                                    }}
                                >
                                    QUESTIONS
                                </Items>

                                {question ? (<AiOutlineUp style={{ marginRight: "10px" }} />) : (<AiOutlineDown style={{ marginRight: "10px" }} />)}

                            </div>
                            {question &&
                                (<>
                                    <Set>
                                        <Divider />
                                        <MiniItems value={question1}
                                            onClick={() => {
                                                setQuestion1(true)
                                                setQuestion2(false)
                                                setUser1(false)
                                                setUser2(false)
                                                setConsultant1(false)
                                                setConsultant2(false)
                                                setMeal1(false)
                                                setHome(false)
                                                setMeal2(false)
                                            }}
                                        >All Questions</MiniItems>
                                        <Divider />
                                        <MiniItems value={question2}
                                            onClick={() => {
                                                setQuestion2(true)
                                                setQuestion1(false)
                                                setUser1(false)
                                                setUser2(false)
                                                setConsultant1(false)
                                                setConsultant2(false)
                                                setMeal1(false)
                                                setHome(false)
                                                setMeal2(false)
                                            }}
                                        >Add New Question</MiniItems>
                                    </Set>
                                </>)}
                            <Divider />
                            <div style={{ display: 'flex', alignItems: "center" }}>
                                <Items value={consultant}
                                    onClick={() => {
                                        setConsultant(!consultant)
                                    }}
                                >
                                    CONSULTANT
                            </Items>
                                {consultant ? (<AiOutlineUp style={{ marginRight: "10px" }} />) : (<AiOutlineDown style={{ marginRight: "10px" }} />)}
                            </div>
                            {consultant &&
                                (<>
                                    <Set>
                                        <Divider />
                                        <MiniItems value={consultant1}
                                            onClick={() => {
                                                setConsultant1(true)
                                                setConsultant2(false)
                                                setUser1(false)
                                                setUser2(false)
                                                setQuestion1(false)
                                                setQuestion2(false)
                                                setMeal1(false)
                                                setHome(false)
                                                setMeal2(false)
                                            }}
                                        >All Consultants</MiniItems>
                                        <Divider />
                                        <MiniItems value={setQuestion2}
                                            onClick={() => {
                                                setConsultant2(true)
                                                setConsultant1(false)
                                                setUser1(false)
                                                setUser2(false)
                                                setQuestion1(false)
                                                setQuestion2(false)
                                                setMeal1(false)
                                                setHome(false)
                                                setMeal2(false)
                                            }}
                                        >Add New Consultant</MiniItems>
                                    </Set>
                                </>)}
                            <Divider />
                            <div style={{ display: 'flex', alignItems: "center" }}>
                                <Items value={meal}
                                    onClick={() => {
                                        setMeal(!meal)
                                    }}
                                >
                                    MEALPLAN
                                </Items>
                                {meal ? (<AiOutlineUp style={{ marginRight: "10px" }} />) : (<AiOutlineDown style={{ marginRight: "10px" }} />)}
                            </div>
                            {meal &&
                                (<>
                                    <Set>
                                        <Divider />
                                        <MiniItems value={meal1}
                                            onClick={() => {
                                                setMeal1(true)
                                                setMeal2(false)
                                                setUser1(false)
                                                setUser2(false)
                                                setQuestion1(false)
                                                setQuestion2(false)
                                                setConsultant1(false)
                                                setHome(false)
                                                setConsultant2(false)
                                            }}
                                        >All MealPlan</MiniItems>
                                        <Divider />
                                        <MiniItems value={meal2}
                                            onClick={() => {
                                                setMeal2(true)
                                                setMeal1(false)
                                                setUser1(false)
                                                setUser2(false)
                                                setQuestion1(false)
                                                setQuestion2(false)
                                                setConsultant1(false)
                                                setHome(false)
                                                setConsultant2(false)
                                            }}>Add New MealPlan</MiniItems>
                                    </Set>
                                </>)}
                            <Divider />
                            <Items value={report}
                                onClick={() => {
                                    setReport(!report)
                                }}
                            >
                                REPORTS
                    </Items>
                            {report &&
                                (<>
                                    <Set>
                                        <Divider />
                                        <MiniItems>All user list</MiniItems>
                                        <Divider />
                                        <MiniItems>All user list</MiniItems>
                                        <Divider />
                                        <MiniItems>All user list</MiniItems>
                                        <Divider />
                                        <MiniItems>All user list</MiniItems>
                                        <Divider />
                                    </Set>
                                </>)}
                            <Divider />
                            <Items value={discount}
                                onClick={() => {
                                    setDiscount(!discount)
                                }}
                            >
                                DISCOUNTS
                    </Items>
                            {discount &&
                                (<>
                                    <Set>
                                        <Divider />
                                        <MiniItems>All user list</MiniItems>
                                        <Divider />
                                        <MiniItems>All user list</MiniItems>
                                        <Divider />
                                        <MiniItems>All user list</MiniItems>
                                        <Divider />
                                        <MiniItems>All user list</MiniItems>
                                        <Divider />
                                    </Set>
                                </>)}
                            <Divider />
                            <Items value={customer}
                                onClick={() => {
                                    setCustomer(!customer)
                                }}
                            >
                                CUSTOMERS
                    </Items>
                            {customer &&
                                (<>
                                    <Set>
                                        <Divider />
                                        <MiniItems>All user list</MiniItems>
                                        <Divider />
                                        <MiniItems>All user list</MiniItems>
                                        <Divider />
                                        <MiniItems>All user list</MiniItems>
                                        <Divider />
                                        <MiniItems>All user list</MiniItems>
                                        <Divider />
                                    </Set>
                                </>)}
                            <Divider />
                        </List>
                    </Drawer>
                    <main
                        onClick={handleDrawerClose}
                        className={clsx(classes.content, {
                            [classes.contentShift]: open,
                        })}
                    >
                        <div className={classes.drawerHeader} />

                        {home && (<Home />)}

                        {user1 && (<ListofUser />)}
                        {user2 && (<PostUser />)}


                        {question1 && (<ListofQuestions />)}
                        {question2 && (<AddQuestion />)}

                        {consultant1 && (<ListofConsultants />)}
                        {consultant2 && (<PostConsultant />)}

                        {meal1 && (<ListofMealPlan />)}
                        {meal2 && (<AddMealPlan />)}

                        {report && (<h3> report </h3>)}
                        {discount && (<h3> discount </h3>)}
                        {customer && (<h3> customer </h3>)}


                    </main>
                </div>
                ) :
                (<div>
                    YOU ARE NOT AUTHORIZE
                </div>)}
        </>
    );
}
