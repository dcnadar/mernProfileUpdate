import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import avatar from '../assets/profile.png';
import toast, { Toaster } from 'react-hot-toast';
import styles from '../styles/Username.module.css';
import { useFormik } from 'formik';
import { passwordValidate } from '../helper/validate';
import useFetch from '../hooks/fetch.hook.js'
import { useAuthStore } from '../store/store.js'
import { verifyPassword } from '../helper/helper.js'


export default function Password() {
    const navigate = useNavigate();
    const { username } = useAuthStore(state => state.auth)
    // console.log(username);
    const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`)
    const formik = useFormik({
        initialValues: {
            password: ''
        },
        validate: passwordValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            let loginPromise = verifyPassword({ username, password: values.password })
            toast.promise(loginPromise, {
                loading: 'Checking...', success:
                    <b>Login Successfull...!</b>, error:
                    <b>PassWord not Match</b>
            })
            // You can perform additional actions such as API calls here
            loginPromise.then(res => {
                let { token } = res.data.data;
                // console.log("The token from login", res.data);
                localStorage.setItem('token', token)
                // console.log("login page token:", token);
                navigate('/profile')
            })
        }
    });

    if (isLoading) return <h1 className='text-2xl text-bold '>isLoading</h1>
    if (serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

    return (
        <div className="container mx-auto">
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <div className="flex justify-center items-center h-screen">
                <div className={styles.glass}>
                    <div className="title flex flex-col items-center">
                        <h4 className='text-5xl font-bold'>Hello {apiData?.firstName || apiData?.username}</h4>
                        <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                            Explore more
                        </span>
                    </div>
                    <form className="py-1" onSubmit={formik.handleSubmit}>
                        <div className="profile flex justify-center py-4">
                            <img src={apiData?.profile || avatar} className={styles.profile_img} alt="avatar" />
                        </div>
                        <div className="textbox flex flex-col items-center gap-6">
                            <input type="password" className={styles.textbox} placeholder="Password"{...formik.getFieldProps('password')} />
                            {/* {formik.errors.password && (<div className="text-red-500">{formik.errors.password}</div>)} */}
                            <button type="submit" className={styles.btn}>Sign in</button>
                        </div>
                    </form>
                    <div className="text-center py-4">
                        <span className="text-gray-500">Forgot Password? <Link className="text-red-500" to="/recovery">Recover Now!</Link></span>
                    </div>
                </div>
            </div>
        </div>
    );
}
