import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import {
    List
} from 'react-native-paper';
import { ToDoObj } from '../dto/todo';

interface ListsProps {
    data: ToDoObj[];
    deleteTodo: (id: number) => void;
    updateTodo: (value: ToDoObj) => void
}

const Lists = ({ data, deleteTodo, updateTodo }: ListsProps) => {
    return (
        <>
            {data.map((todo: any) => (
                <List.Item
                    key={todo.id}
                    title={todo.description}
                    titleStyle={Styles.todo_text}
                    style={Styles.todo_item}
                    right={(props: any) => (
                        <>

                            <TouchableOpacity
                                onPress={() => updateTodo(todo)}
                            >
                                <List.Icon
                                    {...props}
                                    icon="check"
                                    color={'#4CAF50'}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => deleteTodo(todo.id)}
                            >
                                <List.Icon {...props} icon="close" color={'#ef5350'} />
                            </TouchableOpacity>
                        </>
                    )}
                />
            ))}
        </>
    );
};

export default Lists;

const Styles = StyleSheet.create({
    todo_item: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.12)',
    },
    todo_text: {
        fontSize: 15,
    },
});