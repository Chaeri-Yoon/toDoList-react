import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from '@components/Header';
import TaskList from '@components/TaskList';
import routes from '@src/routes';

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const AddTask = styled(Link)`
    padding: 0;
    position: fixed;
    bottom: 8px;
    width: 6em;
    height: 6em;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    z-index: 100;
    & > img{
        width: 100%;
        height: 100%;
    }
`;
export default () => {
    return (
        <Container>
            <Header />
            <TaskList />
            <AddTask to={routes.addTask} state={{ taskId: "" }}>
                <img src="https://img.icons8.com/ios-glyphs/100/003300/plus--v1.png" />
            </AddTask>
        </Container>
    )
}