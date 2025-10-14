import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { BookOpen, Clock, Calendar, ArrowRight, Filter, Sparkles, Loader2 } from 'lucide-react';
import { Link } from 'wouter';

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

export default function InsightsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Fetch blog posts from database
  const { data: blogPosts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog-posts'],
  });

  const categories = ['All', ...Array.from(new Set(blogPosts.map(post => post.category)))];
  const featuredPost = blogPosts.find(post => post.featured);
  
  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[hsl(262,50%,8%)] via-[hsl(245,30%,12%)] to-[hsl(220,40%,10%)] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[hsl(190,85%,55%)] animate-spin mx-auto mb-4" />
          <p className="text-white/60">Loading insights...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(262,50%,8%)] via-[hsl(245,30%,12%)] to-[hsl(220,40%,10%)]">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden" data-testid="section-hero">
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(190,85%,55%)]/10 via-transparent to-transparent" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-[hsl(220,90%,60%)]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[hsl(262,50%,50%)]/20 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto relative">
          <Link href="/">
            <Button 
              variant="ghost" 
              className="mb-8 text-white/70 hover:text-white"
              data-testid="button-back-home"
            >
              ← Back to Portfolio
            </Button>
          </Link>

          <div className="text-center mb-12">
            <Badge 
              className="mb-4 bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20"
              data-testid="badge-insights"
            >
              <Sparkles className="w-3 h-3 mr-1" />
              Insights & Thought Leadership
            </Badge>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6" data-testid="text-insights-title">
              Knowledge from the Field
            </h1>
            <p className="text-xl text-white/60 max-w-3xl mx-auto" data-testid="text-insights-subtitle">
              17+ years of project management wisdom, lessons learned, and practical methodologies shared through real-world experiences
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12" data-testid="category-filters">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`
                  ${selectedCategory === category 
                    ? 'bg-[hsl(190,85%,55%)] text-white border-[hsl(190,85%,55%)]' 
                    : 'bg-white/5 backdrop-blur-md border-white/20 text-white/80 hover:bg-white/10'
                  }
                `}
                onClick={() => setSelectedCategory(category)}
                data-testid={`button-filter-${category.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <Filter className="w-4 h-4 mr-2" />
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && selectedCategory === 'All' && (
        <section className="relative py-12 px-6" data-testid="section-featured">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[hsl(190,85%,55%)]" />
              <h2 className="font-display text-2xl font-bold text-white">Featured Article</h2>
            </div>

            <Card 
              className="bg-white/5 backdrop-blur-xl border-white/10 p-8 hover-elevate transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedPost(featuredPost)}
              data-testid="card-featured-post"
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-[hsl(220,90%,60%)]/20 border-[hsl(220,90%,60%)]/30 text-[hsl(220,90%,70%)] backdrop-blur-md">
                      {featuredPost.category}
                    </Badge>
                    <Badge className="bg-[hsl(190,85%,55%)]/20 border-[hsl(190,85%,55%)]/30 text-[hsl(190,85%,70%)] backdrop-blur-md">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                  
                  <h3 className="font-display text-3xl font-bold text-white">
                    {featuredPost.title}
                  </h3>
                  
                  <p className="text-white/70 text-lg leading-relaxed">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-white/50">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(featuredPost.publishDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </span>
                  </div>

                  <Button 
                    className="bg-[hsl(190,85%,55%)] text-white hover:bg-[hsl(190,85%,45%)] mt-4"
                    data-testid="button-read-featured"
                  >
                    Read Article
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>

                <div className="relative h-64 md:h-full min-h-[300px] bg-gradient-to-br from-[hsl(190,85%,55%)]/20 to-[hsl(220,90%,60%)]/20 rounded-xl flex items-center justify-center border border-white/10">
                  <BookOpen className="w-24 h-24 text-white/30" />
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="relative py-12 px-6 pb-24" data-testid="section-articles">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="font-display text-2xl font-bold text-white mb-2">
              {selectedCategory === 'All' ? 'All Articles' : `${selectedCategory} Articles`}
            </h2>
            <p className="text-white/60">
              {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'} found
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {filteredPosts.map((post, index) => (
              <Card
                key={post.id}
                className="bg-white/5 backdrop-blur-xl border-white/10 p-6 hover-elevate transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedPost(post)}
                data-testid={`card-blog-${index}`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-md bg-gradient-to-br from-[hsl(190,85%,55%)] to-[hsl(220,90%,60%)] flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <Badge className="bg-[hsl(220,90%,60%)]/20 border-[hsl(220,90%,60%)]/30 text-[hsl(220,90%,70%)] backdrop-blur-md text-xs mb-2">
                      {post.category}
                    </Badge>
                    <h3 className="font-display text-xl font-bold text-white mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                  </div>
                </div>

                <p className="text-white/70 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-white/50">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.publishDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </span>
                  </div>

                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-[hsl(190,85%,55%)] hover:text-[hsl(190,85%,65%)]"
                    data-testid={`button-read-more-${index}`}
                  >
                    Read More
                    <ArrowRight className="ml-1 w-3 h-3" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {post.tags.slice(0, 3).map((tag, idx) => (
                    <Badge 
                      key={idx}
                      className="bg-white/5 border-white/10 text-white/60 text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-white/60 text-lg">No articles found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Article Detail Dialog */}
      <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-[hsl(245,30%,12%)] border-white/10">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-[hsl(220,90%,60%)]/20 border-[hsl(220,90%,60%)]/30 text-[hsl(220,90%,70%)] backdrop-blur-md">
                {selectedPost?.category}
              </Badge>
              {selectedPost?.featured && (
                <Badge className="bg-[hsl(190,85%,55%)]/20 border-[hsl(190,85%,55%)]/30 text-[hsl(190,85%,70%)] backdrop-blur-md">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
              )}
            </div>
            <DialogTitle className="font-display text-3xl font-bold text-white mb-4">
              {selectedPost?.title}
            </DialogTitle>
            <DialogDescription className="text-white/60 text-base mb-6">
              {selectedPost?.excerpt}
            </DialogDescription>
            <div className="flex items-center gap-4 text-sm text-white/50 mb-6">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {selectedPost?.readTime}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {selectedPost && new Date(selectedPost.publishDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
            </div>
          </DialogHeader>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-white/80 leading-relaxed whitespace-pre-line">
              {selectedPost?.content}
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-sm text-white/60 mb-3">Topics covered:</p>
            <div className="flex flex-wrap gap-2">
              {selectedPost?.tags.map((tag, idx) => (
                <Badge 
                  key={idx}
                  className="bg-white/10 border-white/20 text-white/80 text-xs"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
