import React, { useState, useEffect } from 'react'
import axios from '../../../axiosInstance'
import { useDispatch, useSelector } from 'react-redux'
import { setTemp, selectTemp } from '../../../features/adminSlice'

import { makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogContent, DialogTitle, Select, MenuItem, Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

import CustomSkeleton from '../../../CustomSkeleton';

import { Formik } from 'formik'
import * as Yup from 'yup'

import { Main, HContainer, Container, Con, Input, Title, Set, Mini, Info } from './UserElements'

const useStyles = makeStyles({
    root: {
        width: '100%',
    },

    table: {
        minWidth: 650,
    },
});



const ListofUser = () => {

    const dispatch = useDispatch();
    const user = useSelector(selectTemp);

    const [users, setUsers] = useState([]);
    const [page, setPage] = useState('')
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('')
    const [order, setOrder] = useState('')
    const [show, setShow] = useState(false)
    const [Issuccess, setIsSuccess] = useState(false)
    const [modal, setModal] = useState(false)
    const [loading, setLodaing] = useState(true)

    useEffect(() => {
        axios.get(`users?pageSize=${page}&search=${search}&sortBy=${sort}&sortOrder=${order}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then((res) => {
            setUsers(res.data.data)
            setShow(true)
            setLodaing(false)
        }).catch(err => console.log(err));
    }, [order, page, search, sort])

    const handleShow = () => {
        axios.get(`users?pageSize=${page}&search=${search}&sortBy=${sort}&sortOrder=${order}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then((res) => {
            setUsers(res.data.data)
            setShow(true)
        }).catch(err => console.log(err));
    }


    const handleUpdate = async (user) => {
        await dispatch((setTemp({
            id: user.id,
            roles: user.roles,
            email: user.email,
            mobile: user.mobile,
            first_name: user.first_name,
            last_name: user.last_name,
            address: user.address,
            address_secondary: user.address_secondary,
        })))
        await setModal(true);
    }

    const DialogClose = () => {
        setModal(false);
    }

    const validateSchema = Yup.object().shape({
        first_name: Yup.string().required().label("First Name"),
        last_name: Yup.string().required().label("Last Name"),
        mobile: Yup.number().required().label("Phone"),
        email: Yup.string().required().email().label("Email"),
        address: Yup.string().required().min(10).label("Address"),
        address_secondary: Yup.string().label("Sec Address"),
        roles: Yup.number().required().label("Roles"),
    })

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setIsSuccess(false);
    };

    const classes = useStyles();

    return (
        <>
            {modal && (<>
                <Dialog
                    open={modal}
                    onClose={DialogClose}
                    aria-labelledby="form-dialog-title"
                    disableBackdropClick
                    disableEscapeKeyDown
                >
                    <DialogTitle id="form-dialog-title">Update User</DialogTitle>
                    <DialogContent>
                        <Formik
                            initialValues={{
                                id: user.id,
                                address: user.address ? user.address : "Nill",
                                address_secondary: user.address_secondary ? user.address_secondary : "Nill",
                                email: user.email,
                                first_name: user.first_name,
                                last_name: user.last_name,
                                mobile: user.mobile,
                                roles: user.roles[0].id,
                            }}

                            validationSchema={validateSchema}

                            onSubmit={(values) => {
                                axios.put(`users/${values.id}`, {
                                    email: values.email,
                                    first_name: values.first_name,
                                    last_name: values.last_name,
                                    mobile: values.mobile,
                                    address: values.address,
                                    address_secondary: values.address_secondary,
                                    roles: [values.roles],
                                }).then(res => {
                                    setIsSuccess(true)
                                    DialogClose()
                                    handleShow()
                                }).catch(err => console.log(err))
                            }}

                        >

                            {({ handleChange, handleSubmit, errors, touched, values }) => (
                                < >
                                    <Container>
                                        <Mini>
                                            <Title>
                                                ID
                                     </Title>
                                            <Input
                                                style={{ cursor: "not-allowed" }}
                                                disabled
                                                value={values.id}
                                                onChange={handleChange("id")}>
                                            </Input>
                                        </Mini>
                                        <Mini>
                                            <Title>
                                                First Name
                                            </Title>
                                            <Input
                                                value={values.first_name}
                                                onChange={handleChange("first_name")}>
                                            </Input>
                                        </Mini>
                                        {errors.first_name && touched && (
                                            <Info error>{errors.first_name}</Info>
                                        )}
                                        <Mini>
                                            <Title>
                                                Last Name
                                            </Title>
                                            <Input
                                                value={values.last_name}
                                                onChange={handleChange("last_name")}>
                                            </Input>
                                        </Mini>
                                        {errors.last_name && touched && (
                                            <Info error>{errors.last_name}</Info>
                                        )}
                                        <Mini>
                                            <Title>
                                                Email
                                            </Title>
                                            <Input
                                                value={values.email}
                                                onChange={handleChange("email")}>
                                            </Input>
                                        </Mini>
                                        {errors.email && touched && (
                                            <Info error>{errors.email}</Info>
                                        )}
                                        <Mini>
                                            <Title>Phone :</Title>
                                            <Input value={values.mobile}
                                                onChange={handleChange("mobile")} />
                                        </Mini>
                                        {errors.mobile && touched && (
                                            <Info error>{errors.mobile}</Info>
                                        )}
                                        <Mini>
                                            <Title>
                                                Address
                                            </Title>
                                            <Input
                                                value={values.address}
                                                onChange={handleChange("address")}>
                                            </Input>
                                        </Mini>
                                        {errors.address && touched && (
                                            <Info error>{errors.address}</Info>
                                        )}
                                        <Mini>
                                            <Title>
                                                Secondary Address
                                            </Title>
                                            <Input
                                                value={values.address_secondary}
                                                onChange={handleChange("address_secondary")}>
                                            </Input>
                                        </Mini>
                                        {errors.address_secondary && touched && (
                                            <Info error>{errors.address_secondary}</Info>
                                        )}
                                        <Mini>
                                            <Title>
                                                Roles :
                                           </Title>
                                            <Select
                                                defaultValue={values.roles}
                                                onChange={handleChange("roles")}
                                            >
                                                <MenuItem value={1}>Customer</MenuItem>
                                                <MenuItem value={2}>Admin</MenuItem>
                                                <MenuItem value={3}>Consultant</MenuItem>
                                                <MenuItem value={4}>Accountant</MenuItem>
                                                <MenuItem value={5}>Kitchen</MenuItem>
                                            </Select>
                                        </Mini>
                                        {errors.roles && touched && (
                                            <Info error>{errors.roles}</Info>
                                        )}
                                        <Mini>
                                            <Button
                                                variant="contained"
                                                style={{ margin: "10px", padding: "5px" }}
                                                color="primary"
                                                onClick={handleSubmit}
                                            >submit</Button>
                                            <Button onClick={DialogClose}
                                                variant="contained"
                                                style={{ margin: "10px", padding: "5px" }}
                                                color="primary">Cancel</Button>
                                        </Mini>
                                    </Container>
                                </>
                            )}

                        </Formik>
                    </DialogContent>
                </Dialog>
            </>)}
            {loading ? (
                <CustomSkeleton />
            ) :
                (<>
                    <Main>
                        <h3 style={{ textAlign: "left", marginLeft: "50px", marginBottom: "20px" }}>List of Users</h3>
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
                                        setUsers([])
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
                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>ID</TableCell>
                                            <TableCell align="right">Name</TableCell>
                                            <TableCell align="right">Email</TableCell>
                                            <TableCell align="right">Mobile</TableCell>
                                            <TableCell align="right">Address</TableCell>
                                            <TableCell align="right">Update</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {users.map((user) => (
                                            <TableRow
                                                key={user.id}>
                                                <TableCell component="th" scope="row">
                                                    {user.id}
                                                </TableCell>
                                                <TableCell align="right">{user.name}</TableCell>
                                                <TableCell align="right">{user.email}</TableCell>
                                                <TableCell align="right">{user.mobile}</TableCell>
                                                <TableCell align="right">{user.address}</TableCell>
                                                <TableCell align="right">
                                                    <Button variant="outlined" color="primary"
                                                        onClick={() => handleUpdate(user)}>Update</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </>)}
                        <Snackbar
                            autoHideDuration={3000}
                            anchorOrigin={{ vertical: 'top', horizontal: "center" }}
                            message="Success"
                            open={Issuccess}
                            onClose={handleClose}
                        >
                            <Alert onClose={handleClose} severity="success">
                                User Updated Successfully !
                        </Alert>
                        </Snackbar>
                    </Main>
                </>)}
        </>
    )
}

export default ListofUser
