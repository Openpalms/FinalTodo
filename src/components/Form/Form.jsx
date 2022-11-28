import ModalForm from '../ModalWindow/ModalForm';
import { useParams } from 'react-router-dom';
import { CreateTodo } from '../../HadleChanges/TodoCreation';
import s from './Form.module.css';
import { useState } from 'react';

const Form = () => {
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
  } = CreateTodo();
  const { name } = useParams();
  const [isShowing, setIsShowing] = useState(false);
  return (
    <div className={s.form}>
      <button onClick={() => setIsShowing(!isShowing)}>Добавить дело</button>
      <ModalForm isShowing={isShowing} setIsShowing={setIsShowing} />
      {/* <form onSubmit={(e) => SubmitForm(e, name)}>
        <input placeholder="Заголовок" onChange={ChangeTitle} value={title} />
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
      </form> */}
    </div>
  );
};

export default Form;
