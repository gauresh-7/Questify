import { Text, View, StyleSheet, ScrollView, Pressable, Dimensions, Platform } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get('window');
const BUTTON_SIZE = width * 0.26;

export default function Index() {
  const router = useRouter();

  return (
    <View style={localStyles.container}>
      
      {/* --- 1. Tactical Micro-Grid --- */}
      <View style={localStyles.gridContainer} pointerEvents="none">
        {[...Array(Math.floor(height / 25))].map((_, i) => (
          <View key={`h-${i}`} style={[localStyles.gridLineH, { top: i * 25 }]} />
        ))}
        {[...Array(Math.floor(width / 25))].map((_, i) => (
          <View key={`v-${i}`} style={[localStyles.gridLineV, { left: i * 25 }]} />
        ))}
      </View>

      {/* --- 2. Smooth Ambient Glow & 45° Streak --- */}
      <View style={localStyles.glowPositioner} pointerEvents="none">
        <View style={localStyles.ambientBloomOuter} />
        <View style={localStyles.ambientBloomInner} />
        <View style={localStyles.subtleStreak} />
      </View>

      <ScrollView 
        contentContainerStyle={localStyles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        
        {/* --- 3. Glass XP Card --- */}
        <View style={localStyles.glassLevelCard}>
          <View style={localStyles.levelHeader}>
            <View>
                <Text style={localStyles.welcomeLabel}>CHAMPION</Text>
                <Text style={localStyles.welcomeText}>xyz</Text>
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
              style={({ pressed }) => [localStyles.actionButton, pressed && { transform: [{ scale: 0.95 }] }]}
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

            <Pressable style={({ pressed }) => [localStyles.actionButton, pressed && { transform: [{ scale: 0.95 }] }]}>
              <View style={localStyles.glassIconCircle}>
                <View style={localStyles.clockCircle}>
                  <View style={localStyles.clockHand} />
                </View>
              </View>
              <Text style={localStyles.buttonLabel}>Focus</Text>
            </Pressable>
          </View>
        </View>

        {/* --- 5. Stats HUD (Glass Tiles) --- */}
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
  
  // Grid
  gridContainer: { ...StyleSheet.absoluteFillObject, opacity: 0.08 },
  gridLineH: { position: 'absolute', width: '100%', height: 0.5, backgroundColor: 'rgba(255, 255, 255, 0.3)' },
  gridLineV: { position: 'absolute', height: '100%', width: 0.5, backgroundColor: 'rgba(255, 255, 255, 0.3)' },
  
  // --- Glow & 45° Streak Fix ---
  glowPositioner: { 
    position: 'absolute', 
    top: 320, 
    right: -120, 
    width: 400, 
    height: 400, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  ambientBloomOuter: {
    position: 'absolute',
    width: 350,
    height: 350,
    borderRadius: 175,
    backgroundColor: 'rgba(255, 101, 0, 0.04)',
  },
  ambientBloomInner: {
    width: 200, 
    height: 200, 
    borderRadius: 100, 
    backgroundColor: 'rgba(255, 101, 0, 0.08)',
    ...Platform.select({
      ios: { 
        shadowColor: '#FF6500', 
        shadowOpacity: 0.4, 
        shadowRadius: 100 
      }
    })
  },
  subtleStreak: { 
    position: 'absolute', 
    width: height * 1.5, // Long enough to span diagonally
    height: 1, 
    backgroundColor: 'rgba(255, 101, 0, 0.12)', 
    transform: [{ rotate: '45deg' }] // Cinematic 45 degree angle
  },

  scrollContent: { paddingTop: 60, paddingHorizontal: 20, paddingBottom: 120 },
  
  // Glass XP Card
  glassLevelCard: { 
    backgroundColor: 'rgba(255, 255, 255, 0.03)', 
    padding: 22, borderRadius: 28, marginBottom: 24,
    borderWidth: 1.5, borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  welcomeLabel: { color: 'rgba(255, 255, 255, 0.3)', fontSize: 10, fontWeight: '900', letterSpacing: 2 },
  welcomeText: { color: '#FF6500', fontSize: 30, fontWeight: '900', marginTop: -2, textShadowColor: 'rgba(255, 101, 0, 0.3)', textShadowRadius: 8 },
  xpBadge: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'rgba(255,255,255,0.06)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  xpScoreText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  profileIconSmall: { width: 22, height: 22, borderRadius: 11 },
  progressBarContainer: { height: 8, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 4, marginTop: 20, overflow: 'hidden' },
  progressBarFill: { width: '40%', height: '100%', backgroundColor: '#FF6500' },
  progressText: { color: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: '900', marginTop: 8, textAlign: 'center', letterSpacing: 1 },

  // Layout
  mainBodyRow: { flexDirection: 'row', gap: 20, alignItems: 'center' },
  glassAvatarWrapper: { 
    width: width * 0.52, height: 340,        
    backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: 24, 
    borderWidth: 1.5, borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  avatarInner: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  placeholderText: { color: 'rgba(255,255,255,0.1)', fontWeight: '900', fontSize: 9, letterSpacing: 3, transform: [{ rotate: '-90deg' }] },
  
  buttonColumn: { flex: 1, gap: 20, alignItems: 'center' },
  actionButton: { alignItems: 'center' },
  glassIconCircle: { 
    width: BUTTON_SIZE, height: BUTTON_SIZE, borderRadius: BUTTON_SIZE / 2, 
    borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.15)', 
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center', alignItems: 'center', marginBottom: 8,
  },
  questIconInner: { width: '55%', height: '55%' },
  buttonLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 10, fontWeight: '900', textTransform: 'uppercase', letterSpacing: 1 },
  
  clockCircle: { width: 36, height: 36, borderRadius: 18, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.3)', justifyContent: 'center', alignItems: 'center' },
  clockHand: { width: 1.5, height: 10, backgroundColor: 'rgba(255,255,255,0.5)', position: 'absolute', top: 8 },

  // Stats
  statsContainer: { marginTop: 30, gap: 8 },
  etchedStatRow: { 
    flexDirection: 'row', justifyContent: 'space-between', 
    backgroundColor: 'rgba(255,255,255,0.04)', padding: 18, 
    borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' 
  },
  statLabel: { color: 'rgba(255,255,255,0.3)', fontSize: 11, fontWeight: '900', letterSpacing: 1 },
  statValue: { color: 'white', fontSize: 15, fontWeight: '500' },

  // Nav
  bottomNav: { 
    flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', 
    backgroundColor: 'rgba(5, 5, 6, 0.96)', height: 85, 
    position: 'absolute', bottom: 0, width: '100%',
    borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)', paddingBottom: 20
  },
  navIcon: { width: 24, height: 24, tintColor: 'rgba(255,255,255,0.3)' }
});