import express, { Router } from 'express'

import { register } from '../controllers/authController'

export default ( router: Router) => {
    router.post('/auth/register', register)
}