class Student {

    constructor(id, name, grades, attendance) {
        this.id = id;
        this.name = name;
        this.grades = grades;
        this.attendance = attendance;
    }

    calculateAverage() {

        let total = this.grades.reduce(function(sum, grade) {
            return sum + grade;
        }, 0);

        return total / this.grades.length;
    }

    getGrade(average) {

        if (average >= 90) {
            return "A";
        }
        else if (average >= 80) {
            return "B";
        }
        else if (average >= 70) {
            return "C";
        }
        else if (average >= 60) {
            return "D";
        }
        else if (average >= 50) {
            return "E";
        }
        else {
            return "F";
        }
    }

    getResult() {

        let average = this.calculateAverage();

        if (average >= 90 && this.attendance >= 95) {
            return "ممتاز A";
        }
        if (average >= 85 && this.attendance >= 80) {
            return "جيد جداً B";
        }
        if (average >= 75 && this.attendance >= 70) {
            return "جيد C";
        }
        if (average >= 65 && this.attendance >= 60) {
            return "مقبول D";
        }
        if (average >= 55 && this.attendance >= 50) {
            return "ضعيف E";
        }
        else {
            return "راسب F"   
        }
    }
}

let studentsList = [

    new Student(1, "Shahd", [95, 88, 92], 95),

    new Student(2, "Amr", [95, 84, 78], 90),

    new Student(3, "Samar", [78, 82, 75], 80),

    new Student(3, "Sara", [40, 48, 41], 42),

    new Student(4, "Nasr", [65, 70, 68], 65),

    new Student(5, "Jana", [60, 62, 57], 58),

    new Student(6, "Noor", [45, 55, 48], 49)

];

let weakStudents = studentsList.filter(function(student) {

    let average = student.calculateAverage();

    return average >= 40 && average <= 49;

});

let mercyStudents = weakStudents.map(function(student) {

    let average = student.calculateAverage();

    return {
        id: student.id,
        name: student.name,
        oldAverage: average,
        newAverage: average + 5
    };

});

let total = mercyStudents.reduce(function(sum, student) {

    return sum + student.newAverage;

}, 0);

let mercyAverage = 0;

if (mercyStudents.length > 0) {

    mercyAverage = total / mercyStudents.length;

}

console.log("Students Report");

console.log("********************");

studentsList.forEach(function(student) {

    let average = student.calculateAverage();

    console.log("Student Name: " + student.name);

    console.log("Average: " + average);

    console.log("Grade: " + student.getGrade(average));

    console.log("Result: " + student.getResult());

    console.log("--------------------------------");

});

console.log("Mercy Students");

console.log(mercyStudents);

// **********************************
console.log("Mercy Average");

console.log(mercyAverage);


function displayStudents() {

    let table = document.getElementById("studentsTable");

    table.innerHTML = "";

    studentsList.forEach(function(student) {

        let average = student.calculateAverage();

        table.innerHTML += `

            <tr>

                <td>${student.id}</td>

                <td>${student.name}</td>

                <td>${average.toFixed(2)}</td>

                <td>${student.getGrade(average)}</td>

                <td>${student.attendance}%</td>

                <td>${student.getResult()}</td>

            </tr>

        `;

    });

}

displayStudents();


document.getElementById("studentForm").addEventListener("submit", function(e) {

    e.preventDefault();

    let id = Number(document.getElementById("studentId").value);

    let name = document.getElementById("studentName").value;

    let grades = [

        Number(document.getElementById("grade1").value),

        Number(document.getElementById("grade2").value),

        Number(document.getElementById("grade3").value)

    ];

    let attendance = Number(document.getElementById("attendance").value);

    let newStudent = new Student(id, name, grades, attendance);

    studentsList.push(newStudent);

    displayStudents();

    document.getElementById("studentForm").reset();

});