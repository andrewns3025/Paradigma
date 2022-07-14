import { PublicClientApplication } from '@azure/msal-browser';
import LoginState from '../context/login/LoginState';
import { MsalConfig } from '../helpers/msal-config';
import { MsalProvider } from "@azure/msal-react";
import Layout from './layout/layout';

const App = () =>{

  const msalInstance = new PublicClientApplication(MsalConfig);

  return (
    <LoginState>
      <MsalProvider instance={msalInstance}>
        <Layout />
      </MsalProvider>
    </LoginState>
  );
}

export default App;
