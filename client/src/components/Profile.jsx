import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import avatar from '../assets/profile.png';
import toast, { Toaster } from 'react-hot-toast';
import styles from '../styles/Username.module.css';
import { useFormik } from 'formik';
import { profileVaidation } from '../helper/validate';
import convertToBase64 from '../helper/convert.js'
import extend from '../styles/Profile.module.css';
import useFetch from '../hooks/fetch.hook.js'
import { useAuthStore } from '../store/store.js'
import { updateUser } from '../helper/helper.js';


export default function Profile() {
    const navigate = useNavigate()
    const [file, setFile] = useState();
    const { username } = useAuthStore(state => state.auth)
    // console.log(username);
    const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`)
    // console.log(apiData?.profile);apiData?.username  apiData?.email

    const formik = useFormik({

        initialValues: {
            firstName: apiData?.firstName || '',
            lastName: apiData?.lastName || '',
            mobile: apiData?.mobile || '',
            email: apiData?.email || '',
            address: apiData?.address || '',
        },
        enableReinitialize: true,
        validate: profileVaidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            values = await Object.assign(values, { profile: file || apiData?.profile || '' })
            // console.log("Initial values:", values);
            let updatePromise = updateUser(values)
            // console.log("Promise update", updatePromise);
            toast.promise(updatePromise, {
                loading: 'Updating...',
                success: <b>Update Successfully...!</b>,
                error: <b>Could not Update!</b>
            })
            // console.log(values);

            // You can perform additional actions such as API calls here
        }
    });
    /** format doess not support file upload create function  */
    const onUpload = async e => {
        const base64 = await convertToBase64(e.target.files[0]);
        setFile(base64);
    }

    // logout function video last after token h ye token bna nhi h abhi 
    function userLogout() {
        localStorage.removeItem('token')
        navigate('/')
    }



    if (isLoading) return <h1 className='text-2xl text-bold '>isLoading</h1>
    if (serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>
    return (
        <div className="container mx-auto">
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <div className="flex justify-center items-center h-screen">
                <div className={`${styles.glass} ${extend.glass}`} style={{ width: "45%" }}>
                    <div className="title flex flex-col items-center">
                        <h4 className='text-5xl font-bold'>{apiData?.username}</h4>
                        <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                            You can update the data
                        </span>
                    </div>
                    <form className="py-1" onSubmit={formik.handleSubmit}>
                        <div className="profile flex justify-center py-4">
                            <label htmlFor="profile">
                                <img src={apiData?.profile || avatar || file} className={`${styles.profile_img} ${extend.profile_img}`} alt="avatar" />
                            </label>
                            <input onChange={onUpload} type="file" name="profile" id="profile" />
                        </div>
                        <div className="textbox flex flex-col items-center gap-6">
                            <div className="name flex w-3/4 gap-10">
                                <input type="text" className={`${styles.textbox} ${extend.textbox}`} placeholder="Firstname*"{...formik.getFieldProps('firstName')} />
                                <input type="text" className={`${styles.textbox} ${extend.textbox}`} placeholder="Lastname"{...formik.getFieldProps('lastName')} />
                            </div>

                            <div className="name flex w-3/4 gap-10">
                                <input type="number" className={`${styles.textbox} ${extend.textbox}`} placeholder="Mobile no."{...formik.getFieldProps('mobile')} />
                                <input type="email" className={`${styles.textbox} ${extend.textbox}`} placeholder="Email"{...formik.getFieldProps('email')} />
                            </div>

                            <input type="address" className={`${styles.textbox} ${extend.textbox}`} placeholder="Address"{...formik.getFieldProps('address')} />
                            <button type="submit" className={styles.btn}>Update</button>
                            {/* <div className="name flex w-3/4 gap-10"></div> */}
                        </div>
                    </form>
                    <div className="text-center py-4">
                        <span className="text-gray-500">Come Back Later? <button onClick={userLogout} className="text-red-500" to="/">LogOut</button></span>
                    </div>
                </div>
            </div>
        </div>
    );
}


