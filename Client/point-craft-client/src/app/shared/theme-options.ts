import { ThemeOption } from '../interfaces/theme';

// Add a palette here + its token overrides in `src/styles.css` ([data-theme='...'])
// to introduce a new theme — nothing else needs to change.
export const THEME_OPTIONS: ThemeOption[] = [
  { id: 'dark', label: 'Dark' },
  { id: 'light', label: 'Light' },
];
