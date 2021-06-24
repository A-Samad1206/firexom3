// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function getApi(req, res) {
  console.log('Res', req);
  const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
  };
  res.status(200).json(firebaseConfig);
}
