import { firebaseStorage } from '@/app/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import uniqid from 'uniqid';

export async function POST(req) {
  const data = await req.formData();
  if (data.get('file')) {
    const file = data.get('file');
    const ext = file.name.split('.').slice(-1)[0];

    //   file type => file.type

    const newFileName = uniqid() + '.' + ext;
    const path = 'avatars/' + newFileName;

    const fileRef = ref(firebaseStorage, path);
    const uploadTaskSnapshot = await uploadBytes(fileRef, file);
    const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);
    // imageURL = downloadURL;
    return Response.json(downloadURL);
  } else {
    throw new Error('No file provided');
  }
}
