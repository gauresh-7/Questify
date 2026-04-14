import React, { useState } from "react";
import { 
  Text, 
  View, 
  StyleSheet, 
  ScrollView, 
  Pressable, 
  Platform, 
  SafeAreaView, 
  Alert, 
  TextInput, 
  KeyboardAvoidingView 
} from "react-native";
import { Image } from "expo-image";
import { usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useTransition } from "./_layout";
import { useGameStore } from "../store";
import type { TaskDifficulty } from "../store";

export default function TasksScreen() {
  const pathname = usePathname();
  const { navigateWithTransition } = useTransition();

  // Global State
  const { currentXp, tasks, toggleTask, addTask } = useGameStore();
  
  // Local UI State
  const [taskName, setTaskName] = useState("");
  const [difficulty, setDifficulty] = useState<TaskDifficulty>("MEDIUM");

  const addNewTask = () => {
    if (taskName.trim().length === 0) {
      Alert.alert("INPUT_REQUIRED", "Objective title cannot be empty.");
      return;
    }
    
    const added = addTask(taskName, difficulty);
    if (added) {
      setTaskName("");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#050506' }}>
      <StatusBar style="light" />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : undefined} 
        style={{ flex: 1 }}
      >
        <SafeAreaView style={localStyles.container}>
          
          {/* Header */}
          <View style={localStyles.headerWrapper}>
            <View style={localStyles.header}>
              <Pressable onPress={() => navigateWithTransition("/", "zoom")} style={localStyles.backButton}>
                <Text style={localStyles.backText}>{"<"} BACK</Text>
              </Pressable>
              <View>
                <Text style={localStyles.screenTitle}>QUESTS</Text>
                <Text style={localStyles.xpTotalText}>{currentXp} Total XP</Text>
              </View>
            </View>
          </View>

          <ScrollView 
            contentContainerStyle={localStyles.scrollContent} 
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Input Section */}
            <View style={localStyles.inputWrapper}>
              <TextInput
                style={localStyles.textInput}
                placeholder="ACCEPT A QUEST..."
                placeholderTextColor="rgba(255,255,255,0.2)"
                value={taskName}
                onChangeText={setTaskName}
                autoCapitalize="characters"
              />
              <Pressable style={localStyles.addButtonSmall} onPress={addNewTask}>
                <Text style={localStyles.addButtonTextSmall}>EMBARK</Text>
              </Pressable>
            </View>

            {/* Difficulty Selector */}
            <View style={localStyles.difficultyRow}>
              {(["EASY", "MEDIUM", "HARD"] as TaskDifficulty[]).map((option) => (
                <Pressable
                  key={option}
                  onPress={() => setDifficulty(option)}
                  style={[
                    localStyles.difficultyChip,
                    difficulty === option && localStyles.difficultyChipActive,
                  ]}
                >
                  <Text
                    style={[
                      localStyles.difficultyText,
                      difficulty === option && localStyles.difficultyTextActive,
                    ]}
                  >
                    {option}
                  </Text>
                </Pressable>
              ))}
            </View>

            {/* Task List */}
            {tasks.map((task) => (
              <Pressable 
                key={task.id} 
                onPress={() => toggleTask(task.id)}
                style={[
                  localStyles.taskCard, 
                  task.status === "COMPLETED" && { borderColor: 'rgba(0, 255, 150, 0.3)' }
                ]}
              >
                <View style={localStyles.taskHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={[
                      localStyles.taskTitle,
                      task.status === "COMPLETED" && { color: '#00FF96', textDecorationLine: 'line-through' }
                    ]}>{task.title}</Text>
                    <Text style={localStyles.xpRewardText}>+{task.xpValue} XP REWARD</Text>
                  </View>
                  <View style={[
                    localStyles.priorityBadge, 
                    task.status === "COMPLETED" && { borderColor: '#00FF96' }
                  ]}>
                    <Text style={[
                      localStyles.priorityText, 
                      task.status === "COMPLETED" && { color: '#00FF96' }
                    ]}>{task.status === "COMPLETED" ? "CLEARED" : task.priority}</Text>
                  </View>
                </View>

                <View style={localStyles.progressBarContainer}>
                  <View style={[
                    localStyles.progressBarFill, 
                    { width: task.progress },
                    task.status === "COMPLETED" && { backgroundColor: '#00FF96' }
                  ]} />
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>

      {/* Navigation - Positioned outside KeyboardAvoidingView to keep it grounded */}
      <View style={localStyles.bottomNav}>
        <Pressable onPress={() => {}}>
          <Image style={localStyles.navIcon} source={require('../assets/images/settings.png')} />
        </Pressable>
        <Pressable onPress={() => navigateWithTransition("/", "zoom")}>
          <Image style={[localStyles.navIcon, pathname === "/" && { tintColor: '#FF6500' }]} source={require('../assets/images/Home.png')} />
        </Pressable>
        <Pressable onPress={() => {}}>
          <Image style={[localStyles.navIcon, pathname === "/tasks" && { tintColor: '#FF6500' }]} source={require('../assets/images/questIcon.png')} />
        </Pressable>
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050506' },
  headerWrapper: { paddingTop: Platform.OS === 'ios' ? 10 : 25 },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingTop: 20,
    paddingHorizontal: 20, 
    paddingBottom: 20,
    borderBottomWidth: 1, 
    borderBottomColor: 'rgba(255,255,255,0.1)' 
  },
  backButton: { marginRight: 20 },
  backText: { color: 'rgba(255,255,255,0.4)', fontWeight: '900', fontSize: 12 },
  screenTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: '900', letterSpacing: 2 },
  xpTotalText: { color: '#FF6500', fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  scrollContent: { padding: 20, paddingBottom: 120 },
  inputWrapper: { 
    flexDirection: 'row', 
    backgroundColor: 'rgba(255,255,255,0.05)', 
    borderRadius: 12, 
    borderWidth: 1, 
    borderColor: 'rgba(255,255,255,0.1)', 
    marginBottom: 15, 
    paddingHorizontal: 12, 
    alignItems: 'center',
    height: 50
  },
  textInput: { flex: 1, color: '#FFF', fontWeight: '700', fontSize: 13, letterSpacing: 1 },
  addButtonSmall: { backgroundColor: '#FF6500', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  addButtonTextSmall: { color: '#000', fontWeight: '900', fontSize: 10 },
  difficultyRow: { flexDirection: 'row', gap: 10, marginBottom: 25 },
  difficultyChip: { borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6, backgroundColor: 'rgba(255,255,255,0.03)' },
  difficultyChipActive: { borderColor: '#FF6500', backgroundColor: 'rgba(255, 101, 0, 0.2)' },
  difficultyText: { color: 'rgba(255,255,255,0.6)', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  difficultyTextActive: { color: '#FF6500' },
  taskCard: { backgroundColor: 'rgba(255, 255, 255, 0.03)', borderRadius: 20, padding: 20, marginBottom: 15, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.08)' },
  taskHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  taskTitle: { color: '#FFF', fontSize: 14, fontWeight: '800', letterSpacing: 1 },
  xpRewardText: { color: 'rgba(255, 101, 0, 0.6)', fontSize: 9, fontWeight: '900', marginTop: 4 },
  priorityBadge: { borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  priorityText: { color: 'rgba(255,255,255,0.5)', fontSize: 9, fontWeight: '900' },
  progressBarContainer: { height: 4, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: '#FF6500' },
  bottomNav: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'center', 
    backgroundColor: '#050506', // Solid color stops the bleed
    height: 80, 
    width: '100%', 
    borderTopWidth: 1, 
    borderTopColor: 'rgba(255,255,255,0.08)', 
    paddingBottom: Platform.OS === 'ios' ? 20 : 0 
  },
  navIcon: { width: 22, height: 22, tintColor: 'rgba(255,255,255,0.4)' }
});