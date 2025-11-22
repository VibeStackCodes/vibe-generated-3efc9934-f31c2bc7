import React from 'react';
import { BlogEditor } from '@/components/features/BlogEditor';

export const BlogPage: React.FC = () => {
  return (
    <div className="container" style={{ paddingTop: 20 }}>
      <BlogEditor />
    </div>
  );
};

export default BlogPage;
