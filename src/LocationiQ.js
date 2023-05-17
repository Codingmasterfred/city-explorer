import axios from 'axios';
//  axios library is required to access LocationIQ, which in turn is used to access the map component.
import React from "react";
import Form from 'react-bootstrap/Form';
import { useState } from "react";
// in order to use the differents states to make changes or updates
import Card from "react-bootstrap/Card"
import Table from 'react-bootstrap/Table';

function GetLocationData() {
    const [Change, ChangeFunction] = useState("")
    // is used to change data from the LocationIQ api the based off the user input
    const [image, imageFunction] = useState({})
    // is used to change the image based off the data recieved from the LocationIQ api
    const [errorMessage, errorMessageFunction] = useState({})
    // is used to puts the error message into an object data type 
    const [errorMessageforbackend, errorMessageFunctionforbackend] = useState({})

    const [displayweather, displayweatherfunction] = useState([])

    let FetchData = async (event) => {
        try {
            event.preventDefault()
            console.log(process.env.REACT_APP_LOCATIONIQ_API_KEY)
            let response = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${Change}&format=json`)
            //When used with an async function, await pauses the execution of the function until the .get execute which get information from the server to the clients . 
            console.log(response)
            imageFunction(response.data[0])
            // displayweatherfunction()
            // sets the value of the image from the state based off the input
            errorMessageFunction({})
            FetchData2()

        }
        catch (error) {
            errorMessageFunctionforbackend(error)
            errorMessageFunction(error)
            // if the response goes wrong then the error will appear inside of the object data structure
            console.log(error)
        }
        // The try...catch block works by wrapping the code that may potentially throw an error in the try block, and catching any errors in the catch block. This allows for more graceful handling of errors, preventing the component from crashing and providing the opportunity to handle the error in a more controlled manner.
    }
    let FetchData2 = async (event) => {
        // create a new async function named FetchData2

        try {
            let result = await axios.get(`http://localhost:3001/weather?searchQuery=${Change}`)
            // await with the async function wait for the promise to return before continuing rendering the rest of the code 
            //axios.get() method is used to get 
            console.log(result)
            displayweatherfunction(result.data)
        }
        catch (error) {

            console.log(error)
        }

    }


    let ImageView = image.lon && image.lat ? `https://maps.locationiq.com/v3/staticmap?key=pk.858228159b59b411fc2826e2fbfea459&center=${image.lat},${image.lon}&zoom=12` : ""

    function onchange(event) {
        // onchange will update value as it changes 
        ChangeFunction(event.target.value)
    }
    return (
        <div id="LocationDiv">
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control style={{ textAlign: "center", margin: "10px" }} onChange={onchange} type="text" placeholder="Type A Location" />
                    {/* form.control asts as a input and as the input is typing it changes */}
                    <button onClick={FetchData}>Explore!!</button>
                </Form.Group>
                {/* in order to recieve the data you will have to click this button */}
            </Form>

            <Card style={{ width: '450px', height: '400px' }} id='card'>
                <Card.Body style={{ backgroundColor: '#2E7D32' }}>
                    <Card.Title className='cityInfo'>{image.display_name}</Card.Title>
                    <Card.Text id='lonAndlad'>
                        <span className='cityInfo'>Longitude: {image.lon}</span>
                        <span className='cityInfo'>Latitude: {image.lat}</span>
                        {errorMessage.message}
                    </Card.Text>
                    {<img id="Map" src={ImageView} style={{ display: ImageView ? "block" : "none", width: "100%" }} ></img>}
                </Card.Body>
            </Card>
                    <div>{displayweather.map(arr => {
                        return (<div>
            <Table id="table" striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Location</th>
                        <th>Weather</th>
                        <th>Longitude</th>
                        <th>Latitude</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{Change}</td>
                        <td>{arr.description}</td>
                        <td>{arr.lon}</td>
                        <td>{arr.lat}</td>
                    </tr>
                </tbody>
            </Table>
                        </div>)
                    })}</div>
        </div >

    )

}


export default GetLocationData