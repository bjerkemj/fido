import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dog } from '@/types/dog';

const LIKED_DOGS_KEY = 'likedDogs';
const DISLIKED_DOGS_KEY = 'dislikedDogs';

// --- HELPERS ---

export const getLikedDogs = async (): Promise<string[]> => {
  const data = await AsyncStorage.getItem(LIKED_DOGS_KEY);
  return data ? JSON.parse(data) : [];
}

export const getDislikedDogs = async (): Promise<string[]> => {
  const data = await AsyncStorage.getItem(DISLIKED_DOGS_KEY);
  return data ? JSON.parse(data) : [];
}

// Internal helper to remove a dog from a specific list
const removeDogFromList = async (dogId: string, key: string) => {
  const data = await AsyncStorage.getItem(key);
  if (!data) return;
  const list: string[] = JSON.parse(data);
  const updatedList = list.filter(name => name !== dogId);
  await AsyncStorage.setItem(key, JSON.stringify(updatedList));
};

// --- CORE FUNCTIONS ---

export const addLikedDog = async (dogId: string): Promise<void> => {
  // Always clean the opposite list first to prevent duplicates
  await removeDogFromList(dogId, DISLIKED_DOGS_KEY);
  
  const likedDogs = await getLikedDogs();
  if (!likedDogs.includes(dogId)) {
    likedDogs.push(dogId);
    await AsyncStorage.setItem(LIKED_DOGS_KEY, JSON.stringify(likedDogs));
  }
}

export const addDislikedDog = async (dogId: string): Promise<void> => {
  // Always clean the opposite list first
  await removeDogFromList(dogId, LIKED_DOGS_KEY);
  
  const dislikedDogs = await getDislikedDogs();
  if (!dislikedDogs.includes(dogId)) {
    dislikedDogs.push(dogId);
    await AsyncStorage.setItem(DISLIKED_DOGS_KEY, JSON.stringify(dislikedDogs));
  }
}

/**
 * THE MOVE FUNCTION
 * Handles moving a dog from one category to another
 */
export const moveDogToCategory = async (dogId: string, destination: 'liked' | 'disliked'): Promise<void> => {
  if (destination === 'liked') {
    await addLikedDog(dogId); // addLikedDog now handles removing from disliked automatically
  } else {
    await addDislikedDog(dogId); // addDislikedDog now handles removing from liked automatically
  }
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

export const clearAllPreferences = async (): Promise<void> => {
  await AsyncStorage.removeItem(LIKED_DOGS_KEY);
  await AsyncStorage.removeItem(DISLIKED_DOGS_KEY);
}