import React, { useState, useEffect } from 'react';
import { Play, BookOpen, Newspaper, TrendingUp, Clock, Eye, ExternalLink } from 'lucide-react';

const CONTENT_TYPES = {
  ALL: 'all',
  VIDEOS: 'videos',
  ARTICLES: 'articles',
  UPDATES: 'updates'
};

const NEWS_API_URL = 'https://dev.to/api/articles'; 

const ContentCard = ({ item }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="glass-card p-4 rounded-xl hover:scale-102 transition-all duration-300">
      <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
        <img 
          src={imgError ? `https://picsum.photos/seed/${item.id}/800/600` : item.thumbnail}
          alt={item.title}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      </div>
      
      <div className="space-y-2">
        <h3 className="font-heading font-semibold text-lg text-[var(--primary-900)]">
          {item.title}
        </h3>
        <p className="text-sm text-[var(--primary-600)] line-clamp-2">
          {item.description}
        </p>
        
        <div className="flex items-center gap-4 text-sm text-[var(--primary-500)]">
          {item.type === 'video' ? (
            <>
              <span className="flex items-center gap-1">
                <Clock size={16} />
                {item.duration}
              </span>
            </>
          ) : (
            <>
              <span className="flex items-center gap-1">
                <Clock size={16} />
                {item.readTime}
              </span>
            </>
          )}
          <span className="flex items-center gap-1">
            <Eye size={16} />
            {item.views}
          </span>
        </div>

        <div className="flex gap-2">
          {item.tags.map((tag, index) => (
            <span 
              key={index}
              className="px-2 py-1 rounded-full text-xs bg-[var(--primary-50)] text-[var(--primary-600)]"
            >
              {tag}
            </span>
          ))}
        </div>

        <a 
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-[var(--primary-500)] hover:text-[var(--primary-700)]"
        >
          Learn More <ExternalLink size={16} />
        </a>
      </div>
    </div>
  );
};


const staticContent = [
  // Videos
  {
    id: 'v1',
    type: 'video',
    title: 'Warren Buffett - HBO Documentary',
    description: 'Becoming Warren Buffett: Learn about value investing and business principles from one of the world\'s most successful investors.',
    thumbnail: 'https://img.youtube.com/vi/2MPg8GPXODA/maxresdefault.jpg',
    duration: '1:28:00',
    views: '2.1M',
    platform: 'YouTube',
    link: 'https://www.youtube.com/watch?v=2MPg8GPXODA',
    tags: ['investing', 'business-strategy']
  },
  {
    id: 'v2',
    type: 'video',
    title: 'How to Write a Business Plan',
    description: 'Harvard Business School professor explains the key components of an effective business plan.',
    thumbnail: 'https://img.youtube.com/vi/SMr_uLZV-eM/maxresdefault.jpg',
    duration: '22:15',
    views: '850K',
    platform: 'YouTube',
    link: 'https://www.youtube.com/watch?v=SMr_uLZV-eM',
    tags: ['business-plan', 'entrepreneurship']
  },
  {
    id: 'v3',
    type: 'video',
    title: 'Understanding Financial Markets',
    description: 'Yale Course on Financial Markets: Introduction to risk management and behavioral finance principles.',
    thumbnail: 'https://img.youtube.com/vi/WQui_3Hpmmc/maxresdefault.jpg',
    duration: '1:15:30',
    views: '1.2M',
    platform: 'YouTube',
    link: 'https://www.youtube.com/watch?v=WQui_3Hpmmc',
    tags: ['finance', 'markets']
  },
  {
    id: 'v4',
    type: 'video',
    title: 'Digital Marketing Masterclass',
    description: 'Complete guide to modern digital marketing strategies and tools for business growth.',
    thumbnail: 'https://img.youtube.com/vi/nU-IIXBWlS4/maxresdefault.jpg',
    duration: '45:20',
    views: '500K',
    platform: 'YouTube',
    link: 'https://www.youtube.com/watch?v=nU-IIXBWlS4',
    tags: ['marketing', 'digital']
  },
  {
    id: 'v5',
    type: 'video',
    title: 'Supply Chain Management Explained',
    description: 'MIT lecture on modern supply chain management principles and global logistics.',
    thumbnail: 'https://img.youtube.com/vi/Mi1QBxVjZAw/maxresdefault.jpg',
    duration: '52:10',
    views: '320K',
    platform: 'YouTube',
    link: 'https://www.youtube.com/watch?v=Mi1QBxVjZAw',
    tags: ['supply-chain', 'logistics']
  },

  // Articles
  {
    id: 'a1',
    type: 'article',
    title: 'The Future of Remote Work',
    description: 'Harvard Business Review analysis on how remote work is reshaping business operations and management.',
    thumbnail: 'https://images.unsplash.com/photo-1587560699334-cc4ff634909a',
    readTime: '8 mins',
    views: '125K',
    author: 'Harvard Business Review',
    publishDate: '2024-02-15',
    link: 'https://hbr.org/2024/02/the-future-of-remote-work',
    tags: ['remote-work', 'management']
  },
  {
    id: 'a2',
    type: 'article',
    title: 'AI in Business: 2024 Guide',
    description: 'Comprehensive guide on implementing AI solutions in modern business operations.',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
    readTime: '12 mins',
    views: '82K',
    author: 'MIT Technology Review',
    publishDate: '2024-01-28',
    link: 'https://www.technologyreview.com/ai-in-business-2024',
    tags: ['AI', 'technology']
  },
  {
    id: 'a3',
    type: 'article',
    title: 'Sustainable Business Practices',
    description: 'How companies are incorporating sustainability into their business models.',
    thumbnail: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51',
    readTime: '10 mins',
    views: '45K',
    author: 'Forbes',
    publishDate: '2024-02-10',
    link: 'https://www.forbes.com/sustainable-business-2024',
    tags: ['sustainability', 'business']
  },
  {
    id: 'a4',
    type: 'article',
    title: 'Global Supply Chain Trends',
    description: 'Analysis of emerging trends in global supply chain management and logistics.',
    thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d',
    readTime: '15 mins',
    views: '38K',
    author: 'McKinsey & Company',
    publishDate: '2024-02-01',
    link: 'https://www.mckinsey.com/supply-chain-trends-2024',
    tags: ['supply-chain', 'global']
  },
  {
    id: 'a5',
    type: 'article',
    title: 'Small Business Digital Transformation',
    description: 'Step-by-step guide for small businesses adapting to digital transformation.',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    readTime: '7 mins',
    views: '29K',
    author: 'Entrepreneur',
    publishDate: '2024-02-20',
    link: 'https://www.entrepreneur.com/digital-transformation-guide',
    tags: ['digital', 'small-business']
  },

  // Updates/Events
  {
    id: 'u1',
    type: 'updates',
    title: 'World Economic Forum 2024',
    description: 'Key takeaways from the annual meeting in Davos discussing global business trends.',
    thumbnail: 'https://images.unsplash.com/photo-1507878866276-a947ef722fee',
    readTime: '5 mins',
    views: '150K',
    author: 'WEF',
    publishDate: '2024-01-30',
    link: 'https://www.weforum.org/events/world-economic-forum-annual-meeting-2024',
    tags: ['event', 'global-economy']
  },
  {
    id: 'u2',
    type: 'updates',
    title: 'Business Innovation Summit 2024',
    description: 'Upcoming virtual summit featuring leading business innovators and entrepreneurs.',
    thumbnail: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b',
    readTime: '3 mins',
    views: '15K',
    author: 'Innovation Hub',
    publishDate: '2024-03-01',
    link: 'https://www.innovationsummit2024.com',
    tags: ['event', 'innovation']
  },
  {
    id: 'u3',
    type: 'updates',
    title: 'New Business Tax Regulations',
    description: 'Important updates on international business tax regulations for 2024.',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c',
    readTime: '6 mins',
    views: '42K',
    author: 'Business Insider',
    publishDate: '2024-02-25',
    link: 'https://www.businessinsider.com/tax-updates-2024',
    tags: ['updates', 'tax']
  }
];

const updatedStaticContent = staticContent.map(item => {
  if (item.type === 'video') {
    const videoId = item.link.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([\w-]{11})/)?.[1];
    return {
      ...item,
      thumbnail: videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : item.thumbnail
    };
  }
  return item;
});

const LearningHub = () => {
  const [content, setContent] = useState(updatedStaticContent);
  const [activeType, setActiveType] = useState(CONTENT_TYPES.ALL);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      try {
        const devtoResponse = await fetch(
          `${NEWS_API_URL}?tag=business,entrepreneurship,startup&per_page=30`
        );
        const devtoData = await devtoResponse.json();
        const articles = devtoData
          .filter(article => article.cover_image || article.social_image)
          .map(article => ({
            id: `devto-${article.id}`,
            type: 'article',
            title: article.title,
            description: article.description || article.title,
            thumbnail: article.cover_image || article.social_image,
            readTime: `${article.reading_time_minutes} mins`,
            views: article.page_views_count || 'N/A',
            author: article.user.name,
            publishDate: article.published_at,
            link: article.url,
            tags: article.tag_list.slice(0, 2)
          }));

        // Sort content to show articles first, then videos
        const sortedStaticContent = [...staticContent].sort((a, b) => {
          if (a.type === 'article' && b.type !== 'article') return -1;
          if (a.type !== 'article' && b.type === 'article') return 1;
          return 0;
        });

        const allContent = [...sortedStaticContent, ...articles];
        setContent(allContent);

      } catch (error) {
        console.error('Error fetching content:', error);
        const sortedStaticContent = [...staticContent].sort((a, b) => {
          if (a.type === 'article' && b.type !== 'article') return -1;
          if (a.type !== 'article' && b.type === 'article') return 1;
          return 0;
        });
        setContent(sortedStaticContent);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const filteredContent = content.filter(item => {
    const matchesType = activeType === CONTENT_TYPES.ALL || 
      (activeType === CONTENT_TYPES.VIDEOS && item.type === 'video') ||
      (activeType === CONTENT_TYPES.ARTICLES && item.type === 'article') ||
      (activeType === CONTENT_TYPES.UPDATES && item.type === 'updates');

    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesType && matchesSearch;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredContent.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredContent.length / itemsPerPage);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-[var(--primary-900)] mb-2">
          Learning Hub
        </h1>
        <p className="text-[var(--primary-600)]">
          Expand your knowledge about international trade and business
        </p>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveType(CONTENT_TYPES.ALL)}
          className={`px-4 py-2 rounded-lg font-medium ${
            activeType === CONTENT_TYPES.ALL 
              ? 'gradient-bg text-white' 
              : 'text-[var(--primary-600)] hover:bg-[var(--primary-50)]'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setActiveType(CONTENT_TYPES.VIDEOS)}
          className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
            activeType === CONTENT_TYPES.VIDEOS 
              ? 'gradient-bg text-white' 
              : 'text-[var(--primary-600)] hover:bg-[var(--primary-50)]'
          }`}
        >
          <Play size={18} /> Videos
        </button>
        <button
          onClick={() => setActiveType(CONTENT_TYPES.ARTICLES)}
          className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
            activeType === CONTENT_TYPES.ARTICLES 
              ? 'gradient-bg text-white' 
              : 'text-[var(--primary-600)] hover:bg-[var(--primary-50)]'
          }`}
        >
          <BookOpen size={18} /> Articles
        </button>
        <button
          onClick={() => setActiveType(CONTENT_TYPES.UPDATES)}
          className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
            activeType === CONTENT_TYPES.UPDATES 
              ? 'gradient-bg text-white' 
              : 'text-[var(--primary-600)] hover:bg-[var(--primary-50)]'
          }`}
        >
          <Newspaper size={18} /> Updates
        </button>
      </div>

      <input
        type="text"
        placeholder="Search content..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full max-w-md px-4 py-2 rounded-lg mb-6 border border-[var(--glass-border)] bg-white/50 focus:outline-none focus:ring-2 focus:ring-[var(--primary-300)]"
      />

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentItems.map(item => (
              <ContentCard key={item.id} item={item} />
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg disabled:opacity-50 text-[var(--primary-600)] hover:bg-[var(--primary-50)]"
            >
              Previous
            </button>
            
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === index + 1
                    ? 'gradient-bg text-white'
                    : 'text-[var(--primary-600)] hover:bg-[var(--primary-50)]'
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg disabled:opacity-50 text-[var(--primary-600)] hover:bg-[var(--primary-50)]"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default LearningHub; 