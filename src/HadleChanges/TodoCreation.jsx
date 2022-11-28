import { useState } from 'react';

import { HandleTodo } from '../api/Todos';

export const CreateTodo = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [priority, setPriority] = useState('');

  const SubmitForm = (e, name) => {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime().toString(),
      title,
      description,
      date,
      priority,
      x: 0,
      y: 0,
      completed: false,
      url: '',
    };

    HandleTodo.addTodo(newTodo, name);

    clearInput();
  };

  const clearInput = () => {
    setTitle('');
    setDescription('');
    setDate('');
    setPriority('');
  };

  const ChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const ChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const ChangeDate = (event) => {
    setDate(event.target.value);
  };

  const ChangePriority = (event) => {
    setPriority(event.target.value);
  };

  return {
    SubmitForm,
    ChangeTitle,
    ChangeDescription,
    ChangeDate,
    ChangePriority,
    title,
    description,
    date,
    priority,
  };
};

export const CreateSubtask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const SubmitForm = (e, name, id) => {
    e.preventDefault();

    const newSubTask = {
      id: new Date().getTime().toString(),
      title,
      description,
      completed: false,
    };

    HandleTodo.addSubTask(name, newSubTask, id);

    clearInput();
  };

  const clearInput = () => {
    setTitle('');
    setDescription('');
  };

  const ChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const ChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  return {
    SubmitForm,
    ChangeTitle,
    ChangeDescription,
    title,
    description,
  };
};
export const CreateComment = () => {
  const [message, setMessage] = useState('');
  const SubmitMessage = (e, name, id) => {
    e.preventDefault();
    const newMessage = {
      message,
    };

    HandleTodo.addNotRealyCascade(name, newMessage, id);

    setMessage('');
  };

  const ChangeMessage = (event) => {
    setMessage(event.target.value);
  };

  return {
    SubmitMessage,
    ChangeMessage,
    message,
  };
};
