import { toast } from 'react-toastify';
import { ToastStatus } from 'src/models/basic';

export const getToken = () => {
  const token = localStorage.getItem('token');
  return 'Bearer ' + token;
};

export const toastMsg = (msg: string, status: ToastStatus) => {
  switch (status) {
    case ToastStatus.Success:
      toast.success(msg, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      });
      break;

    case ToastStatus.Info:
      toast.info(msg, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      });
      break;

    case ToastStatus.Warning:
      toast.warn(msg, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      });
      break;

    case ToastStatus.Error:
      toast.error(msg, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
      });
      break;
  }
};

export const applyPagination = <T>(
  items: T[],
  page: number,
  limit: number
): T[] => {
  const start = page * limit;
  const end = start + limit;
  return items.slice(start, end);
};

export const getTimeAgo = (
  diffInSeconds: number
): { a: number | string; b: string } => {
  const units = [
    { name: 'year', seconds: 31536000 },
    { name: 'month', seconds: 2592000 },
    { name: 'week', seconds: 604800 },
    { name: 'day', seconds: 86400 },
    { name: 'hour', seconds: 3600 },
    { name: 'min', seconds: 60 },
    { name: 'sec', seconds: 1 }
  ];
  const str = diffInSeconds > 0 ? 'ago' : 'tilbage';

  for (const unit of units) {
    const elapsed = Math.floor(Math.abs(diffInSeconds) / unit.seconds);
    if (elapsed > 0) {
      return elapsed === 1
        ? { a: 1, b: `${unit.name} ${str}` }
        : { a: elapsed, b: `${unit.name}s ${str}` };
    }
  }

  return { a: '', b: 'just now' };
};
