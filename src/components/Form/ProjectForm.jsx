import { CreateProject } from '../../HadleChanges/ProjectCreation';
import s from './Form.module.css';
const ProjectForm = () => {
  const { SubmitForm, ChangeTitle, title } = CreateProject();

  return (
    <div className={s.form}>
      <form onSubmit={SubmitForm}>
        <input placeholder="Заголовок" onChange={ChangeTitle} value={title} />
        <button>Добавить новый проект</button>
      </form>
    </div>
  );
};

export default ProjectForm;
