import ModalForm from '../ModalWindow/ModalForm';
import { NavLink } from 'react-router-dom';
import s from './Form.module.css';
import { useState } from 'react';

const Form = (props) => {
  const [isShowing, setIsShowing] = useState(false);

  return (
    <div className={s.form}>
      <div>
        <NavLink to={`/`}>Go to project page</NavLink>
      </div>
      <div>
        <button onClick={() => setIsShowing(!isShowing)}>Добавить дело</button>
      </div>
      <div>
        <label htmlFor="input">Filter todos</label>
        <input
          onChange={(e) => props.setQuery(e.target.value.toLowerCase())}
          value={props.query}
        />
      </div>
      <ModalForm isShowing={isShowing} setIsShowing={setIsShowing} />
    </div>
  );
};

export default Form;
