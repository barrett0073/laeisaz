-- MySQL Schema for Laeisaz Website
-- Run these commands in your MySQL Cloud SQL instance

-- Create database (optional, if not already created)
-- CREATE DATABASE laeisaz;
-- USE laeisaz;

-- Blog Posts table
CREATE TABLE blog_posts (
    id VARCHAR(255) PRIMARY KEY,
    title_en VARCHAR(500) NOT NULL,
    title_fa VARCHAR(500) NOT NULL,
    description_en TEXT NOT NULL,
    description_fa TEXT NOT NULL,
    content_en LONGTEXT,
    content_fa LONGTEXT,
    category VARCHAR(100) NOT NULL,
    date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    author_en VARCHAR(255) NOT NULL DEFAULT 'Admin',
    author_fa VARCHAR(255) NOT NULL DEFAULT 'ادمین',
    image VARCHAR(1000),
    images JSON,
    featured BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_date (date),
    INDEX idx_category (category),
    INDEX idx_featured (featured)
);

-- Events table
CREATE TABLE events (
    id VARCHAR(255) PRIMARY KEY,
    title_en VARCHAR(500) NOT NULL,
    title_fa VARCHAR(500) NOT NULL,
    message_en TEXT NOT NULL,
    message_fa TEXT NOT NULL,
    type ENUM('info', 'warning', 'success', 'error') DEFAULT 'info',
    start_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    end_date DATETIME NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    link VARCHAR(1000),
    icon VARCHAR(255),
    priority TINYINT DEFAULT 1 CHECK (priority >= 1 AND priority <= 10),
    image VARCHAR(1000),
    click_count INT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_active_dates (is_active, start_date, end_date),
    INDEX idx_priority (priority)
);

-- Gallery table
CREATE TABLE gallery (
    id VARCHAR(255) PRIMARY KEY,
    title_en VARCHAR(500) NOT NULL,
    title_fa VARCHAR(500) NOT NULL,
    description_en TEXT,
    description_fa TEXT,
    image VARCHAR(1000) NOT NULL,
    `order` INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_active_order (is_active, `order`)
);

-- Page Views table
CREATE TABLE page_views (
    id VARCHAR(255) PRIMARY KEY,
    path VARCHAR(500) NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    blog_post_id VARCHAR(255),
    user_agent TEXT,
    referer TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_path (path),
    INDEX idx_timestamp (timestamp),
    INDEX idx_blog_post_id (blog_post_id)
);

-- Insert some sample data (optional)
-- You can uncomment and modify these as needed

-- INSERT INTO blog_posts (id, title_en, title_fa, description_en, description_fa, category) VALUES
-- ('sample_post_1', 'Welcome to Our Blog', 'به وبلاگ ما خوش آمدید', 'This is a sample blog post', 'این یک نمونه پست وبلاگ است', 'General');

-- INSERT INTO events (id, title_en, title_fa, message_en, message_fa, end_date) VALUES
-- ('sample_event_1', 'Welcome Event', 'رویداد خوش آمدگویی', 'Welcome to our website!', 'به وب سایت ما خوش آمدید!', DATE_ADD(NOW(), INTERVAL 30 DAY));

-- INSERT INTO gallery (id, title_en, title_fa, image) VALUES
-- ('sample_gallery_1', 'Sample Image', 'تصویر نمونه', '/images/sample.jpg'); 