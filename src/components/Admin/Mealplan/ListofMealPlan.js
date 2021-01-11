import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import axios from '../../../axiosInstance';
import CustomSkeleton from '../../../CustomSkeleton';

import { makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogContent, DialogTitle, Select, MenuItem, Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

import { Formik } from 'formik'
import * as Yup from 'yup'

import { useDispatch, useSelector } from 'react-redux'
import { setMealPlan, resetMealPlan, selectMealPlan } from '../../../features/adminSlice'

import { Main, HContainer, Con, Input, Title, Set, Mini, Info, Container } from './MealPlanElements'

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    table: {
        minWidth: 650,
    },
});

const LongInput = styled.textarea`
    border-radius:5px;
    padding:5px;
    border: 1px solid black;
`



const validateSchema = Yup.object().shape({
    name: Yup.string().required().label("Name"),
    status: Yup.number().required().max(1).label("Status"),
    type: Yup.number().required().max(1).label("Type"),
    duration: Yup.number().required().max(31).label("Duration"),
    order: Yup.number().required().max(1).label("Order"),
    subtitle: Yup.string().required().label("Subtitle"),
    details: Yup.string().required().max(256).label("Details"),
    price: Yup.number().required().label("Price"),
    salesprice: Yup.number().required().label("Sales Price"),
})

const ListofMealPlan = () => {

    const dispatch = useDispatch();
    const meal = useSelector(selectMealPlan);

    const [loading, setLoading] = useState(true);
    const [Meals, setMeals] = useState([]);
    const [page, setPage] = useState('')
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('')
    const [order, setOrder] = useState('')
    const [show, setShow] = useState(false)
    const [Issuccess, setIsSuccess] = useState(false);
    const [isdelete, setIsDelete] = useState(false);
    const [isupdate, setISUpdate] = useState(false);

    useEffect(() => {
        axios.get(`meal-plans?`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then((res) => {
            setMeals(res.data.data)
            setLoading(false)
            setShow(true)
        })
    }, [])

    const handleShow = () => {
        axios.get(`meal-plans?pageSize=${page}&search=${search}&sortBy=${sort}&sortOrder=${order}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then((res) => {
            setMeals(res.data.data)
            setShow(true)
        }).catch(err => console.log(err));
    }

    const classes = useStyles();

    const handleUpdate = async (user) => {
        await dispatch(setMealPlan({
            id: user.id,
            name: user.name,
            status: user.status,
            order: user.order,
            type: user.type,
            duration: user.duration,
            details: user.details,
            subtitle: user.subtitle,
            price: user.price,
            sale_price: user.sale_price,
        }))

        await setISUpdate(true);
    }

    const handleDelete = async (user) => {
        await dispatch(resetMealPlan())
        await dispatch(setMealPlan({
            id: user.id
        }))
        await setIsDelete(true)
    }

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsSuccess(false);
    };

    const CloseDelete = () => setIsDelete(false)
    const CloseUpdate = () => setISUpdate(false)


    return (
        <>

            {isdelete && (<>  <Dialog
                open={isdelete}
                onClose={CloseDelete}
                aria-labelledby="form-dialog-title"
                disableBackdropClick
                disableEscapeKeyDown
            >
                <DialogTitle id="form-dialog-title">Delete Question</DialogTitle>
                <DialogContent>
                    <Mini>
                        <Button variant="contained" color="secondary"
                            onClick={() => {
                                axios.delete(`meal-plans/${meal.id}`).then(
                                    (res) => {
                                        setIsSuccess(true)
                                        setIsDelete(false)
                                        handleShow()
                                    }
                                ).catch(err => console.log(err))
                            }}
                        >Delete</Button>
                        <Button variant="contained" color="primary" onClick={CloseDelete}>Close</Button>
                    </Mini>
                </DialogContent>
            </Dialog>
            </>)}

            {isupdate && (<>  <Dialog
                open={isupdate}
                onClose={CloseUpdate}
                aria-labelledby="form-dialog-title"
                disableBackdropClick
                disableEscapeKeyDown
            >
                <DialogTitle id="form-dialog-title">Update Question</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={{
                            name: meal.name,
                            status: meal.status,
                            type: meal.type,
                            duration: meal.duration,
                            details: meal.details,
                            order: meal.order,
                            subtitle: meal.subtitle,
                            price: meal.price,
                            sale_price: meal.sale_price,
                        }}

                        validationSchema={validateSchema}

                        onSubmit={(values) => {
                            console.log("Clicked")
                            axios.put(`meal-plans/${meal.id}`, {
                                name: values.name,
                                status: values.status,
                                type: values.type,
                                duration: values.duration,
                                order: values.order,
                                subtitle: values.subtitle,
                                details: values.details,
                                price: values.price,
                                sale_price: values.sale_price,
                            }).then((res) => {
                                setIsSuccess(true)
                                setISUpdate(false)
                                handleShow()

                            }).catch(err => console.log(err))
                        }}
                    >

                        {({ handleChange, handleSubmit, errors, touched, values }) => (
                            <>
                                <Container>
                                    <Mini>
                                        <Title>Name :</Title>
                                        <Input placeholder="Enter Name"
                                            value={values.name}
                                            onChange={handleChange("name")}
                                        />
                                    </Mini>
                                    {errors.name && touched && (<Info error>{errors.name}</Info>)}
                                    <Mini>
                                        <Title>Status : </Title>
                                        <Select
                                            defaultValue={values.status}
                                            onChange={handleChange("status")}
                                        >
                                            <MenuItem value={0}>Available</MenuItem>
                                            <MenuItem value={1}>Unavailable</MenuItem>
                                        </Select>
                                    </Mini>
                                    {errors.status && touched && (<Info error>{errors.status}</Info>)}
                                    <Mini>
                                        <Title>Type :</Title>
                                        <Select
                                            defaultValue={values.type}
                                            onChange={handleChange("type")}
                                        >
                                            <MenuItem value={0}>With Weekend</MenuItem>
                                            <MenuItem value={1}>Without Weekend</MenuItem>
                                        </Select>
                                    </Mini>
                                    {errors.type && touched && (<Info error>{errors.type}</Info>)}
                                    <Mini>
                                        <Title>Duration :</Title>
                                        <Input
                                            value={values.duration}
                                            placeholder="Duration"
                                            onChange={handleChange("duration")}
                                        />
                                    </Mini>
                                    {errors.duration && touched && (<Info error>{errors.duration}</Info>)}
                                    <Mini>
                                        <Title>Order :</Title>
                                        <Input
                                            value={values.order}
                                            placeholder="Order"
                                            onChange={handleChange("order")}
                                        />
                                    </Mini>
                                    {errors.order && touched && (<Info error>{errors.order}</Info>)}
                                    <Mini>
                                        <Title>Subtitle :</Title>
                                        <Input
                                            value={values.subtitle}
                                            placeholder="Subtitle"
                                            onChange={handleChange("subtitle")}
                                        />
                                    </Mini>
                                    {errors.subtitle && touched && (<Info error>{errors.subtitle}</Info>)}
                                    <Mini  >
                                        <Title>Details :</Title>
                                        <LongInput rows="5" cols="24"
                                            value={values.details}
                                            placeholder="Details"
                                            onChange={handleChange("details")}
                                        >{values.details}</LongInput>
                                    </Mini>
                                    {errors.details && touched && (<Info error>{errors.details}</Info>)}
                                    <Mini>
                                        <Title>Price :</Title>
                                        <Input
                                            value={values.price}
                                            placeholder="Price"
                                            onChange={handleChange("price")}
                                        />
                                    </Mini>
                                    {errors.price && touched && (<Info error>{errors.price}</Info>)}
                                    <Mini>
                                        <Title>Sale Price :</Title>
                                        <Input
                                            value={values.sale_price}
                                            placeholder="Sale Price"
                                            onChange={handleChange("salesprice")}
                                        />
                                    </Mini>
                                    {errors.sale_price && touched && (<Info error>{errors.sale_price}</Info>)}
                                    <Mini>
                                        <Button onClick={handleSubmit} style={{ margin: "10px" }} variant="contained" color="primary">Submit</Button>
                                        <Button onClick={CloseUpdate} style={{ margin: "10px" }} variant="contained" color="primary">Close</Button>
                                    </Mini>
                                </Container>
                            </>)}
                    </Formik>
                </DialogContent>
            </Dialog>
            </>)}

            {loading ? (<CustomSkeleton />) : (<>
                <Main>
                    <h3 style={{ textAlign: "left", marginLeft: "50px", marginBottom: "20px" }}>List of MealPlan</h3>
                    <HContainer>
                        <Con>
                            <Title>Data per Page</Title>
                            <Input value={page}
                                onChange={(e) => setPage(e.target.value)}
                                placeholder="Page Size"></Input>
                        </Con>
                        <Con>
                            <Title>Search All</Title>
                            <Input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search all"></Input>
                        </Con>
                        <Con>
                            <Title>Sort By</Title>
                            <Input
                                value={sort}
                                onChange={(e) => setSort(e.target.value)}
                                placeholder="Sort by"></Input>
                        </Con>
                        <Con>
                            <Title>Sort Order</Title>
                            <Input
                                value={order}
                                onChange={(e) => setOrder(e.target.value)}
                                placeholder="asc or desc"></Input>
                        </Con>
                        <Set>
                            <Button
                                variant="contained"
                                style={{ margin: "10px" }}
                                onClick={handleShow}
                                color="primary">Run</Button>
                            <Button
                                variant="contained"
                                style={{ margin: "10px" }}
                                onClick={() => {
                                    setMeals([])
                                    setShow(false)
                                    setPage('')
                                    setSearch('')
                                    setSort('')
                                    setOrder('')
                                }}
                                color="primary">Reset</Button>
                        </Set>
                    </HContainer>
                    {show && (<>
                        <TableContainer style={{ marginTop: "20px" }} component={Paper}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Type</TableCell>
                                        <TableCell>Duration</TableCell>
                                        <TableCell>Order</TableCell>
                                        <TableCell>Subtitle</TableCell>
                                        <TableCell>Details</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Sales Price</TableCell>
                                        <TableCell>Update</TableCell>
                                        <TableCell>Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Meals.map((user) => (
                                        <TableRow
                                            key={user.id}>
                                            <TableCell component="th" scope="row">
                                                {user.id}
                                            </TableCell>
                                            <TableCell >{user.name}</TableCell>
                                            <TableCell >{user.status}</TableCell>
                                            <TableCell >{user.type}</TableCell>
                                            <TableCell>{user.duration}</TableCell>
                                            <TableCell >{user.order}</TableCell>
                                            <TableCell >{user.subtitle}</TableCell>
                                            <TableCell >{user.details}</TableCell>
                                            <TableCell >{user.price}</TableCell>
                                            <TableCell >{user.sale_price}</TableCell>
                                            <TableCell >
                                                <Button variant="outlined"
                                                    color="primary"
                                                    onClick={() => handleUpdate(user)}>Update</Button>
                                            </TableCell>
                                            <TableCell >
                                                <Button variant="outlined"
                                                    color="secondary"
                                                    onClick={() => handleDelete(user)}>Delete</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>)}
                </Main>
                <Snackbar
                    autoHideDuration={3000}
                    anchorOrigin={{ vertical: 'top', horizontal: "center" }}
                    message="Success"
                    open={Issuccess}
                    onClose={handleClose}
                >
                    <Alert onClose={handleClose} severity="success">
                        Success Message !
                        </Alert>
                </Snackbar>
            </>)}
        </>
    )
}

export default ListofMealPlan
