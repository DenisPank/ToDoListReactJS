/* eslint-disable prefer-const */
import { FC, useState } from 'react'
import { TaskType, ToDoList } from 'ToDoList'
import { v1 } from 'uuid'

export type FilterValuesType = 'all' | 'completed' | 'active'

const App: FC = () => {
  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: 'js', isDone: true },
    { id: v1(), title: 'react', isDone: false },
    { id: v1(), title: 'redux', isDone: true }
  ])

  let [filter, setFilter] = useState<FilterValuesType>('active')

  function removeTask(id: String) {
    let filteredTasks = tasks.filter(t => {
      return t.id !== id
    })
    setTasks(filteredTasks)
  }

  function addTask(title: string) {
    let newTask = { id: v1(), title: title, isDone: false }
    let newTasks = [newTask, ...tasks]
    setTasks(newTasks)
  }

  function changeFilter(value: FilterValuesType) {
    setFilter(value)
  }

  function changeStatus(taskId: string, isDone: boolean) {
    let task = tasks.find(t => t.id === taskId)
    if (task) {
      task.isDone = isDone
    }
    let copy = [...tasks]
    setTasks(copy)
  }

  let tasksForList = tasks
  if (filter === 'completed') {
    tasksForList = tasks.filter(t => t.isDone === true)
  }
  if (filter === 'active') {
    tasksForList = tasks.filter(t => t.isDone === false)
  }

  return (
    <div className="App">
      <ToDoList
        title="what tp learn"
        tasks={tasksForList}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeTaskStatus={changeStatus}
        filter={filter}
      />
    </div>
  )
}

export default App
