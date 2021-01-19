import React from 'react'
import { Typography } from '@material-ui/core';
import Hero from '../components/Hero';
interface HomeScreenProps {

}

// Hero Component 
// Demo Component (Admin or Client)
// Hero #2 Component - How to Use 
// Testimonial Component

 const HomeScreen: React.FC<HomeScreenProps> = ({}) => {
        return (
            <>  
                <Hero />
            </>
        );
}

export default HomeScreen