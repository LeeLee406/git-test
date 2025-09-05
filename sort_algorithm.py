def sort_numbers(numbers):
    """
    将数值列表按照从小到大排序
    
    参数:
        numbers: 需要排序的数值列表
    
    返回:
        排序后的数值列表
    """
    # 使用冒泡排序算法
    n = len(numbers)
    sorted_nums = numbers.copy()  # 创建副本，避免修改原列表
    
    for i in range(n):
        for j in range(0, n - i - 1):
            if sorted_nums[j] > sorted_nums[j + 1]:
                # 交换相邻元素
                sorted_nums[j], sorted_nums[j + 1] = sorted_nums[j + 1], sorted_nums[j]
    
    return sorted_nums

# 测试代码
if __name__ == "__main__":
    test_numbers = [50, 30, 35, 20]
    result = sort_numbers(test_numbers)
    print(f"原始数值: {test_numbers}")
    print(f"排序结果: {result}")