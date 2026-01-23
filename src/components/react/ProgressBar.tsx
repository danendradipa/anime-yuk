import { useEffect } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; 
export default function ProgressBar() {
  useEffect(() => {
    // Config
    NProgress.configure({ showSpinner: false });

    const handleStart = () => NProgress.start();
    const handleStop = () => NProgress.done();

    document.addEventListener('astro:before-preparation', handleStart);
    document.addEventListener('astro:after-swap', handleStop);
    document.addEventListener('astro:page-load', handleStop);

    return () => {
      document.removeEventListener('astro:before-preparation', handleStart);
      document.removeEventListener('astro:after-swap', handleStop);
      document.removeEventListener('astro:page-load', handleStop);
    };
  }, []);

  return null; 
}