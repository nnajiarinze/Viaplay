import * as express from 'express'

export abstract class BaseController {

  protected abstract executeImpl(
    req: express.Request, res: express.Response, next?: express.NextFunction
  ): Promise<void | any>;


  public async execute(
    req: express.Request, res: express.Response, next?: express.NextFunction
  ): Promise<void> {

    try {
      await this.executeImpl(req, res, next);
    } catch (err) {
      console.log(`[BaseController]: Uncaught controller error`);
      console.log(err);
      this.fail(res, 'An unexpected error occurred')
    }
  }

  public static jsonResponse(
    res: express.Response, code: number, message: string
  ) {
    return res.status(code).json({ message })
  }

  public ok<T>(res: express.Response, dto?: T) {
    if (!!dto) {
      res.type('application/json');
      return res.status(200).json(dto);
    } else {
      return res.sendStatus(200);
    }
  }
  
  public notFound(res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 404, message ? message : 'Not found');
  }

  public fail(res: express.Response, error: Error | string) {
    console.log(error);
    return res.status(500).json({
      message: error.toString()
    })
  }

  public badRequest(res: express.Response, message?: string) {
    return BaseController.jsonResponse(res, 400, message ? message : 'Bad Request');
  }


}