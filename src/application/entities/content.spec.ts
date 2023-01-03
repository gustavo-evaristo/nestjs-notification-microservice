import { Content } from './Content';

describe('Content', () => {
  it('it should be able to create notification content', () => {
    const content = new Content('Você recebeu uma nova solicitação de amizade');

    expect(content).toBeTruthy();
  });

  it('it should not be able to create notification content with less than 5 characters', () => {
    expect(() => new Content('Você')).toThrow('Content length error');
  });

  it('it should not be able to create notification content with more than 240 characters', () => {
    expect(() => new Content('a'.repeat(241))).toThrow('Content length error');
  });
});
