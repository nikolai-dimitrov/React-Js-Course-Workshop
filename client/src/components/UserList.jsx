import { useState } from "react";
import { User } from "./User";
import * as userService from "../services/userService";
import { UserDetails } from "./UserDetails";
import { UserModify } from "./UserModify";
import { UserDelete } from "./UserDelete";
import { FailedFetchError } from "./FailedFetchError";
import { NoUsersError } from "./NoUsersError";
import { NoContentError } from "./NoContentError";
import { LoadingSpinner } from "./LoadingSpinner";
export const UserList = ({
    users,
    submitCreateUserHandler,
    deleteUserHandler,
    userEditHandler,
    sortUsers,
    queryState,
}) => {
    // States
    //User info state
    let [selectedUser, setSelectedUser] = useState(null);

    //User delete state
    // Variant 1 state with object for delete and edit.
    let [showUserDeleteModal, setShowUserDeleteModal] = useState({
        isOpened: false,
        id: null,
    });

    //User edit state
    // Variant 2 state with null (if id or true -> render else nothing)
    let [showUserEditForm, setShowUserEditForm] = useState(null);

    //User create state.
    let [showUserAddForm, setShowUserAddForm] = useState(false);

    // User information
    const showUserInfoHandler = async (id) => {
        const user = await userService.getOne(id);
        setSelectedUser(Object.values(user)[0]);
    };

    //Close all/current modal(s) by button cancel or X
    const closeModalHandler = () => {
        setShowUserAddForm(false);
        setShowUserEditForm(null);
        setSelectedUser(null);
        setShowUserDeleteModal({ isOpened: false, id: null });
    };
    // User create
    const showUserCreateHandler = () => {
        setShowUserAddForm(true);
    };

    const submitUserCreate = (event, formValues) => {
        submitCreateUserHandler(event, formValues);
        setShowUserAddForm(false);
    };

    //User edit
    const showUserEditHandler = async (id) => {
        const currentUser = await userService.getOne(id);
        setShowUserEditForm((oldState) => currentUser.user);
    };

    const submitUserEdit = (event, formValues, id) => {
        userEditHandler(event, formValues, id);
        setShowUserEditForm(null);
    };

    // User delete
    const showUserDeleteHandler = (id) => {
        const newState = {
            isOpened: true,
            id: id,
        };
        setShowUserDeleteModal(newState);
    };

    const deleteUser = (id) => {
        deleteUserHandler(id);
        setShowUserDeleteModal({
            isOpened: false,
            id: null,
        });
    };
    const usersSortHandler = (event) => {
        if (event.target.textContent != "Actions") {
            sortUsers(event.target.textContent);
        }
    };
    return (
        <>
            {selectedUser && (
                <UserDetails
                    {...selectedUser}
                    closeModalHandler={closeModalHandler}
                />
            )}
            {/* CREATE */}
            {showUserAddForm && (
                <UserModify
                    closeModalHandler={closeModalHandler}
                    submitForm={submitUserCreate}
                />
            )}

            {/* EDIT */}
            {showUserEditForm && (
                <UserModify
                    submitForm={submitUserEdit}
                    closeModalHandler={closeModalHandler}
                    currentUser={showUserEditForm}
                />
            )}

            {showUserDeleteModal.isOpened && (
                <UserDelete
                    deleteUser={deleteUser}
                    id={showUserDeleteModal.id}
                    closeModalHandler={closeModalHandler}
                />
            )}

            <div className="table-wrapper">
                <table className="table">
                    <thead>
                        <tr onClick={usersSortHandler}>
                            <th>Image</th>
                            <th>
                                First name
                                <svg
                                    className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="arrow-down"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                                    ></path>
                                </svg>
                            </th>
                            <th>
                                Last name
                                <svg
                                    className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="arrow-down"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                                    ></path>
                                </svg>
                            </th>
                            <th>
                                Email
                                <svg
                                    className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="arrow-down"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                                    ></path>
                                </svg>
                            </th>
                            <th>
                                Phone
                                <svg
                                    className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="arrow-down"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                                    ></path>
                                </svg>
                            </th>
                            <th>
                                Created
                                <svg
                                    className="icon active-icon svg-inline--fa fa-arrow-down Table_icon__+HHgn"
                                    aria-hidden="true"
                                    focusable="false"
                                    data-prefix="fas"
                                    data-icon="arrow-down"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 384 512"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z"
                                    ></path>
                                </svg>
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {users.length === 0 &&
                    queryState.noUsers === false &&
                    queryState.noContent === false ? (
                        <LoadingSpinner />
                    ) : (
                        ""
                    )}
                    {Object.values(queryState).some((v) => v === true) ? (
                        <div className="loading-shade">
                            {queryState.noUsers && <NoUsersError />}
                            {queryState.noContent && <NoContentError />}
                        </div>
                    ) : (
                        <tbody>
                            {users.map((u) => (
                                <User
                                    key={u._id}
                                    {...u}
                                    showUserInfoHandler={showUserInfoHandler}
                                    showUserDeleteHandler={
                                        showUserDeleteHandler
                                    }
                                    showUserEditHandler={showUserEditHandler}
                                />
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
            <button className="btn-add btn" onClick={showUserCreateHandler}>
                Add new user
            </button>
        </>
    );
};

// {queryState.noContent === true ? (
//   <div className="loading-shade">
//       <NoContentError />
//   </div>
// ) : (
//   <tbody>
//       {users.map((u) => (
//           <User
//               key={u._id}
//               {...u}
//               showUserInfoHandler={showUserInfoHandler}
//               showUserDeleteHandler={
//                   showUserDeleteHandler
//               }
//               showUserEditHandler={showUserEditHandler}
//           />
//       ))}
//   </tbody>
// )}
