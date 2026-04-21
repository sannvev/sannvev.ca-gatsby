import * as React from "react";
import { StaticImage } from "gatsby-plugin-image";

interface LogoSealProps {
  size?: "sm" | "md" | "lg";
}

const LogoSeal: React.FC<LogoSealProps> = ({ size = "md" }) => (
  <div className={`logo-seal logo-seal--${size}`}>
    <StaticImage
      src="../images/sannvev-mark.png"
      alt=""
      placeholder="none"
      layout="constrained"
      width={480}
      quality={90}
    />
  </div>
);

export default LogoSeal;
