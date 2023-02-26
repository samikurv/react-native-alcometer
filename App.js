import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, Switch } from 'react-native';
import NumericInput from 'react-native-numeric-input';
import RadioGroup from 'react-native-radio-buttons-group';
import Styles from './Styles';

export default function Alcometer() {

  const [bloodAlcohol, setBloodAlcohol] = useState('');
  const [weight, setWeight] = useState(0);
  const [bottles, setBottles] = useState(0);
  const [hours, setHours] = useState(0);
  const [gender, setGender] = useState('male');
  const [radioButtons, setRadioButtons] = useState([
    {
        id: 'male1',
        label: 'Male',
        value: 'male'
    },
    {
        id: 'female2',
        label: 'Female',
        value: 'female'
    }
  ]);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  }

  function Calculation() {
    let bloodAlcoholPercentage = 0
    let litres = bottles * 0.33
    let grams = litres * 8 * 4.5
    let burning = weight / 10
    let left = grams - (burning * hours)

    if (gender == 'male') {
      bloodAlcoholPercentage = left / (weight * 0.7)
    }
    if (gender == 'female') {
      bloodAlcoholPercentage = left / (weight * 0.6)
    }
    if (bloodAlcoholPercentage <= 0) {
      bloodAlcoholPercentage = 0
    }
    setBloodAlcohol(bloodAlcoholPercentage.toFixed(2))
  }

  function onPressRadioButton(radioButtonsArray) {
    setRadioButtons(radioButtonsArray);
  } 

  return (
    <ScrollView style={[Styles.container, isEnabled ? {backgroundColor : '#444444' } : {backgroundColor: '#ffffff'}]}>
      <View style={Styles.view}>
        <Text style={Styles.header}>Alcometer</Text>
        <TextInput style={Styles.label}
        placeholder='Enter your weight.'
        value={weight}
        maxLength={3}
        onChangeText={setWeight}
        keyboardType='numeric'></TextInput>
        <Text style={Styles.label}>Bottles</Text>
        <NumericInput style={Styles.NumericInput} value={bottles}
        onChange={b => setBottles(b)}
        minValue={0}></NumericInput>
        <Text style={Styles.label}>Hours</Text>
        <NumericInput style={Styles.NumericInput} value={hours} onChange={h => setHours(h)} minValue={0}></NumericInput>
        <RadioGroup style={Styles.label} radioButtons={radioButtons} onPress={onPressRadioButton} 
        onValueChange={newValue => setGender(newValue)} value={gender}/>
        <Text style={Styles.calculate}>{bloodAlcohol}</Text>
        <Button color="orange" onPress={Calculation} title="Calculate"></Button>
        <Switch style={Styles.theme}
        trackColor={{false: '#444444', true: '#ffffff'}}
        thumbColor={isEnabled ? 'orange' : 'orange'}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      </View>
    </ScrollView>
  );
};
