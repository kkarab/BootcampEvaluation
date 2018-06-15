import React, {component} from 'react';
import LoginPage from '../components/loginPage';
import SignupPage from '../components/signuPage';



class App extends Component {
    render() {
        return (
            <div className="Student-box">
                <LoginPage />
                <SignupPage />
            </div>
        );
    }
}


export default App;