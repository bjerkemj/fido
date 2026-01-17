import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dog } from '@/types/dog';

// --- STORAGE KEYS ---
const LIKED_DOGS_KEY = 'likedDogs';
const DISLIKED_DOGS_KEY = 'dislikedDogs';

// --- STORAGE HELPERS ---

export const getLikedDogs = async (): Promise<string[]> => {
  const data = await AsyncStorage.getItem(LIKED_DOGS_KEY);
  return data ? JSON.parse(data) : [];
};

export const getDislikedDogs = async (): Promise<string[]> => {
  const data = await AsyncStorage.getItem(DISLIKED_DOGS_KEY);
  return data ? JSON.parse(data) : [];
};

// Internal helper to remove a dog from a specific list
const removeDogFromList = async (dogId: string, key: string): Promise<void> => {
  const data = await AsyncStorage.getItem(key);
  if (!data) return;

  const list: string[] = JSON.parse(data);
  const updatedList = list.filter(id => id !== dogId);
  await AsyncStorage.setItem(key, JSON.stringify(updatedList));
};

// --- CORE ACTIONS ---

export const addLikedDog = async (dogId: string): Promise<void> => {
  // Ensure dog is not in the opposite list
  await removeDogFromList(dogId, DISLIKED_DOGS_KEY);

  const likedDogs = await getLikedDogs();
  if (!likedDogs.includes(dogId)) {
    likedDogs.push(dogId);
    await AsyncStorage.setItem(LIKED_DOGS_KEY, JSON.stringify(likedDogs));
  }
};

export const addDislikedDog = async (dogId: string): Promise<void> => {
  // Ensure dog is not in the opposite list
  await removeDogFromList(dogId, LIKED_DOGS_KEY);

  const dislikedDogs = await getDislikedDogs();
  if (!dislikedDogs.includes(dogId)) {
    dislikedDogs.push(dogId);
    await AsyncStorage.setItem(DISLIKED_DOGS_KEY, JSON.stringify(dislikedDogs));
  }
};

/**
 * Moves a dog explicitly to a category
 */
export const moveDogToCategory = async (
    dogId: string,
    destination: 'liked' | 'disliked'
): Promise<void> => {
  if (destination === 'liked') {
    await addLikedDog(dogId);
  } else {
    await addDislikedDog(dogId);
  }
};

export const clearAllPreferences = async (): Promise<void> => {
  await AsyncStorage.removeItem(LIKED_DOGS_KEY);
  await AsyncStorage.removeItem(DISLIKED_DOGS_KEY);
};

// --- DOMAIN LOGIC ---

// Returns dogs that have not been liked or disliked
export const getUnseenDogs = async (allDogs: Dog[]): Promise<Dog[]> => {
  const likedDogs = await getLikedDogs();
  const dislikedDogs = await getDislikedDogs();

  return allDogs.filter(
      dog =>
          !likedDogs.includes(dog.name) &&
          !dislikedDogs.includes(dog.name)
  );
};

// --- PRESENTATION HELPERS ---

const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Returns unseen dogs in random order with weighted distribution
export const getUnseenDogsRandomized = async (
    allDogs: Dog[]
): Promise<Dog[]> => {
  const unseenDogs = await getUnseenDogs(allDogs);

  // Separate dogs with and without popularity
  const dogsWithPopularity: Dog[] = [];
  const dogsWithoutPopularity: Dog[] = [];

  unseenDogs.forEach(dog => {
    if (dog.popularity !== null) {
      dogsWithPopularity.push(dog);
    } else {
      dogsWithoutPopularity.push(dog);
    }
  });

  // Sort dogs with popularity in ascending order (most popular = lower number)
  dogsWithPopularity.sort((a, b) => a.popularity! - b.popularity!);

  // Shuffle dogs without popularity
  const shuffledWithoutPopularity = shuffleArray(dogsWithoutPopularity);

  // Split popularity dogs into thirds
  const totalPopDogs = dogsWithPopularity.length;
  const thirdSize = Math.ceil(totalPopDogs / 3);

  const mostPopular = dogsWithPopularity.slice(0, thirdSize);
  const middlePopular = dogsWithPopularity.slice(thirdSize, thirdSize * 2);
  const leastPopular = dogsWithPopularity.slice(thirdSize * 2);

  // Sizes
  const totalDogs = unseenDogs.length;
  const firstHalfSize = Math.floor(totalDogs / 2);

  // First half should contain ~50% popularity dogs
  const firstHalfPopNeeded = Math.floor(firstHalfSize * 0.5);

  // Requested counts per tier
  const requestedMost = Math.floor(firstHalfPopNeeded * 0.6);
  const requestedMiddle = Math.floor(firstHalfPopNeeded * 0.25);
  const requestedLeast =
      firstHalfPopNeeded - requestedMost - requestedMiddle;

  // Clamp to available dogs in each tier
  const mostPopInFirst = Math.min(requestedMost, mostPopular.length);
  const middlePopInFirst = Math.min(requestedMiddle, middlePopular.length);
  const leastPopInFirst = Math.min(requestedLeast, leastPopular.length);

  // Shuffle each tier
  const shuffledMostPop = shuffleArray(mostPopular);
  const shuffledMiddlePop = shuffleArray(middlePopular);
  const shuffledLeastPop = shuffleArray(leastPopular);

  // Allocate popularity dogs
  const firstHalfPool = [
    ...shuffledMostPop.slice(0, mostPopInFirst),
    ...shuffledMiddlePop.slice(0, middlePopInFirst),
    ...shuffledLeastPop.slice(0, leastPopInFirst),
  ];

  const secondHalfPool = [
    ...shuffledMostPop.slice(mostPopInFirst),
    ...shuffledMiddlePop.slice(middlePopInFirst),
    ...shuffledLeastPop.slice(leastPopInFirst),
  ];

  // Shuffle pools
  const shuffledFirstHalfPool = shuffleArray(firstHalfPool);
  const shuffledSecondHalfPool = shuffleArray(secondHalfPool);

  // ✅ Even split of no-pop dogs
  const noPopHalfSize = Math.floor(shuffledWithoutPopularity.length / 2);
  const noPopFirstHalf = shuffledWithoutPopularity.slice(0, noPopHalfSize);
  const noPopSecondHalf = shuffledWithoutPopularity.slice(noPopHalfSize);

  // Merge first half
  const mergedFirstHalf: Dog[] = [];
  let popIdx = 0;
  let noPopIdx = 0;

  while (
      popIdx < shuffledFirstHalfPool.length ||
      noPopIdx < noPopFirstHalf.length
      ) {
    const addPop = Math.random() > 0.5;

    if (addPop && popIdx < shuffledFirstHalfPool.length) {
      mergedFirstHalf.push(shuffledFirstHalfPool[popIdx++]);
    } else if (noPopIdx < noPopFirstHalf.length) {
      mergedFirstHalf.push(noPopFirstHalf[noPopIdx++]);
    } else if (popIdx < shuffledFirstHalfPool.length) {
      mergedFirstHalf.push(shuffledFirstHalfPool[popIdx++]);
    }
  }

  // Merge second half
  const mergedSecondHalf: Dog[] = [];
  popIdx = 0;
  noPopIdx = 0;

  while (
      popIdx < shuffledSecondHalfPool.length ||
      noPopIdx < noPopSecondHalf.length
      ) {
    const addPop = Math.random() > 0.5;

    if (addPop && popIdx < shuffledSecondHalfPool.length) {
      mergedSecondHalf.push(shuffledSecondHalfPool[popIdx++]);
    } else if (noPopIdx < noPopSecondHalf.length) {
      mergedSecondHalf.push(noPopSecondHalf[noPopIdx++]);
    } else if (popIdx < shuffledSecondHalfPool.length) {
      mergedSecondHalf.push(shuffledSecondHalfPool[popIdx++]);
    }
  }

  return [...mergedFirstHalf, ...mergedSecondHalf];
};
