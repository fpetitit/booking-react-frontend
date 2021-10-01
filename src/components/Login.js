import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import AuthService from '../services/AuthService';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const history = useHistory();
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const login = (e) => {
        e.preventDefault();
        const credentials = { username: username, password: password };
        AuthService.login(credentials).then(res => {
            if (res.status === 200 || res.status === 201) {
                localStorage.setItem("access_token", res.data.access_token);
                history.push("/slots");
            } else {
                setMessage(res.data.message);
            }
        });
    };

    const onUsernameChange = (e) => {
        setUsername(e.target.value)
    }
    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }

    return <React.Fragment>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">
                    React User Application
                </Typography>
            </Toolbar>
        </AppBar>
        <Container maxWidth="sm">
            <Typography variant="h4" style={styles.center}>Login</Typography>
            <form>
                <Typography variant="h4" style={styles.notification}>{message}</Typography>
                <TextField type="text" label="USERNAME" fullWidth margin="normal" name="username" value={username} onChange={onUsernameChange} />

                <TextField type="password" label="PASSWORD" fullWidth margin="normal" name="password" value={password} onChange={onPasswordChange} />

                <Button variant="contained" color="secondary" onClick={login}>Login</Button>
            </form>
        </Container>
    </React.Fragment>;
}

const styles = {
    center: {
        display: 'flex',
        justifyContent: 'center'

    },
    notification: {
        display: 'flex',
        justifyContent: 'center',
        color: '#dc3545'
    }
}

export default Login;