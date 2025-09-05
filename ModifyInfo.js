/**
 * 根据学号更新学生信息
 * @param {string} id - 学生学号
 * @param {Object} updates - 要更新的信息（age和/或major）
 * @returns {boolean} 更新成功返回true，失败返回false
 */
function updateStudentById(id, updates) {
  const index = students.findIndex(s => s.id === id);
  if (index === -1) {
    console.log('未找到该学生');
    return false;
  }

  // 只允许更新年龄和专业
  if (updates.age) {
    if (isNaN(updates.age)) {
      console.log('错误：年龄必须是数字');
      return false;
    }
    students[index].age = updates.age;
  }

  if (updates.major) {
    students[index].major = updates.major;
  }

  console.log('更新成功');
  return true;
}