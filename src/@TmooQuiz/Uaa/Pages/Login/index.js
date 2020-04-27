import React, {useState} from 'react';
import {
    Card,
    CardContent,
     Icon,
    InputAdornment,
    Typography
} from '@material-ui/core';
import {darken} from '@material-ui/core/styles/colorManipulator';
import {makeStyles} from '@material-ui/styles';
import {FuseAnimate} from '@fuse';
import clsx from 'clsx';
import Formsy from "formsy-react";
import {useDispatch} from "react-redux";
import Identify from "@Core/Helper/Identify";
import {LOGIN_SUCCESS, SET_USER_DATA} from "../../Model/constants";
import LoaderButton from "@Core/Components/LoaderButton";
// import history from '@history'
import {TextFieldFormsy} from "../../../../@fuse/components/formsy";
import UserModel from "../../Model/User";

const useStyles = makeStyles(theme => ({
    root: {
        background: 'radial-gradient(' + darken(theme.palette.primary.dark, 0.5) + ' 0%, ' + theme.palette.primary.dark + ' 80%)',
        color     : theme.palette.primary.contrastText
    }
}));

function Index(props)
{
    const classes = useStyles();
    const dispatch = useDispatch();
    const [isFormValid, setIsFormValid] = useState(false);
    const [isLoading , setIsLoading] = useState(false)
    function disableButton()
    {
        setIsFormValid(false);
    }

    function enableButton()
    {
        setIsFormValid(true);
    }

    const handleSubmitLogin = data => {
        if(isLoading) return
        setIsLoading(true)
        UserModel.login(data)
            .then(user => {
                setIsLoading(false)
                dispatch({
                    type : SET_USER_DATA,
                    payload : user
                })
                dispatch({
                    type : LOGIN_SUCCESS
                })
                // history.push('/admin/patients')
            })
            .catch(error => {
                Identify.handleErrorResponse(error,dispatch)
                setIsLoading(false)
            })
    }

    return (
        <div className={clsx(classes.root, "flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32")}
            style={{
                backgroundImage : 'url(https://media.ex-cdn.com/EXP/media.nhadautu.vn/files/news/2019/07/23/homeazvn-mang-xa-hoi-dau-tien-ve-noi-ngoai-that-duoc-cap-phep-hoat-dong-tai-viet-nam-171254.jpg)',
                backgroundSize : 'cover',
                backgroundRepeat : 'no-repeat'
            }}
        >
            <div className="login-wp"/>
            <div className="flex flex-col items-center justify-center w-full">

                <FuseAnimate animation="transition.expandIn">

                    <Card className="w-full max-w-384">

                        <CardContent className="flex flex-col items-center justify-center p-32">

                            <img className="w-64 m-32" src="assets/f3d/house.svg" alt="logo"/>

                            <Typography variant="h6" className="mt-16 mb-32">Đăng nhập tài khoản</Typography>

                            <Formsy
                                name="loginForm"
                                onValidSubmit={handleSubmitLogin}
                                onValid={enableButton}
                                onInvalid={disableButton}
                                className="flex flex-col justify-center w-full mb-32"
                            >
                                <TextFieldFormsy
                                    className="mb-16"
                                    label="Email"
                                    type="email"
                                    name="email"
                                    variant="outlined"
                                    validations="isEmail"
                                    validationErrors={{
                                        isEmail: 'Email không đúng định dạng'
                                    }}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">person</Icon></InputAdornment>
                                    }}
                                    required
                                    fullWidth
                                />

                                <TextFieldFormsy
                                    className="mb-16"
                                    label="Password"
                                    type="password"
                                    name="password"
                                    variant="outlined"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">vpn_key</Icon></InputAdornment>
                                    }}
                                    required
                                    fullWidth
                                />

                                {/*<div className="flex items-center justify-between">*/}

                                {/*    <div/>*/}

                                {/*    <Link className="font-medium" to="/forgot-password">*/}
                                {/*        Quên mật khẩu?*/}
                                {/*    </Link>*/}
                                {/*</div>*/}

                                <LoaderButton
                                    variant="contained"
                                    color="primary"
                                    className="w-full mx-auto mt-16 normal-case"
                                    aria-label="LOG IN"
                                    disabled={!isFormValid}
                                    loading={isLoading}
                                    type="submit"
                                >
                                    Đăng nhập
                                </LoaderButton>

                            </Formsy>

                        </CardContent>
                    </Card>
                </FuseAnimate>
            </div>
        </div>
    );
}

export default Index;
