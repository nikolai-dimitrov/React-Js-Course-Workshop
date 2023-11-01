import { useEffect, useState } from "react";

import * as userService from "./services/userService";
import * as sortUtils from "./utils/sortUtils";
// import {getAll} from './services/userService';
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Search } from "./components/Search";
import { UserList } from "./components/UserList";
import { Pagination } from "./components/Pagination";
import "./App.css";

function App() {
    let [users, setUsers] = useState([]);
    let [sortState, setSortState] = useState(1);
    let [queryState, setQueryState] = useState({
        noUsers: false,
        failedToFetch: false,
        noContent: false,
    });
    //Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(5);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        userService
            .getAll()
            .then((data) => {
                setUsers((oldState) => data.users);
                setQueryState((oldState) =>
                    data.users.length > 0
                        ? { ...queryState, noUsers: false }
                        : { ...queryState, noUsers: true }
                );
                setTotalPages(Math.ceil(data.count / 5));
                setAllUsersCount(data.count);
            })
            .catch((err) => console.log("Error: " + err.message));
    }, []);

    //Pagination
    useEffect(() => {
        fetchUsers(currentPage, usersPerPage);
    }, [currentPage]);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((oldState) => oldState - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((oldState) => oldState + 1);
        }
    };
    //TODO: Fetch users with sort criteria!
    const fetchUsers = async (currentPage, pageCount) => {
        const usersObj = await userService.getAll(currentPage, pageCount);
        const count = usersObj["count"];
        setUsers((oldState) => usersObj["users"]);
        setTotalPages(Math.ceil(count / usersPerPage));
        return usersObj;
    };

    const calculatePagesHandler = async (event) => {
        const usersInPage = Number(event.target.value);
        setUsersPerPage(usersInPage);
        const usersObj = await fetchUsers(currentPage, usersPerPage);
        const count = Number(usersObj["count"]); //
        setTotalPages(Math.ceil(count / usersInPage)); //
    };
    //Pagination end.

    const submitCreateUserHandler = async (e) => {
        e.preventDefault();
        //Take form data
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        //Send ajax request to server.
        const newUser = await userService.create(data);
        //If success add new user to current state.
        if (newUser.user) {
            setUsers((oldState) => [...oldState, newUser.user]);
        }
    };

    const deleteUserHandler = async (id) => {
        await userService.remove(id);
        setUsers((oldState) => oldState.filter((u) => u._id !== id));
    };

    const userEditHandler = async (event, id) => {
        event.preventDefault();
        //Take form data
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        //Send ajax request to the server
        const updatedUser = await userService.update(data, id);
        //If success add new user to current state.
        setUsers((oldState) => [
            ...oldState.filter((u) => u._id !== id),
            updatedUser,
        ]);
    };

    //Search for users
    const searchFilterHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        //Fetch with query params here.
        const u = await userService.getFilteredUsers(
            data.search,
            data.criteria
        );
        setUsers(u);
        setQueryState((oldState) =>
            u.length <= 0
                ? {
                      ...queryState,
                      noContent: true,
                  }
                : {
                      ...queryState,
                      noContent: false,
                  }
        );
    };

    const sortUsers = async (sortParam) => {
        const mappedSortParam = sortUtils.sortMapper[sortParam];
        const newState = await userService.getSortedUsers(
            mappedSortParam,
            sortState
        );
        sortState == 1 ? setSortState(-1) : setSortState(1);

        setUsers((oldState) => newState);
    };
    return (
        <>
            <Header />
            <main className="main">
                <section className="card users-container">
                    <Search searchFilterHandler={searchFilterHandler} />
                    <UserList
                        users={users}
                        submitCreateUserHandler={submitCreateUserHandler}
                        deleteUserHandler={deleteUserHandler}
                        userEditHandler={userEditHandler}
                        sortUsers={sortUsers}
                        queryState={queryState}
                    />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        handlePrevPage={handlePrevPage}
                        handleNextPage={handleNextPage}
                        calculatePagesHandler={calculatePagesHandler}
                    />
                </section>
            </main>
            <Footer />
        </>
    );
}

export default App;
