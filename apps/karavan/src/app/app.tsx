// Uncomment this line to use CSS modules
import { Route, Routes } from 'react-router-dom';
import { ProjectsPage } from '../projects/ProjectsPage';
import NxWelcome from './nx-welcome';
import { Page } from '@patternfly/react-core';
import { MainRoutes } from './MainRoutes';
import './app.module.css';

export function App() {
  return (
    <Page className="karavan">
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', gap: '0', width: "100%", height: "100%" }}>
        <div style={{ height: "100%", flexGrow: '2' }}>
          {<MainRoutes />}
        </div>
      </div>
    </Page>
  );
}

export default App;