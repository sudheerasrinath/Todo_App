import React from 'react'
import { Image, StyleSheet } from 'react-native'

const NoData = () => {
    return (
        <Image
            style={Styles.no_data}
            source={{
                uri:
                    'https://img.freepik.com/premium-vector/no-data-concept-illustration_86047-488.jpg',
            }}
        />
    )
}

export default NoData;
const Styles = StyleSheet.create({
    no_data: {
        width: '100%',
        height: 300,
        marginTop: 30,
    }
});