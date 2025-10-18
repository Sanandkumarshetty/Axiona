import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Search,
  Menu,
  Home,
  History,
  Heart,
  Download,
  Bookmark,
  Play,
  Clock,
  Eye,
  X,
  ThumbsUp,
  Share2,
  MoreVertical
} from 'lucide-react'

interface Tutorial {
  id: string
  title: string
  description: string
  thumbnail: string
  videoId: string
  duration: string
  views: number
  publishedAt: Date
  category: string
  tags: string[]
  instructor: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  rating: number
  isLiked?: boolean
  isSaved?: boolean
  isDownloaded?: boolean
  lastWatched?: Date
  watchProgress?: number
}

interface SidebarData {
  history: Tutorial[]
  saved: Tutorial[]
  liked: Tutorial[]
  downloaded: Tutorial[]
}

const TutorialHub: React.FC = () => {
  const navigate = useNavigate()
  const [tutorials, setTutorials] = useState<Tutorial[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeModal, setActiveModal] = useState<'history' | 'saved' | 'liked' | 'downloaded' | null>(null)
  const [sidebarData, setSidebarData] = useState<SidebarData>({
    history: [],
    saved: [],
    liked: [],
    downloaded: []
  })

  // Mock data for tutorials
  useEffect(() => {
    const mockTutorials: Tutorial[] = [
      {
        id: '1',
        title: 'Introduction to SQL Databases',
        description: 'Learn the basics of relational databases and SQL queries with practical examples.',
        thumbnail: '/api/placeholder/320/180',
        videoId: 'dQw4w9WgXcQ', // Mock YouTube video ID
        duration: '15:42',
        views: 45823,
        publishedAt: new Date('2024-01-15'),
        category: 'Database Management',
        tags: ['SQL', 'Database', 'Backend'],
        instructor: 'Dr. Sarah Johnson',
        difficulty: 'Beginner',
        rating: 4.8,
        isLiked: false,
        isSaved: true,
        isDownloaded: false
      },
      {
        id: '2',
        title: 'TCP/IP Protocol Suite',
        description: 'Comprehensive guide to understanding TCP/IP networking protocols and their applications.',
        thumbnail: '/api/placeholder/320/180',
        videoId: 'xyz123abc',
        duration: '22:18',
        views: 32156,
        publishedAt: new Date('2024-02-10'),
        category: 'Computer Networks',
        tags: ['TCP/IP', 'Networking', 'Protocols'],
        instructor: 'Prof. Michael Chen',
        difficulty: 'Intermediate',
        rating: 4.6,
        isLiked: true,
        isSaved: false,
        isDownloaded: true,
        lastWatched: new Date('2024-09-15'),
        watchProgress: 65
      },
      {
        id: '3',
        title: 'Object-Oriented Programming in Java',
        description: 'Master the principles of OOP including inheritance, polymorphism, and encapsulation.',
        thumbnail: '/api/placeholder/320/180',
        videoId: 'abc456def',
        duration: '28:33',
        views: 67432,
        publishedAt: new Date('2024-01-28'),
        category: 'Object-Oriented Programming',
        tags: ['Java', 'OOP', 'Programming'],
        instructor: 'Dr. Emily Rodriguez',
        difficulty: 'Intermediate',
        rating: 4.9,
        isLiked: true,
        isSaved: true,
        isDownloaded: false,
        lastWatched: new Date('2024-09-20'),
        watchProgress: 30
      },
      {
        id: '4',
        title: 'Linux System Administration',
        description: 'Essential Linux commands and system administration techniques for beginners.',
        thumbnail: '/api/placeholder/320/180',
        videoId: 'def789ghi',
        duration: '18:45',
        views: 28934,
        publishedAt: new Date('2024-03-05'),
        category: 'Operating Systems',
        tags: ['Linux', 'System Admin', 'Command Line'],
        instructor: 'Mark Thompson',
        difficulty: 'Beginner',
        rating: 4.5,
        isLiked: false,
        isSaved: false,
        isDownloaded: true,
        lastWatched: new Date('2024-09-10'),
        watchProgress: 100
      },
      {
        id: '5',
        title: 'Arrays and Linked Lists',
        description: 'Fundamental data structures with implementation examples and use cases.',
        thumbnail: '/api/placeholder/320/180',
        videoId: 'ghi012jkl',
        duration: '24:12',
        views: 41287,
        publishedAt: new Date('2024-02-22'),
        category: 'Data Structures',
        tags: ['Arrays', 'Linked Lists', 'Data Structures'],
        instructor: 'Dr. Alex Kumar',
        difficulty: 'Intermediate',
        rating: 4.7,
        isLiked: true,
        isSaved: false,
        isDownloaded: false
      },
      {
        id: '6',
        title: 'Sorting and Searching Algorithms',
        description: 'Explore efficient sorting and searching techniques with time complexity analysis.',
        thumbnail: '/api/placeholder/320/180',
        videoId: 'jkl345mno',
        duration: '31:28',
        views: 53621,
        publishedAt: new Date('2024-03-12'),
        category: 'Algorithms',
        tags: ['Sorting', 'Searching', 'Algorithms'],
        instructor: 'Prof. Lisa Wang',
        difficulty: 'Advanced',
        rating: 4.8,
        isLiked: false,
        isSaved: true,
        isDownloaded: true,
        lastWatched: new Date('2024-09-18'),
        watchProgress: 85
      }
    ]

    setTutorials(mockTutorials)

    // Populate sidebar data based on tutorial properties
    setSidebarData({
      history: mockTutorials.filter(t => t.lastWatched),
      saved: mockTutorials.filter(t => t.isSaved),
      liked: mockTutorials.filter(t => t.isLiked),
      downloaded: mockTutorials.filter(t => t.isDownloaded)
    })
  }, [])

  const filteredTutorials = tutorials.filter(tutorial =>
    tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tutorial.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tutorial.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tutorial.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleTutorialAction = (tutorialId: string, action: 'like' | 'save' | 'download') => {
    setTutorials(prev => prev.map(tutorial => {
      if (tutorial.id === tutorialId) {
        const updated = { ...tutorial }
        switch (action) {
          case 'like':
            updated.isLiked = !updated.isLiked
            break
          case 'save':
            updated.isSaved = !updated.isSaved
            break
          case 'download':
            updated.isDownloaded = !updated.isDownloaded
            break
        }
        return updated
      }
      return tutorial
    }))

    // Update sidebar data
    const updatedTutorials = tutorials.map(tutorial => {
      if (tutorial.id === tutorialId) {
        const updated = { ...tutorial }
        switch (action) {
          case 'like':
            updated.isLiked = !updated.isLiked
            break
          case 'save':
            updated.isSaved = !updated.isSaved
            break
          case 'download':
            updated.isDownloaded = !updated.isDownloaded
            break
        }
        return updated
      }
      return tutorial
    })

    setSidebarData({
      history: updatedTutorials.filter(t => t.lastWatched),
      saved: updatedTutorials.filter(t => t.isSaved),
      liked: updatedTutorials.filter(t => t.isLiked),
      downloaded: updatedTutorials.filter(t => t.isDownloaded)
    })
  }

  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`
    return views.toString()
  }

  const formatDate = (date: Date) => {
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return '1 day ago'
    if (diffDays < 30) return `${diffDays} days ago`
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
    return `${Math.floor(diffDays / 365)} years ago`
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-50'
      case 'Intermediate': return 'text-yellow-600 bg-yellow-50'
      case 'Advanced': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const renderModal = () => {
    if (!activeModal) return null

    const modalData = sidebarData[activeModal]
    const modalTitles = {
      history: 'Watch History',
      saved: 'Saved Tutorials',
      liked: 'Liked Tutorials',
      downloaded: 'Downloaded Tutorials'
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[80vh] overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-900">{modalTitles[activeModal]}</h2>
            <button
              onClick={() => setActiveModal(null)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            {modalData.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No tutorials found in {activeModal}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {modalData.map((tutorial) => (
                  <div key={tutorial.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img
                        src={tutorial.thumbnail}
                        alt={tutorial.title}
                        className="w-full h-40 object-cover"
                      />
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                        {tutorial.duration}
                      </div>
                      {tutorial.watchProgress && tutorial.watchProgress > 0 && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-300">
                          <div 
                            className="h-full bg-red-600"
                            style={{ width: `${tutorial.watchProgress}%` }}
                          />
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{tutorial.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{tutorial.instructor}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{formatViews(tutorial.views)} views</span>
                        <span>{formatDate(tutorial.publishedAt)}</span>
                      </div>
                      {activeModal === 'history' && tutorial.lastWatched && (
                        <p className="text-xs text-gray-400 mt-2">
                          Watched {formatDate(tutorial.lastWatched)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen dashboard-bg">
      {/* Header */}
      <div className="app-header sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              {/* Hamburger Menu */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="h-6 w-6" />
              </button>
              
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">SA</span>
                  </div>
                  <span className="font-bold text-xl text-gray-900">Study-AI</span>
                </div>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">Tutorial Hub</span>
              </div>
            </div>

            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tutorials..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <MoreVertical className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Collapsible Sidebar */}
        <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-0'
        } overflow-hidden`}>
          <div className="p-4 space-y-2">
            <button
              onClick={() => setActiveModal('history')}
              className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-100 rounded-lg text-left"
            >
              <History className="h-5 w-5" />
              <span>History</span>
              <span className="ml-auto text-sm text-gray-500">
                {sidebarData.history.length}
              </span>
            </button>
            
            <button
              onClick={() => setActiveModal('saved')}
              className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-100 rounded-lg text-left"
            >
              <Bookmark className="h-5 w-5" />
              <span>Saved</span>
              <span className="ml-auto text-sm text-gray-500">
                {sidebarData.saved.length}
              </span>
            </button>
            
            <button
              onClick={() => setActiveModal('liked')}
              className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-100 rounded-lg text-left"
            >
              <Heart className="h-5 w-5" />
              <span>Liked</span>
              <span className="ml-auto text-sm text-gray-500">
                {sidebarData.liked.length}
              </span>
            </button>
            
            <button
              onClick={() => setActiveModal('downloaded')}
              className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-gray-100 rounded-lg text-left"
            >
              <Download className="h-5 w-5" />
              <span>Downloaded</span>
              <span className="ml-auto text-sm text-gray-500">
                {sidebarData.downloaded.length}
              </span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Tutorial Hub</h1>
            <p className="text-gray-600">Discover and learn with our curated video tutorials</p>
          </div>

          {/* Tutorials Grid */}
          <div className="tutorial-grid">
            {filteredTutorials.map((tutorial) => (
              <div key={tutorial.id} className="tutorial-card">
                <div className="relative group cursor-pointer">
                  <img
                    src={tutorial.thumbnail}
                    alt={tutorial.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                    <Play className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                    {tutorial.duration}
                  </div>
                  <div className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-medium ${
                    getDifficultyColor(tutorial.difficulty)
                  }`}>
                    {tutorial.difficulty}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{tutorial.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{tutorial.description}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-500">{tutorial.instructor}</span>
                    <div className="flex items-center space-x-1">
                      <span className="text-sm text-yellow-500">⭐</span>
                      <span className="text-sm text-gray-600">{tutorial.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{formatViews(tutorial.views)}</span>
                    </div>
                    <span>{formatDate(tutorial.publishedAt)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleTutorialAction(tutorial.id, 'like')}
                        className={`p-2 rounded-lg transition-colors ${
                          tutorial.isLiked 
                            ? 'text-red-600 bg-red-50' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <Heart className={`h-4 w-4 ${tutorial.isLiked ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={() => handleTutorialAction(tutorial.id, 'save')}
                        className={`p-2 rounded-lg transition-colors ${
                          tutorial.isSaved 
                            ? 'text-blue-600 bg-blue-50' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <Bookmark className={`h-4 w-4 ${tutorial.isSaved ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={() => handleTutorialAction(tutorial.id, 'download')}
                        className={`p-2 rounded-lg transition-colors ${
                          tutorial.isDownloaded 
                            ? 'text-green-600 bg-green-50' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => navigate(`/tutorial-player/${tutorial.id}`)}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2">
                      <Play className="h-4 w-4" />
                      <span>Watch</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTutorials.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No tutorials found matching your search.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {renderModal()}
    </div>
  )
}

export default TutorialHub
