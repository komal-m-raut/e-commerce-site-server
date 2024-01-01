import { Request, Response, NextFunction } from 'express';
import { HomePageModel } from '@src/model/homePage.model';
import catchAsync from '@src/utils/catchAsync';
import { InternalError, NotFoundError } from '@src/utils/apiError';
import { SuccessResponse } from '@src/utils/apiResponse';

export const createHomePage = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { decoded } = req.body;
    const tenantId = decoded.id;

    const newHomePage = await HomePageModel.create({ ...req.body, tenantId });

    if (!newHomePage) {
      throw next(new InternalError('Failed to create HomePage'));
    }

    return new SuccessResponse('HomePage created', newHomePage).send(res);
  },
);

export const getHomePageById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { tenantId } = req.params;

    const homePage = await HomePageModel.findOne({ tenantId }).lean().exec();

    if (!homePage) {
      throw next(
        new NotFoundError(`HomePage with tenantId ${tenantId} not found`),
      );
    }

    return new SuccessResponse('success', homePage).send(res);
  },
);

export const updateHomePage = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { decoded } = req.body;
    const tenantId = decoded.id;

    const updatedHomePage = await HomePageModel.findOneAndUpdate(
      { tenantId },
      req.body,
      { new: true },
    );

    if (!updatedHomePage) {
      throw next(
        new NotFoundError(`HomePage with tenantId ${tenantId} not found`),
      );
    }

    return new SuccessResponse('HomePage updated', updatedHomePage).send(res);
  },
);

export const deleteHomePageById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { decoded } = req.body;
    const tenantId = decoded.id;

    const deletedHomePage = await HomePageModel.findOneAndDelete({ tenantId });

    if (!deletedHomePage) {
      throw next(
        new NotFoundError(`HomePage with tenantId ${tenantId} not found`),
      );
    }

    return new SuccessResponse('HomePage deleted', {}).send(res);
  },
);
