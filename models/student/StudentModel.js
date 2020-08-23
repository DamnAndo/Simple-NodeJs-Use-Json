const path = require('path');
const fs = require('fs');

const p = path.join(path.dirname(process.mainModule.filename),
    'data',
    'student.json'
);

const getStudentFromFile = cb => {
    fs.readFile(p,(err,fileContent)=>{
        if(err){
            cb([]);
        }else{
            cb(JSON.parse(fileContent));
        }
    });
}

module.exports = class Student{
    constructor(id,name,classs,nik,image,gender,address){
        this.id = id;
        this.name = name;
        this.classs = classs;
        this.nik = nik;
        this.image = image;
        this.gender = gender;
        this.address = address;
    }

    save(){
            getStudentFromFile(student=>{
                if(this.id){
                    const studentIndex = student.findIndex(stud => stud.id === this.id );
                    const updateStudent = [...student];
                    updateStudent[studentIndex]=this;
                    fs.writeFile(p,JSON.stringify(updateStudent),(err)=>{
                        console.log(err);
                    });
                }else{
                    this.id = Math.random().toString();
                    student.push(this);
                    fs.writeFile(p,JSON.stringify(student),(err)=>{
                        console.log(err);
                    });
                }

            });
    }

    static fetchAll(cb){
        getStudentFromFile(cb);
    }

    static findById(studentId,cb){
        getStudentFromFile(student=>{
            const data = student.find(p => p.id === studentId);
            cb(data);

        });
    }

    static deleteById(id){
        getStudentFromFile(student=>{
            const studentDelete = student.filter(stud => stud.id !== id);
            console.log(studentDelete);
            fs.writeFile(p,JSON.stringify(studentDelete),err=>{
                console.log(err);
            });
        });

    }
}