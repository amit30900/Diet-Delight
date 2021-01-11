import React, { useState } from 'react'
import { Input, Title, Main, Mini, Info, Container } from './QuestionElements'
import { Formik } from 'formik'
import * as Yup from 'yup';

import { Button, Snackbar, Select, MenuItem } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

import axios from '../../../axiosInstance';

const validationSchema = Yup.object().shape({
    question: Yup.string().required().label("Question"),
    type: Yup.number().required().max(3).label("Type"),
    order: Yup.number().required().label("Order")
});

const AddQuestion = () => {

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
            <Main>
                <h3 style={{ textAlign: "left", marginLeft: "50px", marginBottom: "20px" }}>Add Question</h3>
                <Formik
                    initialValues={{
                        question: '',
                        type: '',
                        order: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        axios.post(`questions`, {
                            question: values.question,
                            type: values.type,
                            order: values.order,
                        }).then((res) => {
                            console.log(res)
                            setIsSuccess(true)
                        }).catch(err => console.log(err))
                    }}
                >
                    {({ handleSubmit, handleChange, errors, touched, values }) => (
                        <>
                            <Container>
                                <Mini>
                                    <Title>Question :</Title>
                                    <Input
                                        placeholder="Question"
                                        onChange={handleChange("question")}
                                    />
                                </Mini>
                                {errors.question && touched && (
                                    <Info error>{errors.question}</Info>
                                )}
                                <Mini>
                                    <Title>Type :</Title>
                                    <Select
                                        defaultValue={values.type}
                                        onChange={handleChange("type")}
                                    >
                                        <MenuItem value={0}>Text</MenuItem>
                                        <MenuItem value={1}>Yes/No</MenuItem>
                                        <MenuItem value={2}>Dropdown </MenuItem>
                                        <MenuItem value={3}>Number </MenuItem>
                                    </Select>
                                </Mini>
                                {errors.type && touched && (
                                    <Info error>{errors.type}</Info>
                                )}
                                <Mini>
                                    <Title>Order :</Title>
                                    <Input
                                        placeholder="Order"
                                        onChange={handleChange("order")}
                                    />
                                </Mini>

                                {errors.order && touched && (
                                    <Info error>{errors.order}</Info>
                                )}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{ margin: "10px" }}
                                    onClick={handleSubmit}>
                                    Submit
                            </Button>
                            </Container>
                        </>
                    )}
                </Formik>
                <Snackbar
                    autoHideDuration={3000}
                    anchorOrigin={{ vertical: 'top', horizontal: "center" }}
                    message="Success"
                    open={Issuccess}
                    onClose={handleClose}
                >
                    <Alert onClose={handleClose} severity="success">
                        Question Added Successfully !
                        </Alert>
                </Snackbar>
            </Main>
        </>
    )
}

export default AddQuestion
