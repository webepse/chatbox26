import { useState } from 'react';
import './App.css';
import Message from './components/Message';
import Formulaire from './components/Formulaire';
import { useParams } from "react-router-dom";

function App() {
    let { login } = useParams();
    const [pseudo, setPseudo] = useState(login);
    const [messages, setMessages] = useState({})

    const addMessage = message => {
        // copie du state Messages en vue d'ajouter le nouveau message
        const newMessages = {...messages}
        newMessages[`message-${Date.now()}`] = message
        setMessages(newMessages)
    }

    /*
    state messages:
    [
        'message-1216154989' =>
        {
            pseudo: 'user',
            message: text
        },
        message-1216154990 =>
        {
            pseudo: 'bot',
            message: text
        },
        message-1651615 => 
        {
            pseudo: 'jordan',
            message: 'test de message'    
        }
     ]
     */


    const myMessages = Object.keys(messages).map(
        key => (
            <Message
                key={key} 
                pseudo={messages[key].pseudo}
                message={messages[key].message}
            />
        )
    )

    return (
    <div className="box">
         <div>
             <div className="messages">
                 {myMessages}
             </div>
         </div>
         <Formulaire
            pseudo={pseudo}
            addMessage={addMessage}
            length={140}
         />
    </div>
  );
}

export default App;
