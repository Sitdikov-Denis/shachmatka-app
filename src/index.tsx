import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Добавляем функцию mount в глобальный объект window
declare global {
  interface Window {
    mount: (id: string) => void;
  }
}

window.mount = function(id: string) {
  const rootElement = document.getElementById(id);

  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />  {/* Рендерим App без пропсов */}
      </React.StrictMode>
    );
  }
};

// Опционально: автозапуск на элемент с id 'root', если он присутствует на странице
if (document.getElementById('root')) {
  window.mount('root');
}

// Для измерения производительности
reportWebVitals();
