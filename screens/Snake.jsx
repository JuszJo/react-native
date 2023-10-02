import { useRef } from "react";
import { GameEngine } from "react-native-game-engine";
import { View, StatusBar, StyleSheet, Text, PanResponder } from "react-native";
import constants from "../constants";
import Head from '../components/Head';
import GameLoop from '../systems/Loop';
import Food from '../components/Food';
import Tail from '../components/Tail';


const BoardSize = constants.GRID_SIZE * constants.CELL_SIZE


const systems = [GameLoop]

export default function Snake() {
    const engine = useRef(null)

    const entities = {
        food: {
            position: [10, 10],
            size: constants.CELL_SIZE,
            color: "green",
            renderer: <Food />
        },
    
        tail: {
            size: constants.CELL_SIZE,
            color: "grey",
            elements: [],
            renderer: <Tail />
        },
    
        head: {
            position: [0, 0],
            size: constants.CELL_SIZE,
            updateFrequency: 1,
            nextMove: 1,
            color: "red",
            xspeed: 0,
            yspeed: 1,
            renderer: <Head />
        },
    }
    
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => true,
        onStartShouldSetPanResponderCapture: (e, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

        onPanResponderGrant: (e, gestureState) => {
            console.log(gestureState);
        },

        onPanResponderMove: (e, gestureState) => {
            const movementState = {}

            if(gestureState.dx > 0) {
                movementState[Math.abs(gestureState.dx)] = "MOVE_RIGHT"
            }
            else {
                movementState[Math.abs(gestureState.dx)] = "MOVE_LEFT"
            }
            
            if(gestureState.dy > 0) {
                movementState[Math.abs(gestureState.dy)] = "MOVE_DOWN"
            }
            else {
                movementState[Math.abs(gestureState.dy)] = "MOVE_UP"
            }

            const movement = movementState[Math.max(Math.abs(gestureState.dx), Math.abs(gestureState.dy))]
            
            // console.log(movement);

            engine.current.dispatch(movement)
        },

        onPanResponderRelease: (e, gestureState) => {
            console.log(gestureState);
        }
    })
    
    return (
        <View {...panResponder.panHandlers} style={styles.view}>
            <GameEngine style={styles.engine} ref={engine} entities={entities} systems={systems}>

            </GameEngine>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        marginTop: StatusBar.currentHeight,
        flexBasis: "100%",
        alignItems: "center"
    },

    engine: {
        width: BoardSize,
        height:  BoardSize,
        backgroundColor: "black",
        border: "1px solid black",
    }
})