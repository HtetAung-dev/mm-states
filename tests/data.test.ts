import { getAllStates, getTownshipsByStateId } from '../src';

describe('Myanmar Administrative Data', () => {
  test('should return all 15 states/regions', () => {
    const states = getAllStates();
    expect(states.length).toBe(15);
  });

  test('Yangon should have districts', () => {
    const yangonTownships = getTownshipsByStateId('12');
    expect(yangonTownships.some(t => t.districts)).toBeTruthy();
  });

  test('Postal codes should follow Myanmar format', () => {
    const states = getAllStates();
    states.forEach(state => {
      const townships = getTownshipsByStateId(state.id);
      townships.forEach(township => {
        expect(township.postal_code).toMatch(/^\d{5}$/);
      });
    });
  });
});