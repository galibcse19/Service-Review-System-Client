import React, { createContext, useEffect, useState } from 'react';
import { app } from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';


export const AuthContext = createContext(null);
const auth = getAuth(app)
 
const AuthProviders = ({children}) => {
    const googleProvider = new GoogleAuthProvider();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const [serviceData, setServiceData] = useState([]);
    const [reviewData, setReviewData] = useState([]);
    //load service data
    useEffect(()=>{
        fetch('http://localhost:5000/services')
        .then(res => res.json())
        .then(data => setServiceData(data))
    },[])
    // load review data
    useEffect(()=>{
        fetch('http://localhost:5000/reviews')
        .then(res => res.json())
        .then(data => setReviewData(data))
    },[])
    // console.log(reviewData);

    

    const createUser = (email,password)=>{
        setLoading(true);
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
             console.log('current user', currentUser.email);
             setLoading(false);
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
         user,loading,signInWithGoogle,createUser,signIn,updateUserProfile,logOut,setUser,serviceData,reviewData
    }
    return (
        <AuthContext.Provider value={authInfo}>
        {children}
       </AuthContext.Provider>
    );
};

export default AuthProviders;