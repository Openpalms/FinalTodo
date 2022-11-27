import './App.css';
import Col from './components/Col/Col';

import ProjectPage from './components/ProjectPage/ProjectPage';
import { Route, Routes } from 'react-router-dom';
function App() {
  return (
    <Routes>
      <Route path={`project/:name`} element={<Col />} />
      <Route path={``} element={<ProjectPage />} />
    </Routes>
  );
}

export default App;
