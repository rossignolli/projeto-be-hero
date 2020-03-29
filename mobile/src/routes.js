import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack'
const AppStack = createStackNavigator();

import Incidents from './Pages/Incidents'
import Detail from './Pages/Detail';

export default function Routes (){
      return (
            <NavigationContainer>
                  <AppStack.Navigator screenOptions={{headerShown: false}}>
                        <AppStack.Screen name = "Incidents"component = {Incidents}/>
                        <AppStack.Screen name = "Detail"component = {Detail}/>

                  </AppStack.Navigator>

            </NavigationContainer>

      );
}