import * as dotenv from 'dotenv';
import { writeFile } from 'fs';
import { argv } from 'yargs';
dotenv.config({ path: __dirname + '/.env' });

const environment = (argv as any).environment;
const isProduction = environment === 'prod';

const targetPath = isProduction
  ? `./src/environments/environment.prod.ts`
  : `./src/environments/environment.dev.ts`;

const environmentFileContent = `export const environment = {
    firebase: {
    projectId:"${process.env.FIREBASE_PROJECT_ID}",
    appId:"${process.env.FIREBASE_APP_ID}",
    storageBucket:"${process.env.FIREBASE_STORAGE_BUCKET}",
    locationId: 'us-central',
    apiKey:"${process.env.FIREBASE_API_KEY}",
    authDomain:"${process.env.FIREBASE_AUTH_DOMAIN}",
    messagingSenderId:"${process.env.FIREBASE_MESSAGING_SENDER_ID}",
  },
  weather_api: "${process.env.WEATHER_API}",
  production: ${isProduction}
};
`;

writeFile(targetPath, environmentFileContent, (err) => {
  if (err) console.log(err);

  console.log(`Wrote variables to ${targetPath}`);
});
