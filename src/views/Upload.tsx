import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Image, Alert, ActivityIndicator, TouchableOpacity, TextInput} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {useForm, Controller} from 'react-hook-form';
import {postExpoFile} from '../hooks/apiHooks';
import {useUpdateContext} from '../hooks/Contexthooks';
import {useUserContext} from '../contexts/UserContext';

type Props = {
  navigate: (route: string) => void;
};

const Upload = ({navigate}: Props) => {
  const [image, setImage] = useState<ImagePicker.ImagePickerResult | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const {control, handleSubmit, reset, watch, formState} = useForm({
    defaultValues: {title: '', description: ''},
  });
  const {errors} = formState;
  const {update, setUpdate, triggerUpdate} = useUpdateContext();
  const {user} = useUserContext();

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 0.6,
      });
      console.log(result);
      if (!result.canceled) {
        setImage(result);
      }
    } catch (e) {
      console.warn('Image pick error', e);
    }
  };

  const resetForm = () => {
    reset({title: '', description: ''});
    setImage(null);
  };

  useEffect(() => {
    return () => {
      resetForm();
    };
  }, []);

  const doUpload = async (inputs: {title: string; description: string}) => {
    if (!image || image.canceled) {
      Alert.alert('No image', 'Please select an image before uploading.');
      return;
    }

    if (!user) {
      Alert.alert('Not authenticated', 'You must be logged in to upload.');
      return;
    }

    const uri = image.assets && image.assets[0] ? image.assets[0].uri : null;
    if (!uri) {
      Alert.alert('Invalid image', 'Selected image is invalid.');
      return;
    }

    try {
      setUploading(true);
      const token = ''; // TODO: read real token
      const uploadResp = await postExpoFile(uri, token);
      console.log('uploadResp', uploadResp);
      // TODO: call postMedia() with response data if needed
      // trigger list update
      setUpdate((prev) => !prev);
      Alert.alert('Upload complete', 'Your file was uploaded successfully.');
      resetForm();
      navigate('Profile');
    } catch (e) {
      console.warn(e);
      Alert.alert('Upload failed', 'An error occurred while uploading.');
    } finally {
      setUploading(false);
    }
  };

  const title = watch('title');
  const description = watch('description');
  const isFormValid = title && title.length >= 3 && description && description.length >= 5 && image && !image.canceled;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Upload Media</Text>

      <TouchableOpacity style={styles.preview} onPress={pickImage}>
        {image && image.assets && image.assets[0] ? (
          <Image source={{uri: image.assets[0].uri}} style={styles.image} />
        ) : (
          <Image source={{uri: 'https://via.placeholder.com/300'}} style={styles.image} />
        )}
      </TouchableOpacity>

      <Controller
        control={control}
        name="title"
        rules={{required: true, minLength: 3}}
        render={({field: {onChange, value}}) => (
          <TextInput placeholder="Title" value={value} onChangeText={onChange} style={styles.input} />
        )}
      />
      {errors.title && <Text style={styles.err}>Title is required (min 3 chars)</Text>}

      <Controller
        control={control}
        name="description"
        rules={{minLength: 5}}
        render={({field: {onChange, value}}) => (
          <TextInput
            placeholder="Description"
            value={value}
            onChangeText={onChange}
            style={[styles.input, {height: 100}]}
            multiline
          />
        )}
      />
      {errors.description && <Text style={styles.err}>Description min length is 5</Text>}

      {uploading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View style={styles.buttons}>
          <TouchableOpacity style={[styles.btn, !isFormValid && styles.btnDisabled]} onPress={handleSubmit(doUpload)} disabled={!isFormValid}>
            <Text style={styles.btnText}>Upload</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={resetForm}>
            <Text style={styles.btnText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={pickImage}>
            <Text style={styles.btnText}>Select Image</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  heading: {fontSize: 20, fontWeight: '600', marginBottom: 12},
  preview: {alignItems: 'center', marginBottom: 12},
  image: {width: 300, height: 200, backgroundColor: '#eee'},
  input: {borderWidth: 1, borderColor: '#ddd', padding: 8, marginBottom: 8, borderRadius: 6},
  err: {color: 'red', marginBottom: 8},
  buttons: {flexDirection: 'row', justifyContent: 'space-between'},
  btn: {backgroundColor: '#2089dc', padding: 10, borderRadius: 6, marginTop: 8, flex: 1, marginHorizontal: 4, alignItems: 'center'},
  btnDisabled: {backgroundColor: '#aaa'},
  btnText: {color: '#fff'},
});

export default Upload;
