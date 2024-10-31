const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory data store
let students = [];

// Generate unique ID for each student
const generateId = () => students.length ? Math.max(students.map(s => s.id)) + 1 : 1;

// 1. GET /students: Retrieve a list of all students
app.get('/students', (req, res) => {
    res.json(students);
});

// 2. GET /students/{id}: Retrieve details of a student by ID
app.get('/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (!student) return res.status(404).send('Student not found');
    res.json(student);
});

// 3. POST /students: Add a new student
app.post('/students', (req, res) => {
    const { name, grade, email } = req.body;
    const newStudent = { id: generateId(), name, grade, email };
    students.push(newStudent);
    res.status(201).json(newStudent);
});

// 4. PUT /students/{id}: Update an existing student by ID
app.put('/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (!student) return res.status(404).send('Student not found');

    const { name, grade, email } = req.body;
    student.name = name || student.name;
    student.grade = grade || student.grade;
    student.email = email || student.email;

    res.json(student);
});

// 5. DELETE /students/{id}: Delete a student by ID
app.delete('/students/:id', (req, res) => {
    const studentIndex = students.findIndex(s => s.id === parseInt(req.params.id));
    if (studentIndex === -1) return res.status(404).send('Student not found');

    const deletedStudent = students.splice(studentIndex, 1);
    res.json(deletedStudent[0]);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
