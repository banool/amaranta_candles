import React, { useEffect, useState } from "react";

// A basic loading indicator whose trailing dots cycle 1 -> 2 -> 3 -> 1 so an
// in-flight fetch reads as activity rather than an empty result. Functional
// state update so the interval never closes over a stale count, and the
// interval is cleared on unmount.
const Loading = () => {
  const [dotCount, setDotCount] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount(count => (count % 3) + 1);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return <span>loading{".".repeat(dotCount)}</span>;
};

export default Loading;
