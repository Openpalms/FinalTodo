import { useEffect, useState } from 'react';
import Item from '../Item/Item';
import { HandleTodo } from '../../api/Todos';
import { bd } from '../../api/config';
import { onValue, ref } from 'firebase/database';
import dayjs from 'dayjs';
import Form from '../Form/Form';
import { useParams } from 'react-router-dom';

const Col = () => {
  const [todos, setTodos] = useState([]);
  const { name } = useParams();

  useEffect(() => {
    onValue(ref(bd), (snapshot) => {
      const response = snapshot.val()[name];

      if (response) {
        setTodos(Object.values(response));
      }
    });
  }, []);

  useEffect(() => {
    const DayJs = dayjs();

    todos.forEach((element) => {
      if (typeof element === 'object') {
        const now = dayjs(DayJs.format('YYYY-MM-DD')).unix();
        const before = dayjs(element.date).unix();
        const expiring = now - before >= 0;

        HandleTodo.updateTodo(name, {
          id: element.id,
          expiring: expiring,
        });
      }
    });
  }, [todos, name]);

  return (
    <>
      <Form />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          height: '100vh',
        }}
      >
        <div className="col">
          <div>Queue</div>
          {todos &&
            todos.map((item) =>
              typeof item === 'object' ? <Item key={item.id} {...item} /> : null
            )}
        </div>
        <div className="col">
          <div>Development</div>
        </div>
        <div className="col">
          <div>Done</div>
        </div>
      </div>
    </>
  );
};

export default Col;
