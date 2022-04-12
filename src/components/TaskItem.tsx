import React, { useEffect, useRef, useState } from "react";
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import trashIcon from "../assets/icons/trash/trash.png";
import Icon from "react-native-vector-icons/Feather";

import { Task } from "./TasksList";

interface TasksItemProps {
  item: Task;
  index: number;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, task: string) => void;
}

export function TaskItem({
  toggleTaskDone,
  removeTask,
  editTask,
  index,
  item,
}: TasksItemProps) {
  const [isEditing, setIsEdited ] = useState(false);
  const [editedTitle, setEditingTitle] = useState(item.title)
  const textInputRef = useRef<TextInput>(null)

  function handleStartEditing(){
    setIsEdited(true)
  }

  function handleCancelEditing(){
    setEditingTitle(item.title)
    setIsEdited(false)
  }

  function handleSubmitEditing(){
    editTask(item.id, editedTitle)
    setIsEdited(false)
  }

  useEffect(()=> {
    if(textInputRef.current){
      if(isEditing){
        textInputRef.current.focus()
      } else {
        textInputRef.current.blur()
      }
    }
  },[isEditing])

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(item.id)}
          //TODO - use onPress (toggle task) prop
        >
          <View
            style={item.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {item.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput 
            value= {editedTitle}
            onChangeText={setEditingTitle}
            ref={textInputRef}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            style={item.done ? styles.taskTextDone : styles.taskText}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.iconsContainer}>
        { isEditing? (
          <TouchableOpacity onPress={handleCancelEditing}>
            <Icon name="x" size={24} color='#b2b2b2'/>
          </TouchableOpacity>
        ): (
          <TouchableOpacity onPress={handleStartEditing}>
            <Icon name="edit-3" size={23} color="#b2b2b2"/>
          </TouchableOpacity>
        )
        }
        <View style={styles.iconsDivider}/>
        <TouchableOpacity

          onPress={() => removeTask(item.id)}
          //TODO - use onPress (remove task) prop
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  iconsContainer:{
    flexDirection: "row",
    marginRight: 15,
  },
  iconsDivider:{
    width: 1,
    backgroundColor: "rgba(196,196,196,0.7)",
    marginHorizontal: 10,
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
});
