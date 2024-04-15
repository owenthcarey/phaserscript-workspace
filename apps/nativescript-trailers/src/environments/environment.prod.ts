import { environmentBase } from './environment.base';
import { IEnvironment } from '@workspace/xplat/core';
import { environmentProd } from '@workspace/xplat/environments';

export const environment: IEnvironment = environmentBase(environmentProd, {
  // app level customizations here...
});