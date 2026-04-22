import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Loader2, RotateCcw, Save } from 'lucide-react';

interface Props { adminPassword: string }

const HSL_DEFAULTS = {
  'theme.brandPrimary': '190 85% 55%',
  'theme.brandAccent': '220 90% 60%',
  'theme.brandPrimaryDark': '190 85% 55%',
  'theme.brandAccentDark': '220 90% 60%',
  'theme.backgroundLight': '240 5% 96%',
  'theme.backgroundDark': '270 8% 12%',
};
type HslKey = keyof typeof HSL_DEFAULTS;

const FONT_DEFAULTS = {
  'theme.fontHeading': 'Space Grotesk',
  'theme.fontBody': 'Inter',
};
type FontKey = keyof typeof FONT_DEFAULTS;

const FONT_OPTIONS = [
  'Inter', 'Space Grotesk', 'Roboto', 'Open Sans', 'Lato',
  'Montserrat', 'Poppins', 'Raleway', 'Playfair Display', 'Merriweather',
  'Source Sans 3', 'IBM Plex Sans', 'Work Sans', 'DM Sans',
];

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

const COLOR_FIELDS: { key: HslKey; label: string; section: 'brand' | 'background' }[] = [
  { key: 'theme.brandPrimary', label: 'Brand Primary (Light)', section: 'brand' },
  { key: 'theme.brandAccent', label: 'Brand Accent (Light)', section: 'brand' },
  { key: 'theme.brandPrimaryDark', label: 'Brand Primary (Dark)', section: 'brand' },
  { key: 'theme.brandAccentDark', label: 'Brand Accent (Dark)', section: 'brand' },
  { key: 'theme.backgroundLight', label: 'Page Background (Light)', section: 'background' },
  { key: 'theme.backgroundDark', label: 'Page Background (Dark)', section: 'background' },
];

export function AppearanceAdmin({ adminPassword }: Props) {
  const { toast } = useToast();
  const { data: settings, isLoading } = useQuery<Record<string, string>>({
    queryKey: ['/api/site/settings'],
  });

  const [hsl, setHsl] = useState<Record<HslKey, string>>({ ...HSL_DEFAULTS });
  const [fonts, setFonts] = useState<Record<FontKey, string>>({ ...FONT_DEFAULTS });

  useEffect(() => {
    if (!settings) return;
    const nextHsl = { ...HSL_DEFAULTS };
    (Object.keys(HSL_DEFAULTS) as HslKey[]).forEach(k => {
      if (settings[k]) nextHsl[k] = settings[k];
    });
    setHsl(nextHsl);
    const nextFonts = { ...FONT_DEFAULTS };
    (Object.keys(FONT_DEFAULTS) as FontKey[]).forEach(k => {
      if (settings[k] && FONT_OPTIONS.includes(settings[k])) nextFonts[k] = settings[k];
    });
    setFonts(nextFonts);
  }, [settings]);

  const saveMutation = useMutation({
    mutationFn: async (entries: { key: string; value: string }[]) => {
      const res = await fetch('/api/site/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminPassword}` },
        body: JSON.stringify({ entries }),
      });
      if (!res.ok) {
        const txt = await res.text();
        try { throw new Error(JSON.parse(txt).error || txt); }
        catch { throw new Error(txt || 'Save failed'); }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/site/settings'] });
      reloadThemeCss();
      toast({ title: 'Saved', description: 'Theme updated' });
    },
    onError: (e: Error) => toast({ title: 'Error', description: e.message, variant: 'destructive' }),
  });

  const invalidKeys = (Object.keys(hsl) as HslKey[]).filter(k => !isValidHsl(hsl[k]));

  const buildEntries = () => [
    ...(Object.keys(hsl) as HslKey[]).map(k => ({ key: k, value: hsl[k].trim() })),
    ...(Object.keys(fonts) as FontKey[]).map(k => ({ key: k, value: fonts[k] })),
  ];

  const handleSave = () => {
    if (invalidKeys.length > 0) {
      toast({
        title: 'Invalid color value',
        description: `Fix: ${invalidKeys.join(', ')}. Format: H S% L% (H 0-360, S/L 0-100)`,
        variant: 'destructive',
      });
      return;
    }
    saveMutation.mutate(buildEntries());
  };

  const handleReset = () => {
    setHsl({ ...HSL_DEFAULTS });
    setFonts({ ...FONT_DEFAULTS });
    const entries = [
      ...(Object.keys(HSL_DEFAULTS) as HslKey[]).map(k => ({ key: k, value: HSL_DEFAULTS[k] })),
      ...(Object.keys(FONT_DEFAULTS) as FontKey[]).map(k => ({ key: k, value: FONT_DEFAULTS[k] })),
    ];
    saveMutation.mutate(entries);
  };

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-2 text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Loading…</div>
      </Card>
    );
  }

  const brandFields = COLOR_FIELDS.filter(f => f.section === 'brand');
  const bgFields = COLOR_FIELDS.filter(f => f.section === 'background');

  const renderColorField = (f: { key: HslKey; label: string }) => {
    const hex = hslToHex(hsl[f.key]);
    const valid = isValidHsl(hsl[f.key]);
    return (
      <div key={f.key} className="space-y-2">
        <Label htmlFor={`color-${f.key}`}>{f.label}</Label>
        <div className="flex items-center gap-3">
          <input
            id={`color-${f.key}`}
            type="color"
            value={hex}
            onChange={e => setHsl(v => ({ ...v, [f.key]: hexToHsl(e.target.value) }))}
            className="h-10 w-14 rounded-md border border-border bg-transparent cursor-pointer"
            data-testid={`input-color-${f.key.split('.')[1]}`}
          />
          <Input
            value={hsl[f.key]}
            onChange={e => setHsl(v => ({ ...v, [f.key]: e.target.value }))}
            placeholder="H S% L%"
            className={`font-mono text-sm ${!valid ? 'border-destructive' : ''}`}
            data-testid={`input-hsl-${f.key.split('.')[1]}`}
          />
        </div>
        {!valid && <div className="text-xs text-destructive">Invalid HSL — use <code>H S% L%</code></div>}
      </div>
    );
  };

  return (
    <Card className="p-6 space-y-6" data-testid="card-appearance">
      <div>
        <h2 className="text-xl font-semibold mb-1">Appearance</h2>
        <p className="text-sm text-muted-foreground">
          Customize brand colors, page backgrounds, and typography across the site.
          Changes apply immediately on save.
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium">Brand Colors</h3>
        <div className="grid sm:grid-cols-2 gap-4">{brandFields.map(renderColorField)}</div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium">Page Backgrounds</h3>
        <div className="grid sm:grid-cols-2 gap-4">{bgFields.map(renderColorField)}</div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium">Typography</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="font-heading">Heading Font</Label>
            <Select value={fonts['theme.fontHeading']} onValueChange={v => setFonts(f => ({ ...f, 'theme.fontHeading': v }))}>
              <SelectTrigger id="font-heading" data-testid="select-font-heading"><SelectValue /></SelectTrigger>
              <SelectContent>
                {FONT_OPTIONS.map(o => <SelectItem key={o} value={o} style={{ fontFamily: `${o}, sans-serif` }}>{o}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="font-body">Body Font</Label>
            <Select value={fonts['theme.fontBody']} onValueChange={v => setFonts(f => ({ ...f, 'theme.fontBody': v }))}>
              <SelectTrigger id="font-body" data-testid="select-font-body"><SelectValue /></SelectTrigger>
              <SelectContent>
                {FONT_OPTIONS.map(o => <SelectItem key={o} value={o} style={{ fontFamily: `${o}, sans-serif` }}>{o}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="rounded-md border border-border p-4 space-y-3">
        <div className="text-sm font-medium">Live Preview</div>
        <div
          className="h-16 rounded-md"
          style={{
            background: `linear-gradient(to right, hsl(${hsl['theme.brandPrimary']}), hsl(${hsl['theme.brandAccent']}))`,
          }}
          data-testid="preview-gradient-light"
        />
        <div
          className="h-16 rounded-md"
          style={{
            background: `linear-gradient(to right, hsl(${hsl['theme.brandPrimaryDark']}), hsl(${hsl['theme.brandAccentDark']}))`,
          }}
          data-testid="preview-gradient-dark"
        />
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="rounded-md p-3 border border-border" style={{ background: `hsl(${hsl['theme.backgroundLight']})`, color: '#111' }}>
            <div style={{ fontFamily: `${fonts['theme.fontHeading']}, sans-serif` }} className="text-lg font-bold">Heading sample</div>
            <div style={{ fontFamily: `${fonts['theme.fontBody']}, sans-serif` }} className="text-sm">Light background body text</div>
          </div>
          <div className="rounded-md p-3 border border-border" style={{ background: `hsl(${hsl['theme.backgroundDark']})`, color: '#eee' }}>
            <div style={{ fontFamily: `${fonts['theme.fontHeading']}, sans-serif` }} className="text-lg font-bold">Heading sample</div>
            <div style={{ fontFamily: `${fonts['theme.fontBody']}, sans-serif` }} className="text-sm">Dark background body text</div>
          </div>
        </div>
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
