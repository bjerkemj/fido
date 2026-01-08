// Temperament Color Map
const TEMPERAMENT_COLORS: Record<string, string> = {
  // Intelligence
  Intelligent: '#3B82F6', Smart: '#3B82F6', Bright: '#3B82F6', Clever: '#3B82F6',
  // Friendliness
  Friendly: '#10B981', Sociable: '#10B981', Outgoing: '#10B981', Amiable: '#10B981',
  // Loyalty
  Loyal: '#6366F1', Devoted: '#6366F1', Faithful: '#6366F1',
  // Energy
  Energetic: '#F59E0B', Playful: '#F59E0B', Active: '#F59E0B', Spirited: '#F59E0B',
  // Bravery
  Courageous: '#EF4444', Brave: '#EF4444', Fearless: '#EF4444', Bold: '#EF4444', Confident: '#EF4444',
  // Gentleness
  Gentle: '#EC4899', Affectionate: '#EC4899', Sweet: '#EC4899', Loving: '#EC4899',
  // Alertness
  Alert: '#8B5CF6', Watchful: '#8B5CF6', Vigilant: '#8B5CF6',
  // Calmness
  Calm: '#14B8A6', Patient: '#14B8A6', Mellow: '#14B8A6',
  // Dignity
  Dignified: '#6B7280', Noble: '#6B7280', Regal: '#6B7280',
  // Humor
  Funny: '#F97316', Comical: '#F97316', Amusing: '#F97316',
};

export const getTemperamentColor = (trait: string): string => {
    return TEMPERAMENT_COLORS[trait] || '#9CA3AF'; // Default Gray
};