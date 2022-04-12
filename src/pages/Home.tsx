import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    //TODO - add new task
    const task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    const isTaskCadastred = tasks.find(task => task.title === newTaskTitle)
    if (!isTaskCadastred){
      setTasks(oldState => [...oldState, task])
    }else{
      Alert.alert("Erro","Você não pode cadastrar uma task com o mesmo nome")
    }
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    const task = tasks.find(task => task.id === id)
    if(task){
      task.done = !task.done
    }
    const updatedTasks = tasks.map(task => ({...task}))
    setTasks(updatedTasks)
  }

  function handleEditTask(id:number, taskNewTitle: string){
    const task = tasks.find(task => task.id === id)
    if(!task){
      return
    }
    task.title = taskNewTitle
    const updatedTasks = tasks.map(task=>({...task}))
    setTasks(updatedTasks)
  }

  function handleRemoveTask(id: number) {
    const updatedTasks = tasks.filter(tasks => tasks.id != id)
    Alert.alert("Remover Item","Tem certeza que você deseja remover esse item?", [{
      text: 'Não'
    },{
      text: 'Sim',
      onPress:()=>setTasks(updatedTasks)
    }])
    
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})