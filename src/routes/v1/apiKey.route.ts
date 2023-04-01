import validate from '@src/middleware/validate';
import ApiKey from '@src/model/apiKey.model';
import { createApiKeySchema, updateApiKeySchema } from '@src/validation/apiKey.validation';
import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();

// POST /apiKeys
router.post('/apiKeys', validate({ body: createApiKeySchema }), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { tenant, APIKey, status, validTill } = req.body;

    const apiKey = await ApiKey.create({ tenant, APIKey, status, validTill });

    res.status(201).json(apiKey);
  } catch (error) {
    next(error);
  }
});

// GET /apiKeys
router.get('/apiKeys', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const apiKeys = await ApiKey.find();

    res.json(apiKeys);
  } catch (error) {
    next(error);
  }
});

// GET /apiKeys/:id
router.get('/apiKeys/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const apiKey = await ApiKey.findById(req.params.id);

    if (!apiKey) {
      return res.status(404).json({ message: 'ApiKey not found' });
    }

    res.json(apiKey);
  } catch (error) {
    next(error);
  }
});

// PUT /apiKeys/:id
router.put('/apiKeys/:id', validate({ body: updateApiKeySchema }), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const apiKey = await ApiKey.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!apiKey) {
      return res.status(404).json({ message: 'ApiKey not found' });
    }

    res.json(apiKey);
  } catch (error) {
    next(error);
  }
});

// DELETE /apiKeys/:id
router.delete('/apiKeys/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const apiKey = await ApiKey.findByIdAndDelete(req.params.id);

    if (!apiKey) {
      return res.status(404).json({ message: 'ApiKey not found' });
    }

    res.json({ message: 'ApiKey deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export { router };
