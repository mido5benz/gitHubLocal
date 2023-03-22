import {ENVIRONMENT, getEnvironmentFromHostname, getLetterForEnv} from '@shared/utils/url.utils';

describe('url utils', () => {
  describe('getEnvironmentFromHostname', () => {
    it('Returns DEV because the url has not parts', () => {
      const url = '';
      const env = getEnvironmentFromHostname(url);
      expect(env).toBe(ENVIRONMENT.DEV);
    });
    it('Returns DEV because the url has an unknown dev letter', () => {
      const url = 'rasterdisposrvx66.tof.de';
      const env = getEnvironmentFromHostname(url);
      expect(env).toBe(ENVIRONMENT.DEV);
    });
    it('Returns DEV because the url is an dev url', () => {
      const url = 'rasterdisposrve66.tof.de';
      const env = getEnvironmentFromHostname(url);
      expect(env).toBe(ENVIRONMENT.DEV);
    });
    it('Returns QLT because the url is an dev url', () => {
      const url = 'rasterdisposrq66.tof.de';
      const env = getEnvironmentFromHostname(url);
      expect(env).toBe(ENVIRONMENT.QLT);
    });
    it('Returns PRD because the url is an dev url', () => {
      const url = 'rasterdisposrvp66.tof.de';
      const env = getEnvironmentFromHostname(url);
      expect(env).toBe(ENVIRONMENT.PRD);
    });
  });

  describe('getLetterForEnv', () => {
    it('Returns e because the env is e', () => {
      const envLetter = getLetterForEnv(ENVIRONMENT.DEV);
      expect(envLetter).toBe('e');
    });
    it('Returns e because the env is e', () => {
      const envLetter = getLetterForEnv(ENVIRONMENT.QLT);
      expect(envLetter).toBe('q');
    });
    it('Returns e because the env is e', () => {
      const envLetter = getLetterForEnv(ENVIRONMENT.PRD);
      expect(envLetter).toBe('p');
    });
  });
});
