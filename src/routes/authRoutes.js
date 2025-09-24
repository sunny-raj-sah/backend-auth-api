import { Router } from 'express';
import { register, login, me } from '../controllers/authController.js';
import { auth } from '../middleware/auth.js';
import { validate, schemas } from '../middleware/validate.js';


const router = Router();


router.post('/register', validate(schemas.register), register);
router.post('/login', validate(schemas.login), login);
router.get('/me', auth, me);


export default router;