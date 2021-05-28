## What

Application for recording a history of baby feeding.

## Why

Just to learn new libraries and technologies.

## Uses

- Backend: Node.js + apollo-server-express + mongoose
- DB: MongoDB
- ClientSide #1: React Native + Apollo
- ClientSide #2: React + Apollo + Context + MaterialUI + Lazy/Suspense + React hook forms
- Common: TS + eslint 

## Deploy

- Create release branch from master
- Remove dist and config directories from .gitignore
- Build release by npm `npm run build_prod`
- Commit config and dist directories
- git push heroku main
    - in case src refspec master does not match any - git remote -v
    - and add heroku repository as remote heroku git:remote -a <app-name>
    - push again
- heroku logs --tail to check if it is OK