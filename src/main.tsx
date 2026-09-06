import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import LinksPage from './LinksPage.tsx';
import WhoWeArePage from './WhoWeArePage.tsx';
import PremiumHookahPage from './PremiumHookahPage.tsx';
import VisitUsPage from './VisitUsPage.tsx';
import MenuPage from './MenuPage.tsx';
import BuildMyHookahPage from './BuildMyHookahPage.tsx';
import EventsPage from './EventsPage.tsx';
import './index.css';

const path = window.location.pathname;

let page;
if (path === '/links') page = <LinksPage />;
else if (path === '/who-we-are') page = <WhoWeArePage />;
else if (path === '/premium-hookah') page = <PremiumHookahPage />;
else if (path === '/visit-us') page = <VisitUsPage />;
else if (path === '/menu') page = <MenuPage />;
else if (path === '/build-my-hookah') page = <BuildMyHookahPage />;
else if (path === '/private-events') page = <EventsPage />;
else page = <App />;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {page}
  </StrictMode>
);
