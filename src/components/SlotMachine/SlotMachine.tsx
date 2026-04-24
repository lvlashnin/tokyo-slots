import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useGameStore } from "../../store/useGameStore";
import { useShallow } from "zustand/react/shallow";
import { Reel } from "./Reel";
import "./SlotMachine.css";

export const SlotMachine: React.FC = () => {
  const { reels, status } = useGameStore(
    useShallow((state) => ({
      reels: state.reels,
      status: state.status,
    })),
  );

  const machineRef = useRef<HTMLDivElement>(null);
  const leverRef = useRef<HTMLDivElement>(null);
  const leftArmRef = useRef<HTMLDivElement>(null);
  const rightArmRef = useRef<HTMLDivElement>(null);

  const isSpinning = status === "spinning";

  useGSAP(
    () => {
      gsap.to(".pupil", {
        x: "random(-4, 4)",
        y: "random(-3, 3)",
        duration: "random(0.5, 2)",
        ease: "sine.inOut",
        repeat: -1,
        repeatRefresh: true,
      });

      gsap.to([leftArmRef.current, rightArmRef.current], {
        rotation: "random(-5, 5)",
        y: -4,
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    },
    { scope: machineRef },
  );

  useGSAP(() => {
    if (isSpinning) {
      const tl = gsap.timeline();

      tl.to(leverRef.current, {
        rotationX: 60,
        y: 25,
        z: 10,
        duration: 0.2,
        ease: "power2.in",
      }).to(leverRef.current, {
        rotationX: 0,
        y: 0,
        z: 0,
        duration: 0.3,
        ease: "back.out(1.7)",
      });
    }
  }, [isSpinning]);

  return (
    <div className="slot-machine-scaler">
      <div className="slot-machine-wrapper" ref={machineRef}>
        <div className="reels-container">
          {reels.map((targetSymbol, index) => (
            <Reel
              key={index}
              index={index}
              targetSymbol={targetSymbol}
              isSpinning={isSpinning}
            />
          ))}
        </div>
        <div className="slot-body-layer">
          <div className="eye left-eye">
            <div className="pupil"></div>
          </div>
          <div className="eye right-eye">
            <div className="pupil"></div>
          </div>
          <div className="arm left-arm" ref={leftArmRef}></div>
          <div className="arm right-arm" ref={rightArmRef}></div>
          <div className="lever-handle" ref={leverRef}></div>
        </div>
      </div>
    </div>
  );
};
