// 学生信息管理系统
class Student {
    constructor(name, studentId, age, major) {
        this.name = name;
        this.studentId = studentId;
        this.age = age;
        this.major = major;
    }
}

class StudentManager {
    constructor() {
        this.students = [];
    }

    // 添加学生
    addStudent(name, studentId, age, major) {
        // 检查学号是否已存在
        const existingStudent = this.students.find(s => s.studentId === studentId);
        if (existingStudent) {
            throw new Error(`学号 ${studentId} 已存在`);
        }
        
        const student = new Student(name, studentId, age, major);
        this.students.push(student);
        return student;
    }

    // 根据学号查询学生
    getStudentById(studentId) {
        const student = this.students.find(s => s.studentId === studentId);
        if (!student) {
            throw new Error(`未找到学号为 ${studentId} 的学生`);
        }
        return student;
    }

    // 根据学号修改学生信息
    updateStudent(studentId, age, major) {
        const student = this.getStudentById(studentId);
        if (age !== undefined) student.age = age;
        if (major !== undefined) student.major = major;
        return student;
    }

    // 根据学号删除学生
    deleteStudent(studentId) {
        const index = this.students.findIndex(s => s.studentId === studentId);
        if (index === -1) {
            throw new Error(`未找到学号为 ${studentId} 的学生`);
        }
        
        const deletedStudent = this.students[index];
        this.students.splice(index, 1);
        return deletedStudent;
    }

    // 获取所有学生
    getAllStudents() {
        return this.students;
    }
}

// 创建管理器实例
const manager = new StudentManager();

// 示例用法
function demo() {
    console.log('=== 学生信息管理系统演示 ===\n');
    
    try {
        // 添加学生
        console.log('1. 添加学生');
        manager.addStudent('张三', '2024001', 20, '计算机科学');
        manager.addStudent('李四', '2024002', 21, '软件工程');
        manager.addStudent('王五', '2024003', 19, '人工智能');
        console.log('添加成功！');
        
        // 查询所有学生
        console.log('\n2. 所有学生信息');
        console.log(manager.getAllStudents());
        
        // 根据学号查询
        console.log('\n3. 查询学号2024002的学生');
        const student = manager.getStudentById('2024002');
        console.log(student);
        
        // 修改学生信息
        console.log('\n4. 修改学号2024002的年龄和专业');
        const updated = manager.updateStudent('2024002', 22, '数据科学');
        console.log('修改后:', updated);
        
        // 删除学生
        console.log('\n5. 删除学号2024001的学生');
        const deleted = manager.deleteStudent('2024001');
        console.log('已删除:', deleted.name);
        
        // 最终学生列表
        console.log('\n6. 最终学生列表');
        console.log(manager.getAllStudents());
        
    } catch (error) {
        console.error('错误:', error.message);
    }
}

// 运行演示
if (require.main === module) {
    demo();
}

// 导出模块供其他文件使用
module.exports = { Student, StudentManager };