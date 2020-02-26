import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import WhiteListService, { SiteData } from './services/whitelist-service';

let whitelistService: WhiteListService = new WhiteListService();

whitelistService.getCurrentSite()
.then((currentSite: SiteData) => {
   ReactDOM.render(
        <App    currentUrl={currentSite.url} 
                isWhitelisted={currentSite.isWhitelisted} 
                timesSeen={currentSite.timesSeen} 
                siteTitle={currentSite.title}
        />, document.getElementById('root'));
});


