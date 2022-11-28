import ProjectForm from '../Form/ProjectForm';
import { useEffect, useState } from 'react';
import { bd } from '../../api/config';
import { onValue, ref } from 'firebase/database';
import { NavLink } from 'react-router-dom';
import s from './ProjectPage.module.css';
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
      <h2 className={s.header}>Select your project:</h2>
      <ol className={s.ol}>
        {projects &&
          projects
            .sort((a, b) => {
              return a.id - b.id;
            })
            .map((element) => (
              <li key={element.id}>
                <NavLink to={`project/${element.title}`} className={s.link}>
                  {element.title}{' '}
                </NavLink>
              </li>
            ))}
      </ol>
    </>
  );
};

export default ProjectPage;
