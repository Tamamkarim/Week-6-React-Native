import * as FileSystem from 'expo-file-system';

type UploadResponse = any;

export const postExpoFile = async (imageUri: string, token: string): Promise<UploadResponse> => {
  const uploadUrl = (process.env.EXPO_PUBLIC_UPLOAD_API || '') + '/upload';
  const fileResult = await FileSystem.uploadAsync(uploadUrl, imageUri, {
    httpMethod: 'POST',
    uploadType: FileSystem.FileSystemUploadType.MULTIPART,
    fieldName: 'file',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
  return fileResult.body ? JSON.parse(fileResult.body) : null;
};

export default {};
