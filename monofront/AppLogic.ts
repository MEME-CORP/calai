export interface UserProfile {
    goal: 'weight_loss' | 'maintenance' | 'muscle_gain' | 'general_health';
    age: number;
    weight: number;
    height: number;
    gender: 'male' | 'female' | 'other';
    activityLevel: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active';
    dietaryPreferences: 'vegan' | 'vegetarian' | 'keto' | 'mediterranean' | 'custom';
    weightChangeGoal: 'mild' | 'moderate' | 'aggressive' | 'maintain';
  }
  
  export interface MealEntry {
    id: string;
    timestamp: number;
    description: string;
    calories: number;
    macros: {
      protein: number;
      carbs: number;
      fats: number;
      fiber: number;
    };
  }
  
  export interface AppState {
    userProfile?: UserProfile;
    meals: MealEntry[];
  }
  
  // Calculate total calories for the day
  export function calculateDailyIntake(meals: MealEntry[]): number {
    return meals.reduce((sum, meal) => sum + meal.calories, 0);
  }
  
  // Determine caloric target based on user goal
  export function getCaloricTarget(profile: UserProfile): number {
    switch (profile.goal) {
      case 'weight_loss':
        return 1500;
      case 'maintenance':
        return 2000;
      case 'muscle_gain':
        return 2500;
      case 'general_health':
        return 2000;
      default:
        return 2000;
    }
  }
  
  // Generate a reminder based on the current intake versus the target
  export function generateReminder(profile: UserProfile, meals: MealEntry[]): string {
    const totalCalories = calculateDailyIntake(meals);
    const target = getCaloricTarget(profile);
    if (totalCalories < target - 500) {
      return `You are ${target - totalCalories} kcal below your daily goal. Consider adding more nutrient-dense foods.`;
    } else if (totalCalories > target + 500) {
      return `You have exceeded your daily goal by ${totalCalories - target} kcal. Try to adjust your next meal.`;
    } else {
      return `You're on track! Keep up the balanced meals.`;
    }
  }
  
  // Provide meal recommendations based on dietary preferences
  export function getMealRecommendations(profile: UserProfile): string[] {
    switch (profile.dietaryPreferences) {
      case 'vegan':
        return ['Quinoa salad with chickpeas', 'Vegan lentil soup', 'Tofu stir-fry'];
      case 'vegetarian':
        return ['Vegetable pasta', 'Caprese salad', 'Veggie burger'];
      case 'keto':
        return ['Grilled salmon with avocado', 'Egg salad', 'Steak with leafy greens'];
      case 'mediterranean':
        return ['Greek salad', 'Hummus with pita', 'Grilled vegetable skewers'];
      case 'custom':
      default:
        return ['Chicken salad', 'Brown rice with veggies', 'Fruit smoothie'];
    }
  }
  
  