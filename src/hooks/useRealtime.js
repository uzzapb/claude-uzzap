import { useEffect, useState } from 'react';
import supabase from '../services/supabase';

const useRealtime = (table, filter = {}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const subscription = supabase
      .from(table)
      .on('INSERT', (payload) => {
        setData((prev) => [...prev, payload.new]);
      })
      .subscribe();

    return () => {
      supabase.removeSubscription(subscription);
    };
  }, [table]);

  return data;
};

export default useRealtime;
