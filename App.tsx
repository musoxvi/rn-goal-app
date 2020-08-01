import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';

// Components
import GoalItem from './components/Goalitem';
import GoalInput from './components/GoalInput';

export interface Goal {
  id: string;
  value: string;
}

export default function App() {
  const [courseGoals, setCourseGoals] = useState<[] | Goal[]>([]);
  const [isAddMode, setIsAddMode] = useState<boolean>(false);

  const addGoalHandler = (goalTitle: string) => {
    if (goalTitle.length === 0) {
      return;
    }
    // setCourseGoals([...courseGoals, enteredGoal]);
    setCourseGoals((currentGoals) => [
      ...currentGoals,
      { id: Math.random().toString(), value: goalTitle },
    ]);
    setIsAddMode(false);
  };

  const removeGoalHandler = (goalId: string) => {
    setCourseGoals((currentGoals) => {
      return currentGoals.filter((goal) => goal.id !== goalId);
    });
  };

  const cancelGoalAdditionHandler = () => {
    setIsAddMode(false);
  };

  return (
    <View style={styles.screen}>
      <Button title="Add New Goal" onPress={() => setIsAddMode(true)} />
      <GoalInput
        onAddGoal={addGoalHandler}
        visible={isAddMode}
        onCancel={cancelGoalAdditionHandler}
      />
      <FlatList
        keyExtractor={(item) => item.id}
        data={courseGoals}
        renderItem={(itemData) => (
          <GoalItem
            goalId={itemData.item.id}
            onDelete={removeGoalHandler}
            title={itemData.item.value}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
});
