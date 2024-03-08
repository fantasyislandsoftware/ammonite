interface Environment {
  eventDebug: boolean;
  api: string;
}

export const ENV: Environment = {
  eventDebug: false,
  api: 'http://localhost:1234',
};
