import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Task from '@components/Task';
import deviceSize from '@src/deviceSize';
import { ITask, TypeStore } from '@src/type';
import { Categories } from '@redux/store/categoryStore';

const Container = styled.div`
    position: relative;
    top: 13%;
    padding: 0 15px;
    width: 70%;
    height: 80%;
    /* Make scrollbar invisible */
    &::-webkit-scrollbar { /* Chrome, Safari and Opera */
        display: none;
    }
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    overflow-y: scroll;
    
    & ul{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        list-style-type: none;
    }

    @media screen and (max-device-width: ${deviceSize.tablet}) {
        width: 100%;
    }
`;
const ContainerToDo = styled.ul``;
const ContainerDone = styled.ul``;

interface ITaskState {
    taskList: ITask[],
    category: string
}
const TaskList = ({ taskList, category }: ITaskState) => {
    const category_taskList = category === Categories.All ? taskList : taskList!.filter(task => task.category === category);
    const toDoList = category_taskList?.filter(task => task?.isDone === false);
    const DoneList = category_taskList?.filter(task => task?.isDone === true);
    return (
        <Container>
            <ContainerToDo>
                {toDoList?.map(task => <Task key={task._id} {...task} />)}
            </ContainerToDo>
            <ContainerDone>
                {DoneList?.map(task => <Task key={task._id} {...task} />)}
            </ContainerDone>
        </Container>
    )
}

const mapStateToProps = (state: TypeStore, _: any): ITaskState => {
    return {
        taskList: state.taskList,
        category: state.category,
    }
}
export default connect(mapStateToProps, null)(TaskList);