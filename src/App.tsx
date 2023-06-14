/* eslint-disable prefer-const */
import { FC, useState } from 'react'
import { TaskType, ToDoList } from 'ToDoList'
import { v1 } from 'uuid'

export type FilterValuesType = 'all' | 'completed' | 'active'
type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

const App: FC = () => {
  // let [tasks, setTasks] = useState<Array<TaskType>>([
  //   { id: v1(), title: 'js', isDone: true },
  //   { id: v1(), title: 'react', isDone: false },
  //   { id: v1(), title: 'redux', isDone: true }
  // ])

  function removeTask(id: String, todolistId: string) {
    let tasks = tasksObj[todolistId]
    let filteredTasks = tasks.filter(t => {
      return t.id !== id
    })
    tasksObj[todolistId] = filteredTasks
    setTasks({ ...tasksObj })
  }

  function addTask(title: string, todolistId: string) {
    let newTask = { id: v1(), title: title, isDone: false }
    let tasks = tasksObj[todolistId]

    let newTasks = [newTask, ...tasks]
    tasksObj[todolistId] = newTasks
    setTasks({ ...tasksObj })
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    let todolist = todolists.find(tl => tl.id === todolistId)
    if (todolist) {
      todolist.filter = value
      setTodolists([...todolists])
    }
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    let tasks = tasksObj[todolistId]
    let task = tasks.find(t => t.id === taskId)
    if (task) {
      task.isDone = isDone

      setTasks({ ...tasksObj })
    }
  }

  let todolistId1 = v1()
  let todolistId2 = v1()

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    { id: todolistId1, title: 'what tp learn', filter: 'active' },
    { id: todolistId2, title: 'what tp learn', filter: 'completed' }
  ])

  let [tasksObj, setTasks] = useState({
    [todolistId1]: [
      { id: v1(), title: 'js', isDone: true },
      { id: v1(), title: 'react', isDone: false },
      { id: v1(), title: 'redux', isDone: true }
    ],
    [todolistId2]: [
      { id: v1(), title: 'book', isDone: true },
      { id: v1(), title: 'rt', isDone: false },
      { id: v1(), title: 'rx', isDone: true }
    ]
  })
  let removeTodolist = (todolistId: string) => {
    let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
    setTodolists(filteredTodolist)

    delete tasksObj[todolistId]
    setTasks({ ...tasksObj })
  }
  return (
    <div className="App">
      {todolists.map(tl => {
        let tasksForList = tasksObj[tl.id]
        if (tl.filter === 'completed') {
          tasksForList = tasksForList.filter(t => t.isDone === true)
        }
        if (tl.filter === 'active') {
          tasksForList = tasksForList.filter(t => t.isDone === false)
        }
        return (
          <ToDoList
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={tasksForList}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            filter={tl.filter}
            removeTodolist={removeTodolist}
          />
        )
      })}
    </div>
  )
}

export default App
