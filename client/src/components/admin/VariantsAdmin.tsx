import { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Copy, Check, ChevronDown, ChevronUp, Save, X, Edit, ArrowUp, ArrowDown, Upload, Loader2 } from 'lucide-react';
import type { CareerRoleRow, FlagshipWinRow, SiteSkillRow, CVFileRow, ProfileVariantRow } from '@shared/schema';

interface AdminProps { adminPassword: string; }

type VariantContent = {
  title?: string;
  tagline?: string;
  bio?: string;
  stat1Val?: string; stat1Label?: string;
  stat2Val?: string; stat2Label?: string;
  stat3Val?: string; stat3Label?: string;
  careerRoles?: Array<{ id: number; description: string; keyAchievements?: string[] }>;
  skillsList?: Array<{ id: number; name: string; category: string }>;
  highlightedAchievements?: Array<{ id: number; overrideText?: string }>;
  cvFileId?: number | null;
};

type VariantSkill = { id: number; name: string; category: string };

const inputCls = 'bg-white/5 border-white/20 text-white placeholder:text-white/40';

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
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

function CopyLinkButton({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);
  const url = `${window.location.origin}/?v=${slug}`;
  const copy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <Button size="sm" variant="ghost" onClick={copy} className="text-white/70 gap-1.5" data-testid={`btn-copy-link-${slug}`}>
      {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? 'Copied!' : 'Copy link'}
    </Button>
  );
}

interface VariantFormProps {
  adminPassword: string;
  editingVariant: ProfileVariantRow | null;
  onClose: () => void;
}

function VariantForm({ adminPassword, editingVariant, onClose }: VariantFormProps) {
  const { toast } = useToast();

  const { data: careerRoles = [], isLoading: loadingCareer } = useQuery<CareerRoleRow[]>({ queryKey: ['/api/site/career-roles'] });
  const { data: flagshipWins = [], isLoading: loadingWins } = useQuery<FlagshipWinRow[]>({ queryKey: ['/api/site/flagship-wins'] });
  const { data: skills = [], isLoading: loadingSkills } = useQuery<SiteSkillRow[]>({ queryKey: ['/api/site/skills'] });
  const { data: siteSettings = {}, isLoading: loadingSettings } = useQuery<Record<string, string>>({ queryKey: ['/api/site/settings'] });
  const { data: cvFiles = [], isLoading: loadingCVFiles } = useQuery<CVFileRow[]>({
    queryKey: ['/api/cv/files'],
    queryFn: async () => {
      const res = await fetch('/api/cv/files', { headers: { Authorization: `Bearer ${adminPassword}` } });
      if (!res.ok) throw new Error('Failed to fetch CV files');
      return res.json();
    },
  });

  // All base datasets must be loaded before we attempt to clone into a new variant
  const allBaseDataLoaded = !loadingCareer && !loadingWins && !loadingSkills && !loadingSettings && !loadingCVFiles;

  const [label, setLabel] = useState(editingVariant?.label || '');
  const [slug, setSlug] = useState(editingVariant?.slug || '');
  const [isActive, setIsActive] = useState(editingVariant?.isActive ?? true);
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [bio, setBio] = useState('');
  const [stat1Val, setStat1Val] = useState('');
  const [stat1Label, setStat1Label] = useState('');
  const [stat2Val, setStat2Val] = useState('');
  const [stat2Label, setStat2Label] = useState('');
  const [stat3Val, setStat3Val] = useState('');
  const [stat3Label, setStat3Label] = useState('');
  const [cvFileId, setCvFileId] = useState<number | null>(null);
  const [cvUploading, setCvUploading] = useState(false);
  const cvFileRef = useRef<HTMLInputElement>(null);
  const [careerOverrides, setCareerOverrides] = useState<Record<number, string>>({});
  const [careerKeyAchievements, setCareerKeyAchievements] = useState<Record<number, string[]>>({});
  // Ordered skills list with per-variant editable labels
  const [skillsList, setSkillsList] = useState<VariantSkill[]>([]);
  const [selectedAchievements, setSelectedAchievements] = useState<Set<number>>(new Set());
  const [achievementOverrides, setAchievementOverrides] = useState<Record<number, string>>({});
  const [expandedCareer, setExpandedCareer] = useState<Set<number>>(new Set());
  const [slugManual, setSlugManual] = useState(!!editingVariant);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (initialized) return;

    if (editingVariant) {
      // For edit mode: only need skills loaded to fill in fallback gaps — skills may be empty if none configured
      if (loadingSkills) return;
      const c = editingVariant.content || {};
      setTitle(c.title || '');
      setTagline(c.tagline || '');
      setBio(c.bio || '');
      setStat1Val(c.stat1Val || ''); setStat1Label(c.stat1Label || '');
      setStat2Val(c.stat2Val || ''); setStat2Label(c.stat2Label || '');
      setStat3Val(c.stat3Val || ''); setStat3Label(c.stat3Label || '');
      setCvFileId(c.cvFileId ?? null);
      const co: Record<number, string> = {};
      const ka: Record<number, string[]> = {};
      (c.careerRoles || []).forEach(r => { co[r.id] = r.description; if (r.keyAchievements) ka[r.id] = [...r.keyAchievements]; });
      setCareerKeyAchievements(ka);
      setCareerOverrides(co);
      // Restore ordered skills list from variant content; fall back to base skills for any missing
      if (c.skillsList && c.skillsList.length > 0) {
        setSkillsList(c.skillsList);
      } else {
        setSkillsList(skills.map(s => ({ id: s.id, name: s.name, category: s.category })));
      }
      const sa = new Set<number>((c.highlightedAchievements || []).map(a => a.id));
      setSelectedAchievements(sa);
      const ao: Record<number, string> = {};
      (c.highlightedAchievements || []).forEach(a => { ao[a.id] = a.overrideText || ''; });
      setAchievementOverrides(ao);
      setInitialized(true);
    } else {
      // For create mode: wait until ALL base datasets have loaded so clone is complete
      if (!allBaseDataLoaded) return;
      setTitle(siteSettings['profile.title'] || '');
      setTagline(siteSettings['profile.quote'] || '');
      setBio(siteSettings['profile.bio'] || '');
      setStat1Val(siteSettings['profile.stat1_val'] || ''); setStat1Label(siteSettings['profile.stat1_label'] || '');
      setStat2Val(siteSettings['profile.stat2_val'] || ''); setStat2Label(siteSettings['profile.stat2_label'] || '');
      setStat3Val(siteSettings['profile.stat3_val'] || ''); setStat3Label(siteSettings['profile.stat3_label'] || '');
      const co: Record<number, string> = {};
      const ka: Record<number, string[]> = {};
      careerRoles.forEach(r => { co[r.id] = r.description || ''; ka[r.id] = [...(r.keyAchievements || [])]; });
      setCareerKeyAchievements(ka);
      setCareerOverrides(co);
      // Clone all skills in base order with their current names
      setSkillsList(skills.map(s => ({ id: s.id, name: s.name, category: s.category })));
      // Pre-select first 3 flagship wins
      setSelectedAchievements(new Set(flagshipWins.slice(0, 3).map(w => w.id)));
      // Snapshot latest CV file so this variant is independent of future CV uploads
      if (cvFiles.length > 0) {
        setCvFileId(cvFiles[0].id);
      }
      setInitialized(true);
    }
  }, [initialized, editingVariant, allBaseDataLoaded, loadingSkills, careerRoles, skills, flagshipWins, siteSettings, cvFiles]);

  useEffect(() => {
    if (!slugManual && label) {
      setSlug(slugify(label));
    }
  }, [label, slugManual]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const content: VariantContent = {
        title: title || undefined,
        tagline,
        bio,
        stat1Val: stat1Val || undefined, stat1Label: stat1Label || undefined,
        stat2Val: stat2Val || undefined, stat2Label: stat2Label || undefined,
        stat3Val: stat3Val || undefined, stat3Label: stat3Label || undefined,
        cvFileId,
        careerRoles: careerRoles.map(r => ({ id: r.id, description: careerOverrides[r.id] || r.description || '', keyAchievements: careerKeyAchievements[r.id] ?? r.keyAchievements ?? [] })),
        skillsList: skillsList,
        highlightedAchievements: flagshipWins.filter(w => selectedAchievements.has(w.id)).map(w => ({ id: w.id, overrideText: achievementOverrides[w.id] || undefined })),
      };
      const payload = { label, slug, isActive, sortOrder: editingVariant?.sortOrder ?? 0, content };
      if (editingVariant) {
        return authedFetch(`/api/variants/${editingVariant.id}`, 'PATCH', adminPassword, payload);
      }
      return authedFetch('/api/variants', 'POST', adminPassword, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/variants'] });
      toast({ title: editingVariant ? 'Variant updated' : 'Variant created' });
      onClose();
    },
    onError: (err: Error) => toast({ title: 'Save failed', description: err.message, variant: 'destructive' }),
  });

  // Inline CV upload — uploads file, creates a CV record, then auto-selects it
  const handleCvUpload = async (file: File) => {
    setCvUploading(true);
    try {
      const fd = new FormData();
      fd.append('cv', file);
      fd.append('label', file.name.replace(/\.[^.]+$/, ''));
      const res = await fetch('/api/cv/upload', { method: 'POST', headers: { Authorization: `Bearer ${adminPassword}` }, body: fd });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      await queryClient.invalidateQueries({ queryKey: ['/api/cv/files'] });
      // Upload response shape: { success: true, file: { id, filename, label, ... } }
      const newId = data.file?.id ?? data.id ?? null;
      if (newId) setCvFileId(newId);
    } catch (e: any) {
      alert(`CV upload failed: ${e.message}`);
    } finally {
      setCvUploading(false);
    }
  };

  // Skills ordered list helpers
  const isSkillSelected = (id: number) => skillsList.some(s => s.id === id);

  const toggleSkill = (skill: SiteSkillRow) => {
    setSkillsList(prev => {
      if (prev.some(s => s.id === skill.id)) {
        return prev.filter(s => s.id !== skill.id);
      }
      return [...prev, { id: skill.id, name: skill.name, category: skill.category }];
    });
  };

  const moveSkillUp = (idx: number) => {
    if (idx === 0) return;
    setSkillsList(prev => {
      const next = [...prev];
      [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
      return next;
    });
  };

  const moveSkillDown = (idx: number) => {
    setSkillsList(prev => {
      if (idx >= prev.length - 1) return prev;
      const next = [...prev];
      [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
      return next;
    });
  };

  const updateSkillLabel = (idx: number, name: string) => {
    setSkillsList(prev => {
      const next = [...prev];
      next[idx] = { ...next[idx], name };
      return next;
    });
  };

  const toggleAchievement = (id: number) => {
    setSelectedAchievements(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const toggleCareerExpand = (id: number) => {
    setExpandedCareer(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  // Show loading spinner while waiting for all base data (create mode only)
  if (!editingVariant && !allBaseDataLoaded) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-xl font-semibold text-white">New Variant</h3>
          <Button size="icon" variant="ghost" onClick={onClose} className="text-white/60"><X className="w-4 h-4" /></Button>
        </div>
        <Card className="bg-white/5 border-white/10 p-8 text-center">
          <div className="text-white/60 text-sm">Loading profile data to clone…</div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-xl font-semibold text-white">{editingVariant ? 'Edit Variant' : 'New Variant'}</h3>
        <Button size="icon" variant="ghost" onClick={onClose} className="text-white/60"><X className="w-4 h-4" /></Button>
      </div>

      {/* Basic Info */}
      <Card className="bg-white/5 border-white/10 p-4 space-y-3">
        <div className="text-sm font-semibold text-white/80 uppercase tracking-wider">Variant Details</div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-white/60 mb-1 block">Label (admin display name) *</label>
            <Input value={label} onChange={e => setLabel(e.target.value)} className={inputCls} placeholder="Programme Director" data-testid="input-variant-label" />
          </div>
          <div>
            <label className="text-xs text-white/60 mb-1 block">Slug (URL key) *</label>
            <Input value={slug} onChange={e => { setSlug(e.target.value); setSlugManual(true); }} className={inputCls} placeholder="programme-director" data-testid="input-variant-slug" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <input type="checkbox" id="variant-active" checked={isActive} onChange={e => setIsActive(e.target.checked)} className="w-4 h-4" data-testid="check-variant-active" />
          <label htmlFor="variant-active" className="text-sm text-white/80">Active (visible via shareable link)</label>
        </div>
        {slug && (
          <div className="text-xs text-white/40 font-mono truncate">
            Share: {window.location.origin}/?v={slug}
          </div>
        )}
      </Card>

      {/* Profile Content */}
      <Card className="bg-white/5 border-white/10 p-4 space-y-3">
        <div className="text-sm font-semibold text-white/80 uppercase tracking-wider">Profile Content</div>
        <div>
          <label className="text-xs text-white/60 mb-1 block">Title (left panel, e.g. "PMO Lead" or "Senior Programme Director")</label>
          <Input value={title} onChange={e => setTitle(e.target.value)} className={inputCls} placeholder="Leave blank to use default title" data-testid="input-variant-title" />
        </div>
        <div>
          <label className="text-xs text-white/60 mb-1 block">Tagline / Quote</label>
          <Textarea value={tagline} onChange={e => setTagline(e.target.value)} className={inputCls} rows={3} placeholder="Profile tagline..." data-testid="input-variant-tagline" />
        </div>
        <div>
          <label className="text-xs text-white/60 mb-1 block">Bio</label>
          <Textarea value={bio} onChange={e => setBio(e.target.value)} className={inputCls} rows={4} placeholder="Profile bio..." data-testid="input-variant-bio" />
        </div>
      </Card>

      {/* Key Impact Stats */}
      <Card className="bg-white/5 border-white/10 p-4 space-y-3">
        <div className="text-sm font-semibold text-white/80 uppercase tracking-wider">Key Impact Stats</div>
        <p className="text-xs text-white/50">Override the three headline numbers shown in the left panel. Leave blank to use the default values.</p>
        {[
          { val: stat1Val, setVal: setStat1Val, lbl: stat1Label, setLbl: setStat1Label, placeholder: '£50M+', lblPlaceholder: 'Programmes led', n: 1 },
          { val: stat2Val, setVal: setStat2Val, lbl: stat2Label, setLbl: setStat2Label, placeholder: '17 yrs', lblPlaceholder: 'Experience', n: 2 },
          { val: stat3Val, setVal: setStat3Val, lbl: stat3Label, setLbl: setStat3Label, placeholder: '34', lblPlaceholder: 'Largest team', n: 3 },
        ].map(({ val, setVal, lbl, setLbl, placeholder, lblPlaceholder, n }) => (
          <div key={n} className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs text-white/40 mb-1 block">Stat {n} value</label>
              <Input value={val} onChange={e => setVal(e.target.value)} className={inputCls} placeholder={placeholder} data-testid={`input-stat${n}-val`} />
            </div>
            <div>
              <label className="text-xs text-white/40 mb-1 block">Stat {n} label</label>
              <Input value={lbl} onChange={e => setLbl(e.target.value)} className={inputCls} placeholder={lblPlaceholder} data-testid={`input-stat${n}-label`} />
            </div>
          </div>
        ))}
      </Card>

      {/* CV Selection + inline upload */}
      <Card className="bg-white/5 border-white/10 p-4 space-y-3">
        <div className="text-sm font-semibold text-white/80 uppercase tracking-wider">CV File</div>
        {!cvFileId && (
          <div className="flex items-start gap-2 bg-amber-500/10 border border-amber-500/30 rounded-md px-3 py-2">
            <span className="text-amber-400 text-sm flex-shrink-0 mt-0.5">⚠</span>
            <p className="text-xs text-amber-300/80">
              No variant-specific CV assigned. Downloads from this variant's link will serve the <strong>main site's latest CV</strong>. Upload or select a unique CV below to make this variant fully independent.
            </p>
          </div>
        )}
        {cvFileId && (
          <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-md px-3 py-2">
            <span className="text-green-400 text-sm flex-shrink-0">✓</span>
            <p className="text-xs text-green-300/80">This variant has its own CV assigned. Downloads from this link will serve that file independently.</p>
          </div>
        )}
        <select
          value={cvFileId ?? ''}
          onChange={e => setCvFileId(e.target.value ? parseInt(e.target.value) : null)}
          className="w-full bg-white/5 border border-white/20 text-white rounded-md px-3 py-2 text-sm"
          data-testid="select-variant-cv"
        >
          <option value="">— Use main site CV (not recommended) —</option>
          {cvFiles.map(f => (
            <option key={f.id} value={f.id}>{f.label || f.filename} ({new Date(f.uploadedAt).toLocaleDateString()})</option>
          ))}
        </select>
        <div className="flex items-center gap-2">
          <input
            ref={cvFileRef}
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={e => { const f = e.target.files?.[0]; if (f) handleCvUpload(f); e.target.value = ''; }}
            data-testid="input-variant-cv-file"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="border-white/20 text-white/70 bg-white/5"
            onClick={() => cvFileRef.current?.click()}
            disabled={cvUploading}
            data-testid="btn-upload-cv"
          >
            {cvUploading ? <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" /> : <Upload className="w-3.5 h-3.5 mr-1.5" />}
            {cvUploading ? 'Uploading…' : 'Upload new CV for this variant'}
          </Button>
          <span className="text-xs text-white/40">PDF, DOC, DOCX</span>
        </div>
      </Card>

      {/* Career Role Overrides */}
      {careerRoles.length > 0 && (
        <Card className="bg-white/5 border-white/10 p-4 space-y-3">
          <div className="text-sm font-semibold text-white/80 uppercase tracking-wider">Career Role Descriptions</div>
          <p className="text-xs text-white/50">Override the description for each role in this variant. Leave blank to use the base description.</p>
          <div className="space-y-2">
            {careerRoles.map(role => (
              <div key={role.id} className="border border-white/10 rounded-md overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleCareerExpand(role.id)}
                  className="w-full flex items-center justify-between px-3 py-2 bg-white/5 hover:bg-white/10 text-left"
                  data-testid={`btn-expand-career-${role.id}`}
                >
                  <div>
                    <div className="text-sm font-medium text-white">{role.role}</div>
                    <div className="text-xs text-white/50">{role.company} · {role.period}</div>
                  </div>
                  {expandedCareer.has(role.id) ? <ChevronUp className="w-4 h-4 text-white/40 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-white/40 flex-shrink-0" />}
                </button>
                {expandedCareer.has(role.id) && (
                  <div className="px-3 pb-3 pt-2 bg-white/[0.02] space-y-3">
                    <div>
                      <label className="text-xs text-white/50 mb-1 block">Description</label>
                      <Textarea
                        value={careerOverrides[role.id] ?? ''}
                        onChange={e => setCareerOverrides(prev => ({ ...prev, [role.id]: e.target.value }))}
                        className={inputCls}
                        rows={3}
                        placeholder={role.description || 'Enter description for this role in this variant…'}
                        data-testid={`input-career-desc-${role.id}`}
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs text-white/50">Key Impacts</label>
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          className="h-6 text-xs text-white/50 px-2"
                          onClick={() => setCareerKeyAchievements(prev => ({ ...prev, [role.id]: [...(prev[role.id] || []), ''] }))}
                          data-testid={`btn-add-impact-${role.id}`}
                        >
                          <Plus className="w-3 h-3 mr-1" /> Add bullet
                        </Button>
                      </div>
                      <div className="space-y-1.5">
                        {(careerKeyAchievements[role.id] || []).map((bullet, idx) => (
                          <div key={idx} className="flex items-center gap-1.5">
                            <span className="text-white/30 text-xs flex-shrink-0">·</span>
                            <Input
                              value={bullet}
                              onChange={e => setCareerKeyAchievements(prev => {
                                const arr = [...(prev[role.id] || [])];
                                arr[idx] = e.target.value;
                                return { ...prev, [role.id]: arr };
                              })}
                              className={`${inputCls} text-sm`}
                              placeholder="Key impact bullet point…"
                              data-testid={`input-impact-${role.id}-${idx}`}
                            />
                            <Button
                              type="button"
                              size="icon"
                              variant="ghost"
                              className="h-7 w-7 flex-shrink-0 text-white/30 hover:text-red-400"
                              onClick={() => setCareerKeyAchievements(prev => {
                                const arr = (prev[role.id] || []).filter((_, i) => i !== idx);
                                return { ...prev, [role.id]: arr };
                              })}
                              data-testid={`btn-remove-impact-${role.id}-${idx}`}
                            >
                              <X className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        ))}
                        {(careerKeyAchievements[role.id] || []).length === 0 && (
                          <p className="text-xs text-white/30 italic">No key impacts yet — click "Add bullet" to add one, or leave empty to use the base role's impacts.</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Skills: Ordered list with per-variant label editing and up/down reorder */}
      {skills.length > 0 && (
        <Card className="bg-white/5 border-white/10 p-4 space-y-3">
          <div className="text-sm font-semibold text-white/80 uppercase tracking-wider">Skills Emphasis</div>
          <p className="text-xs text-white/50">
            Choose which skills to include, reorder them, and optionally rename them for this variant. The order shown here is the order displayed on the profile.
          </p>
          {/* Selected skills (ordered, with label editing + reorder) */}
          {skillsList.length > 0 && (
            <div className="space-y-1.5">
              <div className="text-xs text-white/50 font-medium uppercase tracking-wider mb-1">Selected ({skillsList.length}) — drag to reorder via arrows</div>
              {skillsList.map((s, idx) => (
                <div key={s.id} className="flex items-center gap-2 bg-white/5 rounded-md px-2 py-1.5" data-testid={`row-selected-skill-${s.id}`}>
                  <div className="flex flex-col gap-0.5">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => moveSkillUp(idx)}
                      disabled={idx === 0}
                      className="h-4 w-4 text-white/40 disabled:opacity-20"
                      data-testid={`btn-skill-up-${s.id}`}
                    >
                      <ArrowUp className="w-3 h-3" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => moveSkillDown(idx)}
                      disabled={idx === skillsList.length - 1}
                      className="h-4 w-4 text-white/40 disabled:opacity-20"
                      data-testid={`btn-skill-down-${s.id}`}
                    >
                      <ArrowDown className="w-3 h-3" />
                    </Button>
                  </div>
                  <Input
                    value={s.name}
                    onChange={e => updateSkillLabel(idx, e.target.value)}
                    className={`flex-1 h-7 text-sm ${inputCls}`}
                    data-testid={`input-skill-label-${s.id}`}
                  />
                  <span className="text-xs text-white/30 flex-shrink-0 w-24 text-right">{s.category}</span>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setSkillsList(prev => prev.filter(sk => sk.id !== s.id))}
                    className="h-6 w-6 text-red-400 flex-shrink-0"
                    data-testid={`btn-remove-skill-${s.id}`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          )}
          {/* Unselected skills pool */}
          {skills.filter(s => !isSkillSelected(s.id)).length > 0 && (
            <div className="space-y-1">
              <div className="text-xs text-white/40 font-medium uppercase tracking-wider mb-1">Available to add</div>
              <div className="grid grid-cols-2 gap-1 max-h-48 overflow-y-auto">
                {skills.filter(s => !isSkillSelected(s.id)).map(s => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => toggleSkill(s)}
                    className="flex items-center gap-2 py-1 px-2 rounded text-left hover:bg-white/5 text-sm text-white/50 hover:text-white/80"
                    data-testid={`btn-add-skill-${s.id}`}
                  >
                    <Plus className="w-3 h-3 flex-shrink-0 text-white/30" />
                    <span className="truncate">{s.name}</span>
                    <span className="text-xs text-white/30 ml-auto flex-shrink-0">{s.category}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </Card>
      )}

      {/* Achievements Selection */}
      {flagshipWins.length > 0 && (
        <Card className="bg-white/5 border-white/10 p-4 space-y-3">
          <div className="text-sm font-semibold text-white/80 uppercase tracking-wider">Highlighted Achievements</div>
          <p className="text-xs text-white/50">Select achievements to feature and optionally override their summary text.</p>
          <div className="space-y-3">
            {flagshipWins.map(w => (
              <div key={w.id} className="space-y-1.5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedAchievements.has(w.id)}
                    onChange={() => toggleAchievement(w.id)}
                    className="w-4 h-4"
                    data-testid={`check-achievement-${w.id}`}
                  />
                  <span className="text-sm font-medium text-white">{w.title}</span>
                  <span className="text-xs text-white/50">{w.company}</span>
                </label>
                {selectedAchievements.has(w.id) && (
                  <Input
                    value={achievementOverrides[w.id] || ''}
                    onChange={e => setAchievementOverrides(prev => ({ ...prev, [w.id]: e.target.value }))}
                    className={`ml-6 ${inputCls}`}
                    placeholder="Override summary text (optional)"
                    data-testid={`input-achievement-override-${w.id}`}
                  />
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onClose} className="text-white/70">Cancel</Button>
        <Button
          onClick={() => saveMutation.mutate()}
          disabled={saveMutation.isPending || !label || !slug || !allBaseDataLoaded}
          className="bg-gradient-to-r from-[hsl(var(--brand-primary))] to-[hsl(var(--brand-accent))] text-white border-0"
          data-testid="btn-save-variant"
        >
          <Save className="w-4 h-4 mr-2" />
          {saveMutation.isPending ? 'Saving…' : !allBaseDataLoaded ? 'Loading…' : 'Save Variant'}
        </Button>
      </div>
    </div>
  );
}

export function VariantsAdmin({ adminPassword }: AdminProps) {
  const { toast } = useToast();
  const [editingVariant, setEditingVariant] = useState<ProfileVariantRow | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const { data: variants = [], isLoading } = useQuery<ProfileVariantRow[]>({
    queryKey: ['/api/variants'],
    queryFn: async () => {
      const res = await fetch('/api/variants', { headers: { Authorization: `Bearer ${adminPassword}` } });
      if (!res.ok) throw new Error('Failed to fetch variants');
      return res.json();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => authedFetch(`/api/variants/${id}`, 'DELETE', adminPassword),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/variants'] });
      toast({ title: 'Variant deleted' });
    },
    onError: (err: Error) => toast({ title: 'Delete failed', description: err.message, variant: 'destructive' }),
  });

  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, isActive }: { id: number; isActive: boolean }) =>
      authedFetch(`/api/variants/${id}`, 'PATCH', adminPassword, { isActive }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['/api/variants'] }),
    onError: (err: Error) => toast({ title: 'Update failed', description: err.message, variant: 'destructive' }),
  });

  if (isCreating || editingVariant) {
    return (
      <VariantForm
        adminPassword={adminPassword}
        editingVariant={editingVariant}
        onClose={() => { setIsCreating(false); setEditingVariant(null); }}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-xl font-semibold text-white">Profile Variants</h3>
          <p className="text-sm text-white/60">Create tailored versions of your profile for different audiences</p>
        </div>
        <Button
          onClick={() => setIsCreating(true)}
          className="bg-gradient-to-r from-[hsl(var(--brand-primary))] to-[hsl(var(--brand-accent))] text-white border-0"
          data-testid="btn-new-variant"
        >
          <Plus className="w-4 h-4 mr-2" /> New Variant
        </Button>
      </div>

      {isLoading ? (
        <p className="text-white/60">Loading...</p>
      ) : variants.length === 0 ? (
        <Card className="bg-white/5 border-white/10 p-12 text-center">
          <p className="text-white/60 mb-2">No variants yet.</p>
          <p className="text-sm text-white/40">Create a variant to share a tailored version of your profile with specific audiences.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {variants.map(v => (
            <Card key={v.id} className="bg-white/5 border-white/10 p-4" data-testid={`card-variant-${v.id}`}>
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-white">{v.label}</span>
                    <Badge variant="outline" className={`border-white/20 text-xs ${v.isActive ? 'text-green-400' : 'text-white/40'}`}>
                      {v.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <div className="text-xs text-white/40 font-mono mt-0.5">?v={v.slug}</div>
                </div>
                <div className="flex items-center gap-1 flex-wrap">
                  <CopyLinkButton slug={v.slug} />
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleActiveMutation.mutate({ id: v.id, isActive: !v.isActive })}
                    className="text-white/60 text-xs"
                    data-testid={`btn-toggle-variant-${v.id}`}
                  >
                    {v.isActive ? 'Deactivate' : 'Activate'}
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setEditingVariant(v)}
                    className="text-white/70"
                    data-testid={`btn-edit-variant-${v.id}`}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => { if (confirm(`Delete variant "${v.label}"?`)) deleteMutation.mutate(v.id); }}
                    className="text-red-400"
                    data-testid={`btn-delete-variant-${v.id}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
