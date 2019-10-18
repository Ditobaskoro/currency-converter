import { useEffect, useState } from 'react';
import axios from 'axios';
import { message } from 'antd';


export default function useFetch(query, base) {

  const [rates, setRates] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    ( async () => {
      try {
        setIsLoading(true);
        const result = await axios(`https://api.exchangeratesapi.io/latest?base=${base}&symbols=${query.join(',')}`);
        if(mounted) {
          setRates(result.data.rates);
          setIsLoading(false);
        }
      } catch {
        if(mounted) {
          setIsLoading(false);
          message.error('Cannot connect to API');
        }
      }
    })();
    const cleanup = () => { mounted = false };
    return cleanup;   
  }, [query, base]);
  return [rates, isLoading];
}

