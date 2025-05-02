import UserProfile from './UserProfile';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container">
        <UserProfile userId={1} />
      </div>
    </div>
  );
}

export default App;
