import { Hash } from 'crypto';
import React from 'react';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';
import { loadGetInitialProps } from '../../node_modules/next/dist/shared/lib/utils';
import Link from '../../node_modules/next/link';
import { Router, useRouter } from '../../node_modules/next/router'
import RenderDay from '../posts/aoc-day';

export interface Props{
    list?:string[],
    showHelp : boolean
}

export interface State{
    fulllist:string[],
    filterlist:string[],
}


class Search extends React.Component<Props,State>{
    state : State;
    constructor(props: Props){
        super(props);
        this.state = {
            fulllist : [
                "1","2","3","4","5","6","7","8","9","10",
                "11","12","13","14","15","16","17","18","19","20",
                "21","22","23","24","25"
            ],
            filterlist : []
        }
    }
   
    handleChange = (e : any) =>{
        let currentList = this.state.fulllist;
        let newList = []
        if(e.target.value !==""){ //if someting is being typed in search bar
            newList = currentList.filter(item => {
                const lc = item.toLowerCase();
                const filter = e.target.value.toLowerCase();
                return lc.includes(filter) // ?? Is this necessary
            });
            
        }
        else{ //This is the case for empty string
            newList = this.state.fulllist;
        }
        this.setState({filterlist: newList});
    }
   
    public render(): React.ReactNode {
       return (
            <div className="Search">
                <div className='Container'>
                    <section className='Section'>
                        <form className='form' id='addItemForm'>
                            <input type='text' onChange={this.handleChange} className='input' id='addInput' placeholder="RTFM..."/>
                            <button className='button is-info'>Add</button>
                        </form>
                    </section>
                    <section className='Section'>
                        {this.state.filterlist.map((item : string)=>(
                            //<><li key={item}> <a href="../posts/aoc-day"> Day {item} </a> </li>  </>
                            /* 
                            router.push({
                                    pathname : "../posts/aoc-day",
                                    query    : { day : item}
                                    })

                            */
                            <><li key={item}> {
                                    <Link 
                                     href={{
                                    pathname: "../posts/aoc-day",
                                    query: {day : item}, // the data
                                    }}>
                                    Day: {item}
                                    </Link>    
                                } </li> </>
                        ))}
                    </section>
                </div>
           </div>       
       ) 
    }
}

export default Search;