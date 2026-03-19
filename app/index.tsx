import { Text, View, StyleSheet, ScrollView, Pressable, Dimensions, Platform, SafeAreaView } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

const { width, height } = Dimensions.get('window');
const BUTTON_SIZE = width * 0.24;

export default function Index() {
  const router = useRouter();

  return (
    <View style={localStyles.container}>
      <StatusBar style="light" />
      
      {/* --- 1. Tactical Micro-Grid --- */}
      <View style={localStyles.gridContainer} pointerEvents="none">
        {[...Array(Math.floor(height / 30))].map((_, i) => (
          <View key={`h-${i}`} style={[localStyles.gridLineH, { top: i * 30 }]} />
        ))}
        {[...Array(Math.floor(width / 30))].map((_, i) => (
          <View key={`v-${i}`} style={[localStyles.gridLineV, { left: i * 30 }]} />
        ))}
      </View>

      {/* --- 2. Smooth Ambient Glow --- */}
      <View style={localStyles.glowPositioner} pointerEvents="none">
        <View style={localStyles.ambientBloomInner} />
        <View style={localStyles.subtleStreak} />
      </View>

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView 
          contentContainerStyle={localStyles.scrollContent} 
          showsVerticalScrollIndicator={false}
        >
          
          {/* --- 3. Glass XP Card --- */}
          <View style={localStyles.glassLevelCard}>
            <View style={localStyles.levelHeader}>
              <View>
                <Text style={localStyles.welcomeLabel}>CHAMPION</Text>
                <Text style={localStyles.welcomeText}>XYZ</Text>
              </View>
              <View style={localStyles.xpBadge}>
                <Text style={localStyles.xpScoreText}>200</Text>
                <Image 
                  style={localStyles.profileIconSmall}
                  source={require('../assets/images/userIcon.png')} 
                />
              </View>
            </View>
            <View style={localStyles.progressBarContainer}>
              <View style={localStyles.progressBarFill} />
            </View>
            <Text style={localStyles.progressText}>LEVEL 12  •  200 / 500 XP</Text>
          </View>

          {/* --- 4. Main Body: Avatar + Buttons --- */}
          <View style={localStyles.mainBodyRow}>
            <View style={localStyles.glassAvatarWrapper}>
              <View style={localStyles.avatarInner}>
                  <Text style={localStyles.placeholderText}>CHARACTER_PREVIEW</Text>
              </View>
            </View>

            <View style={localStyles.buttonColumn}>
              <Pressable 
                style={({ pressed }) => [localStyles.actionButton, pressed && { opacity: 0.7, transform: [{ scale: 0.96 }] }]}
                onPress={() => router.push("/userdetails")}
              >
                <View style={localStyles.glassIconCircle}>
                  <Image 
                    style={localStyles.questIconInner}
                    source={require('../assets/images/questIcon.png')} 
                    contentFit="contain" 
                  />
                </View>
                <Text style={localStyles.buttonLabel}>Quests</Text>
              </Pressable>

              <Pressable 
                style={({ pressed }) => [localStyles.actionButton, pressed && { opacity: 0.7, transform: [{ scale: 0.96 }] }]}
                onPress={()=>router.push("/timer")}
              >
                <View style={localStyles.glassIconCircle}>
                  <View style={localStyles.clockCircle}>
                    <View style={localStyles.clockHand} />
                  </View>
                </View>
                <Text style={localStyles.buttonLabel}>Focus</Text>
              </Pressable>
            </View>
          </View>

          {/* --- 5. Stats HUD --- */}
          <View style={localStyles.statsContainer}>
            <View style={localStyles.etchedStatRow}>
               <Text style={localStyles.statLabel}>USERNAME</Text>
               <Text style={localStyles.statValue}>xyz</Text>
            </View>
            <View style={localStyles.etchedStatRow}>
               <Text style={localStyles.statLabel}>CLASS</Text>
               <Text style={localStyles.statValue}>Knight</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* --- 6. Frosted Bottom Nav --- */}
      <View style={localStyles.bottomNav}>
        <Pressable onPress={() => {}}><Image style={localStyles.navIcon} source={require('../assets/images/settings.png')} /></Pressable>
        <Pressable onPress={() => router.replace("/")}><Image style={[localStyles.navIcon, { tintColor: '#FF6500' }]} source={require('../assets/images/Home.png')} /></Pressable>
        <Pressable onPress={() => router.push("/userdetails")}><Image style={localStyles.navIcon} source={require('../assets/images/userIcon.png')} /></Pressable>
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050506' },
  gridContainer: { ...StyleSheet.absoluteFillObject, opacity: 0.1 },
  gridLineH: { position: 'absolute', width: '100%', height: 0.5, backgroundColor: '#ffffff' },
  gridLineV: { position: 'absolute', height: '100%', width: 0.5, backgroundColor: '#ffffff' },
  
  glowPositioner: { 
    position: 'absolute', 
    top: 200, 
    right: -100, 
    width: 300, 
    height: 300, 
    alignItems: 'center', 
    justifyContent: 'center',
    zIndex: -1 
  },
  ambientBloomInner: {
    width: 250, 
    height: 250, 
    borderRadius: 125, 
    backgroundColor: 'rgba(255, 101, 0, 0.15)',
    ...Platform.select({
      ios: { shadowColor: '#FF6500', shadowOpacity: 0.6, shadowRadius: 80 }
    })
  },
  subtleStreak: { 
    position: 'absolute', 
    width: height, 
    height: 1, 
    backgroundColor: 'rgba(255, 101, 0, 0.2)', 
    transform: [{ rotate: '45deg' }] 
  },

  scrollContent: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 120 },
  
  glassLevelCard: { 
    backgroundColor: 'rgba(255, 255, 255, 0.05)', 
    padding: 20, borderRadius: 24, marginBottom: 24,
    borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  levelHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  welcomeLabel: { color: 'rgba(255, 255, 255, 0.4)', fontSize: 10, fontWeight: '900', letterSpacing: 2 },
  welcomeText: { color: '#FF6500', fontSize: 32, fontWeight: '900', textShadowColor: 'rgba(255, 101, 0, 0.4)', textShadowRadius: 10 },
  xpBadge: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'rgba(255,255,255,0.08)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  xpScoreText: { color: 'white', fontSize: 14, fontWeight: '800' },
  profileIconSmall: { width: 20, height: 20, borderRadius: 10 },
  progressBarContainer: { height: 6, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 3, marginTop: 20, overflow: 'hidden' },
  progressBarFill: { width: '40%', height: '100%', backgroundColor: '#FF6500' },
  progressText: { color: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: '800', marginTop: 10, textAlign: 'center', letterSpacing: 1 },

  mainBodyRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  glassAvatarWrapper: { 
    width: '58%', height: 320,        
    backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 24, 
    borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  avatarInner: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  placeholderText: { color: 'rgba(255,255,255,0.15)', fontWeight: '900', fontSize: 10, letterSpacing: 4, transform: [{ rotate: '-90deg' }] },
  
  buttonColumn: { width: '35%', gap: 20, alignItems: 'center' },
  actionButton: { alignItems: 'center', width: '100%' },
  glassIconCircle: { 
    width: BUTTON_SIZE, height: BUTTON_SIZE, borderRadius: BUTTON_SIZE / 2, 
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', 
    backgroundColor: 'rgba(255,255,255,0.07)',
    justifyContent: 'center', alignItems: 'center', marginBottom: 8,
  },
  questIconInner: { width: '50%', height: '50%' },
  buttonLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 11, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 },
  
  clockCircle: { width: 30, height: 30, borderRadius: 15, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.4)', justifyContent: 'center', alignItems: 'center' },
  clockHand: { width: 1.5, height: 8, backgroundColor: 'rgba(255,255,255,0.6)', position: 'absolute', top: 6 },

  statsContainer: { marginTop: 25, gap: 10 },
  etchedStatRow: { 
    flexDirection: 'row', justifyContent: 'space-between', 
    backgroundColor: 'rgba(255,255,255,0.03)', padding: 16, 
    borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' 
  },
  statLabel: { color: 'rgba(255,255,255,0.3)', fontSize: 11, fontWeight: '800' },
  statValue: { color: 'white', fontSize: 14, fontWeight: '600' },

  bottomNav: { 
    flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', 
    backgroundColor: 'rgba(10, 10, 12, 0.98)', height: 80, 
    position: 'absolute', bottom: 0, width: '100%',
    borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.08)', paddingBottom: Platform.OS === 'ios' ? 20 : 0
  },
  navIcon: { width: 22, height: 22, tintColor: 'rgba(255,255,255,0.4)' }
});