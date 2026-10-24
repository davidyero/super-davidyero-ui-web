// Los consumidores instalan por git, así que `dist/` va commiteado. Este check
// (en CI, después de `npm run build`) falla si el build no coincide con lo
// commiteado: alguien cambió `src/` y no regeneró `dist/`.
import { execSync } from 'node:child_process';

const diff = execSync('git status --porcelain -- dist', { encoding: 'utf8' }).trim();
if (diff) {
  console.error(
    '✗ check-dist: dist/ no está al día con src/. Corre `npm run build` y commitea dist/.',
  );
  console.error(diff);
  process.exit(1);
}
console.log('✓ check-dist: dist/ al día');
