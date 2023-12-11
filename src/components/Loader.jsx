import React from 'react';
import { Text, View, StyleSheet, Modal, ActivityIndicator } from 'react-native';

const Loader = (props) => {
    const { loading, ...attributes} = props;
  return (
    <Modal transparent={true} animationType={'none'} visible={loading}
        onRequestClose={() => {
            console.log("close model");
        }}
    >
        <View style={styles.modalBackground}>
            <View style={styles.activityIndicatorWrapper}>
                <ActivityIndicator style={styles.activityIndicator} />
            </View>
        </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
    container: {},
    modalBackground: {
        flex: 1,
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "space-around",
        backgroundColor: "#00000040",
    },
    activityIndicatorWrapper: {
        backgroundColor: "#FFFFFF",
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: "center",
        justifyContent: "space-around"
    },
    activityIndicator: {
        alignItems: "center",
        height: 80,
    }
});

export default Loader;
