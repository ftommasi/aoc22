import { ParsedUrlQuery } from "querystring";
import { Day1 } from "./days/day1";
import { Day2 } from "./days/day2";
import { Day3 } from "./days/day3";

export function DayInput(input : ParsedUrlQuery){
    //TODO: Map for all types of Day iput
    switch(input.day){
      case "1":{
        return Day1();
      }
      case "2":{
        return Day2();
      }
      case "3":{
        return Day3();
      }
    }
}

