import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { formStyles } from '@src/formStyles';
import routes from '@src/routes';
import { postJoin } from '@src/api';
import { IJoinForm, TypeSetUserIdAction } from '@src/type';
import { setUserId } from '@redux/store/userIdStore';

const Form = formStyles.form;
const InputError = formStyles.inputError;
const FinishButtons = formStyles.finishButtons;
const Button = formStyles.button;

const InputContainer = styled(formStyles.inputContainer)`
    margin-bottom: 1em;
    &:nth-child(3){
        margin-bottom: 3em;
    }
    & input{
        margin-bottom: 1em;
    }
`

function Join({ setUserId }: { setUserId: TypeSetUserIdAction }) {
    const navigate = useNavigate();
    const { register, handleSubmit, watch, setError, formState: { errors } } = useForm<IJoinForm>({ mode: 'onChange' });
    const password = watch("password");

    const onJoin = (data: IJoinForm) => {
        postJoin({ email: data.email, password: data.password })
            .then(response => {
                const { data, data: { userId } } = response;
                data.error
                    ? (data.error.type === "join" ? navigate(routes.join) : navigate(routes.login))
                    : navigate(routes.main);
                setError("email", { message: data.error?.message });
                if (userId !== "") setUserId(userId);
            })
    }

    return (
        <Form onSubmit={handleSubmit(onJoin)}>
            <InputContainer>
                <input type='email' placeholder='Email' {...register('email', { required: "Email is required." })} />
                <InputError>{errors.email?.message}</InputError>
            </InputContainer>
            <InputContainer>
                <input type='password' placeholder='Password' {...register('password', { required: "Password is required.", validate: (value) => value.length >= 8 ? true : "Password should be longer than 8." })} />
                <InputError>{errors.password?.message}</InputError>
            </InputContainer>
            <InputContainer>
                <input type='password' placeholder='Confirm the password' {...register('passwordConfirm', { required: "To confirm the password is required.", validate: (value) => value === password ? true : "Passwords are different." })} />
                <InputError>{errors.passwordConfirm?.message}</InputError>
            </InputContainer>
            <FinishButtons>
                <Button type='submit'>Join</Button>
            </FinishButtons>
        </Form>
    )
}
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        setUserId: (userId: string) => dispatch(setUserId(userId))
    }
}
export default connect(null, mapDispatchToProps)(Join);