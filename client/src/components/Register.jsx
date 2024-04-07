import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import avatar from '../assets/profile.png';
import toast, { Toaster } from 'react-hot-toast';
import styles from '../styles/Username.module.css';
import { useFormik } from 'formik';
import { registerValidation } from '../helper/validate';
import convertToBase64 from '../helper/convert.js'
import { registeUser } from '../helper/helper.js';
import { useNavigate } from 'react-router-dom';


export default function Register() {
    const navigate = useNavigate()

    const [file, setFile] = useState();

    const formik = useFormik({

        initialValues: {
            email: 'example@mail.com',
            username: 'example123',
            password: 'example@'
        },
        validate: registerValidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            values = await Object.assign(values, { profile: file || '' })
            // console.log(values);
            let registerPromise = registeUser(values)

            toast.promise(registerPromise, { loading: 'Creating...', success: <b>Register Successfully...!</b>, error: <b>Could not Register</b> })
            registerPromise.then(function () { navigate('/') })
            // You can perform additional actions such as API calls here
        }
    });
    /** format doess not support file upload create function  */
    const onUpload = async e => {
        const base64 = await convertToBase64(e.target.files[0]);
        setFile(base64);
    }
    return (
        <div className="container mx-auto">
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <div className="flex justify-center items-center h-screen">
                <div className={styles.glass} style={{ width: "45%" }}>
                    <div className="title flex flex-col items-center">
                        <h4 className='text-5xl font-bold'>Register</h4>
                        <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                            Happy to Join You
                        </span>
                    </div>
                    <form className="py-1" onSubmit={formik.handleSubmit}>
                        <div className="profile flex justify-center py-4">
                            <label htmlFor="profile">
                                <img src={file || avatar} className={styles.profile_img} alt="avatar" />
                            </label>
                            <input onChange={onUpload} type="file" name="profile" id="profile" />
                        </div>
                        <div className="textbox flex flex-col items-center gap-6">
                            <input type="email" className={styles.textbox} placeholder="Email*"{...formik.getFieldProps('email')} />
                            <input type="text" className={styles.textbox} placeholder="Username*"{...formik.getFieldProps('username')} />
                            <input type="password" className={styles.textbox} placeholder="Password*"{...formik.getFieldProps('password')} />
                            {/* {formik.errors.password && (<div className="text-red-500">{formik.errors.password}</div>)} */}
                            <button type="submit" className={styles.btn}>Register</button>
                        </div>
                    </form>
                    <div className="text-center py-4">
                        <span className="text-gray-500">Already Registered? <Link className="text-red-500" to="/">Login Now</Link></span>
                    </div>
                </div>
            </div>
        </div>
    );
}


