import styled from 'styled-components';
import deviceSize from '@src/deviceSize';

const Form = styled.form`
    max-width: 720px;
    margin: auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    & > *{
        width: 50%;
        height: 40px;
        @media screen and (max-device-width: ${deviceSize.tablet}) {
            height: 30px; 
        }
    }
`;
const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const InputError = styled.span`
    position: relative;
    top: -5px;
    color: red;
    font-size: 10px;
`;
const FinishButtons = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Button = styled.button`
    width: 40%;
    padding: ${props => props.theme.buttonPadding};
    background-color: ${props => props.theme.themeColor};
    color: ${props => props.theme.white};
    &:first-child{
        margin-right: 8%;
        @media screen and (max-device-width: ${deviceSize.tablet}) {
            margin-right: 3%;
        }
    }
    @media screen and (max-device-width: ${deviceSize.mobile}) {
        width: 40%;
    }
    @media screen and (max-device-width: ${deviceSize.mobile}) {
        padding: ${props => props.theme.buttonPadding};
        width: 50%;
    }
`;
export const formStyles = {
    form: Form,
    finishButtons: FinishButtons,
    button: Button,
    inputContainer: InputContainer,
    inputError: InputError
}