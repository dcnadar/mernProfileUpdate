import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import avatar from '../assets/profile.png';
import { Toaster } from 'react-hot-toast';
import styles from '../styles/Username.module.css';
import { useFormik } from 'formik';
import { usernameValidate } from '../helper/validate';
import { useAuthStore } from '../store/store.js'

export default function Username() {


    const navigate = useNavigate();
    const setUsername = useAuthStore(state => state.setUsername)
    // const username = useAuthStore(state => state.auth.username)

    // useEffect(() => {
    //     console.log(username);
    // })


    const formik = useFormik({
        initialValues: {
            username: 'example123'
        },
        validate: usernameValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            // console.log(values.username);
            setUsername(values.username)
            navigate('/password')
            // You can perform additional actions such as API calls here
        }
    });

    return (

        <div className="container mx-auto">
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <div className="flex justify-center items-center h-screen">
                <div className={styles.glass}>
                    <div className="title flex flex-col items-center">
                        <h4 className='text-5xl font-bold'>Hello Again</h4>
                        <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                            Explore more
                        </span>
                    </div>
                    <form className="py-1" onSubmit={formik.handleSubmit}>
                        <div className="profile flex justify-center py-4">
                            <img src={avatar} className={styles.profile_img} alt="avatar" />
                        </div>
                        <div className="textbox flex flex-col items-center gap-6">
                            <input type="text" className={styles.textbox} placeholder="Username"{...formik.getFieldProps('username')} />
                            {formik.errors.username && (<div className="text-red-500">{formik.errors.username}</div>)}
                            <button type="submit" className={styles.btn}>Let's Go</button>
                        </div>
                    </form>
                    <div className="text-center py-4">
                        <span className="text-gray-500">Not a member <Link className="text-red-500" to="/register">Register Here!</Link></span>
                    </div>
                </div>
            </div>
        </div>
    );
}





// my code up above is gpt code
// import React from 'react'
// import { Link } from 'react-router-dom'
// import avatar from '../assets/profile.png'
// import styles from '../styles/Username.module.css';
// import { Toaster } from 'react-hot-toast';
// import { useFormik } from 'formik';

// export default function Username() {

//     const formik = useFormik({
//         initialValues: {
//             username: ''
//         },
//         validateOnBlur: false,
//         validateOnChange: false,
//         onSubmit: async values => {
//             console.log(values);
//         }
//     })


//     return (
//         <div className="container mx-auto">
//             <div className=" flex justify-center items-center h-screen">
//                 <div className={styles.glass}>
//                     <div className="title flex flex-col items-center">
//                         <h4 className=' text-5xl font-bold'>Hello Again</h4>
//                         <span className="py-4 text-xl w-2/3 text-center text-gray-500">
//                             Explore more
//                         </span>
//                     </div>
//                     <form className="py-1" onSubmit={formik.handleSubmit}>
//                         <div className="profile flex justify-center py-4">
//                             <img src={avatar} className={styles.profile_img} alt="avatar" />
//                         </div>
//                         <div className="textbox flex flex-col items-center gap-6">
//                             <input {...formik.getFieldProps('username')} className={styles.textbox} type="text" name="" placeholder='Username' id="" />
//                             <button className={styles.btn} type="submit">Let's Go</button>
//                         </div>
//                         <div className="text-center py-4">
//                             <span className=' text-gray-500'>Not a member <Link className=" text-red-500" to="/register">Registe Here!</Link></span>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     )
// }


// // import React from 'react';
// // import { Link } from 'react-router-dom';
// // import avatar from '../assets/profile.png';
// // import styles from '../styles/Username.module.css';

// // export default function Username() {
// //     return (
// //         <div className="container mx-auto">
// //             <div className="flex justify-center items-center h-screen">
// //                 <div className={styles.glass}>
// //                     <div className="title flex flex-col items-center">
// //                         <h4 className='text-5xl font-bold'>Hello Again</h4>
// //                         <span className="py-4 text-xl w-2/3 text-center text-gray-500">
// //                             Explore more
// //                         </span>
// //                     </div>

// //                     <form className="py-1">
// //                         <div className="profile flex justify-center py-4">
// //                             <img src={avatar} className={styles.profile_img} alt="avatar" />
// //                         </div>
// //                         <div className="textbox flex flex-col items-center gap-6">
// //                             <input className={styles.textbox} type="text" name="" placeholder='Username' id="" />
// //                             <button className={styles.btn} type="submit">Let's Go</button>
// //                         </div>
// //                         <div className="text-center py-4">
// //                             <span className='text-gray-500'>Not a member <Link className="text-red-500" to="/register">Register Here!</Link></span>
// //                         </div>
// //                     </form>
// //                 </div>
// //             </div>
// //         </div>
// //     )
// // }

