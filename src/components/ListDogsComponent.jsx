import { useState } from "react"
import {useNavigate} from "react-router-dom"

function ListDogsComponent() {

    const navigate = useNavigate()

    const [dogs, setDogs] = useState([])
    
    function updateDog(id) {
        navigate(`/dog/${id}`)
    }

    function addNewDog(id) {
        navigate(`/dog/-1`)
    }

    return (
        <div className="container">
            <h1>List of Dogs</h1>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Color</th>
                            <th>Breed</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dogs.map(
                                dog => (
                                    <tr key={dogs.id}>
                                        <td>{dogs.name}</td>
                                        <td>{dogs.age}</td>
                                        <td>{dogs.color}</td>
                                        <td>{dogs.breed}</td>
                                        <td><button className="btn btn-success"
                                            onClick={() => updateDog(dog.id)}>Update</button></td>
                                        <td><button className="btn btn-warning"
                                            onClick={() => deleteDog(dog.id)}>Delete</button></td>
                                    </tr>
                                )
                            )

                        }
                    </tbody>
                </table>
            </div>
            <div className="btn btn-success m-5" onClick={addNewDog}>Add New Dog</div>
        </div>
    )
}