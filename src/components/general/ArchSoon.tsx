"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";

type SoonProp = {
  soontitle: string;
};
export default function ArchSoon({ soontitle }: SoonProp) {
  const [email, setEmail] = useState("");
  const [days, setDays] = useState(30);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const gridRef = useRef<HTMLDivElement>(null);

  // Update countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      } else if (hours > 0) {
        setHours(hours - 1);
        setMinutes(59);
        setSeconds(59);
      } else if (days > 0) {
        setDays(days - 1);
        setHours(23);
        setMinutes(59);
        setSeconds(59);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [days, hours, minutes, seconds]);

  // Track mouse movement for the interactive grid
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (gridRef.current) {
        const rect = gridRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
          y: -((e.clientY - rect.top) / rect.height) * 2 + 1,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Generate grid points with dynamic positioning based on mouse
  const generateGridPoints = () => {
    const points = [];
    const rows = 10;
    const cols = 10;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const baseX = (j / (cols - 1)) * 100;
        const baseY = (i / (rows - 1)) * 100;

        const offsetX = mousePosition.x * 5 * (0.5 - Math.abs(0.5 - j / cols));
        const offsetY = mousePosition.y * 5 * (0.5 - Math.abs(0.5 - i / rows));

        points.push({
          x: baseX + offsetX,
          y: baseY + offsetY,
          size: Math.random() > 0.9 ? 3 : 1,
          highlight: i === 5 && j === 5,
        });
      }
    }

    return points;
  };

  const gridPoints = generateGridPoints();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you! We'll notify ${email} when we launch.`);
    setEmail("");
  };

  const countdownItems = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: seconds },
  ];

  return (
    <div className="arch_soon">
      <div className="grid-background">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#e0e7ff"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="content">
        <div className="badge">
          <svg
            className="icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
          </svg>
          <span>Architectural Innovation</span>
        </div>

        <h1 className="title">Building the Future</h1>

        <p className="description">
          {` 
          Our new ${soontitle}  is under construction. We're crafting
          something extraordinary that merges form, function, and innovation.`}
        </p>

        <div className="countdown">
          {countdownItems.map((item, index) => (
            <div key={index} className="countdown-item">
              <div className="countdown-card">
                <div className="countdown-value">
                  {item.value.toString().padStart(2, "0")}
                </div>
                <div className="countdown-label">{item.label}</div>
              </div>
              {index < 3 && (
                <div className="countdown-divider">
                  <div className="countdown-dot">
                    <div className="countdown-dot-inner"></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="architectural-elements">
          {["grid", "ruler", "compass"].map((tool, index) => (
            <div key={tool} className="element-group">
              <svg
                className="element-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                {tool === "grid" && (
                  <>
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M3 9h18" />
                    <path d="M3 15h18" />
                    <path d="M9 3v18" />
                    <path d="M15 3v18" />
                  </>
                )}
                {tool === "ruler" && (
                  <>
                    <rect
                      x="4"
                      y="10"
                      width="16"
                      height="4"
                      rx="1"
                      transform="rotate(-20 12 12)"
                    />
                    <line
                      x1="6"
                      y1="11"
                      x2="6.5"
                      y2="13"
                      stroke="black"
                      strokeWidth="1.5"
                    />
                    <line
                      x1="9"
                      y1="10.5"
                      x2="9.5"
                      y2="12.5"
                      stroke="black"
                      strokeWidth="1.5"
                    />
                    <line
                      x1="12"
                      y1="10"
                      x2="12.5"
                      y2="12"
                      stroke="black"
                      strokeWidth="1.5"
                    />
                    <line
                      x1="15"
                      y1="9.5"
                      x2="15.5"
                      y2="11.5"
                      stroke="black"
                      strokeWidth="1.5"
                    />
                  </>
                )}

                {tool === "compass" && (
                  <>
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                  </>
                )}
              </svg>
              <div className="element-line"></div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="newsletter-form">
          <div className="input-container">
            <svg
              className="input-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">
              Notify Me
              <svg
                className="button-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
          <p className="form-disclaimer">
            {" "}
            {"We'll notify you when our site launches. No spam, ever."}
          </p>
        </form>
      </div>

      <div className="measurement-lines">
        <div className="measurement-line">
          {["0", "25", "50", "75", "100"].map((value, index) => (
            <div
              key={value}
              className="measurement-mark"
              style={{ left: `${index * 25}%` }}
            >
              <div className="measurement-text">{value}</div>
              <div className="measurement-tick"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
