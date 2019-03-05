import environment from '../config/environments';

export default () => Math.floor((10 ** (environment.integerIdLength - 1)) + Math.random()
  * ((10 ** environment.integerIdLength) - (10 ** (environment.integerIdLength - 1)) - 1));
