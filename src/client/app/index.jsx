import React from 'react';
import {render} from 'react-dom';
import AwesomeComponent from './AwesomeComponent.jsx';
import RegularGroupApp from './RegularGroupApp.jsx';

class App extends React.Component {
    render() {
        return (
           <RegularGroupApp />
        );
    }
}

render(<App/>, document.getElementById('app'));
