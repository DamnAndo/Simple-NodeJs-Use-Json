
const StudentModel = require('../../models/student/StudentModel');

exports.getStudentList = (req,res,next)=>{

    StudentModel.fetchAll(student=>{
        res.render('student/student-list',{
            pageTitle:'Student List',
            path:'/student-list',
            students:student
        });
    })

}

exports.getStudentAdd = (req,res,next)=>{
    res.render('student/student-add',{
        pageTitle:'Student Add',
        path:'/student-list',
        student:'',
        edit:false
    });
}

exports.postStudentAdd = (req,res,next)=>{
    const name = req.body.name;
    const classs = req.body.classs;
    const nik = req.body.nik;
    const image = req.body.image;
    const gender = req.body.gender;
    const address = req.body.address;
    const student = new StudentModel(null,name,classs,nik,image,gender,address);
    student.save();
    res.redirect('/student-list');
}

exports.getStudentEdit = (req,res,next)=>{
    const edit = req.query.edit;

    if(!edit){
        res.redirect("/");
    }

    const studentId = req.params.student;
    // console.log("Student Id",studentId);
    StudentModel.findById(studentId,student=>{
        console.log(student);
        res.render('student/student-add',{
            pageTitle:'Student Add',
            path:'/student-list',
            student:student,
            edit:true
        });
    });
}

exports.postStudentEdit = (req,res,next)=>{
    const id = req.body.id;
    const name = req.body.name;
    const classs = req.body.classs;
    const nik = req.body.nik;
    const image = req.body.image;
    const gender = req.body.gender;
    const address = req.body.address;
    const student = new StudentModel(id,name,classs,nik,image,gender,address);
    student.save();
    res.redirect('/student-list');
}

exports.postStudentDelete = (req,res,next)=>{
    const id = req.body.id;
    StudentModel.deleteById(id);
    res.redirect("/student-list");
}