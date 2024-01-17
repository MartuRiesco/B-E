import { Router } from 'express';

const router = Router();


router.get('/a', (req, res) => {
   res.status(200).json('hola mundo');
  });
router.get('/loggerTest', (req, res) => {
  req.logger.fatal('Esta es una prueba de log error');
  req.logger.error('Esta es una prueba de log error');
  req.logger.warning('Esta es una prueba de log warn');
  req.logger.info('Esta es una prueba de log infos');
  req.logger.http('Esta es una prueba de log http');
  req.logger.debug('Esta es una prueba de log debug');
  /*
  req.logger.verbose('Esta es una prueba de log verbose');
  
  req.logger.silly  ('Esta es una prueba de log silly'); */
  res.status(200).send('Logs generados, revisa la consola o el archivo errors.log.');
});

export default router;