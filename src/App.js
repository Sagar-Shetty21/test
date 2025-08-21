import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
    let [users, setUsers] = useState({});
    let [currentPage, setCurrentPage] = useState(1);
    let [totalUsers, setTotalUsers] = useState(0);
    const options = {
        method: "GET",
        url: `http://localhost:8080/users?page=${currentPage}`,
    };

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    const fetchData = async () => {
        try {
            const response = await axios.request(options);
            setUsers(response.data.data);
            setTotalUsers(response?.data?.data?.total);
        } catch (error) {
            console.error(error);
        }
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => prev + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage((prev) => prev - 1);
    };

    return (
        <div>
            <h1>Users list</h1>
            <hr />
            <div>
                {users &&
                    users?.data &&
                    users?.data?.map((u, i) => {
                        return <div key={i}>{u.first_name}</div>;
                    })}
            </div>
            <hr />
            <div>current page: {currentPage}</div>
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
                Prev Page
            </button>
            <button
                onClick={handleNextPage}
                disabled={currentPage * 5 >= totalUsers}
            >
                Next Page
            </button>
        </div>
    );
}

export default App;
