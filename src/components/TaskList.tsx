import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    // Checando se a Task está preenchida, caso esteja, cria uma nova Task
    if (newTaskTitle) {
      const newTask = {
        id: Math.random(),
        title: newTaskTitle,
        isComplete: false,
      }
      setTasks(old => [...old, newTask]);
      setNewTaskTitle('');
    }
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    // Cria um array para as tasks com o isComplete alterado
    let toggledTasks:Array<Task> = [];

    // Percorre todas as tasks, caso o id seja o passado na função, altera o isComplete da Task
    // Após, insere esta Task no array criado no passo anterior
    tasks.forEach(task => {
      if (task.id === id)
        task.isComplete = !task.isComplete;
      toggledTasks.push(task);
    });

    setTasks(toggledTasks);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo  ID
    // Cria um array para as tasks que deseja manter
    let toggledTasks:Array<Task> = [];

    // Percorre todas as taks, caso o id seja diferente do passado na função,
    // mantém a task, a inserindo no novo array, criado no passo anterior
    tasks.forEach( task => {
      if (task.id != id) {
        toggledTasks.push(task)
      }
    });

    setTasks(toggledTasks);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}