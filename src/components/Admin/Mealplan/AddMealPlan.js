import React, { useState } from 'react'
import styled from 'styled-components'
import { Input, Title, Main, Mini, Container, Info } from './MealPlanElements'
import { Formik } from 'formik'
import * as Yup from 'yup';

import { Button, Snackbar, Select, MenuItem } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

import axios from '../../../axiosInstance';

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

const LongInput = styled.textarea`
    border-radius:5px;
    padding:5px;
    border: 1px solid black;
`

const AddMealPlan = () => {

    const [Issuccess, setIsSuccess] = useState(false);

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsSuccess(false);
    };

    return (
        <>
            <Main onClick={handleClose}>
                <h3 style={{ textAlign: "left", marginLeft: "50px", marginBottom: "20px" }}>Add MealPlan</h3>

                <Formik
                    initialValues={{
                        name: '',
                        status: 0,
                        type: 0,
                        duration: '',
                        order: '',
                        subtitle: '',
                        price: '',
                        salesprice: '',
                        details: '',
                    }}

                    validationSchema={validateSchema}

                    onSubmit={(values) => {
                        axios.post(`meal-plans`, {
                            name: values.name,
                            status: values.status,
                            type: values.type,
                            duration: values.duration,
                            order: values.order,
                            subtitle: values.subtitle,
                            details: values.details,
                            price: values.price,
                            sale_price: values.salesprice,
                        }).then((res) => {
                            setIsSuccess(true)

                        }).catch(err => console.log(err))
                    }}
                >

                    {({ handleChange, handleSubmit, errors, touched, values }) => (
                        <>
                            <Container>
                                <Mini>
                                    <Title>Name :</Title>
                                    <Input placeholder="Enter Name"
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
                                    <Input placeholder="Duration"
                                        onChange={handleChange("duration")}
                                    />
                                </Mini>
                                {errors.duration && touched && (<Info error>{errors.duration}</Info>)}
                                <Mini>
                                    <Title>Order :</Title>
                                    <Input placeholder="Order"
                                        onChange={handleChange("order")}
                                    />
                                </Mini>
                                {errors.order && touched && (<Info error>{errors.order}</Info>)}
                                <Mini>
                                    <Title>Subtitle :</Title>
                                    <Input placeholder="Subtitle"
                                        onChange={handleChange("subtitle")}
                                    />
                                </Mini>
                                {errors.subtitle && touched && (<Info error>{errors.subtitle}</Info>)}
                                <Mini  >
                                    <Title>Details :</Title>
                                    <LongInput rows="5" cols="24" placeholder="Details"
                                        onChange={handleChange("details")}
                                    />
                                </Mini>
                                {errors.details && touched && (<Info error>{errors.details}</Info>)}
                                <Mini>
                                    <Title>Price :</Title>
                                    <Input placeholder="Price"
                                        onChange={handleChange("price")}
                                    />
                                </Mini>
                                {errors.price && touched && (<Info error>{errors.price}</Info>)}
                                <Mini>
                                    <Title>Sale Price :</Title>
                                    <Input placeholder="Sale Price"
                                        onChange={handleChange("salesprice")}
                                    />
                                </Mini>
                                {errors.salesprice && touched && (<Info error>{errors.salesprice}</Info>)}
                                <Button onClick={handleSubmit} style={{ margin: "10px" }} variant="contained" color="primary">Submit</Button>
                            </Container>
                        </>)}
                </Formik>
                <Snackbar
                    autoHideDuration={3000}
                    anchorOrigin={{ vertical: 'top', horizontal: "center" }}
                    message="Success"
                    open={Issuccess}
                    onClose={handleClose}
                >
                    <Alert onClose={handleClose} severity="success">
                        MealPlan Added Successfully !
                        </Alert>
                </Snackbar>

            </Main>
        </>
    )
}

export default AddMealPlan
