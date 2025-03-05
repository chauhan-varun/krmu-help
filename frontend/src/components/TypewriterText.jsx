import { useEffect, useState } from 'react';

function TypewriterText({ text, typingSpeed = 100, pauseDuration = 3000 }) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    let typingTimer;
    let pauseTimer;

    const typeNextCharacter = () => {
      if (currentIndex < text.length) {
        setDisplayText(text.substring(0, currentIndex + 1));
        currentIndex++;
        typingTimer = setTimeout(typeNextCharacter, typingSpeed);
      } else {
        setIsTyping(false);
        pauseTimer = setTimeout(resetTyping, pauseDuration);
      }
    };

    const resetTyping = () => {
      currentIndex = 0;
      setDisplayText('');
      setIsTyping(true);
      typingTimer = setTimeout(typeNextCharacter, typingSpeed);
    };

    typingTimer = setTimeout(typeNextCharacter, typingSpeed);

    return () => {
      clearTimeout(typingTimer);
      clearTimeout(pauseTimer);
    };
  }, [text, typingSpeed, pauseDuration]);

  return (
    <div className="inline-flex items-center">
      <span>{displayText}</span>
      <span className={`w-0.5 h-6 bg-blue-400 ml-1 ${isTyping ? 'animate-blink' : ''}`}></span>
    </div>
  );
}

export default TypewriterText;