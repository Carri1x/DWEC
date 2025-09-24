"use strict";

export const curseConstructor = () => {
    return {
        curseName : "",
        year : "",
        description : "",
        students : [],
        addStudent : function(student) {
            if(Array.isArray(student)){
                //Se que no debemos usar forEach pero solamente quiero ejecutar la función tipo void :S
                student.forEach((s)=>{
                    this.addStudent(s);
                });
                return;
            }
            if(!isNaN(student)) {
                return; 
            }
            this.students.push(student);
        }
    };
}