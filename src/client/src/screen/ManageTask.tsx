import { useNavigate, useLocation, Location } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { formStyles } from '@src/formStyles';
import routes from '@src/routes';
import { ITask, ITaskForm, TypeAddTaskAsyncAction, TypeEditTaskAsyncAction, TypeStore } from '@src/type';
import { Categories } from '@redux/store/categoryStore';
import { addTaskAsync, editTaskAsync } from "@redux/taskAsyncAction";

const Form = formStyles.form;
const FinishButtons = formStyles.finishButtons;
const Button = formStyles.button;

const InputContainer = styled(formStyles.inputContainer)`
    margin-bottom: 3em;
    & > *{
        margin-bottom: 1em;
    }
`
const SelectCategory = styled.select`
    width: 100%;
    padding: ${props => props.theme.buttonPadding};
`;

interface ILocation extends Location {
    state: {
        taskId: string
    }
}
function ManageTask({ taskList, category, addTaskAsync, editTaskAsync }: { taskList: ITask[], category: string, addTaskAsync: TypeAddTaskAsyncAction, editTaskAsync: TypeEditTaskAsyncAction }) {
    const navigate = useNavigate();
    const { state: { taskId } } = useLocation() as ILocation;

    const cur_task = taskId !== "" ? taskList.find(task => task._id === taskId) : null;
    const categories = Object.keys(Categories);

    const { register, handleSubmit } = useForm<ITaskForm>();
    const onReturnToMain = () => navigate(routes.main);
    const onAddTask = (data: ITaskForm) => addTaskAsync(data);
    const onEditTask = (data: ITaskForm) => editTaskAsync({ taskId, data });

    return (
        <Form onSubmit={handleSubmit((data) => {
            cur_task ? onEditTask(data) : onAddTask(data);
            onReturnToMain();
        })}>
            <InputContainer>
                <input type="text" defaultValue={cur_task?.text} {...register("text", { required: true })} />
                <SelectCategory defaultValue={category} {...register("category")}>
                    {categories?.map((category: string, index) => <option key={index}>{category}</option>)}
                </SelectCategory>
            </InputContainer>
            <FinishButtons>
                <Button type="submit">{cur_task ? "Update" : "Add"}</Button>
                <Button type="reset" onClick={onReturnToMain}>Close</Button>
            </FinishButtons>
        </Form>
    )
}
const mapStateToProps = (state: TypeStore) => {
    return {
        taskList: state.taskList,
        category: state.category
    }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addTaskAsync: (data: ITaskForm) => dispatch<any>(addTaskAsync(data)),
        editTaskAsync: ({ taskId, data }: { taskId: string, data?: ITaskForm }) => dispatch<any>(editTaskAsync({ taskId, data }))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageTask);