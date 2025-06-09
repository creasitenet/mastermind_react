// Game configuration
export const CODE_LENGTH = 4;
export const MAX_ATTEMPTS = 10;

// Define the array of available colors with tailwind CSS class strings (single source of truth)
export const COLORS = ['bg-red-500', 'bg-yellow-400', 'bg-green-500', 'bg-blue-600', 'bg-orange-500', 'bg-purple-600', 'bg-cyan-400', 'bg-pink-500'];

// Color type from the COLORS array
export type Color = typeof COLORS[number];

// Define constants for result indicator tailwind CSS classes
export const GOOD_POSITION = 'bg-gray-800';
export const BAD_POSITION = 'bg-gray-500';

// Availables type of a result indicator
export type Result = typeof GOOD_POSITION | typeof BAD_POSITION;

// Type for the code part of a guess
export type GuessCode = Array<Color | null>;

// Type for the result indicators of a guess
export type GuessResults = Array<Result | null>;

// Type for a full guess attempt
export interface Guess {
  playedCode: GuessCode;
  results: GuessResults;
}