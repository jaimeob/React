import configDev from './config.development';
import configTest from './config.testing'
import configProd from './config.production';
import cfgDefault from './config.default';

const env = process.env.NODE_ENV;
const config = {};
switch(env) {
  case 'development':
    Object.assign(config, cfgDefault, configDev);
    break;  
  case 'test':
    Object.assign(config, cfgDefault, configTest);
    break;  
  case 'production':
    Object.assign(config, cfgDefault, configProd);
    break;  
  default:
    // console.log('Se cargarán los valores por defecto de la configuración.')
    Object.assign(config, cfgDefault);
}

export default config;
