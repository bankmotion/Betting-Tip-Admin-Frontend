import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import 'nprogress/nprogress.css';
import App from 'src/App';
import { SidebarProvider } from 'src/middleware/SidebarContext';
import * as serviceWorker from 'src/serviceWorker';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<HelmetProvider>
		<SidebarProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</SidebarProvider>
	</HelmetProvider>
);

serviceWorker.unregister();
