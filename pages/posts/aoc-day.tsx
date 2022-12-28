import React from 'react';
import Link from '../../node_modules/next/link';
import { Router, useRouter } from '../../node_modules/next/router';
import useSWR from 'swr';
import { DayInput } from './day_input';
import useCollapse from 'react-collapsed';
import styles from './Aoc-day.module.css'
import { InvalidatedProjectKind } from '../../bk_node_modules/typescript/lib/typescript';

function InnerCollapsible(props: any) {
    const config = {
        duration: 100
    };
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse(config);
    return (
        <div className={styles.collapsible}>
            <div className={styles.header} {...getToggleProps()}>
                {props.title}
            </div>
            <div {...getCollapseProps()}>
                <div className={styles.content}>
                    {props.content}
                </div>
            </div>
        </div>
    );
}

function Collapsible(props: any) {
    const config = {
        duration: 100
    };
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse(config);
    if (props.inner) {
        return (
            <div className={styles.collapsible}>
                <div className={styles.header} {...getToggleProps()}>
                    {props.title}
                </div>
                <div {...getCollapseProps()}>
                    <div className={styles.content}>
                        <InnerCollapsible
                            title={"Part1"}
                            content={props.content.part1}
                        />
                    </div>
                    <div className={styles.content}>
                        <InnerCollapsible
                            title={"Part2"}
                            content={props.content.part2}
                        />
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className={styles.collapsible}>
                <div className={styles.header} {...getToggleProps()}>
                    {props.title}
                </div>
                <div {...getCollapseProps()}>
                    <div className={styles.content}>
                        {props.content}
                    </div>
                </div>
            </div>
        );
    }
}


export default function RenderDay() {
    const router = useRouter();
    const data = router.query;
    const contents = DayInput(data);
    const solution = solveDay(data.day,contents);
    return (
        <>
            <div
            >
                <h1>Rendering page for Day: {data.day} </h1>
                <Collapsible
                    title={"Day " + data.day + " input:"}
                    content={contents}
                />
                <Collapsible
                    title={"Day " + data.day + " output:"}
                    inner={"true"}
                    content={solution}
                />

                <h2>
                    <Link href="..">
                        Back home
                    </Link>
                </h2>
            </div>
        </>
    );
}
export interface DaySolution {
    part1?: string,
    part2?: string,
}

function solveDay(day_num : string | string[] | undefined, input: string | undefined): DaySolution {
    switch(day_num){
        case "1":
            return solveDay1(input)
        case "2":
            return solveDay2(input)
        case "3":
            return solveDay3(input)
    }

    return { part1: "input undefined", part2: "input undefined" }
}
    

function solveDay1(input: string | undefined): DaySolution {
    if(input === undefined){
        return { part1: "input undefined", part2: "input undefined" }
    }
    let p1 = "";
    let p2 = "";

    const split_in = input.split("\n");
    let value_scores = [];
    let cur_max = 0;

    split_in.forEach((val : string, idx : number, arr : string[]) =>{
        if(val === ""){
            value_scores.push(cur_max);
            cur_max = 0
        }else{
            cur_max += parseInt(val)
        }
    });
    value_scores.push(cur_max);
    cur_max = 0
    value_scores.sort((n1 : number,n2 :number) => n1-n2);
    p1 = value_scores[value_scores.length - 1].toString()
    p2 = (value_scores[value_scores.length - 1] + value_scores[value_scores.length - 2] + value_scores[value_scores.length - 3]).toString();
    return { part1: p1, part2: p2 }
}


export interface RPS{
    raw_val  : string, //ABC 
    encoded_val: string, //XYZ
    win_against_raw  : string,
    lose_against_raw : string,
    win_against_encoded  : string,
    lose_against_encoded : string,
    score: number,
}



function solveDay2(input: string | undefined): DaySolution {
    if(input === undefined){
        return { part1: "input undefined", part2: "input undefined" }
    }
    let p1 = "";
    let p2 = "";
    /*
        A - Rock
        B - Paper
        C - Scissors
        ------------
        X - Rock
        Y - Paper
        Z - Scissors 
    */
    let rock     : RPS = {raw_val : "A", encoded_val : "X", win_against_raw : "C", win_against_encoded : "Z", lose_against_raw: "B", lose_against_encoded : "Y", score: 1}
    let paper    : RPS = {raw_val : "B", encoded_val : "Y", win_against_raw : "A", win_against_encoded : "X", lose_against_raw: "C", lose_against_encoded : "Z", score: 2}
    let scissors : RPS = {raw_val : "C", encoded_val : "Z", win_against_raw : "B", win_against_encoded : "Y", lose_against_raw: "A", lose_against_encoded : "X", score: 3}
    
    function computeScore(opponent : RPS, strategy : RPS) : number{
        if(opponent === strategy){ 
            //if a tie return 3 + RPS score
            return 3 + strategy.score;
        }else if(opponent.lose_against_encoded === strategy.encoded_val || opponent.lose_against_raw == strategy.raw_val ){
            //if a win retrn 6 + RPS scpre
            return 6 + strategy.score;
        }else{
            //if a loss return 0 + RPS score
            return strategy.score;
        }
    }

    function buildRPS1(val : string) : RPS{
        switch(val){
            case "A":
            case "X":
                return rock;
            
            case "B":
            case "Y":
                return paper;
           
            case "C":
            case "Z":
                return scissors;
        }
        return rock; //TODO: What the fuck do we do on a wrong input. We assume its all valid input
    }

    function buildRPS2(val : string, outcome : string) : RPS{
        switch(outcome){
            case "X":
                return buildRPS1(buildRPS1(val).win_against_raw) // return a loss when we see x 
            
            case "Y":
                return buildRPS1(val) // return a draw when we see y
           
            case "Z":
                return buildRPS1(buildRPS1(val).lose_against_raw) // return a loss when we see x 
        }
        return rock; //TODO: What the fuck do we do on a wrong input. We assume its all valid input
    }
    const split_in = input.split("\n");
    let p1cur_score = 0
    let p2cur_score = 0
    split_in.forEach((val : string, idx : number, arr : string[]) =>{
       const matchup = val.split(" ");
       const p1opponent = buildRPS1(matchup[0]);
       const p1strategy = buildRPS1(matchup[1]); 
       
       const p2opponent = buildRPS1(matchup[0]);
       const p2strategy = buildRPS2(matchup[0],matchup[1]);
       p1cur_score += computeScore(p1opponent,p1strategy)
       p2cur_score += computeScore(p2opponent,p2strategy)
    });
    p1 = p1cur_score.toString()
    p2 = p2cur_score.toString()

    return { part1: p1, part2: p2 }
}


function solveDay3(input: string | undefined): DaySolution {
    if(input === undefined){
        return { part1: "input undefined", part2: "input undefined" }
    }
    let p1 = "";
    let p2 = "";
    
    const split_in = input.split("\n");
    let p1cur_score = 0
    let p2cur_score = 0
    split_in.forEach((val : string, idx : number, arr : string[]) =>{
        
    });
    p1 = p1cur_score.toString()
    p2 = p2cur_score.toString()

    return { part1: p1, part2: p2 }
}

