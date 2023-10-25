import { useCallback, useEffect, useState } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

const iconSize = 24;

export default function ThemeButton() {
  const [theme, setTheme] = useState<'dracula' | 'cupcake' | undefined>(
    undefined,
  );

  useEffect(() => {
    if (theme === undefined) {
      const localTheme = localStorage.getItem('theme') as
        | 'dracula'
        | 'cupcake'
        | null;

      if (localTheme === null) {
        const prefersDark = window.matchMedia(
          '(prefers-color-scheme: dark)',
        ).matches;

        if (prefersDark) {
          setTheme('dracula');
        } else {
          setTheme('cupcake');
        }
      } else {
        setTheme(localTheme);
      }
    } else if (theme === 'cupcake') {
      document.documentElement.setAttribute('data-theme', 'cupcake');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'cupcake');
    } else {
      document.documentElement.setAttribute('data-theme', 'dracula');
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dracula');
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    if (theme === 'cupcake') {
      setTheme('dracula');
    } else {
      setTheme('cupcake');
    }
  }, [theme]);

  return (
    <DarkModeSwitch
      aria-label="テーマを切り替える"
      onChange={toggleTheme}
      checked={theme === 'dracula' ? true : false}
      size={iconSize}
    />
  );
}
