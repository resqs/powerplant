/**
 * Client-side code
 * 
 * @namespace client
 */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { addAllStyles } from './styles';
import App from './components/App';
import store from './store'
import { BrowserRouter } from 'react-router-dom';
import '/client/styles/main.scss';

/**
 * The root component of the application. Everything unfolds from here.
 * Main job of this component is to make the Redux store available for
 * connect() calls.
 * 
 * @extends Component
 */
class AppProvider extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>
   					<App storeIsLoaded={false} />
   				</BrowserRouter>
			</Provider>
		);
	}
}

// Add custom styles for React-Bootstrap components
addAllStyles();

render(<AppProvider />, document.getElementById('app'));
