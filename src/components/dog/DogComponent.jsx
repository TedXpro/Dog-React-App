import { useNavigate, useParams } from "react-router-dom"
import { createDogApi, retrieveDogApi, updateDogApi } from "../api/DogApiService"
import { useEffect, useState } from "react"
import { useAuth } from "./security/AuthContext"
import { Formik, Form, Field, ErrorMessage } from 'formik'

export default function DogComponent() {

    const { id } = useParams()
    const authContext = useAuth()



    const username = authContext.username

    // update for name, age, color, breed,
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [color, setColor] = useState('')
    const [breed, setBreed] = useState('')

    useEffect(
        () => retrieveDogs,
        [id] // only refreshed when the id value changes.
    )

    function retrieveDogs() {

        if (id != -1) {
            retrieveDogApi(username, id)
                .then(response => {
                    setName(response.data.name)
                    setAge(response.data.age)
                    setColor(response.data.color)
                    setBreed(response.data.breed)
                })
                .catch(error => console.log(error))
        }
    }

    const navigate = useNavigate()

    function onSubmit(values) {

        const dog = {
            id: id,
            username: username,
            name: values.name, // the updated value will be attached to it
            age: values.age, // the updated value will be attached to it
            color: values.color,// the updated value will be attached to it
            breed: values.breed // the updated value will be attached to it
        }
        console.log(dog)

        if (id == -1) {
            createDogApi(username, dog)
                .then(response => {
                    navigate('/dogs')
                })
                .catch(error => console.log(error))
        }
        else {
            updateDogApi(username, id, dog)
            .then(response => {
                navigate('/dogs')
            })
            .catch(error => console.log(error))
        }
    }

    function validate(values) {
        let errors = {
            // name: "Enter a valid Name",
            // color: "Enter a color"
        }

        if (values.name.length < 1) {
            errors.name = "Enter at least 1 character"
        }
        if (values.color.length < 3) {
            errors.color = "Enter at least 3 character"
        }
        if (values.breed.length < 3) {
            errors.breed = "Enter at least 3 character"
        }
        return errors
    }

    return (
        <div className="container">
            <h1>Enter Dog Details</h1>

            <div>
                {/* Formik allows the fields to have initial values and enableReinitialize
                 allows to insert the values to their respective values. */}
                <Formik initialValues={{ name, age, color, breed }}
                    enableReinitialize={true}
                    onSubmit={onSubmit}
                    validate={validate}
                    validateOnChange={false}
                    validateOnBlur={false}>
                    {
                        (props) => (
                            <Form>
                                <ErrorMessage
                                    name="name"
                                    component="div"
                                    className="alert alert-warning"
                                />

                                <fieldset className="form-group">
                                    <label>Name</label>
                                    {/* Input Format */}
                                    <Field type="text" className="form-control" name="name" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Age</label>
                                    <Field type="text" className="form-control" name="age" />
                                </fieldset>

                                <div className="m-3"></div>

                                <ErrorMessage
                                    name="breed"
                                    component="div"
                                    className="alert alert-warning"
                                />
                                <fieldset className="form-group">
                                    <label>Breed</label>
                                    <Field type="text" className="form-control" name="breed" />
                                </fieldset>

                                <div className="m-3"></div>
                                <ErrorMessage
                                    name="color"
                                    component="div"
                                    className="alert alert-warning"
                                />
                                <fieldset className="form-group">
                                    <label>Color</label>
                                    <Field type="text" className="form-control" name="color" />
                                </fieldset>
                                <div>
                                    <button className="btn btn-success m-5" type="submit">Save</button>
                                </div>

                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}