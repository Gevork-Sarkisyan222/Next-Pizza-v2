import React, { useEffect } from 'react';
import { Filters, useFilters } from './useFilters';
import { useRouter } from 'next/navigation';
import qs from 'qs';

export const useQueryFilters = (filters: Filters) => {
  const isMounted = React.useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (isMounted.current) {
      const params = {
        ...filters.prices,
        sizes: Array.from(filters.sizes),
        pizzaTypes: Array.from(filters.pizzaTypes),
        ingredients: Array.from(filters.selectedIngredients),
      };

      const query = qs.stringify(params, { arrayFormat: 'comma' });

      router.push(`?${query}`, {
        scroll: false,
      });
    }

    isMounted.current = true;
  }, [filters]);
};
