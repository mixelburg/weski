import {Button, InputAdornment, LinearProgress, MenuItem, Paper, Stack, TextField, Typography} from '@mui/material';
import React, {memo, useEffect, useState} from 'react';
import {SkiHotel, skiSiteOptions} from "@weski/types";
import useMuiForm from "usemuiform";
import dayjs, {Dayjs} from 'dayjs'
import {DateRangePicker} from "@mui/x-date-pickers-pro";
import {SingleInputDateRangeField} from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import useAPI from "@/app/hooks/useApi";
import apiService from "@/app/services/api";
import HotelCard from "@/app/pages/HotelCard";
import LandscapeIcon from '@mui/icons-material/Landscape';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';

const skiSiteSelectOptions = skiSiteOptions.map(v => ({
  label: v.name,
  value: v.id
}))

type State = {
  site: string,
  groupSize: string,
  dateRange: [Dayjs, Dayjs],
}

const headerHeight = 90

const IndexPage = () => {
  const [queryHotels] = useAPI(apiService.queryHotels)
  const [getBatch] = useAPI(apiService.getBatch)
  const {state, register, forceValidate, clear} = useMuiForm<State>()
  const [currentQuery, setCurrentQuery] = useState<State | null>(null)
  const [reqeuestId, setRequestId] = useState<string>('')
  const [results, setResults] = useState<SkiHotel[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const rangeProps = register(
    'dateRange',
    [dayjs('2021-01-01'), dayjs('2024-01-08')],
    {
      validate: (value) => {
        if (value[0].isAfter(value[1])) {
          return 'Start date must be before end date'
        }
        // check if start date is after today
        // if (value[0].isBefore(dayjs())) {
        //   return 'Start date must be after today'
        // }
        return true
      }
    }
  )

  const onSearch = async () => {
    if (forceValidate()) {
      setRequestId('')
      setLoading(true)
      setResults([])
      try {
        const res = await queryHotels({
          site: parseInt(state.site),
          groupSize: parseInt(state.groupSize),
          fromDate: state.dateRange[0].toDate(),
          toDate: state.dateRange[1].toDate()
        })
        setRequestId(res.id)
        setCurrentQuery(state)
      } catch (e) {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    if (reqeuestId) {
      let sub = true
      const interval = setInterval(async () => {
        try {
          const res = await getBatch(reqeuestId)
          if (res.fulfilled) {
            setRequestId('')
            setLoading(false)
          }
          if (sub) setResults(ps => [...ps, ...res.results.filter(v => !ps.find(v2 => v2.code === v.code))])
        } catch (e) {
          console.error(e)
          setRequestId('')
          setLoading(false)
        }
      }, 1000)
      return () => {
        sub = false
        clearInterval(interval)
      }
    }
  }, [reqeuestId])


  return <>
    <Stack
      width='100vw'
      height='100vh'
      alignItems='center'
    >
      <Stack
        p={2}
        width='100vw'
        height='100vh'

        maxWidth={1000}
        spacing={2}
      >
        <Stack
          component={Paper}
          direction='row'
          alignItems='start'
          height={headerHeight}
          p={2}
          spacing={2}
          justifyContent='center'
        >
          <Typography variant='h4' overflow='hidden' whiteSpace='nowrap'>We ski</Typography>
          <TextField
            select
            sx={{
              minWidth: 200,
            }}
            size='small'
            placeholder='La Plagne'
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LandscapeIcon/>
                </InputAdornment>
              ),
            }}
            {...register('site', '1', {required: true})}
          >
            {skiSiteSelectOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            sx={{
              minWidth: 200,
            }}
            placeholder='4 people'
            size='small'
            type='number'
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PeopleAltOutlinedIcon/>
                </InputAdornment>
              ),
            }}
            {...register('groupSize', '', {required: true})}
          />

          <DateRangePicker
            value={rangeProps.value}
            onChange={rangeProps.onChange}
            slots={{field: SingleInputDateRangeField}}
            slotProps={{
              textField: {
                size: 'small',
                InputProps: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarTodayOutlinedIcon/>
                    </InputAdornment>
                  ),
                },
                helperText: rangeProps.helperText,
                error: rangeProps.error,
              }
            }}
          />
          <Button
            variant='outlined'
            sx={{height: 40}}
            onClick={onSearch}
          >
            Search
          </Button>
        </Stack>
        <Stack
          spacing={2}
          px={5}
        >
          {
            loading && <>
              <LinearProgress/>
            </>
          }

          {
            results.length ? <>
              <Stack >
                {
                  currentQuery && <>
                    <Stack>
                      <Typography variant='h5'>
                        Select your ski trip
                      </Typography>
                      <Typography variant='subtitle1'>
                        {results.length} ski options
                        • {skiSiteSelectOptions.find(v => v.value === parseInt(currentQuery.site))?.label} • {currentQuery.dateRange[0].format('MMM D')} - {currentQuery.dateRange[1].format('MMM D')} • {currentQuery.groupSize} people
                      </Typography>
                    </Stack>
                  </>
                }
              </Stack>
              <Stack
                height={`calc(100vh - 200px)`}
                overflow='auto'
                spacing={2}
              >
                {results.map((v, i) => <HotelCard key={i} data={v}/>)}
              </Stack>
            </> : <></>
          }
        </Stack>
      </Stack>
    </Stack>
  </>
}

export default memo(IndexPage)
