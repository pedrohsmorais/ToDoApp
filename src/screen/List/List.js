import React, { useState, useEffect } from 'react';
import { FlatList, TouchableOpacity, TextInput, Text, View, Modal, Alert } from 'react-native';
import uuid from 'react-native-uuid';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { styles } from './styles';
import { openDatabase } from '../../database/database';

const db = openDatabase();

export default function List({ navigation }) {
  const [listData, setListData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isDeletingLists, setIsDeletingLists] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  
  const openAndLoadDatabase = async () => {
    try {
      await db.transactionAsync(async (tx) => {
        await tx.executeSqlAsync('CREATE TABLE IF NOT EXISTS Lists (id TEXT PRIMARY KEY NOT NULL, name TEXT NOT NULL, date TEXT NOT NULL, tasks_json TEXT NOT NULL);');
        const result = await tx.executeSqlAsync('SELECT * FROM Lists', []);
        const lists = result.rows;
        if(result.rows.length === 0){
          setModalVisible(true);
        }
        setOriginalData(lists);
        setListData(lists);
      });
    } catch (error) {
      console.error('Erro na abertura do banco de dados:', error);
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      await openAndLoadDatabase();
    }
    fetchData();
  }, [setOriginalData]);
  
  const addList = async () => {
    if (newListName.trim() === '') {
      Alert.alert(
        'Lista inválida',
        'O nome da lista está inválido',
        [
          {
            text: 'OK',
            onPress: () => setModalVisible(true),
          },
        ],
        { cancelable: false }
      );
    } else {
      const newList = {
        id: uuid.v4(),
        name: newListName.trim(),
        date: new Date().toISOString(),
        tasks: [],
      };

      try {
        await db.transactionAsync(async (tx) => {
          await tx.executeSqlAsync(
            'INSERT INTO Lists (id, name, date, tasks_json) VALUES (?, ?, ?, ?)',
            [newList.id, newList.name, newList.date, JSON.stringify(newList.tasks)]
          );

          const result = await tx.executeSqlAsync('SELECT * FROM Lists', []);
          const lists = result.rows;
          setOriginalData(lists);
          setListData(lists);
          setModalVisible(false);
        });
        setNewListName('');
      } catch (error) {
        console.error('Erro ao adicionar lista:', error);
      }
    }
  };
  
  const handleSelectItem = (itemId) => {
    const updatedSelection = [...selectedItems];
    const index = updatedSelection.indexOf(itemId);

    if (index !== -1) {
      updatedSelection.splice(index, 1);
    } else {
      updatedSelection.push(itemId);
    }

    setSelectedItems(updatedSelection);
  };

  const handleDeleteSelectedLists = async () => {
    if (selectedItems.length === 0) {
      Alert.alert('Nenhuma lista selecionada', 'Selecione pelo menos uma lista para excluir.');
      return;
    }

    try {
      await db.transactionAsync(async (tx) => {
        for (const itemId of selectedItems) {
          await tx.executeSqlAsync('DELETE FROM Lists WHERE id = ?', [itemId]);
        }
        const result = await tx.executeSqlAsync('SELECT * FROM Lists', []);
        const lists = result.rows;
        setOriginalData(lists);
        setListData(lists);
        setIsDeletingLists(false);
        setSelectedItems([]);
      });
    } catch (error) {
      console.error('Erro ao excluir listas:', error);
    }
  };
  
  const filterList = (text) => {
  const filteredList = originalData.filter(item => item.name.toLowerCase().includes(text.toLowerCase()));
    setListData(filteredList);
  };

  const renderListItem = ({ item }) => {
    return (
      <Animated.View entering={FadeIn.duration(800)} exiting={FadeOut.duration(800)}>
        <TouchableOpacity
          key={item.id}
          style={isDeletingLists ? styles.itemDeleteMode : styles.item}
          onLongPress={() => setIsDeletingLists(!isDeletingLists)}
          onPress={() => {
            if (isDeletingLists) {
              handleSelectItem(item.id);
            } else {
              navigation.navigate('Lista', { listaId: item.id });
            }
          }}
          >
          <Text style={styles.itemText}>{item.name}</Text>
          {isDeletingLists && (
            <TouchableOpacity
            style={styles.selectButton}
            onPress={() => handleSelectItem(item.id)}
            >
              {selectedItems.includes(item.id) ? (
                <MaterialIcons name="check-box" size={24} color="#4CAF50" />
                ) : (
                  <MaterialIcons name="check-box-outline-blank" size={24} color="#666" />
                  )}
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
  <View style={styles.container}>
        <Text style={styles.listText}>Listas:</Text>
        <View style={styles.header}>
          <TextInput 
            placeholderTextColor="#999" 
            placeholder='Procurando uma lista?' 
            style={styles.inputlight} 
            onChangeText={(text) => {
              setSearchText(text)
              filterList(text);
            }}
            value={searchText}
            />
        </View>
      <FlatList
        data={listData}
        renderItem={renderListItem}
        keyExtractor={item => item.id}
        keyboardShouldPersistTaps='handled'
        />
        {isDeletingLists ? (
          <TouchableOpacity style={styles.bottomButton} onPress={handleDeleteSelectedLists}>
            <MaterialIcons name="close" size={18} color="#FF1040" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.bottomButton} onPress={() => setModalVisible(true)}>
            <MaterialIcons name="note-add" size={24} color="#F5F5F5" />
          </TouchableOpacity>
        )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nova Lista</Text>
            <TextInput 
              placeholderTextColor="#999" 
              placeholder='Digite o nome da lista' 
              style={styles.inputDark} 
              onChangeText={text => setNewListName(text)}
              value={newListName}
              />
            <TouchableOpacity onPress={() => addList()} style={styles.addButton}>
              <Text style={styles.buttonText}>Criar Lista</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
  </View>
  );
}
