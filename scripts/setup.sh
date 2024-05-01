#!/bin/bash

# 0. Install Node LTS globally
nvm install --lts

# 1. [SKIP] Install Angular CLI, NativeScript CLI, and Nrwl Nx CLI globally (no need for global installation)

# 2. Generate a new Nx workspace with an empty integrated monorepo
npx create-nx-workspace@latest amorphicai-workspace

# 3. Navigate to the Nx-workspace directory
cd amorphicai-workspace

# 4. Install dev dependencies
npm install --save-dev @nativescript/nx @nstudio/xplat @nx/nest typescript@">=4.8.2 <5.0"

# 5. Generate a new Angular web app with routing enabled and no Standalone Components
npx nx generate @nstudio/xplat:app --name=amorphicai

# 6. Generate a new NativeScript mobile app with routing enabled and Angular as the front end
npx nx generate @nstudio/xplat:app --name=amorphicai

# 7. Generate a new Electron desktop app with routing enabled and Angular as the front end
npx nx generate @nstudio/xplat:app --name=amorphicai --target=web-amorphicai

# TODO
npx nx g @nx/nest:app api-amorphicai --frontendProject=web-amorphicai
npx nx g @nx/nest:lib api --directory=libs/xplat

# 8. Generate new shared TypeScript model classes
npx nx generate @nrwl/angular:class --name=models/user --project=xplat-core --type=model
npx nx generate @nrwl/angular:class --name=models/game --project=xplat-core --type=model
npx nx generate @nrwl/angular:class --name=models/item --project=xplat-core --type=model

# 9. Run the Angular web app
npx nx serve web-amorphicai

# 10. Run the NativeScript mobile app on an Android device or emulator
npx nx run nativescript-amorphicai:android

# 11. Run the NativeScript mobile app on an iOS device or simulator
npx nx run nativescript-amorphicai:ios

# 12. Run the Electron desktop app
npm run start.electron.amorphicai

# TODO
npx nx serve api-amorphicai
