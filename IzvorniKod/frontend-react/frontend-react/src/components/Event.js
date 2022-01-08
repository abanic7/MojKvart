import React from "react"
import "./Event.css"
import duration_parser from "./EventTimeParser"
import { useHistory } from "react-router"


function Event(props) {
    const currentURL = window.location.href
    const splitURL = currentURL.split("/")
    const id = splitURL.at(-1)
    const [event, setEvent] = React.useState(undefined)

    React.useEffect(() => {
        fetch('/events')
        .then(data => data.json())
        .then(data => setEvent(data
            .filter(e => e.id == id)[0]))
    }, [])


    const [updated, setUpdated] = React.useState(new Date())
    React.useEffect(() => {}, [updated])

    const history = useHistory();

    function deleteEvent(id) {

        const options = {
            method: 'DELETE'
        }

        fetch(`/events/${id}`, options).then(response => {

            if (!response.ok) {
                console.log(response.body)

            } else {
                console.log("deleted");
                setUpdated(new Date());
                window.location.reload()
            }

        })
    }

    function submitEvent(event) {

        const data = {
            name: event.name,
            description: event.description,
            location: event.location,
            date: event.date,
            time: event.time,
            duration: event.duration,
            status: 1,
            account: {
                id: event.account.id
            }
        }

        deleteEvent(event.id)

        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        return fetch("/events", options).then(response => {

            if (response.ok) {
                setUpdated(new Date())
                window.location.reload()
            }

            else {
                console.log(response.body);
            }
            
        })
    }


    if (event !== undefined && event.account !== undefined) return (
        <>
        <div className='Event'>
            <div>
                <b>Naslov: </b>
                <span>{event.name}</span>
            </div>
            <div>
                <b>Opis: </b>
                <span>{event.description}</span>
            </div>
            <div>
                <b>Lokacija: </b>
                <span>{event.location}</span>
            </div>
            <div>
                <b>Datum: </b>
                <span>{event.date}</span>
            </div>
            <div>
                <b>Vrijeme početka: </b>
                <span>{event.time}</span>
            </div>
            <div>
                <b>Trajanje: </b>
                <span>{duration_parser(event.duration)}</span>
            </div>
            <div>
                <b>Organizator: </b>
                <span>{event.account.firstName} {event.account.lastName}</span>
            </div>
        </div>
        {(event.status == 0) ? 
            <div className="Login">
                <button className='button' type="button" onClick={() => submitEvent(event)}>Objavi</button>
                <button className='button' type="button" onClick={() => deleteEvent(event.id)}>Obriši</button>
                <button className='button' type="button" onClick={() => {history.push(`/dogadjaji/uredi/${event.id}`)}}>Uredi</button>
            </div>
        : <></>}
        </>
    )
    else return (<></>)
}

export default Event