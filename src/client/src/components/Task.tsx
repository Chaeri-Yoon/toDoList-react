import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import styled from 'styled-components';
import routes from '@src/routes';
import { ITaskForm, TypeDeleteTaskAsyncAction, TypeEditTaskAsyncAction } from '@src/type';
import { theme } from '@src/theme';
import deviceSize from '@src/deviceSize';
import { editTaskAsync, deleteTaskAsync } from '@redux/taskAsyncAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCircle, faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Container = styled.li<{ isDone: boolean }>`
    position: relative;
    padding: 1em;
    margin-bottom: 13px;
    width: 70%;

    display: flex;
    justify-content: space-between;
    align-items: center;

    border: 1px solid ${props => props.theme.white};
    border-radius: 20px;
    background-color: ${props => props.isDone ? props.theme.gray : props.theme.themeColor};
    font-size: 1em;

    & > a,
    & > a:visited{
        background-color: transparent;
        color: ${props => props.isDone ? props.theme.themeColor : props.theme.white};
    }
    & > span{
        color: ${props => props.isDone ? props.theme.themeColor : props.theme.white};
    }
    @media screen and (max-device-width: ${deviceSize.mobile}){
        padding: 8px 1em;
    }
`;
const Text = styled.span`
    margin-right: 7em;
    width: 100%;
    font-size: 0.8em;
`;
const Buttons = styled.div`
    width: 50%;
    position: absolute;
    right: 1em;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;
const Button = styled.button`
    margin-left: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    @media screen and (max-device-width: ${deviceSize.tablet}) {
        margin-left: 0.5em;
    }
`;

function Task({ text, _id, isDone, editTaskAsync, deleteTaskAsync }: { text: string, _id: string, isDone: boolean, editTaskAsync: TypeEditTaskAsyncAction, deleteTaskAsync: TypeDeleteTaskAsyncAction }) {
    const onDeleteBtnClicked = () => deleteTaskAsync(_id);
    const isDoneToggle = () => editTaskAsync({ taskId: _id });
    return (
        <Container isDone={isDone}>
            <Text>{text}</Text>
            <Buttons>
                <Link to={routes.editTask} state={{ taskId: _id }}><FontAwesomeIcon icon={faPencilAlt} color={isDone ? theme.themeColor : theme.white} /></Link>
                <Button onClick={onDeleteBtnClicked} ><FontAwesomeIcon icon={faTrashAlt} color={isDone ? theme.themeColor : theme.white} /></Button>
                <Button onClick={isDoneToggle}>
                    {isDone ? <FontAwesomeIcon icon={faCheckCircle} color={isDone ? theme.themeColor : theme.white} /> : <FontAwesomeIcon icon={faCircle} color={isDone ? theme.themeColor : theme.white} />}
                </Button>
            </Buttons>
        </Container>
    )
}
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        editTaskAsync: ({ taskId, data }: { taskId: string, data?: ITaskForm }) => dispatch<any>(editTaskAsync({ taskId, data })),
        deleteTaskAsync: (taskId: string) => dispatch<any>(deleteTaskAsync(taskId))
    }
}
export default connect(null, mapDispatchToProps)(Task);