import { FC } from 'react'
import { ToDoList } from 'ToDoList'

const App: FC = () => {
  const tasks1 = [
    { id: 1, title: 'css', isDone: true },
    { id: 2, title: 'JS', isDone: true },
    { id: 3, title: 'React', isDone: false }
  ]
  const tasks2 = [
    { id: 1, title: 'Term', isDone: true },
    { id: 2, title: 'XXX', isDone: false },
    { id: 3, title: 'Jentlmens', isDone: false }
  ]

  return (
    <div className="App">
      <ToDoList title="what tp learn" tasks={tasks1} />
      <ToDoList title="Movies" tasks={tasks2} />
    </div>
  )
}

export default App
