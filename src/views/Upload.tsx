import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Card as RNECard, Button, Text} from 'react-native-elements';

const Card: any = (props: any) => <RNECard {...props} />;

const Upload = ({navigate}: {navigate: (route: string) => void}) => {
  return (
    <View style={styles.container}>
      <Card>
        <Card.Title>Upload</Card.Title>
        <Card.Divider />
        <Text>Upload screen placeholder</Text>
        <Button title="Done" containerStyle={{marginTop: 10}} onPress={() => navigate('Profile')} />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({container: {flex: 1, padding: 16}});

export default Upload;
