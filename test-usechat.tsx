import { renderToString } from 'react-dom/server';
import { useChat } from '@ai-sdk/react';
import React from 'react';

function Test() {
  const chat = useChat();
  console.log("KEYS:", Object.keys(chat));
  return <div>Test</div>;
}

try {
  console.log(renderToString(<Test />));
} catch (e) {
  console.error("ERROR:", e);
}
