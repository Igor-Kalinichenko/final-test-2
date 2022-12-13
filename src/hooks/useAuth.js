import {useSelector} from 'react-redux';

export function useAuth() {
    const {firstName, email, lastName, id, role} = useSelector(state => state.user.users);

    return {
        isAuth: !!email,
        firstName,
        email,
        lastName,
        id,
        role,
    };
}