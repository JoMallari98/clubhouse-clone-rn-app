import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import { Provider, useSelector } from 'react-redux';
import { RootNavigator } from './src/navigation';
import { persistStore } from "redux-persist";
import { PersistGate } from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';
import store from './src/redux';

// const theme = {
//   ...DefaultTheme,
//   colors:{
//     ...DefaultTheme.colors,
//     border: "transparent",
//   }
// }
//let persistor = persistStore(store)
export default App = () => {
  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <Provider store={store}>
      {/*<PersistGate loading={null} persistor={persistor}>*/}
        <NavigationContainer>
          <RootNavigator />
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </NavigationContainer>
     {/* </PersistGate> */}
    </Provider>
  );
};
