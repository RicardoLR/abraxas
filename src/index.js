import "babel-polyfill";

import 'bootstrap/dist/css/bootstrap.css'
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'
import 'react-quill/dist/quill.snow.css'

import './assets/stylesheets/main.scss';

import React from "react";

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import { Provider } from 'react-redux'

import App from "Containers/App";
import Estadistica from "Containers/Estadistica"
import NotFound from "Containers/NotFound"
import Modal from "Components/common/ModalMessage";

import configureStore from './store'

import { render } from 'react-dom'

let store = configureStore();


render(
	<Provider store={store}>
		<Router>
			<div>
			<Switch>
				<Route path={'/'} component={App} />
				<Route path={'/grafica'} component={Estadistica} />
				<Route component={NotFound} />
			</Switch>
			<Modal />
			</div>
		</Router>
	</Provider>,
	document.getElementById('app')
);
