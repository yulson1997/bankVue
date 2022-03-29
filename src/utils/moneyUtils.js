import { SnToast } from "sinosun-ui";
/*
* 金额转大写
* 必填参数： num： 数值
* 返回值： 数值对应的金额大写
* 注意： 参数数值区分
        带小数点： 根据小数点的划分解析，对参数进行大写转化
        不带小数点：解析时以分为单位，对参数进行大写转化
        如：12.11  --->   壹拾贰元壹角壹分
            1200 ---> 壹仟贰佰元整
            10000  --->  壹万元整
*/
export function toUpperCase(num) {
    if (!num) {
        return
    }
    var Num = Number(num) * 100 + "";
    Num = Num.split(".")[0];
    Num = insert_flg(Num, ".", (Num.length - 2));
    var part = Num.split(".");
    var newchar = "";
    var perchar = "";
    var tmpnewchar = "";
    for (var i = part[0].length - 1; i >= 0; i--) {
        if (part[0].length > 20) { SnToast("数字过大，无法计算"); return ""; }
        tmpnewchar = "";
        perchar = part[0].charAt(i);
        switch (perchar) {
            case "0":
                tmpnewchar = "零" + tmpnewchar;
                break;
            case "1":
                tmpnewchar = "壹" + tmpnewchar;
                break;
            case "2":
                tmpnewchar = "贰" + tmpnewchar;
                break;
            case "3":
                tmpnewchar = "叁" + tmpnewchar;
                break;
            case "4":
                tmpnewchar = "肆" + tmpnewchar;
                break;
            case "5":
                tmpnewchar = "伍" + tmpnewchar;
                break;
            case "6":
                tmpnewchar = "陆" + tmpnewchar;
                break;
            case "7":
                tmpnewchar = "柒" + tmpnewchar;
                break;
            case "8":
                tmpnewchar = "捌" + tmpnewchar;
                break;
            case "9":
                tmpnewchar = "玖" + tmpnewchar;
                break;
        }
        switch ((part[0].length - i - 1) % 8) {
            case 0:
                switch ((part[0].length - i - 1) / 8) {
                    case 0:
                        tmpnewchar = tmpnewchar + "元";
                        break;
                    case 1:
                        tmpnewchar = tmpnewchar + "亿";
                        break;
                    default:
                        break;
                }

                break;
            case 1:
                if (perchar != 0) { tmpnewchar = tmpnewchar + "拾"; }
                break;
            case 2:
                if (perchar != 0) { tmpnewchar = tmpnewchar + "佰"; }
                break;
            case 3:
                if (perchar != 0) { tmpnewchar = tmpnewchar + "仟"; }
                break;
            case 4:
                if (part[0].substr(0, 4) > 0) { tmpnewchar = tmpnewchar + "万"; }
                break;
            case 5:
                if (perchar != 0) { tmpnewchar = tmpnewchar + "拾"; }
                break;
            case 6:
                if (perchar != 0) { tmpnewchar = tmpnewchar + "佰"; }
                break;
            case 7:
                if (perchar != 0) { tmpnewchar = tmpnewchar + "仟"; }
                break;
        }
        newchar = tmpnewchar + newchar;
    }
    if (Num.indexOf(".") != -1) {
        if (part[1].length > 2) {
            part[1] = part[1].substr(0, 2)
        }
        for (var i = 0; i < part[1].length; i++) {
            tmpnewchar = "";
            perchar = part[1].charAt(i)
            switch (perchar) {
                case "0":
                    tmpnewchar = "零" + tmpnewchar;
                    break;
                case "1":
                    tmpnewchar = "壹" + tmpnewchar;
                    break;
                case "2":
                    tmpnewchar = "贰" + tmpnewchar;
                    break;
                case "3":
                    tmpnewchar = "叁" + tmpnewchar;
                    break;
                case "4":
                    tmpnewchar = "肆" + tmpnewchar;
                    break;
                case "5":
                    tmpnewchar = "伍" + tmpnewchar;
                    break;
                case "6":
                    tmpnewchar = "陆" + tmpnewchar;
                    break;
                case "7":
                    tmpnewchar = "柒" + tmpnewchar;
                    break;
                case "8":
                    tmpnewchar = "捌" + tmpnewchar;
                    break;
                case "9":
                    tmpnewchar = "玖" + tmpnewchar;
                    break;
            }
            if (i == 0) { tmpnewchar = tmpnewchar + "角"; }
            if (i == 1) { tmpnewchar = tmpnewchar + "分"; }
            newchar = newchar + tmpnewchar;
        }
    }
    while (newchar.search("零零") != -1) {
        newchar = newchar.replace("零零", "零");
    }
    newchar = newchar.replace("零亿", "亿");
    newchar = newchar.replace("零万", "万");
    newchar = newchar.replace("亿万", "亿");
    newchar = newchar.replace("零元", "元");

    // 如果“分”不为零，“角”为零，：10.09-》拾元零玖分， 10.00 -> 拾元，10.90 -> 拾元玖角
    // 金额大写含有“零分” 或 金额大写没有 "分"， 都说明没有“分”位值
    if (newchar.indexOf("零分") > -1 ||
        newchar.indexOf("分") < 0) {
        newchar = newchar.replace("零角", "");
        newchar = newchar.replace("零分", "");
    } else {
        newchar = newchar.replace("零角", "零");
    }

    if (newchar == "") {
        newchar = "零元";
    }
    if (newchar.charAt(newchar.length - 1) == "元") {
        newchar = newchar + "整";
    }
    if (newchar.charAt(newchar.length - 1) == "拾" || newchar.charAt(newchar.length - 1) == "佰" || newchar.charAt(newchar.length - 1) == "仟" || newchar.charAt(newchar.length - 1) == "万") {
        newchar = newchar + "元整";
    }
    if (newchar == "元整") {
        newchar = "零元";
    }
    if (newchar.substring(0, 1) == "元") {
        newchar = newchar.substring(1, newchar.length);
    }
    return "人民币"+newchar;
}

/**
 * 金额格式化
 * @param {*} money:需要格式化的金额数据
 */
export function moneyFormat(money) {
    let transferMoney = '';
    if (money) {
        if (money.toString().indexOf('元') > -1) {
            transferMoney = money;
        } else {
            if (money.toString().indexOf('.') > -1) {
                let yuan = money.toString().split('.')[0];
                let fen = money.toString().split('.')[1];
                if (!fen) {
                    fen = '00';
                }
                if (fen.length == 1) {
                    fen = fen + '0';
                }
                if (yuan.length > 3) {
                    yuan = moneyStringFixTwo(yuan * 100).slice(0, -4)
                }
                transferMoney = yuan + '.' + fen + '元';
            } else {
                transferMoney = moneyStringFixTwo(money * 100);
            }
        }
    } else {
        transferMoney = '0.00元'
    }

    const changeMoney = transferMoney.substring(0, transferMoney.indexOf(".") + 3);
    return changeMoney + '元';
}

/**
 * 格式化数据   100-->1.00元
 * 能否换成正则.toString().replace(/(\d{2})(?!\d)/g, ",$1").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
 * @param {Object} ms
 */
export function moneyStringFixTwo(ms) {
    var moneyDis = "";
    ms = ms + "";
    ms = ms.replace(/[^\d]/g, '');
    if (ms.length < 3) { //小数
        ms = pad(ms, 3);
    }
    moneyDis = insert_flg(ms, ".", (ms.length - 2));
    var l = moneyDis.split(".")[0].split("").reverse(),
        r = moneyDis.split(".")[1],
        t = "";
    for (var i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    var moneyDisBig = t.split("").reverse().join("") + "." + r + "元";

    return moneyDisBig;
}

/**
 * 插入特定位置的字符串
 * @param str 原字符串
 * @param flg 插入字符
 * @param sn  插入位置
 * @returns {String}
 */
export function insert_flg(str, flg, sn) {
    var newstr = "";

    if (3 > str.length) { //如果sn为负数
        str = pad(str, 3);
        sn = 1;
    }

    var arr = str.split("");

    for (var i = 0; i < arr.length; i++) {
        if (i == sn) {
            newstr += flg;
        }
        newstr += arr[i];
    }

    return newstr;
}

//数组补位
export function pad(num, n) {
    var len = num.toString().length;
    while (len < n) {
        num = "0" + num;
        len++;
    }
    return num;
}
