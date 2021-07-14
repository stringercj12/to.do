import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  function handleAddTask(newTaskTitle: string) {
    //TODO - add new task
    const taskExists = tasks.find(task => task.title === newTaskTitle);
    if (taskExists) {
      Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome.');
      return;
    }
    const data = {
      id: Number(new Date().getTime()),
      title: newTaskTitle,
      done: false
    }

    setTasks(oldState => [...oldState, data]);
  }

  function handleToggleTaskDone(id: number) {
    const data = tasks.map(task => ({ ...task }));

    data.find(task => {
      if (task.id == id) {
        task.done == false ? (task.done = true) : (task.done = false);
      }
    });

    setTasks(data);
  }

  function handleEditTask(id: number, taskNewTitle: string) {
    setIsEditing(true)
    console.warn(id)

    const data = tasks.map(task => ({ ...task }));

    data.find(task => {
      if (task.id == id) {
        task.title = taskNewTitle;
      }
    });

    setTasks(data);
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover item', 'Tem certeza que você deseja remover esse item ?', [
      {
        text: 'Não',
        onPress: () => { }
      },
      {
        text: 'Sim',
        onPress: () => {
          setTasks(oldState => oldState.filter(
            task => task.id !== id
          ));
        }
      }
    ]);
    setTasks(oldState => oldState.filter(
      task => task.id !== id
    ));
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