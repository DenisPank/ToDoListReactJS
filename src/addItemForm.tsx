import { ChangeEvent, KeyboardEvent, useState } from 'react'

type AddItemFormType = {
  addItem: (title: string) => void
}
export function AddItemForm(props: AddItemFormType) {
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [error, setError] = useState<string | null>(null)
  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value)
  }
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)

    if (e.charCode === 13 && newTaskTitle.trim() !== '') {
      props.addItem(newTaskTitle)
      setNewTaskTitle('')
    }
  }
  const addTask = () => {
    if (newTaskTitle.trim() === '') {
      setError('Title is required')
      return
    }

    props.addItem(newTaskTitle.trim())
    setNewTaskTitle('')
  }
  return (
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
  )
}
