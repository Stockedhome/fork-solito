import { usePathname as usePathnameExpo } from 'expo-router';

export function usePathname() {
  return usePathnameExpo()
}
