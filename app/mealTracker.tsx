import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppState } from '../monofront/StateProvider';
import { MealEntry } from '../monofront/AppLogic';
import uuid from 'react-native-uuid';

export default function MealTrackerScreen() {
  const { dispatch } = useAppState();
  const router = useRouter();

  const [description, setDescription] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fats, setFats] = useState('');
  const [fiber, setFiber] = useState('');

  const handleAddMeal = () => {
    if (!description || !calories) {
      alert('Please provide meal description and calories.');
      return;
    }
    const meal: MealEntry = {
      id: uuid.v4().toString(),
      timestamp: Date.now(),
      description,
      calories: Number(calories),
      macros: {
        protein: Number(protein) || 0,
        carbs: Number(carbs) || 0,
        fats: Number(fats) || 0,
        fiber: Number(fiber) || 0,
      },
    };
    dispatch({ type: 'ADD_MEAL', payload: meal });
    // Reset form fields
    setDescription('');
    setCalories('');
    setProtein('');
    setCarbs('');
    setFats('');
    setFiber('');
    alert('Meal added!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Meal Tracker</Text>
      <TextInput placeholder="Meal Description" value={description} onChangeText={setDescription} style={styles.input} />
      <TextInput placeholder="Calories" value={calories} onChangeText={setCalories} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder="Protein (g)" value={protein} onChangeText={setProtein} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder="Carbs (g)" value={carbs} onChangeText={setCarbs} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder="Fats (g)" value={fats} onChangeText={setFats} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder="Fiber (g)" value={fiber} onChangeText={setFiber} keyboardType="numeric" style={styles.input} />
      <Button title="Add Meal" onPress={handleAddMeal} />
      <Button title="Go to Dashboard" onPress={() => router.push('/dashboard')} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
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





