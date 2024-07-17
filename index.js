const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const pool = require("./db");
const path = require("path");
const PORT=process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "client/build")));
  }
  app.listen(PORT, () => console.log(`Server started at ${PORT}`));
  console.log(__dirname);
app.get("/students/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Fetch student details
        const student = await pool.query("SELECT * FROM students WHERE student_id = $1", [id]);
        
        // Fetch student subjects
        const subjects = await pool.query(
            "SELECT subjects.subject_code, subjects.subject_name FROM enrollments " +
            "JOIN subjects ON enrollments.subject_code = subjects.subject_code " +
            "WHERE enrollments.student_id = $1", [id]
        );

        if (student.rows.length === 0) {
            return res.status(404).json({ error: "Student not found" });
        }

        const studentDetails = student.rows[0];
        studentDetails.subjects = subjects.rows;

        res.json(studentDetails);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Server Error" });
    }
});




app.get("/teachers/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Fetch teacher details
        const teacher = await pool.query("SELECT * FROM teachers WHERE teacher_id = $1", [id]);
        
        if (teacher.rows.length === 0) {
            return res.status(404).json({ error: "Teacher not found" });
        }

        // Fetch subjects taught by the teacher
        const subjects = await pool.query(
            "SELECT subjects.subject_code, subjects.subject_name FROM subject_teacher " +
            "JOIN subjects ON subject_teacher.subject_code = subjects.subject_code " +
            "WHERE subject_teacher.teacher_id = $1", [id]
        );

        // Fetch students enrolled in those subjects
        const subjectCodes = subjects.rows.map(subject => subject.subject_code);
        let students = [];

        if (subjectCodes.length > 0) {
            const studentQuery = `
                SELECT students.student_id, students.first_name, students.last_name, students.email, enrollments.subject_code 
                FROM enrollments
                JOIN students ON enrollments.student_id = students.student_id
                WHERE enrollments.subject_code = ANY($1::text[])
            `;
            const studentResult = await pool.query(studentQuery, [subjectCodes]);
            students = studentResult.rows;
        }

        const teacherDetails = teacher.rows[0];
        teacherDetails.subjects = subjects.rows;
        teacherDetails.students = students;

        res.json(teacherDetails);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Server Error" });
    }
});

// Assign a subject to a student
app.post("/assign-subject", async (req, res) => {
    try {
        const { teacher_id, student_id, subject_code } = req.body;

        // Check if the teacher teaches this subject
        const subjectTeacher = await pool.query(
            "SELECT * FROM subject_teacher WHERE teacher_id = $1 AND subject_code = $2",
            [teacher_id, subject_code]
        );

        if (subjectTeacher.rows.length === 0) {
            return res.status(400).json({ error: "Teacher does not teach this subject" });
        }

        // Assign the subject to the student
        await pool.query(
            "INSERT INTO enrollments (student_id, subject_code) VALUES ($1, $2) ON CONFLICT (student_id, subject_code) DO NOTHING",
            [student_id, subject_code]
        );

        res.json({ message: "Subject assigned to student successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Server Error" });
    }
});
