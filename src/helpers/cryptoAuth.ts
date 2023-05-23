import {randomBytes, createHmac} from 'node:crypto'

export const random = () => {
    return randomBytes(128).toString('base64')
}
export const authentication = ( salt: string, password: string ) => {
    return createHmac('sha256', [salt, password].join('/'))
    .update('SECRETVALUE')
    .digest('hex')
}