import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MooCheckout from './Components/MooCheckout';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<MooCheckout />, document.getElementById('root'));
registerServiceWorker();
