import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Profile from '../views/Profile';
import MyFiles from '../views/MyFiles';
import Upload from '../views/Upload';
import {UserProvider} from '../contexts/UserContext';
import {UpdateProvider} from '../contexts/UpdateContext';

const Navigator = () => {
  const [route, setRoute] = useState<string>('Profile');

  const navigate = (r: string) => setRoute(r);

  return (
    <UserProvider>
      <UpdateProvider>
        <View style={{flex: 1}}>
          {route === 'Profile' && <Profile navigate={navigate} />}
          {route === 'MyFiles' && <MyFiles goBack={() => navigate('Profile')} />}
          {route === 'Upload' && <Upload navigate={navigate} />}
        </View>
        <View style={styles.tabBar}>
          <TouchableOpacity style={styles.tab} onPress={() => navigate('Profile')}>
            <Text style={styles.tabText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab} onPress={() => navigate('MyFiles')}>
            <Text style={styles.tabText}>My Files</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab} onPress={() => navigate('Upload')}>
            <Text style={styles.tabText}>Upload</Text>
          </TouchableOpacity>
        </View>
      </UpdateProvider>
    </UserProvider>
  );
};

const styles = StyleSheet.create({
  tabBar: {flexDirection: 'row', height: 56, borderTopWidth: 1, borderColor: '#eee'},
  tab: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  tabText: {fontSize: 14},
});

export default Navigator;
