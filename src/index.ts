import statesData from './data/states.json';
import townshipsData from './data/townships.json';

interface State {
  id: string;
  name: string;
  mm_name: string;
  capital: string;
  postal_code_prefix: string;
  type: string;
  area_sq_km?: number;
  population?: number;
}

interface Township {
  name: string;
  mm_name: string;
  postal_code: string;
  districts?: Township[];
}

/**
 * Get all states/regions of Myanmar
 * @returns Array of State objects
 */
export function getAllStates(): State[] {
  return statesData;
}

/**
 * Get a state/region by its ID
 * @param id - State ID (e.g., '12' for Yangon)
 * @returns State object or undefined if not found
 */
export function getStateById(id: string): State | undefined {
  return statesData.find(state => state.id === id);
}

/**
 * Get townships by state/region ID
 * @param stateId - State ID (e.g., '09' for Mandalay)
 * @returns Array of Township objects
 */
export function getTownshipsByStateId(stateId: string): Township[] {
  return townshipsData[stateId as keyof typeof townshipsData] || [];
}

/**
 * Get townships by state/region name (case insensitive)
 * @param stateName - State name (e.g., 'yangon')
 * @returns Array of Township objects
 */
export function getTownshipsByStateName(stateName: string): Township[] {
  const state = statesData.find(
    s => s.name.toLowerCase() === stateName.toLowerCase()
  );
  return state ? getTownshipsByStateId(state.id) : [];
}

/**
 * Search townships by name across all states (case insensitive)
 * @param townshipName - Partial or full township name
 * @returns Array of Township objects with state information
 */
export function searchTownships(townshipName: string): Array<{
  township: Township;
  state: State;
}> {
  const results: Array<{ township: Township; state: State }> = [];

  statesData.forEach(state => {
    const townships = getTownshipsByStateId(state.id);
    townships.forEach(township => {
      if (
        township.name.toLowerCase().includes(townshipName.toLowerCase()) ||
        township.mm_name.includes(townshipName)
      ) {
        results.push({ township, state });
      }

      // Search in districts if they exist
      if (township.districts) {
        township.districts.forEach(district => {
          if (
            district.name.toLowerCase().includes(townshipName.toLowerCase()) ||
            district.mm_name.includes(townshipName)
          ) {
            results.push({ township: district, state });
          }
        });
      }
    });
  });

  return results;
}

/**
 * Get postal code information by code
 * @param postalCode - 5-digit postal code
 * @returns { township: Township, state: State } or undefined if not found
 */
export function getByPostalCode(postalCode: string): { township: Township; state: State } | undefined {
  if (!/^\d{5}$/.test(postalCode)) return undefined;

  const statePrefix = postalCode.substring(0, 2);
  const state = getStateById(statePrefix);

  if (!state) return undefined;

  const townships = getTownshipsByStateId(statePrefix);
  for (const township of townships) {
    if (township.postal_code === postalCode) {
      return { township, state };
    }

    // Check districts if they exist
    if (township.districts) {
      for (const district of township.districts) {
        if (district.postal_code === postalCode) {
          return { township: district, state };
        }
      }
    }
  }

  return undefined;
}

// Export types for TypeScript users
export type { State, Township };