import React from 'react';
import FacebookLoginButton from 'react-facebook-login/dist/facebook-login-render-props'
import {Button} from "reactstrap";
import {useDispatch} from "react-redux";
import {loginWithFacebook} from "../../store/actions/usersActions";

const FacebookLogin = () => {
    const dispatch = useDispatch();

    const callback = (facebookData) => {
        console.log(facebookData);
        console.log('INFO FROM FACEBOOK: ' , facebookData);
        if (facebookData.id) {
            dispatch(loginWithFacebook(facebookData));
            console.log('YES')
        } else {
            console.log('NO')
        }
    };
    return (
        <FacebookLoginButton
            appId="294208048227545"
            fields="name, email, picture"
            callback={callback}
            render={renderProps => (
                <Button
                    color='primary'
                    onClick={renderProps.onClick}>
                    Login with Facebook
                </Button>
            )}
        />
    );
};

export default FacebookLogin;