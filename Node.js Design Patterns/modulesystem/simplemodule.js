//利用自执行函数创建私有域: 揭示模块模式

const simplemodule = (() => {
    const privateFoo = () => { console.log(''); };
    const privateBar = {};
    const exported = {
        publicFoo: () => { console.log('Public Foo'); },
        publicBar: () => { console.log('publci Bar'); }
    };
    return exported;
})();

console.log(simplemodule);