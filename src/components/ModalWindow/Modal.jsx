import s from './Modal.module.css';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { HandleTodo, uploadFiles } from '../../api/Todos';
import { CreateSubtask, CreateComment } from '../../HadleChanges/TodoCreation';
const Modal = (props) => {
  const { SubmitForm, ChangeTitle, ChangeDescription, title, description } =
    CreateSubtask();
  const { SubmitMessage, ChangeMessage, message } = CreateComment();
  const [isAdding, setIsAdding] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const { name } = useParams();

  return (
    <>
      {props.modalShow ? (
        <div className={s.modal}>
          <button onClick={() => props.setModalShow(false)}>Close</button>
          <h2>Add files</h2>
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
            <hr />
            <div>
              {isCommenting ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    SubmitMessage(e, name, props.id);
                  }}
                >
                  <input
                    style={{ height: '5px' }}
                    placeholder="Комментарий"
                    onChange={ChangeMessage}
                    value={message}
                  />
                  <div>
                    <button>Submit message</button>
                  </div>
                </form>
              ) : props.cascade !== undefined ? (
                Object.keys(props.cascade).map((key, index) => (
                  <p key={key} style={{ marginLeft: `${(index + 1) * 10}px` }}>
                    {props.cascade[key].message}
                  </p>
                ))
              ) : null}
            </div>
            {isAdding ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  SubmitForm(e, name, props.id);
                }}
              >
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
                <hr />
                <button onClick={() => setIsAdding(true)}>Add subtask</button>
                <button onClick={() => setIsCommenting(!isCommenting)}>
                  {isCommenting ? 'close Comment section' : 'Add comment'}
                </button>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
