/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { getAuth ,createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import app from "../firebase/firebase.config";
// import axios from "axios";
import useAxiosPublic from "../hooks/useAxiosPublic";
export const AuthContext =createContext(null);
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const axiosPublic=useAxiosPublic();

    const [user,setUser] =useState(null);
    const[loading,setLoading] =useState(true)
    const createUser=(email,password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const updateUser = (displayName, photoURL) => {
        return updateProfile(auth.currentUser, {
          displayName,
          photoURL,
        })
          .then(() => {
            setUser(auth.currentUser);
          })
          .catch((error) => {
            console.error("Error updating profile:", error);
          });
      };
    const logOut =() =>{
        setLoading(true)
        return signOut(auth)
    }
    const signIn = (email,password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password);
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            const userEmail = currentUser?.email || user?.email;
            
            setUser(currentUser);
            console.log('current user', currentUser);
            setLoading(false);
            // if user exists then issue a token
            if (currentUser) {
                const loggedUser = { email: userEmail };
                axiosPublic.post('/jwt', loggedUser)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                            setLoading(false);
                        }
                    })
            }
            else {
                localStorage.removeItem('access-token');
                setLoading(false);
            }
        });
        return () => {
            return unsubscribe();
        }
    }, [])

   
    const authinfo ={
            user,loading,
            createUser,logOut,signIn,updateUser
     }
    return (
        <AuthContext.Provider value={authinfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;