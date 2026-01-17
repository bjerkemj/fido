export interface DogImage {
  url: string;
  author: string;
}

export interface Dog {
  name: string;
  description: string;
  temperament: string;
  popularity: number | null;
  min_height: number;
  max_height: number;
  min_weight: number;
  max_weight: number;
  min_expectancy: number;
  max_expectancy: number;
  group: string;
  grooming_frequency_value: string;
  grooming_frequency_category: string;
  shedding_value: string;
  shedding_category: string;
  energy_level_value: string;
  energy_level_category: string;
  trainability_value: string;
  trainability_category: string;
  demeanor_value: string;
  demeanor_category: string;
  images: DogImage[];
  images_puppy: DogImage[];
}