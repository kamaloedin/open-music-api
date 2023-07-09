const config = {
  app: {
    host: process.env.HOST,
    port: process.env.PORT,
  },
  s3: {
    bucketName: process.env.AWS_BUCKET_NAME,
  },
  rabbitMq: {
    server: process.env.RABBITMQ_SERVER,
  },
  redis: {
    host: process.env.REDIS_SERVER,
  },
  jwt: {
    accessKey: process.env.ACCESS_TOKEN_KEY,
    refreshKey: process.env.REFRESH_TOKEN_KEY,
    accessAge: process.env.ACCESS_TOKEN_AGE,
  },
};

module.exports = config;
