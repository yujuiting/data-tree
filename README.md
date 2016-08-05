# Typescript project starter

## After pull

1. rename project name of `package.json`

2. rename project name of `typings.json`

## Command

- Build to `commonjs` at `./dist`.
```
$ npm run build
```

- Test.
```
$ npm test
```

## Config

1. Project self import: `compilerOptions.paths['@proj']`

```typescript
import { ... } from '@proj/some/file';
```

2. Build output directory. Default is `./dist`;  
   Check out `compilerOptions.outDir`.


