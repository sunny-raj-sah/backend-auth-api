import { Router } from 'express';
import { auth, authorize } from '../middleware/auth.js';
import { listUsers, getUser, updateUser, deleteUser } from '../controllers/userController.js';
import { validate, schemas } from '../middleware/validate.js';


const router = Router();


router.use(auth, authorize('admin'));


router.get('/', listUsers);
router.get('/:id', getUser);
router.patch('/:id', validate(schemas.updateUser), updateUser);
router.delete('/:id', deleteUser);


export default router;