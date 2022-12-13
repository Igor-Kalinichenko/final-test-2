import {Navigate} from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import { removeUser } from "../../redux/userSlice";

function Logout () {

    const dispatch = useDispatch();
    const auth = getAuth();

    useEffect(() => {
        signOut(auth).then(() => {
          dispatch(removeUser());
          localStorage.clear();
              }).catch((error) => {
            // An error happened.
              });
    },[]);
    
    return <Navigate to='/' />
}

export default Logout;