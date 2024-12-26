import React, { createContext, useEffect, useState } from 'react';
import { app } from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import axios from 'axios';


export const AuthContext = createContext(null);
const auth = getAuth(app)
 
const AuthProviders = ({children}) => {
    const googleProvider = new GoogleAuthProvider();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [countUser,setCountUser] = useState(4);

    const [serviceData, setServiceData] = useState([]);
    const [serviceDataLimit, setServiceDataLimit] = useState([]);
    const [reviewData, setReviewData] = useState([]);
    //load service data
    useEffect(()=>{
        // fetch('https://service-review-system-server-gray.vercel.app/services')
        // .then(res => res.json())
        // .then(data => setServiceData(data))
        axios.get('https://service-review-system-server-gray.vercel.app/services',{
            withCredentials: true
        })
             .then(res => setServiceData(res.data))
    },[])

    //load service data using Limit
    useEffect(()=>{
        // fetch('https://service-review-system-server-gray.vercel.app/servicesData')
        // .then(res => res.json())
        // .then(data => setServiceDataLimit(data))
        axios.get('https://service-review-system-server-gray.vercel.app/servicesData',{
            withCredentials: true
        })
             .then(res => setServiceDataLimit(res.data))
    },[])
    // load review data
    useEffect(()=>{
        // fetch('https://service-review-system-server-gray.vercel.app/reviews')
        // .then(res => res.json())
        // .then(data => setReviewData(data))
        axios.get('https://service-review-system-server-gray.vercel.app/reviews',{
            withCredentials: true
        })
             .then(res => setReviewData(res.data))
    },[])
    // console.log(reviewData);

    

    const createUser = (email,password)=>{
        setLoading(true);
        setCountUser(prevCount => prevCount + 1);
        return createUserWithEmailAndPassword(auth,email,password)
        
    }

    const signIn = (email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }
    const signInWithGoogle=()=>{
        return signInWithPopup(auth,googleProvider);
    }
   
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
             setUser(currentUser);
             console.log('current user', currentUser?.email);
             //jwt related work start 
             if(currentUser?.email){
                const user = {email: currentUser.email}

                axios.post('https://service-review-system-server-gray.vercel.app/jwt',user,{
                    withCredentials: true })
                     .then(res => {
                        console.log('login token', res.data);
                        setLoading(false);
                     })
             }
             else{
                axios.post('https://service-review-system-server-gray.vercel.app/logout',{},{
                    withCredentials: true
                })
                .then(res =>{
                    console.log('logout', res.data);
                    setLoading(false);
                })
             }

             //end
            //  setLoading(false);
         })
         return ()=>{
             return unsubscribe();
         }
     },[])

     const updateUserProfile =(updatedData)=>{
        setLoading(true)
        return updateProfile(auth.currentUser , updatedData)
    }

    const logOut = ()=>{
        setLoading(true);
        return signOut(auth);
    }

    const authInfo ={
         user,countUser,loading,signInWithGoogle,createUser,signIn,updateUserProfile,logOut,setUser,serviceData,reviewData,serviceDataLimit
    }
    return (
        <AuthContext.Provider value={authInfo}>
        {children}
       </AuthContext.Provider>
    );
};

export default AuthProviders;