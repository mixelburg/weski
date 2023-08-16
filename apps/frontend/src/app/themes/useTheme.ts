import { deepmerge } from '@mui/utils'
import { createTheme } from '@mui/material/styles'
import { useAtomValue } from 'jotai'
import darkTheme from '@/app/themes/dark'
import lightTheme from '@/app/themes/light'
import baseTheme from '@/app/themes/base'
import { themeAtom } from '@/app/atoms';

// A custom useTheme for this app
const useTheme = () => {
  const themeType = useAtomValue(themeAtom)
  switch (themeType) {
    case 'dark':
      return createTheme(deepmerge(darkTheme, baseTheme))
    case 'light':
      return createTheme(deepmerge(lightTheme, baseTheme))
    default:
      return createTheme(deepmerge(darkTheme, baseTheme))
  }
}

export default useTheme
