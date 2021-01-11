import React, { useState, forwardRef, useEffect } from 'react'
import { Main, Route, Container, Section, Phone, Input, Facebook, Google, IconBox, CustomButton, SetBg, RouteContainer } from './SignupElements'

import { useHistory } from 'react-router-dom'

import axios from '../../../axiosInstance'
import { Cookies } from 'react-cookie'


import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Button } from '@material-ui/core'

import { Formik } from 'formik'

import * as Yup from 'yup'

import logo from '../../../assets/logo.png'
import { Image, Para, Line, Subheading } from '../../MainComponents'
import { useDispatch } from 'react-redux'
import { setNew } from '../../../features/userSlice'

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Signup = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    let cookie = new Cookies();

    const [open, setOpen] = useState(false);
    const [code, setCode] = useState("+973");
    const [token, setToken] = useState({});

    useEffect(() => {
        localStorage.setItem('access_token', token.access_token ? token.access_token : '');
        localStorage.setItem('refresh_token', token.refresh_token ? token.refresh_token : '')
    }, [token])


    const ValidateSchema = Yup.object().shape({
        fname: Yup.string().required().label("First Name"),
        lname: Yup.string().required().label("Last Name"),
        phone: Yup.number().required().label("Phone"),
        email: Yup.string().required().email().label("Email"),
        password: Yup.string().required().min(6).label("Password"),
    })

    const handleClose = () => {
        setOpen(false);
        dispatch(setNew())
        history.push("/")
    };


    return (
        <>
            <Main>
                <Route to="/">
                    <Image src={logo} alt="logo" height="80px" mar="10px 0 0 0" />
                </Route>
                <RouteContainer>
                    <Route opacity="0.7" to="/signin">
                        <Subheading weight="600" pad="0" color="rgba(137,197,63,1)" >
                            SIGN IN
                        </Subheading>
                    </Route>
                    <Route to="/signup">
                        <Subheading weight="600" pad="0" color="rgba(137,197,63,1)">
                            SIGN UP
                        </Subheading>
                        <Line back="rgba(137,197,63,1)" top="0" height="3px" />
                    </Route>
                </RouteContainer>
                <SetBg>
                    <Container>

                        <Dialog
                            open={open}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-slide-title"
                            aria-describedby="alert-dialog-slide-description"
                        >
                            <DialogTitle id="alert-dialog-slide-title">{"Diet Delight!"}</DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-slide-description">
                                    Account Created Successfully
                            </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    OK
                                 </Button>
                            </DialogActions>
                        </Dialog>

                        <Formik
                            initialValues={
                                {
                                    phone: '',
                                    fname: '',
                                    lname: '',
                                    email: '',
                                    password: '',
                                    check: '',
                                }}

                            onSubmit={(values) => {

                                if (values.check === values.password) {

                                    let combine = code + " " + values.phone;
                                    let Name = values.fname + " " + values.lname;

                                    axios.post('register', {
                                        name: Name,
                                        email: values.email,
                                        password: values.password,
                                        first_name: values.fname,
                                        last_name: values.lname,
                                        mobile: combine,
                                    }).then(
                                        (res) => {
                                            setToken(res.data)
                                            cookie.set('access_token', res.data.access_token, {
                                                path: '/',
                                                maxAge: res.data.expires_in
                                            })
                                        }
                                    ).catch(
                                        err => console.log(err)
                                    )

                                    setOpen(true)
                                }
                            }}
                            validationSchema={ValidateSchema}
                        >

                            {({ handleChange, handleSubmit, errors, touched }) => (
                                <>
                                    <Para color="rgba(137,197,63,1)" size="0.8rem" weight="700" align="none">
                                        PHONE NUMBER
                                    </Para>
                                    <Section width="auto">
                                        <select value={code} name="country" id="country"
                                            onChange={(e) => setCode(e.target.value)}
                                        >
                                            <option value="+973">+973</option>
                                            <option value="+971">+971</option>
                                            <option value="+972">+972</option>
                                            <option value="+974">+974</option>
                                        </select>
                                        <Phone
                                            type="text"
                                            placeholder="Enter Phone Number"
                                            onChange={handleChange("phone")}
                                        />
                                    </Section>
                                    {errors.phone && touched.phone ?
                                        (<Para color="red" size="0.8rem" weight="700">{errors.phone} </Para>)
                                        : null}
                                    <Para color="rgba(137,197,63,1)" size="0.8rem" weight="700" align="none" top="0">
                                        FIRST NAME
                                    </Para>
                                    <Input
                                        type="text"
                                        placeholder="Enter First Name"
                                        onChange={handleChange("fname")}
                                    />
                                    {errors.fname && touched.fname ?
                                        (<Para color="red" size="0.8rem" weight="700">{errors.fname} </Para>)
                                        : null}
                                    <Para color="rgba(137,197,63,1)" size="0.8rem" weight="700" align="none">
                                        LAST NAME
                                    </Para>
                                    <Input
                                        type="text"
                                        placeholder="Enter Last Name"
                                        onChange={handleChange("lname")}
                                    />
                                    {errors.lname && touched.lname ?
                                        (<Para color="red" size="0.8rem" weight="700">{errors.lname} </Para>)
                                        : null}
                                    <Para color="rgba(137,197,63,1)" size="0.8rem" weight="700" align="none">
                                        EMAIL ADDRESS
                                    </Para>
                                    <Input
                                        type="email"
                                        placeholder="Enter Email "
                                        onChange={handleChange("email")}
                                    />
                                    {errors.email && touched.email ?
                                        (<Para color="red" size="0.8rem" weight="700">{errors.email} </Para>)
                                        : null}
                                    <Para color="rgba(137,197,63,1)" size="0.8rem" weight="700" align="none">
                                        PASSWORD
                                    </Para>
                                    <Input
                                        type="password"
                                        placeholder="Enter Password"
                                        onChange={handleChange("password")}
                                    />
                                    {errors.password && touched.password ?
                                        (<Para color="red" size="0.8rem" weight="700">{errors.password} </Para>)
                                        : null}
                                    <Para color="rgba(137,197,63,1)" size="0.8rem" weight="700" align="none">
                                        CONFIRM PASSWORD
                                    </Para>
                                    <Input
                                        type="password"
                                        placeholder="Confirm Password"
                                        onChange={handleChange("check")}
                                    />

                                    <Section width="auto">
                                        <Line back="rgba(137,197,63,1)" height="1px" />
                                        <Para width="30px" color="rgba(137,197,63,1)" size="0.8rem" weight="700">
                                            OR
                        </Para>
                                        <Line back="rgba(137,197,63,1)" height="1px" />
                                    </Section>
                                    <Section>
                                        <IconBox back="darkblue">
                                            <Facebook />
                                        </IconBox>
                                        <IconBox back="red">
                                            <Google />
                                        </IconBox>
                                    </Section>
                                    <CustomButton type="submit" onClick={handleSubmit}>
                                        SIGN UP
                                    </CustomButton>

                                </>
                            )}

                        </Formik>
                    </Container>
                </SetBg>
            </Main>
        </>
    )
}

export default Signup
