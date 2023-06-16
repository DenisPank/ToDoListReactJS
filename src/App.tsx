/* eslint-disable prefer-const */
import { useThemeProps } from '@mui/material'
import { AddItemForm } from 'addItemForm'
import { FC, useState } from 'react'
import { TaskType, ToDoList } from 'ToDoList'
import { v1 } from 'uuid'

export type FilterValuesType = 'all' | 'completed' | 'active'
type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}
type TasksStateType = {
  [key: string]: Array<TaskType>
}

const App: FC = () => {
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
  function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
    let tasks = tasksObj[todolistId]
    let task = tasks.find(t => t.id === taskId)
    if (task) {
      task.title = newTitle

      setTasks({ ...tasksObj })
    }
  }

  let todolistId1 = v1()
  let todolistId2 = v1()

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    { id: todolistId1, title: 'what tp learn', filter: 'all' },
    { id: todolistId2, title: 'what tp learn', filter: 'all' }
  ])

  let [tasksObj, setTasks] = useState<TasksStateType>({
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
  function changeTodolistTitle(id: string, newTitle: string) {
    const todolist = todolists.find(tl => tl.id === id)
    if (todolist) {
      todolist.title = newTitle
      setTodolists([...todolists])
    }
  }

  function addTodolist(title: string) {
    let todoList: TodolistType = {
      id: v1(),
      filter: 'all',
      title: title
    }
    setTodolists([todoList, ...todolists])
    setTasks({ ...tasksObj, [todoList.id]: [] })
  }

  return (
    <div className="App">
      <AddItemForm
        addItem={(title: string) => {
          addTodolist(title)
        }}
      />
      <div className="todolist-wrapper">
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
              changeTaskTitle={changeTaskTitle}
              changeTodolistTitle={changeTodolistTitle}
              filter={tl.filter}
              removeTodolist={removeTodolist}
            />
          )
        })}
      </div>
    </div>
  )
}

export default App
