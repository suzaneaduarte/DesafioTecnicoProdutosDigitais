import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    /* Cores principais */
    --primary: #EB043D;
    --primary-light: #FF1C55;
    --primary-dark: #D0043A;
    --primary-bg: rgba(235, 4, 61, 0.05);

    /* Tons neutros */
    --background: #F8FAFC;
    --surface: #FFFFFF;
    --text: #1E293B;
    --text-light: #64748B;
    --border: #E2E8F0;
    --border-light: #F1F5F9;

    /* Feedback */
    --error: #EF4444;
    --success: #22C55E;

    /* Elevação */
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.05);
    --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.05);

    /* Layout */
    --container-width: 1800px;
    --header-height: 120px;
    --section-spacing: 3rem;
    --content-spacing: 2rem;

    /* Border Radius */
    --radius-sm: 6px;
    --radius-md: 8px;
    --radius-lg: 12px;

    /* Transitions */
    --transition-fast: 0.15s ease;
    --transition-normal: 0.25s ease;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: var(--background);
    color: var(--text);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    line-height: 1.5;
  }

  button {
    cursor: pointer;
  }

  /* Estilos base para inputs e botões */
  input, select, textarea, button {
    font-family: inherit;
  }

  /* Estilos para scrollbar personalizada */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--background);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--border);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--text-light);
  }

  /* Utilitários de texto */
  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.2;
    color: var(--text);
  }

  h1 { font-size: 2.5rem; }
  h2 { font-size: 2rem; }
  h3 { font-size: 1.75rem; }
  h4 { font-size: 1.5rem; }
  h5 { font-size: 1.25rem; }
  h6 { font-size: 1rem; }

  @media (max-width: 768px) {
    html {
      font-size: 87.5%; // 14px
    }
  }
`; 