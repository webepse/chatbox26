import React, {useState} from 'react';

function Formulaire(props) {
    const [stateMessage, setStateMessage] = useState("");


    const createMessage = () => {
        const {pseudo, addMessage} = props;

        const message = {
            pseudo: pseudo,
            message: stateMessage
        }

        addMessage(message)

        // reset
        setStateMessage("")
    }

    const handleChange = event => {
        const message = event.target.value
        setStateMessage(message)
    }

    const handleSubmit = event => {
        event.preventDefault()
        createMessage()
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <textarea
                value={stateMessage}
                onChange={handleChange}
                required
                maxLength="140"
            ></textarea>
            <div className="info">
                140
            </div>
            <button type="submit">
                Envoyer
            </button>
        </form>
    );
}

export default Formulaire;