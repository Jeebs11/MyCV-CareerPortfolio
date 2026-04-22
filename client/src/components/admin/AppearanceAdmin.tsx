import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Loader2, RotateCcw, Save } from 'lucide-react';

interface Props { adminPassword: string }

const DEFAULTS = {
  'theme.brandPrimary': '190 85% 55%',
  'theme.brandAccent': '220 90% 60%',
  'theme.brandPrimaryDark': '190 85% 55%',
  'theme.brandAccentDark': '220 90% 60%',
};
type ThemeKey = keyof typeof DEFAULTS;

function hslToHex(hsl: string): string {
  const m = hsl.trim().match(/^(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%$/);
  if (!m) return '#000000';
  const h = +m[1], s = +m[2] / 100, l = +m[3] / 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const mm = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  const toHex = (v: number) => Math.round((v + mm) * 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function hexToHsl(hex: string): string {
  const m = hex.replace('#', '').match(/^([0-9a-f]{6})$/i);
  if (!m) return '0 0% 0%';
  const num = parseInt(m[1], 16);
  const r = ((num >> 16) & 255) / 255;
  const g = ((num >> 8) & 255) / 255;
  const b = (num & 255) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0; const l = (max + min) / 2;
  const d = max - min;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h = Math.round(h * 60); if (h < 0) h += 360;
  }
  return `${h} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

function isValidHsl(v: string): boolean {
  const m = v.trim().match(/^(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%$/);
  if (!m) return false;
  const h = parseFloat(m[1]), s = parseFloat(m[2]), l = parseFloat(m[3]);
  return h >= 0 && h <= 360 && s >= 0 && s <= 100 && l >= 0 && l <= 100;
}

function reloadThemeCss() {
  const links = document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]');
  links.forEach(l => {
    if (l.href.includes('/api/theme.css')) {
      const url = new URL(l.href);
      url.searchParams.set('t', Date.now().toString());
      l.href = url.toString();
    }
  });
}

const FIELDS: { key: ThemeKey; label: string }[] = [
  { key: 'theme.brandPrimary', label: 'Brand Primary (Light)' },
  { key: 'theme.brandAccent', label: 'Brand Accent (Light)' },
  { key: 'theme.brandPrimaryDark', label: 'Brand Primary (Dark)' },
  { key: 'theme.brandAccentDark', label: 'Brand Accent (Dark)' },
];

export function AppearanceAdmin({ adminPassword }: Props) {
  const { toast } = useToast();
  const { data: settings, isLoading } = useQuery<Record<string, string>>({
    queryKey: ['/api/site/settings'],
  });

  const [values, setValues] = useState<Record<ThemeKey, string>>({ ...DEFAULTS });

  useEffect(() => {
    if (!settings) return;
    const next = { ...DEFAULTS };
    (Object.keys(DEFAULTS) as ThemeKey[]).forEach(k => {
      if (settings[k]) next[k] = settings[k];
    });
    setValues(next);
  }, [settings]);

  const saveMutation = useMutation({
    mutationFn: async (entries: { key: string; value: string }[]) => {
      const res = await fetch('/api/site/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminPassword}` },
        body: JSON.stringify({ entries }),
      });
      if (!res.ok) throw new Error(await res.text() || 'Save failed');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/site/settings'] });
      reloadThemeCss();
      toast({ title: 'Saved', description: 'Theme updated' });
    },
    onError: (e: Error) => toast({ title: 'Error', description: e.message, variant: 'destructive' }),
  });

  const invalidKeys = (Object.keys(values) as ThemeKey[]).filter(k => !isValidHsl(values[k]));

  const handleSave = () => {
    if (invalidKeys.length > 0) {
      toast({
        title: 'Invalid color value',
        description: `Fix: ${invalidKeys.join(', ')}. Format: H S% L% (H 0-360, S/L 0-100)`,
        variant: 'destructive',
      });
      return;
    }
    const entries = (Object.keys(values) as ThemeKey[]).map(k => ({ key: k, value: values[k].trim() }));
    saveMutation.mutate(entries);
  };

  const handleReset = () => {
    setValues({ ...DEFAULTS });
    const entries = (Object.keys(DEFAULTS) as ThemeKey[]).map(k => ({ key: k, value: DEFAULTS[k] }));
    saveMutation.mutate(entries);
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-2 text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Loading…</div>
      </Card>
    );
  }

  return (
    <Card className="p-6 space-y-6" data-testid="card-appearance">
      <div>
        <h2 className="text-xl font-semibold mb-1">Appearance</h2>
        <p className="text-sm text-muted-foreground">
          Customize the brand colors used in gradients, accents and highlights across the site.
          Changes apply immediately on save.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {FIELDS.map(f => {
          const hex = hslToHex(values[f.key]);
          return (
            <div key={f.key} className="space-y-2">
              <Label htmlFor={`color-${f.key}`}>{f.label}</Label>
              <div className="flex items-center gap-3">
                <input
                  id={`color-${f.key}`}
                  type="color"
                  value={hex}
                  onChange={e => setValues(v => ({ ...v, [f.key]: hexToHsl(e.target.value) }))}
                  className="h-10 w-14 rounded-md border border-border bg-transparent cursor-pointer"
                  data-testid={`input-color-${f.key.split('.')[1]}`}
                />
                <Input
                  value={values[f.key]}
                  onChange={e => setValues(v => ({ ...v, [f.key]: e.target.value }))}
                  placeholder="H S% L%"
                  className="font-mono text-sm"
                  data-testid={`input-hsl-${f.key.split('.')[1]}`}
                />
              </div>
              <div className="text-xs text-muted-foreground">Format: <code>H S% L%</code> (e.g. 190 85% 55%)</div>
            </div>
          );
        })}
      </div>

      <div className="rounded-md border border-border p-4">
        <div className="text-sm font-medium mb-2">Live Preview</div>
        <div
          className="h-16 rounded-md"
          style={{
            background: `linear-gradient(to right, hsl(${values['theme.brandPrimary']}), hsl(${values['theme.brandAccent']}))`,
          }}
        />
        <div className="mt-2 text-xs text-muted-foreground">Light-mode gradient. Dark mode uses the dark pair.</div>
      </div>

      <div className="flex gap-3">
        <Button onClick={handleSave} disabled={saveMutation.isPending || invalidKeys.length > 0} data-testid="button-save-theme">
          {saveMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
          Save Theme
        </Button>
        <Button variant="outline" onClick={handleReset} disabled={saveMutation.isPending} data-testid="button-reset-theme">
          <RotateCcw className="h-4 w-4 mr-2" />
          Restore Defaults
        </Button>
      </div>
    </Card>
  );
}
