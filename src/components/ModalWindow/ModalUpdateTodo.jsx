import { UpdateTodo } from '../../HadleChanges/TodoCreation';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { HandleTodo } from '../../api/Todos';
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
          <form onSubmit={(e) => SubmitForm(e, name, props.id)}>
            <input
              placeholder="Заголовок"
              onChange={ChangeTitle}
              value={title}
            />
            <input
              placeholder="Описание"
              onChange={ChangeDescription}
              value={description}
            />
            <input
              placeholder="Приоритет(1-10)"
              type="number"
              max="10"
              min="1"
              onChange={ChangePriority}
              value={priority}
            />
            <input type="date" onChange={ChangeDate} value={date} />

            <button>Добавить дело</button>
            <button onClick={() => setIsVisible(false)}>Cancel update</button>
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
