import React from 'react';
import { View, StyleSheet, ScrollView, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppState } from '../monofront/StateProvider';
import { calculateDailyIntake, getCaloricTarget, generateReminder, getMealRecommendations } from '../monofront/AppLogic';

export default function DashboardScreen() {
  const { state } = useAppState();
  const router = useRouter();

  const { userProfile, meals } = state;
  if (!userProfile) {
    return (
      <View style={styles.center}>
        <Text>No user profile found. Please complete onboarding.</Text>
        <Button title="Go to Onboarding" onPress={() => router.push('/onboarding')} />
      </View>
    );
  }

  const totalCalories = calculateDailyIntake(meals);
  const target = getCaloricTarget(userProfile);
  const reminder = generateReminder(userProfile, meals);
  const recommendations = getMealRecommendations(userProfile);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Text style={styles.section}>Daily Caloric Intake: {totalCalories} kcal</Text>
      <Text style={styles.section}>Caloric Target: {target} kcal</Text>
      <Text style={styles.section}>Reminder: {reminder}</Text>
      <Text style={styles.subtitle}>Meal Recommendations:</Text>
      {recommendations.map((rec, index) => (
        <Text key={index} style={styles.item}>- {rec}</Text>
      ))}
      <Button title="Back to Home" onPress={() => router.push('/')} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    fontSize: 18,
    marginVertical: 8,
  },
  subtitle: {
    fontSize: 20,
    marginTop: 16,
    fontWeight: 'bold',
  },
  item: {
    fontSize: 16,
    marginVertical: 4,
  },
});