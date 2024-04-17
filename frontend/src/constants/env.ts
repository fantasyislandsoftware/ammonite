interface Environment {
  eventDebug: boolean;
  api: string;
  baseDir: string;
}

export const ENV: Environment = {
  eventDebug: false,
  api: 'http://localhost:1234',
  baseDir: '/home/node/app/src/',
};
