import { useContext, useState } from 'react';
import Link from 'next/link';
import { Box, Button, Chip, Grid, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../../components/layouts'
import { validations } from '@/utils';
import { useForm } from 'react-hook-form';
import { tesloApi } from '@/api';
import { ErrorOutline } from '@mui/icons-material';
import router, { useRouter } from 'next/router';
import { AuthContext } from '@/context';
import { set } from 'mongoose';

interface formData {
    name: string;
    email: string;
    password: string;
}

const RegisterPage = () => {
    const router = useRouter();
    const { registerUser } = useContext(AuthContext)

    const [showError, setShowError] = useState(false);
    const { register, handleSubmit, watch, formState: { errors }, } = useForm<formData>(); //Requerido para usar react-hook-form
    const [errorMessage, setErrorMessage] = useState('')

    const onRegisterForm = async ({ name, email, password }: formData) => {

        setShowError(false)
        const { hasError, message } = await registerUser(name, email, password);

        if (hasError) {
            setShowError(true)
            setErrorMessage(message)
            setTimeout(() => {
                setShowError(false)
            }, 5000);
            return;
        }

        router.replace('/');

    };


    return (
        <AuthLayout title={'Ingresar'}>
            <form onSubmit={handleSubmit(onRegisterForm)}>
                <Box sx={{ width: 350, padding: '10px 20px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h1' component="h1">Crear cuenta</Typography>
                        </Grid>


                        <Grid item xs={12}>
                            <Chip
                                label="Choose another User or Email"
                                color="error"
                                variant="outlined"

                                icon={<ErrorOutline />}
                                className='fadeIn '
                                sx={{ display: showError ? 'flex' : 'none' }}


                            />
                            <TextField
                                label="Name"
                                variant="filled"
                                fullWidth
                                {...register('name', {
                                    required: 'Name required',
                                    minLength: { value: 2, message: 'Min 2 characteres' }
                                })}
                                error={!!errors.name}
                                helperText={errors.name?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Email"
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
                                label="Password"
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
                                type='submit'
                                color="secondary"
                                className='circular-btn'
                                size='large'
                                fullWidth
                            >
                                Ingresar
                            </Button>
                        </Grid>

                        <Grid item xs={12} display='flex' justifyContent='end'>

                            <Link href="/auth/login" >
                                ¿Ya tienes cuenta?
                            </Link>

                        </Grid>
                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    )
}

export default RegisterPage