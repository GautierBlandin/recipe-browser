import { Portion } from './portion';

export function buildTestPortion(options: {
  unit?: string;
  quantity?: number;
} = {}): Portion {
  return {
    unit: options.unit ?? 'cups',
    quantity: options.quantity ?? 1,
  };
}
