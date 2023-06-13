/* eslint-disable prefer-const */
import { FC, useState } from 'react'
import { TaskType, ToDoList } from 'ToDoList'

export type FilterValuesType = 'all' | 'completed' | 'active'

const App: FC = () => {
  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: 1, title: 'js', isDone: true },
    { id: 2, title: 'react', isDone: false },
    { id: 3, title: 'redux', isDone: true }
  ])
  let [filter, setFilter] = useState<FilterValuesType>('active')

  function removeTask(id: number) {
    let filteredTasks = tasks.filter(t => {
      return t.id !== id
    })
    setTasks(filteredTasks)
  }

  function changeFilter(value: FilterValuesType) {
    setFilter(value)
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
      />
    </div>
  )
}

export default App
