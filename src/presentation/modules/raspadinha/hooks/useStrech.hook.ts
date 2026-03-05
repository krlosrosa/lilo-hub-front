import { useCallback } from 'react';
import type { ScratchResult } from '../types/scratch.type';
import { generatePrize } from '../utils/generate-prizle';


export function useStrech() {

  const scratch = useCallback((): ScratchResult | null => {
    const prize = generatePrize([{
      id: '1',
      name: 'Prêmio 1',
      remainingQuantity: 8,
      probability: 100,
      quantity: 1,
      type: 'brinde',
    }]);
    return prize as unknown as ScratchResult | null;
  }, []);
  return { scratch };
}
