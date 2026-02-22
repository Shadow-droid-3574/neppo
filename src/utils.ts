
export const ADJECTIVES = [
  "Happy", "Swift", "Brave", "Calm", "Eager", "Fancy", "Gentle", "Jolly", "Kind", "Lively",
  "Merry", "Nice", "Proud", "Quiet", "Rapid", "Silly", "Tidy", "Witty", "Zesty", "Bright",
  "Clever", "Daring", "Epic", "Fair", "Grand", "Heroic", "Ideal", "Just", "Keen", "Lucky"
];

export const ANIMALS = [
  "Badger", "Bear", "Cat", "Dog", "Eagle", "Fox", "Goat", "Hawk", "Ibex", "Jay",
  "Koala", "Lion", "Mole", "Newt", "Owl", "Panda", "Quail", "Rat", "Seal", "Tiger",
  "Urchin", "Vole", "Wolf", "Yak", "Zebra", "Dolphin", "Falcon", "Gecko", "Heron", "Jaguar"
];

export function generateRandomName(): string {
  const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const animal = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
  return `${adj} ${animal}`;
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}
