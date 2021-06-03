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

### Backend
- Create release branch from master
- Remove dist and config directories from .gitignore
- Build release by npm `npm run build_prod`
- Commit config and dist directories
- Merge into heroku/main
- git push heroku HEAD:main
    - in case src refspec master does not match any - git remote -v
    - and add heroku repository as remote heroku git:remote -a <app-name>
    - push again
- heroku logs --tail -app <app name> to check if it is OK

### Frontend
- Create release branch from master
- Remove all server side, move fe to top of project
- Change backend api to production
- Build release by npm `npm run build:prod`
- Remove unnecessary files from dist
- Commit
- Merge into heroku-fe/main
- git push heroku-fe HEAD:main
- heroku logs --tail -app <app name> to check if it is OK
