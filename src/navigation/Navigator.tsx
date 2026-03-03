import React, {useState} from 'react';
import {View} from 'react-native';
import Profile from '../views/Profile';
import MyFiles from '../views/MyFiles';
import {UserProvider} from '../contexts/UserContext';

const Navigator = () => {
  const [route, setRoute] = useState<string>('Profile');

  const navigate = (r: string) => setRoute(r);

  return (
    <UserProvider>
      <View style={{flex: 1}}>
        {route === 'Profile' && <Profile navigate={navigate} />}
        {route === 'MyFiles' && <MyFiles goBack={() => navigate('Profile')} />}
      </View>
    </UserProvider>
  );
};

export default Navigator;
