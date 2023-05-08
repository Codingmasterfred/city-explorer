import axios from 'axios';
//  axios library is required to access LocationIQ, which in turn is used to access the map component.
import React from "react";
import Form from 'react-bootstrap/Form';
import { useState } from "react";
// in order to use the differents states to make changes or updates
import Card from "react-bootstrap/Card"

function GetLocationData() {
    const [Change, ChangeFunction] = useState("")
    // is used to change data from the LocationIQ api the based off the user input
    const [image, imageFunction] = useState({})
    // is used to change the image based off the data recieved from the LocationIQ api
    const [errorMessage, errorMessageFunction] = useState({})
    // is used to puts the error message into an object data type 

    let FetchData = async (event) => {
        try {
            event.preventDefault()
            console.log(process.env.REACT_APP_LOCATIONIQ_API_KEY)
            let response = await axios.get(`https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${Change}&format=json`)
            //When used with an async function, await pauses the execution of the function until the .get execute which get information from the server to the clients . 
            console.log(response)
            imageFunction(response.data[0])
            // sets the value of the image from the state based off the input
             errorMessageFunction({})

        }
        catch (error) {
            errorMessageFunction(error)
            // if the response goes wrong then the error will appear inside of the object data structure
            console.log(error)
        }
        // The try...catch block works by wrapping the code that may potentially throw an error in the try block, and catching any errors in the catch block. This allows for more graceful handling of errors, preventing the component from crashing and providing the opportunity to handle the error in a more controlled manner.
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
                    <Form.Control style = {{textAlign : "center" , margin: "10px"}} onChange={onchange} type="text" placeholder="Type A Location" />
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
                    {<img id="Map" src={ImageView} style={{display: ImageView ? "block" : "none" , width: "100%"}} ></img>}
                </Card.Body>
            </Card>
        </div >

    )

}


export default GetLocationData