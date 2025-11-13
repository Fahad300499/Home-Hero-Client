import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.config';

export const AuthContext = createContext();
    const provider = new GoogleAuthProvider();


const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading]= useState(true)

    // const provider = new GoogleAuthProvider();

    const googleSignInUser = ()=>{
            setLoading(true);
        return signInWithPopup(auth, provider)
    }

    const logOut =()=>{
            setLoading(true)
        return signOut(auth)
    }

    const signUpWithUser = (email, password)=>{
            setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInWithUser = (email, password)=>{
            setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }



    useEffect(()=>{
        const unsubscribe  = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser);
            setLoading(false)
        })

        return ()=>{
            unsubscribe();
        }
    },[])

    const authInfo= {
        googleSignInUser,
        signUpWithUser,
        signInWithUser,
        user,
        setUser,
        logOut,
        loading,
        setLoading
    }

    return (
        <AuthContext value={authInfo}>{children}</AuthContext>
     );
};

export default AuthProvider;