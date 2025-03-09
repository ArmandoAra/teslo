import { useContext, useState } from 'react';

import Link from 'next/link';
import { useForm } from 'react-hook-form';

//mui
import { Box, Button, Chip, Grid, TextField, Typography } from '@mui/material';

//components
import { AuthLayout } from '../../components/layouts';
import { isEmail } from '../../utils/validations';
import { validations } from '@/utils';
import { tesloApi } from '@/api';
import { ErrorOutline } from '@mui/icons-material';
import { set } from 'mongoose';
import { AuthContext } from '@/context';
import router, { useRouter } from 'next/router';

//interfaces
interface formData {
    email: string;
    password: string;
}

const LoginPage = () => {

    //router
    const router = useRouter()

    //login del context
    const { loginUser } = useContext(AuthContext)

    const [showError, setShowError] = useState(false)

    const { register, handleSubmit, watch, formState: { errors }, } = useForm<formData>();

    const onLoginUser = async ({ email, password }: formData) => {

        setShowError(false)

        const isValidLogin = await loginUser(email, password);

        if (!isValidLogin) {
            setShowError(true)
            setTimeout(() => {
                setShowError(false)
            }, 3000);
            return;
        }


        //TODO - navegar a la pagina que el usuario estaba
        router.replace('/user/profile')

    }


    return (
        <AuthLayout title={'Ingresar'}>
            <form onSubmit={handleSubmit(onLoginUser)}>
                <Box sx={{ width: 350, padding: '10px 20px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h1' component="h1">Iniciar Sesión</Typography>
                            {/* Mensaje de error si no se puede logear */}

                            <Chip
                                label="User or password incorrect"
                                color="error"
                                variant="outlined"

                                icon={<ErrorOutline />}
                                className='fadeIn '
                                sx={{ display: showError ? 'flex' : 'none' }}


                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                type='email'
                                label="Correo"
                                variant="filled"
                                fullWidth
                                {...register('email', {
                                    required: 'Email required',
                                    validate: (value) => validations.isEmail(value),
                                })}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Contraseña"
                                type='password'
                                variant="filled"
                                fullWidth
                                {...register('password', {
                                    required: 'Password required',
                                    minLength: { value: 6, message: 'Min 6 characteres' }

                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                type='submit' //para que el boton haga submit
                                color="secondary"
                                className='circular-btn'
                                size='large'
                                fullWidth>
                                Ingresar
                            </Button>
                        </Grid>

                        <Grid item xs={12} display='flex' justifyContent='end'>
                            <Link href="/auth/register"  >
                                ¿No tienes cuenta?
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    )
}

export default LoginPage