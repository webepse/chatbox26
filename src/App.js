import { useState, useEffect, useRef } from 'react';
import './App.css';
import Message from './components/Message';
import Formulaire from './components/Formulaire';
import { useParams } from "react-router-dom";

// gestion firebase
import database from './base'
import { getDatabase, ref, set, remove, onValue } from 'firebase/database';

// gestion des animations
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function App() {
    let { login } = useParams();
    const [pseudo, setPseudo] = useState(login);
    const [messages, setMessages] = useState({})

    useEffect(()=>{
        console.log('test')

        const dbMessagesRef = ref(database, 'messages')
        // écouter l'event de changement de données
        onValue(dbMessagesRef, (snapshot) => {
            const data = snapshot.val()
            if(data)
            {
                setMessages(data)
            }
        })
    },[])

    const addMessage = message => {
        // copie du state Messages en vue d'ajouter le nouveau message
        const newMessages = {...messages}
        newMessages[`message-${Date.now()}`] = message
        Object.keys(newMessages).slice(0,-10).forEach(key => {
            newMessages[key] = null
        })
        set(ref(database,'/'),{
            messages: newMessages
        })
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
