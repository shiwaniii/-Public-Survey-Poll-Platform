import React from "react";
import { CheckCircle2, Clock, Users } from "lucide-react";
import "../style/hero.css";

const ClipboardIllustration: React.FC = () => (
  <svg width="180" height="200" viewBox="0 0 180 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="20" width="130" height="170" rx="14" fill="#EFF6FF" />
    <rect x="65" y="6" width="40" height="20" rx="6" fill="#1E3A8A" />
    <circle cx="85" cy="16" r="4" fill="#60A5FA" />

    {/* Star row 1 (checked) */}
    <rect x="38" y="46" width="14" height="14" rx="3" fill="#2563EB" />
    <path d="M41 53l2 2 4-4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    {[0, 1, 2, 3, 4].map((i) => (
      <path
        key={`s1-${i}`}
        d={`M${64 + i * 14} 53l1.6 3.2 3.5.5-2.5 2.5.6 3.5-3.2-1.7-3.2 1.7.6-3.5-2.5-2.5 3.5-.5z`}
        fill="#2563EB"
      />
    ))}

    {/* Star row 2 (unchecked, 4 stars) */}
    <rect x="38" y="76" width="14" height="14" rx="3" fill="none" stroke="#CBD5E1" strokeWidth="1.6" />
    {[0, 1, 2, 3].map((i) => (
      <path
        key={`s2-${i}`}
        d={`M${64 + i * 14} 83l1.6 3.2 3.5.5-2.5 2.5.6 3.5-3.2-1.7-3.2 1.7.6-3.5-2.5-2.5 3.5-.5z`}
        fill="#93C5FD"
      />
    ))}

    {/* Star row 3 (unchecked, 3 stars) */}
    <rect x="38" y="106" width="14" height="14" rx="3" fill="none" stroke="#CBD5E1" strokeWidth="1.6" />
    {[0, 1, 2].map((i) => (
      <path
        key={`s3-${i}`}
        d={`M${64 + i * 14} 113l1.6 3.2 3.5.5-2.5 2.5.6 3.5-3.2-1.7-3.2 1.7.6-3.5-2.5-2.5 3.5-.5z`}
        fill="#BFDBFE"
      />
    ))}

    {/* Text lines */}
    <rect x="38" y="140" width="70" height="5" rx="2.5" fill="#DBEAFE" />
    <rect x="38" y="152" width="50" height="5" rx="2.5" fill="#DBEAFE" />

    {/* Blue check badge */}
    <circle cx="140" cy="140" r="26" fill="#2563EB" stroke="white" strokeWidth="4" />
    <path d="M129 140l8 8 16-16" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero__content">
        <span className="hero__badge">
          <Users size={14} />
          Customer Feedback
        </span>

        <h1 className="hero__title">Customer Satisfaction Survey</h1>

        <p className="hero__description">
          We value your feedback! Please take a few minutes to complete our
          customer satisfaction survey.
        </p>

        <div className="hero__actions">
          <button className="hero__cta">
            <CheckCircle2 size={16} />
            Take Survey
          </button>
          <span className="hero__time">
            <Clock size={14} />
            Takes ~ 3 minutes
          </span>
        </div>
      </div>

      <div className="hero__illustration">
        <ClipboardIllustration />
      </div>

      <div className="hero__blob" />
      <div className="hero__dots">
        {Array.from({ length: 16 }).map((_, i) => (
          <span key={i} className="hero__dot" />
        ))}
      </div>
    </section>
  );
};

export default Hero;
