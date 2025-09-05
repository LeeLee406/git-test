// 交互式学生信息管理系统
const readline = require('readline');

class Student {
    constructor(name, studentId, age, major) {
        this.name = name;
        this.studentId = studentId;
        this.age = age;
        this.major = major;
    }

    toString() {
        return `姓名: ${this.name}, 学号: ${this.studentId}, 年龄: ${this.age}, 专业: ${this.major}`;
    }
}

class StudentManager {
    constructor() {
        this.students = [];
    }

    addStudent(name, studentId, age, major) {
        if (this.students.find(s => s.studentId === studentId)) {
            throw new Error(`学号 ${studentId} 已存在`);
        }
        
        const student = new Student(name, studentId, age, major);
        this.students.push(student);
        return student;
    }

    getStudentById(studentId) {
        const student = this.students.find(s => s.studentId === studentId);
        if (!student) {
            throw new Error(`未找到学号为 ${studentId} 的学生`);
        }
        return student;
    }

    updateStudent(studentId, age, major) {
        const student = this.getStudentById(studentId);
        if (age !== undefined && age !== '') student.age = parseInt(age);
        if (major !== undefined && major !== '') student.major = major;
        return student;
    }

    deleteStudent(studentId) {
        const index = this.students.findIndex(s => s.studentId === studentId);
        if (index === -1) {
            throw new Error(`未找到学号为 ${studentId} 的学生`);
        }
        
        const deletedStudent = this.students[index];
        this.students.splice(index, 1);
        return deletedStudent;
    }

    getAllStudents() {
        return this.students;
    }

    displayAllStudents() {
        if (this.students.length === 0) {
            console.log('当前没有学生信息');
            return;
        }
        
        console.log('\n=== 所有学生信息 ===');
        this.students.forEach((student, index) => {
            console.log(`${index + 1}. ${student.toString()}`);
        });
    }
}

// 创建管理器实例
const manager = new StudentManager();

// 创建命令行界面
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function showMenu() {
    console.log('\n=== 学生信息管理系统 ===');
    console.log('1. 添加学生');
    console.log('2. 查询学生');
    console.log('3. 修改学生信息');
    console.log('4. 删除学生');
    console.log('5. 显示所有学生');
    console.log('6. 退出');
    console.log('=======================');
}

function start() {
    showMenu();
    rl.question('请选择操作 (1-6): ', (choice) => {
        switch (choice.trim()) {
            case '1':
                addStudent();
                break;
            case '2':
                searchStudent();
                break;
            case '3':
                updateStudent();
                break;
            case '4':
                deleteStudent();
                break;
            case '5':
                manager.displayAllStudents();
                start();
                break;
            case '6':
                console.log('感谢使用！再见！');
                rl.close();
                break;
            default:
                console.log('无效的选择，请重新输入');
                start();
        }
    });
}

function addStudent() {
    console.log('\n=== 添加学生 ===');
    rl.question('姓名: ', (name) => {
        rl.question('学号: ', (studentId) => {
            rl.question('年龄: ', (age) => {
                rl.question('专业: ', (major) => {
                    try {
                        const student = manager.addStudent(name, studentId, parseInt(age), major);
                        console.log(`添加成功: ${student.toString()}`);
                    } catch (error) {
                        console.error(`添加失败: ${error.message}`);
                    }
                    start();
                });
            });
        });
    });
}

function searchStudent() {
    console.log('\n=== 查询学生 ===');
    rl.question('请输入学号: ', (studentId) => {
        try {
            const student = manager.getStudentById(studentId);
            console.log(`查询结果: ${student.toString()}`);
        } catch (error) {
            console.error(`查询失败: ${error.message}`);
        }
        start();
    });
}

function updateStudent() {
    console.log('\n=== 修改学生信息 ===');
    manager.displayAllStudents();
    
    rl.question('请输入要修改的学号: ', (studentId) => {
        rl.question('新年龄 (直接回车跳过): ', (age) => {
            rl.question('新专业 (直接回车跳过): ', (major) => {
                try {
                    const student = manager.updateStudent(studentId, age, major);
                    console.log(`修改成功: ${student.toString()}`);
                } catch (error) {
                    console.error(`修改失败: ${error.message}`);
                }
                start();
            });
        });
    });
}

function deleteStudent() {
    console.log('\n=== 删除学生 ===');
    manager.displayAllStudents();
    
    rl.question('请输入要删除的学号: ', (studentId) => {
        try {
            const deleted = manager.deleteStudent(studentId);
            console.log(`删除成功: ${deleted.name}`);
        } catch (error) {
            console.error(`删除失败: ${error.message}`);
        }
        start();
    });
}

// 启动程序
if (require.main === module) {
    console.log('欢迎使用学生信息管理系统！');
    start();
}

module.exports = { Student, StudentManager };