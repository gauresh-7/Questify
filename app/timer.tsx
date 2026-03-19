import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, Dimensions, Keyboard, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';

const { width } = Dimensions.get('window');

const TimerApp = () => {
  const [minutes, setMinutes] = useState('45');
  const [secondsLeft, setSecondsLeft] = useState(45 * 60);
  const [isActive, setIsActive] = useState(false);
  const [soundStatus, setSoundStatus] = useState('loading');
  const timerRef = useRef(null);
  const soundRef = useRef(null);
  const soundLoadedRef = useRef(false);

  // Load sound on app start
  useEffect(() => {
    const loadSound = async () => {
      try {
        setSoundStatus('loading');
        console.log('Starting to load audio...');

        // Set audio mode for better compatibility
        await Audio.setAudioModeAsync({
          staysActiveInBackground: true,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
        });

        const { sound } = await Audio.Sound.createAsync(
          require('../assets/images/lofi.wav'),
          { 
            shouldPlay: false, 
            isLooping: true,
            progressUpdateIntervalMillis: 5000 // Update progress every 5 seconds
          }
        );

        soundRef.current = sound;
        soundLoadedRef.current = true;
        setSoundStatus('loaded');
        console.log('Sound loaded successfully');
      } catch (error) {
        console.log('Error loading sound:', error);
        setSoundStatus('error');
        console.log('Make sure lofi.wav exists in assets/images/');
      }
    };

    loadSound();
    
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  // Play/pause music when timer starts/stops
  useEffect(() => {
    if (!soundLoadedRef.current || !soundRef.current) {
      console.log('Sound not ready. Loaded:', soundLoadedRef.current, 'Ref:', !!soundRef.current);
      return;
    }

    if (isActive) {
      console.log('Playing audio...');
      soundRef.current.playAsync().catch(err => {
        console.log('Error playing sound:', err);
        setSoundStatus('play_error');
      });
    } else {
      console.log('Pausing audio...');
      soundRef.current.pauseAsync().catch(err => {
        console.log('Error pausing sound:', err);
      });
    }
  }, [isActive]);

  useEffect(() => {
    if (isActive && secondsLeft > 0) {
      timerRef.current = setInterval(() => {
        setSecondsLeft((prev) => (prev <= 1 ? 0 : prev - 1));
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isActive]);

  useEffect(() => {
    if (secondsLeft === 0 && isActive) {
      setIsActive(false);
    }
  }, [secondsLeft]);

  const formatTime = () => {
    const mins = Math.floor(secondsLeft / 60);
    const secs = secondsLeft % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleInputChange = (val) => {
    const cleanVal = val.replace(/[^0-9]/g, '');
    if (cleanVal.length <= 3) {
      setMinutes(cleanVal);
      setSecondsLeft((parseInt(cleanVal) || 0) * 60);
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.bgGlow, { opacity: isActive ? 0.3 : 0.1, top: 100, left: -50 }]} />
      <View style={[styles.bgGlow, { opacity: isActive ? 0.2 : 0.05, bottom: 50, right: -100, backgroundColor: '#FF2D00' }]} />

      <View style={styles.glassCard}>
        <LinearGradient
          colors={['rgba(255,255,255,0.12)', 'transparent']}
          style={styles.specularHighlight}
        />

        <Text style={styles.label}>FOCUS SESSION</Text>

        {/* Audio Status Indicator */}
        <View style={styles.statusIndicator}>
          <Text style={[
            styles.statusText,
            soundStatus === 'loaded' && styles.statusLoaded,
            soundStatus === 'loading' && styles.statusLoading,
            soundStatus === 'error' && styles.statusError
          ]}>
            {soundStatus === 'loaded' ? '🎵' : soundStatus === 'loading' ? '⏳' : '❌'}
          </Text>
        </View>
        
        <View style={styles.timerOuterRing}>
          <LinearGradient
            colors={isActive ? ['#FF6500', '#FF2D00'] : ['#333', '#111']}
            style={styles.timerCircle}
          >
            <View style={styles.innerCore}>
              <View style={styles.artifactReflection} />
              <Text style={[styles.timerText, isActive && styles.glowText]}>
                {formatTime()}
              </Text>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, isActive && { opacity: 0.5 }]}
            keyboardType="number-pad"
            value={minutes}
            onChangeText={handleInputChange}
            placeholder="00"
            placeholderTextColor="#333"
            editable={!isActive}
          />
          <Text style={styles.inputLabel}>MINUTES</Text>
        </View>

        <View style={styles.buttonRow}>
          <Pressable 
            style={({ pressed }) => [
                styles.mainButton, 
                pressed && { transform: [{ scale: 0.97 }] }
            ]} 
            onPress={() => {
              Keyboard.dismiss();
              setIsActive(!isActive);
            }}
            disabled={soundStatus === 'error'}
          >
            {isActive ? (
               <View style={styles.buttonHalt}>
                 <Text style={styles.buttonText}>HALT</Text>
               </View>
            ) : (
              <LinearGradient 
                colors={['#FF8533', '#FF6500']} 
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>IGNITE</Text>
              </LinearGradient>
            )}
          </Pressable>

          <Pressable onPress={() => { setIsActive(false); setSecondsLeft((parseInt(minutes) || 0) * 60); }}>
            <Text style={styles.resetText}>RESET SYSTEM</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050505',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgGlow: {
    position: 'absolute',
    width: width,
    height: width,
    borderRadius: width / 2,
    backgroundColor: '#FF6500',
    shadowColor: '#FF6500',
    shadowOpacity: 1,
    shadowRadius: 100,
    elevation: 20,
  },
  glassCard: {
    width: width * 0.9,
    paddingVertical: 50,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    backgroundColor: 'rgba(25, 25, 28, 0.85)',
    overflow: 'hidden',
  },
  specularHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  label: {
    color: '#FF6500',
    fontSize: 10,
    letterSpacing: 6,
    fontWeight: '900',
    marginBottom: 20,
  },
  statusIndicator: {
    marginBottom: 20,
  },
  statusText: {
    fontSize: 24,
  },
  statusLoaded: {
    color: '#00FF00',
  },
  statusLoading: {
    color: '#FFD700',
  },
  statusError: {
    color: '#FF0000',
  },
  timerOuterRing: {
    padding: 10,
    borderRadius: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    marginBottom: 40,
  },
  timerCircle: {
    width: 210,
    height: 210,
    borderRadius: 105,
    padding: 2,
  },
  innerCore: {
    flex: 1,
    borderRadius: 105,
    backgroundColor: '#0a0a0c',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  artifactReflection: {
    position: 'absolute',
    top: '10%',
    left: '20%',
    width: '60%',
    height: '20%',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 50,
    transform: [{ rotate: '-15deg' }],
  },
  timerText: {
    color: '#FFFFFF',
    fontSize: 54,
    fontWeight: '200',
    ...Platform.select({ ios: { fontFamily: 'Courier' }, android: { fontFamily: 'monospace' } }),
  },
  glowText: {
    textShadowColor: 'rgba(255, 101, 0, 0.8)',
    textShadowRadius: 12,
  },
  inputContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  input: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '800',
    width: 120,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 101, 0, 0.5)',
  },
  inputLabel: {
    color: '#FF6500',
    fontSize: 9,
    letterSpacing: 2,
    marginTop: 10,
    fontWeight: '700',
    opacity: 0.6,
  },
  buttonRow: {
    width: '100%',
    alignItems: 'center',
    gap: 20,
  },
  mainButton: {
    width: '75%',
    height: 58,
    borderRadius: 16,
    overflow: 'hidden',
  },
  buttonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonHalt: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#FF6500',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 4,
  },
  resetText: {
    color: '#444',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
    padding: 10,
  }
});

export default TimerApp;
