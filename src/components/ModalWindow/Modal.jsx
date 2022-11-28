import s from './Modal.module.css';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { HandleTodo, uploadFiles } from '../../api/Todos';
import { CreateSubtask, CreateComment } from '../../HadleChanges/TodoCreation';
import ModalUpdateTodo from './ModalUpdateTodo';

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
          <h5>click on Title to update status</h5>
          <div>
            <ol>
              {props.subtasks !== undefined
                ? Object.keys(props.subtasks).map((key) => (
                    <li key={key}>
                      <p
                        onClick={() =>
                          HandleTodo.updateSubTask(name, props.id, key)
                        }
                      >
                        {props.subtasks[key].title}
                        {props.subtasks[key].completed ? '✅' : '❌'}
                      </p>

                      <p>{props.subtasks[key].description}</p>
                    </li>
                  ))
                : null}
            </ol>
            <button onClick={() => setIsAdding(true)}>Add subtask</button>
            <hr />
            <div>
              <h3>Comments</h3>
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
                <button onClick={() => setIsCommenting(!isCommenting)}>
                  {isCommenting ? 'close Comment section' : 'Add comment'}
                </button>
                <hr />
              </div>
            )}
            <ModalUpdateTodo id={props.id} />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
