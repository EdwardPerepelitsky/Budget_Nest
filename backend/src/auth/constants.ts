import {randomBytes} from 'crypto'

export const jwtConstants = {
    secret: randomBytes(128).toString('hex')
  };