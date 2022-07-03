import "./style.css";
import { Card } from "../../components/Card";
import { useEffect, useState } from "react";

export function Home() {
    const [studentName, setStudentName] = useState("");
    const [students, setStudentsList] = useState([]);
    const [user, setUser] = useState({ name: "", avatar: "", followers: 0 });

    function addStudents() {
        const newStudent = {
            name: studentName,
            time: new Date().toLocaleDateString("pt-br", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            }),
        };
        setStudentsList((prevStudent) => [...prevStudent, newStudent]);
    }

    useEffect(() => {
        const fetchFunc = async function () {
            const response = await fetch(
                "https://api.github.com/users/gabriel-durr"
            );
            const data = await response.json();

            setUser({
                name: data.name,
                avatar: data.avatar_url,
                followers: data.followers,
            });
        };

        fetchFunc();
    }, []);

    return (
        <div className="container">
            <header>
                <h1 className="titulo">Lista</h1>

                <div>
                    <strong>{user.name}</strong>
                    <img src={user.avatar} alt="Foto Perfil Github "></img>
                </div>
            </header>
            <input
                type="text"
                placeholder="Digite o nome ..."
                onChange={(e) => setStudentName(e.target.value)}
            />
            <button type="button" onClick={addStudents}>
                ADD
            </button>

            {students.map((studentInd) => (
                <Card
                    name={studentInd.name}
                    time={studentInd.time}
                    key={studentInd.time}
                />
            ))}
        </div>
    );
}
