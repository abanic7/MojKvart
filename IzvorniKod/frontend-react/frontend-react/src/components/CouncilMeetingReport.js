import React from "react"
import Card from "./Card"
import { useHistory } from "react-router"
import { ReactSession } from "react-client-session"

function CouncilMeetingReport() {

    const [meeting, setMeeting] = React.useState([])
    const [account, setAccount] = React.useState({id: ''})
    const [roles, setRoles] = React.useState([{name: "temp"}])

    const currentURL = window.location.href
    const splitURL = currentURL.split("/")
    const id = splitURL.at(-1)

    const history = useHistory()
    const acc_username = ReactSession.get("username")

    React.useEffect(() => {
        fetch(`/council/${id}`)
        .then(data => data.json())
        .then(data => setMeeting(data))
    }, [])

    React.useEffect(() => {
        fetch(`/accounts/${acc_username}`)
        .then(data => data.json())
        .then(account => setAccount(account))
    }, [])

    React.useEffect(() => {
        fetch((account.id === undefined ? "/roles" : `/accounts/roles/${account.id}`))
        .then(data => data.json())
        .then(roles => setRoles(roles))
    }, [account])

    function deleteMeeting(id) {

        const options = {
            method: 'DELETE',
        }
        
        fetch(`/council/${id}`, options).then(response => {
            if (!response.ok) {
                console.log(response.body)
            } else {
                console.log("deleted");
                history.push("/vijece")
            }
        })
    }

    if (meeting.account !== undefined) {

        if (roles !== undefined && roles.length > 0 && roles.filter(r => r.name === "Vijecnik").length > 0) return (
            <Card title={meeting.title}>
                <div className="inner">
                    <div class="Event">
                        <div>
                            <b>Datum: </b>
                            <span>{meeting.dateTime}</span>
                        </div>
                        <div>
                            <b>Autor: </b>
                            <span>{`${meeting.account.firstName} ${meeting.account.lastName}`}</span>
                        </div>
                        <div>
                            <b>Izvješće: </b>
                            <span>{meeting.report}</span>
                        </div>
                        <div className='Login'>
                            <button className='button' type="button" onClick={() => history.push(`/vijece/izvjesce/uredi/${id}`)}>Uredi</button>
                            <button className='button' type="button" onClick={() => deleteMeeting(meeting.id)}>Obriši</button>
                        </div>
                    </div>        
                </div>
        </Card>
        )
        else return (
            <Card title={meeting.title}>
                <div className="inner">
                    <div class="Event">
                        <div>
                            <b>Datum: </b>
                            <span>{meeting.dateTime}</span>
                        </div>
                        <div>
                            <b>Autor: </b>
                            <span>{`${meeting.account.firstName} ${meeting.account.lastName}`}</span>
                        </div>
                        <div>
                            <b>Izvješće: </b>
                            <span>{meeting.report}</span>
                        </div>
                    </div>
                </div> 
        </Card>
        )

    }
    else return (
        <></>
    )
}

export default CouncilMeetingReport