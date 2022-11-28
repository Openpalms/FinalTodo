import { CreateProject } from '../../HadleChanges/ProjectCreation';
import s from './Form.module.css';
const ProjectForm = () => {
  const { SubmitForm, ChangeTitle, title } = CreateProject();

  return (
    <div className={s.form}>
      <form onSubmit={SubmitForm}>
        <input placeholder="Name" onChange={ChangeTitle} value={title} />
        <button className={s.formButton}>Add new project </button>
      </form>
    </div>
  );
};

export default ProjectForm;
