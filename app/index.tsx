import { Text, View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import styles from './styles'; 

export default function Index() {
  return (
    <View style={localStyles.container}>
      {/* 1. Added style so it's visible. 2. Fixed source syntax. 3. Self-closed the tag */}
      <Image 
  style={localStyles.icon}
   source={require('../assets/images/settings.png')} 
/>
      <Text style={styles.heading}>Welcome User,</Text>
    </View>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1D',
    justifyContent: "flex-start", 
    alignItems: "flex-start",     
    paddingTop: 50, 
    paddingLeft: 20  
  },
  // Images from 'expo-image' need a width and height to show up!
  icon: {
    width: 20,
    height: 20,
    marginBottom: 10,
    paddingTop:12,
    justifyContent:'flex-end',
    alignItems:'flex-end'
  }
});