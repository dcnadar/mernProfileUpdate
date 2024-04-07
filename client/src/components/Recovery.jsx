import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import styles from '../styles/Username.module.css';
import { useAuthStore } from '../store/store';
import { generateOTP, verifyOTP } from '../helper/helper';
import { useNavigate } from 'react-router-dom';



export default function Recovery() {

    const { username } = useAuthStore(state => state.auth)
    const [OTP, setOTP] = useState()
    const navigate = useNavigate();

    useEffect(() => {
        generateOTP(username).then((OTP) => {
            // console.log(OTP);
            if (OTP) return toast.success('OTP has been send to your email');
            return toast.error('Problem while generating otp')
        })
    }, [username])

    async function onSubmit(e) {
        e.preventDefault();


        try {
            let { status } = await verifyOTP({ username, code: OTP })
            if (status === 201) {
                toast.success('Verify Successfully')
                return navigate('/reset')
            }
        } catch (error) {

            return toast.error('Wrong OTP! check Email again')
        }
    }

    // handle fnc of resend
    function resendOTP() {
        let sendPromise = generateOTP(username)
        toast.promise(sendPromise, {
            loading: 'Sending...',
            success: <b>OTP has been send to your email!</b>,
            error: <b>Could not send it!</b>

        })
        sendPromise.then(OTP => {
            console.log(OTP);
        })
    }

    return (
        <div className="container mx-auto">
            <Toaster position='top-center' reverseOrder={false}></Toaster>
            <div className="flex justify-center items-center h-screen">
                <div className={styles.glass}>
                    <div className="title flex flex-col items-center">
                        <h4 className='text-5xl font-bold'>Recovery</h4>
                        <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                            Enter Otp to Recover password
                        </span>
                    </div>
                    <form className="pt-20" onSubmit={onSubmit} >

                        <div className="textbox flex flex-col items-center gap-6">
                            <div className="input text-center">
                                <span className='py-4 text-sm text-left text-gray-500'>
                                    Enter 4 digit OTP send on your Email
                                </span>
                                <input onChange={(e) => setOTP(e.target.value)} type="number" className={styles.textbox} placeholder="OTP" />

                            </div>
                            <button type="submit" className={styles.btn}>Recover</button>
                        </div>
                    </form>
                    <div className="text-center py-4">
                        <span className="text-gray-500">Cant get Otp? <button onClick={resendOTP} className="text-red-500">Resend OTP!</button></span>
                    </div>
                </div>
            </div>
        </div>
    );
}


