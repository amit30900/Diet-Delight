import React, { useState } from 'react'

import { Container, Main, Mini, Title, Info, Input } from './ConsultantElements'
import { Button, Select, MenuItem, Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import { Formik } from 'formik'
import * as Yup from 'yup'
import axios from '../../../axiosInstance'

const PostConsultant = () => {

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

    const validationSchema = Yup.object().shape({
        name: Yup.string().required().label("Name"),
        status: Yup.string().required().label("Status"),
        qualification: Yup.string().required().label("Qualification"),
        bio: Yup.string().required().label("Bio"),
        order: Yup.number().required().label("Order"),
    });

    return (
        <>
            <Main>
                <Formik
                    initialValues={{
                        name: '',
                        status: 0,
                        qualification: '',
                        bio: '',
                        order: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        axios.post(`consultants`, {
                            name: values.name,
                            status: values.status,
                            qualification: values.qualification,
                            bio: values.bio,
                            order: values.order,
                        }).then(res => setIsSuccess(true)).catch(err => console.log(err))
                    }}
                >
                    {({ handleChange, handleSubmit, errors, touched, values }) => (
                        < >
                            <Container>
                                <Mini>
                                    <Title>
                                        Name
                                            </Title>
                                    <Input
                                        value={values.name}
                                        placeholder="Name"
                                        onChange={handleChange("name")}>
                                    </Input>
                                </Mini>
                                {errors.name && touched && (
                                    <Info error>{errors.name}</Info>
                                )}
                                <Mini>
                                    <Title>
                                        Status
                                            </Title>
                                    <Select
                                        defaultValue={values.status}
                                        onChange={handleChange("status")}>
                                        <MenuItem value={0}>Available</MenuItem>
                                        <MenuItem value={1}>Leave</MenuItem>
                                        <MenuItem value={2}>Left</MenuItem>
                                    </Select>
                                </Mini>
                                {errors.status && touched && (
                                    <Info error>{errors.status}</Info>
                                )}
                                <Mini>
                                    <Title>
                                        Qualifaication
                                            </Title>
                                    <Input
                                        placeholder="Qualification"
                                        value={values.qualification}
                                        onChange={handleChange("qualification")}>
                                    </Input>
                                </Mini>
                                {errors.qualification && touched && (
                                    <Info error>{errors.qualification}</Info>
                                )}
                                <Mini>
                                    <Title>
                                        Bio
                                            </Title>
                                    <Input
                                        placeholder="Bio"
                                        value={values.bio}
                                        onChange={handleChange("bio")}>
                                    </Input>
                                </Mini>
                                {errors.bio && touched && (
                                    <Info error>{errors.bio}</Info>
                                )}
                                <Mini>
                                    <Title>Order</Title>
                                    <Input
                                        placeholder="Order"
                                        value={values.order}
                                        onChange={handleChange("order")} />
                                </Mini>
                                {errors.order && touched && (
                                    <Info error>{errors.order}</Info>
                                )}
                                <Button
                                    variant="contained"
                                    style={{ margin: "20px", padding: "5px" }}
                                    color="primary"
                                    onClick={handleSubmit}
                                >submit</Button>
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
                        User Created Successfully !
                        </Alert>
                </Snackbar>
            </Main>
        </>
    )
}

export default PostConsultant
