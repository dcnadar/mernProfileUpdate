
import React, { useEffect } from 'react';

import toast, { Toaster } from 'react-hot-toast';
import styles from '../styles/Username.module.css';
import { replace, useFormik } from 'formik';
import { resetpasswordValidation } from '../helper/validate.js';
import { resetPassword } from '../helper/helper.js';
import { useAuthStore } from '../store/store.js';
import { useNavigate, Navigate } from 'react-router-dom';
import useFetch from '../hooks/fetch.hook.js';

export default function Reset() {


    const { username } = useAuthStore(state => state.auth)
    const navigate = useNavigate();
    const [{ isLoading,/**  apiData,*/ status, serverError }] = useFetch('createResetSession')

    // useEffect(() => {
    //     // console.log(apiData);
    // })




    const formik = useFormik({
        initialValues: {
            password: '',
            confirm_pwd: ''
        },
        validate: resetpasswordValidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            // console.log(values);
            let resetPromise = resetPassword({ username, password: values.password })
            // You can perform additional actions such as API calls here
            toast.promise(resetPromise, {
                loading: 'Updating...',
                success: <b>Reset Successfully...!</b>,
                error: <b>Could not Reset</b>
            })

            resetPromise.then(function () { navigate('/password') })
        }
    });

    if (isLoading) return <h1 className='text-2xl text-bold '>isLoading</h1>
    if (serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>
    if (status && status !== 201) return <Navigate to={'/password'} replace={true}></Navigate >


    return (
        <div className="container mx-auto">
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <div className="flex justify-center items-center h-screen">
                <div className={styles.glass} style={{ width: "50%" }}>
                    <div className="title flex flex-col items-center">
                        <h4 className='text-5xl font-bold'>Reset</h4>
                        <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                            Enter New Password
                        </span>
                    </div>

                    <form className="py-20" onSubmit={formik.handleSubmit}>

                        <div className="textbox flex flex-col items-center gap-6">
                            <input type="password" className={styles.textbox} placeholder="New Password"{...formik.getFieldProps('password')} />
                            <input type="password" className={styles.textbox} placeholder="Repeat Password"{...formik.getFieldProps('confirm_pwd')} />
                            <button type="submit" className={styles.btn}>Reset</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}


