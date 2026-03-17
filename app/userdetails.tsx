import React from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions, Platform } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get('window');

const UserDetails = () => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            {/* --- 1. Micro-Grid Background (Dense & Subtle) --- */}
            <View style={styles.gridContainer}>
                {/* Horizontal Lines (Spacing reduced to 25 for density) */}
                {[...Array(Math.floor(height / 25))].map((_, i) => (
                    <View key={`h-${i}`} style={[styles.gridLineH, { top: i * 25 }]} />
                ))}
                {/* Vertical Lines */}
                {[...Array(Math.floor(width / 25))].map((_, i) => (
                    <View key={`v-${i}`} style={[styles.gridLineV, { left: i * 25 }]} />
                ))}
            </View>

            {/* --- 2. Enhanced Radiant Glow (Bottom Left) --- */}
            <View style={styles.glowSource} />

            <View style={styles.headerContainer}>
                <Text style={styles.heading}>Who art thou?</Text>
            </View>
            
            {/* 3. Liquid Glass Avatar Card */}
            <View style={styles.glassCard}>
                <View style={styles.avatarInner}>
                    <Text style={styles.placeholderText}>Avatar Preview</Text>
                </View>
            </View>

            {/* 4. Glass Detail Rows */}
            <View style={styles.detailsContainer}>
                {[
                    { label: 'Name', value: 'xyz' },
                    { label: 'Class', value: 'Knight' },
                    { label: 'Level', value: '12' },
                    { label: 'Next Ascension', value: '8 Lvls' },
                ].map((item, index) => (
                    <View key={index} style={styles.glassDetailRow}>
                        <Text style={styles.label}>{item.label}</Text>
                        <Text style={styles.value}>{item.value}</Text>
                    </View>
                ))}
            </View>
            
            {/* 5. Frosted Bottom Nav */}
            <View style={styles.bottomNav}>
                <Pressable onPress={() => {}}>
                    <Image style={styles.navIcon} source={require('../assets/images/settings.png')} />
                </Pressable>
                
                <Pressable onPress={() => router.replace("/")}>
                    <Image style={styles.navIcon} source={require('../assets/images/Home.png')} />
                </Pressable>
                
                <Pressable onPress={() => router.push("/userdetails")}>
                    <Image style={[styles.navIcon, { tintColor: '#FF6500' }]} source={require('../assets/images/userIcon.png')} />
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#070708', // Near-black for maximum contrast
        alignItems: 'center',
        paddingTop: 80,
    },
    // --- Micro-Grid ---
    gridContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.08, // Lowered opacity for that "barely there" look
    },
    gridLineH: {
        position: 'absolute',
        width: '100%',
        height: 0.5, // Thinner lines
        backgroundColor: 'rgba(255, 255, 255, 0.71)',
    },
    gridLineV: {
        position: 'absolute',
        height: '100%',
        width: 0.5, // Thinner lines
        backgroundColor: 'rgba(255, 255, 255, 0.71)',
    },
    // --- Neon Glow Effect ---
    glowSource: {
        position: 'absolute',
        bottom: 120,
        left: -80,
        width: 250,
        height: 250,
        borderRadius: 125,
        backgroundColor: 'rgba(255, 101, 0, 0.25)', // Higher opacity center
        // Neon Bloom Effect
        ...Platform.select({
            ios: {
                shadowColor: '#FF6500',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 1,
                shadowRadius: 80,
            },
            android: {
                elevation: 30, // Android elevation mimics some glow
            }
        }),
    },
    headerContainer: {
        width: '100%',
        paddingHorizontal: 25,
        marginBottom: 30,
    },
    heading: {
        fontSize: 32,
        color: '#FF6500', 
        fontWeight: '900',
        letterSpacing: -1,
        // Text glow
        textShadowColor: 'rgba(255, 101, 0, 0.6)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 15,
    },
    glassCard: {
        width: width * 0.8,
        height: width * 0.8,
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        borderRadius: 24,
        padding: 1,
        marginBottom: 40,
        borderWidth: 1.5,
        borderColor: 'rgba(255, 255, 255, 0.15)', 
    },
    avatarInner: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.01)',
        borderRadius: 23,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        color: 'rgba(255, 255, 255, 0.15)',
        fontWeight: '700',
        fontSize: 10,
        letterSpacing: 4,
    },
    detailsContainer: {
        width: '100%',
        paddingHorizontal: 25,
        gap: 12,
    },
    glassDetailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.04)',
        paddingVertical: 18,
        paddingHorizontal: 20,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.08)',
    },
    label: {
        color: 'rgba(255, 255, 255, 0.35)',
        fontSize: 11,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    value: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '600',
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'rgba(7, 7, 8, 0.92)',
        height: 90,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.1)',
        paddingBottom: 20,
    },
    navIcon: {
        width: 24,
        height: 24,
        tintColor: 'rgba(255, 255, 255, 0.3)',
    },
});

export default UserDetails;