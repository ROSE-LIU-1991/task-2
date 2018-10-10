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