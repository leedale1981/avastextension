import React from 'react';
import { Typography, Button, MuiThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core';
import './styles/App.css';
import './styles/Popup.css';

const colorTheme = createMuiTheme({
  palette: {
    primary: { main: '#fff' },
    secondary: { main: '#fff' }
  }
});

function App(props: any) {
  return (
    <MuiThemeProvider theme={colorTheme}>
      <div className="App">
        <div id='main-text'>
          {
            (props.isWhitelisted) &&
              <Typography variant='h6' color="primary">{`${props.currentUrl} has tracked you ${props.timesSeen} times`}</Typography>
          }
          <Typography variant='h4' color="primary">Stop being tracked by online advertisers</Typography>
        </div>
        <div id='buttons'>
          <Button id="learn-more-button" variant="outlined" color="secondary">Learn more</Button>
          <Button id="browse-url-button" color="primary">{`Browse "${props.siteTitle.substring(0, 10)}" without being tracked`}</Button>
        </div>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
