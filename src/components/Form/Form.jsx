import ModalForm from '../ModalWindow/ModalForm';
import { NavLink } from 'react-router-dom';
import s from './Form.module.css';
import { useState } from 'react';

const Form = (props) => {
  const [isShowing, setIsShowing] = useState(false);

  return (
    <>
      <NavLink to={`/`}>Go to project page</NavLink>
      <div className={s.form}>
        <div className={s.btnWrap}>
          <button
            className={s.formButton}
            onClick={() => setIsShowing(!isShowing)}
          >
            Добавить дело
          </button>
        </div>
        <div className={s.btnWrap}>
          <input
            className={s.input}
            placeholder="Filter Todos!"
            onChange={(e) => props.setQuery(e.target.value.toLowerCase())}
            value={props.query}
          />
        </div>
        <ModalForm isShowing={isShowing} setIsShowing={setIsShowing} />
      </div>
    </>
  );
};

export default Form;
