"use strict";

export const curseInfo = (curse) => {
    for (const attrib in curse) {
        if(curse.hasOwnProperty(attrib)){
            console.log(`${attrib}: ${curse[attrib]}`);
        }
    }
}