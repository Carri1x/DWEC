"use strict";

//Creo el constructor vacío para que pueda crear el curso sin pasar parámetros.
export const curseConstructor = () => {
    //No me interesa que meta nada en el constructor, espero que luego lo meta todo llamando a los atributos.
    return {
        curseName : "",
        year : "",
        description : "",
        students : [],
        addStudent : function(student) {
            if(Array.isArray(student)){
                //Se que no debemos usar forEach pero solamente quiero ejecutar la función tipo void :S
                //Aquí ejecuto recursivamente la misma función.
                //Como es un array lo que me ha insertado y solo acepto un string, utilizo ese array para insertar los strings de dentro.
                student.forEach((s)=>{
                    this.addStudent(s);
                });
                return;
            }
            if(!isNaN(student)) {
                return; 
            }
            //Inserto el array antiguo dentro del nuevo array y además el string a insertar.
            let oldArray = this.students;
            this.students = [...oldArray, student];
        }
    };
}