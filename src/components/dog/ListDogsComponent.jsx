import { useEffect, useState } from "react"
import { deleteDogApi, retrieveAllDogsForUsernameApi } from "../api/DogApiService"
import { useAuth } from "./security/AuthContext"
import { useNavigate } from "react-router-dom"

export default function ListDogsComponent() {

    const [dogs, setDogs] = useState([])

    useEffect(() => refreshDogs(), [])

    const [message, setMessage] = useState(null)

    const authContext = useAuth()
    const username = authContext.username

    function refreshDogs() {
        retrieveAllDogsForUsernameApi(username)
            .then(response => {
                setDogs(response.data)
            })
            .catch(error => console.log(error))
    }



    function deleteDog(id, name) {
        console.log("clicked" + id)
        deleteDogApi(username, id)
            .then(
                () => {
                    setMessage(`${name} has successfully been deleted.`)
                    refreshDogs()
                }
            )
            .catch(error => console.log(error))
    }

    const navigate = useNavigate()

    function updateDog(id) {
        console.log("clicked" + id)
        navigate(`/dog/${id}`)
    }

    function addNewDog() {
        navigate('/dog/-1')
    }

    return (
        <div className="container">
            <div>
                <h1>Dogs</h1>
                {message && <div className="alert alert-warning">{message}</div>}
            </div>

            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Breed</th>
                            <th>Color</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            dogs.map(dog => (
                                <tr key={dog.id}>
                                    <td>{dog.name}</td>
                                    <td>{dog.age}</td>
                                    <td>{dog.breed}</td>
                                    <td>{dog.color}</td>
                                    <td><button className="btn btn-warning" onClick={() => deleteDog(dog.id, dog.name)}>Delete</button></td>
                                    <td><button className="btn btn-success" onClick={() => updateDog(dog.id)}>Update</button></td>
                                </tr>
                            ))
                        }


                    </tbody>
                </table>
            </div>
            <div className="btn btn-success m-5"
            onClick={addNewDog}>Add New Dog</div>
        </div>
    )
}