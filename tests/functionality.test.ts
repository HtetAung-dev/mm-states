import {
  getAllStates,
  getStateById,
  getTownshipsByStateId,
  getTownshipsByStateName
} from '../src';

describe('Package Functionality', () => {
  test('getAllStates returns correct data', () => {
    const states = getAllStates();
    expect(states).toBeInstanceOf(Array);
    expect(states[0]).toHaveProperty('id');
    expect(states[0]).toHaveProperty('name');
  });

  test('getStateById returns correct state', () => {
    const yangon = getStateById('12');
    expect(yangon?.name).toBe('Yangon');
  });

  test('getTownshipsByStateId returns correct townships', () => {
    const mandalayTownships = getTownshipsByStateId('09');
    expect(mandalayTownships.length).toBeGreaterThan(0);
    expect(mandalayTownships.some(t => t.name === 'Mandalay')).toBeTruthy();
  });

  test('getTownshipsByStateName is case insensitive', () => {
    const yangonTownships1 = getTownshipsByStateName('Yangon');
    const yangonTownships2 = getTownshipsByStateName('YANGON');
    expect(yangonTownships1).toEqual(yangonTownships2);
  });
});