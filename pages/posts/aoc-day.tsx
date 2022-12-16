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
    const { readFileSync } = require("fs");
    const router = useRouter();
    const data = router.query;
    var contents = "" 
    console.log(data)
   
    const file = "../public/input/day" + data.day + ".txt";
    const fileContents =  readFileSync(file,'utf8');
    console.log(fileContents)

    return (
        <>
            <h1 >
            Rendering page for Day: {data.day}
            {contents} 
            </h1>
            <h2>
                <Link href="..">
                    Back home
                </Link>
            </h2>
        </>
    );
}


