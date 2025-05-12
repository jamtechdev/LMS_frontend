import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

export const ProgressDemo: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-[60%]">
      <Progress value={progress} />
    </div>
  );
};
