import { useEffect } from 'react'
import { render } from 'react-dom';

import App from './App';
import { store } from './store';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react'
import * as ReactDOMClient from 'react-dom/client';
const container: any = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);
function AppWithCallbackAfterRender() {
    useEffect(() => {
        console.log('rendered');
    });

    return <Provider store={store}>
        <ChakraProvider>
            <App />
        </ChakraProvider>
    </Provider>
}
root.render(<AppWithCallbackAfterRender />);






