import styles from './index.less';
import { Tag, Button, Mentions, Empty, message, BackTop } from 'antd';
import {
  SearchOutlined,
  EditOutlined,
  UpCircleFilled,
} from '@ant-design/icons';
import React, { useState } from 'react';
import { OptionProps } from 'rc-mentions/lib/Option';
import ArticleDataList from '@/components/ArticleDataList';

const { Option } = Mentions;

const tagsOption: ArticleTags[] = [
  {
    tagName: 'JavaScript',
  },
  {
    tagName: 'Java',
  },
  {
    tagName: 'C',
  },
  {
    tagName: 'C++',
  },
  {
    tagName: 'Python',
  },
  {
    tagName: 'Go',
  },
  {
    tagName: '前端',
  },
  {
    tagName: '后端',
  },
  {
    tagName: '面经',
  },
  {
    tagName: 'React',
  },
  {
    tagName: 'Vue',
  },
  {
    tagName: 'Nodejs',
  },
];

export default function ArticleList() {
  const [mentionValue, setMentionValue] = useState('');
  const [selectTagsArr, setSelectTagsArr] = useState<ArticleTags[]>([]);
  const [tagsArr, setTagsArr] = useState<ArticleTags[]>(tagsOption);
  // 展示tag数目
  const [maxTagsNumber, setMaxTagsNumber] = useState(15);
  // 选择标签
  const selectTag = (e: any) => {
    let text = e.target.innerText as string;
    let newArr = [{ tagName: text }, ...selectTagsArr];
    setSelectTagsArr(newArr);
    setTagsArr(tagsArr.filter((tag) => tag.tagName !== text));
  };
  // 删除标签
  const deleteTag = (tagName: string) => {
    setSelectTagsArr(selectTagsArr.filter((tag) => tag.tagName !== tagName));
    setTagsArr(
      tagsOption.filter((tag) => {
        let tempTagName = tag.tagName;
        if (tempTagName === tagName) {
          return true;
        }
        for (let item of selectTagsArr) {
          if (tempTagName === item.tagName) {
            return false;
          }
        }
        return true;
      }),
    );
  };
  // 加载更多标签
  const addMoreTags = () => {
    if (maxTagsNumber >= 50) {
      message.error('请采用搜索方式查询标签');
    } else {
      setMaxTagsNumber((pre) => pre + 15);
    }
  };

  const onChangeMentions = (e: any) => {
    console.log(e);
    setMentionValue(e);
  };

  const onSelectMentions = (e: any) => {
    console.log(e);
    setMentionValue(e.value);
  };

  // 禁止换行
  const noWrap: React.KeyboardEventHandler<HTMLTextAreaElement> = (e: any) => {
    if (e.keyCode === 13) e.preventDefault();
  };
  // 创作文章
  const createArticle = () => {
    alert('创建文章');
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.tagsContainer}>
        <div className={styles.tags}>
          {tagsArr.slice(0, maxTagsNumber).map((item, index) => {
            if (index === maxTagsNumber - 1) {
              return (
                <>
                  <Tag key={item.tagName} onClick={selectTag}>
                    {item.tagName}
                  </Tag>
                  <Tag
                    key={'add'}
                    onClick={addMoreTags}
                    className={styles.addTag}
                  >
                    加载更多
                  </Tag>
                </>
              );
            }
            return (
              <Tag key={item.tagName} onClick={selectTag}>
                {item.tagName}
              </Tag>
            );
          })}
        </div>
        <div className={styles.searchTags}>
          <SearchOutlined className={styles.searchIcon} />
          <Mentions
            onChange={onChangeMentions}
            onSelect={onSelectMentions}
            placeholder={'搜索标签'}
            prefix={''}
            value={mentionValue}
            filterOption={(_input: string, option: OptionProps) => {
              if (option.value) {
                return (
                  option.value.toUpperCase().includes(mentionValue) ||
                  option.value.toLowerCase().includes(mentionValue)
                );
              }
              return false;
            }}
            notFoundContent={<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
            onKeyDown={noWrap}
          >
            {tagsArr.map((item) => {
              return (
                <Option key={item.tagName} value={item.tagName}>
                  {item.tagName}
                </Option>
              );
            })}
          </Mentions>
        </div>
      </div>
      <div className={styles.rowLine} />
      <div className={styles.selectedTags}>
        <div className={styles.tags}>
          {selectTagsArr.map((item) => {
            return (
              <Tag
                closable
                onClose={(e) => {
                  e.preventDefault();
                  deleteTag(item.tagName);
                }}
                key={item.tagName}
              >
                {item.tagName}
              </Tag>
            );
          })}
        </div>
        <div className={styles.buttonContainer}>
          <Button
            type={'primary'}
            icon={<EditOutlined />}
            onClick={createArticle}
          >
            我要创作
          </Button>
        </div>
      </div>
      <div className={styles.articleList}>
        <ArticleDataList isPagination={false} scrollDom={window} />
      </div>
      <div className={styles.endText}>end</div>
      <BackTop>
        <UpCircleFilled className={styles.backTopUp} />
      </BackTop>
    </div>
  );
}
