import styles from './index.less';
import { Tag, Button, Mentions, Empty, message, BackTop } from 'antd';
import {
  SearchOutlined,
  EditOutlined,
  UpCircleFilled,
} from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { OptionProps } from 'rc-mentions/lib/Option';
import ArticleDataList from '@/components/ArticleDataList';
import { history } from 'umi';
import request from '@/utils/request';
import { filterArticleFnAtom } from '@/jotai/articleList';
import { useAtom } from 'jotai';

const { Option } = Mentions;

export default function ArticleList() {
  const [filterArticleObj] = useAtom(filterArticleFnAtom);
  const [mentionValue, setMentionValue] = useState('');
  const [selectTagsArr, setSelectTagsArr] = useState<ArticleTags[]>([]);
  const [tagsArr, setTagsArr] = useState<ArticleTags[]>([]);
  const [originTags, setOriginTags] = useState<ArticleTags[]>([]);
  const [searchRecordTags, setSearchRecordTags] = useState<ArticleTags[]>([]);
  // 展示tag数目
  const [maxTagsNumber, setMaxTagsNumber] = useState(10);

  useEffect(() => {
    async function firstLoad() {
      const tagsRes = await request.get('/getAllTags');
      if (tagsRes.code === 200) {
        setTagsArr(tagsRes.data.tags);
        setOriginTags(tagsRes.data.tags);
      } else if (tagsRes.code >= 400) {
        message.error(tagsRes.msg);
      }
    }
    firstLoad();
  }, []);

  // 选择标签
  const selectTag = (e: any) => {
    let text = e.target.innerText as string;
    let newArr = [{ tags_name: text }, ...selectTagsArr];
    setSelectTagsArr(newArr);
    setTagsArr(tagsArr.filter((tag) => tag.tags_name !== text));
    setSearchRecordTags(
      searchRecordTags.filter((tag) => tag.tags_name !== text),
    );
    filterArticleObj.filterArticleFn(newArr);
  };

  // 删除标签
  const deleteTag = (tags_name: string) => {
    const newArr = selectTagsArr.filter((tag) => tag.tags_name !== tags_name);
    setSelectTagsArr(newArr);
    setTagsArr(
      originTags.filter((tag) => {
        let temptags_name = tag.tags_name;
        if (temptags_name === tags_name) {
          return true;
        }
        for (let item of selectTagsArr) {
          if (temptags_name === item.tags_name) {
            return false;
          }
        }
        return true;
      }),
    );
    filterArticleObj.filterArticleFn(newArr);
  };
  // 加载更多标签
  const addMoreTags = () => {
    if (maxTagsNumber >= 40) {
      message.error('请采用搜索方式查询标签');
    } else {
      setMaxTagsNumber((pre) => pre + 10);
    }
  };

  const onChangeMentions = (e: any) => {
    setMentionValue(e);
    if (e === '' && searchRecordTags.length !== 0) {
      setTagsArr(searchRecordTags);
    }
  };

  const onSelectMentions = (e: any) => {
    setTagsArr(originTags.filter((item) => item.tags_name === e.value));
    setSearchRecordTags(tagsArr);
    setMentionValue(e.value);
  };

  const searchTags = () => {
    setTagsArr(originTags.filter((item) => item.tags_name === mentionValue));
    setSearchRecordTags(tagsArr);
  };

  // 禁止换行
  const noWrap: React.KeyboardEventHandler<HTMLTextAreaElement> = (e: any) => {
    if (e.keyCode === 13) e.preventDefault();
  };
  // 创作文章
  const createArticle = () => {
    history.push('/create-article');
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.tagsContainer}>
        <div className={styles.tags}>
          {tagsArr.slice(0, maxTagsNumber).map((item, index) => {
            if (index === maxTagsNumber - 1) {
              return (
                <>
                  <Tag key={item.tags_name} onClick={selectTag}>
                    {item.tags_name}
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
              <Tag key={item.tags_name} onClick={selectTag}>
                {item.tags_name}
              </Tag>
            );
          })}
        </div>
        <div className={styles.searchTags}>
          <SearchOutlined className={styles.searchIcon} onClick={searchTags} />
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
                <Option key={item.tags_name} value={item.tags_name}>
                  {item.tags_name}
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
                  deleteTag(item.tags_name);
                }}
                key={item.tags_name}
              >
                {item.tags_name}
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
