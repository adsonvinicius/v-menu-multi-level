let __customProps = {};
Object.keys(customProps).sort().forEach(function(key) {
  __customProps[key] = customProps[key];
});

for(var _p in __customProps){
    if(typeof __customProps[_p] === 'object'){
        var p = (_p + '').replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
        console.log('<a href="#'+p+'">View</a>'); 
    }
}
var result = '';
for(var _p in __customProps){
    if(typeof __customProps[_p] === 'object'){
        var p = (_p + '').replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
        
       result += ('\r\n\r\n##### ['+p+'](#'+p+')\r\n```json\r\n'+JSON.stringify(__customProps[_p], null, 2).replace(/"(\w+)"\s*:/g, '$1:') + '\r\n```');
    }
}
console.log(result);