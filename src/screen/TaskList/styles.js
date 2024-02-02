import { StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#111',
      color: '#fff',
      paddingTop: getStatusBarHeight(true) + 30,
      paddingLeft: 20,
      paddingVertical: 15,
    },
    header: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      gap: 16,
    },
    inputlight: {
      flex: 1,
      height: 40,
      fontSize: 15,
      borderColor: 'gray',
      borderWidth: 2,
      borderRadius: 5,
      paddingLeft: 10,
      color: '#F5F5F5',
    },
    addButton: {
      height: 40,
      width: 40,
      borderRadius: 8,
      marginRight: 16,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'green',
    },
    text: {
      fontSize: 30,
      color: '#F5F5F5',
      paddingVertical: 15,
    },
    taskItem: {
      flexDirection: 'row',
      backgroundColor: '#333',
      height: 60,
      width: '95%',
      borderRadius: 5,
      padding: 10,
      marginTop: 16,
      alignItems: 'center',
    },
    taskText: {
      color: '#fff',
    },
    taskTrash: {
      height: 60,
      marginRight: 16,
      marginTop: 16,
      alignItems: 'center',
      justifyContent: 'center'
    },
    flatListContainer: {
      flex: 1,
    },
    checkboxContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
    },
    checkbox: {
      width: 30,
      height: 30,
      borderWidth: 1.5,
      borderColor: 'white',
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
    },
    checked: {
      borderColor: 'black',
      backgroundColor: '#ffd700',
    },
    checkboxLabel: {
      color:'#F5F5F5',
      marginLeft: 8,
      fontSize: 18,
    },
  });