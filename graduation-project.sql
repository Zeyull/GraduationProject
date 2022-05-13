/*
 Navicat Premium Data Transfer

 Source Server         : docker-mysql
 Source Server Type    : MySQL
 Source Server Version : 80028
 Source Host           : localhost:3306
 Source Schema         : graduation-project

 Target Server Type    : MySQL
 Target Server Version : 80028
 File Encoding         : 65001

 Date: 14/05/2022 00:48:18
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for Article
-- ----------------------------
DROP TABLE IF EXISTS `Article`;
CREATE TABLE `Article` (
  `article_id` int NOT NULL AUTO_INCREMENT,
  `article_title` varchar(255) DEFAULT NULL,
  `article_content` longtext,
  `time` timestamp NULL DEFAULT NULL,
  `author_id` int DEFAULT NULL,
  `like` int DEFAULT '0',
  `img` varchar(255) DEFAULT NULL,
  `question_id` int DEFAULT NULL,
  `author_img` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`article_id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of Article
-- ----------------------------
BEGIN;
INSERT INTO `Article` (`article_id`, `article_title`, `article_content`, `time`, `author_id`, `like`, `img`, `question_id`, `author_img`) VALUES (31, '事件委托', '![123](http://localhost:3005/upload/headerImage/f8648190c4fd95c48c278fdd30c3939b.png)\r\n### 事件委托\r\n\r\n事件委托，就是把一个元素的响应事件委托到另外一个元素\r\n\r\n一般来讲，会把一个或者一组元素的事件委托到它的父层或者更外层元素上，真正绑定事件的是外层元素，当事件响应到需要绑定的元素上时，会通过事件冒泡机制从而触发它的外层元素的绑定事件上，然后在外层元素上去执行函数。\r\n\r\n关键点，使用e.target\r\n\r\ne.target属性返回事件对象的目标结点（也就是触发该事件的节点）\r\n\r\n```javascript\r\nvar ul = document.querySelector(\'ul\');\r\nul.addEventListener(\'click\',function(e){\r\n    Array.from(ul.children).forEach(element => {\r\n        element.className = \'\';\r\n    });\r\n    e.target.className = \'bk\';\r\n})\r\n```\r\n\r\n当需要精准匹配的时候，使用Element.matches![]()', '2022-05-07 01:15:33', 8, 0, '/upload/articleImages/c6bbe014bc469673f1a7c5ca5fbcdf38.png', NULL, '/upload/headerImage/c6bbe014bc469673f1a7c5ca5fbcdf38.png');
INSERT INTO `Article` (`article_id`, `article_title`, `article_content`, `time`, `author_id`, `like`, `img`, `question_id`, `author_img`) VALUES (32, 'React中对事件绑定的优化', '首先书写方式是小驼峰书写方式。\r\n\r\n另外在 React 中另一个不同点是你不能通过返回 `false` 的方式阻止默认行为。你必须显式的使用 `preventDefault`。\r\n\r\n默认是在冒泡阶段执行，且在底层抹平了不同浏览器的差异，在上层面向开发者暴露统一的、稳定的、与 DOM 原生事件相同的事件接口。\r\n\r\n会把所有事件委托绑定在document，相较于上个知识点，应该是做了优化。\r\n\r\n\r\n\r\nReact 事件系统的设计动机是什么？\r\n\r\n1. **合成事件符合W3C规范，在底层抹平了不同浏览器的差异，在上层面向开发者暴露统一的、稳定的、与 DOM 原生事件相同的事件接口**。开发者们由此便不必再关注烦琐的底层兼容问题，可以专注于业务逻辑的开发。\r\n2. 自研事件系统使 React 牢牢把握住了**事件处理的主动权**.\r\n\r\n对 React 来说，事件委托主要的作用应该在于帮助 React 实现了对所有事件的中心化管控。\r\n\r\n> 事件的绑定是在组件挂载过程中完成的，即 `completeWork` 中完成的。\r\n>\r\n> completeWork 有三个关键动作：创建 DOM 节点、将 DOM 节点插入到 DOM 树中、为 DOM 节点设置属性。\r\n>\r\n> 事件的触发本质上是对 `dispatchEvent` 函数的调用。\r\n>\r\n> 核心工作流：\r\n>\r\n> 事件触发，冒泡至 `document` -> 执行 `dispatchEvent` -> 创建事件对应的合成事件对象（`SyntheticEvent`）->\r\n> 收集事件在捕获阶段所波及的回调函数和对应的节点实例 -> 收集事件在冒泡阶段所波及的回调函数和对应的节点实例 ->\r\n> 将收集回来的回调按顺序执行，执行时 `SyntheticEvent` 会作为如参被传入每个回调\r\n\r\n更详细的内容：[特别的事件系统：React 事件与 DOM 事件有何不同](', '2022-05-07 02:48:53', 8, 0, NULL, NULL, '/upload/headerImage/c6bbe014bc469673f1a7c5ca5fbcdf38.png');
INSERT INTO `Article` (`article_id`, `article_title`, `article_content`, `time`, `author_id`, `like`, `img`, `question_id`, `author_img`) VALUES (35, '分析比较 opacity: 0、visibility: hidden、display: none', '从结构上来讲：\r\n\r\n- display:none **会**让元素完全从渲染树中消失，渲染的时候不占据任何空间, 不能点击\r\n- visibility:hidden**不会**让元素完全从渲染树中消失，渲染的时候不占据任何空间, 不能点击\r\n- opacity:0 **不会**让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，可以点击(透明度)\r\n- （渲染树？）\r\n\r\n从继承上来讲：\r\n\r\n- display:none是**非继承属性**，子孙结点的消失是由于该元素从渲染数消失造成的，通过修改子孙结点属性仍无法显示\r\n- visibility:hidden是**继承属性**，子孙节点消失由于继承了hidden，通过设置visibility: visible可以让子孙节点显式。\r\n- opacity:0是**继承属性**，且子孙结点无法通过修改opacity来改变这个继承属性。父节点可以通过rgba间接设定opacity的值，这个不会向下继承；或者把opacity属性放到同级元素实现透明\r\n\r\n从性能方面来讲：\r\n\r\n- display:none修改元素会造成文档**回流**，性能消耗较大，读屏器不会读取display:none元素内容\r\n- visibility:hidden修改元素只会造成元素本身**重绘**，性能消耗较少，读屏器会读取visibility:hidden元素内容\r\n- opacity:0修改元素造成**重绘**，性能消耗较少，读屏器会读取opacity:0元素内容\r\n\r\n共同特点：它们都能让元素不可见\r\n\r\n参考文章：\r\n\r\n- CSS魔法堂：display:none和visiblity:hidden的恩怨情仇 https://segmentfault.com/a/1190000016570003', '2022-05-08 13:06:10', 6, 0, '/upload/articleImages/8e7feee8ff9a5f9bd725d0c1c57d655e.png', NULL, '/upload/headerImage/f8648190c4fd95c48c278fdd30c3939b.png');
INSERT INTO `Article` (`article_id`, `article_title`, `article_content`, `time`, `author_id`, `like`, `img`, `question_id`, `author_img`) VALUES (36, '如何使集群共享session且稳定？', '先说说方法：\r\n\r\n1. 找一块公共地方来存储session，而不是将session存储在集群节点的某个服务器上，这样每一台服务器都能访问这块空间，实现session共享\r\n2. 每台服务器仍存储session，不做修改，但采取另外一种同步机制，实时同步每一台服务器的session信息\r\n\r\n具体实现方案：\r\n\r\n1.持久化session到数据库，即使用数据库来储存session。数据库正好是我们普遍使用的公共储存空间，一举两得，推荐使用mysql数据库，轻量并且性能良好。\r\n\r\n**优点：**就地取材，符合大多数人的思维，使用简单，不需要太多额外编码工作。\r\n\r\n**缺点：**对mysql性能要求较高，访问mysql需要从连接池中获取连接，又因为大部分请求均需要进行登录鉴权，所以**操作数据库非常频繁，当用户量达到一定程度之后，极易造成数据库瓶颈，不适用于处理高并发的情况。**\r\n\r\n2.用redis共享session。redis是一个key-value的储存系统。可以简单的将其理解为一个数据库，与传统数据库的区别是，它将数据储存于内存中，并自带有内存到硬盘的序列化策略，即按策略将内存中的数据同步到磁盘，避免数据丢失，是目前比较流行的解决方案。\r\n\r\n**优点：无需增加数据库的压力，因为数据存储于内存中，所以读取非常快，高性能，并能处理多种类型的数据。**\r\n\r\n**缺点：**额外增加一些编码，以便操作redis。\r\n\r\n3.使用Cookie共享session。此方案可以说是独辟蹊径了，将分布式思想用到了极致。如上文分析所说，session-cookie机制中，session与cookie相互关联，以cookie做中转站，用来找到对应的session，其中session存放在服务器。那么如果将session中的内容存放在cookie中呢，那么则省略了服务器保存session的过程，后台只需要根据cookie中约定的标识进行鉴权校验即可。\r\n\r\n**优点：**完美的贯彻分布式的理念，将每个用户都利用起来，无需耗费额外的服务器资源；\r\n\r\n**缺点：**受http协议头长度限制，cookie中存储的信息不宜过多；为了保持cookie全局有效，所以其一般依赖在根域名下，所以基本上所有的http请求都需要传递cookie中的这些标记信息，所以会占用一些服务器的带宽；鉴权信息全存储于cookie中，cookie存在于客户端，服务器并没有储存相关信息，cookie存在着泄露的可能，或则其他人揣摩出规则后可以进行伪装，其安全性比其他方案差，故需要对cookie中信息进行加密解密，来增强其安全性。 \r\n\r\n4.使用memcache同步session，memcache可以实现分布式，可将服务器中的内存组合起来，形成一个“内存池”，以此充当公共空间，保存session信息。\r\n\r\n**优点：**数据储存在内存中，读取非常快，性能好；\r\n\r\n**缺点：**memcache把内存分成很多种规格的存储块，有大有小，不能完全利用内存，会产生内存碎片，浪费资源，如果储存块不足，还会产生内存溢出。\r\n\r\n', '2022-05-10 09:04:33', 9, 0, '/upload/articleImages/070bce53cf33ef251392ad17758417b0.jpeg', NULL, '/default/unLoginImg.png');
INSERT INTO `Article` (`article_id`, `article_title`, `article_content`, `time`, `author_id`, `like`, `img`, `question_id`, `author_img`) VALUES (37, '编译性语言和解释性语言', '高级语言若想被计算机执行，都必须将其转换为计算机语言，也就是机器码。而转换的方式有两种：\r\n\r\n**编译**与**解释**\r\n\r\n所以高级语言也分为**编译型语言（C C++）和解释性语言（Python JS）** \r\n\r\n> JS是脚本语言，脚本语言不需要编译，是由js解释器逐行解释并执行的\r\n\r\n**主要区别在于，前者源程序编译后即可在该平台运行，后者是在运行期间才编译。所以前者运行速度快，后者跨平台性好。**\r\n\r\n**编译性语言**\r\n\r\n特点：\r\n\r\n在编译型语言写的程序执行之前，**需要一个专门的编译过程，把源代码编译成机器语言的文件，如exe格式的文件，以后要再运行时，直接使用编译结果即可**，如直接运行exe文件。**因为只需编译一次，以后运行时不需要编译，所以编译型语言执行效率高。**\r\n\r\n总结：\r\n\r\n1.一次性的编译成平台相关的机器语言文件，**运行时脱离开发环境，运行效率高**；\r\n\r\n2.与特定平台相关，一般无法移植到其他平台；\r\n\r\n**解释性语言**\r\n\r\n特点：\r\n\r\n解释型语言**不需要事先编译，其直接将源代码解释成机器码并立即执行**，所以只要**某一平台提供了相应的解释器即可运行该程序。**\r\n\r\n总结：\r\n\r\n1.解释型语言每次运行都需要将源代码解释成机器码并执行，**效率较低**；\r\n\r\n2.只要平台提供相应的解释器，就可以运行源代码，所以可以**方便源程序移植**；\r\n\r\n**两者各有利弊**\r\n\r\n前者由于**程序执行速度快，同等条件下对系统要求较低**，因此像**开发操作系统、大型应用程序、数据库系统**等时都采用它\r\n\r\n而一些网页脚本、服务器脚本及辅助开发接口这样的**对速度要求不高、对不同系统平台间的兼容性有一定要求**的程序则通常使用解释性语言\r\n\r\n> JAVA即是编译的，也是解释的。非要归类的话，从概念上来讲，应该会定义到解释性语言中\r\n>\r\n> JAVA先编译，但编译后不能直接运行，要通过JVM来解释运行，所以是解释语言（但现在的JVM有一些有JIT优化，它又会把.class的二进制代码编译为本地的代码直接运行，就又是编译语言了）\r\n\r\n', '2022-05-10 09:21:26', 9, 0, '/upload/articleImages/ada3ade1163dcdcf20a3f192de642392.jpeg', NULL, '/default/unLoginImg.png');
INSERT INTO `Article` (`article_id`, `article_title`, `article_content`, `time`, `author_id`, `like`, `img`, `question_id`, `author_img`) VALUES (38, '关于两数之和的解答方法', '### 网页加载慢，如何进行前端的性能优化\r\n\r\n答5点\r\n\r\n**减少HTTP请求次数**，每次HTTP请求都有成本的，既包含时间成本也包含资源成本。另外浏览器进行并发请求的请求数量是有上限的，请求数增多，浏览器会进行分批次请求。如何实现减少HTTP请求呢？\r\n\r\n1. 从设计层面简化页面，保持页面简洁，减少资源是最直接的方法\r\n2. 设置合理的HTTP缓存。对于很少变化的图片资源可以设置很长的过期时间，对于变化不频繁的资源可以使用Last-Modified或者E-tag进行验证，尽可能让资源在缓存中呆的久一点\r\n3. 资源的合并与压缩，尽量把外部脚本、样式进行合并，多个合为一个。响应的图片、视频、JS文件、CSS文件都可以使用相应的工具压缩\r\n4. 使用CSS 精灵图 CSS Sprites，合并CSS请求的图片，是减少请求次数的一个好办法，background-position\r\n5. 使用懒加载图片，这种情况下能减少页面初始化时HTTP请求数，只有在用户向下滚动屏幕时才会再次请求加载\r\n6. 使用更高版本的HTTP，在HTTP2中会采用多路复用，浏览器推送等优化机制\r\n\r\n**在渲染页面时的优化**\r\n\r\n解析html时，遇到一些链接资源，会单独发起网络请求去下载资源\r\n\r\n1. 对于CSS资源，虽然下载时异步，不会阻止浏览器构建DOM树，但是会阻塞渲染，在构建render树时，要等待CSS下载完毕后才执行（这里是浏览器自带的优化，避免了重复构建），但声明了media query的CSS不会阻塞渲染（下方专门针对CSS与渲染页面写了）\r\n2. 对于JS资源，会阻塞浏览器的解析，只有等待脚本下载完并执行后才会继续解析HTML，但加上了async和defer后，脚本就变成异步的了，可以等HTML解析完毕后再执行\r\n\r\n> defer和async是有区别的： **defer是延迟执行，而async是异步执行。**但只要是**JS执行，就会暂停HTML解析**\r\n>\r\n> - `async`是异步执行，异步下载完毕后就会执行，不确保执行顺序，一定在`onload`前，但不确定在`DOMContentLoaded`事件的前或后\r\n> - `defer`是延迟执行，在浏览器看起来的效果像是将脚本放在了`body`后面一样，等待HTML解析完毕后才执行脚本（虽然按规范应该是在`DOMContentLoaded`事件前，但实际上不同浏览器的优化效果不一样，也有可能在它后面）\r\n\r\n合理利用光栅线程和合成线程的机制，这里涉及浏览器相关知识\r\n\r\n**通过原生JS的技巧来进行性能优化**\r\n\r\n1. 在JS代码解析过程中减少**回流和重绘**，每次回流和重绘会造成额外的计算消耗，通过减少回流和重绘，可以提升页面性能\r\n   1. 最小化重绘和回流，多次修改CSS样式可以改成采用cssText和修改css class；\r\n   2. 批量修改DOM，先让DOM脱离文档流，对其进行多次修改，再将元素带回到文档流中。如隐藏文档，拷贝文档\r\n   3. 使用CSS3硬件加速（GPU加速），让一些动画不会引起回流和重绘\r\n   4. 使用虚拟DOM，虚拟DOM不会立即操作DOM，而是将这10次更新的diff内容保存到本地一个JS对象中，最终将这个JS对象一次性attch到DOM树上，再进行后续操作，避免大量无谓的计算量。\r\n2. **事件委托**，通过事件委托减少内存消耗，因为访问的DOM减少了，设置事件处理程序所需时间更少, 加快了整个页面的交互就绪时间，还可以动态绑定事件，减少重复的工作。使用事件委托时注意**非快速滚动区**\r\n\r\n**使用CDN加速**，能够使用户就近获取所需内容，降低网络拥塞，提高用户访问响应速度和命中率，就算一个服务器或者源服务器宕机了，还有其他CDN缓存服务器可以提供资源。\r\n\r\n​	如何做到加速的呢？CDN 网站的内容缓存在网络边缘。不同地区的用户就会访问到离自己最近的相同网络线路上的CDN节点。当请求达到CDN节点后，节点会判断自己的内容缓存是否有效，如果有效，则立即响应缓存内容给用户，从而加快响应速度。\r\n\r\n​	CDN是在DNS解析的过程中起作用的，当给一个域名开通了CDN，要先给**这个域名的DNS解析设置的后台**添加一条CDN专用的解析记录，这条解析记录会让域名被解析后指向**一个CDN网络专用的处理DNS请求的服务器**，这个CDN专用的处理DNS请求的服务器会给浏览器返回**一台专门用来给各个请求分配合适CDN服务器的服务器的IP**地址，这种服务器叫负载均衡系统服务器。然后浏览器就会去访问这台负载均衡系统浏览器，负载均衡服务器会根据你浏览器的网络地址，在CDN网络中找**一台在各种条件下都比较适合给你设备提供服务的服务器**，将这个服务器的IP返回给你的浏览器，那么浏览器在收到这个IP地址后，就会去访问这台CDN服务器了，去请求文件资源了\r\n\r\n> 不同地区的用户会访问到离自己最近的相同网络线路上的CDN节点，当请求达到CDN节点后，节点会判断自己的内容缓存是否有效，如果有效，则立即响应缓存内容给用户，从而加快响应速度。如果CDN节点的缓存失效，它会根据服务配置去**一层一层的向上**获取最新的资源响应给用户，并将内容缓存下来以便响应给后续访问的用户，这就意味着一个地区的用户只需要访问一次服务器，后续的用户都能因此受益。\r\n\r\n**预解析DNS**。通过 DNS 预解析来告诉浏览器未来我们可能从某个特定的 URL 获取资源，当浏览器真正使用到该域中的某个资源时就可以**尽快地完成 DNS 解析**。\r\n\r\n​	通过设置X-DNS-Prefetch-Control头控制浏览器的DNS预解析功能。先在meta信息告诉浏览器开启X-DNS-Prefetch-Control，再在link里面强制对DNS进行预解析\r\n\r\n> 浏览器会对 a 标签的 href 自动启用 DNS Prefetching，所以 a 标签里包含的域名不需要在 head 中手动设置 link。但是在 HTTPS 下不起作用，需要 meta 来强制开启功能', '2022-05-12 16:43:50', 6, 0, '/upload/articleImages/5062beba5ba5f805347ff13ecc57e5c8.jpg', 1, '/upload/headerImage/f8648190c4fd95c48c278fdd30c3939b.png');
INSERT INTO `Article` (`article_id`, `article_title`, `article_content`, `time`, `author_id`, `like`, `img`, `question_id`, `author_img`) VALUES (39, '关于两数之和-改的题解', 'indexedDB诞生背景：Cookie 的大小不超过4KB，且每次请求都会发送回服务器，LocalStorage 在 2.5MB 到 10MB 之间（各家浏览器不同），而且不提供搜索功能，不能建立自定义的索引。\r\n\r\nIndexedDB是浏览器提供的本地数据库， 允许储存大量数据，提供查找接口，还能建立索引。这些都是 LocalStorage 所不具备的。就数据库类型而言，IndexedDB 不属于关系型数据库（不支持 SQL 查询语句），更接近 NoSQL 数据库。\r\n\r\n[参考文章链接](https://segmentfault.com/a/1190000020522975)\r\n\r\n与本地存储相关的有webStorage webSql和indexedDB，后面两个都是浏览器数据库\r\n\r\n与存储数据相关的还有cookie，经常与webStorage技术来比较', '2022-05-12 19:06:46', 8, 0, NULL, 2, '/upload/headerImage/c6bbe014bc469673f1a7c5ca5fbcdf38.png');
INSERT INTO `Article` (`article_id`, `article_title`, `article_content`, `time`, `author_id`, `like`, `img`, `question_id`, `author_img`) VALUES (41, '什么是Token', 'token的意思是“令牌”，是服务器生成的一串字符串，**作为客户端进行请求的一个标识**\r\n\r\n> 当用户第一次登录后，服务器生成了一个token并返回这个token给客户端，客户端之后只需要带上这个token前来请求数据即可，无需再带上用户名和密码\r\n>\r\n> 简单的token的组成：\r\n>\r\n> uid（用户唯一的身份标识符），time（当前时间的时间戳），sign（签名，token的前几位以哈希算法压缩成的一定长度的十六进制字符串，为防止token泄露） 存疑 不如看下面的token原理\r\n\r\n为什么要使用token？\r\n\r\n- Token是无状态、可扩展的，可以在多个服务器之间共享\r\n- Token完全由应用管理，所以它可以避开同源策略\r\n- Token可以避免CSRF攻击\r\n\r\n因为http协议是无状态的，为了区别每个用户的信息，现在一般网页用户登录使用Token机制进行区别，如果使用session辨别用户，当用户数量过大时，这是对服务器巨大的开销，而且严重限制了服务器的扩展能力。所以使用token让用户自己存储，每次请求携带，服务器通过Hash算法和密钥进行解析判断，这样服务器的资源开销减小了，也更容易进行扩展。\r\n\r\n**token原理**\r\n\r\n　　1.将荷载payload，以及Header信息进行**Base64加密**，形成payload密文，header密文。\r\n\r\n　　2.将形成的密文用句号链接起来，用服务端**秘钥**进行**HS256加密**，生成签名.\r\n\r\n　　3.将前面的两个密文后面用句号链接签名形成最终的token返回给客户端\r\n\r\n注：\r\n\r\n　　（1）用户请求时携带此token(分为三部分，header密文，payload密文，签名)到服务端，服务端解析第一部分(header密文)，用Base64解密，可以知道用了什么算法进行签名，此处解析发现是**HS256**。\r\n\r\n　　（2）服务端使用原来的秘钥与密文(header密文+\".\"+payload密文)同样进行HS256运算，然后用生成的签名与token携带的签名进行对比，若一致说明token合法，不一致说明原文被修改。\r\n\r\n　　（3）判断是否过期，客户端通过用**Base64**解密第二部分（payload密文），**可以知道荷载中授权时间，以及有效期。通过这个与当前时间对比发现token是否过期**。', '2022-05-13 12:16:43', 8, 0, '/upload/articleImages/d52b0bc94fd6efe82fe26881fd773a54.jpg', NULL, '/upload/headerImage/c6bbe014bc469673f1a7c5ca5fbcdf38.png');
INSERT INTO `Article` (`article_id`, `article_title`, `article_content`, `time`, `author_id`, `like`, `img`, `question_id`, `author_img`) VALUES (42, 'HTML文档里head标签中有哪些常见的标签？', '每一个HTML文档中都必须有head标签，它作为一个容器，主要包含了用于描述HTML文件的自身信息（元数据）的标签。\r\n\r\n这些标签一般不会展现给用户，而是提供信息给浏览器和搜索引擎\r\n\r\n一般用到head标签里的标签有：`<title>` , `<base>` , `<link>` , `<style>` , `<meta>` , `<script>` , `<noscript>` 。这些标签也称为元信息标签\r\n\r\n\\<title>\r\n\r\n定义文档的标题，一般会显示在浏览器的标题栏或标签页上，一般会完整地概括整个网页的内容\r\n\r\n\\<base>\r\n\r\n给页面上所有相对 URL 的提供一个基础。一份文档中只能有一个 `<base>` 标签。\r\n\r\n\\<link>\r\n\r\n规定外部资源与当前文档的关系，常用于链接样式表，也有其他作用\r\n\r\n```html\r\n<!-- 引入样式 -->\r\n<link rel=\"stylesheet\" href=\"xxx.css\" type=\"text/css\" >\r\n<!-- SEO 搜索引擎优化 主要是给搜索引擎看的 在网站中常有多个 url 指向同一个页面的情况，下面的标签告知搜索引擎页面的主 url 是什么，以便搜索引擎保留主要页面而去除其他重复页面。-->\r\n<link rel=\"canonical\" href=\"...\" >\r\n<!-- 提供RSS订阅的 标签除搜索引擎可以看懂以外，也能被很多浏览器插件识别。-->\r\n<link rel=\"alternate\" type=\"application/rss+xml\" title=\"RSS\" href=\"...\">\r\n<!-- 表示页面icon的 -->\r\n<link rel=\"icon\" href=\"https://xxx.png\">\r\n<!-- 对页面进行预处理的 提前对一个域名做 dns 查询。强制对域名进行预读取在有的情况下很有用。\r\n比如, 在网站的主页上，强制在整个网站上对频繁引用的域名做预解析处理，即使它们不在主页本身上使用。虽然主页的性能可能不受影响，但是会提高站点整体性能。-->\r\n<link rel=\"dns-prefetch\" href=\"//xxx.com\">\r\n```\r\n\r\n> “SEO（Search Engine Optimization）：汉译为搜索引擎优化。是一种方式：**利用搜索引擎的规则提高网站在有关搜索引擎内的自然排名。目的是让其在行业内占据领先地位，获得品牌收益**。很大程度上是网站经营者的一种商业行为，将自己或自己公司的排名前移。”\r\n\r\n\\<style>\r\n\r\n包含了文档的样式信息\r\n\r\n\\<meta>\r\n\r\n一种通用的元数据信息表示标签，一般以键值对出现，如：`<meta name=\"xxx\" content=\"yyy\">`\r\n\r\n```html\r\n<!-- charset 属性 从 HTML5 开始，上述写法被推荐使用，用于声明当前文档所使用的字符编码，推荐放在 <head> 中的第一位。-->\r\n<meta charset=\"utf-8\">\r\n<!-- 在 HTML4 中，上述代码用于声明字符集，但是现在已不被推荐。-->\r\n<meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\">\r\n<!-- name属性-->\r\n<meta name=\"viewport\" content=\"width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no\">\r\n其实 <meta> 标签可以被自由定义，只要读取和写入的双方约定好 name 和 content 的格式就可以了。\r\n上面这种用法并不在 HTML 标准中，但是却移动端开发的事实标准。这里来解释一下 content 中的内容：\r\n\r\nwidth ：页面宽度，可以是一个正整数；也可以一个字符串 \"device-width\" ，表示跟设备宽度相等。\r\nheight ：页面高度，可以是一个正整数；也可以一个字符串 \"device-height\" ，表示跟设备高度相等。\r\ninitial-scale ：初始缩放比例。\r\nminimum-scale ： 最小缩放比例。\r\nmaximum-scale ： 最大缩放比例。\r\nuser-scalable ：是否允许用户缩放。\r\nname 属性的值除了可以是 viewport 之外，还有相当多的值：\r\n\r\napplication-name 、author 、description 、generator 、keywords 、referrer 、robots 等。\r\n```\r\n\r\n\\<script>\r\n\r\n用于嵌入或引用可执行脚本。来看几个 script 标签常见的全局属性：\r\n\r\n- async\r\n\r\n  使浏览器使用另一个线程下载脚本，这时不会阻塞页面渲染。当脚本下载完成后，浏览器会暂停渲染，执行脚本，执行完毕后继续渲染页面。\r\n\r\n  async 无法保证脚本的执行顺序，哪个脚本先下载结束就会先执行。\r\n\r\n- defer\r\n\r\n  同样会使浏览器并行下载脚本，但是下载完毕不会立即执行，而是会等到 DOM 加载完成后（即刚刚读取完 `</html>` 标签）再执行脚本。\r\n\r\n  defer 可以保证脚本的执行顺序就是它们在页面上出现的顺序。\r\n\r\n- src\r\n\r\n  定义引用外部脚本的地址，指定此属性的 script 标签内不应再有嵌入的脚本。**如果脚本文件使用了非英语字符，还应该注明字符的编码。**如：\r\n\r\n  ```xml\r\n  <script charset=\"utf-8\" src=\"https://www.example.com/script.js\"></script>\r\n  ```\r\n\r\n- type\r\n\r\n  默认值是 text/javascript\r\n\r\n\\<noscript>\r\n\r\n如果页面上的脚本类型不受支持或者当前在浏览器中关闭了脚本，则在此中定义**脚本未被执行时的替代内容**。\r\n\r\n\r\n\r\n以上只是简单的介绍，很多相关标签都是有特殊需求，在特殊的情况下使用。', '2022-05-13 16:25:48', 8, 0, '/upload/articleImages/3b9a3e8ea7c9b876a07ae5ea8673a9b5.png', NULL, '/upload/headerImage/c6bbe014bc469673f1a7c5ca5fbcdf38.png');
INSERT INTO `Article` (`article_id`, `article_title`, `article_content`, `time`, `author_id`, `like`, `img`, `question_id`, `author_img`) VALUES (43, '括号匹配的题解', 'DOM事件监听，其实就是“发布订阅者模式”的应用。（再去详细去了解）\r\n\r\n添加事件（回调函数）-> 触发点击，事件中心派发指定事件->执行事件。\r\n\r\n**发布订阅模式和观察者模式有什么不同？**\r\n\r\n首先，观察者是经典软件`设计模式`中的一种，但发布订阅只是软件架构中的一种`消息范式`。\r\n\r\n其次，就是实现二者所需的角色数量有着明显的区别。观察者模式本身只需要`2个`角色便可成型，即`观察者`和`被观察者`，其中`被观察者`是重点。而发布订阅需要至少`3个`角色来组成，包括`发布者`、`订阅者`和`发布订阅中心`，其中`发布订阅中心`是重点。\r\n\r\n详细介绍：[理解【观察者模式】和【发布订阅】的区别](https://juejin.cn/post/6978728619782701087)', '2022-05-13 16:39:35', 8, 0, NULL, 3, '/upload/headerImage/c6bbe014bc469673f1a7c5ca5fbcdf38.png');
COMMIT;

-- ----------------------------
-- Table structure for Comment
-- ----------------------------
DROP TABLE IF EXISTS `Comment`;
CREATE TABLE `Comment` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `article_id` int DEFAULT NULL,
  `time` timestamp NULL DEFAULT NULL,
  `uuid` int DEFAULT NULL,
  `user_name` varchar(20) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `reply_id` int DEFAULT NULL,
  `reply_name` varchar(20) DEFAULT NULL,
  `head_img` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`comment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of Comment
-- ----------------------------
BEGIN;
INSERT INTO `Comment` (`comment_id`, `article_id`, `time`, `uuid`, `user_name`, `content`, `reply_id`, `reply_name`, `head_img`) VALUES (1, 32, '2022-05-07 16:22:56', 8, 'K-on', '博主讲的真好', 0, '', '/upload/headerImage/c6bbe014bc469673f1a7c5ca5fbcdf38.png');
INSERT INTO `Comment` (`comment_id`, `article_id`, `time`, `uuid`, `user_name`, `content`, `reply_id`, `reply_name`, `head_img`) VALUES (2, 32, '2022-05-07 09:19:05', 8, 'K-on', '博主写的很详细', 0, '', '/upload/headerImage/c6bbe014bc469673f1a7c5ca5fbcdf38.png');
INSERT INTO `Comment` (`comment_id`, `article_id`, `time`, `uuid`, `user_name`, `content`, `reply_id`, `reply_name`, `head_img`) VALUES (3, 32, '2022-05-07 01:21:57', 8, 'K-on', '学到了很多React技术', 0, '', '/upload/headerImage/c6bbe014bc469673f1a7c5ca5fbcdf38.png');
INSERT INTO `Comment` (`comment_id`, `article_id`, `time`, `uuid`, `user_name`, `content`, `reply_id`, `reply_name`, `head_img`) VALUES (4, 32, '2022-05-07 09:24:26', 8, 'K-on', 'K-ON', 0, '', '/upload/headerImage/c6bbe014bc469673f1a7c5ca5fbcdf38.png');
INSERT INTO `Comment` (`comment_id`, `article_id`, `time`, `uuid`, `user_name`, `content`, `reply_id`, `reply_name`, `head_img`) VALUES (5, 32, '2022-05-07 09:46:34', 8, 'K-on', '轻飘飘时间', 0, '', '/upload/headerImage/c6bbe014bc469673f1a7c5ca5fbcdf38.png');
INSERT INTO `Comment` (`comment_id`, `article_id`, `time`, `uuid`, `user_name`, `content`, `reply_id`, `reply_name`, `head_img`) VALUES (6, 32, '2022-05-07 09:50:32', 8, 'K-on', '相遇天使', 0, '', '/upload/headerImage/c6bbe014bc469673f1a7c5ca5fbcdf38.png');
INSERT INTO `Comment` (`comment_id`, `article_id`, `time`, `uuid`, `user_name`, `content`, `reply_id`, `reply_name`, `head_img`) VALUES (7, 32, '2022-05-07 09:59:33', 8, 'K-on', 'DONT Say Lazy', 0, '', '/upload/headerImage/c6bbe014bc469673f1a7c5ca5fbcdf38.png');
INSERT INTO `Comment` (`comment_id`, `article_id`, `time`, `uuid`, `user_name`, `content`, `reply_id`, `reply_name`, `head_img`) VALUES (8, 32, '2022-05-07 10:00:19', 8, 'K-on', 'DONT Say Lazy!', 0, '', '/upload/headerImage/c6bbe014bc469673f1a7c5ca5fbcdf38.png');
INSERT INTO `Comment` (`comment_id`, `article_id`, `time`, `uuid`, `user_name`, `content`, `reply_id`, `reply_name`, `head_img`) VALUES (9, 32, '2022-05-07 10:05:49', 8, 'K-on', 'Please', 0, '', '/upload/headerImage/c6bbe014bc469673f1a7c5ca5fbcdf38.png');
INSERT INTO `Comment` (`comment_id`, `article_id`, `time`, `uuid`, `user_name`, `content`, `reply_id`, `reply_name`, `head_img`) VALUES (10, 32, '2022-05-07 10:21:53', 8, 'K-on', '你的牌打的也忒好了', 1, 'K-on', '/upload/headerImage/c6bbe014bc469673f1a7c5ca5fbcdf38.png');
INSERT INTO `Comment` (`comment_id`, `article_id`, `time`, `uuid`, `user_name`, `content`, `reply_id`, `reply_name`, `head_img`) VALUES (11, 32, '2022-05-07 11:35:28', 8, 'K-on', 'React的对原生的事件处理做了哪些调整', 10, 'K-on', '/upload/headerImage/c6bbe014bc469673f1a7c5ca5fbcdf38.png');
INSERT INTO `Comment` (`comment_id`, `article_id`, `time`, `uuid`, `user_name`, `content`, `reply_id`, `reply_name`, `head_img`) VALUES (12, 32, '2022-05-07 11:45:22', 6, 'TojoNozomi', '准备起飞！', 11, 'K-on', '/upload/headerImage/f8648190c4fd95c48c278fdd30c3939b.png');
INSERT INTO `Comment` (`comment_id`, `article_id`, `time`, `uuid`, `user_name`, `content`, `reply_id`, `reply_name`, `head_img`) VALUES (13, 32, '2022-05-07 11:46:18', 6, 'TojoNozomi', '很强', 2, 'K-on', '/upload/headerImage/f8648190c4fd95c48c278fdd30c3939b.png');
INSERT INTO `Comment` (`comment_id`, `article_id`, `time`, `uuid`, `user_name`, `content`, `reply_id`, `reply_name`, `head_img`) VALUES (14, 32, '2022-05-07 11:47:39', 6, 'TojoNozomi', '李在干神魔', 2, 'K-on', '/upload/headerImage/f8648190c4fd95c48c278fdd30c3939b.png');
INSERT INTO `Comment` (`comment_id`, `article_id`, `time`, `uuid`, `user_name`, `content`, `reply_id`, `reply_name`, `head_img`) VALUES (15, 32, '2022-05-07 11:51:58', 6, 'TojoNozomi', '现在是北京时间....', 9, 'K-on', '/upload/headerImage/f8648190c4fd95c48c278fdd30c3939b.png');
INSERT INTO `Comment` (`comment_id`, `article_id`, `time`, `uuid`, `user_name`, `content`, `reply_id`, `reply_name`, `head_img`) VALUES (16, 32, '2022-05-07 11:53:14', 6, 'TojoNozomi', '怎么就不对呢', 15, 'TojoNozomi', '/upload/headerImage/f8648190c4fd95c48c278fdd30c3939b.png');
INSERT INTO `Comment` (`comment_id`, `article_id`, `time`, `uuid`, `user_name`, `content`, `reply_id`, `reply_name`, `head_img`) VALUES (17, 32, '2022-05-07 11:53:46', 6, 'TojoNozomi', '有问题', 9, 'K-on', '/upload/headerImage/f8648190c4fd95c48c278fdd30c3939b.png');
INSERT INTO `Comment` (`comment_id`, `article_id`, `time`, `uuid`, `user_name`, `content`, `reply_id`, `reply_name`, `head_img`) VALUES (18, 32, '2022-05-07 11:55:38', 6, 'TojoNozomi', 'React.ReactNode', 16, 'TojoNozomi', '/upload/headerImage/f8648190c4fd95c48c278fdd30c3939b.png');
INSERT INTO `Comment` (`comment_id`, `article_id`, `time`, `uuid`, `user_name`, `content`, `reply_id`, `reply_name`, `head_img`) VALUES (19, 32, '2022-05-07 11:55:58', 6, 'TojoNozomi', '没你打得好', 10, 'K-on', '/upload/headerImage/f8648190c4fd95c48c278fdd30c3939b.png');
INSERT INTO `Comment` (`comment_id`, `article_id`, `time`, `uuid`, `user_name`, `content`, `reply_id`, `reply_name`, `head_img`) VALUES (20, 32, '2022-05-07 11:56:31', 6, 'TojoNozomi', '第20条评论', 1, 'K-on', '/upload/headerImage/f8648190c4fd95c48c278fdd30c3939b.png');
INSERT INTO `Comment` (`comment_id`, `article_id`, `time`, `uuid`, `user_name`, `content`, `reply_id`, `reply_name`, `head_img`) VALUES (21, 32, '2022-05-07 11:59:34', 6, 'TojoNozomi', '比如Vue的事件绑定？', 3, 'K-on', '/upload/headerImage/f8648190c4fd95c48c278fdd30c3939b.png');
INSERT INTO `Comment` (`comment_id`, `article_id`, `time`, `uuid`, `user_name`, `content`, `reply_id`, `reply_name`, `head_img`) VALUES (22, 31, '2022-05-07 14:15:15', 6, 'TojoNozomi', '第一条评论', 0, '', '/upload/headerImage/f8648190c4fd95c48c278fdd30c3939b.png');
INSERT INTO `Comment` (`comment_id`, `article_id`, `time`, `uuid`, `user_name`, `content`, `reply_id`, `reply_name`, `head_img`) VALUES (24, 31, '2022-05-08 10:37:56', 6, 'TojoNozomi', '99999\n', 0, '', '/upload/headerImage/f8648190c4fd95c48c278fdd30c3939b.png');
INSERT INTO `Comment` (`comment_id`, `article_id`, `time`, `uuid`, `user_name`, `content`, `reply_id`, `reply_name`, `head_img`) VALUES (25, 31, '2022-05-08 10:38:04', 6, 'TojoNozomi', '11', 24, 'TojoNozomi', '/upload/headerImage/f8648190c4fd95c48c278fdd30c3939b.png');
INSERT INTO `Comment` (`comment_id`, `article_id`, `time`, `uuid`, `user_name`, `content`, `reply_id`, `reply_name`, `head_img`) VALUES (26, 31, '2022-05-08 10:38:12', 6, 'TojoNozomi', '1\n', 25, 'TojoNozomi', '/upload/headerImage/f8648190c4fd95c48c278fdd30c3939b.png');
INSERT INTO `Comment` (`comment_id`, `article_id`, `time`, `uuid`, `user_name`, `content`, `reply_id`, `reply_name`, `head_img`) VALUES (27, 31, '2022-05-08 10:38:18', 6, 'TojoNozomi', '223', 26, 'TojoNozomi', '/upload/headerImage/f8648190c4fd95c48c278fdd30c3939b.png');
INSERT INTO `Comment` (`comment_id`, `article_id`, `time`, `uuid`, `user_name`, `content`, `reply_id`, `reply_name`, `head_img`) VALUES (28, 35, '2022-05-08 13:06:20', 6, 'TojoNozomi', '博主分析的真好', 0, '', '/upload/headerImage/f8648190c4fd95c48c278fdd30c3939b.png');
INSERT INTO `Comment` (`comment_id`, `article_id`, `time`, `uuid`, `user_name`, `content`, `reply_id`, `reply_name`, `head_img`) VALUES (29, 36, '2022-05-10 17:00:13', 8, 'K-on', '发表一个评论吧', 0, '', '/upload/headerImage/c6bbe014bc469673f1a7c5ca5fbcdf38.png');
INSERT INTO `Comment` (`comment_id`, `article_id`, `time`, `uuid`, `user_name`, `content`, `reply_id`, `reply_name`, `head_img`) VALUES (30, 36, '2022-05-10 17:00:27', 8, 'K-on', '发表第二个评论', 0, '', '/upload/headerImage/c6bbe014bc469673f1a7c5ca5fbcdf38.png');
INSERT INTO `Comment` (`comment_id`, `article_id`, `time`, `uuid`, `user_name`, `content`, `reply_id`, `reply_name`, `head_img`) VALUES (31, 36, '2022-05-10 17:00:33', 8, 'K-on', '回复第一个评论', 29, 'K-on', '/upload/headerImage/c6bbe014bc469673f1a7c5ca5fbcdf38.png');
INSERT INTO `Comment` (`comment_id`, `article_id`, `time`, `uuid`, `user_name`, `content`, `reply_id`, `reply_name`, `head_img`) VALUES (32, 36, '2022-05-10 17:00:46', 8, 'K-on', '回复这个回复评论', 31, 'K-on', '/upload/headerImage/c6bbe014bc469673f1a7c5ca5fbcdf38.png');
INSERT INTO `Comment` (`comment_id`, `article_id`, `time`, `uuid`, `user_name`, `content`, `reply_id`, `reply_name`, `head_img`) VALUES (33, 42, '2022-05-13 16:26:55', 8, 'K-on', '发表一条评论', 0, '', '/upload/headerImage/c6bbe014bc469673f1a7c5ca5fbcdf38.png');
INSERT INTO `Comment` (`comment_id`, `article_id`, `time`, `uuid`, `user_name`, `content`, `reply_id`, `reply_name`, `head_img`) VALUES (34, 42, '2022-05-13 16:27:02', 8, 'K-on', '回复这条评论', 33, 'K-on', '/upload/headerImage/c6bbe014bc469673f1a7c5ca5fbcdf38.png');
COMMIT;

-- ----------------------------
-- Table structure for Daily_Question
-- ----------------------------
DROP TABLE IF EXISTS `Daily_Question`;
CREATE TABLE `Daily_Question` (
  `date` timestamp NOT NULL,
  `question_id` int DEFAULT NULL,
  PRIMARY KEY (`date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of Daily_Question
-- ----------------------------
BEGIN;
INSERT INTO `Daily_Question` (`date`, `question_id`) VALUES ('2022-05-06 17:39:31', 1);
INSERT INTO `Daily_Question` (`date`, `question_id`) VALUES ('2022-05-07 17:39:31', 9);
INSERT INTO `Daily_Question` (`date`, `question_id`) VALUES ('2022-05-08 17:39:31', 7);
INSERT INTO `Daily_Question` (`date`, `question_id`) VALUES ('2022-05-09 17:39:31', 2);
INSERT INTO `Daily_Question` (`date`, `question_id`) VALUES ('2022-05-10 17:39:31', 3);
INSERT INTO `Daily_Question` (`date`, `question_id`) VALUES ('2022-05-11 16:28:59', 8);
INSERT INTO `Daily_Question` (`date`, `question_id`) VALUES ('2022-05-12 16:00:00', 4);
INSERT INTO `Daily_Question` (`date`, `question_id`) VALUES ('2022-05-13 16:02:37', 5);
COMMIT;

-- ----------------------------
-- Table structure for Front_Question
-- ----------------------------
DROP TABLE IF EXISTS `Front_Question`;
CREATE TABLE `Front_Question` (
  `fquestion_id` int NOT NULL AUTO_INCREMENT,
  `question_name` varchar(255) DEFAULT NULL,
  `question_content` longtext,
  PRIMARY KEY (`fquestion_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of Front_Question
-- ----------------------------
BEGIN;
INSERT INTO `Front_Question` (`fquestion_id`, `question_name`, `question_content`) VALUES (1, '盒子水平垂直居中', ' 能通过多种方法使一个子元素在父元素里垂直居中，可以使用采用的方案比如Flex、Grid、margin、position、transform等属性');
INSERT INTO `Front_Question` (`fquestion_id`, `question_name`, `question_content`) VALUES (2, '绘制图形', ' 绘制普通三角形，等腰三角形，直角三角形，圆形，平行四边形等图形');
INSERT INTO `Front_Question` (`fquestion_id`, `question_name`, `question_content`) VALUES (3, '浮动和清除浮动', ' 请将类为\"left\"的div元素和类为\"right\"的div元素在同一行上向左浮动，且清除类为\"wrap\"的父级div元素内部的浮动。');
INSERT INTO `Front_Question` (`fquestion_id`, `question_name`, `question_content`) VALUES (4, '事件委托', ' 事件委托，就是把一个元素的响应事件委托到另外一个元素。\\n 一般来讲，会把一个或者一组元素的事件委托到它的父层或者更外层元素上，真正绑定事件的是外层元素，当事件响应到需要绑定的元素上时，会通过事件冒泡机制从而触发它的外层元素的绑定事件上，然后在外层元素上去执行函数。');
INSERT INTO `Front_Question` (`fquestion_id`, `question_name`, `question_content`) VALUES (5, '双列布局-浮动', ' 自适应的双列布局利用浮动、外边和触发父级BFC即可实现，这种方法主要是因为BFC的高度计算会包含其内的浮动元素的高度，父盒子会被撑开。\\n 现在给类名为\"container\"的父盒子添加\"overflow: hidden\"属性，使该父盒子成为BFC。继续给类名为\"left\"的盒子设置\"float: left\"和\"width: 100px\"属性，使该盒子成为浮动元素并且需要一个固定的宽度。最后再给类名为\"right\"的盒子设置左外边距\"margin-left: 100px\"属性，该属性值需要和左浮动的盒子宽度一致。此时父盒子的高度会根据左边浮动元素、右边内容区中高度较高的一方进行计算，并且右边内容区的宽度自适应，最好是根据需要，配合最大或最小宽度进行设置。\\n 完成以上所讲的步骤即可通过测试，进入下一节的学习吧。');
INSERT INTO `Front_Question` (`fquestion_id`, `question_name`, `question_content`) VALUES (6, '双列布局-绝对定位', ' 通过绝对定位实现的双列布局看起来会比较僵硬，因为父盒子首先需要设置定位属性并且父盒子的高度无法被子盒子撑开，如果子盒子的高度是自适应的，那么父盒子的高度也就无法确定从而设置了，但优点是设置属性比浮动来得更直观。\\n 现在给类名为\"container\"的父盒子添加\"position: relative\"属性，为了保证子盒子绝对定位时不会根据html元素定位。继续给类名为\"left\"的盒子添加\"position: absolute\"、\"left: 0\"和\"width: 100px\"三条属性，使该盒子定位到父盒子的最左边并且赋予宽度，但高度是根据内容自适应的。最后给类名为\"right\"的盒子添加\"position: absolute\"、\"left: 100px\"和\"right: 0px\"，因为该盒子没有给定宽度，设置\"left\"和\"right\"定位属性会使内容区保留在这个范围内，同样实现了自适应。\\n 完成以上所讲的步骤即可通过测试，进入下一节的学习吧。');
INSERT INTO `Front_Question` (`fquestion_id`, `question_name`, `question_content`) VALUES (7, '双列布局-Flex', ' 通过Flexbox可以快速实现双列布局，主要通过\"flex: 1\"这条弹性项属性给内容区申请到父盒子的所有剩余空间，并且可以给弹性项设置\"position\"属性调整弹性项内部的子盒子细节。\\n 现在给类名为\"container\"的父盒子添加\"display: flex\"属性，使该盒子成为弹性盒容器。继续给类名为\"left\"的弹性项盒子添加\"width: 100px\"属性。最后给类名为\"right\"的弹性项盒子添加\"flex: 1\"属性。由于弹性项盒子默认占满弹性容器盒子的所有高度，所以两个弹性项盒子的高度也是自适应。右边的内容区宽度会占满弹性容器盒子的剩余空间，所以宽度也是自适应的。\\n 完成以上所讲的步骤即可通过测试，进入下一节的学习吧。');
INSERT INTO `Front_Question` (`fquestion_id`, `question_name`, `question_content`) VALUES (8, '双列布局-Grid', ' 使用Grid网格布局实现双列布局的要点在于列数为2，且首列的宽度根据需要自行设置，第二列使用片段\"fr\"属性进行自适应即可。行数不需要指定，每行会根据内容高度进行自适应缩放。\\n 现在给类名为\"container\"的盒子添加\"display: grid\"属性，使该盒子成为容器。再给该容器添加\"grid-template-columns: 100px 1fr\"属性，表示第一列宽度始终为100px，第二列的宽度为剩余的所有空间。此时可以看到整个容器的高度因为首列的内容被撑开了，并且右边内容区实现了自适应。');
INSERT INTO `Front_Question` (`fquestion_id`, `question_name`, `question_content`) VALUES (9, '三列布局-浮动', ' 使用浮动实现三列布局的注意点是浮动元素需要写在内容元素之前，否则布局是混乱的。这种方式实现三列布局是优点是简单、兼容性好，但缺点是需要清除浮动，否则父盒子的高度无法撑开，可能会导致其他页面元素的布局混乱。\\n 首先给类名为\"container\"的盒子添加\"overflow: hidden\"属性，该属性可以使盒子成为BFC，处理浮动元素父盒子高度塌陷的问题。再给类名为\"left\"的盒子添加\"float: left\"和\"width: 100px\"两条属性，首先往左浮动，宽度这里设置100px。继续给类名为\"right\"的盒子添加\"float: right\"和\"width: 100px\"两条属性，往右浮动。最后给类名为\"center\"的盒子设置外边距\"margin: 0px 100px\"，该属性上下外边距为0px，左右外边距为两边浮动元素的宽度100px，这样保证了中间的内容区域不会被两边的浮动元素覆盖住。注意，HTML文档中两个浮动元素的顺序在内容元素之前。\\n 完成以上所讲的步骤即可通过测试，进入下一节的学习吧。');
INSERT INTO `Front_Question` (`fquestion_id`, `question_name`, `question_content`) VALUES (10, '三列布局-绝对定位', ' 使用绝对定位实现三列布局，实际上是和之前使用绝对定位实现双列布局同一个原理。主要思路是，两边通过绝对定位定位到父盒子的左、右边框上，再根据实际的需要设置两边盒子的宽度，高度是根据内容自适应的。中间内容区通过定位属性左、右自适应宽度。\\n 现在给类名为\"container\"的盒子添加\"position: relative\"，该属性使子元素可以相对该盒子做定位。继续给类名为\"left\"的盒子添加\"position: absolute\"、\"left: 0px\"和\"width: 100px\"三条属性。继续给类名为\"right\"的盒子添加\"position: absolute\"、\"right: 0px\"和\"width: 100px\"三条属性。最后给类名为\"center\"的盒子添加\"position: absolute\"、\"left: 100px\"和\"right: 100px\"三条属性，表示自适应区域为距离左边100px至距离右边100px。此时可以看到三个盒子的高度不同，根据内容高度撑开，实际中可以按需设置高度值。\\n 完成以上所讲的步骤即可通过测试，进入下一节的学习吧。');
INSERT INTO `Front_Question` (`fquestion_id`, `question_name`, `question_content`) VALUES (11, '三列布局-Flex', ' 相比于浮动和定位，使用Flexbox布局实现三列布局要更好，因为弹性容器的高度会根据最高的弹性项进行修正，不会出现明显的台阶式效果。Flexbox实现三列布局的特点为简单、使用、强大，核心思路为设置中间内容盒子的\"flex: 1\"属性，让中间内容区的宽度自适应，独自占据弹性容器的全部剩余空间。\\n 现在给类名为\"container\"的盒子添加\"display: flex\"属性，使该盒子成为弹性容器。再给类名为\"left\"和\"right\"的盒子添加\"width: 100px\"属性，最后给类名为\"center\"的盒子添加\"flex: 1\"属性，使该盒子占据容器盒子的全部剩余空间。此时会发现即使三个子盒子的内容高度不同，但容器和子会根据最高的子元素进行修正，并且没有出现浮动和定位中的台阶式效果。\\n 完成以上所讲的步骤即可通过测试，进入下一节的学习吧。');
INSERT INTO `Front_Question` (`fquestion_id`, `question_name`, `question_content`) VALUES (12, '三列布局-Grid', ' 使用grid网格布局实现三列布局，和之前所讲的gird实现双列布局是同样的思想，只是把列数变为了3，高度依然不设置，通过容器项的内容高度自适应撑开整体高度。\\n 现在给类名为\"container\"的盒子添加\"display: grid\"属性，使该盒子成为网格布局容器。再给该容器添加\"grid-template-columns: 100px auto 100px\"属性，表示该容器一共有3列，且宽度分别为100px、自适应、100px。不需要设置行属性，当有多个元素时容器会自适应的往下顺次排列。此时观察容器的高度，是根据容器项中高度最高的那一项决定的，也不会产生台阶式效果。\\n 进入下一节的学习吧。');
INSERT INTO `Front_Question` (`fquestion_id`, `question_name`, `question_content`) VALUES (13, '三列布局-圣杯布局', ' 不像Flexbox或Grid布局可以控制元素显示的次序，圣杯布局是通过浮动元素和外边距属性实现三列布局，但最重要的一点是，在文档中需要将优先渲染的内容写在最前方，但显示时看起来却好像是按照显示次序书写的一样。\\n 首先给类名为\"container\"的盒子添加\"overflow: hidden\"和\"padding: 0px 100px\"属性，以为了防止容器盒子高度塌陷和给之后的左、右浮动元素预留位置。现在继续给类名为\"left\"的盒子添加以下属性：\\n1. \"float: left\"，浮动，保证之后的\"margin-left\"属性可以将自身拉到上一行\\n2. \"width: 100px\"，固定宽度\\n3. \"margin-left: -100%\"，该属性可以将元素向左移动属性值的单位，100%相对于父容器计算\\n4. \"position: relative\"，相对定位，需要将自身再向左移动自身的宽度，进入容器的\"padding-left\"区域\\n5. \"left: -100px\"，自身的宽度，刚好进入容器的\"padding-left\"区域\\n 到这里圣杯布局中最核心的步骤和思想就完了。之后继续给类名为\"right\"的盒子添加\"float: left\"、\"width: 100px\"、\"margin-left: -100px\"、\"position: relative\"和\"left 100px\"属性，该右盒子的思想和左盒子一样，即，将右盒子向上拉一行并且再向右移动自身宽度进入\"padding-right\"区。最后再给类名为\"center\"的盒子添加\"float: left\"和\"width: 100%\"即可。此时中间内容区的宽度是自适应的，并且因为有内边距属性所以内容不会被两边的浮动盒子遮挡住。\\n 圣杯布局需要注意的是，当中间内容区域的宽度小于左、右盒子的宽度时，整个布局就会混乱，所以为了避免这种情况，再给容器盒子添加\"min-width: 100px\"属性，保证圣杯布局正确、有效。\\n 完成以上所讲的步骤即可通过测试，进入下一节的学习吧。');
INSERT INTO `Front_Question` (`fquestion_id`, `question_name`, `question_content`) VALUES (15, '三列布局-双飞翼布局', ' 双飞翼布局是在圣杯布局上做了优化，解决了圣杯布局中布局发生错乱的问题。核心思路是在圣杯布局的基础上，再在内容区添加一层新的盒子，该盒子通过外边距将内容与两边的浮动元素分隔开，实际上中心盒子是没有\"padding\"属性的。\\n 首先给类名为\"container\"的盒子添加\"overflow: hidden\"属性，解决子浮动元素导致的高度塌陷问题。然后继续给类名为\"left\"的盒子加\"float:left\"、\"margin-left: -100%\"和\"width: 100px\"。再给类名为\"center\"的盒子添加\"float: left\"和\"width: 100%\"属性，该盒子并没有像圣杯布局时添加\"padding\"属性那样。继续给类名为\"right\"的盒子添加\"float: left\"、\"width: 100px\"和\"margin-left: -100px\"。最后给类名为\"main\"的盒子添加\"margin: 0px 100px\"，该属性为双飞翼布局的核心点，使用外边距将内容封锁在两边浮动元素的中间。');
COMMIT;

-- ----------------------------
-- Table structure for Question
-- ----------------------------
DROP TABLE IF EXISTS `Question`;
CREATE TABLE `Question` (
  `question_id` int NOT NULL AUTO_INCREMENT,
  `question_index` int DEFAULT NULL,
  `question_name` varchar(255) DEFAULT NULL,
  `level` int DEFAULT NULL,
  `content` longtext,
  PRIMARY KEY (`question_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of Question
-- ----------------------------
BEGIN;
INSERT INTO `Question` (`question_id`, `question_index`, `question_name`, `level`, `content`) VALUES (1, 1, '两数之和', 1, '输入两个正整数，返回两数之和。\n\n进阶：你能尝试不使用“+”或Math方法吗？\n\n###### 样例1:\n\n```\n输入：1 2\n输出：3\n```\n\n###### 样例2:\n\n```\n输入：10 20\n输出：30\n```\n\n\n\n###### 时间限制：1000ms\n\n###### 空间限制：256MB');
INSERT INTO `Question` (`question_id`, `question_index`, `question_name`, `level`, `content`) VALUES (2, 2, '两数之和-改', 1, '输入两个正整数，返回两数之和，但不能使用“+”或Math方法\n\n###### 样例1:\n\n```\n输入：1 2\n输出：3\n```\n\n###### 样例2:\n\n```\n输入：10 20\n输出：30\n```\n\n\n\n###### 时间限制：1000ms\n\n###### 空间限制：256MB');
INSERT INTO `Question` (`question_id`, `question_index`, `question_name`, `level`, `content`) VALUES (3, 3, '括号匹配', 1, '给定一个只包括 \'(\'，\')\'，\'{\'，\'}\'，\'[\'，\']\' 的字符串 s ，判断字符串是否有效。\n\n有效字符串需满足：\n\n- 左括号必须用相同类型的右括号闭合。\n- 左括号必须以正确的顺序闭合。\n\n###### 示例 1：\n\n```\n输入：s = \"()\"\n输出：true\n```\n\n\n\n###### 示例 2：\n\n```\n输入：s = \"()[]{}\"\n输出：true\n```\n\n\n\n###### 示例 3：\n\n```\n输入：s = \"(]\"\n输出：false\n```\n\n\n\n###### 示例 4：\n\n```\n输入：s = \"([)]\"\n输出：false\n```\n\n\n\n###### 示例 5：\n\n```\n输入：s = \"{[]}\"\n输出：true\n```\n\n\n\n###### 时间限制：1000ms\n\n###### 空间限制：256MB');
INSERT INTO `Question` (`question_id`, `question_index`, `question_name`, `level`, `content`) VALUES (4, 4, '两数相除', 2, '给定两个整数，被除数 dividend 和除数 divisor。将两数相除，要求不使用乘法、除法和 mod 运算符。\n\n返回被除数 dividend 除以除数 divisor 得到的商。\n\n整数除法的结果应当截去（truncate）其小数部分，例如：truncate(8.345) = 8 以及 truncate(-2.7335) = -2\n\n\n\n###### 示例 1:\n\n```\n输入: 10 3\n输出: 3\n解释: 10/3 = truncate(3.33333..) = truncate(3) = 3\n```\n\n###### 示例 2:\n\n```\n输入: 7 3\n输出: -2\n解释: 7/-3 = truncate(-2.33333..) = -2\n```\n\n\n提示：\n\n- 被除数和除数均为 32 位有符号整数。\n- 除数不为 0。\n- 假设我们的环境只能存储 32 位有符号整数，其数值范围是 [−231,  231 − 1]。本题中，如果除法结果溢出，则返回 231 − 1。\n\n###### 时间限制：1000ms\n\n###### 空间限制：256MB');
INSERT INTO `Question` (`question_id`, `question_index`, `question_name`, `level`, `content`) VALUES (5, 5, '接雨水', 3, '给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。\n\n \n\n示例 1：\n\n![](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2018/10/22/rainwatertrap.png)\n\n```\n输入：[0,1,0,2,1,0,1,3,2,1,2,1]\n输出：6\n解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。 \n```\n\n示例 2：\n\n```\n输入：[4,2,0,3,2,5]\n输出：9\n```\n\n\n提示：\n\n- n == height.length\n- 1 <= n <= 2 * 104\n- 0 <= height[i] <= 105\n\n###### 时间限制：1000ms\n\n###### 空间限制：256MB');
INSERT INTO `Question` (`question_id`, `question_index`, `question_name`, `level`, `content`) VALUES (6, 6, '全排列', 2, '给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。\n\n \n\n示例 1：\n\n```\n输入：[1,2,3]\n输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]\n```\n\n示例 2：\n\n```\n输入：[0,1]\n输出：[[0,1],[1,0]]\n```\n\n示例 3：\n\n```\n输入：[1]\n输出：[[1]]\n```\n\n\n提示：\n\n- 1 <= nums.length <= 6\n- -10 <= nums[i] <= 10\n- nums 中的所有整数 互不相同\n\n###### 时间限制：1000ms\n\n###### 空间限制：256MB');
INSERT INTO `Question` (`question_id`, `question_index`, `question_name`, `level`, `content`) VALUES (7, 7, '买卖股票', 1, '输入一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。\n\n你只能选择 **某一天** 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润。\n\n返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0 。\n\n \n\n示例 1：\n\n```\n输入：[7,1,5,3,6,4]\n输出：5\n解释：在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。\n     注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。\n```\n\n示例 2：\n\n```\n输入：[7,6,4,3,1]\n输出：0\n解释：在这种情况下, 没有交易完成, 所以最大利润为 0。\n```\n\n\n提示：\n\n- 1 <= prices.length <= 105\n- 0 <= prices[i] <= 104\n\n###### 时间限制：1000ms\n\n###### 空间限制：256MB');
INSERT INTO `Question` (`question_id`, `question_index`, `question_name`, `level`, `content`) VALUES (8, 8, '买卖股票-改', 2, '输入一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。\n\n你只能选择 **某一天** 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润。\n\n返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0 。\n\n \n\n示例 1：\n\n```\n输入：[7,1,5,3,6,4]\n输出：5\n解释：在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。\n     注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。\n```\n\n示例 2：\n\n```\n输入：[7,6,4,3,1]\n输出：0\n解释：在这种情况下, 没有交易完成, 所以最大利润为 0。\n```\n\n\n提示：\n\n- 1 <= prices.length <= 105\n- 0 <= prices[i] <= 104\n\n###### 时间限制：1000ms\n\n###### 空间限制：256MB');
INSERT INTO `Question` (`question_id`, `question_index`, `question_name`, `level`, `content`) VALUES (9, 9, '买卖股票-进阶', 3, '给定一个数组，它的第 i 个元素是一支给定的股票在第 i 天的价格。\n\n设计一个算法来计算你所能获取的最大利润。你最多可以完成 两笔 交易。\n\n注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。\n\n \n\n示例 1:\n\n```\n输入：prices = [3,3,5,0,0,3,1,4]\n输出：6\n解释：在第 4 天（股票价格 = 0）的时候买入，在第 6 天（股票价格 = 3）的时候卖出，这笔交易所能获得利润 = 3-0 = 3 。\n     随后，在第 7 天（股票价格 = 1）的时候买入，在第 8 天 （股票价格 = 4）的时候卖出，这笔交易所能获得利润 = 4-1 = 3 。\n```\n\n示例 2：\n\n```\n输入：[1,2,3,4,5]\n输出：4\n解释：在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。   \n     注意你不能在第 1 天和第 2 天接连购买股票，之后再将它们卖出。   \n     因为这样属于同时参与了多笔交易，你必须在再次购买前出售掉之前的股票。\n```\n\n示例 3：\n\n```\n输入：[7,6,4,3,1] \n输出：0 \n解释：在这个情况下, 没有交易完成, 所以最大利润为 0。\n```\n\n示例 4：\n\n```\n输入：[1]\n输出：0\n```\n\n\n提示：\n\n- 1 <= prices.length <= 105\n- 0 <= prices[i] <= 105\n\n###### 时间限制：1000ms\n\n###### 空间限制：256MB');
INSERT INTO `Question` (`question_id`, `question_index`, `question_name`, `level`, `content`) VALUES (10, 10, '买卖股票-进阶2', 3, '给定一个整数数组 prices ，它的第 i 个元素 prices[i] 是一支给定的股票在第 i 天的价格。\n\n设计一个算法来计算你所能获取的最大利润。你最多可以完成 k 笔交易。\n\n注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。\n\n \n\n示例 1：\n\n```\n输入：2\n		 [2,4,1]\n输出：2\n解释：在第 1 天 (股票价格 = 2) 的时候买入，在第 2 天 (股票价格 = 4) 的时候卖出，这笔交易所能获得利润 = 4-2 = 2 。\n```\n\n示例 2：\n\n```\n输入：2\n		 [3,2,6,5,0,3]\n输出：7\n解释：在第 2 天 (股票价格 = 2) 的时候买入，在第 3 天 (股票价格 = 6) 的时候卖出, 这笔交易所能获得利润 = 6-2 = 4 。\n     随后，在第 5 天 (股票价格 = 0) 的时候买入，在第 6 天 (股票价格 = 3) 的时候卖出, 这笔交易所能获得利润 = 3-0 = 3 。\n```\n\n\n提示：\n\n- 0 <= k <= 100\n- 0 <= prices.length <= 1000\n- 0 <= prices[i] <= 1000\n\n###### 时间限制：1000ms\n\n###### 空间限制：256MB');
COMMIT;

-- ----------------------------
-- Table structure for Tags
-- ----------------------------
DROP TABLE IF EXISTS `Tags`;
CREATE TABLE `Tags` (
  `tags_id` int NOT NULL AUTO_INCREMENT,
  `tags_name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`tags_id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of Tags
-- ----------------------------
BEGIN;
INSERT INTO `Tags` (`tags_id`, `tags_name`) VALUES (8, '前端');
INSERT INTO `Tags` (`tags_id`, `tags_name`) VALUES (9, 'JS');
INSERT INTO `Tags` (`tags_id`, `tags_name`) VALUES (10, '后端');
INSERT INTO `Tags` (`tags_id`, `tags_name`) VALUES (11, '事件委托');
INSERT INTO `Tags` (`tags_id`, `tags_name`) VALUES (13, 'React');
INSERT INTO `Tags` (`tags_id`, `tags_name`) VALUES (14, '事件绑定');
INSERT INTO `Tags` (`tags_id`, `tags_name`) VALUES (15, 'CSS');
INSERT INTO `Tags` (`tags_id`, `tags_name`) VALUES (16, '前端开发');
INSERT INTO `Tags` (`tags_id`, `tags_name`) VALUES (17, '面试常问');
INSERT INTO `Tags` (`tags_id`, `tags_name`) VALUES (18, 'Typescript');
INSERT INTO `Tags` (`tags_id`, `tags_name`) VALUES (19, '测试');
INSERT INTO `Tags` (`tags_id`, `tags_name`) VALUES (20, '编程语言');
INSERT INTO `Tags` (`tags_id`, `tags_name`) VALUES (21, '两数之和题解');
INSERT INTO `Tags` (`tags_id`, `tags_name`) VALUES (22, '算法');
INSERT INTO `Tags` (`tags_id`, `tags_name`) VALUES (23, '题解');
INSERT INTO `Tags` (`tags_id`, `tags_name`) VALUES (24, '服务器');
INSERT INTO `Tags` (`tags_id`, `tags_name`) VALUES (25, 'Token');
INSERT INTO `Tags` (`tags_id`, `tags_name`) VALUES (26, 'HTML');
INSERT INTO `Tags` (`tags_id`, `tags_name`) VALUES (27, '括号匹配');
COMMIT;

-- ----------------------------
-- Table structure for Tags_Article
-- ----------------------------
DROP TABLE IF EXISTS `Tags_Article`;
CREATE TABLE `Tags_Article` (
  `tags_id` int NOT NULL,
  `article_id` int NOT NULL,
  PRIMARY KEY (`tags_id`,`article_id`) USING BTREE,
  KEY `article_id` (`article_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of Tags_Article
-- ----------------------------
BEGIN;
INSERT INTO `Tags_Article` (`tags_id`, `article_id`) VALUES (8, 31);
INSERT INTO `Tags_Article` (`tags_id`, `article_id`) VALUES (9, 31);
INSERT INTO `Tags_Article` (`tags_id`, `article_id`) VALUES (11, 31);
INSERT INTO `Tags_Article` (`tags_id`, `article_id`) VALUES (8, 32);
INSERT INTO `Tags_Article` (`tags_id`, `article_id`) VALUES (13, 32);
INSERT INTO `Tags_Article` (`tags_id`, `article_id`) VALUES (14, 32);
INSERT INTO `Tags_Article` (`tags_id`, `article_id`) VALUES (15, 35);
INSERT INTO `Tags_Article` (`tags_id`, `article_id`) VALUES (17, 35);
INSERT INTO `Tags_Article` (`tags_id`, `article_id`) VALUES (19, 36);
INSERT INTO `Tags_Article` (`tags_id`, `article_id`) VALUES (20, 37);
INSERT INTO `Tags_Article` (`tags_id`, `article_id`) VALUES (21, 38);
INSERT INTO `Tags_Article` (`tags_id`, `article_id`) VALUES (22, 38);
INSERT INTO `Tags_Article` (`tags_id`, `article_id`) VALUES (23, 39);
INSERT INTO `Tags_Article` (`tags_id`, `article_id`) VALUES (24, 41);
INSERT INTO `Tags_Article` (`tags_id`, `article_id`) VALUES (25, 41);
INSERT INTO `Tags_Article` (`tags_id`, `article_id`) VALUES (26, 42);
INSERT INTO `Tags_Article` (`tags_id`, `article_id`) VALUES (27, 43);
COMMIT;

-- ----------------------------
-- Table structure for User
-- ----------------------------
DROP TABLE IF EXISTS `User`;
CREATE TABLE `User` (
  `uuid` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(20) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `age` int DEFAULT '18',
  `sex` int DEFAULT '1',
  `city` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '浙江/杭州',
  `introduction` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '这个人很懒，什么都没写',
  `head_img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '/default/unLoginImg.png',
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of User
-- ----------------------------
BEGIN;
INSERT INTO `User` (`uuid`, `user_name`, `password`, `email`, `age`, `sex`, `city`, `introduction`, `head_img`) VALUES (1, '落雪如衣', '6031332lzy', '834159744@qq.com', 18, 1, '浙江/杭州', '这个人很懒，什么都没写', 'HeadImg/unLoginImg.png');
INSERT INTO `User` (`uuid`, `user_name`, `password`, `email`, `age`, `sex`, `city`, `introduction`, `head_img`) VALUES (6, 'TojoNozomi', '1058013df6c7b51200ae5b27e6fec4b5', '2930096618@qq.com', 18, 1, '上海/宝山', '东条希', '/upload/headerImage/f8648190c4fd95c48c278fdd30c3939b.png');
INSERT INTO `User` (`uuid`, `user_name`, `password`, `email`, `age`, `sex`, `city`, `introduction`, `head_img`) VALUES (8, 'K-on', 'aa1be3665ad565a808e4f2f5cb63b905', '13508085664@163.com', 18, 1, '浙江/杭州', '这个人很懒，什么都没写下', '/upload/headerImage/c6bbe014bc469673f1a7c5ca5fbcdf38.png');
INSERT INTO `User` (`uuid`, `user_name`, `password`, `email`, `age`, `sex`, `city`, `introduction`, `head_img`) VALUES (9, 'look', '3ec5b787b56586f771efecef91df34fb', '1336354338@qq.com', 18, 1, '浙江/杭州', '这个人很懒，什么都没写', '/default/unLoginImg.png');
COMMIT;

-- ----------------------------
-- Table structure for UserArticle_Likes
-- ----------------------------
DROP TABLE IF EXISTS `UserArticle_Likes`;
CREATE TABLE `UserArticle_Likes` (
  `article_id` int NOT NULL,
  `uuid` int NOT NULL,
  PRIMARY KEY (`uuid`,`article_id`),
  KEY `article_id` (`article_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of UserArticle_Likes
-- ----------------------------
BEGIN;
INSERT INTO `UserArticle_Likes` (`article_id`, `uuid`) VALUES (31, 6);
INSERT INTO `UserArticle_Likes` (`article_id`, `uuid`) VALUES (31, 8);
INSERT INTO `UserArticle_Likes` (`article_id`, `uuid`) VALUES (32, 6);
INSERT INTO `UserArticle_Likes` (`article_id`, `uuid`) VALUES (35, 6);
INSERT INTO `UserArticle_Likes` (`article_id`, `uuid`) VALUES (36, 8);
INSERT INTO `UserArticle_Likes` (`article_id`, `uuid`) VALUES (37, 8);
COMMIT;

-- ----------------------------
-- Table structure for User_Question
-- ----------------------------
DROP TABLE IF EXISTS `User_Question`;
CREATE TABLE `User_Question` (
  `uuid` int NOT NULL,
  `question_id` int NOT NULL,
  `state` int DEFAULT NULL,
  `date` timestamp NOT NULL,
  `time` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `language` varchar(20) DEFAULT NULL,
  `submission_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`submission_id`,`date`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of User_Question
-- ----------------------------
BEGIN;
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 1, 1, '2022-03-21 18:39:14', '123', 'JavaScript', '1112');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 1, 1, '2022-03-29 18:39:14', '142', 'C++', '1113');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 2, 1, '2022-03-30 18:40:14', '70', 'JavaScript', '1115');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 2, 1, '2022-03-30 18:41:14', '270', 'JavaScript', '1116');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 2, 1, '2022-03-30 18:39:14', '270', 'C', '114');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 2, 1, '2022-04-30 18:39:14', '270', 'C', '123143');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 2, 1, '2022-03-15 18:41:14', '270', 'JavaScript', '123q1we');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 2, 1, '2022-03-15 18:41:14', '270', 'JavaScript', '123qwe');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 4, 1, '2022-03-11 18:39:14', '270', 'JavaScript', '13123213');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 2, 1, '2022-05-11 18:39:14', '279', 'Java', '1ff5403835b955a70c3ed472d216433c');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 4, 0, '2022-03-12 18:39:14', '0', 'JavaScript', '2222');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 4, 1, '2022-04-09 18:39:14', '270', 'JavaScript', '22221');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 4, 0, '2022-04-12 18:39:14', '0', 'JavaScript', '22223');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 4, 1, '2022-04-12 18:40:14', '270', 'Java', '22224');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 4, 1, '2022-04-12 18:39:14', '274', 'C', '22225');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 5, 0, '2022-04-20 18:39:14', '0', 'JavaScript', '22226');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 4, 0, '2022-04-21 18:29:14', '0', 'JavaScript', '22228');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 2, 1, '2022-04-21 18:39:14', '100', 'Python3', '2227');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 4, 0, '2022-04-21 18:30:14', '0', 'JavaScript', '2229');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 1, 1, '2022-05-10 14:29:37', '323', 'Java', '247fa24891ae17e43dab21a0bcc53297');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 4, 1, '2022-04-21 18:31:14', '90', 'JavaScript', '3000');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 1, 1, '2022-04-21 18:39:14', '123', 'JavaScript', '3331');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 1, 1, '2022-04-29 18:39:14', '142', 'C++', '3332');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 4, 1, '2022-03-12 18:40:14', '270', 'Java', '3333');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (6, 6, 0, '2022-05-12 16:09:22', '56', 'JavaScript', '3ce8d25cb6e588df46e118b837a9a2ca');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 2, 0, '2022-05-10 16:40:37', '0', 'JavaScript', '3d485013978bf08a30edc5d3b7ba3c6f');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 4, 1, '2022-03-12 18:39:14', '274', 'C', '4444');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 2, 1, '2022-04-30 18:40:14', '70', 'JavaScript', '444444');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 2, 0, '2022-05-10 16:40:35', '0', 'JavaScript', '47f2be54b8169dbe36df71845819e1c6');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 2, 1, '2022-04-30 18:41:14', '270', 'JavaScript', '55555555');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 1, 1, '2022-05-13 16:21:22', '77', 'JavaScript', '5556df0a1dc83d128645ee2e27893ed1');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 3, 1, '2022-05-11 17:41:05', '75', 'JavaScript', '55a92b9a7b10b2508d8381c093083eb4');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 9, 0, '2022-05-11 18:32:44', '79', 'JavaScript', '573dcaa2e089b9fc98e7c1d326d4f004');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 1, 0, '2022-05-13 16:08:50', '66', 'JavaScript', '5ae53f07bb50f3ed9decb87c3d8dc763');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 9, 0, '2022-05-11 18:33:24', '76', 'JavaScript', '60902fd51bde11bbee7a06f0f6f9e1d5');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 5, 0, '2022-03-20 18:39:14', '0', 'JavaScript', '65555');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 2, 1, '2022-03-21 18:39:14', '100', 'Python3', '66666');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (6, 2, 0, '2022-05-11 18:42:30', '88', 'JavaScript', '6997ae62ba0efaf476c7f04bd695d1c3');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 9, 0, '2022-05-11 18:34:07', '75', 'JavaScript', '6b3eaf664376f777e5310ab15bc84898');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 4, 0, '2022-05-11 18:28:34', '0', 'Java', '6d04f4aa3d43c280507109dd2f7193bb');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 4, 0, '2022-03-21 18:29:14', '0', 'JavaScript', '77777');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 4, 0, '2022-05-12 18:56:31', '49', 'JavaScript', '7e21a4b2b323aaddc3c05f66c6849860');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 4, 0, '2022-03-21 18:30:14', '0', 'JavaScript', '88888');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 9, 0, '2022-05-11 18:32:56', '0', 'C', '954a36c9599680891d886e7ac873964e');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 4, 1, '2022-03-21 18:31:14', '90', 'JavaScript', '99999');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 1, 0, '2022-05-10 14:26:59', '0', 'JavaScript', '9b8fb3793e6aaa24b701c4abf0525987');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 3, 0, '2022-05-11 17:40:47', '0', 'JavaScript', '9d30608c609387776eb0930b56662ba2');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 3, 1, '2022-05-13 16:46:21', '91', 'JavaScript', 'a0a0cf3c2b13da272c11653fe99726c5');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (6, 7, 1, '2022-05-11 18:42:50', '73', 'JavaScript', 'a20e9c4659afecbebc226165f2e11e27');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 9, 1, '2022-05-11 18:38:27', '65', 'JavaScript', 'a26af216efdda37c206caae2890724f5');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 4, 0, '2022-05-11 18:29:38', '0', 'Java', 'ad278b833c11c627ce95404dfa7dcd7c');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 3, 0, '2022-05-11 17:34:20', '0', 'JavaScript', 'ad5f754f69d5d2d447d580a6dd9356ef');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 1, 1, '2022-05-13 16:21:50', '313', 'Java', 'b4eddeb88525d6ceda9f6c06d897fa2a');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 8, 0, '2022-05-11 16:50:23', '0', 'JavaScript', 'b6e56ea52bd627112acd3df57057672b');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 1, 1, '2022-04-24 18:39:14', '142', 'C++', 'bbbb7b');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 1, 1, '2022-04-24 18:39:14', '142', 'C++', 'bbbbb');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 9, 0, '2022-05-11 18:32:50', '0', 'Python3', 'bcc7d8ef46dc32da0793da298dd65515');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 2, 1, '2022-05-10 16:41:15', '340', 'Java', 'c314f5c489ce1fb577e06b82853a3772');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 9, 0, '2022-05-11 18:33:01', '0', 'C++', 'c696014e8fd9dfb4255f090bb220030c');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 1, 0, '2022-05-13 16:10:51', '0', 'Java', 'cafd3b3897ec965af34cfa95ff83cd67');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 4, 1, '2022-04-24 18:31:14', '90', 'JavaScript', 'cccc5c');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 4, 1, '2022-04-24 18:31:14', '90', 'JavaScript', 'ccccc');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 2, 0, '2022-05-11 18:39:08', '0', 'Java', 'd337e916bc9699eb5e6a39f74cba22b7');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 1, 1, '2022-05-11 17:27:36', '54', 'JavaScript', 'dd6bf153265c6125d805807717009b5f');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 1, 1, '2022-05-11 01:16:25', '329', 'Java', 'de3694012bb0abfffd83039b296bec3d');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (6, 6, 0, '2022-05-12 16:08:45', '53', 'JavaScript', 'e58efc0cfd3d815f7ff406ac067b3715');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 4, 0, '2022-05-11 18:26:22', '0', 'JavaScript', 'ea7acb452cc87e2a0d6f7db0f149b957');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 3, 1, '2022-05-11 17:34:12', '67', 'JavaScript', 'ec71719936df2859edc044e1d470d2c1');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (6, 1, 1, '2022-05-12 16:29:36', '90', 'JavaScript', 'ee7e0510d2d79f95fa622e706821d22e');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 4, 1, '2022-02-12 18:40:14', '270', 'Java', 'eeee');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 4, 1, '2022-02-01 18:40:14', '270', 'Java', 'eeee3');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 2, 1, '2022-01-30 18:40:14', '70', 'JavaScript', 'eeeee');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 2, 1, '2022-01-14 18:40:14', '70', 'JavaScript', 'eeeee4');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (6, 6, 0, '2022-05-12 16:06:39', '97', 'JavaScript', 'f47db8513051cc58c12822aec61c5e71');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (6, 6, 0, '2022-05-12 16:21:36', '78', 'JavaScript', 'ffdd39785e4fafdaac5859bef889bbf2');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 4, 1, '2022-04-01 18:39:14', '270', 'JavaScript', 'fffff');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 4, 1, '2022-04-01 18:39:14', '270', 'JavaScript', 'fffff6');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 4, 0, '2022-04-02 18:39:14', '0', 'JavaScript', 'ggggg');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 4, 0, '2022-04-02 18:39:14', '0', 'JavaScript', 'ggggg7');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 4, 1, '2022-04-01 18:40:14', '270', 'Java', 'hhhhh');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 4, 1, '2022-04-01 18:40:14', '270', 'Java', 'hhhhh8');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 4, 0, '2022-02-21 18:30:14', '0', 'JavaScript', 'iiiii');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 4, 0, '2022-02-14 18:30:14', '0', 'JavaScript', 'iiiii8');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 4, 1, '2022-04-02 18:39:14', '274', 'C', 'jjjjj');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 4, 1, '2022-04-02 18:39:14', '274', 'C', 'jjjjj9');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 5, 0, '2022-04-02 18:39:14', '0', 'JavaScript', 'kkkkk');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 5, 0, '2022-04-02 18:39:14', '0', 'JavaScript', 'kkkkk1');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 2, 1, '2022-04-07 18:39:14', '100', 'Python3', 'lllll');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 2, 1, '2022-04-07 18:39:14', '100', 'Python3', 'lllll2');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 2, 1, '2022-03-15 18:40:14', '70', 'JavaScript', 'mmm9mmm');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 2, 1, '2022-03-15 18:40:14', '70', 'JavaScript', 'mmmmmm');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 2, 1, '2022-04-10 18:39:14', '270', 'C', 'nnn8nn');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 2, 1, '2022-04-10 18:39:14', '270', 'C', 'nnnnn');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 4, 1, '2022-02-21 18:31:14', '90', 'JavaScript', 'oooo');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 4, 1, '2022-02-14 18:31:14', '90', 'JavaScript', 'oooo9');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 1, 1, '2022-02-21 18:39:14', '123', 'JavaScript', 'pppp');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 1, 1, '2022-02-14 18:39:14', '123', 'JavaScript', 'pppp1');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 1, 1, '2022-01-29 18:39:14', '142', 'C++', 'qqqqq');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 4, 1, '2022-02-11 18:39:14', '270', 'JavaScript', 'qqqqq');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 4, 1, '2022-02-01 18:39:14', '270', 'JavaScript', 'qqqqq1');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 1, 1, '2022-01-14 18:39:14', '142', 'C++', 'qqqqq2');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 2, 1, '2022-01-30 18:41:14', '270', 'JavaScript', 'rrrrr');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 4, 1, '2022-02-12 18:39:14', '274', 'C', 'rrrrr');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 4, 1, '2022-02-01 18:39:14', '274', 'C', 'rrrrr4');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 2, 1, '2022-01-14 18:41:14', '270', 'JavaScript', 'rrrrr5');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 5, 0, '2022-02-20 18:39:14', '0', 'JavaScript', 'ttttt');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 5, 0, '2022-02-01 18:39:14', '0', 'JavaScript', 'ttttt5');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 4, 0, '2022-02-21 18:29:14', '0', 'JavaScript', 'uuuu');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 4, 0, '2022-02-01 18:29:14', '0', 'JavaScript', 'uuuu7');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 1, 1, '2022-04-24 18:39:14', '123', 'JavaScript', 'vvvvv');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 1, 1, '2022-04-24 18:39:14', '123', 'JavaScript', 'vvvvv6');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 2, 1, '2022-01-30 18:39:14', '270', 'C', 'wwww');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 2, 1, '2022-01-14 18:39:14', '270', 'C', 'wwww3');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 4, 0, '2022-02-12 18:39:14', '0', 'JavaScript', 'wwwww');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 4, 0, '2022-02-01 18:39:14', '0', 'JavaScript', 'wwwww2');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 4, 0, '2022-04-24 18:30:14', '0', 'JavaScript', 'xxxxx');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 4, 0, '2022-04-24 18:30:14', '0', 'JavaScript', 'xxxxx4');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 2, 1, '2022-02-21 18:39:14', '100', 'Python3', 'yyyyy');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 2, 1, '2022-02-01 18:39:14', '100', 'Python3', 'yyyyy6');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 4, 0, '2022-04-03 18:29:14', '0', 'JavaScript', 'zzzz');
INSERT INTO `User_Question` (`uuid`, `question_id`, `state`, `date`, `time`, `language`, `submission_id`) VALUES (8, 4, 0, '2022-04-03 18:29:14', '0', 'JavaScript', 'zzzz3');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
