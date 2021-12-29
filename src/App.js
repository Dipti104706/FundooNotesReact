import logo from './logo.svg';
import './App.css';
import { Input } from 'antd';
import "antd/dist/antd.css";
import RouterDom from './pages/router/router';
import Dashboard from './pages/dashboard/dashboard';


function App() {
  return (
    <div>
          {/* <Signup/> */}
          {/* <SignIn/> */}
          {/* <Dashboard/> */}
          <RouterDom/>
          {/* <Input size="middle" style={{width:100}} placeholder="Email" /> */}
    </div>
  )
}

export default App;
