import { useState } from 'react';
import { HandleProject } from '../api/Todos';

export const CreateProject = () => {
  const [title, setTitle] = useState('');

  const SubmitForm = (event) => {
    event.preventDefault();
    const newProject = {
      id: new Date().getTime().toString(),
      title,
    };
    HandleProject.addProject(newProject);
    setTitle('');
  };
  const ChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  return {
    SubmitForm,
    ChangeTitle,
    title,
  };
};
