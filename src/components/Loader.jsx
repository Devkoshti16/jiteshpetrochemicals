import { useEffect, useState } from 'react';

const Loader = () => {
  const [fadeOut, setFadeOut] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setHidden(true);
      }, 500);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (hidden) return null;

  return (
    <div className={`fixed inset-0 bg-brand-main z-[9999] flex justify-center items-center transition-all duration-500 ease-in-out ${fadeOut ? 'opacity-0 invisible' : 'opacity-100 visible'}`}>
      <div className="text-center flex flex-col items-center">
        <div className="oil-drop"></div>
        <div className="font-heading text-[2rem] font-bold tracking-[3px] text-white mb-[15px]">
          JITESH<span className="text-primary">.</span>
        </div>
        <div className="w-[150px] h-1 bg-brand-border rounded-[2px] overflow-hidden relative">
          <div className="absolute top-0 left-0 h-full w-0 bg-primary animate-loading-fill"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
