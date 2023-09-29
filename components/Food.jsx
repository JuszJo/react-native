import { View } from "react-native";

export default function Food({ position, size, color }) {
    return (
        <View
            style={{
                width: size,
                height: size,
                backgroundColor: color,
                position: "absolute",
                left: position[0] * size,
                top: position[1] * size,
            }}
        ></View>
    )
}