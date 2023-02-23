// 盛最多水的容器
var maxArea = function (height) {
    let left = 0;
    let right = height.length - 1;
    let maxArea = 0; // 最大容积
    while (left < right) {
        // 计算出 当前的容积  与最大容积比较，取出最大的
        const currentArea = (right - left) * Math.min(height[left], height[right]);
        maxArea = Math.max(maxArea, currentArea);
        //  left 向内移动 
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    return maxArea;
};
maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])

// 两数之和
var twoSum = function (nums, target) {
    // const arr = []
    // for (let i = 0; i < nums.length; i++) {
    //     if (nums[i] !== undefined) {
    //         const result = target - nums[i]
    //         const num1 = nums.indexOf(result)
    //         if (num1 === -1 || num1 === i) {
    //             console.log('xx');
    //         } else {
    //             arr[0] = i
    //             arr[1] = num1
    //         }
    //     }

    // }
    // return arr

    // 通过对象映射
    const prever = {}
    for (let i = 0; i < nums.length; i++) {
        const result = target - nums[i]
        const num1 = prever[result]
        if (num1 !== undefined) {
            return [num1, i]
        } else {
            prever[nums[i]] = i
        }
    }
};
twoSum([2, 7, 11, 15], 9)


// 解密字符串
function decodeMessage(key, message) {
    const arr = []
    const keyCode = []
    const handleKey = key.replaceAll(" ", "")
    for (var i = 0; i < 26; i++) {
        keyCode[i] = String.fromCharCode(97 + i)
    }
    for (var i = 0; i < handleKey.length; i++) {
        if (arr.indexOf(handleKey[i]) === -1) {
            arr.push(handleKey[i])
        }
    }
    let str = ''
    for (let i = 0; i < message.length; i++) {
        if (message[i] !== ' ') {
            str += keyCode[arr.indexOf(message[i])]
        } else {
            str += ' '
        }
    }
    return str
};
decodeMessage("the quick brown fox jumps over the lazy dog", "vkbs bs t suepuv")

// 回溯算法
var permute = function (nums) {
    const res = [], path = [];
    backtracking(nums, nums.length, []);
    console.log(res);
    return res;

    function backtracking(n, k, used) {
        console.log('递归');
        if (path.length === k) {
            res.push(Array.from(path));
            return;
        }
        for (let i = 0; i < k; i++) {
            console.log(i, '--');
            if (used[i]) continue;
            path.push(n[i]);
            used[i] = true; // 同支
            console.log(path, used, n[i]);

            backtracking(n, k, used);
            console.log('回溯');
            path.pop();
            used[i] = false;
            console.log(path, used);
        }
    }
};
permute([1, 2, 3, 4]) // 第一次执行函数1入栈，然后进行递归生成第二个作用域，作用域2的for循环因为1已经入栈的原因continue跳出第一次循环，
//然后执行第二次循环2入栈然后执行递归生成作用域3，作用域3的for循环因为1，2都入栈只会执行一次将3入栈，然后执行递归收割结果，进行回溯，回溯到作用域2
//执行作用域2的for循环的第三次循环将3入栈，然后进入递归生成作用域4，然后因为1，3入栈所以作用域4的for循环只会执行一次将2入栈，然后递归收割结果，进行回溯，到此作用域1的for循环第一次循环结束



// 扁平转树形结构
const arrs = [
    { id: 1, pid: 0 },
    { id: 2, pid: 4 },
    { id: 3, pid: 1 },
    { id: 4, pid: 6 },
    { id: 5, pid: 2 },
    { id: 6, pid: 8 },
    { id: 7, pid: 5 },
    { id: 8, pid: 3 },
    { id: 9, pid: 7 }
]
function treeArr(arrs) {
    const result = []
    const itemArr = {}
    for (const arr of arrs) {
        const id = arr.id
        const pid = arr.pid
        if (!itemArr[id]) {
            itemArr[id] = {
                children: []
            }
        }
        itemArr[id] = {
            ...arr,
            children: itemArr[id].children
        }
        const targetArr = itemArr[id]
        if (pid === 0) {
            result.push(targetArr)
        } else {
            if (!itemArr[pid]) {
                itemArr[pid] = {
                    children: []
                }
            }
            itemArr[pid].children.push(targetArr)
        }

    }
    return result
}
const acc = treeArr(arrs)
console.log(acc);