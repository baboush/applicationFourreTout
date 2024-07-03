import { HandlerExceptionsImplemention } from './handler-exceptions-implemention';

describe('HandlerExceptionsImplemention', () => {
  describe('handlerNotFoundException()', () => {
    it('should be defined', () => {
      expect(
        HandlerExceptionsImplemention.handlerNotFoundException('test'),
      ).toBeDefined();
    });
  });
});
