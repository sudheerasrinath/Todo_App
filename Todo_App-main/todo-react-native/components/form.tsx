import React from 'react'
import {
    View,
    StyleSheet,
} from 'react-native';
import {
    Button as PaperButton,
    TextInput as PaperTextInput,
    Text as PaperText
} from 'react-native-paper';
import { Controller } from "react-hook-form"


interface FormProps {
    control?: any;
    onSubmit: () => void;
    todoId: number;
    errors: any;
}
const Form = ({ control, onSubmit, todoId, errors }: FormProps) => {
    return (
        <>
            <View style={Styles.create_todo_container}>
                <Controller
                    control={control}
                    name="description"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <PaperTextInput
                            label="New Todo"
                            mode="outlined"
                            style={Styles.create_todo_input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            error={errors.description?.message ? true : false}
                        />
                    )}

                />

                <PaperButton
                    onPress={onSubmit}
                    mode="contained"
                    icon={todoId === 0 ? 'plus' : 'pencil'}
                    color={'#208AEC'}
                    style={Styles.create_todo_button}>
                    {todoId === 0 ? 'Add' : 'Update'}
                </PaperButton>
            </View>
            <PaperText style={Styles.error}>
                {errors.description?.message}
            </PaperText>
        </>
    )
}

export default Form;

const Styles = StyleSheet.create({
    create_todo_container: {
        flexDirection: 'row',
    },
    create_todo_input: {
        flex: 1,
        height: 38,
        marginBottom: 16,
        backgroundColor: '#FFF',
        fontSize: 14,
    },
    create_todo_button: {
        marginTop: 6,
        marginLeft: 15,
        height: 40,
    },
    error: {
        color: 'red',
        fontSize: 12,
    }
})