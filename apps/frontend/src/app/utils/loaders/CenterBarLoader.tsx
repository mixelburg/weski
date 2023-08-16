import { FC } from 'react'
import { Box, LinearProgress } from '@mui/material'
import CenterStack from '@/app/components/containers/CenterStack'

interface IProps {
  progress?: number
}

const CenterBarLoader: FC<IProps> = ({ progress }) => {

  return <CenterStack>
    <Box width={200}>
      {
        progress ?
          <LinearProgress
            variant='determinate'
            value={progress}
          /> :
          <LinearProgress />
      }
    </Box>
  </CenterStack>
}

export default CenterBarLoader

