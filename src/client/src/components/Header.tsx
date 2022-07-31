import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import styled from "styled-components";
import { getLogout } from "@src/api";
import deviceSize from "@src/deviceSize";
import routes from "@src/routes";
import { TypeInitializeDataAsyncAction, TypeSetCategoryAction, TypeStore } from "@src/type";
import { initializeDataAsyncAction } from "@redux/store";
import { Categories, setCategory } from "@redux/store/categoryStore";


const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 3em;
    z-index: 100;

    display: flex;
    justify-content: space-between;

    background-color: ${props => props.theme.themeColor};
    color: ${props => props.theme.white};

    & select{
        width: 70%;
        text-align: center;
        font-weight: 600;
    }
`;
const UserButtons = styled.div`
    width: 20%;
    padding-right: 15px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 0.8em;

    & > button {
        margin-left: 1em;
        padding: ${props => props.theme.buttonPadding};
        border-radius: 32px;
        border: none;
        @media screen and (max-device-width: ${deviceSize.tablet}) {
            border-radius: 20px;
        }
    }
`;
const Join = styled(Link)`
    display: block;
    @media screen and (max-device-width: ${deviceSize.mobile}) {
        display: none;
    }
`;
const Header = ({ category, setCategory, userId, initializeDataAsyncAction }: { category: string, setCategory: TypeSetCategoryAction, userId: string, initializeDataAsyncAction: TypeInitializeDataAsyncAction }) => {
    const navigate = useNavigate();
    const categories = Object.keys(Categories);
    const handleCategoryChange = (event: React.FormEvent<HTMLSelectElement>) => setCategory(event.currentTarget.value);
    const onLoginClicked = () => navigate(routes.login);
    const onLogoutClicked = () => {
        getLogout().then(response => {
            const { data } = response;
            if (!data.error) initializeDataAsyncAction([]);
            navigate(routes.main);
        })
    }

    return (
        <Container>
            <select value={category} onChange={handleCategoryChange}>
                {categories?.map((category: string, index) => <option key={index} value={category}>{category}</option>)}
            </select>
            <UserButtons>
                {!userId && <Join to={routes.join}>Join</Join>}
                <button onClick={userId ? onLogoutClicked : onLoginClicked}>{userId ? "Logout" : "Login"}</button>
            </UserButtons>
        </Container>
    )
}
const mapStateToProps = (state: TypeStore) => {
    return {
        category: state.category,
        userId: state.userId
    }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        setCategory: (category: string) => dispatch(setCategory(category)),
        initializeDataAsyncAction: () => dispatch<any>(initializeDataAsyncAction([]))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);