# Myanmar Administrative Divisions

[![npm version](https://img.shields.io/npm/v/myanmar-states-townships.svg)](https://www.npmjs.com/package/myanmar-states-townships)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comprehensive package providing Myanmar's states, regions, and townships data with postal codes.

## Installation

```bash
npm install mm-states
```

## Usage

### JavaScript/TypeScript

```typescript
import {
  getAllStates,
  getStateById,
  getTownshipsByStateId,
  getTownshipsByStateName
} from 'mm-states';

// Get all states/regions
const allStates = getAllStates();

// Get specific state by ID
const yangonState = getStateById('12');

// Get townships by state ID
const yangonTownships = getTownshipsByStateId('12');

// Get townships by state name (case insensitive)
const mandalayTownships = getTownshipsByStateName('mandalay');
```

## API Reference

### `getAllStates()`
Returns an array of all states/regions with:
- `id`: State code (01-15)
- `name`: English name
- `mm_name`: Myanmar name
- `capital`: Capital city
- `postal_code_prefix`: First 2 digits of postal codes
- `type`: "State" or "Region"
- `area_sq_km`: Area in square kilometers
- `population`: Population count

### `getStateById(id: string)`
Returns a single state object matching the ID (e.g., "12" for Yangon)

### `getTownshipsByStateId(stateId: string)`
Returns an array of townships for the specified state ID. Each township contains:
- `name`: English name
- `mm_name`: Myanmar name
- `postal_code`: 5-digit postal code
- `districts` (for major cities): Array of districts with names and postal codes

### `getTownshipsByStateName(stateName: string)`
Case-insensitive search for townships by state/region name

## Data Structure

The package includes:
- All 7 states
- All 7 regions
- Naypyidaw Union Territory
- 330+ townships
- Postal codes for all major townships
- District breakdowns for Yangon and Mandalay

## Contributing

Contributions are welcome! Please open an issue or PR for:
- Data corrections
- Additional township information
- New features

## License

MIT © [Htet Aung]