import { async } from '@firebase/util';
import { useState } from 'react';
import Draggable from 'react-draggable';
import { useParams } from 'react-router-dom';
import { HandleTodo, uploadFiles } from '../../api/Todos';
import { CreateSubtask } from '../../HadleChanges/TodoCreation';
const Item = (props) => {
  const { SubmitForm, ChangeTitle, ChangeDescription, title, description } =
    CreateSubtask();
  const [isAdding, setIsAdding] = useState(false);
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
          height: '50vh',
          border: '1px solid black',
          backgroundColor: 'lightcyan',
          borderRadius: '20px',
          textAlign: 'center',
        }}
      >
        <div className="handle">{props.title}</div>
        <div>{props.description}</div>
        <div>Priority:{props.priority}</div>
        <div>Create At:{props.date}</div>
        <ol>
          {props.urls !== undefined
            ? Object.keys(props.urls).map((key) => (
                <li key={key}>
                  <a
                    href={props.urls[key].url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    attached file{' '}
                  </a>
                </li>
              ))
            : null}
        </ol>
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files[0])
              uploadFiles(props.id, e.target.files[0], name);
          }}
        />
        <hr />
        <h3>Subtasks</h3>
        <div>
          <ol>
            {props.subtasks !== undefined
              ? Object.keys(props.subtasks).map((key) => (
                  <li key={key}>
                    <p>{props.subtasks[key].title}</p>
                    <p>{props.subtasks[key].description}</p>
                  </li>
                ))
              : null}
          </ol>
          {isAdding ? (
            <form onSubmit={(e) => SubmitForm(e, name, props.id)}>
              <input
                style={{ height: '5px' }}
                placeholder="Заголовок"
                onChange={ChangeTitle}
                value={title}
              />
              <input
                style={{ height: '5px' }}
                placeholder="Описание"
                onChange={ChangeDescription}
                value={description}
              />
              <span>
                <button>Save</button>
                <button onClick={() => setIsAdding(false)}>Close</button>
              </span>
            </form>
          ) : (
            <div>
              <button onClick={() => setIsAdding(true)}>Add subtask</button>
            </div>
          )}
        </div>
        <button onClick={() => HandleTodo.deleteTodo(name, props.id)}>
          Delete todo
        </button>
      </div>
    </Draggable>
  );
};

export default Item;
