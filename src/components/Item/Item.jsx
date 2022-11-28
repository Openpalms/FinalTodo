import Modal from '../ModalWindow/Modal';
import { useState } from 'react';
import Draggable from 'react-draggable';
import { useParams } from 'react-router-dom';
import { HandleTodo } from '../../api/Todos';
const Item = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const { name } = useParams();
  const eventLogger = (e, data) => {
    HandleTodo.updatePosition(data.x, data.y, name, props.id);
  };
  const posX = props.x !== undefined && !isNaN(props.x) ? props.x : 0;
  const posY = props.y !== undefined && !isNaN(props.y) ? props.y : 0;

  return (
    <Draggable
      defaultPosition={{ x: posX, y: posY }}
      position={null}
      grid={[25, 25]}
      scale={1}
      onStart={eventLogger}
      onStop={eventLogger}
    >
      <div
        style={{
          border: '1px solid black',
          backgroundColor: 'lightcyan',
          borderRadius: '20px',
          textAlign: 'center',
        }}
      >
        <Modal setModalShow={setModalShow} modalShow={modalShow} {...props} />
        <div className="handle">{props.title}</div>
        <div>{props.description}</div>
        <div>Priority:{props.priority}</div>
        <div>Create At:{props.date}</div>
        <hr />
        <button onClick={() => setModalShow(!modalShow)}>Open modal</button>

        <button onClick={() => HandleTodo.deleteTodo(name, props.id)}>
          Delete todo
        </button>
      </div>
    </Draggable>
  );
};

export default Item;
