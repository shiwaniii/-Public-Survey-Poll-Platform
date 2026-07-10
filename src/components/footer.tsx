// import "../style/footer.css";

// export default function Footer() {
//   return (
//     <footer className="footer">
//       <p>© 2026 SurveyHub. All Rights Reserved.</p>
//     </footer>
//   );
// }



import React from "react";
import { Heart } from "lucide-react";
import "../style/footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <Heart size={12} className="footer__heart" fill="currentColor" />
        © 2026 SurveyHub. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
