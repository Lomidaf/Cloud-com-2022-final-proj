/* eslint-disable prettier/prettier */
export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    type: 'postgres', 
    host: process.env.POSTGRES_HOST || '',
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    username: process.env.POSTGRES_USERNAME || '',
    password: process.env.POSTGRES_PASSWORD || '',
    database: process.env.POSTGRES_DATABASE || '',
    entities: ['dist/**/*.entity{ .ts,.js}'],
    synchronize: process.env.DB_SYNC || false,
  },
  firebase: { 
      type: process.env.FIREBASE_TYPE || '',
      projectId: process.env.FIREBASE_PROJECT_ID || '',
      privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID || '',
      privateKey: process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/gm, "\n") : undefined,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL || '',
      clientId: process.env.FIREBASE_CLIENT_ID || '',
      authUri: process.env.FIREBASE_AUTH_URI || '',
      tokenUri: process.env.FIREBASE_TOKEN_URI || '',
      authProviderX509CertUrl: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL || '',
      clientC509CertUrl: process.env.FIREBASE_CLIENT_X509_CERT_URL || ''
  },
  vision: {
    keyPath: process.env.VISION_KEY_PATH
  }
});
