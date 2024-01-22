import config from '../config.js'

export let ProductDao = null;

switch (config.persistance) {
  case 'file':
  case 'memory':
    throw new Error('Not implements 😱');
  default:
    ProductDao = (await import('./Product.dao.js')).default; 
}
