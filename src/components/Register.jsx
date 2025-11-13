import React, { use, useState } from 'react';
import Navbar from './Navbar';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthProvider';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';

const Register = () => {
    const { signUpWithUser,googleSignInUser } = use(AuthContext);
    const location = useLocation()
    const navigate = useNavigate()

    const [error, setError] = useState('')


    const handleGoogleSignIn = () => {
            googleSignInUser()
                .then(result => {
                    console.log(result.user)
                    const user = result.user;
                    if (!user.emailVerified) {
                        alert('Please Verify your Email')
                        return;
                    }
                
                    navigate(location?.state || '/')
                    // setUser(result.user)
                    // e.target.reset();
                })
                .catch(error => {
                    console.log(error)
                     Swal.fire({
                        position: "top-end",
                        icon: "failore",
                        title: "User is not Log In",
                        showConfirmButton: false,
                        timer: 1500
                    });
                })
        }

    const handleSignUp = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const photo = e.target.photo.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(name, photo, email, password)

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

        if (password.length < 6) {
            console.log('Password must be at least 6 characters long.')
            toast.error("Password must be at least 6 characters long.");
            setError('Password must be at least 6 characters long.')
            return;
        }
        
        if (!passwordRegex.test(password)) {
            // যদি Regex পাস না করে (অর্থাৎ Uppercase বা Lowercase অনুপস্থিত)
            toast.error("Password must contain at least one uppercase and one lowercase letter.");
            console.log('Password must contain at least one uppercase and one lowercase letter')
            setError('Password must contain at least one uppercase and one lowercase letter')
            return;
        }



        signUpWithUser(email, password)
            .then((result) => {
                console.log(result.user)
                toast.success("Registration Successfully")
                navigate('/')
            })
            .catch((error) => {
                // const errorMessage = error.message;
                toast.error(error.message)
            });
    }

    return (
        <div className='w-11/12 mx-auto'>
            <div>
                <Navbar></Navbar>
            </div>
            <div className=" flex justify-center mt-10 mx-auto card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <h1 className="text-4xl font-bold text-center">Register Now!</h1>
                <div className="card-body">
                    <form onSubmit={handleSignUp}>
                        <fieldset className="fieldset">

                           {/* ******* */}

                            <label className="label">Email</label>
                            <input type="email" name='email' className="input" placeholder="Email" />

                            <label className="label">Password</label>
                            <input type="password" name='password' className="input" placeholder="Password" />
                            <p className='text-red-500'>{error? error : ""}</p>

                            <button className="btn btn-neutral mt-4">Register</button>
                        </fieldset>
                    </form>

                     {/* Google */}
                    <button onClick={handleGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5]">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                    </button>
                    <p className="text-center">If you have aaccount , Please <Link className="text-blue-600" to='/login'>Login</Link></p>

                </div>
            </div>
        </div>
    );
};

export default Register;