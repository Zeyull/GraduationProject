const articleMD = `# 一、误区 ：

## \`useCallback\`是解决函数组件过多内部函数导致的性能问题

使用函数组件时经常定义一些内部函数，总觉得这会影响函数组件性能。也以为\`useCallback\`就是解决这个问题的，其实不然（[Are Hooks slow because of creating functions in render?](https://link.segmentfault.com/?enc=sZGwUMp8C8dlGKPyRo1ttA%3D%3D.Y8ZBTy0fEAKmMyisFKjT5KMqRDKRneR5n6MsJPngNX7ptllLW%2B1hereDIJAQIgmPyzUBfJNKZ54c8%2Fo%2B6ca611IvWLOA27K6N59DNUlRYW2XsdLInbttLbk%2FUMzYAokk)）：

1. [JS内部函数创建是非常快的，这点性能问题不是个问题](https://link.segmentfault.com/?enc=sFbGuAZ6N6ikKO8FRwHHpA%3D%3D.vun539BNXroSo%2BysNC22EotiBWZofohKiFZU14O7em0JAU46wP5YYDKfpoDvCo%2FjBAmH%2BdxzHRHj%2Fvr1xNHufGFoEc%2B3cPhRNH7QM827xp3sixlhWb72qnMg0mJpLZmv)；

2. 得益于相对于 class 更轻量的函数组件，以及避免了 HOC， renderProps 等等额外层级，函数组件性能差不到那里去；

3. 其实使用\`useCallback\`会造成额外的性能；
   因为增加了额外的\`deps\`变化判断。

4. \`useCallback\`其实也并不是解决内部函数重新创建的问题。
   仔细看看，其实**不管是否使用\`useCallback\`，都无法避免重新创建内部函数**：

   \`\`\`javascript
   export default function Index() {
       const [clickCount, increaseCount] = useState(0);
       // 没有使用\`useCallback\`，每次渲染都会重新创建内部函数
       const handleClick = () => {
           console.log('handleClick');
           increaseCount(clickCount + 1);
       }
   
       // 使用\`useCallback\`，但也每次渲染都会重新创建内部函数作为\`useCallback\`的实参
       const handleClick = useCallback(() => {
           console.log('handleClick');
           increaseCount(clickCount + 1);
       }, [])
   
       return (
           <div>
               <p>{clickCount}</p>
               <Button handleClick={handleClick}>Click</Button>
           </div>
       )
   }
   \`\`\`

# 二、\`useCallback\`解决的问题

**\`useCallback\`其实是利用\`memoize\`减少不必要的子组件重新渲染**

\`\`\`javascript
import React, { useState, useCallback } from 'react'

function Button(props) {
    const { handleClick, children } = props;
    console.log('Button -> render');

    return (
        <button onClick={handleClick}>{children}</button>
    )
}

const MemoizedButton = React.memo(Button);

export default function Index() {
    const [clickCount, increaseCount] = useState(0);
    
    const handleClick = () => {
        console.log('handleClick');
        increaseCount(clickCount + 1);
    }

    return (
        <div>
            <p>{clickCount}</p>
            <MemoizedButton handleClick={handleClick}>Click</MemoizedButton>
        </div>
    )
}
\`\`\`

即使使用了\`React.memo\`修饰了\`Button\`组件，但是每次点击【Click】btn都会导致\`Button\`组件重新渲染，因为：

1. \`Index\`组件state发生变化，导致组件重新渲染；
2. 每次渲染导致重新创建内部函数\`handleClick \`，
3. 进而导致子组件\`Button\`也重新渲染。

使用\`useCallback\`优化：

\`\`\`javascript
import React, { useState, useCallback } from 'react'

function Button(props) {
    const { handleClick, children } = props;
    console.log('Button -> render');

    return (
        <button onClick={handleClick}>{children}</button>
    )
}

const MemoizedButton = React.memo(Button);

export default function Index() {
    const [clickCount, increaseCount] = useState(0);
    // 这里使用了\`useCallback\`
    const handleClick = useCallback(() => {
        console.log('handleClick');
        increaseCount(clickCount + 1);
    }, [])

    return (
        <div>
            <p>{clickCount}</p>
            <MemoizedButton handleClick={handleClick}>Click</MemoizedButton>
        </div>
    )
}
\`\`\`

# 三、\`useCallback\`的问题

## 3.1 \`useCallback\`的实参函数读取的变量是变化的（一般来自state, props）

\`\`\`javascript
export default function Index() {
    const [text, updateText] = useState('Initial value');

    const handleSubmit = useCallback(() => {
        console.log(\`Text: \${text}\`); // BUG：每次输出都是初始值
    }, []);

    return (
        <>
            <input value={text} onChange={(e) => updateText(e.target.value)} />
            <p onClick={handleSubmit}>useCallback(fn, deps)</p> 
        </>
    )
}
\`\`\`

修改\`input\`值，\`handleSubmit \`处理函数的依旧输出初始值。
**如果\`useCallback\`的实参函数读取的变量是变化的，记得写在依赖数组里。**

\`\`\`javascript
export default function Index() {
    const [text, updateText] = useState('Initial value');

    const handleSubmit = useCallback(() => {
        console.log(\`Text: \${text}\`); // 每次输出都是初始值
    }, [text]); // 把\`text\`写在依赖数组里

    return (
        <>
            <input value={text} onChange={(e) => updateText(e.target.value)} />
            <p onClick={handleSubmit}>useCallback(fn, deps)</p> 
        </>
    )
}
\`\`\`

虽然问题解决了，但是方案不是最好的，因为input输入框变化太频繁，\`useCallback\`存在的意义没啥必要了。
`;
export default articleMD;
