import { useEffect } from 'react';
import Report from './Report'
import qs from 'qs';

export const useShowPageReport = ({
  page,
  event,
  extend_info,
  source,
}: any) => {
  const pageFrom = source || (qs.parse(location.search.substr(1)).from) || 0;

  useEffect(() => {
    window.addEventListener('load', () => {
      Report({
        page,
        action: 'show',
        event: event||'show',
        extend_info: {
          ...extend_info, pageFrom
        },
      })
    });
  }, [])
}

export default useShowPageReport;