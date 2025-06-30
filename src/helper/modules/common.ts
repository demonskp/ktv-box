export function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, // 选择0-15之间的一个随机数
            v = c === 'x' ? r : (r & 0x3 | 0x8); // 如果是'y'，设置第4位和第5位为特定值以符合UUID v4规范
        return v.toString(16);
    });
}