/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import type { PropsWithChildren } from 'react';

import {
    Button,
    Pressable,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Snake from './screens/Snake';

type SectionProps = PropsWithChildren<{
    title: string;
}>;

function Section({ children, title }: SectionProps): JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <View style={styles.sectionContainer}>
            <Text
                style={[
                    styles.sectionTitle,
                    {
                        color: isDarkMode ? Colors.white : Colors.black,
                    },
                ]}>
                {title}
            </Text>
            <View></View>
            <Text
                style={[
                    styles.sectionDescription,
                    {
                        color: isDarkMode ? Colors.light : Colors.dark,
                    },
                ]}>
                {children}
            </Text>
        </View>
    );
}

type RootStackParamList = {
    Home: undefined;
    Snake: undefined;
};

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

function Home({ navigation }: HomeProps) {
    return (
        <SafeAreaView>
            <View>
                <Text style={styles.HomeMessage}>Welcome to the multi-game application</Text>
                <Pressable onPress={() => navigation.navigate('Snake')} style={({ pressed }) => [{backgroundColor: pressed ? 'rgb(150, 150, 255)' : 'rgb(210, 230, 255)'}, styles.HomeAccessGameWrapper]}>
                    <Text style={styles.HomeAccessGame}>Click on this to access the snake game</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

type SnakeGameProps = NativeStackScreenProps<RootStackParamList, 'Snake'>

function SnakeGame({ navigation }: SnakeGameProps) {
    return (
        <Snake />
    )
}

const Stack = createNativeStackNavigator<RootStackParamList>()

function App(): JSX.Element {

    return (
        // <NativeDefault />
        // <Snake />
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Home' children={Home} />
                <Stack.Screen name='Snake' children={SnakeGame} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    HomeMessage: {
        fontSize: 30,
        fontFamily: 'san serif',
        textAlign: 'center'
    },
    HomeAccessGameWrapper: {
        marginTop: 24
    },
    HomeAccessGame: {
        fontSize: 22,
        maxWidth: 200,
        fontFamily: 'san serif',
        textAlign: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        // marginTop: 32,
        // backgroundColor: 'rgb(210, 230, 255)'
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});

export default App;
