import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProviders';
import { toast } from 'react-toastify';
import animation from '../../assets/lotto1.json'
import Lottie from 'lottie-react';

const Register = () => {
    const {signInWithGoogle,createUser,updateUserProfile,setUser} = useContext(AuthContext);
    const [error,setError] = useState('');
    const navigate = useNavigate();
    const location =useLocation();
    const from =location.state?.from?.pathname || "/";

    const handleRegister = event =>{
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const photo = form.url.value;
        const password = form.password.value;

        // Password validation check
        const isValidPassword = validatePassword(password);
        if (!isValidPassword) {
        setError(
            'Password must be at least 6 characters long and include both uppercase and lowercase letters.'
        );
        return;
        }
        setError(''); 

        createUser(email,password)
         .then(result =>{
            const user = result.user;
            setUser(user);
            console.log(user);
            updateUserProfile({displayName:name,photoURL:photo})
            .then(()=>{
                setUser((prevUser) => ({
                    ...prevUser,
                    displayName: name,
                    photoURL: photo
                  }));
            })
            .catch((error)=>{
                setError(error.message);
            })
            toast.success('Register successful.',{position: "top-center"});
            navigate(from, {replace:true});
         })
         .catch((error) => {
            setError(error.message); 
          });
     
   };
    const handelGoogleSignIn =()=>{
        signInWithGoogle()
        .then((result)=>{
            const user=result.user;
            console.log(user);
            toast.success('Account create successful.',{position: "top-center"});
            navigate(from, {replace:true});
        })
        .catch((error)=>{
            setError(error);
        })
    }
    const validatePassword = (password) => {
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const isValidLength = password.length >= 6;
    
        return hasUppercase && hasLowercase && isValidLength;
      };

    return (
        <div>
            <div className='grid lg:grid-cols-2 grid-cols-1 lg:px-20 md:px-16 px-2 bg-green-500'>
                <div className='w-full py-10   mx-auto my-auto'>
                <Lottie className='rounderd-full' animationData={animation}></Lottie>
                </div>
                <div className='p-6 my-10 bg-green-600 rounded-xl'>
                <form  onSubmit={handleRegister}>
                        <div className="mb-4">
                        <label className="block text-sm font-medium text-white" htmlFor="email">Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder='Enter Your Name'
                            className="mt-1 p-4 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 bg-transparent text-white"
                        />
                        </div>
                        <div className="mb-4">
                        <label className="block text-sm font-medium text-white" htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder='Enter Your Email'
                            className="mt-1 p-4 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 bg-transparent text-white"
                        />
                        </div>
                        <div className="mb-4">
                        <label className="block text-sm font-medium text-white" htmlFor="email">PhotoURL</label>
                        <input
                            type="url"
                            name="url"
                            placeholder='Enter Your PhotoURL'
                            className="mt-1 p-4 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 bg-transparent text-white"
                        />
                        </div>
                        <div className="mb-4">
                        <label className="block text-sm font-medium text-white" htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder='Enter Password'
                            className="mt-1 p-4 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 bg-transparent text-white"
                        />
                        </div>
                        <button
                        type="submit"
                        className="w-full font-bold p-4 bg-gray-800 text-white rounded-md hover:bg-yellow-500 transition duration-200"
                        >
                        REGISTER
                        </button>
                    </form>
                    {
                    error && <p className='text-red-600'>{error}</p>
                    }
                    <p className='text-white my-2'>Already have an Account? <a className='font-bold my-2' href="/logIn">Log In</a></p>
                    <p className='my-4 text-white text-center'>OR</p>
                    <p><button onClick={handelGoogleSignIn} className="w-full font-bold lg:p-4 md:p-4 p-2 bg-gray-800 text-white rounded-md hover:bg-yellow-500">Log in with Google</button></p>
                </div>

            </div>
        </div>
    );
};

export default Register;