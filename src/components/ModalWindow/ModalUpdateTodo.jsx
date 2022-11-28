import { UpdateTodo } from '../../HadleChanges/TodoCreation';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { HandleTodo } from '../../api/Todos';
import s from './Modal.module.css';
const ModalUpdateTodo = (props) => {
  const { name } = useParams();
  const {
    SubmitForm,
    ChangeTitle,
    ChangeDescription,
    ChangeDate,
    ChangePriority,
    title,
    description,
    date,
    priority,
  } = UpdateTodo();
  const [isVisible, setIsVisible] = useState(false);
  return (
    <>
      {isVisible ? (
        <>
          <form
            className={s.updateForm}
            onSubmit={(e) => SubmitForm(e, name, props.id)}
          >
            <input
              className={s.modalInput}
              placeholder="Заголовок"
              onChange={ChangeTitle}
              value={title}
            />
            <input
              className={s.modalInput}
              placeholder="Описание"
              onChange={ChangeDescription}
              value={description}
            />
            <input
              className={s.modalInput}
              placeholder="Приоритет(1-10)"
              type="number"
              max="10"
              min="1"
              onChange={ChangePriority}
              value={priority}
            />
            <input
              className={s.modalInput}
              type="date"
              onChange={ChangeDate}
              value={date}
            />
            <div>
              <button>Update</button>
              <button onClick={() => setIsVisible(false)}>Cancel</button>
            </div>
          </form>
        </>
      ) : (
        <>
          <button
            onClick={() =>
              HandleTodo.updateTodo(name, { completed: true }, props.id)
            }
          >
            Complete this task
          </button>
          <button onClick={() => setIsVisible(true)}>Update whole list</button>
        </>
      )}
    </>
  );
};

export default ModalUpdateTodo;
