//状态过滤list
myApp.constant('onLine', {
    1: '草稿',
    2: '上线'
});

myApp.filter('putaway', function (onLine) {
    return function (index) {
        return onLine[index]
    }
})

//状态过滤btn
myApp.constant('draft', {
    1: '上线',
    2: '下线'
});

myApp.filter('putaways', function (draft) {
    return function (index) {
        return draft[index]
    }
})


//类型过滤
myApp.constant('form', {
    0: '首页Banner',
    1: '找职位Banner',
    2: '找精英Banner',
    3: '行业大图'
});

myApp.filter('job', function (form) {
    return function (index) {
        return form[index]
    }
});