import { createRoot } from 'react-dom/client';
import { Playground } from './Playground';

const root = document.getElementById('root');
if (root) createRoot(root).render(<Playground />);
