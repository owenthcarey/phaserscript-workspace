import { environmentBase } from './environment.base';
import { IEnvironment } from '@phaserscript/xplat/core';
import { environmentProd } from '@phaserscript/xplat/environments';

export const environment: IEnvironment = environmentBase(environmentProd, {
  // app level customizations here...
});
