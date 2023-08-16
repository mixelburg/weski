import { FC, PropsWithChildren } from 'react'
import { Stack } from '@mui/material'
import CenterBarLoader from '@/app/utils/loaders/CenterBarLoader';

interface IProps {
  loading: boolean
}

const FullscreenLoader: FC<PropsWithChildren<IProps>> = ({ loading, children }) => {
  return <>
    {
      loading
        ? <Stack width='100vw' height='100vh' alignItems='center' justifyContent='center'>
          <CenterBarLoader />
        </Stack>
        : children
    }
  </>
}

export default FullscreenLoader
