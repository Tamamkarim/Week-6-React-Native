import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Card as RNECard, ListItem, Button, Text} from 'react-native-elements';
import {useUserContext} from '../contexts/UserContext';

const Card: any = (props: any) => <RNECard {...props} />;

const Profile = ({navigate}: {navigate: (route: string) => void}) => {
  const {user, handleLogout} = useUserContext();

  if (!user) {
    return (
      <View style={styles.center}>
        <Text>No user logged in</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Card>
        <Card.Title>{user.name ?? user.username}</Card.Title>
        <Card.Divider />
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>Username</ListItem.Title>
            <ListItem.Subtitle>{user.username}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>Email</ListItem.Title>
            <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
        <Button title="My Files" containerStyle={{marginTop: 10}} onPress={() => navigate('MyFiles')} />
        <Button title="Logout" type="outline" containerStyle={{marginTop: 10}} onPress={handleLogout} />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  center: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});

export default Profile;
