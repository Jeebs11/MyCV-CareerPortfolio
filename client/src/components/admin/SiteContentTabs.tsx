import { useState, useMemo, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown, Save } from 'lucide-react';
import type {
  CareerRoleRow, InsertCareerRole,
  FlagshipWinRow, InsertFlagshipWin,
  SiteSkillRow, InsertSiteSkill,
} from '@shared/schema';

interface AdminProps { adminPassword: string; }

const inputCls = 'bg-white/5 border-white/20 text-white';

function arrayToText(arr: string[] | null | undefined): string {
  return (arr || []).join('\n');
}
function textToArray(text: string): string[] {
  return text.split('\n').map(s => s.trim()).filter(Boolean);
}

async function authedFetch(url: string, method: string, pwd: string, body?: unknown): Promise<Response> {
  const headers: Record<string, string> = { Authorization: `Bearer ${pwd}` };
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  const res = await fetch(url, { method, headers, body: body !== undefined ? JSON.stringify(body) : undefined });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status}: ${text || res.statusText}`);
  }
  return res;
}

// ============ CAREER ROLES TAB ============
type CareerFormState = Partial<InsertCareerRole> & { keyAchievementsText?: string; technologiesText?: string };

export function CareerRolesAdmin({ adminPassword }: AdminProps) {
  const { toast } = useToast();
  const { data: roles = [], isLoading } = useQuery<CareerRoleRow[]>({ queryKey: ['/api/site/career-roles'] });
  const [editing, setEditing] = useState<CareerRoleRow | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<CareerFormState>({});

  const openCreate = () => {
    setEditing(null);
    setForm({ employmentType: 'Permanent', current: false, keyAchievementsText: '', technologiesText: '' });
    setCreating(true);
  };
  const openEdit = (role: CareerRoleRow) => {
    setEditing(role);
    setForm({
      ...role,
      keyAchievementsText: arrayToText(role.keyAchievements),
      technologiesText: arrayToText(role.technologies ?? []),
    });
    setCreating(true);
  };

  const saveMutation = useMutation({
    mutationFn: async (data: CareerFormState) => {
      const payload = {
        role: data.role,
        company: data.company,
        location: data.location || null,
        period: data.period,
        startDate: data.startDate || null,
        endDate: data.endDate || null,
        current: !!data.current,
        industry: data.industry || null,
        projectType: data.projectType || null,
        description: data.description || null,
        keyAchievements: textToArray(data.keyAchievementsText || ''),
        budget: data.budget || null,
        teamSize: data.teamSize ? Number(data.teamSize) : null,
        technologies: textToArray(data.technologiesText || ''),
        employmentType: data.employmentType || 'Permanent',
        logoUrl: data.logoUrl || null,
        sortOrder: data.sortOrder ?? roles.length,
      };
      if (editing) return authedFetch(`/api/site/career-roles/${editing.id}`, 'PATCH', adminPassword, payload);
      return authedFetch('/api/site/career-roles', 'POST', adminPassword, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/site/career-roles'] });
      setCreating(false);
      toast({ title: editing ? 'Role updated' : 'Role created' });
    },
    onError: (err: Error) => toast({ title: 'Save failed', description: err.message, variant: 'destructive' }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => authedFetch(`/api/site/career-roles/${id}`, 'DELETE', adminPassword),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['/api/site/career-roles'] }); toast({ title: 'Deleted' }); },
  });

  const reorderMutation = useMutation({
    mutationFn: async (orders: { id: number; sortOrder: number }[]) =>
      authedFetch('/api/site/career-roles/reorder', 'POST', adminPassword, { orders }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['/api/site/career-roles'] }),
  });

  const move = (idx: number, dir: -1 | 1) => {
    const target = idx + dir;
    if (target < 0 || target >= roles.length) return;
    const reordered = [...roles];
    [reordered[idx], reordered[target]] = [reordered[target], reordered[idx]];
    reorderMutation.mutate(reordered.map((r, i) => ({ id: r.id, sortOrder: i })));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center gap-3">
        <div>
          <h3 className="text-xl font-semibold text-white">Career Roles</h3>
          <p className="text-sm text-white/60">{roles.length} role{roles.length !== 1 ? 's' : ''} on home page</p>
        </div>
        <Button onClick={openCreate} data-testid="button-add-career-role"
          className="bg-gradient-to-r from-[hsl(190,85%,55%)] to-[hsl(220,90%,60%)] text-white border-0">
          <Plus className="w-4 h-4 mr-2" /> Add Role
        </Button>
      </div>
      {isLoading ? <p className="text-white/60">Loading...</p> : (
        <div className="space-y-2">
          {roles.map((r, idx) => (
            <Card key={r.id} className="bg-white/5 border-white/10 p-4 flex items-center gap-3" data-testid={`card-career-role-${r.id}`}>
              <div className="flex flex-col gap-1">
                <Button size="icon" variant="ghost" onClick={() => move(idx, -1)} disabled={idx === 0}
                  className="text-white/60 h-7 w-7" data-testid={`button-up-${r.id}`}><ArrowUp className="w-3 h-3" /></Button>
                <Button size="icon" variant="ghost" onClick={() => move(idx, 1)} disabled={idx === roles.length - 1}
                  className="text-white/60 h-7 w-7" data-testid={`button-down-${r.id}`}><ArrowDown className="w-3 h-3" /></Button>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-white truncate">{r.role}</div>
                <div className="text-sm text-white/60 truncate">{r.company} · {r.period}</div>
              </div>
              <Badge variant="outline" className="border-white/20 text-white/80">{r.employmentType}</Badge>
              <Button size="icon" variant="ghost" onClick={() => openEdit(r)} className="text-white/80" data-testid={`button-edit-${r.id}`}><Pencil className="w-4 h-4" /></Button>
              <Button size="icon" variant="ghost" onClick={() => { if (confirm(`Delete "${r.role}"?`)) deleteMutation.mutate(r.id); }}
                className="text-red-400" data-testid={`button-delete-${r.id}`}><Trash2 className="w-4 h-4" /></Button>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={creating} onOpenChange={setCreating}>
        <DialogContent className="bg-[hsl(270,8%,12%)] border-white/20 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing ? 'Edit Role' : 'Add Role'}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Role title *" value={form.role || ''} onChange={e => setForm({ ...form, role: e.target.value })} className={inputCls} data-testid="input-role-title" />
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="Company *" value={form.company || ''} onChange={e => setForm({ ...form, company: e.target.value })} className={inputCls} data-testid="input-role-company" />
              <Input placeholder="Location" value={form.location || ''} onChange={e => setForm({ ...form, location: e.target.value })} className={inputCls} />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <Input placeholder="Period (e.g. Jan 2024 - Present) *" value={form.period || ''} onChange={e => setForm({ ...form, period: e.target.value })} className={inputCls} />
              <Input placeholder="Start date (YYYY-MM)" value={form.startDate || ''} onChange={e => setForm({ ...form, startDate: e.target.value })} className={inputCls} />
              <Input placeholder="End date (YYYY-MM)" value={form.endDate || ''} onChange={e => setForm({ ...form, endDate: e.target.value })} className={inputCls} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="Industry" value={form.industry || ''} onChange={e => setForm({ ...form, industry: e.target.value })} className={inputCls} />
              <Input placeholder="Project type" value={form.projectType || ''} onChange={e => setForm({ ...form, projectType: e.target.value })} className={inputCls} />
            </div>
            <div className="grid grid-cols-3 gap-3 items-center">
              <Select value={form.employmentType || 'Permanent'} onValueChange={v => setForm({ ...form, employmentType: v })}>
                <SelectTrigger className={inputCls}><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Permanent">Permanent</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Freelance">Freelance</SelectItem>
                </SelectContent>
              </Select>
              <Input type="number" placeholder="Team size" value={form.teamSize ?? ''} onChange={e => setForm({ ...form, teamSize: e.target.value ? Number(e.target.value) : null })} className={inputCls} />
              <Input placeholder="Budget (e.g. £1.2M)" value={form.budget || ''} onChange={e => setForm({ ...form, budget: e.target.value })} className={inputCls} />
            </div>
            <Input placeholder="Logo URL (optional, used in career card)" value={form.logoUrl || ''} onChange={e => setForm({ ...form, logoUrl: e.target.value })} className={inputCls} />
            <Textarea placeholder="Description" value={form.description || ''} onChange={e => setForm({ ...form, description: e.target.value })} className={inputCls} rows={3} />
            <Textarea placeholder="Key achievements (one per line) *" value={form.keyAchievementsText || ''} onChange={e => setForm({ ...form, keyAchievementsText: e.target.value })} className={inputCls} rows={5} />
            <Textarea placeholder="Technologies (one per line)" value={form.technologiesText || ''} onChange={e => setForm({ ...form, technologiesText: e.target.value })} className={inputCls} rows={3} />
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setCreating(false)}>Cancel</Button>
              <Button onClick={() => saveMutation.mutate(form)} disabled={saveMutation.isPending}
                className="bg-gradient-to-r from-[hsl(190,85%,55%)] to-[hsl(220,90%,60%)] text-white border-0" data-testid="button-save-role">
                <Save className="w-4 h-4 mr-2" /> {saveMutation.isPending ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ============ FLAGSHIP WINS TAB ============
const FLAGSHIP_ICONS = ['Target', 'ShieldCheck', 'Leaf', 'TrendingUp', 'Award', 'Briefcase', 'Zap', 'CheckCircle'];
const FLAGSHIP_GRADIENTS = [
  { label: 'Blue/Cyan', value: 'from-blue-500 to-cyan-500' },
  { label: 'Orange/Red', value: 'from-orange-500 to-red-500' },
  { label: 'Green/Emerald', value: 'from-green-500 to-emerald-500' },
  { label: 'Purple/Pink', value: 'from-purple-500 to-pink-500' },
  { label: 'Indigo/Violet', value: 'from-indigo-500 to-violet-500' },
];

type FlagshipFormState = Partial<InsertFlagshipWin> & { metricsText?: string };

export function FlagshipWinsAdmin({ adminPassword }: AdminProps) {
  const { toast } = useToast();
  const { data: wins = [], isLoading } = useQuery<FlagshipWinRow[]>({ queryKey: ['/api/site/flagship-wins'] });
  const [editing, setEditing] = useState<FlagshipWinRow | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<FlagshipFormState>({});

  const openCreate = () => { setEditing(null); setForm({ icon: 'Target', colorGradient: FLAGSHIP_GRADIENTS[0].value, metricsText: '' }); setCreating(true); };
  const openEdit = (w: FlagshipWinRow) => { setEditing(w); setForm({ ...w, metricsText: arrayToText(w.metrics) }); setCreating(true); };

  const saveMutation = useMutation({
    mutationFn: async (data: FlagshipFormState) => {
      const payload = {
        title: data.title,
        company: data.company,
        period: data.period,
        metrics: textToArray(data.metricsText || ''),
        icon: data.icon || 'Target',
        colorGradient: data.colorGradient || FLAGSHIP_GRADIENTS[0].value,
        sortOrder: data.sortOrder ?? wins.length,
      };
      if (editing) return authedFetch(`/api/site/flagship-wins/${editing.id}`, 'PATCH', adminPassword, payload);
      return authedFetch('/api/site/flagship-wins', 'POST', adminPassword, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/site/flagship-wins'] });
      setCreating(false);
      toast({ title: editing ? 'Win updated' : 'Win created' });
    },
    onError: (err: Error) => toast({ title: 'Save failed', description: err.message, variant: 'destructive' }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => authedFetch(`/api/site/flagship-wins/${id}`, 'DELETE', adminPassword),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['/api/site/flagship-wins'] }); toast({ title: 'Deleted' }); },
  });

  const reorderMutation = useMutation({
    mutationFn: async (orders: { id: number; sortOrder: number }[]) =>
      authedFetch('/api/site/flagship-wins/reorder', 'POST', adminPassword, { orders }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['/api/site/flagship-wins'] }),
  });

  const move = (idx: number, dir: -1 | 1) => {
    const target = idx + dir;
    if (target < 0 || target >= wins.length) return;
    const arr = [...wins];
    [arr[idx], arr[target]] = [arr[target], arr[idx]];
    reorderMutation.mutate(arr.map((r, i) => ({ id: r.id, sortOrder: i })));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center gap-3">
        <div>
          <h3 className="text-xl font-semibold text-white">Flagship Wins</h3>
          <p className="text-sm text-white/60">{wins.length} card{wins.length !== 1 ? 's' : ''} on home page</p>
        </div>
        <Button onClick={openCreate} data-testid="button-add-flagship"
          className="bg-gradient-to-r from-[hsl(190,85%,55%)] to-[hsl(220,90%,60%)] text-white border-0">
          <Plus className="w-4 h-4 mr-2" /> Add Win
        </Button>
      </div>
      {isLoading ? <p className="text-white/60">Loading...</p> : (
        <div className="space-y-2">
          {wins.map((w, idx) => (
            <Card key={w.id} className="bg-white/5 border-white/10 p-4 flex items-center gap-3" data-testid={`card-flagship-${w.id}`}>
              <div className="flex flex-col gap-1">
                <Button size="icon" variant="ghost" onClick={() => move(idx, -1)} disabled={idx === 0} className="text-white/60 h-7 w-7"><ArrowUp className="w-3 h-3" /></Button>
                <Button size="icon" variant="ghost" onClick={() => move(idx, 1)} disabled={idx === wins.length - 1} className="text-white/60 h-7 w-7"><ArrowDown className="w-3 h-3" /></Button>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-white truncate">{w.title}</div>
                <div className="text-sm text-white/60 truncate">{w.company} · {w.period}</div>
              </div>
              <Badge variant="outline" className="border-white/20 text-white/80">{w.icon}</Badge>
              <Button size="icon" variant="ghost" onClick={() => openEdit(w)} className="text-white/80"><Pencil className="w-4 h-4" /></Button>
              <Button size="icon" variant="ghost" onClick={() => { if (confirm(`Delete "${w.title}"?`)) deleteMutation.mutate(w.id); }} className="text-red-400"><Trash2 className="w-4 h-4" /></Button>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={creating} onOpenChange={setCreating}>
        <DialogContent className="bg-[hsl(270,8%,12%)] border-white/20 text-white max-w-xl">
          <DialogHeader><DialogTitle>{editing ? 'Edit Win' : 'Add Win'}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Title *" value={form.title || ''} onChange={e => setForm({ ...form, title: e.target.value })} className={inputCls} data-testid="input-flagship-title" />
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="Company *" value={form.company || ''} onChange={e => setForm({ ...form, company: e.target.value })} className={inputCls} />
              <Input placeholder="Period *" value={form.period || ''} onChange={e => setForm({ ...form, period: e.target.value })} className={inputCls} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Select value={form.icon || 'Target'} onValueChange={v => setForm({ ...form, icon: v })}>
                <SelectTrigger className={inputCls}><SelectValue /></SelectTrigger>
                <SelectContent>{FLAGSHIP_ICONS.map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}</SelectContent>
              </Select>
              <Select value={form.colorGradient || FLAGSHIP_GRADIENTS[0].value} onValueChange={v => setForm({ ...form, colorGradient: v })}>
                <SelectTrigger className={inputCls}><SelectValue /></SelectTrigger>
                <SelectContent>{FLAGSHIP_GRADIENTS.map(g => <SelectItem key={g.value} value={g.value}>{g.label}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <Textarea placeholder="Metrics (one per line) *" value={form.metricsText || ''} onChange={e => setForm({ ...form, metricsText: e.target.value })} className={inputCls} rows={4} />
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setCreating(false)}>Cancel</Button>
              <Button onClick={() => saveMutation.mutate(form)} disabled={saveMutation.isPending}
                className="bg-gradient-to-r from-[hsl(190,85%,55%)] to-[hsl(220,90%,60%)] text-white border-0" data-testid="button-save-flagship">
                <Save className="w-4 h-4 mr-2" /> {saveMutation.isPending ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ============ SKILLS TAB ============
const SKILL_CATEGORIES = [
  { value: 'methodology', label: 'Methodologies' },
  { value: 'tool', label: 'Tools' },
  { value: 'certification', label: 'Certifications' },
  { value: 'industry', label: 'Industries' },
];

export function SiteSkillsAdmin({ adminPassword }: AdminProps) {
  const { toast } = useToast();
  const { data: skills = [], isLoading } = useQuery<SiteSkillRow[]>({ queryKey: ['/api/site/skills'] });
  const [editing, setEditing] = useState<SiteSkillRow | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<Partial<InsertSiteSkill>>({});
  const [filter, setFilter] = useState<string>('all');

  const filtered = useMemo(() => filter === 'all' ? skills : skills.filter(s => s.category === filter), [skills, filter]);

  const openCreate = () => { setEditing(null); setForm({ category: 'methodology' }); setCreating(true); };
  const openEdit = (s: SiteSkillRow) => { setEditing(s); setForm({ ...s }); setCreating(true); };

  const saveMutation = useMutation({
    mutationFn: async (data: Partial<InsertSiteSkill>) => {
      const payload = {
        category: data.category,
        name: data.name,
        status: data.status || null,
        sortOrder: data.sortOrder ?? skills.filter(s => s.category === data.category).length,
      };
      if (editing) return authedFetch(`/api/site/skills/${editing.id}`, 'PATCH', adminPassword, payload);
      return authedFetch('/api/site/skills', 'POST', adminPassword, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/site/skills'] });
      setCreating(false);
      toast({ title: 'Saved' });
    },
    onError: (err: Error) => toast({ title: 'Save failed', description: err.message, variant: 'destructive' }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => authedFetch(`/api/site/skills/${id}`, 'DELETE', adminPassword),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['/api/site/skills'] }); toast({ title: 'Deleted' }); },
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center gap-3 flex-wrap">
        <div>
          <h3 className="text-xl font-semibold text-white">Skills & Certifications</h3>
          <p className="text-sm text-white/60">Manage methodologies, tools, certifications, and industries</p>
        </div>
        <div className="flex gap-2 items-center">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className={`${inputCls} w-44`}><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {SKILL_CATEGORIES.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button onClick={openCreate} data-testid="button-add-skill"
            className="bg-gradient-to-r from-[hsl(190,85%,55%)] to-[hsl(220,90%,60%)] text-white border-0">
            <Plus className="w-4 h-4 mr-2" /> Add Skill
          </Button>
        </div>
      </div>

      {isLoading ? <p className="text-white/60">Loading...</p> : (
        <div className="grid sm:grid-cols-2 gap-2">
          {filtered.map(s => (
            <Card key={s.id} className="bg-white/5 border-white/10 p-3 flex items-center gap-3" data-testid={`card-skill-${s.id}`}>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-white truncate">{s.name}</div>
                <div className="text-xs text-white/50">{s.category}{s.status ? ` · ${s.status}` : ''}</div>
              </div>
              <Button size="icon" variant="ghost" onClick={() => openEdit(s)} className="text-white/80 h-8 w-8"><Pencil className="w-3 h-3" /></Button>
              <Button size="icon" variant="ghost" onClick={() => { if (confirm(`Delete "${s.name}"?`)) deleteMutation.mutate(s.id); }} className="text-red-400 h-8 w-8"><Trash2 className="w-3 h-3" /></Button>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={creating} onOpenChange={setCreating}>
        <DialogContent className="bg-[hsl(270,8%,12%)] border-white/20 text-white max-w-md">
          <DialogHeader><DialogTitle>{editing ? 'Edit Skill' : 'Add Skill'}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Select value={form.category || 'methodology'} onValueChange={v => setForm({ ...form, category: v })}>
              <SelectTrigger className={inputCls}><SelectValue /></SelectTrigger>
              <SelectContent>{SKILL_CATEGORIES.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent>
            </Select>
            <Input placeholder="Name *" value={form.name || ''} onChange={e => setForm({ ...form, name: e.target.value })} className={inputCls} data-testid="input-skill-name" />
            {form.category === 'certification' && (
              <Select value={form.status || ''} onValueChange={v => setForm({ ...form, status: v || null })}>
                <SelectTrigger className={inputCls}><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="certified">Certified</SelectItem>
                  <SelectItem value="pursuing">Pursuing</SelectItem>
                </SelectContent>
              </Select>
            )}
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setCreating(false)}>Cancel</Button>
              <Button onClick={() => saveMutation.mutate(form)} disabled={saveMutation.isPending}
                className="bg-gradient-to-r from-[hsl(190,85%,55%)] to-[hsl(220,90%,60%)] text-white border-0" data-testid="button-save-skill">
                <Save className="w-4 h-4 mr-2" /> Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ============ SITE SETTINGS TAB ============
const SETTING_GROUPS: { label: string; keys: { key: string; label: string; multi?: boolean }[] }[] = [
  {
    label: 'Hero Section',
    keys: [
      { key: 'hero.status_badge', label: 'Status badge text' },
      { key: 'hero.headline_main', label: 'Main headline' },
      { key: 'hero.headline_sub1', label: 'Sub headline 1' },
      { key: 'hero.headline_sub2', label: 'Sub headline 2' },
      { key: 'hero.headline_accent', label: 'Accent line (gradient)' },
    ],
  },
  {
    label: 'Flagship Section',
    keys: [
      { key: 'flagship.heading', label: 'Section heading' },
      { key: 'flagship.subheading', label: 'Section subheading', multi: true },
    ],
  },
  {
    label: 'Skills Section',
    keys: [
      { key: 'skills.heading', label: 'Section heading' },
      { key: 'skills.subheading', label: 'Section subheading', multi: true },
    ],
  },
  {
    label: 'Career Section',
    keys: [
      { key: 'career.heading', label: 'Section heading' },
      { key: 'career.subheading', label: 'Section subheading', multi: true },
    ],
  },
  {
    label: 'Contact Section',
    keys: [
      { key: 'contact.heading', label: 'Heading' },
      { key: 'contact.tagline', label: 'Tagline', multi: true },
      { key: 'contact.email', label: 'Email' },
      { key: 'contact.phone_uk', label: 'Phone (UK)' },
      { key: 'contact.phone_uae', label: 'Phone (UAE)' },
      { key: 'contact.whatsapp', label: 'WhatsApp number (digits only)' },
      { key: 'contact.linkedin_url', label: 'LinkedIn URL' },
    ],
  },
  {
    label: 'Footer',
    keys: [
      { key: 'footer.copyright', label: 'Copyright line' },
    ],
  },
];

export function SiteSettingsAdmin({ adminPassword }: AdminProps) {
  const { toast } = useToast();
  const { data: settings = {}, isLoading } = useQuery<Record<string, string>>({ queryKey: ['/api/site/settings'] });
  const [draft, setDraft] = useState<Record<string, string>>({});

  useEffect(() => { setDraft(settings); }, [settings]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const entries = Object.entries(draft).map(([key, value]) => ({ key, value }));
      return authedFetch('/api/site/settings', 'PUT', adminPassword, { entries });
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['/api/site/settings'] }); toast({ title: 'Settings saved' }); },
    onError: (err: Error) => toast({ title: 'Save failed', description: err.message, variant: 'destructive' }),
  });

  if (isLoading) return <p className="text-white/60">Loading...</p>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-3 flex-wrap">
        <div>
          <h3 className="text-xl font-semibold text-white">Site Content</h3>
          <p className="text-sm text-white/60">Edit headlines, contact details, and section copy</p>
        </div>
        <Button onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending}
          className="bg-gradient-to-r from-[hsl(190,85%,55%)] to-[hsl(220,90%,60%)] text-white border-0" data-testid="button-save-settings">
          <Save className="w-4 h-4 mr-2" /> {saveMutation.isPending ? 'Saving...' : 'Save All'}
        </Button>
      </div>

      {SETTING_GROUPS.map(group => (
        <Card key={group.label} className="bg-white/5 border-white/10 p-5 space-y-3">
          <h4 className="font-medium text-white">{group.label}</h4>
          {group.keys.map(({ key, label, multi }) => (
            <div key={key} className="space-y-1">
              <label className="text-xs text-white/60">{label}</label>
              {multi ? (
                <Textarea value={draft[key] || ''} onChange={e => setDraft({ ...draft, [key]: e.target.value })} className={inputCls} rows={2} data-testid={`input-setting-${key}`} />
              ) : (
                <Input value={draft[key] || ''} onChange={e => setDraft({ ...draft, [key]: e.target.value })} className={inputCls} data-testid={`input-setting-${key}`} />
              )}
            </div>
          ))}
        </Card>
      ))}
    </div>
  );
}
