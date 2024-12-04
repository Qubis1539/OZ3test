import React from "react";
import { useEffect, useState } from "react";
import SortUsers from "./SortUsers.jsx";

const UsersTable = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [sortedUsers, setSortedUsers] = useState([]);
    const [isAscending, setIsAscending] = useState(true);

    const renderUsers = () => {
        return sortedUsers.map((user) => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.registration_date}</td>
                    <td>{user.status}</td>
                </tr>
            );
        });
    };

    const filterUsers = (users) => {
        let newSortedUsers;
        if (isAscending) {
            newSortedUsers = [...users].sort((a, b) => a.name.localeCompare(b.name, "ru"));
        } else {
            newSortedUsers = [...users].sort((a, b) => b.name.localeCompare(a.name, "ru"));
        }

        setSortedUsers(newSortedUsers);
        return newSortedUsers;
    };

    function toggleSort() {
        setIsAscending(!isAscending);
    }

    useEffect(() => {
        filterUsers(allUsers);
    }, [isAscending]);

    useEffect(() => {
        fetch("/users")
            .then((response) => response.json())
            .then((data) => {
                setAllUsers(data.users);
                setSortedUsers(filterUsers(data.users));
            });
    }, []);
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <td>id</td>
                        <td>name</td>
                        <td>email</td>
                        <td>phone</td>
                        <td>registration_date</td>
                        <td>status</td>
                    </tr>
                </thead>
                <tbody>{renderUsers()}</tbody>
            </table>
            <SortUsers onSort={toggleSort} />
        </>
    );
};

export default UsersTable;
