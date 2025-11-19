import logo from './logo.svg';
import './App.css';
import Message from './components/Message';
import Formulaire from './components/Formulaire';

function App() {
  return (
    <div className="box">
         <div>
             <div className="messages">
                 <Message />
                 <Message />
                 <Message />
             </div>
         </div>
         <Formulaire />
    </div>
  );
}

export default App;
