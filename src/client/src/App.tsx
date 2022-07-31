import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Main from '@screen/Main';
import Login from '@screen/Login';
import Join from '@screen/Join';
import ManageTask from '@screen/ManageTask';

import GlobalStyle from '@src/GlobalStyle';
import routes from '@src/routes';

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path={routes.main} element={<Main />} />
          <Route path={routes.login} element={<Login />} />
          <Route path={routes.join} element={<Join />} />
          <Route path={routes.addTask} element={<ManageTask />} />
          <Route path={routes.editTask} element={<ManageTask />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
