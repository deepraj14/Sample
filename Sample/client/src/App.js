import './App.css';
import Sidebar from 'components/Sidebar';
import CodeSpace from 'components/CodeSpace'
import Header from 'components/Header';

function App() {
  
  return (
    <div className="App">
      <Header/>
      <div className="Space">
        <Sidebar/>
        <CodeSpace/>
      </div>
    </div>
  );
}

export default App;