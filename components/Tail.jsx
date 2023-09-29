import { View } from "react-native"

export default function Tail({ elements, position, color, size }) {
    const tailList = elements.map((currentTailPosition, index) => {
        return <View
                    key={index}
                    style={{
                        width: size,
                        height: size,
                        position: "absolute",
                        backgroundColor: color,
                        left: currentTailPosition[0] * size,
                        top: currentTailPosition[1] * size,

                    }}
                >
                    
                </View>
    })

    return (
        <View>
            {tailList}
        </View>
    )
}