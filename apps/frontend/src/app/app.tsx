import { Box, CssBaseline, ThemeProvider } from '@mui/material'
import { ToastContainer } from 'react-toastify'
import React, { memo } from 'react'
import AppRouter from '@/app/routes/router'
import useTheme from '@/app/themes/useTheme'

const App = () => {
  document.title = 'WeSki'
  const theme = useTheme()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box height="100vh" width="100vw" overflow="hidden">
        <AppRouter />
      </Box>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        draggable
        pauseOnHover
        theme="dark"
      />
    </ThemeProvider>
  )
}

export default memo(App)
