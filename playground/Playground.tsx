// Página de desarrollo (no se publica): todos los componentes con dos juegos de
// tokens y en claro/oscuro. Los textos son de demo, no de una app real.
import styled from '@emotion/styled';
import { useState, type ReactElement, type ReactNode } from 'react';
import { SuperAlert } from '../src/components/SuperAlert/SuperAlert';
import { SuperAvatar } from '../src/components/SuperAvatar/SuperAvatar';
import { SuperBadge } from '../src/components/SuperBadge/SuperBadge';
import { SuperBulletList } from '../src/components/SuperBulletList/SuperBulletList';
import { SuperButton } from '../src/components/SuperButton/SuperButton';
import { SuperCard } from '../src/components/SuperCard/SuperCard';
import { SuperCheckbox } from '../src/components/SuperCheckbox/SuperCheckbox';
import { SuperDropdown } from '../src/components/SuperDropdown/SuperDropdown';
import { SuperEmptyState } from '../src/components/SuperEmptyState/SuperEmptyState';
import { SuperInput } from '../src/components/SuperInput/SuperInput';
import { SuperLoader } from '../src/components/SuperLoader/SuperLoader';
import { SuperLoaderOverlay } from '../src/components/SuperLoaderOverlay/SuperLoaderOverlay';
import { SuperModal } from '../src/components/SuperModal/SuperModal';
import { SuperProgressBar } from '../src/components/SuperProgressBar/SuperProgressBar';
import { SuperSkeleton } from '../src/components/SuperSkeleton/SuperSkeleton';
import { SuperSwitch } from '../src/components/SuperSwitch/SuperSwitch';
import { SuperTabs } from '../src/components/SuperTabs/SuperTabs';
import { SuperTextarea } from '../src/components/SuperTextarea/SuperTextarea';
import { SuperToast } from '../src/components/SuperToast/SuperToast';
import { SuperTooltip } from '../src/components/SuperTooltip/SuperTooltip';
import { SuperTypography } from '../src/components/SuperTypography/SuperTypography';
import { loaderStore } from '../src/stores/loaderStore';
import { toast } from '../src/stores/toastStore';
import { SuperThemeProvider } from '../src/theme/SuperThemeProvider';
import { defineTokens, type SuperThemeMode } from '../src/theme/tokens';
import { v } from '../src/theme/vars';

// Dos "apps" con la misma lógica y distinta piel.
const APPS = {
  indigo: defineTokens({ light: {}, dark: {} }),
  lingovida: defineTokens({
    light: {
      primary: '#0f766e',
      primaryHover: '#115e59',
      primarySoft: '#e3f4f1',
      primarySoftText: '#134e4a',
      focusRing: 'rgba(15, 118, 110, 0.4)',
      radius: { sm: '10px', md: '14px', lg: '22px' },
      fontFamily: { base: "Georgia, 'Times New Roman', serif", heading: 'Georgia, serif' },
    },
    dark: {
      primary: '#2dd4bf',
      primaryHover: '#5eead4',
      onPrimary: '#042f2e',
      primarySoft: '#0f2e2b',
      primarySoftText: '#99f6e4',
      focusRing: 'rgba(45, 212, 191, 0.5)',
      radius: { sm: '10px', md: '14px', lg: '22px' },
      fontFamily: { base: "Georgia, 'Times New Roman', serif", heading: 'Georgia, serif' },
    },
  }),
} as const;

const LABELS = {
  showPassword: 'Mostrar contraseña',
  hidePassword: 'Ocultar contraseña',
  close: 'Cerrar',
  loading: 'Cargando',
  dismiss: 'Descartar',
};

const Page = styled.div({
  minHeight: '100vh',
  background: v.background,
  color: v.textBody,
  padding: '24px 16px 64px',
  fontFamily: v.font.base,
});
const Wrap = styled.div({ maxWidth: '1080px', margin: '0 auto', display: 'grid', gap: '20px' });
const Row = styled.div({ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' });
const Grid = styled.div({
  display: 'grid',
  gap: '16px',
  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
});

const Section = ({ title, children }: { title: string; children: ReactNode }): ReactElement => (
  <SuperCard>
    <div style={{ display: 'grid', gap: 12 }}>
      <SuperTypography variant="h3" as="h2">
        {title}
      </SuperTypography>
      {children}
    </div>
  </SuperCard>
);

// ?mode=dark&app=lingovida para abrir directamente una combinación.
const params = new URLSearchParams(window.location.search);
const initialMode: SuperThemeMode = params.get('mode') === 'dark' ? 'dark' : 'light';
const initialApp: keyof typeof APPS = params.get('app') === 'lingovida' ? 'lingovida' : 'indigo';

export const Playground = (): ReactElement => {
  const [mode, setMode] = useState<SuperThemeMode>(initialMode);
  const [app, setApp] = useState<keyof typeof APPS>(initialApp);
  const [tab, setTab] = useState('a');
  const [modal, setModal] = useState(false);
  const [on, setOn] = useState(true);
  const [check, setCheck] = useState(false);
  const [lang, setLang] = useState<'es' | 'en' | ''>('');
  const [text, setText] = useState('');

  const fakeRequest = (): void => {
    void loaderStore.track(new Promise((r) => setTimeout(r, 1500)));
  };

  return (
    <SuperThemeProvider mode={mode} tokens={APPS[app]} labels={LABELS}>
      <Page>
        <Wrap>
          <Row>
            <SuperTypography variant="display">ui-web</SuperTypography>
            <SuperSwitch
              checked={mode === 'dark'}
              onChange={(c) => setMode(c ? 'dark' : 'light')}
              label="Modo oscuro"
            />
            <SuperDropdown
              ariaLabel="App"
              value={app}
              onChange={setApp}
              options={[
                { value: 'indigo', label: 'Tokens por defecto' },
                { value: 'lingovida', label: 'Tokens tipo LingoVida' },
              ]}
            />
          </Row>

          <Section title="Tipografía">
            {(['h1', 'h2', 'h3', 'title', 'subtitle', 'body', 'caption', 'label'] as const).map(
              (t) => (
                <SuperTypography key={t} variant={t}>
                  {t} · El veloz murciélago hindú comía feliz cardillo y kiwi
                </SuperTypography>
              ),
            )}
          </Section>

          <Section title="Botones">
            <Row>
              {(['primary', 'secondary', 'outline', 'ghost', 'danger'] as const).map((variant) => (
                <SuperButton key={variant} variant={variant}>
                  {variant}
                </SuperButton>
              ))}
            </Row>
            <Row>
              <SuperButton loading>Guardando</SuperButton>
              <SuperButton disabled>Deshabilitado</SuperButton>
              <SuperButton size="sm" leftIcon="check">
                Pequeño
              </SuperButton>
              <SuperButton size="lg" rightIcon="chevronDown">
                Grande
              </SuperButton>
              <SuperButton href="https://davidyero.com" variant="outline">
                Enlace externo
              </SuperButton>
            </Row>
          </Section>

          <Grid>
            <Section title="Formulario">
              <SuperInput label="Email" type="email" placeholder="tu@correo.com" fullWidth />
              <SuperInput label="Contraseña" type="password" hint="Mínimo 8 caracteres" fullWidth />
              <SuperInput
                label="Usuario"
                error="Ese usuario ya existe"
                defaultValue="david"
                fullWidth
              />
              <SuperDropdown
                label="Idioma"
                placeholder="Elige uno"
                value={lang}
                onChange={setLang}
                options={[
                  { value: 'es', label: 'Español' },
                  { value: 'en', label: 'English' },
                ]}
                fullWidth
              />
              <SuperTextarea
                label="Mensaje"
                maxLength={140}
                showCount
                value={text}
                onChange={(e) => setText(e.target.value)}
                fullWidth
              />
              <SuperCheckbox checked={check} onChange={setCheck} label="Acepto los términos" />
              <SuperSwitch checked={on} onChange={setOn} label="Notificaciones" hint="Una al día" />
            </Section>

            <Section title="Estado">
              <Row>
                {(['neutral', 'primary', 'success', 'warning', 'danger', 'info'] as const).map(
                  (tone) => (
                    <SuperBadge key={tone} tone={tone} dot>
                      {tone}
                    </SuperBadge>
                  ),
                )}
              </Row>
              <SuperAlert tone="success" title="Guardado">
                Los cambios ya están en producción.
              </SuperAlert>
              <SuperAlert tone="warning" dismissible onDismiss={() => undefined}>
                La sesión caduca en 5 minutos.
              </SuperAlert>
              <SuperProgressBar label="Progreso" value={64} showValue />
              <SuperProgressBar label="Cuota" value={92} tone="danger" size="sm" />
              <Row>
                <SuperLoader />
                <SuperAvatar name="David Yero" />
                <SuperAvatar name="Ana María" size={44} />
                <SuperTooltip label="Copia el enlace">
                  <SuperButton variant="ghost" iconOnly leftIcon="check" aria-label="Copiar" />
                </SuperTooltip>
              </Row>
            </Section>

            <Section title="Carga y vacío">
              <SuperSkeleton variant="circle" />
              <SuperSkeleton variant="text" lines={3} />
              <SuperSkeleton height="60px" />
              <SuperEmptyState
                compact
                title="Aún no hay apps"
                description="Cuando publiques una, aparecerá aquí."
                action={<SuperButton size="sm">Dar de alta</SuperButton>}
              />
            </Section>
          </Grid>

          <Section title="Navegación y capas">
            <SuperTabs
              ariaLabel="Secciones"
              value={tab}
              onChange={setTab}
              items={[
                { id: 'a', label: 'Dominios', count: 30 },
                { id: 'b', label: 'Base de datos', count: 212 },
                { id: 'c', label: 'Jobs' },
                { id: 'd', label: 'Changelog', disabled: true },
              ]}
            />
            <SuperBulletList
              items={['Un único marcador en toda la app', 'Variantes por props', 'Tokens por app']}
            />
            <Row>
              <SuperButton onClick={() => setModal(true)}>Abrir modal</SuperButton>
              <SuperButton variant="secondary" onClick={fakeRequest}>
                Petición falsa (overlay)
              </SuperButton>
              <SuperButton
                variant="outline"
                onClick={() => toast.success('Guardado correctamente')}
              >
                Toast
              </SuperButton>
              <SuperButton variant="danger" onClick={() => toast.error('No se pudo borrar')}>
                Toast de error
              </SuperButton>
            </Row>
          </Section>
        </Wrap>

        <SuperModal
          open={modal}
          onClose={() => setModal(false)}
          title="Borrar la app"
          footer={
            <>
              <SuperButton variant="ghost" onClick={() => setModal(false)}>
                Cancelar
              </SuperButton>
              <SuperButton variant="danger" onClick={() => setModal(false)}>
                Borrar
              </SuperButton>
            </>
          }
        >
          <SuperTypography>Esta acción no se puede deshacer.</SuperTypography>
        </SuperModal>
        <SuperLoaderOverlay />
        <SuperToast />
      </Page>
    </SuperThemeProvider>
  );
};
