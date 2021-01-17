import React from 'react'
import { Typography } from '@material-ui/core';

interface StickyBlogHeaderProps {

}

 const StickyBlogHeader: React.FC<StickyBlogHeaderProps> = ({}) => {
        return (
            <>
            <Typography variant="h1">StickyBlogHeader</Typography>
            </>
        );
}

export default StickyBlogHeader