import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Card as RNECard, ListItem, Button, Text} from 'react-native-elements';

const Card: any = (props: any) => <RNECard {...props} />;

const dummyFiles = [
  {id: '1', title: 'Vacation.jpg'},
  {id: '2', title: 'Document.pdf'},
  {id: '3', title: 'Presentation.pptx'},
];

const MyFiles = ({goBack}: {goBack: () => void}) => {
  return (
    <View style={styles.container}>
      <Card>
        <Card.Title>My Files</Card.Title>
        <Card.Divider />
        <FlatList
          data={dummyFiles}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <ListItem bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{item.title}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          )}
        />
        <Button title="Back" containerStyle={{marginTop: 10}} onPress={goBack} />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
});

export default MyFiles;
