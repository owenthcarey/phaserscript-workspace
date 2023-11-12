import { IEnvironment } from '@phaserscript/xplat/core';
import { deepMerge } from '@phaserscript/xplat/utils';
import { environmentBase } from './environment.base';

export const environmentProd = deepMerge(environmentBase, <IEnvironment>{
  production: true,
  // customizations here...
});
