import ProjectForm from '../Form/ProjectForm';
import { useEffect, useState } from 'react';
import { bd } from '../../api/config';
import { onValue, ref } from 'firebase/database';
import { NavLink } from 'react-router-dom';
const ProjectPage = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    onValue(ref(bd), (snapshot) => {
      const response = snapshot.val();

      if (response) {
        setProjects(Object.values(response));
      }
    });
  }, []);
  return (
    <>
      <ProjectForm />
      <h2>Select your project:</h2>
      <ol>
        {projects &&
          projects.map((element) => (
            <li key={element.id}>
              <NavLink to={`project/${element.title}`}>
                {element.title}{' '}
              </NavLink>
            </li>
          ))}
      </ol>
    </>
  );
};

export default ProjectPage;
