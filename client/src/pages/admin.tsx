import { useState, useMemo, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../styles/quill-custom.css';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage,
  FormDescription 
} from '@/components/ui/form';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Lock, 
  LogOut, 
  Loader2,
  Star,
  StarOff,
  Upload,
  Download as DownloadIcon,
  Mail,
  Phone,
  Calendar as CalendarIcon,
  FileText,
  ArrowUp,
  ArrowDown,
  ImageIcon,
  Building2,
  ExternalLink as ExternalLinkIcon
} from 'lucide-react';
import type { ProjectRow } from '@shared/schema';
import { Link } from 'wouter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  publishDate: string;
  tags: string[];
  featured?: boolean;
  heroImage?: string;
}

// Form validation schema
const articleSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  excerpt: z.string().min(20, 'Excerpt must be at least 20 characters'),
  content: z.string().min(50, 'Content must be at least 50 characters'),
  category: z.string().min(2, 'Category is required'),
  readTime: z.string().min(1, 'Read time is required'),
  publishDate: z.string().min(1, 'Publish date is required'),
  tags: z.string(), // Comma-separated tags
  featured: z.boolean().default(false),
  heroImage: z.string().optional(),
});

type ArticleFormData = z.infer<typeof articleSchema>;

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

const projectSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  slug: z.string().min(2, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Lowercase letters, numbers and hyphens only'),
  client: z.string().min(1, 'Client is required'),
  sector: z.string().min(1, 'Sector is required'),
  year: z.string().min(1, 'Year is required'),
  duration: z.string().optional(),
  metric: z.string().min(1, 'Headline metric is required'),
  summary: z.string().optional(),
  challenge: z.string().min(10, 'Challenge must be at least 10 characters'),
  impact: z.string().min(10, 'Impact must be at least 10 characters'),
  description: z.string().optional(),
  outcomes: z.string().optional(),
  techStack: z.string().optional(),
  role: z.string().optional(),
  logo: z.string().optional(),
  heroImage: z.string().optional(),
  galleryImages: z.array(z.string()).default([]),
  externalUrl: z.string().optional(),
  featured: z.boolean().default(false),
  sortOrder: z.coerce.number().int().default(0),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface CVContact {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  downloadedAt: string;
}

interface CVFile {
  id: number;
  filename: string;
  uploadedAt: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('blog');
  const [cvFile, setCVFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectRow | null>(null);
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingHero, setUploadingHero] = useState(false);
  const { toast } = useToast();

  // Fetch blog posts
  const { data: blogPosts = [], isLoading, refetch } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog-posts'],
    enabled: isAuthenticated,
  });

  // Fetch CV contacts
  const { data: cvContacts = [], isLoading: isLoadingContacts } = useQuery<CVContact[]>({
    queryKey: ['/api/cv/contacts'],
    queryFn: async () => {
      const res = await fetch('/api/cv/contacts', {
        headers: { 'Authorization': `Bearer ${adminPassword}` }
      });
      if (!res.ok) throw new Error('Failed to fetch contacts');
      return res.json();
    },
    enabled: isAuthenticated && activeTab === 'cv',
  });

  // Fetch latest CV file
  const { data: latestCV } = useQuery<CVFile>({
    queryKey: ['/api/cv/latest'],
    queryFn: async () => {
      const res = await fetch('/api/cv/latest', {
        headers: { 'Authorization': `Bearer ${adminPassword}` }
      });
      if (!res.ok) throw new Error('Failed to fetch CV');
      return res.json();
    },
    enabled: isAuthenticated && activeTab === 'cv',
  });

  // Projects queries & mutations
  const { data: projects = [], isLoading: isLoadingProjects } = useQuery<ProjectRow[]>({
    queryKey: ['/api/projects'],
    enabled: isAuthenticated && activeTab === 'projects',
  });

  const projectForm = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: '',
      slug: '',
      client: '',
      sector: '',
      year: '',
      duration: '',
      metric: '',
      summary: '',
      challenge: '',
      impact: '',
      description: '',
      outcomes: '',
      techStack: '',
      role: '',
      logo: '',
      heroImage: '',
      galleryImages: [],
      externalUrl: '',
      featured: false,
      sortOrder: 0,
    },
  });

  // Auto-fill slug from title when slug is empty
  const watchedTitle = projectForm.watch('title');
  const watchedSlug = projectForm.watch('slug');
  useEffect(() => {
    if (!editingProject && watchedTitle && !watchedSlug) {
      projectForm.setValue('slug', slugify(watchedTitle), { shouldValidate: false });
    }
  }, [watchedTitle, watchedSlug, editingProject]);

  const buildProjectPayload = (data: ProjectFormData) => {
    const toArr = (s?: string) =>
      (s || '')
        .split('\n')
        .map(x => x.trim())
        .filter(Boolean);
    return {
      ...data,
      duration: data.duration || null,
      summary: data.summary || null,
      description: data.description || null,
      role: data.role || null,
      logo: data.logo || null,
      heroImage: data.heroImage || null,
      externalUrl: data.externalUrl || null,
      outcomes: toArr(data.outcomes),
      techStack: toArr(data.techStack),
      galleryImages: data.galleryImages || [],
    };
  };

  const createProjectMutation = useMutation({
    mutationFn: async (data: ProjectFormData) => {
      const payload = buildProjectPayload(data);
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${adminPassword}` },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text() || 'Failed to create project');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      toast({ title: 'Success', description: 'Project created' });
      setIsProjectDialogOpen(false);
      projectForm.reset();
    },
    onError: (err: Error) => toast({ title: 'Error', description: err.message, variant: 'destructive' }),
  });

  const updateProjectMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: ProjectFormData }) => {
      const payload = buildProjectPayload(data);
      const res = await fetch(`/api/projects/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${adminPassword}` },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text() || 'Failed to update project');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      toast({ title: 'Success', description: 'Project updated' });
      setIsProjectDialogOpen(false);
      setEditingProject(null);
      projectForm.reset();
    },
    onError: (err: Error) => toast({ title: 'Error', description: err.message, variant: 'destructive' }),
  });

  const deleteProjectMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${adminPassword}` },
      });
      if (!res.ok) throw new Error('Failed to delete project');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      toast({ title: 'Success', description: 'Project deleted' });
    },
    onError: () => toast({ title: 'Error', description: 'Failed to delete project', variant: 'destructive' }),
  });

  const reorderProjectsMutation = useMutation({
    mutationFn: async (orders: { id: number; sortOrder: number }[]) => {
      const res = await fetch('/api/projects/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${adminPassword}` },
        body: JSON.stringify({ orders }),
      });
      if (!res.ok) throw new Error('Failed to reorder');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
    },
  });

  const handleProjectMove = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= projects.length) return;
    const next = [...projects];
    [next[index], next[target]] = [next[target], next[index]];
    const orders = next.map((p, i) => ({ id: p.id, sortOrder: i }));
    reorderProjectsMutation.mutate(orders);
  };

  const uploadProjectImage = async (file: File, field: 'logo' | 'heroImage') => {
    const setter = field === 'logo' ? setUploadingLogo : setUploadingHero;
    setter(true);
    try {
      const fd = new FormData();
      fd.append('image', file);
      const res = await fetch('/api/projects/upload-image', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${adminPassword}` },
        body: fd,
      });
      if (!res.ok) throw new Error('Upload failed');
      const { url } = await res.json();
      projectForm.setValue(field, url);
      toast({ title: 'Uploaded', description: 'Image uploaded' });
    } catch {
      toast({ title: 'Error', description: 'Image upload failed', variant: 'destructive' });
    } finally {
      setter(false);
    }
  };

  const handleEditProject = (project: ProjectRow) => {
    setEditingProject(project);
    projectForm.reset({
      title: project.title,
      slug: project.slug,
      client: project.client,
      sector: project.sector,
      year: project.year,
      duration: project.duration || '',
      metric: project.metric,
      summary: project.summary || '',
      challenge: project.challenge,
      impact: project.impact,
      description: project.description || '',
      outcomes: (project.outcomes || []).join('\n'),
      techStack: (project.techStack || []).join('\n'),
      role: project.role || '',
      logo: project.logo || '',
      heroImage: project.heroImage || '',
      galleryImages: project.galleryImages || [],
      externalUrl: project.externalUrl || '',
      featured: project.featured,
      sortOrder: project.sortOrder,
    });
    setIsProjectDialogOpen(true);
  };

  const onProjectSubmit = (data: ProjectFormData) => {
    if (editingProject) {
      updateProjectMutation.mutate({ id: editingProject.id, data });
    } else {
      createProjectMutation.mutate(data);
    }
  };

  const form = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: '',
      excerpt: '',
      content: '',
      category: '',
      readTime: '',
      publishDate: new Date().toISOString().split('T')[0],
      tags: '',
      featured: false,
      heroImage: '',
    },
  });

  // Create article mutation
  const createMutation = useMutation({
    mutationFn: async (data: ArticleFormData) => {
      const payload = {
        ...data,
        tags: data.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      };
      
      const res = await fetch('/api/blog-posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminPassword}`,
        },
        body: JSON.stringify(payload),
      });
      
      if (!res.ok) {
        const error = await res.text();
        throw new Error(error || 'Failed to create article');
      }
      
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog-posts'] });
      toast({
        title: 'Success',
        description: 'Article created successfully',
      });
      setIsDialogOpen(false);
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create article',
        variant: 'destructive',
      });
    },
  });

  // Update article mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<ArticleFormData> }) => {
      const payload = data.tags 
        ? { ...data, tags: data.tags.split(',').map(tag => tag.trim()).filter(Boolean) }
        : data;
      
      const res = await fetch(`/api/blog-posts/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminPassword}`,
        },
        body: JSON.stringify(payload),
      });
      
      if (!res.ok) {
        const error = await res.text();
        throw new Error(error || 'Failed to update article');
      }
      
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog-posts'] });
      toast({
        title: 'Success',
        description: 'Article updated successfully',
      });
      setIsDialogOpen(false);
      setEditingPost(null);
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update article',
        variant: 'destructive',
      });
    },
  });

  // Delete article mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/blog-posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${adminPassword}`,
        },
      });
      
      if (!res.ok) {
        const error = await res.text();
        throw new Error(error || 'Failed to delete article');
      }
      
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog-posts'] });
      toast({
        title: 'Success',
        description: 'Article deleted successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete article',
        variant: 'destructive',
      });
    },
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!password) {
      setAuthError('Password is required');
      return;
    }

    try {
      // Verify password by making a test request to the auth verification endpoint
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${password}`,
        },
      });

      if (res.ok) {
        // Password is valid
        setAdminPassword(password);
        setIsAuthenticated(true);
        setAuthError('');
        refetch();
      } else {
        // Password is invalid
        setAuthError('Invalid password');
        setPassword('');
      }
    } catch (error) {
      setAuthError('Login failed. Please try again.');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    setAdminPassword('');
  };

  const handleCVUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvFile) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('cv', cvFile);

      const res = await fetch('/api/cv/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${adminPassword}`,
        },
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Failed to upload CV');
      }

      toast({
        title: "Success",
        description: "CV uploaded successfully",
      });

      setCVFile(null);
      queryClient.invalidateQueries({ queryKey: ['/api/cv/latest'] });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload CV",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const exportContacts = () => {
    const csv = [
      ['Name', 'Email', 'Phone', 'Downloaded At'],
      ...cvContacts.map(contact => [
        contact.name,
        contact.email,
        contact.phone || '',
        new Date(contact.downloadedAt).toLocaleString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cv-contacts-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const deleteContactMutation = useMutation({
    mutationFn: async (contactId: number) => {
      const res = await fetch(`/api/cv/contacts/${contactId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${adminPassword}`,
        },
      });
      if (!res.ok) throw new Error('Failed to delete contact');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/cv/contacts'] });
      toast({
        title: "Success",
        description: "Contact deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete contact",
        variant: "destructive",
      });
    },
  });

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    form.reset({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      readTime: post.readTime,
      publishDate: post.publishDate,
      tags: post.tags.join(', '),
      featured: post.featured || false,
      heroImage: post.heroImage || '',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      deleteMutation.mutate(id);
    }
  };

  const onSubmit = (data: ArticleFormData) => {
    if (editingPost) {
      updateMutation.mutate({ id: editingPost.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[hsl(262,50%,8%)] via-[hsl(245,30%,12%)] to-[hsl(220,40%,10%)] flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/5 backdrop-blur-xl border-white/10 p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-[hsl(190,85%,55%)] to-[hsl(220,90%,60%)] rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-display font-bold text-white mb-2">
              Admin Login
            </h1>
            <p className="text-white/60">
              Enter your admin password to manage articles
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Input
                type="password"
                placeholder="Admin Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                data-testid="input-admin-password"
              />
              {authError && (
                <p className="text-red-400 text-sm mt-2">{authError}</p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-[hsl(190,85%,55%)] to-[hsl(220,90%,60%)] text-white"
              data-testid="button-admin-login"
            >
              Login
            </Button>

            <Link href="/">
              <Button 
                variant="ghost" 
                className="w-full text-white/70 hover:text-white"
                data-testid="button-back-home"
              >
                Back to Portfolio
              </Button>
            </Link>
          </form>
        </Card>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(262,50%,8%)] via-[hsl(245,30%,12%)] to-[hsl(220,40%,10%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">
              Admin Dashboard
            </h1>
            <p className="text-white/60">
              Manage your portfolio content and CV downloads
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/">
              <Button 
                variant="outline" 
                className="bg-white/5 border-white/20 text-white hover:bg-white/10"
                data-testid="button-view-home"
              >
                View Portfolio
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="bg-white/5 border-white/20 text-white hover:bg-white/10"
              data-testid="button-logout"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-white/5 border border-white/10 mb-8">
            <TabsTrigger 
              value="blog" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[hsl(190,85%,55%)] data-[state=active]:to-[hsl(220,90%,60%)] data-[state=active]:text-white"
              data-testid="tab-blog"
            >
              Blog Management
            </TabsTrigger>
            <TabsTrigger 
              value="projects" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[hsl(190,85%,55%)] data-[state=active]:to-[hsl(220,90%,60%)] data-[state=active]:text-white"
              data-testid="tab-projects"
            >
              Portfolio Projects
            </TabsTrigger>
            <TabsTrigger 
              value="cv" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[hsl(190,85%,55%)] data-[state=active]:to-[hsl(220,90%,60%)] data-[state=active]:text-white"
              data-testid="tab-cv"
            >
              CV Management
            </TabsTrigger>
          </TabsList>

          {/* Blog Management Tab */}
          <TabsContent value="blog">
            {/* Create New Button */}
            <Button
              onClick={() => {
                setEditingPost(null);
                form.reset();
                setIsDialogOpen(true);
              }}
              className="mb-6 bg-gradient-to-r from-[hsl(190,85%,55%)] to-[hsl(220,90%,60%)] text-white"
              data-testid="button-create-article"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create New Article
            </Button>

            {/* Articles List */}
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-[hsl(190,85%,55%)] animate-spin" />
              </div>
            ) : blogPosts.length === 0 ? (
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-12 text-center">
                <p className="text-white/60 text-lg">
                  No articles yet. Create your first article to get started!
                </p>
              </Card>
            ) : (
              <div className="grid gap-4">
                {blogPosts.map((post) => (
              <Card 
                key={post.id} 
                className="bg-white/5 backdrop-blur-xl border-white/10 p-6"
                data-testid={`card-article-${post.id}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-white">
                        {post.title}
                      </h3>
                      {post.featured && (
                        <Badge className="bg-[hsl(220,90%,60%)]/20 border-[hsl(220,90%,60%)]/30 text-[hsl(220,90%,70%)]">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-white/60 mb-3">{post.excerpt}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-white/50">
                      <Badge variant="outline" className="border-white/20 text-white/70">
                        {post.category}
                      </Badge>
                      <span>{post.readTime}</span>
                      <span>{post.publishDate}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(post)}
                      className="text-[hsl(190,85%,55%)] hover:text-[hsl(190,85%,65%)] hover:bg-[hsl(190,85%,55%)]/10"
                      data-testid={`button-edit-${post.id}`}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(post.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                      data-testid={`button-delete-${post.id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Create/Edit Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-black/90 backdrop-blur-xl border border-white/10">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-display text-white">
                    {editingPost ? 'Edit Article' : 'Create New Article'}
                  </DialogTitle>
                  <DialogDescription className="text-white/60">
                    {editingPost ? 'Update your article details below' : 'Fill in the details to create a new article'}
                  </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Title</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                              placeholder="Enter article title"
                              data-testid="input-article-title"
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Category</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                            placeholder="e.g., PMO Leadership"
                            data-testid="input-article-category"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="readTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Read Time</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                            placeholder="e.g., 5 min"
                            data-testid="input-article-readtime"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="excerpt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Excerpt</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/40 min-h-[80px]"
                          placeholder="Short summary of the article"
                          data-testid="input-article-excerpt"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="heroImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Hero Image URL (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                          placeholder="https://example.com/image.jpg"
                          data-testid="input-article-heroimage"
                        />
                      </FormControl>
                      <FormDescription className="text-white/50">
                        Add a featured image for your article
                      </FormDescription>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <Controller
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Content</FormLabel>
                      <FormControl>
                        <div className="bg-white rounded-md" data-testid="input-article-content">
                          <ReactQuill
                            theme="snow"
                            value={field.value}
                            onChange={field.onChange}
                            modules={{
                              toolbar: [
                                [{ 'header': [1, 2, 3, false] }],
                                ['bold', 'italic', 'underline', 'strike'],
                                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                                ['blockquote', 'code-block'],
                                ['link', 'image'],
                                ['clean']
                              ],
                            }}
                            placeholder="Write your article content with rich formatting..."
                          />
                        </div>
                      </FormControl>
                      <FormDescription className="text-white/50">
                        Use the toolbar to format text, add links, and insert images
                      </FormDescription>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Tags</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            className="bg-white/5 border-white/10 text-white placeholder:text-white/40"
                            placeholder="PMO, Leadership, Remote Work"
                            data-testid="input-article-tags"
                          />
                        </FormControl>
                        <FormDescription className="text-white/50">
                          Comma-separated tags
                        </FormDescription>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="publishDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Publish Date</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="date"
                            className="bg-white/5 border-white/10 text-white"
                            data-testid="input-article-date"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="featured"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-3 space-y-0">
                      <FormControl>
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={field.onChange}
                          className="w-4 h-4 rounded border-white/20 bg-white/5 text-[hsl(190,85%,55%)]"
                          data-testid="input-article-featured"
                        />
                      </FormControl>
                      <FormLabel className="text-white font-normal cursor-pointer">
                        {field.value ? <Star className="w-4 h-4 inline mr-2 text-[hsl(220,90%,60%)]" /> : <StarOff className="w-4 h-4 inline mr-2" />}
                        Mark as featured article
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    className="bg-white/5 border-white/20 text-white hover:bg-white/10"
                    data-testid="button-cancel"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={createMutation.isPending || updateMutation.isPending}
                    className="bg-gradient-to-r from-[hsl(190,85%,55%)] to-[hsl(220,90%,60%)] text-white"
                    data-testid="button-save-article"
                  >
                    {(createMutation.isPending || updateMutation.isPending) && (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    )}
                    {editingPost ? 'Update Article' : 'Create Article'}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
          </TabsContent>

          {/* Portfolio Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">Portfolio Projects</h2>
                <p className="text-sm text-white/60 mt-1">Manage case studies shown on the public Portfolio page</p>
              </div>
              <Button
                onClick={() => {
                  setEditingProject(null);
                  projectForm.reset({
                    title: '', client: '', sector: '', year: '', metric: '',
                    challenge: '', impact: '', role: '', logo: '', heroImage: '',
                    externalUrl: '', featured: false, sortOrder: projects.length,
                  });
                  setIsProjectDialogOpen(true);
                }}
                className="bg-gradient-to-r from-[hsl(190,85%,55%)] to-[hsl(220,90%,60%)] text-white border-0"
                data-testid="button-new-project"
              >
                <Plus className="w-4 h-4 mr-2" /> New Project
              </Button>
            </div>

            {isLoadingProjects ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
              </div>
            ) : projects.length === 0 ? (
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-12 text-center">
                <Building2 className="w-10 h-10 text-white/40 mx-auto mb-3" />
                <p className="text-white/70">No projects yet. Create your first one.</p>
              </Card>
            ) : (
              <div className="space-y-3">
                {projects.map((project, index) => (
                  <Card
                    key={project.id}
                    className="bg-white/5 backdrop-blur-xl border-white/10 p-4"
                    data-testid={`row-project-${project.id}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7 text-white/60 hover:text-white"
                          onClick={() => handleProjectMove(index, 'up')}
                          disabled={index === 0 || reorderProjectsMutation.isPending}
                          data-testid={`button-move-up-${project.id}`}
                        >
                          <ArrowUp className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7 text-white/60 hover:text-white"
                          onClick={() => handleProjectMove(index, 'down')}
                          disabled={index === projects.length - 1 || reorderProjectsMutation.isPending}
                          data-testid={`button-move-down-${project.id}`}
                        >
                          <ArrowDown className="w-4 h-4" />
                        </Button>
                      </div>
                      {project.logo ? (
                        <div className="w-12 h-12 bg-white rounded-lg p-1.5 flex items-center justify-center flex-shrink-0">
                          <img src={project.logo} alt={project.client} className="w-full h-full object-contain" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Building2 className="w-5 h-5 text-white/60" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-white truncate">{project.title}</h3>
                          {project.featured && (
                            <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/40">
                              <Star className="w-3 h-3 mr-1" /> Featured
                            </Badge>
                          )}
                          {project.externalUrl && (
                            <Badge variant="outline" className="border-cyan-500/40 text-cyan-300">
                              <ExternalLinkIcon className="w-3 h-3 mr-1" /> External
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-white/60 truncate">
                          {project.client} · {project.sector} · {project.year}
                        </p>
                        <p className="text-xs text-cyan-400 mt-1 truncate">{project.metric}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-white/70 hover:text-white"
                          onClick={() => handleEditProject(project)}
                          data-testid={`button-edit-project-${project.id}`}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-red-400 hover:text-red-300"
                          onClick={() => {
                            if (confirm(`Delete "${project.title}"?`)) {
                              deleteProjectMutation.mutate(project.id);
                            }
                          }}
                          data-testid={`button-delete-project-${project.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            <Dialog open={isProjectDialogOpen} onOpenChange={(open) => {
              setIsProjectDialogOpen(open);
              if (!open) { setEditingProject(null); projectForm.reset(); }
            }}>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0a0a0d] border-slate-800 text-white">
                <DialogHeader>
                  <DialogTitle>{editingProject ? 'Edit Project' : 'New Project'}</DialogTitle>
                </DialogHeader>
                <Form {...projectForm}>
                  <form onSubmit={projectForm.handleSubmit(onProjectSubmit)} className="space-y-4">
                    <FormField
                      control={projectForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title *</FormLabel>
                          <FormControl><Input {...field} data-testid="input-project-title" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={projectForm.control}
                      name="slug"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Slug * <span className="text-xs text-muted-foreground">(used in shareable URL)</span></FormLabel>
                          <FormControl><Input {...field} placeholder="auto-generated from title" data-testid="input-project-slug" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={projectForm.control}
                        name="client"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Client *</FormLabel>
                            <FormControl><Input {...field} data-testid="input-project-client" /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={projectForm.control}
                        name="sector"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sector *</FormLabel>
                            <FormControl><Input {...field} placeholder="e.g. Insurance" data-testid="input-project-sector" /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={projectForm.control}
                        name="year"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Year / Period *</FormLabel>
                            <FormControl><Input {...field} placeholder="e.g. 2023" data-testid="input-project-year" /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={projectForm.control}
                        name="metric"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Headline Metric *</FormLabel>
                            <FormControl><Input {...field} placeholder="e.g. £1.2M / 36% gain" data-testid="input-project-metric" /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={projectForm.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Duration</FormLabel>
                          <FormControl><Input {...field} placeholder="e.g. 18 months" data-testid="input-project-duration" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={projectForm.control}
                      name="summary"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Summary <span className="text-xs text-muted-foreground">(1-2 sentences shown above the fold)</span></FormLabel>
                          <FormControl><Textarea rows={2} {...field} data-testid="input-project-summary" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={projectForm.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Role</FormLabel>
                          <FormControl><Input {...field} placeholder="e.g. Senior Project Manager" data-testid="input-project-role" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={projectForm.control}
                      name="challenge"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Challenge *</FormLabel>
                          <FormControl><Textarea rows={3} {...field} data-testid="input-project-challenge" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={projectForm.control}
                      name="impact"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Impact *</FormLabel>
                          <FormControl><Textarea rows={3} {...field} data-testid="input-project-impact" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={projectForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Detail <span className="text-xs text-muted-foreground">(longer narrative)</span></FormLabel>
                          <FormControl><Textarea rows={5} {...field} data-testid="input-project-description" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={projectForm.control}
                      name="outcomes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Outcomes <span className="text-xs text-muted-foreground">(one per line)</span></FormLabel>
                          <FormControl><Textarea rows={4} {...field} placeholder={`Delivered £1.2M programme on time\nReduced cycle time by 36%\nGrew team to 34 people`} data-testid="input-project-outcomes" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={projectForm.control}
                      name="techStack"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tools & Methods <span className="text-xs text-muted-foreground">(one per line)</span></FormLabel>
                          <FormControl><Textarea rows={3} {...field} placeholder={`Jira\nConfluence\nSAFe`} data-testid="input-project-techstack" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-1 gap-4">
                      <FormField
                        control={projectForm.control}
                        name="logo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Client Logo URL</FormLabel>
                            <div className="flex gap-2">
                              <FormControl>
                                <Input {...field} placeholder="https://logo.clearbit.com/..." data-testid="input-project-logo" />
                              </FormControl>
                              <label className="cursor-pointer">
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    const f = e.target.files?.[0];
                                    if (f) uploadProjectImage(f, 'logo');
                                  }}
                                />
                                <span className="inline-flex items-center justify-center h-10 px-3 rounded-md bg-white/10 hover:bg-white/20 border border-white/10">
                                  {uploadingLogo ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                                </span>
                              </label>
                            </div>
                            {field.value && (
                              <div className="mt-2 w-16 h-16 bg-white rounded p-1.5">
                                <img src={field.value} alt="logo" className="w-full h-full object-contain" />
                              </div>
                            )}
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={projectForm.control}
                        name="heroImage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Hero Image URL</FormLabel>
                            <div className="flex gap-2">
                              <FormControl>
                                <Input {...field} placeholder="https://..." data-testid="input-project-hero" />
                              </FormControl>
                              <label className="cursor-pointer">
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => {
                                    const f = e.target.files?.[0];
                                    if (f) uploadProjectImage(f, 'heroImage');
                                  }}
                                />
                                <span className="inline-flex items-center justify-center h-10 px-3 rounded-md bg-white/10 hover:bg-white/20 border border-white/10">
                                  {uploadingHero ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
                                </span>
                              </label>
                            </div>
                            {field.value && (
                              <img src={field.value} alt="hero" className="mt-2 w-full h-32 object-cover rounded" />
                            )}
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={projectForm.control}
                        name="galleryImages"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Gallery Images</FormLabel>
                            <div className="flex items-center gap-2">
                              <label className="cursor-pointer" data-testid="label-gallery-upload">
                                <input
                                  type="file"
                                  accept="image/*"
                                  multiple
                                  className="hidden"
                                  onChange={async (e) => {
                                    const files = Array.from(e.target.files || []);
                                    if (!files.length) return;
                                    const uploaded: string[] = [];
                                    for (const f of files) {
                                      try {
                                        const fd = new FormData();
                                        fd.append('image', f);
                                        const res = await fetch('/api/projects/upload-image', {
                                          method: 'POST',
                                          headers: { 'Authorization': `Bearer ${adminPassword}` },
                                          body: fd,
                                        });
                                        if (res.ok) {
                                          const { url } = await res.json();
                                          uploaded.push(url);
                                        }
                                      } catch {}
                                    }
                                    if (uploaded.length) {
                                      const next = [...(field.value || []), ...uploaded];
                                      field.onChange(next);
                                      toast({ title: 'Uploaded', description: `${uploaded.length} image(s) added` });
                                    } else {
                                      toast({ title: 'Error', description: 'Gallery upload failed', variant: 'destructive' });
                                    }
                                    e.target.value = '';
                                  }}
                                />
                                <span className="inline-flex items-center justify-center h-10 px-3 rounded-md bg-white/10 hover:bg-white/20 border border-white/10 gap-2 text-sm">
                                  <Upload className="w-4 h-4" /> Add gallery images
                                </span>
                              </label>
                              <span className="text-xs text-muted-foreground" data-testid="text-gallery-count">{(field.value || []).length} image(s)</span>
                            </div>
                            {(field.value || []).length > 0 && (
                              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-2">
                                {(field.value || []).map((src, i) => (
                                  <div key={i} className="relative group" data-testid={`gallery-item-${i}`}>
                                    <img src={src} alt={`gallery ${i + 1}`} className="w-full h-20 object-cover rounded border border-white/10" />
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const next = (field.value || []).filter((_, idx) => idx !== i);
                                        field.onChange(next);
                                      }}
                                      className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/70 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                      data-testid={`button-remove-gallery-${i}`}
                                      aria-label="Remove image"
                                    >
                                      ×
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={projectForm.control}
                      name="externalUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>External Case Study URL (optional)</FormLabel>
                          <FormControl><Input {...field} placeholder="https://..." data-testid="input-project-external" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={projectForm.control}
                        name="sortOrder"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sort Order</FormLabel>
                            <FormControl><Input type="number" {...field} data-testid="input-project-sort" /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={projectForm.control}
                        name="featured"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center gap-3 pt-7">
                            <FormControl>
                              <input
                                type="checkbox"
                                checked={field.value}
                                onChange={field.onChange}
                                className="w-5 h-5 accent-cyan-500"
                                data-testid="checkbox-project-featured"
                              />
                            </FormControl>
                            <FormLabel className="!mt-0">Featured (hero card)</FormLabel>
                          </FormItem>
                        )}
                      />
                    </div>
                    <DialogFooter>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => { setIsProjectDialogOpen(false); setEditingProject(null); projectForm.reset(); }}
                        data-testid="button-cancel-project"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={createProjectMutation.isPending || updateProjectMutation.isPending}
                        className="bg-gradient-to-r from-[hsl(190,85%,55%)] to-[hsl(220,90%,60%)] text-white border-0"
                        data-testid="button-save-project"
                      >
                        {(createProjectMutation.isPending || updateProjectMutation.isPending) && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        {editingProject ? 'Update' : 'Create'} Project
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* CV Management Tab */}
          <TabsContent value="cv" className="space-y-6">
            {/* Upload CV Section */}
            <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Upload CV
              </h2>
              {latestCV && (
                <div className="mb-4 p-3 bg-white/5 rounded-md">
                  <p className="text-sm text-white/60">
                    Current CV: <span className="text-white font-mono">{latestCV.filename}</span>
                  </p>
                  <p className="text-xs text-white/40 mt-1">
                    Uploaded: {new Date(latestCV.uploadedAt).toLocaleString()}
                  </p>
                </div>
              )}
              <form onSubmit={handleCVUpload} className="space-y-4">
                <div>
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setCVFile(e.target.files?.[0] || null)}
                    className="bg-white/5 border-white/10 text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-[hsl(190,85%,55%)] file:to-[hsl(220,90%,60%)] file:text-white hover:file:opacity-90"
                    data-testid="input-cv-file"
                  />
                  <p className="text-xs text-white/40 mt-2">
                    Accepted formats: PDF, DOC, DOCX (Max 10MB)
                  </p>
                </div>
                <Button
                  type="submit"
                  disabled={!cvFile || isUploading}
                  className="bg-gradient-to-r from-[hsl(190,85%,55%)] to-[hsl(220,90%,60%)] text-white"
                  data-testid="button-upload-cv"
                >
                  {isUploading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {isUploading ? 'Uploading...' : 'Upload CV'}
                </Button>
              </form>
            </Card>

            {/* CV Contacts Section */}
            <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <DownloadIcon className="w-5 h-5" />
                  CV Download Contacts ({cvContacts.length})
                </h2>
                {cvContacts.length > 0 && (
                  <Button
                    onClick={exportContacts}
                    variant="outline"
                    className="bg-white/5 border-white/20 text-white hover:bg-white/10"
                    data-testid="button-export-contacts"
                  >
                    <DownloadIcon className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                )}
              </div>

              {isLoadingContacts ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 text-[hsl(190,85%,55%)] animate-spin" />
                </div>
              ) : cvContacts.length === 0 ? (
                <div className="text-center py-12 text-white/60">
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-40" />
                  <p>No CV downloads yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-white/80">Name</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-white/80">Email</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-white/80">Phone</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-white/80">Downloaded</th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-white/80">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cvContacts.map((contact) => (
                        <tr 
                          key={contact.id} 
                          className="border-b border-white/5 hover:bg-white/5 transition-colors"
                          data-testid={`row-contact-${contact.id}`}
                        >
                          <td className="py-3 px-4 text-white">{contact.name}</td>
                          <td className="py-3 px-4 text-white/80">
                            <span className="flex items-center gap-2">
                              <Mail className="w-4 h-4 flex-shrink-0" />
                              {contact.email}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-white/80">
                            {contact.phone ? (
                              <span className="flex items-center gap-2">
                                <Phone className="w-4 h-4 flex-shrink-0" />
                                {contact.phone}
                              </span>
                            ) : (
                              <span className="text-white/40">N/A</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-white/60 text-sm">
                            <span className="flex items-center gap-2">
                              <CalendarIcon className="w-4 h-4 flex-shrink-0" />
                              {new Date(contact.downloadedAt).toLocaleString()}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => deleteContactMutation.mutate(contact.id)}
                              disabled={deleteContactMutation.isPending}
                              className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                              data-testid={`button-delete-contact-${contact.id}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
