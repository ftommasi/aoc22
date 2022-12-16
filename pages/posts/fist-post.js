import Link from 'next/link'
import Image from 'next/image'
/*
const Moon = () => {
    return (
        
    )
}
*/

export default function FirstPost(){
    return (
    <>
        <h1> 
            FirstPost 
        <Image
        src = "/public/images/moon.png"
        height={389}
        width={681}
        alt ="Moon"
        />       </h1>
        <h2>    
            <Link href="..">
                Back home
            </Link>
        </h2>
    </> 
    );
}