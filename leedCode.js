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
            if(num1 !== undefined) {
                return [num1,i]
            }else {
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