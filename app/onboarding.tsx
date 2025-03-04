import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppState } from '../monofront/StateProvider';
import { UserProfile } from '../monofront/AppLogic';

export default function OnboardingScreen() {
  const { dispatch } = useAppState();
  const router = useRouter();

  // Local state for onboarding form
  const [goal, setGoal] = useState<UserProfile['goal']>('maintenance');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');
  const [activityLevel, setActivityLevel] = useState<UserProfile['activityLevel']>('moderately_active');
  const [dietaryPreferences, setDietaryPreferences] = useState<UserProfile['dietaryPreferences']>('custom');
  const [weightChangeGoal, setWeightChangeGoal] = useState<UserProfile['weightChangeGoal']>('maintain');

  const handleSubmit = () => {
    // Basic validation
    if (!age || !weight || !height) {
      alert('Please fill in all fields.');
      return;
    }
    const profile: UserProfile = {
      goal,
      age: Number(age),
      weight: Number(weight),
      height: Number(height),
      gender,
      activityLevel,
      dietaryPreferences,
      weightChangeGoal,
    };
    dispatch({ type: 'SET_PROFILE', payload: profile });
    router.push('/'); // navigate to home
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>User Onboarding</Text>
      <TextInput
        placeholder="Goal (e.g., maintenance, weight_loss, muscle_gain, general_health)"
        value={goal}
        onChangeText={(text) => setGoal(text as UserProfile['goal'])}
        style={styles.input}
      />
      <TextInput placeholder="Age" value={age} onChangeText={setAge} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder="Weight (kg)" value={weight} onChangeText={setWeight} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder="Height (cm)" value={height} onChangeText={setHeight} keyboardType="numeric" style={styles.input} />
      <TextInput
        placeholder="Gender (male, female, other)"
        value={gender}
        onChangeText={(text) => setGender(text as 'male' | 'female' | 'other')}
        style={styles.input}
      />
      <TextInput
        placeholder="Activity Level (sedentary, lightly_active, moderately_active, very_active)"
        value={activityLevel}
        onChangeText={(text) => setActivityLevel(text as UserProfile['activityLevel'])}
        style={styles.input}
      />
      <TextInput
        placeholder="Dietary Preferences (vegan, vegetarian, keto, mediterranean, custom)"
        value={dietaryPreferences}
        onChangeText={(text) => setDietaryPreferences(text as UserProfile['dietaryPreferences'])}
        style={styles.input}
      />
      <TextInput
        placeholder="Weight Change Goal (mild, moderate, aggressive, maintain)"
        value={weightChangeGoal}
        onChangeText={(text) => setWeightChangeGoal(text as UserProfile['weightChangeGoal'])}
        style={styles.input}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    marginVertical: 8,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
});



