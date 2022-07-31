import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { formStyles } from '@src/formStyles';
import routes from '@src/routes';
import { postLogin } from '@src/api';
import { ILoginForm, ITask, TypeSetTaskListAction, TypeSetUserIdAction, TypeStore } from '@src/type';
import { setTaskList } from '@redux/store/taskStore';
import { setUserId } from '@redux/store/userIdStore';

const Form = formStyles.form;
const FinishButtons = formStyles.finishButtons;
const Button = formStyles.button;

const InputError = styled(formStyles.inputError)`
    top: -10px;
`;
const InputContainer = styled(formStyles.inputContainer)`
    margin-bottom: 3em;
    & input{
        font-size: 1em;
        margin-bottom: 1em;
    }
`
function Login({ setTaskList, setUserId }: { setTaskList: TypeSetTaskListAction, setUserId: TypeSetUserIdAction }) {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<ILoginForm>();
    const [invalidUserError, setInvalidUserError] = useState('');
    const onLogin = (data: ILoginForm) => {
        postLogin({ email: data.email, password: data.password })
            .then(response => {
                const { data: { error, userId, taskList } } = response;
                if (error) return setInvalidUserError(error.message);
                taskList?.length > 0 && setTaskList(taskList);
                userId !== "" && setUserId(userId);
                navigate(routes.main);
            })
            .catch(error => {
                console.log(error);
            });
    }
    const onJoin = () => navigate(routes.join);

    return (
        <Form onSubmit={handleSubmit(onLogin)}>
            <InputContainer>
                <InputError>{invalidUserError}</InputError>
                <input type='email' placeholder='Email' {...register('email', { required: true })} />
                <input type='password' placeholder='Password' {...register('password', { required: true })} />
            </InputContainer>
            <FinishButtons>
                <Button type='submit'>Log in</Button>
                <Button onClick={onJoin}>Join</Button>
            </FinishButtons>
        </Form>
    )
}
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        setTaskList: (taskList: ITask[]) => dispatch(setTaskList(taskList)),
        setUserId: (userId: string) => dispatch(setUserId(userId))
    }
}
export default connect(null, mapDispatchToProps)(Login);