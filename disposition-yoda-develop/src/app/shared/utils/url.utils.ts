export const getEnvironmentFromHostname = (url: string): ENVIRONMENT => {
  const hostnameParts = url.split('.');

  if (hostnameParts.length <= 0) {
    return ENVIRONMENT.DEV;
  }

  const hostName = hostnameParts[0];
  const serverNumberIndex = hostName.search(/\d/);
  const environmentLetterIndex = hostName.slice(serverNumberIndex - 1, serverNumberIndex);

  switch (environmentLetterIndex) {
    case 'e':
      return ENVIRONMENT.DEV;
    case 'q':
      return ENVIRONMENT.QLT;
    case 'p':
      return ENVIRONMENT.PRD;
    default:
      return ENVIRONMENT.DEV;
  }
};

export const getLetterForEnv = (env: ENVIRONMENT) => {
  switch (env) {
    case ENVIRONMENT.DEV:
      return 'e';
    case ENVIRONMENT.QLT:
      return 'q';
    case ENVIRONMENT.PRD:
      return 'p';
    default:
      return 'e';
  }
};

// eslint-disable-next-line no-shadow
export enum ENVIRONMENT {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  DEV,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  QLT,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  PRD
}
