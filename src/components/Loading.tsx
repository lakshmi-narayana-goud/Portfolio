import { useEffect, useRef, useState } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";
import Marquee from "react-fast-marquee";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [loaded, setLoaded] = useState(false);
  const [animOut, setAnimOut] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (percent >= 100 && !loaded) {
      timerRef.current = setTimeout(() => {
        setLoaded(true);
        setTimeout(() => {
          setAnimOut(true);
          setTimeout(() => setIsLoading(false), 900);
        }, 800);
      }, 500);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [percent, loaded, setIsLoading]);

  const barWidth = Math.min(percent, 100);

  return (
    <div className={`loading-screen ${animOut ? "loading-out" : ""}`}>
      {/* Header */}
      <div className="loading-header">
        <span className="loading-monogram">LN</span>
        <span className="loading-status">
          <span className="loading-dot"></span>
          Initializing
        </span>
      </div>

      {/* Marquee */}
      <div className="loading-marquee">
        <Marquee speed={60} gradient={false}>
          <span>AI Developer</span>
          <span>Computer Vision</span>
          <span>Machine Learning</span>
          <span>Full Stack Systems</span>
          <span>Explainable AI</span>
          <span>JARVIS Creator</span>
        </Marquee>
      </div>

      {/* Center glass card */}
      <div className={`loading-card glass ${loaded ? "loading-card-done" : ""}`}>
        <div className="loading-card-inner">
          <div className="loading-name">BATTINI</div>
          <div className="loading-name loading-name-2">LAKSHMINARAYANA</div>
          <div className="loading-bar-wrap">
            <div className="loading-bar" style={{ width: `${barWidth}%` }}></div>
          </div>
          <div className="loading-percent">
            {loaded ? "Welcome" : `${Math.min(percent, 100)}%`}
          </div>
        </div>
      </div>

      {/* Bottom grid lines (decorative) */}
      <div className="loading-grid"></div>
    </div>
  );
};

export default Loading;

/* ── Progress utility ── */
export const setProgress = (setLoadingFn: (v: number) => void) => {
  let percent = 0;
  let interval = setInterval(() => {
    if (percent <= 60) {
      percent += Math.round(Math.random() * 6);
      setLoadingFn(Math.min(percent, 60));
    } else {
      clearInterval(interval);
      interval = setInterval(() => {
        percent += Math.round(Math.random());
        setLoadingFn(Math.min(percent, 92));
        if (percent >= 92) clearInterval(interval);
      }, 2000);
    }
  }, 100);

  const loaded = () =>
    new Promise<void>((resolve) => {
      clearInterval(interval);
      interval = setInterval(() => {
        if (percent < 100) {
          percent++;
          setLoadingFn(percent);
        } else {
          resolve();
          clearInterval(interval);
        }
      }, 15);
    });

  const clear = () => { clearInterval(interval); setLoadingFn(100); };
  return { loaded, clear };
};
