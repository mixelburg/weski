import {SkiHotel} from "@weski/types";
import React, {FC, memo} from "react";
import {Divider, Paper, Stack, Typography} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';

interface IProps {
  data: SkiHotel
}
const hotelCard: FC<IProps> = ({data}) => {
  return <>
    <Stack component={Paper} width={700} height={180} direction='row'>
      <img
        src={'https://www.oxfordski.com/media/60688/luxury-ski-hotel-cervinia-hotel-hermitage-oxford-ski-exterior.jpg?width=1500&height=&mode=none&scale=downscaleonly&bgcolor=&quality=80'}
        alt={data.name}
        width={300}
        height={180}
      />

      <Stack direction='column' height='100%' width='100%' p={1.5} justifyContent='space-between'>
        <Stack>
          <Typography >{data.name}</Typography>
          <Stack direction='row' alignItems='center'>
            {Array.from({length: 5}).map((_, i) => <StarIcon key={i} sx={{color: '#ffc043', fontSize: 12}}/>)}
          </Stack>
        </Stack>
        <Stack spacing={1}>
          <Divider/>
          <Stack direction='row' justifyContent='end' spacing={0.3} alignItems='center'>
            <Typography fontWeight='bold'>£{data.price.afterTax}</Typography>
            <Typography sx={{pt: 1}} variant='subtitle2'>/per person</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  </>
}

export default memo(hotelCard)
