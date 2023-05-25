import { IEnvironment } from '@phaserscript-workspace/xplat/core';
import { deepMerge } from '@phaserscript-workspace/xplat/utils';
import { environmentBase } from './environment.base';

export const environmentProd = deepMerge(environmentBase, <IEnvironment>{
  production: true,
  // customizations here...
});
