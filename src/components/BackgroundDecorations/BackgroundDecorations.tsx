import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useBackgroundDecorations } from "./useBackgroundDecorations";
import "./BackgroundDecorations.css";

export const BackgroundDecorations: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { decorations } = useBackgroundDecorations(20);

  useGSAP(
    () => {
      const symbols = gsap.utils.toArray(".floating-symbol") as HTMLElement[];

      symbols.forEach((target) => {
        gsap.to(target, {
          x: `+=${gsap.utils.random(-150, 150)}`,
          y: `+=${gsap.utils.random(-150, 150)}`,
          rotation: gsap.utils.random(-180, 180),
          duration: gsap.utils.random(15, 30),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <div className="background-decorations-wrapper" ref={containerRef}>
      {decorations.map((item) => (
        <img
          key={item.id}
          className="floating-symbol"
          src={item.iconUrl}
          alt="deocation"
          aria-hidden="true"
          style={{
            left: `${item.startX}vw`,
            top: `${item.startY}vh`,
            transform: `scale(${item.scale})`,
          }}
        />
      ))}
    </div>
  );
};
