import {describe, it, expect} from 'vitest';
import {Environment} from './Environment';
import {ApplicationError} from '@micra/error';

describe('Environment', () => {
  type Variables = {
    API_URL: string;
    API_KEY: string;
    DEBUG: boolean;
  };

  const defaultDefinitions = {
    API_URL: {default: 'https://api.example.com'},
    API_KEY: {default: 'default-key', sensitive: true},
    DEBUG: {},
  };

  describe('constructor', () => {
    it('should initialize with default definitions', () => {
      const env = new Environment<Variables>({}, defaultDefinitions);
      expect(env.get('API_URL')).toBe('https://api.example.com');
      expect(env.get('API_KEY')).toBe('default-key');
      expect(env.get('DEBUG', false)).toBe(false);
    });

    it('should override default values with partial variables', () => {
      const env = new Environment<Variables>(
        {API_URL: 'https://custom.example.com'},
        defaultDefinitions,
      );
      expect(env.get('API_URL')).toBe('https://custom.example.com');
    });
  });

  describe('get', () => {
    it('should return the value of a defined variable', () => {
      const env = new Environment<Variables>({}, defaultDefinitions);
      expect(env.get('API_URL')).toBe('https://api.example.com');
    });

    it('should return the fallback value if the variable is not defined', () => {
      const env = new Environment<Variables>();
      expect(env.get('API_URL', 'https://fallback.example.com')).toBe(
        'https://fallback.example.com',
      );
    });

    it('should return the parent value if not defined locally', () => {
      const parentEnv = new Environment<Variables>({}, defaultDefinitions);
      const childEnv = parentEnv.fork();
      expect(childEnv.get('API_URL')).toBe('https://api.example.com');
    });
  });

  describe('has', () => {
    it('should return true if the variable is defined', () => {
      const env = new Environment<Variables>({}, defaultDefinitions);
      expect(env.has('API_URL')).toBe(true);
    });

    it('should return false if the variable is not defined', () => {
      const env = new Environment<Variables>();
      expect(env.has('API_URL')).toBe(false);
    });
  });

  describe('missing', () => {
    it('should return true if the variable is not defined', () => {
      const env = new Environment<Variables>();
      expect(env.missing('API_URL')).toBe(true);
    });

    it('should return false if the variable is defined', () => {
      const env = new Environment<Variables>({}, defaultDefinitions);
      expect(env.missing('API_URL')).toBe(false);
    });
  });

  describe('define', () => {
    it('should define a new variable', () => {
      const env = new Environment<Variables>();
      env.define('API_URL', {default: 'https://api.example.com'});
      expect(env.get('API_URL')).toBe('https://api.example.com');
    });
  });

  describe('set', () => {
    it('should set the value of a variable', () => {
      const env = new Environment<Variables>();
      env.set('API_URL', 'https://custom.example.com');
      expect(env.get('API_URL')).toBe('https://custom.example.com');
    });

    it('should set multiple variables at once', () => {
      const env = new Environment<Variables>();
      env.set({API_URL: 'https://custom.example.com', DEBUG: true});
      expect(env.get('API_URL')).toBe('https://custom.example.com');
      expect(env.get('DEBUG')).toBe(true);
    });
  });

  describe('unset', () => {
    it('should unset a variable', () => {
      const env = new Environment<Variables>({}, defaultDefinitions);
      env.set('DEBUG', true);
      env.unset('DEBUG');
      expect(env.has('DEBUG')).toBe(false);
    });
  });

  describe('validate', () => {
    it('should validate all defined variables', () => {
      const env = new Environment<Variables>({}, defaultDefinitions);
      expect(() => env.validate()).not.toThrow();
    });

    it('should throw an error for invalid variables', () => {
      const env = new Environment<Variables>();
      env.define('API_URL', {required: true});
      expect(() => env.validate()).toThrow(ApplicationError);
    });
  });

  describe('fork', () => {
    it('should create a forked environment with overrides', () => {
      const env = new Environment<Variables>({}, defaultDefinitions);
      const forkedEnv = env.fork({API_URL: 'https://forked.example.com'});
      expect(forkedEnv.get('API_URL')).toBe('https://forked.example.com');
      expect(forkedEnv.get('API_KEY')).toBe('default-key');
    });
  });

  describe('toJSON', () => {
    it('should serialize the environment to JSON', () => {
      const env = new Environment<Variables>({}, defaultDefinitions);
      const json = env.toJSON();
      expect(json).toEqual({
        API_URL: 'https://api.example.com',
        API_KEY: undefined, // Sensitive by default
      });
    });

    it('should include sensitive variables if specified', () => {
      const env = new Environment<Variables>({}, defaultDefinitions);
      const json = env.toJSON({includeSensitive: true});
      expect(json).toEqual({
        API_URL: 'https://api.example.com',
        API_KEY: 'default-key',
      });
    });
  });
});
