import authMiddleware from '@src/middleware/auth';
import validate from '@src/middleware/validate';
import Association from '@src/model/associations.model';
import { createAssociationSchema, updateAssociationSchema } from '@src/validation/association.validation';
import express, { Request, Response, NextFunction } from 'express';
const associationRouter = express.Router();

// POST /associations
associationRouter.post('/associations', authMiddleware, validate({ body: createAssociationSchema }), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user, tenant, approval } = req.body;
    const association = await Association.create({ user, tenant, approval });
    res.status(201).json({ association });
  } catch (error) {
    next(error);
  }
});

// GET /associations/:id
associationRouter.get('/associations/:id', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const association = await Association.findById(req.params.id);
    if (!association) {
      return res.status(404).send();
    }
    res.json({ association });
  } catch (error) {
    next(error);
  }
});

// PATCH /associations/:id
associationRouter.patch('/associations/:id', authMiddleware, validate({ body: updateAssociationSchema }), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const association = await Association.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!association) {
      return res.status(404).send();
    }
    res.json({ association });
  } catch (error) {
    next(error);
  }
});

// DELETE /associations/:id
associationRouter.delete('/associations/:id', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const association = await Association.findByIdAndDelete(req.params.id);
    if (!association) {
      return res.status(404).send();
    }
    res.json({ association });
  } catch (error) {
    next(error);
  }
});

export { associationRouter };
