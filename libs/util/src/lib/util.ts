import {v4 as uuidv4} from 'uuid'

export const joinUrl = (...parts: (string | number)[]) => {
  const joined = parts.join('/')

  // Replace any occurrence of multiple slashes (except after "http://" or "https://")
  return joined.replace(/([^:]\/)\/+/g, '$1')
}


export const generateId = () => uuidv4()
