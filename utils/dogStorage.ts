import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dog } from '@/types/dog';

const LIKED_DOGS_KEY = 'likedDogs';
const DISLIKED_DOGS_KEY = 'dislikedDogs';

// Get liked dogs from device storage
export const getLikedDogs = async (): Promise<string[]> => {
  const data = await AsyncStorage.getItem(LIKED_DOGS_KEY);
  return data ? JSON.parse(data) : []; // Return empty array if nothing stored
}

// Get disliked dogs from device storage
export const getDislikedDogs = async (): Promise<string[]> => {
  const data = await AsyncStorage.getItem(DISLIKED_DOGS_KEY);
  return data ? JSON.parse(data) : [];
}

// Add a dog to liked list
export const addLikedDog = async (dogId: string): Promise<void> => {
  const likedDogs = await getLikedDogs();
  likedDogs.push(dogId);
  await AsyncStorage.setItem(LIKED_DOGS_KEY, JSON.stringify(likedDogs));
}

// Add a dog to disliked list
export const addDislikedDog = async (dogId: string): Promise<void> => {
  const dislikedDogs = await getDislikedDogs();
  dislikedDogs.push(dogId);
  await AsyncStorage.setItem(DISLIKED_DOGS_KEY, JSON.stringify(dislikedDogs));
}

// Calculate which dogs haven't been seen
export const getUnseenDogs = async (allDogs: Dog[]): Promise<Dog[]> => {
  const likedDogs = await getLikedDogs();
  const dislikedDogs = await getDislikedDogs();
  
  return allDogs.filter(dog => 
    !likedDogs.includes(dog.name) && 
    !dislikedDogs.includes(dog.name)
  );
}

// Clear everything (for reset feature)
export const clearAllPreferences = async (): Promise<void> => {
  await AsyncStorage.removeItem(LIKED_DOGS_KEY);
  await AsyncStorage.removeItem(DISLIKED_DOGS_KEY);
}