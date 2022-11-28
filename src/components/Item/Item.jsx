import Modal from '../ModalWindow/Modal';
import { useState } from 'react';
import Draggable from 'react-draggable';
import { useParams } from 'react-router-dom';
import { HandleTodo } from '../../api/Todos';
import s from './Item.module.css';
const Item = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const { name } = useParams();
  const eventLogger = (e, data) => {
    HandleTodo.updatePosition(data.x, data.y, name, props.id);
  };
  const posX = props.x !== undefined && !isNaN(props.x) ? props.x : 0;
  const posY = props.y !== undefined && !isNaN(props.y) ? props.y : 0;

  const isExriping = props.expiring ? s.expired : s.card;

  return (
    <>
      <Modal setModalShow={setModalShow} modalShow={modalShow} {...props} />

      <Draggable
        defaultPosition={{ x: posX, y: posY }}
        position={null}
        grid={[25, 25]}
        scale={1}
        handle=".handle"
        onTouchEnd={eventLogger}
        // onStart={eventLogger}
        onStop={eventLogger}
      >
        <div className={`${isExriping} `}>
          <div className="handle">
            <h1>{props.completed ? 'Task done' : null}</h1>
            <div>
              #{props.taskNumber} {props.title}{' '}
            </div>
            <div>{props.description}</div>
            <div>Priority:{props.priority}</div>
            <div>Expire date:{props.date}</div>
          </div>
          <hr />
          <button onClick={() => setModalShow(!modalShow)}>Open modal</button>

          <button onClick={() => HandleTodo.deleteTodo(name, props.id)}>
            Delete todo
          </button>
        </div>
      </Draggable>
    </>
  );
};

export default Item;
