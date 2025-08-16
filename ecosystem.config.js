/* eslint-disable */
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '.env') });
module.exports = {
  apps: [
    {
      name: 'Timeline',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3056',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3056,
        API_SERVER_URL: process.env.API_SERVER_URL,
        SESSION_SECRET: process.env.SESSION_SECRET,
        NEXT_PUBLIC_IMAGE_URL: process.env.NEXT_PUBLIC_IMAGE_URL,
        NEXT_PUBLIC_CHATBOT_URL: process.env.NEXT_PUBLIC_CHATBOT_URL,
        LOCAL: process.env.LOCAL,
      },
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      error_file: '/home/ec2-user/be/log/pm2/error.log',
      out_file: '/home/ec2-user/be/log/pm2/out.log',
    },
  ],
};
