import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Animated,
} from 'react-native';
import { openDatabase } from '../../database/database';
import { EvilIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';

import { styles } from './styles';

import TaskView from '../../components/TaskView/TaskView';

const db = openDatabase();

const TaskList = ({ route }) => {
  const { listaId } = route.params;
  
  const [listName, setListName] = useState('');
  const [taskList, setTaskList] = useState([]);
  const [taskDescription, setTaskDescription] = useState('');

  useEffect(() => {
    loadListDetails();
  }, []);

  const loadListDetails = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT name, tasks_json FROM Lists WHERE id = ?',
        [listaId],
        (_, result) => {
          if (result.rows.length > 0) {
            const listNameRes = result.rows.item(0).name;
            const tasksJson = result.rows.item(0).tasks_json;

            setListName(listNameRes);

            if (tasksJson) {
              const tasks = JSON.parse(tasksJson);
              setTaskList(tasks);
            } else {
              setTaskList([]);
            }
          } else {
            console.error('Lista não encontrada.');
          }
        }
      );
    });
  };

  const addTaskToList = () => {
    if (!taskDescription.trim()) {
      console.error('Descrição da tarefa vazia.');
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        'SELECT tasks_json FROM Lists WHERE id = ?',
        [listaId],
        (_, result) => {
          if (result.rows.length > 0) {
            const currentTasks = JSON.parse(result.rows.item(0).tasks_json);
            const newTask = {
              id: Date.now().toString(),
              description: taskDescription,
              done: false,
            };
            const updatedTasks = [...currentTasks, newTask];

            tx.executeSql(
              'UPDATE Lists SET tasks_json = ? WHERE id = ?',
              [JSON.stringify(updatedTasks), listaId],
              (_, updateResult) => {
                if (updateResult.rowsAffected > 0) {
                  console.log('Tarefa adicionada com sucesso!');
                  setTaskList(updatedTasks);
                  setTaskDescription('');
                } else {
                  console.error('Falha ao adicionar a tarefa à lista.');
                }
              }
            );
          } else {
            console.error('Lista não encontrada.');
          }
        }
      );
    });
  };

  const handleDeleteTask = (taskId) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT tasks_json FROM Lists WHERE id = ?',
        [listaId],
        (_, result) => {
          if (result.rows.length > 0) {
            const currentTasks = JSON.parse(result.rows.item(0).tasks_json);
            const updatedTasks = currentTasks.filter((task) => task.id !== taskId);

            tx.executeSql(
              'UPDATE Lists SET tasks_json = ? WHERE id = ?',
              [JSON.stringify(updatedTasks), listaId],
              (_, updateResult) => {
                if (updateResult.rowsAffected > 0) {
                  console.log('Tarefa excluída com sucesso!');
                  setTaskList(updatedTasks);
                } else {
                  console.error('Falha ao excluir a tarefa da lista.');
                }
              }
            );
          } else {
            console.error('Lista não encontrada.');
          }
        }
      );
    });
  };

  const handleToggleDone = (taskId) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT tasks_json FROM Lists WHERE id = ?',
        [listaId],
        (_, result) => {
          if (result.rows.length > 0) {
            const currentTasks = JSON.parse(result.rows.item(0).tasks_json);
            const updatedTasks = currentTasks.map((task) => {
              if (task.id === taskId) {
                return { ...task, done: !task.done };
              }
              return task;
            }); 
            tx.executeSql(
              'UPDATE Lists SET tasks_json = ? WHERE id = ?',
              [JSON.stringify(updatedTasks), listaId],
              (_, updateResult) => {
                if (updateResult.rowsAffected > 0) {
                  setTaskList(updatedTasks);
                } else {
                  console.error('Falha ao alterar o estado "done".');
                }
              }
            );
          } else {
            console.error('Lista não encontrada.');
          }
        }
      );
    });
  };

 const renderTask = ({ item }) => {
  const fadeTrash = new Animated.Value(0);

  const handleDeletePress = () => {
    handleDeleteTask(item.id);
  };

  return (
    <Swipeable
      key={item.id}
      renderRightActions={() => (
        <View>
          <Animated.View
            style={{
              opacity: fadeTrash.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            }}
          >
            <TouchableOpacity style={styles.taskTrash} onPress={handleDeletePress}>
              <EvilIcons name="trash" size={40} color="red" />
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}
      onSwipeableWillOpen={() => {
        Animated.timing(fadeTrash, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false,
        }).start();
      }}
      onSwipeableWillClose={() => {
        Animated.timing(fadeTrash, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        }).start();
      }}
    >
      <TaskView item={ item } onToggleDone={handleToggleDone}/>
    </Swipeable>
  );
};

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{`${listName}: `}</Text>
      <View style={styles.header}>
        <TextInput
          placeholderTextColor="#999"
          placeholder="Nome da Tarefa..."
          style={styles.inputlight}
          onChangeText={(text) => setTaskDescription(text)}
          value={taskDescription}
        />
        <TouchableOpacity style={styles.addButton} onPress={() => addTaskToList()}>
          <MaterialIcons name="add" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.flatListContainer}
        data={taskList}
        renderItem={renderTask}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
};

export default TaskList;
