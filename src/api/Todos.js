import {
  getDownloadURL,
  ref as refStorage,
  uploadBytesResumable,
} from 'firebase/storage';
import { ref, remove, set, update } from 'firebase/database';
import { bd, storage } from './config';

export const HandleTodo = {
  addTodo(body, name) {
    set(ref(bd, `${name}/${body.id}/`), { ...body });
  },
  addSubTask(name, body, id) {
    set(ref(bd, `${name}/${id}/subtasks/${new Date().getTime().toString()}`), {
      ...body,
    });
  },
  updateSubTask(name, todoId, messageId) {
    update(ref(bd, `${name}/${todoId}/subtasks/${messageId}`), {
      completed: true,
    });
  },
  addNotRealyCascade(name, message, id) {
    set(ref(bd, `${name}/${id}/cascade/${new Date().getTime().toString()}`), {
      ...message,
    });
  },
  deleteTodo(name, id) {
    remove(ref(bd, `${name}/${id}/`));
  },

  updateTodo(name, body, id) {
    update(ref(bd, `${name}/${id}/`), { ...body });
  },

  updatePosition(x, y, name, id) {
    update(ref(bd, `${name}/${id}/`), { x, y });
  },

  addFile(name, id, url) {
    update(ref(bd, `${name}/${id}/urls/${new Date().getTime().toString()}`), {
      url: url,
    });
  },
};

export const uploadFiles = (id, file, name) => {
  if (!file) return;
  const storageRef = refStorage(storage, id);
  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on(
    'state_changed',
    (snapshot) => {},
    (err) => console.log(err),
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((url) =>
        HandleTodo.addFile(name, id, url)
      );
    }
  );
};

export const HandleProject = {
  addProject(body) {
    set(ref(bd, body.title), { ...body });
  },
};
