import { render } from 'preact';
import { LocationProvider, Router, Route } from 'preact-iso';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import { Header } from './components/Header.jsx';
import { Home } from './pages/Home/index.jsx';
import { NotFound } from './pages/_404.jsx';
import { Authorization } from './pages/Authorization/index.jsx';
import { About } from './pages/About/index.jsx';
import './style.css';
import { Projects } from './pages/Projects/index.jsx';
import { Project } from './pages/Project/index.jsx';

const client = new ApolloClient({
	uri: 'http://localhost:4000/graphql',
	cache: new InMemoryCache,
})

export function App() {
	return (
		<ApolloProvider client={client}>
		<LocationProvider>
			<Header />
			<main>
				<Router>
					<Route path="/" component={Home} />
					<Route path='/authorization' component={Authorization} />
					<Route path='/projects' component={Projects} />
					<Route path='/project/:id' component={Project} />
					<Route path='/about' component={About}/>
					<Route default component={NotFound} />
				</Router>
			</main>
		</LocationProvider>
		</ApolloProvider>
	);
}

render(<App />, document.getElementById('app'));
