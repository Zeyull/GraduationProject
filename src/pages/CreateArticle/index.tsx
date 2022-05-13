import styles from './index.less';
import MarkdownPreview from '@uiw/react-markdown-preview';
import MdEditor from 'react-markdown-editor-lite';
import { Input, Tag, Button, message, Upload } from 'antd';
import { PlusOutlined, CloseOutlined, DeleteOutlined } from '@ant-design/icons';
// 导入编辑器的样式
import 'react-markdown-editor-lite/lib/index.css';
import { useState, useEffect } from 'react';
import * as _ from 'lodash';
import moment from 'moment';
import { useAtom } from 'jotai';
import { userInfoAtom } from '@/jotai/userInfo';
import request from '@/utils/request';
import { history } from 'umi';
// 注册插件（如果有的话）
// MdEditor.use(YOUR_PLUGINS_HERE);

export default function CreateArticle(props: any) {
  const question_id = props.location.query?.id;
  const [userInfo] = useAtom(userInfoAtom);
  // 标题内容
  const [titleText, SetTitleText] = useState('');
  // 已输入的Tags
  const [articleTags, setArticleTags] = useState<ArticleTags[]>([]);
  // 封面图片
  const [imgFile, SetImgFile] = useState(null);
  const [imgUrl, SetImgUrl] = useState('');
  // MD正文内容
  const [mdText, SetMDText] = useState('');
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
    if (articleTags.find((tag) => tag.tags_name === str) !== undefined) {
      message.error('标签名重复');
    } else if (str !== '') {
      setArticleTags([...articleTags, { tags_name: str }]);
      setIsAddTag(false);
      setInputValue('');
    } else {
      message.error('请不要输入空值');
    }
  };
  const deleteTags = (tagName: string) => {
    setMaxTags((pre) => pre - 1);
    setArticleTags(articleTags.filter((tag) => tag.tags_name !== tagName));
  };
  // TagsInputChange
  const tagInputChange = (e: any) => {
    setInputValue(e.target.value);
  };
  // 处理Markdown编辑器输入
  function handleEditorChange(props: { html: any; text: any }) {
    const { text } = props;
    SetMDText(text);
  }
  // 添加标签的样式
  const addTagInput = (
    <div className={styles.addTagInput}>
      <Input
        bordered={false}
        placeholder={'添加新标签'}
        showCount={true}
        maxLength={12}
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

  const uploadButton = (
    <div className={styles.uploadButton}>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>上传封面</div>
    </div>
  );

  // 图片状态改变回调
  function imgHandleChange(info: any) {
    SetImgFile(info.file.originFileObj);
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (imageUrl: any) => {
        SetImgUrl(imageUrl);
      });
    }
  }
  function getBase64(img: any, callback: any) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  // 图片文件上传前进行处理
  function beforeUpload(file: any) {
    const isJpgOrPng =
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/jpg';
    if (!isJpgOrPng) {
      message.error('只能上传JPG/PNG/JPEG格式的图片');
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('文件大小不能超过5Mb');
    }
    return isJpgOrPng && isLt5M;
  }

  // 移除图片的处理
  function removeImg() {
    SetImgFile(null);
    SetImgUrl('');
    return true;
  }

  // TitleInputChange
  function titleTextChange(e: any) {
    SetTitleText(e.target.value);
  }

  // submit
  async function submitArticle() {
    const form = new FormData();
    const time = moment().format('YYYY-MM-DD HH:mm:ss');
    const tags = JSON.stringify(articleTags);
    if (titleText === '') {
      message.error('文章标题不能为空');
      return;
    }
    if (tags === '[]') {
      message.error('每篇文章至少一个标签');
      return;
    }
    if (mdText === '') {
      message.error('文章内容不能为空');
      return;
    }
    form.append('article_title', titleText);
    form.append('time', time);
    form.append('article_content', mdText);
    form.append('tags', tags);
    form.append('author_img', userInfo.head_img);
    // @ts-ignore
    form.append('author_id', userInfo.uuid);
    // @ts-ignore
    form.append('file', imgFile);
    if (question_id !== undefined) {
      form.append('question_id', question_id);
    }
    const res = await request.post('/createArticle', {
      requestType: 'form',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: form,
    });
    if (res.code >= 400) {
      message.error(res.msg);
    } else if (res.code === 200) {
      message.success(res.msg);
      history.push(`/article-content/${res.data.article_id}`);
    }
  }

  // 离开后保存草稿
  //    useEffect(() => {
  //     const listener = (ev:any) => {
  //         ev.preventDefault();
  //         ev.returnValue='文章要保存吼，确定离开吗？';
  //     };
  //     window.addEventListener('beforeunload', listener);
  //     return () => {
  //         window.removeEventListener('beforeunload', listener)
  //     }
  // }, []);

  return (
    <div className={styles.mainContainer}>
      <Input
        placeholder="请输入标题"
        className={styles.titleInput}
        maxLength={50}
        showCount={true}
        value={titleText}
        onChange={titleTextChange}
      />
      <div className={styles.uploadImgTags}>
        <div className={styles.tagsContainer}>
          {articleTags.map((item) => {
            return (
              <Tag
                closable
                onClose={(e) => {
                  e.preventDefault();
                  deleteTags(item.tags_name);
                }}
                key={item.tags_name}
              >
                {item.tags_name}
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
        <Upload
          key={'upload'}
          onChange={imgHandleChange}
          beforeUpload={beforeUpload}
          showUploadList={false}
          listType={imgUrl === '' ? 'picture-card' : 'text'}
        >
          {imgUrl !== '' ? (
            <img
              src={imgUrl}
              style={{ width: '272px', height: '168px', objectFit: 'cover' }}
            />
          ) : (
            uploadButton
          )}
        </Upload>
        {imgUrl !== '' ? (
          <Button
            className={styles.deleteImg}
            type="primary"
            onClick={removeImg}
          >
            <DeleteOutlined />
          </Button>
        ) : (
          ''
        )}
      </div>
      <MdEditor
        style={{ height: '600px' }}
        renderHTML={(text) => <MarkdownPreview source={text} />}
        onChange={handleEditorChange}
      />
      <Button
        type="primary"
        className={styles.createButton}
        onClick={submitArticle}
      >
        创建文章
      </Button>
    </div>
  );
}
