import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from "react";
import './peopleregister.css';

function People({ people, deleteUser, key }) {
    const name = people.name;
    return (
        <div className="peopleContainer">
            <img src={people.picture.medium} alt={name.first} />
            <li>{name.title}, {name.first} {name.last}</li>
            <li>{people.email}</li>
            <li>{people.cell}</li>
            <Button variant='danger' onClick={() => deleteUser(people.email)}>Remove</Button>
        </div>
    )

}

function PeopleList({ peopleList, peopleSearch, deleteUser }) {

    const peopleListLoop = () => {
        let li = [];
        peopleList.forEach(people => {
            if (
                people.name.first.toLowerCase().indexOf(
                    peopleSearch.toLowerCase()
                ) === -1
            ) {
                return;
            }
            li.push(<People people={people} key={people.email} deleteUser={deleteUser} />)
        })
        return li;
    }
    return (

        <ul className="peoplesContainer">
            {peopleListLoop()}
        </ul>
    )
}

function SearchBar({ searchPeople }) {
    return (
        <form>
            <input type="text" placeholder="Search by name" onChange={(e) => searchPeople(e.target.value)} />
        </form>
    )
}

export default function PeopleRegister() {
    const [peopleList, setPeopleList] = useState([]);
    const [peopleSearch, setPeopleSearch] = useState("");

    function updatePeopleList(data) {
        setPeopleList(data.results);
    }

    function deleteUser(key) {
        let tempPeopleList = peopleList.filter(e => e.email != key);
        console.log(tempPeopleList);
        setPeopleList(tempPeopleList);
    }

    useEffect(() => {
        fetch("https://randomuser.me/api/?results=10")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                updatePeopleList(data);
            });
    }, [])

    return (
        <>
            <SearchBar searchPeople={setPeopleSearch} />
            <PeopleList peopleList={peopleList} peopleSearch={peopleSearch} deleteUser={deleteUser} />
        </>
    )

}