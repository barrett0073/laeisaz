// Define interfaces for the multilingual fields
export interface MultilingualField {
  en: string;
  fa: string;
}

// EventType enum
export enum EventType {
  INFO = 'info',
  WARNING = 'warning',
  SUCCESS = 'success',
  ERROR = 'error'
}

// BlogPost interface
export interface IBlogPost {
  id: string;
  title: MultilingualField;
  description: MultilingualField;
  content?: MultilingualField;
  category: string;
  date: Date;
  author: MultilingualField;
  image?: string;
  images: string[];
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Event interface
export interface IEvent {
  id: string;
  title: MultilingualField;
  message: MultilingualField;
  type: EventType;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  link?: string;
  icon?: string;
  priority: number;
  image?: string;
  clickCount: number;
  createdAt: Date;
  updatedAt: Date;
}

// Gallery interface
export interface IGallery {
  id: string;
  title: MultilingualField;
  description?: MultilingualField;
  image: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// PageView interface
export interface IPageView {
  id: string;
  path: string;
  timestamp: Date;
  blogPostId?: string;
  userAgent?: string;
  referer?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Helper functions to convert between MySQL database format and interface format
export const blogPostFromDb = (row: any): IBlogPost => {
  // Safely parse images JSON
  let images: string[] = [];
  if (row.images) {
    try {
      const parsed = JSON.parse(row.images);
      images = Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.warn('Failed to parse images JSON:', row.images, error);
      images = [];
    }
  }

  return {
    id: row.id,
    title: {
      en: row.title_en,
      fa: row.title_fa,
    },
    description: {
      en: row.description_en,
      fa: row.description_fa,
    },
    content: row.content_en && row.content_fa ? {
      en: row.content_en,
      fa: row.content_fa,
    } : undefined,
    category: row.category,
    date: row.date,
    author: {
      en: row.author_en,
      fa: row.author_fa,
    },
    image: row.image || '',
    images: images,
    featured: Boolean(row.featured),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export const eventFromDb = (row: any): IEvent => ({
  id: row.id,
  title: {
    en: row.title_en,
    fa: row.title_fa,
  },
  message: {
    en: row.message_en,
    fa: row.message_fa,
  },
  type: row.type as EventType,
  startDate: row.start_date,
  endDate: row.end_date,
  isActive: Boolean(row.is_active),
  link: row.link,
  icon: row.icon,
  priority: row.priority,
  image: row.image,
  clickCount: row.click_count,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
})

export const galleryFromDb = (row: any): IGallery => ({
  id: row.id,
  title: {
    en: row.title_en,
    fa: row.title_fa,
  },
  description: row.description_en && row.description_fa ? {
    en: row.description_en,
    fa: row.description_fa,
  } : undefined,
  image: row.image,
  order: row.order,
  isActive: Boolean(row.is_active),
  createdAt: row.created_at,
  updatedAt: row.updated_at,
})

export const pageViewFromDb = (row: any): IPageView => ({
  id: row.id,
  path: row.path,
  timestamp: row.timestamp,
  blogPostId: row.blog_post_id,
  userAgent: row.user_agent,
  referer: row.referer,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
}) 