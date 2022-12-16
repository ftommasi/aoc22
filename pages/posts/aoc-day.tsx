import React from 'react';
import Link from '../../node_modules/next/link';
import { Router, useRouter } from '../../node_modules/next/router'

/*
const Moon = () => {
    return (
        
    )
}
*/


export default function RenderDay() {
    const router = useRouter();
    const data = router.query;
    
    console.log(data)
    
    return (
        <>
            <h1 >
            Rendering page for Day: {data.day} 
            </h1>
            <h2>
                <Link href="..">
                    Back home
                </Link>
            </h2>
        </>
    );
}


