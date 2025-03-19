"use client";
import { useEffect, useState } from "react";

export default function ArchSideSoon() {
  const [progress, setProgress] = useState(10);

  // Simulate progress for visual effect
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 0.5;
        return newProgress > 95 ? 95 : newProgress;
      });
    }, 100000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="archside-soon">
      <div className="archside-soon-container">
        <div className="content">
          <h3 className="title">Portfolio</h3>

          <div className="status">
            <div className="spinner"></div>
            <span>Coming Soon</span>
          </div>

          <div className="progress">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="progress-text">{Math.floor(progress)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
