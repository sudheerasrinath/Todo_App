import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {
  Title,
  Text as PaperText,
} from 'react-native-paper';
import Lists from './components/lists';
import Form from './components/form';
import { useForm } from "react-hook-form"
import { ToDoObj } from './dto/todo';
import NoData from './components/no-data';
import { yupResolver } from "@hookform/resolvers/yup"
import { schema } from './schema/todo';

const TodoList = () => {

  const [data, setData] = useState<ToDoObj[]>([]);
  const [todoId, setTodoId] = useState<number>(0);


  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      description: ""
    },
    resolver: yupResolver(schema),
  })
  const onSubmit = (value: { description: string }) => {

    if (!todoId) {
      addTodo(value.description);
    } else {
      updateRecord(value.description)
    }
  }

  const updateRecord = (description: string) => {
    const updatedPayload: ToDoObj = {
      id: todoId,
      description
    }
    setData(prevToDos =>
      prevToDos.map(todo =>
        todo.id === todoId ? { ...todo, ...updatedPayload } : todo
      )
    );
    setTodoId(0);
    reset({ description: '' });
  }

  const addTodo = (description: string) => {
    const todoPayload: ToDoObj = {
      id: data.length + 1,
      description: description
    }
    const updatedToDos = [...data, todoPayload].sort((a, b) => b.id - a.id);

    setData(updatedToDos);
    reset();
  };

  const deleteTodo = (id: number) => {
    setData(prevToDos => prevToDos.filter(todo => todo.id !== id));
  }

  const updateTodo = (todo: ToDoObj) => {
    setTodoId(todo.id);
    reset({ description: todo.description })
  }

  return (
    <>
      <StatusBar backgroundColor="#208AEC" />
      <SafeAreaView style={Styles.container}>
        <View style={Styles.header}>
          <Image
            style={Styles.header_logo}
            source={{
              uri:
                'https://cdn-icons-png.flaticon.com/512/6194/6194029.png',
            }}
          />
          <PaperText style={Styles.header_text_bold}>
            TODO APPLICATION
          </PaperText>
        </View>
        <View style={Styles.wrapper}>
          <View style={Styles.flex_between}>
            <Title>Todo List</Title>
          </View>
          <Form control={control} onSubmit={handleSubmit(onSubmit)} todoId={todoId} errors={errors} />
          <ScrollView>
            {data.length === 0 ? <NoData /> : <Lists data={data} deleteTodo={deleteTodo} updateTodo={updateTodo} />}

          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

export default TodoList;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  wrapper: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 20
  },
  header: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: '#208AEC',
  },
  header_logo: {
    width: 170,
    height: 40,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  header_text_bold: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  header_text: {
    marginTop: 3,
    color: '#fff',
    fontSize: 14,
  },
  flex_between: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  todo_text_done: {
    color: 'rgba(0, 0, 0, 0.3)',
    fontSize: 15,
    textDecorationLine: 'line-through',
  },
});