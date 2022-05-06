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

 Date: 06/05/2022 14:38:07
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for Article
-- ----------------------------
DROP TABLE IF EXISTS `Article`;
CREATE TABLE `Article` (
  `article_id` int NOT NULL,
  `article_title` varchar(255) DEFAULT NULL,
  `article_content` longtext,
  `time` timestamp NULL DEFAULT NULL,
  `author` varchar(20) DEFAULT NULL,
  `like` int DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `question_id` varchar(16) DEFAULT NULL,
  PRIMARY KEY (`article_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of Article
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for Comment
-- ----------------------------
DROP TABLE IF EXISTS `Comment`;
CREATE TABLE `Comment` (
  `comment_id` int NOT NULL,
  `article_id` int DEFAULT NULL,
  `time` timestamp NULL DEFAULT NULL,
  `uuid` int DEFAULT NULL,
  `user_name` varchar(20) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `reply_id` int DEFAULT NULL,
  `reply_name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`comment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of Comment
-- ----------------------------
BEGIN;
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
COMMIT;

-- ----------------------------
-- Table structure for Front_Question
-- ----------------------------
DROP TABLE IF EXISTS `Front_Question`;
CREATE TABLE `Front_Question` (
  `fquestion_id` int NOT NULL,
  `question_name` varchar(255) DEFAULT NULL,
  `question_content` longtext,
  PRIMARY KEY (`fquestion_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of Front_Question
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for Question
-- ----------------------------
DROP TABLE IF EXISTS `Question`;
CREATE TABLE `Question` (
  `question_id` int NOT NULL,
  `question_index` int DEFAULT NULL,
  `question_name` varchar(255) DEFAULT NULL,
  `level` int DEFAULT NULL,
  `content` longtext,
  PRIMARY KEY (`question_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of Question
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for Tags
-- ----------------------------
DROP TABLE IF EXISTS `Tags`;
CREATE TABLE `Tags` (
  `tags_id` int NOT NULL,
  `tags_name` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`tags_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of Tags
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for Tags_Article
-- ----------------------------
DROP TABLE IF EXISTS `Tags_Article`;
CREATE TABLE `Tags_Article` (
  `tags_id` int NOT NULL,
  `article_id` int DEFAULT NULL,
  PRIMARY KEY (`tags_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of Tags_Article
-- ----------------------------
BEGIN;
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of User
-- ----------------------------
BEGIN;
INSERT INTO `User` (`uuid`, `user_name`, `password`, `email`, `age`, `sex`, `city`, `introduction`, `head_img`) VALUES (1, '落雪如衣', '6031332lzy', '834159744@qq.com', 18, 1, '浙江/杭州', '这个人很懒，什么都没写', 'HeadImg/unLoginImg.png');
INSERT INTO `User` (`uuid`, `user_name`, `password`, `email`, `age`, `sex`, `city`, `introduction`, `head_img`) VALUES (6, 'TojoNozomi', '1058013df6c7b51200ae5b27e6fec4b5', '2930096618@qq.com', 18, 1, '上海/宝山', '东条希', '/upload/headerImage/f8648190c4fd95c48c278fdd30c3939b.png');
INSERT INTO `User` (`uuid`, `user_name`, `password`, `email`, `age`, `sex`, `city`, `introduction`, `head_img`) VALUES (8, 'K-on', 'aa1be3665ad565a808e4f2f5cb63b905', '13508085664@163.com', 18, 1, '浙江/杭州', 'fuwafuwa time!', '/upload/headerImage/c6bbe014bc469673f1a7c5ca5fbcdf38.png');
COMMIT;

-- ----------------------------
-- Table structure for User_Question
-- ----------------------------
DROP TABLE IF EXISTS `User_Question`;
CREATE TABLE `User_Question` (
  `uuid` int NOT NULL,
  `question_id` int NOT NULL,
  `state` int DEFAULT NULL,
  `date` timestamp NULL DEFAULT NULL,
  `time` varchar(10) DEFAULT NULL,
  `language` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`uuid`,`question_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of User_Question
-- ----------------------------
BEGIN;
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
