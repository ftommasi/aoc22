import Link from '../../node_modules/next/link';
/*
const Moon = () => {
    return (
        
    )
}
*/

export default function RenderDay({ day }){
    return (
    <>
        <h1 > 
            day {day.number}
        </h1>
        <h2>    
            <Link href="..">
                <a>Back home</a> 
            </Link>
        </h2>
    </> 
    );
}