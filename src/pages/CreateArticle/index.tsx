import styles from './index.less';
import MarkdownPreview from '@uiw/react-markdown-preview';
import MdEditor from 'react-markdown-editor-lite';
import { Input, Tag, Button, message } from 'antd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
// 导入编辑器的样式
import 'react-markdown-editor-lite/lib/index.css';
import { useState } from 'react';
import * as _ from 'lodash';
// 注册插件（如果有的话）
// MdEditor.use(YOUR_PLUGINS_HERE);

export default function CreateArticle() {
  // 已输入的Tags
  const [articleTags, setArticleTags] = useState<ArticleTags[]>([]);
  // 标签input
  const [inputValue, setInputValue] = useState<string>('');
  // 标签个数
  const [isAddTag, setIsAddTag] = useState<boolean>(false);
  // 最多Tags
  const [maxTags, setMaxTags] = useState<number>(1);
  // 展示/隐藏输入框
  const showTagInput = () => {
    setMaxTags((pre) => pre + 1);
    setIsAddTag(true);
  };
  const cancelTagInput = () => {
    setMaxTags((pre) => pre - 1);
    setIsAddTag(false);
  };
  // 增加/删除标签
  const addTags = () => {
    let str = _.trim(inputValue);
    if (articleTags.find((tag) => tag.tagName === str) !== undefined) {
      message.error('标签名重复');
    } else if (str !== '') {
      setArticleTags([...articleTags, { tagName: str }]);
      console.log(articleTags);
      setIsAddTag(false);
      setInputValue('');
    } else {
      message.error('请不要输入空值');
    }
  };
  const deleteTags = (tagName: string) => {
    setMaxTags((pre) => pre - 1);
    setArticleTags(articleTags.filter((tag) => tag.tagName !== tagName));
  };

  const tagInputChange = (e: any) => {
    setInputValue(e.target.value);
  };
  // 完成！
  function handleEditorChange(props: { html: any; text: any }) {
    const { html, text } = props;
    console.log('handleEditorChange', html, text);
  }
  // 添加标签的样式
  const addTagInput = (
    <div className={styles.addTagInput}>
      <Input
        bordered={false}
        placeholder={'添加新标签'}
        showCount={true}
        maxLength={7}
        value={inputValue}
        onChange={tagInputChange}
      />
      <Button
        type="primary"
        shape="circle"
        size={'small'}
        icon={<PlusOutlined />}
        onClick={addTags}
      />
      <Button
        danger
        shape="circle"
        size={'small'}
        icon={<CloseOutlined />}
        onClick={cancelTagInput}
      />
    </div>
  );

  return (
    <div className={styles.mainContainer}>
      <Input
        placeholder="请输入标题"
        className={styles.titleInput}
        maxLength={20}
        showCount={true}
      />
      <div className={styles.tagsContainer}>
        {articleTags.map((item) => {
          return (
            <Tag
              closable
              onClose={(e) => {
                e.preventDefault();
                deleteTags(item.tagName);
              }}
              key={item.tagName}
            >
              {item.tagName}
            </Tag>
          );
        })}
        {isAddTag && addTagInput}
        {!isAddTag && maxTags <= 5 && (
          <Tag onClick={showTagInput} className={styles.addTag}>
            {' '}
            <PlusOutlined />
            加载更多
          </Tag>
        )}
        <p className={styles.text}>最多添加五个标签哦</p>
      </div>
      <MdEditor
        style={{ height: '600px' }}
        renderHTML={(text) => <MarkdownPreview source={text} />}
        onChange={handleEditorChange}
      />
      <Button type="primary" className={styles.createButton}>
        创建文章
      </Button>
    </div>
  );
}
