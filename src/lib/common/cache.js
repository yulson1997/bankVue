let cache = {
    set: function (key, val) { 
        let value;
        function setCookie (key, value, expiredays) {
                var exdate = new Date();
                exdate.setDate(exdate.getDate() + expiredays);
                document.cookie = key + "=" + encodeURI(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString() + ";path=/");
        }
        
        try {
            value = JSON.stringify(val);
        } catch (e) { 
            value = val;
        }
        if (window.localStorage) {
            localStorage.setItem(key, value);
        } else { 
            setCookie(key, value);
        }
    },
    get: function (key) { 
        let value;
        if (window.localStorage) {
            value = localStorage.getItem(key);
        } else { 
            let getCookie = function(key) {
                var str = document.cookie; // 获取Cookie字符串     
                if (!str || str.indexOf(key + "=") < 0){ // 寻找name=     
                    return;
                }
                var cookies = str.split("; "); // 用;将所有的Cookie分隔开     
                for (var i = 0; i < cookies.length; i++) {
                    // 遍历每个Cookie     
                    var cookie = cookies[i]; // 当前Cookie     
                    if (cookie.indexOf(key + "=") == 0) {
                        // 如果名字为name     
                        var value = cookie.substring(key.length + 1); // 获取value     
                        return decodeURI(value); // 将value解码，并返回     
                    }
                }
            }
            value = getCookie(key);
        }
        try {
            return JSON.parse(value);
        } catch (e) { 
            return value;
        }
    },
    remove: function (key) { 
        if (window.localStorage) { 
            localStorage.removeItem(key);
        }
        
    },
    clear: function () { 
        if (window.localStorage) { 
            localStorage.clear();
        }   
    },
}

export default cache