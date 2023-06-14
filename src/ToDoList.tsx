import { FilterValuesType } from 'App'
import React, { ChangeEvent, KeyboardEvent, useState } from 'react'

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  id: string
  title: string
  tasks: Array<TaskType>
  removeTask: (id: String, todolistId: string) => void
  changeFilter: (value: FilterValuesType, id: string) => void
  addTask: (title: string, todolistId: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
  filter: FilterValuesType
  removeTodolist: (todolistId: string) => void
}

export function ToDoList(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value)
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)

    if (e.charCode === 13 && newTaskTitle.trim() !== '') {
      props.addTask(newTaskTitle, props.id)
      setNewTaskTitle('')
    }
  }
  const addTask = () => {
    if (newTaskTitle.trim() === '') {
      setError('Title is required')
      return
    }

    props.addTask(newTaskTitle.trim(), props.id)
    setNewTaskTitle('')
  }
  const onAllClickHandler = () => props.changeFilter('all', props.id)
  const onActiveClickHandler = () => props.changeFilter('active', props.id)
  const onCompletedClickHandler = () => props.changeFilter('completed', props.id)
  const removeTodolist = () => {
    props.removeTodolist(props.id)
  }
  return (
    <div>
      <h3>
        {props.title} <button onClick={removeTodolist}>X</button>
      </h3>
      <div>
        <input
          value={newTaskTitle}
          onChange={onNewTitleChangeHandler}
          onKeyPress={onKeyPressHandler}
          className={error ? 'error' : ''}
        />
        <button onClick={addTask}>+</button>
        {error && <div className="error-message">Field is required</div>}
      </div>
      <ul>
        {props.tasks.map((t, index) => {
          const onRemoveHandler = () => {
            props.removeTask(t.id, props.id)
          }
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
          }
          return (
            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
              <input type="checkbox" checked={t.isDone} onChange={onChangeHandler} />
              <span>{t.title}</span>
              <button onClick={onRemoveHandler}>X</button>
            </li>
          )
        })}
      </ul>
      <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>
        All
      </button>
      <button
        className={props.filter === 'active' ? 'active-filter' : ''}
        onClick={onActiveClickHandler}
      >
        Active
      </button>
      <button
        className={props.filter === 'completed' ? 'active-filter' : ''}
        onClick={onCompletedClickHandler}
      >
        Completed
      </button>
    </div>
  )
}
