import React from 'react'
import { Typography } from '@material-ui/core';
import StickyHeader from '../components/sanity_blog/StickyHeader';
import Posts from '../components/sanity_blog/Posts';

interface BlogScreenProps {

}

// sticky header
// sanity.io blog


 const BlogScreen: React.FC<BlogScreenProps> = ({}) => {
        return (
            <>
            <StickyHeader />
            <Posts />
            </>
        );
}

export default BlogScreen