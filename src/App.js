import { useState, useEffect, useRef } from 'react';
import './App.css';
import Message from './components/Message';
import Formulaire from './components/Formulaire';
import { useParams } from "react-router-dom";

// gestion firebase - cloud firestore
import firestore from "./base";
import { doc, setDoc, onSnapshot } from 'firebase/firestore'

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
      // dans firestore database -> création d'une collection messages et un document : UniqId
        const dbMessagesRef = doc(firestore, 'messages', '9iFmuofBDrSWTfc4tYU9')
        onSnapshot(dbMessagesRef, (snapshot) => {
            const data = snapshot.data()
            if(data)
            {
                // modifier pour ne récupérer que les 10 derniers messages
                const lastTenMessages = data.messages.slice(-10)
                setMessages(lastTenMessages || [])
            }
        })
    },[])

    const addMessage = message => {
        // copie du state Messages en vue d'ajouter le nouveau message
        const newMessages = [...messages, {id:Date.now(), ...message}]
        // limiter la taille du tableau à 10 messages
        const limitedMessages = newMessages.slice(-10)
        const messagesCollectionRef = doc(firestore,'messages', '9iFmuofBDrSWTfc4tYU9')
        setDoc(messagesCollectionRef, {messages: limitedMessages})

    }

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
