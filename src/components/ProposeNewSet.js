import '../App.css';
import React, {Component, useState} from "react"
import UserService from "../service/user.service";

const ProposeNewSet = () => {

    const [email, setEmail] = useState('');


        UserService.getAllUsers().then((response) => {

            response.data.map((u) => {
                u.roles.map((r) => {
                    if (r.id === 1)
                        setEmail(u.email)
                })
            })
        })



    return (
        <div className="ui segment">
            <div>
                <div className="ui divided items">
                    <p> Please, send your request about new set to
                        <strong> {email}</strong>
                    </p>

                </div>
            </div>
        </div>
    )


}


export default ProposeNewSet;