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
import './animation.css'

function App() {
    let { login } = useParams();
    const [pseudo, setPseudo] = useState(login);
    const [messages, setMessages] = useState({})
    const nodeRef = useRef()
    const messageRef = useRef()

    const isUser = myPseudo => myPseudo === pseudo

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
            <CSSTransition
                key={key} 
                timeout={200}
                classNames={"fade"}
                nodeRef={nodeRef}
            >
                <Message
                    isUser={isUser}
                    pseudo={messages[key].pseudo}
                    message={messages[key].message}
                />
            </CSSTransition>
        )
    )

    return (
    <div className="box">
         <div>
             <div className="messages" ref={messageRef}>
                <TransitionGroup className="message">
                    {myMessages}
                </TransitionGroup>
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
