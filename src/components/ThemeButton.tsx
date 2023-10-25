import { useCallback, useEffect, useState } from 'react';
import { PhMoonStars } from './icon/PhMoonStars';
import { PhSun } from './icon/PhSun';

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
    <button
      className="w-10 h-10 min-h-0 p-0 btn transition rounded-full"
      aria-label="テーマを切り替える"
      onClick={toggleTheme}
    >
      <PhMoonStars
        width={iconSize}
        height={iconSize}
        className="hidden dark:block"
      />
      <PhSun width={iconSize} height={iconSize} className="block dark:hidden" />
    </button>
  );
}
