import { useState, useEffect } from 'react';

export interface UseTypewriterProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

/**
 * A custom React hook that creates a typewriter typing effect.
 */
export function useTypewriter({
  texts,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 2000,
}: UseTypewriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    if (!texts || texts.length === 0) return;

    const currentText = texts[loopNum % texts.length];
    let timeoutId: ReturnType<typeof setTimeout>;

    if (isDeleting) {
      if (displayText.length === 0) {
        // Finished deleting, move to next word
        setIsDeleting(false);
        setLoopNum((prev) => prev + 1);
      } else {
        // Keep deleting
        timeoutId = setTimeout(() => {
          setDisplayText((prev) => prev.slice(0, -1));
        }, deletingSpeed);
      }
    } else {
      if (displayText.length === currentText.length) {
        // Finished typing, pause before deleting
        timeoutId = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      } else {
        // Keep typing
        timeoutId = setTimeout(() => {
          setDisplayText(currentText.substring(0, displayText.length + 1));
        }, typingSpeed);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [displayText, isDeleting, loopNum, texts, typingSpeed, deletingSpeed, pauseDuration]);

  return {
    displayText,
    isTyping: !isDeleting,
  };
}