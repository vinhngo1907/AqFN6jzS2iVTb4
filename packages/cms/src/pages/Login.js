import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Card, Stack, Container, Typography } from '@material-ui/core';

// components
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';
import { LoginForm } from "../components/authentication/login";

//
import * as apis from '../apis';

// -----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex'
    }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
    width: '100%',
    maxWidth: 464,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(12, 0)
}));

// -----------------------------------------------------------------------

function Login() {
    const navigate = useNavigate();
    useEffect(() => {
            (async function fetchUserProfile() {
                try {
                    if ((await apis.auth.profile())) {
                        navigate('/dashboard/app', { replace: true });
                    }
                } catch (error) {
                    // ignore
                }
            })();
        },[navigate]);
    return (
        <RootStyle>
            <MHidden width="mdDown">
                <SectionStyle>
                    <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>Hi welcome back</Typography>
                    <img src="/static/illustrations/illustration_login.png" alt="login" />
                </SectionStyle>
            </MHidden>
            <Container maxWidth="sm">
                <ContentStyle>
                    <Stack sx={{ mb: 5 }}>
                        <Typography variant="h4" gutterBottom>
                            Sign in to Minimal
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
                    </Stack>
                    <LoginForm />
                </ContentStyle>
            </Container>
        </RootStyle>
    )
}

export default Login