/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : localhost:3306
 Source Schema         : local-egg-demo

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 25/12/2020 17:44:33
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for mzc-about
-- ----------------------------
DROP TABLE IF EXISTS `mzc-about`;
CREATE TABLE `mzc-about`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `category_id` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '关联父表id',
  `dropId` varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0' COMMENT '菜单id值',
  `title` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '海南昆仑体育文化股份有限公司' COMMENT '网站标题',
  `keywords` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '海南昆仑体育文化股份有限公司' COMMENT '公司关键词',
  `companyDescription` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '海南昆仑体育文化股份有限公司' COMMENT '公司描述',
  `aboutTitle` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '单页标题',
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '单页内容',
  `avatarImage` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '图片',
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '状态',
  `sort` int(11) NOT NULL DEFAULT 0 COMMENT '排序',
  `created_at` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `deleted_at` datetime(0) NULL DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `category_id`(`category_id`) USING BTREE,
  CONSTRAINT `mzc-about_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `mzc-about-droptype` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 28 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mzc-about
-- ----------------------------
INSERT INTO `mzc-about` VALUES (1, 2, '4', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '刘学恒', '<p>45岁，自2016年1月25日起获委任为执行董事、董事会主席及行政总裁。刘先生现为北控医疗健康产业集团有限公司（股份代号：2389）之执行董事、联席行政总裁、授权代表及投资及风险管理委员会成员。加入本公司前，彼曾于2011年1月1日至2015年12月23 日期间，担任北京建设（控股）有限公司（股份代号：925）之执行董事及投资及风险管理委员会主席。</p><p>彼亦于2014年7月11日至2016年1 月19日期间，担任百威国际控股有限公司（股份代号：718）之执行董事及行政总裁，以及于2011年6月2日至2014年5月29日期间，担任广深铁路股份有限公司（股份代号：525）之独立非执行董事。刘先生于英国剑桥大学取得工商管理硕士学位。彼于股本投资、企业融资、首次公开发售及併购方面拥有丰富的经验。</p>\n', 'http://127.0.0.1:7001/public/images/team_img.png', 1, 1, '2020-08-28 14:37:13', '2020-10-27 16:03:19', NULL);
INSERT INTO `mzc-about` VALUES (2, 3, '4', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '林嘉德', '<p>45岁，自2016年1月25日起获委任为执行董事、董事会主席及行政总裁。刘先生现为北控医疗健康产业集团有限公司（股份代号：2389）之执行董事、联席行政总裁、授权代表及投资及风险管理委员会成员。加入本公司前，彼曾于2011年1月1日至2015年12月23 日期间，担任北京建设（控股）有限公司（股份代号：925）之执行董事及投资及风险管理委员会主席。</p><p>彼亦于2014年7月11日至2016年1 月19日期间，担任百威国际控股有限公司（股份代号：718）之执行董事及行政总裁，以及于2011年6月2日至2014年5月29日期间，担任广深铁路股份有限公司（股份代号：525）之独立非执行董事。刘先生于英国剑桥大学取得工商管理硕士学位。彼于股本投资、企业融资、首次公开发售及併购方面拥有丰富的经验。</p>', 'http://127.0.0.1:7001/public/images/team_img2.png', 1, 1, '2020-08-28 14:37:13', '2020-08-28 14:37:13', NULL);
INSERT INTO `mzc-about` VALUES (3, 4, '4', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '刘学恒', '1', 'http://127.0.0.1:7001/public/images/team_img3.png', 1, 1, '2020-08-28 14:37:13', '2020-08-28 14:37:13', NULL);
INSERT INTO `mzc-about` VALUES (4, 5, '5', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '123', '<p>海南昆仑体育文化股份有限公司成立于2015年，注册资本1亿人民币。公司以学校为基础，积极整合场地、设备、人力等优质资源，搭建与市场对接的常态机制。对外开展业务涉及：大型文艺体育活动及演出、国际文化合作与交流、影视制作投资、品牌策划推广、旅游会议会展、管理咨询、体育赛事服务管理和拓展培训等。</p>', 'http://127.0.0.1:7001/public/images/big_img.png', 1, 1, '2020-08-28 14:37:13', '2020-10-27 16:50:07', NULL);
INSERT INTO `mzc-about` VALUES (5, 6, '5', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '123', '<p>海南昆仑体育文化股份有限公司成立于2015年，注册资本1亿人民币。公司以学校为基础，积极整合场地、设备、人力等优质资源，搭建与市场对接的常态机制。对外开展业务涉及：大型文艺体育活动及演出、国际文化合作与交流、影视制作投资、品牌策划推广、旅游会议会展、管理咨询、体育赛事服务管理和拓展培训等。</p>', 'http://127.0.0.1:7001/public/images/big_img2.png', 1, 1, '2020-08-28 14:37:13', '2020-10-27 16:49:34', NULL);
INSERT INTO `mzc-about` VALUES (6, 7, '5', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '123', '<p>海南昆仑体育文化股份有限公司成立于2015年，注册资本1亿人民币。公司以学校为基础，积极整合场地、设备、人力等优质资源，搭建与市场对接的常态机制。对外开展业务涉及：大型文艺体育活动及演出、国际文化合作与交流、影视制作投资、品牌策划推广、旅游会议会展、管理咨询、体育赛事服务管理和拓展培训等。</p>', 'http://127.0.0.1:7001/public/images/big_img3.png', 1, 1, '2020-08-28 14:37:13', '2020-10-27 16:43:21', NULL);
INSERT INTO `mzc-about` VALUES (7, 8, '6', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '荣获多项国家、省、市级荣誉与认证', '<p>海南昆仑体育文化股份有限公司成立于2015年，注册资本1亿人民币。公司以学校为基础，积极整合场地、设备、人力等优质资源，搭建与市场对接的常态机制。对外开展业务涉及：大型文艺体育活动及演出、国际文化合作与交流、影视制作投资、品牌策划推广、旅游会议会展、管理咨询、体育赛事服务管理和拓展培训等。</p>', 'http://127.0.0.1:7001/public/images/honor.png', 1, 1, '2020-08-28 14:37:13', '2020-10-26 16:43:14', NULL);
INSERT INTO `mzc-about` VALUES (8, 8, '6', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '荣获多项国家、省、市级荣誉与认证', '1', 'http://127.0.0.1:7001/public/images/honor2.png', 1, 1, '2020-08-28 14:37:13', '2020-08-28 14:37:13', NULL);
INSERT INTO `mzc-about` VALUES (9, 8, '6', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '荣获多项国家、省、市级荣誉与认证', '1', 'http://127.0.0.1:7001/public/images/honor3.png', 1, 1, '2020-08-28 14:37:13', '2020-08-28 14:37:13', NULL);
INSERT INTO `mzc-about` VALUES (26, 2, '4', '123', '123', '123', '123', '<p>aaaa123</p>', 'http://qhcxehb37.hn-bkt.clouddn.com/banner.png', 1, 1, '2020-10-27 16:55:55', '2020-12-23 15:52:07', NULL);
INSERT INTO `mzc-about` VALUES (27, 8, '6', '123', '123', '123', '123', '<p>123</p>', 'http://qhcxehb37.hn-bkt.clouddn.com/about.png', 1, 0, '2020-10-28 10:52:39', '2020-10-28 14:47:51', '2020-10-28 14:47:51');

-- ----------------------------
-- Table structure for mzc-about-droptype
-- ----------------------------
DROP TABLE IF EXISTS `mzc-about-droptype`;
CREATE TABLE `mzc-about-droptype`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `dropId` int(11) NOT NULL DEFAULT 0 COMMENT 'cid类型',
  `title` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '下拉内容',
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '状态',
  `sort` int(11) NULL DEFAULT 0 COMMENT '排序',
  `created_at` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `deleted_at` datetime(0) NULL DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mzc-about-droptype
-- ----------------------------
INSERT INTO `mzc-about-droptype` VALUES (1, 4, '全部', 0, 1, '2020-08-28 14:37:13', '2020-11-05 16:06:12', NULL);
INSERT INTO `mzc-about-droptype` VALUES (2, 4, '执行董事', 1, 1, '2020-08-28 14:37:13', '2020-12-23 15:50:58', NULL);
INSERT INTO `mzc-about-droptype` VALUES (3, 4, '非执行董事', 1, 1, '2020-08-28 14:37:13', '2020-11-09 16:37:39', NULL);
INSERT INTO `mzc-about-droptype` VALUES (4, 4, '独立非执行董事', 1, 1, '2020-08-28 14:37:13', '2020-11-09 16:37:47', NULL);
INSERT INTO `mzc-about-droptype` VALUES (5, 5, '2019', 1, 1, '2020-08-28 14:37:13', '2020-10-27 16:35:35', NULL);
INSERT INTO `mzc-about-droptype` VALUES (6, 5, '2018', 1, 1, '2020-08-28 14:37:13', '2020-08-28 14:37:13', NULL);
INSERT INTO `mzc-about-droptype` VALUES (7, 5, '2017', 1, 1, '2020-08-28 14:37:13', '2020-10-27 16:43:35', NULL);
INSERT INTO `mzc-about-droptype` VALUES (8, 6, ' ', 1, 1, '2020-08-28 14:37:13', '2020-10-21 16:56:18', NULL);
INSERT INTO `mzc-about-droptype` VALUES (9, 6, '', 1, 0, '2020-11-09 09:52:36', '2020-11-13 15:44:49', '2020-11-13 15:44:49');
INSERT INTO `mzc-about-droptype` VALUES (10, 6, '', 0, 0, '2020-11-09 10:00:46', '2020-11-13 15:44:36', '2020-11-13 15:44:36');

-- ----------------------------
-- Table structure for mzc-about-single
-- ----------------------------
DROP TABLE IF EXISTS `mzc-about-single`;
CREATE TABLE `mzc-about-single`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `category_id` int(11) NOT NULL DEFAULT 0 COMMENT '菜单cid',
  `title` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '海南昆仑体育文化股份有限公司' COMMENT '网站标题',
  `keywords` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '海南昆仑体育文化股份有限公司' COMMENT '公司关键词',
  `companyDescription` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '海南昆仑体育文化股份有限公司' COMMENT '公司描述',
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '单页内容',
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '状态',
  `sort` int(11) NULL DEFAULT 0 COMMENT '排序',
  `created_at` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `deleted_at` datetime(0) NULL DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mzc-about-single
-- ----------------------------
INSERT INTO `mzc-about-single` VALUES (1, 2, '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司成立于2015年，注册资本1亿人民币。公司以学校为基础，积极整合场地、设备、人力等优质资源，搭建与市场对接的常态机制。对外开展业务涉及：大型文艺体育活动及演出、国际文化合作与交流、影视制作投资、品牌策划推广、旅游会议会展、管理咨询、体育赛事服务管理和拓展培训等。', '<p><img class=\"wscnph\" src=\"http://qhcxehb37.hn-bkt.clouddn.com/team_img3.png\" width=\"300\" height=\"300\" /><img src=\"http://127.0.0.1:7001/public/images/about_img.png\" alt=\"\" /></p>\n<h5>海南昆仑体育文化股份有限公司介绍</h5>\n<p>海南昆仑体育文化股份有限公司成立于2015年，注册资本1亿人民币。公司以学校为基础，积极整合场地、设备、人力等优质资源，搭建与市场对接的常态机制。对外开展业务涉及：大型文艺体育活动及演出、国际文化合作与交流、影视制作投资、品牌策划推广、旅游会议会展、管理咨询、体育赛事服务管理和拓展培训等。下设体育文化事业部、电竞事业部、拓展培训部三个业务部门，以及三家控股子公司，海南海经院机动车驾驶培训有限公司、海南中佳健康发展有限公司、海南中环能监测技术有限公司。</p>\n<p>公司自成立以来，一直遵循&ldquo;优质、高效、团结、奉献&rdquo;的工作态度，不骄不躁、严谨踏实，不断谋求新的发展。几年来，经过公司全体员工的不懈努力和开拓进取，陆续在文化、体育等领域发力，经营状况整体良好，2017年实现营业收入5740.22万元，2018年实现营业收入6917.39万元，2019年实现营业收入7300万元。</p>\n<p>重点业务项目概况如下：</p>\n<p>2016年11月，为海口市国贸繁华中心地段的商业中心宜欣城，全程策划执行了重装开业盛典活动，提供了活动执行、舞台搭建和节目表演等整体服务，获得了高度评价和认可，为海南树立了商场开业庆典活动的全新标杆。</p>\n<p>在2017年5月，策划承办了第55届意大利&ldquo;威尔第之声国际声乐比赛&rdquo;（中国赛区），该比赛是中华人民共和国文化部推荐的国际一类声乐比赛；是意大利文化（遗产）部重点文化项目，并且是直接认证的唯一声乐比赛。本公司为活动提供了整体的策划实施和组织执行，为活动的成功举办提供了强大的保障。</p>\n<p>在2017、2018、2019连续三年策划承办了全国沙滩排球巡回赛总决赛及颁奖盛典，本活动由国家体育总局排球运动管理中心、海南省旅游和文化广电体育厅、海口市人民政府主办，得到了海口市文化广电出版体育局的大力支持，CCTV5全程直播，由本公司全程策划执行，提供了开幕式、赛事运营、颁奖盛典的策划实施、宣传推广等服务。2019年举办的全国沙滩排球巡回赛总决赛，是历年全国巡回赛中参赛队伍最多的一次,也是国内迄今为止举办成年组沙排赛参与人数最多的一次。颁奖盛典、半决赛和总决赛通过了央视网络端、爱奇艺、新浪等几大网络平台进行全程直播，使赛事的传播及影响力较往年进一步扩大。</p>\n<p>2018年11月、2019年11月连续两年策划承办了&ldquo;海南国际旅游岛欢乐节&middot;中国-东盟大学生文化周&rdquo;活动，该活动被划列为第十九届海南国际旅游岛欢乐节的重点版块活动之一。本公司为活动提供了全程策划执行，人员安排组织、舞美物料搭建和宣传推广等整体活动服务，成功搭建了海南与全国及东盟青年之间在文化、教育和艺术交流合作的重要平台，获得了政府部门、海内外各高校和社会各界的一致好评。</p>\n<p>公司在海口经济学院内斥资近千万建设海南省高校内首家电竞体验馆-&ldquo;昆仑电竞馆&rdquo;。2017年7月参加腾讯官方英雄联盟全球高校冠军杯以九战九胜全胜战绩一举夺得全球高校冠军杯世界总冠军。2019年昆仑电竞战队获得腾讯第七届英雄联盟高校联赛海南省冠军、南方大区亚军、全国总决赛殿军。2019年第十四届国际动漫博览交易会电竞项目JEL英雄联盟全国高校总决赛冠军等。</p>\n<p>&ldquo;大海之南&bull;昆仑为巅&rdquo;，海南昆仑体育文化股份有限公司依托强大的人力和资源优势，凭借着极具创意的策划思维、专业过硬的执行能力、齐心协作的团队精神以及独家优质的平台资源，正逐步在海南崛起。</p>', 1, 0, '2020-08-28 15:48:43', '2020-12-23 15:52:17', NULL);
INSERT INTO `mzc-about-single` VALUES (2, 3, '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司成立于2015年，注册资本1亿人民币。公司以学校为基础，积极整合场地、设备、人力等优质资源，搭建与市场对接的常态机制。对外开展业务涉及：大型文艺体育活动及演出、国际文化合作与交流、影视制作投资、品牌策划推广、旅游会议会展、管理咨询、体育赛事服务管理和拓展培训等。', '<img src=\"http://127.0.0.1:7001/public/images/about_img.png\" alt=\"\"><h5></h5><p>海南昆仑体育文化股份有限公司成立于2015年，注册资本1亿人民币。公司以学校为基础，积极整合场地、设备、人力等优质资源，搭建与市场对接的常态机制。对外开展业务涉及：大型文艺体育活动及演出、国际文化合作与交流、影视制作投资、品牌策划推广、旅游会议会展、管理咨询、体育赛事服务管理和拓展培训等。下设体育文化事业部、电竞事业部、拓展培训部三个业务部门，以及三家控股子公司，海南海经院机动车驾驶培训有限公司、海南中佳健康发展有限公司、海南中环能监测技术有限公司。</p><p>公司自成立以来，一直遵循“优质、高效、团结、奉献”的工作态度，不骄不躁、严谨踏实，不断谋求新的发展。几年来，经过公司全体员工的不懈努力和开拓进取，陆续在文化、体育等领域发力，经营状况整体良好，2017年实现营业收入5740.22万元，2018年实现营业收入6917.39万元，2019年实现营业收入7300万元。</p><p>重点业务项目概况如下：</p><p>2016年11月，为海口市国贸繁华中心地段的商业中心宜欣城，全程策划执行了重装开业盛典活动，提供了活动执行、舞台搭建和节目表演等整体服务，获得了高度评价和认可，为海南树立了商场开业庆典活动的全新标杆。</p><p>在2017年5月，策划承办了第55届意大利“威尔第之声国际声乐比赛”（中国赛区），该比赛是中华人民共和国文化部推荐的国际一类声乐比赛；是意大利文化（遗产）部重点文化项目，并且是直接认证的唯一声乐比赛。本公司为活动提供了整体的策划实施和组织执行，为活动的成功举办提供了强大的保障。</p><p>在2017、2018、2019连续三年策划承办了全国沙滩排球巡回赛总决赛及颁奖盛典，本活动由国家体育总局排球运动管理中心、海南省旅游和文化广电体育厅、海口市人民政府主办，得到了海口市文化广电出版体育局的大力支持，CCTV5全程直播，由本公司全程策划执行，提供了开幕式、赛事运营、颁奖盛典的策划实施、宣传推广等服务。2019年举办的全国沙滩排球巡回赛总决赛，是历年全国巡回赛中参赛队伍最多的一次,也是国内迄今为止举办成年组沙排赛参与人数最多的一次。颁奖盛典、半决赛和总决赛通过了央视网络端、爱奇艺、新浪等几大网络平台进行全程直播，使赛事的传播及影响力较往年进一步扩大。</p><p>2018年11月、2019年11月连续两年策划承办了“海南国际旅游岛欢乐节·中国-东盟大学生文化周”活动，该活动被划列为第十九届海南国际旅游岛欢乐节的重点版块活动之一。本公司为活动提供了全程策划执行，人员安排组织、舞美物料搭建和宣传推广等整体活动服务，成功搭建了海南与全国及东盟青年之间在文化、教育和艺术交流合作的重要平台，获得了政府部门、海内外各高校和社会各界的一致好评。</p><p>公司在海口经济学院内斥资近千万建设海南省高校内首家电竞体验馆-“昆仑电竞馆”。2017年7月参加腾讯官方英雄联盟全球高校冠军杯以九战九胜全胜战绩一举夺得全球高校冠军杯世界总冠军。2019年昆仑电竞战队获得腾讯第七届英雄联盟高校联赛海南省冠军、南方大区亚军、全国总决赛殿军。2019年第十四届国际动漫博览交易会电竞项目JEL英雄联盟全国高校总决赛冠军等。</p><p>“大海之南•昆仑为巅”，海南昆仑体育文化股份有限公司依托强大的人力和资源优势，凭借着极具创意的策划思维、专业过硬的执行能力、齐心协作的团队精神以及独家优质的平台资源，正逐步在海南崛起。</p>', 1, 0, '2020-08-28 15:48:43', '2020-10-28 16:52:11', NULL);

-- ----------------------------
-- Table structure for mzc-admin
-- ----------------------------
DROP TABLE IF EXISTS `mzc-admin`;
CREATE TABLE `mzc-admin`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `roles_id` int(4) UNSIGNED NOT NULL DEFAULT 4 COMMENT '用户群组',
  `menu_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '菜单id',
  `api_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '接口id',
  `nickname` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '账号',
  `user_name` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  `avatar_image` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '头像',
  `phone` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '电话',
  `email` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '邮箱',
  `status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '状态',
  `login_count` int(11) NULL DEFAULT 0 COMMENT '登录次数',
  `register_ip` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '注册ip',
  `last_login_ip` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '上一次登录ip',
  `last_login_time` datetime(0) NULL DEFAULT NULL COMMENT '上一次登录时间',
  `created_at` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `deleted_at` datetime(0) NULL DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mzc-admin
-- ----------------------------
INSERT INTO `mzc-admin` VALUES (1, 1, '[1,2,3,4,5,6]', '[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]', 'adminRoot', '123', '$2a$10$EtVqAo8yz/tHz.eOQc8WMOf8vUvVA8ZJi3UPzHt0hWHwW75zKr2K2', 'http://127.0.0.1:7001/public/images/team_img3.png', '123', '123', 1, 61, NULL, '127.0.0.1', '2020-12-25 15:30:29', '2020-09-02 16:58:14', '2020-12-25 17:31:50', NULL);
INSERT INTO `mzc-admin` VALUES (2, 2, '', '', 'admin', NULL, '$2a$10$uDaCy8q43i2Vfo3.po87RuZe2IoLsF1k.nxNIRWPNpDs./KTLIkVS', 'http://127.0.0.1:7001/public/images/team_img3.png', '', '', 1, 129, NULL, '127.0.0.1', '2020-12-16 08:54:50', '2020-09-07 17:17:19', '2020-12-25 17:43:18', NULL);
INSERT INTO `mzc-admin` VALUES (3, 3, '', '', 'editor', NULL, '$2a$10$Yy0uMFMdzIso1cNHCtMhg.Hy6q/DFLGORvso0qZxSMSNsCURhbZQm', 'http://127.0.0.1:7001/public/images/team_img3.png', '', '', 1, 65, NULL, '127.0.0.1', '2020-12-22 20:22:43', '2020-10-21 09:44:24', '2020-12-22 20:22:43', NULL);
INSERT INTO `mzc-admin` VALUES (4, 4, '', '', 'admin1', NULL, '$2a$10$1VHPKndJw4ExsbKTIKYXMe.vtVAThiIqfC8oOIRxnHrlhelYO0d2K', 'http://127.0.0.1:7001/public/images/team_img3.png', '', '', 1, 0, NULL, NULL, NULL, '2020-11-17 11:57:56', '2020-11-17 11:57:56', '1899-12-30 01:00:00');
INSERT INTO `mzc-admin` VALUES (5, 4, '', '', 'tourists', NULL, '$2a$10$1gRrgWc5qTcDm0gCPxNJgOLsePKS8E02gEQCLBQCzET7gaFzz0aAu', '', '', '', 1, 7, '127.0.0.1', '127.0.0.1', '2020-12-15 16:01:11', '2020-11-27 17:44:45', '2020-12-15 16:01:11', NULL);
INSERT INTO `mzc-admin` VALUES (6, 4, '', '', 'admin2', NULL, '$2a$10$OjbStZVljQYdTiYYaweDxeHczzTFSYhgw9/bI/r8RV4c7I4eof9pa', '', '', '', 1, 4, '127.0.0.1', '127.0.0.1', '2020-12-15 20:03:55', '2020-12-15 15:57:12', '2020-12-15 20:03:55', NULL);
INSERT INTO `mzc-admin` VALUES (7, 6, '[1,2,3,4,5,6]', '[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]', 'ces', '123', '$2a$10$OurEC3DagL.bCPbI4pihz.btEK5Sq4CYnza.GgKc8RZVYnfsnKMt.', '', '123', '123', 1, 0, '127.0.0.1', '', NULL, '2020-12-25 17:35:57', '2020-12-25 17:42:54', NULL);

-- ----------------------------
-- Table structure for mzc-advert
-- ----------------------------
DROP TABLE IF EXISTS `mzc-advert`;
CREATE TABLE `mzc-advert`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `title` varchar(60) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '标题',
  `filepath` varchar(150) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '图片',
  `place` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '文件类型 0->首页轮播 1->页面轮播广告 2->页面banner 3->公司轮播介绍',
  `parentId` tinyint(1) NOT NULL DEFAULT 0 COMMENT '菜单id',
  `serId` varchar(1) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0' COMMENT '对应place为1的轮播图广告id顺序',
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '状态',
  `sort` int(11) NOT NULL DEFAULT 0 COMMENT '排序',
  `created_at` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `deleted_at` datetime(0) NULL DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 34 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mzc-advert
-- ----------------------------
INSERT INTO `mzc-advert` VALUES (1, '标题', 'http://127.0.0.1:7001/public/images/banner.png', 0, 3, '0', 1, 0, '2020-08-21 08:12:23', '2020-11-19 14:46:00', NULL);
INSERT INTO `mzc-advert` VALUES (2, '标题', 'http://127.0.0.1:7001/public/images/banner2.png', 0, 0, '0', 1, 0, '2020-08-21 08:12:23', '2020-08-21 08:12:23', NULL);
INSERT INTO `mzc-advert` VALUES (3, '标题', 'http://127.0.0.1:7001/public/images/banner.png', 0, 0, '0', 1, 0, '2020-08-21 08:12:23', '2020-08-21 08:12:23', NULL);
INSERT INTO `mzc-advert` VALUES (4, '体育赛事', 'http://127.0.0.1:7001/public/images/ser_info.png', 1, 0, '0', 1, 0, '2020-08-21 08:12:23', '2020-08-21 08:12:23', '1899-12-30 01:00:00');
INSERT INTO `mzc-advert` VALUES (5, '电竞教育', 'http://127.0.0.1:7001/public/images/ser_info3.png', 1, 0, '0', 1, 0, '2020-08-21 08:12:23', '2020-08-21 08:12:23', '1899-12-30 01:00:00');
INSERT INTO `mzc-advert` VALUES (6, '文化服务', 'http://127.0.0.1:7001/public/images/ser_info2.png', 1, 0, '0', 1, 0, '2020-08-21 08:12:23', '2020-08-21 08:12:23', '1899-12-30 01:00:00');
INSERT INTO `mzc-advert` VALUES (7, '会议会展', 'http://127.0.0.1:7001/public/images/ser_info4.png', 1, 0, '0', 1, 0, '2020-08-21 08:12:23', '2020-08-21 08:12:23', '1899-12-30 01:00:00');
INSERT INTO `mzc-advert` VALUES (8, '', 'http://127.0.0.1:7001/public/images/banner_info.png', 2, 1, '0', 1, 0, '2020-08-21 08:12:23', '2020-08-21 08:12:23', NULL);
INSERT INTO `mzc-advert` VALUES (9, '', 'http://127.0.0.1:7001/public/images/banner_info2.png', 2, 7, '0', 1, 0, '2020-08-21 08:12:23', '2020-08-21 08:12:23', NULL);
INSERT INTO `mzc-advert` VALUES (10, '校友“LETME”严君泽携RN校友“LETME”严君泽携RN', 'http://127.0.0.1:7001/public/images/ser_img1.png', 3, 7, '1', 1, 0, '2020-08-21 08:12:23', '2020-11-05 11:55:27', NULL);
INSERT INTO `mzc-advert` VALUES (11, '校友“LETME”严君泽携RNG俱乐部开展宣讲论坛', 'http://127.0.0.1:7001/public/images/ser-photo2.jpg', 3, 7, '2', 1, 0, '2020-08-21 08:12:23', '2020-08-21 08:12:23', NULL);
INSERT INTO `mzc-advert` VALUES (12, '校友“LETME”严君泽携RNG俱乐部开展宣讲论坛', 'http://127.0.0.1:7001/public/images/ser-photo.jpg', 3, 7, '3', 1, 0, '2020-08-21 08:12:23', '2020-08-21 08:12:23', NULL);
INSERT INTO `mzc-advert` VALUES (13, '', 'http://127.0.0.1:7001/public/images/banner_info3.png', 2, 13, '0', 1, 0, '2020-08-21 08:12:23', '2020-08-21 08:12:23', NULL);
INSERT INTO `mzc-advert` VALUES (14, '实验室', 'http://127.0.0.1:7001/public/images/compy_img1_2.png', 3, 13, '1', 1, 0, '2020-08-21 08:12:23', '2020-08-21 08:12:23', NULL);
INSERT INTO `mzc-advert` VALUES (15, '昌江重点企业烟气监测', 'http://127.0.0.1:7001/public/images/compy_img1_3.png', 3, 13, '2', 1, 0, '2020-08-21 08:12:23', '2020-08-21 08:12:23', NULL);
INSERT INTO `mzc-advert` VALUES (16, '中环能环境检测中心', 'http://127.0.0.1:7001/public/images/compy_img1_4.png', 3, 13, '3', 1, 0, '2020-08-21 08:12:23', '2020-08-21 08:12:23', NULL);
INSERT INTO `mzc-advert` VALUES (17, '', 'http://127.0.0.1:7001/public/images/banner_info4.png', 2, 16, '0', 1, 0, '2020-08-21 08:12:23', '2020-08-21 08:12:23', NULL);
INSERT INTO `mzc-advert` VALUES (18, '', 'http://127.0.0.1:7001/public/images/banner_info5.png', 2, 21, '0', 1, 0, '2020-08-21 08:12:23', '2020-08-21 08:12:23', NULL);
INSERT INTO `mzc-advert` VALUES (19, '', 'http://127.0.0.1:7001/public/images/banner_info6.png', 2, 25, '0', 1, 0, '2020-08-21 08:12:23', '2020-08-21 08:12:23', NULL);
INSERT INTO `mzc-advert` VALUES (20, '', 'http://127.0.0.1:7001/public/images/banner_info7.png', 2, 28, '0', 1, 0, '2020-08-21 08:12:23', '2020-08-21 08:12:23', NULL);
INSERT INTO `mzc-advert` VALUES (21, '', 'http://127.0.0.1:7001/public/images/banner_info8.png', 2, 31, '0', 1, 0, '2020-08-21 08:12:23', '2020-08-21 08:12:23', NULL);
INSERT INTO `mzc-advert` VALUES (22, '校友“LETME”严君泽携RN', 'http://127.0.0.1:7001/public/uploads/20201105/1604541046558.png', 3, 7, '1', 1, 1, '2020-11-05 09:50:48', '2020-11-05 14:38:58', NULL);
INSERT INTO `mzc-advert` VALUES (23, '新增图片', 'http://127.0.0.1:7001/public/uploads/20201105/1604541227504.png', 3, 7, '1', 1, 0, '2020-11-05 09:53:49', '2020-11-05 11:12:44', '2020-11-05 11:12:44');
INSERT INTO `mzc-advert` VALUES (24, '新增图片', 'http://127.0.0.1:7001/public/uploads/20201105/1604541260639.png', 3, 7, '1', 1, 0, '2020-11-05 09:54:22', '2020-11-05 10:17:46', '2020-11-05 10:17:46');
INSERT INTO `mzc-advert` VALUES (25, '新增图片', 'http://127.0.0.1:7001/public/uploads/20201105/1604548437916.png', 3, 7, '1', 1, 0, '2020-11-05 11:53:58', '2020-11-05 11:53:58', NULL);
INSERT INTO `mzc-advert` VALUES (26, '123', 'http://127.0.0.1:7001/public/uploads/20201106/1604652307827.png', 3, 13, '1', 1, 0, '2020-11-06 16:45:08', '2020-11-06 17:01:24', NULL);
INSERT INTO `mzc-advert` VALUES (27, '新增图片', 'http://127.0.0.1:7001/public/uploads/20201109/1604887349725.png', 3, 13, '7', 1, 0, '2020-11-09 10:02:30', '2020-11-09 10:02:30', NULL);
INSERT INTO `mzc-advert` VALUES (28, '', 'http://127.0.0.1:7001/public/uploads/20201119/1605768730060.png', 0, 0, '0', 1, 1, '2020-11-19 14:52:12', '2020-11-19 15:00:49', NULL);
INSERT INTO `mzc-advert` VALUES (29, '新增图片', 'http://127.0.0.1:7001/public/uploads/20201125/1606289080316.jpg', 3, 7, '1', 1, 0, '2020-11-25 15:24:40', '2020-11-25 15:24:40', NULL);
INSERT INTO `mzc-advert` VALUES (30, '新增图片', 'http://127.0.0.1:7001/public/uploads/20201125/1606289831403.png', 3, 7, '1', 1, 0, '2020-11-25 15:37:12', '2020-11-25 15:39:02', '2020-11-25 15:39:02');
INSERT INTO `mzc-advert` VALUES (31, '新增图片', 'http://127.0.0.1:7001/public/uploads/20201125/1606289831433.png', 3, 7, '1', 1, 0, '2020-11-25 15:37:13', '2020-11-25 15:37:13', NULL);
INSERT INTO `mzc-advert` VALUES (32, '新增图片', 'http://127.0.0.1:7001/public/uploads/20201125/1606289831399.png', 3, 7, '1', 1, 0, '2020-11-25 15:37:13', '2020-11-25 15:37:13', NULL);
INSERT INTO `mzc-advert` VALUES (33, '新增图片', 'http://127.0.0.1:7001/public/uploads/20201125/1606289831425.png', 3, 7, '1', 1, 0, '2020-11-25 15:37:13', '2020-11-26 09:30:12', '2020-11-26 09:30:12');

-- ----------------------------
-- Table structure for mzc-api
-- ----------------------------
DROP TABLE IF EXISTS `mzc-api`;
CREATE TABLE `mzc-api`  (
  `id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `pid` int(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT '菜单id',
  `api` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '路由地址',
  `describe` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '描述',
  `code` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '识别码',
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '状态',
  `sort` tinyint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT '排序',
  `created_at` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `deleted_at` datetime(0) NULL DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 72 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mzc-api
-- ----------------------------
INSERT INTO `mzc-api` VALUES (1, 2, '/api/aboutSingle/index', 'aboutSingle查询', 'query', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (2, 2, '/api/aboutSingle/update', 'aboutSingle更新', 'update', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (3, 2, '/api/aboutSingle/detail', 'aboutSingle详情', 'detail', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (4, 2, '/api/aboutSingle/edit', 'aboutSingle编辑', 'edit', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (5, 3, '/api/about/index', 'about查询', 'query', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (6, 3, '/api/about/update', 'about更新', 'update', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (7, 3, '/api/about/add', 'about增加', 'add', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (8, 3, '/api/about/destroy', 'about删除', 'delete', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (9, 3, '/api/about/edit', 'about编辑', 'edit', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (10, 3, '/api/about/filters', 'about过滤器', 'filters', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (11, 4, '/api/aboutDroptype/index', 'aboutDroptype下拉菜单', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (12, 4, '/api/aboutDroptype/update', 'aboutDroptype更新', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (13, 4, '/api/aboutDroptype/edit', 'aboutDroptype编辑', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (14, 4, '/api/aboutDroptype/add', 'aboutDroptype增加', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (15, 4, '/api/aboutDroptype/list', 'aboutDroptype查询', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (16, 4, '/api/aboutDroptype/destroy', 'aboutDroptype删除', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (17, 6, '/api/services/list', 'services查询', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (18, 6, '/api/services/update', 'services更新', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (19, 6, '/api/services/edit', 'services编辑', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (20, 8, '/api/company/index', 'company查询', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (21, 8, '/api/company/update', 'company更新', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (22, 8, '/api/company/edit', 'company编辑', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (23, 8, '/api/company/destroy', 'company删除', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (24, 8, '/api/company/add', 'company增加', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (25, 10, '/api/culture/index', 'culture查询', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (26, 10, '/api/culture/update', 'culture更新', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (27, 10, '/api/culture/destroy', 'culture删除', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (28, 10, '/api/culture/edit', 'culture编辑', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (29, 10, '/api/culture/add', 'culture增加', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (30, 12, '/api/news/index', 'news查询', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (31, 12, '/api/news/update', 'news更新', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (32, 12, '/api/news/destroy', 'news删除', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (33, 12, '/api/news/edit', 'news编辑', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (34, 12, '/api/news/add', 'news增加', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (35, 14, '/api/cases/index', 'cases查询', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (36, 14, '/api/cases/update', 'cases更新', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (37, 14, '/api/cases/destroy', 'cases删除', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (38, 14, '/api/cases/edit', 'cases编辑', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (39, 14, '/api/cases/add', 'cases增加', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (40, 16, '/api/recruit/index', 'recruit查询', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (41, 17, '/api/recruit/update', 'recruit更新', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (42, 17, '/api/recruit/destroy', 'recruit删除', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (43, 17, '/api/recruit/edit', 'recruit编辑', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (44, 17, '/api/recruit/add', 'recruit增加', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (45, 18, '/api/recruitDroptype/index', 'recruitDroptype查询', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (46, 18, '/api/recruitDroptype/update', 'recruitDroptype更新', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (47, 18, '/api/recruitDroptype/destroy', 'recruitDroptype删除', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (48, 18, '/api/recruitDroptype/edit', 'recruitDroptype编辑', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (49, 18, '/api/recruitDroptype/add', 'recruitDroptype增加', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (50, 22, '/api/settings/list', 'settings查询', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (51, 22, '/api/settings/edit', 'settings编辑', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (52, 23, '/api/upload/create', 'upload上传', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (53, 23, '/api/advert/edit', 'advert编辑', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (54, 23, '/api/advert/add', 'advert增加', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (55, 23, '/api/advert/update', 'advert更新', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (56, 23, '/api/advert/detail', 'advert详情', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (57, 23, '/api/advert/destroy', 'advert删除', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (58, 20, '/api/menu/index', 'menu查询', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (59, 20, '/api/menu/update', 'menu更新', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (60, 20, '/api/menu/edit', 'menu修改', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (61, 25, '/api/roles/index', 'roles权限查询', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (62, 25, '/api/api/index', 'api查询', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (63, 25, '/api/routes/list', 'routes查询', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (64, 25, '/api/roles/add', 'roles群组增加', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (65, 25, '/api/roles/update', 'roles状态更新', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (66, 25, '/api/roles/edit', 'roles修改', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (67, 26, '/api/admin/list', 'admin查询', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (68, 26, '/api/roles/list', 'roles下拉', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (69, 26, '/api/admin/edit', 'admin编辑', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (70, 26, '/api/admin/add', 'admin增加', '', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-api` VALUES (71, 26, '/api/admin/update', '更新', '', 1, 0, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for mzc-cases
-- ----------------------------
DROP TABLE IF EXISTS `mzc-cases`;
CREATE TABLE `mzc-cases`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `category_id` int(11) NOT NULL DEFAULT 0 COMMENT '分类id',
  `title` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '海南昆仑体育文化股份有限公司' COMMENT '网站标题',
  `keywords` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '海南昆仑体育文化股份有限公司' COMMENT '公司关键词',
  `companyDescription` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '海南昆仑体育文化股份有限公司' COMMENT '公司描述',
  `cultureTitle` varchar(60) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '标题',
  `type` tinyint(4) NULL DEFAULT NULL COMMENT '类型',
  `filepath` varchar(150) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '图片',
  `content` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL COMMENT '内容',
  `click` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT '点击次数',
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `sort` int(11) NOT NULL DEFAULT 0,
  `created_at` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `deleted_at` datetime(0) NULL DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 25 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mzc-cases
-- ----------------------------
INSERT INTO `mzc-cases` VALUES (1, 26, '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '助力全民健身，广东省“百馆计划”项目正式启动', 8, 'http://127.0.0.1:7001/public/images/case1.png', '<p>本项赛事是经国家体育总局批准列入《全国性单项体育协会竞技体育重要赛事名录》的国家级重要赛事，由国家体育总局排球运动管理中心、海南省旅游和文化广电体育厅、海口市人民政府主办，海口市文化广电出版体育局大力支持，由CCTV-5提供实况转播。</p><p><img src=\"/public/images/banner.png\" alt=\"\"></p>', 42, 1, 0, '2020-08-19 09:46:29', '2020-12-23 16:12:39', NULL);
INSERT INTO `mzc-cases` VALUES (2, 26, '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '助力全民健身，广东省“百馆计划”项目正式启动', 8, 'http://127.0.0.1:7001/public/images/case2.png', '<p>本项赛事是经国家体育总局批准列入《全国性单项体育协会竞技体育重要赛事名录》的国家级重要赛事，由国家体育总局排球运动管理中心、海南省旅游和文化广电体育厅、海口市人民政府主办，海口市文化广电出版体育局大力支持，由CCTV-5提供实况转播。</p><p><img src=\"/public/images/banner.png\" alt=\"\"></p>\n', 7, 1, 2, '2020-08-19 09:46:29', '2020-11-29 15:09:43', NULL);
INSERT INTO `mzc-cases` VALUES (3, 26, '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '助力全民健身，广东省“百馆计划”项目正式启动', 8, 'http://127.0.0.1:7001/public/images/case3.png', '<p>本项赛事是经国家体育总局批准列入《全国性单项体育协会竞技体育重要赛事名录》的国家级重要赛事，由国家体育总局排球运动管理中心、海南省旅游和文化广电体育厅、海口市人民政府主办，海口市文化广电出版体育局大力支持，由CCTV-5提供实况转播。</p><p><img src=\"/public/images/banner.png\" alt=\"\"></p>\n', 0, 1, 0, '2020-08-19 09:46:29', '2020-08-19 09:46:29', NULL);
INSERT INTO `mzc-cases` VALUES (4, 26, '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '助力全民健身，广东省“百馆计划”项目正式启动', 8, 'http://127.0.0.1:7001/public/images/case1.png', '<p>本项赛事是经国家体育总局批准列入《全国性单项体育协会竞技体育重要赛事名录》的国家级重要赛事，由国家体育总局排球运动管理中心、海南省旅游和文化广电体育厅、海口市人民政府主办，海口市文化广电出版体育局大力支持，由CCTV-5提供实况转播。</p><p><img src=\"\" alt=\"/public/images/banner.png\"></p>\n', 0, 1, 0, '2020-08-19 09:46:29', '2020-08-19 09:46:29', NULL);
INSERT INTO `mzc-cases` VALUES (5, 26, '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '助力全民健身，广东省“百馆计划”项目正式启动', 8, 'http://127.0.0.1:7001/public/images/case2.png', '<p>本项赛事是经国家体育总局批准列入《全国性单项体育协会竞技体育重要赛事名录》的国家级重要赛事，由国家体育总局排球运动管理中心、海南省旅游和文化广电体育厅、海口市人民政府主办，海口市文化广电出版体育局大力支持，由CCTV-5提供实况转播。</p><p><img src=\"\" alt=\"/public/images/banner.png\"></p>\n', 3, 1, 0, '2020-08-19 09:46:29', '2020-11-18 11:53:07', NULL);
INSERT INTO `mzc-cases` VALUES (6, 26, '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '助力全民健身，广东省“百馆计划”项目正式启动', 8, 'http://127.0.0.1:7001/public/images/case3.png', '<p>本项赛事是经国家体育总局批准列入《全国性单项体育协会竞技体育重要赛事名录》的国家级重要赛事，由国家体育总局排球运动管理中心、海南省旅游和文化广电体育厅、海口市人民政府主办，海口市文化广电出版体育局大力支持，由CCTV-5提供实况转播。</p><p><img src=\"/public/images/banner.png\" alt=\"\"></p>\n', 1, 1, 0, '2020-08-19 09:46:29', '2020-08-26 09:02:52', NULL);
INSERT INTO `mzc-cases` VALUES (7, 26, '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '助力全民健身，广东省“百馆计划”项目正式启动', 8, 'http://127.0.0.1:7001/public/images/case1.png', '<p>本项赛事是经国家体育总局批准列入《全国性单项体育协会竞技体育重要赛事名录》的国家级重要赛事，由国家体育总局排球运动管理中心、海南省旅游和文化广电体育厅、海口市人民政府主办，海口市文化广电出版体育局大力支持，由CCTV-5提供实况转播。</p><p><img src=\"/public/images/banner.png\" alt=\"\"></p>\n', 0, 1, 0, '2020-08-19 09:46:29', '2020-08-19 09:46:29', NULL);
INSERT INTO `mzc-cases` VALUES (8, 26, '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '助力全民健身，广东省“百馆计划”项目正式启动', 8, 'http://127.0.0.1:7001/public/images/case2.png', '<p>本项赛事是经国家体育总局批准列入《全国性单项体育协会竞技体育重要赛事名录》的国家级重要赛事，由国家体育总局排球运动管理中心、海南省旅游和文化广电体育厅、海口市人民政府主办，海口市文化广电出版体育局大力支持，由CCTV-5提供实况转播。</p><p><img src=\"/public/images/banner.png\" alt=\"\"></p>\n', 1, 1, 0, '2020-08-19 09:46:29', '2020-08-26 09:02:49', NULL);
INSERT INTO `mzc-cases` VALUES (9, 26, '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '助力全民健身，广东省“百馆计划”项目正式启动', 8, 'http://127.0.0.1:7001/public/images/case3.png', '<p>本项赛事是经国家体育总局批准列入《全国性单项体育协会竞技体育重要赛事名录》的国家级重要赛事，由国家体育总局排球运动管理中心、海南省旅游和文化广电体育厅、海口市人民政府主办，海口市文化广电出版体育局大力支持，由CCTV-5提供实况转播。</p><p><img src=\"/public/images/banner.png\" alt=\"\"></p>\n', 1, 1, 0, '2020-08-19 09:46:29', '2020-08-26 09:02:46', NULL);
INSERT INTO `mzc-cases` VALUES (10, 27, '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '', 0, 'http://127.0.0.1:7001/public/images/coop.png', '', 0, 1, 0, '2020-08-19 09:46:29', '2020-12-23 16:12:50', NULL);
INSERT INTO `mzc-cases` VALUES (11, 27, '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '', 0, 'http://127.0.0.1:7001/public/images/coop2.png', NULL, 0, 1, 0, '2020-08-19 09:46:29', '2020-08-19 09:46:29', NULL);
INSERT INTO `mzc-cases` VALUES (12, 27, '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '', 0, 'http://127.0.0.1:7001/public/images/coop3.png', '', 0, 1, 0, '2020-08-19 09:46:29', '2020-08-19 09:46:29', NULL);
INSERT INTO `mzc-cases` VALUES (13, 27, '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '', 0, 'http://127.0.0.1:7001/public/images/coop4.png', NULL, 0, 1, 0, '2020-08-19 09:46:29', '2020-08-19 09:46:29', NULL);
INSERT INTO `mzc-cases` VALUES (14, 27, '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '', 0, 'http://127.0.0.1:7001/public/images/coop5.png', NULL, 0, 1, 0, '2020-08-19 09:46:29', '2020-08-19 09:46:29', NULL);
INSERT INTO `mzc-cases` VALUES (15, 27, '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '', 0, 'http://127.0.0.1:7001/public/images/coop6.png', NULL, 0, 1, 0, '2020-08-19 09:46:29', '2020-08-19 09:46:29', NULL);
INSERT INTO `mzc-cases` VALUES (16, 27, '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '', 0, 'http://127.0.0.1:7001/public/images/coop7.png', NULL, 0, 1, 0, '2020-08-19 09:46:29', '2020-08-19 09:46:29', NULL);
INSERT INTO `mzc-cases` VALUES (17, 27, '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '', 0, 'http://127.0.0.1:7001/public/images/coop.png', NULL, 0, 1, 0, '2020-08-19 09:46:29', '2020-08-19 09:46:29', NULL);
INSERT INTO `mzc-cases` VALUES (18, 27, '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '', 0, 'http://127.0.0.1:7001/public/images/coop2.png', NULL, 0, 1, 0, '2020-08-19 09:46:29', '2020-08-19 09:46:29', NULL);
INSERT INTO `mzc-cases` VALUES (19, 27, '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '', 0, 'http://127.0.0.1:7001/public/images/coop3.png', NULL, 0, 1, 0, '2020-08-19 09:46:29', '2020-08-19 09:46:29', NULL);
INSERT INTO `mzc-cases` VALUES (20, 26, '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '', 8, '', NULL, 2, 1, 0, '2020-08-19 09:46:29', '2020-11-16 11:04:42', NULL);
INSERT INTO `mzc-cases` VALUES (21, 0, '123', '123', '123', '123', 11, 'http://127.0.0.1:7001/public/uploads/20201116/1605495317488.jpg', '<p>123</p>', 0, 1, 1, '2020-11-16 10:55:39', '2020-11-16 10:55:39', NULL);
INSERT INTO `mzc-cases` VALUES (22, 0, '123', '123', '123', '123', 11, '', '<p>123</p>', 0, 1, 1, '2020-11-16 10:56:21', '2020-11-16 10:56:21', NULL);
INSERT INTO `mzc-cases` VALUES (23, 26, '123', '123', '123', '123', 11, '', '<p>1123</p>', 1, 1, 1, '2020-11-16 11:03:25', '2020-11-16 11:04:38', NULL);
INSERT INTO `mzc-cases` VALUES (24, 27, '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '', 8, 'http://127.0.0.1:7001/public/uploads/20201116/1605499141498.jpg', '', 0, 1, 1, '2020-11-16 11:59:05', '2020-11-16 14:49:11', '2020-11-16 14:49:11');

-- ----------------------------
-- Table structure for mzc-company
-- ----------------------------
DROP TABLE IF EXISTS `mzc-company`;
CREATE TABLE `mzc-company`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `category_id` int(11) NOT NULL DEFAULT 0 COMMENT '分类id',
  `title` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '海南昆仑体育文化股份有限公司' COMMENT '网站标题',
  `keywords` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '海南昆仑体育文化股份有限公司' COMMENT '公司关键词',
  `companyDescription` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '海南昆仑体育文化股份有限公司' COMMENT '公司描述',
  `companyTitle` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '标题',
  `content` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '单页内容',
  `image` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT '' COMMENT '图片',
  `address` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '地址',
  `website` varchar(60) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT '' COMMENT '网站',
  `email` varchar(60) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '电子邮箱',
  `phone` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '联系电话',
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `sort` int(11) NOT NULL DEFAULT 0 COMMENT '排序',
  `created_at` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `deleted_at` datetime(0) NULL DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mzc-company
-- ----------------------------
INSERT INTO `mzc-company` VALUES (1, 14, '123海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南中环能检测技术有限公司', '<p>海南中环能检测技术有限公司是一家综合性、专业性的第三方环境服务检测机构，2014年取得省计量认证CMA资质，可向社会独立出具公正环境检测数据。公司自成立以来，以创建环境检测名牌实验室为目标，以严谨检测为依托，以诚信服务为后盾，以科学品质为保证，全方位致力于环保技术开发、服务、咨询。公司可提供的服务项目具体包括：环境及生态调查与评估、环保竣工验收、环境影响评价、排污许可申报、大气环境检测（废气、室内空气、油烟等）、水环境检测（生活饮用水、海水、地下水、废水等）、土壤环境检测（固体废物、底泥等）、声环境检测、油气回收等。</p>\n<p>公司现有员工70余人，其中具有高级、中级、初级职称的技术人员近40人；公司1400余平米的标准化实验室内配备有国内外高端环境检测设备，如GC-MS、ICP-MS、气相色谱仪、离子色谱仪等。公司自开办以来，良好的信誉和专业的技术，为各县市环保、水务等主管部门以及各大企业、公司解决了众多难题，赢得了广大客户和社会的信赖。</p>\n<p>志存高远，锐意进取，作为综合性、专业性的检测机构，中环能检测技术有限公司将不断探索求新，勇攀高峰。</p>', 'http://127.0.0.1:7001/public/images/compy_img1.png', '海南省海口市桂林洋高校区海口经济学院工程大楼副楼1楼', 'www.cecezhn.com', 'zhncece@163.com', '0898-65731291', 1, 0, '1899-12-30 01:00:00', '2020-11-13 08:59:55', NULL);
INSERT INTO `mzc-company` VALUES (2, 14, '海南昆仑体育文化股份有限公司', '海南中佳健康创建于2017年1月，现主要负责海口经济学院游泳馆和拳星健身俱乐部两大健身场所的经营与管理。', '中佳健康拥有一支精诚团结、技术水平一流的专业教练队伍。我们的教练队伍拥有丰富的教学经验, 采用的最新教学方案,针对不同特点的会员,量身制定个性化的专业训练计划及个人营养咨询，使每一位会员都能轻松完成健身及运动目标，享受完美体形', '海南中佳健康发展有限公司', '<p>海南中佳健康创建于2017年1月，现主要负责海口经济学院游泳馆和拳星健身俱乐部两大健身场所的经营与管理。</p><p>中佳健康游泳馆占地5000平方米，建筑面积6000平方米，现在游泳馆有室内标准泳池和室外游泳池两个泳池，以及3000平配套场地和700平方米木屋等四个主要设施。室内标准泳池能承接各类游泳比赛；游泳馆除了能满足海口经济学院的日常教学和省内游泳竞技比赛外，还配套了餐饮木屋、台球厅、跆拳道室、泳具房、淋浴房等各类服务设施。</p><p>中佳健康拳星健身俱乐部位于海经院拳星时代体育学院一楼西侧，占地1500平方米，是一所已建成的最先进、最标准的专业运动场所。俱乐部以“运动的脉搏”为设计理念，合理地划分出不同功能区，不仅打造出了一个动感、安全、舒适的健身空间，还能使帮助大家释放压力，享受娱乐和放松心情。俱乐部内部分为力量区、哑铃区、跑步机区、综合操厅、私教厅、体测室、动感单车房、亚运会拳击比赛台、更衣室等功能区域。俱乐部还开设了时尚流行的瑜伽、街舞、肚皮舞、健美操、拉丁舞、普拉提、动感单车、拳击操等丰富多样的课程，科学、时尚的课程，融健身、健美于一体，可以满足所有健身男女的需要。2017年10月俱乐部建成伊始就已成为沙滩排球国家队男队与女队的冬训基地。</p><p>中佳健康拥有一支精诚团结、技术水平一流的专业教练队伍。我们的教练队伍拥有丰富的教学经验, 采用的最新教学方案,针对不同特点的会员,量身制定个性化的专业训练计划及个人营养咨询，使每一位会员都能轻松完成健身及运动目标，享受完美体形。</p><p>公司员工均以“细致专心、客户至上”为工作第一要求，力争为每位会员提供周到、详尽的服务。</p><p>中佳健康积极相应国家全民健身的号召，乘政策东风投身高校体育健康的宏伟盛业，在海南昆仑体育文化股份有限公司的领导下，扎根海经服务社会，打造一个海南高校内项目齐全、环境舒适、培训专业和服务优质的健身体系，以科学快乐的健身理念和舒适活力的健身氛围引领高校体育风潮。</p>', 'http://127.0.0.1:7001/public/images/compy_img2.png', '海南省海口市桂林洋高校区海口经济学院工程大楼副楼2楼', 'www.cecezhn.com', 'zhncece@163.com', '0898-65731291', 1, 0, '1899-12-30 01:00:00', '2020-11-09 16:35:22', NULL);
INSERT INTO `mzc-company` VALUES (3, 14, '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南海经院机动车驾驶培训有限公司', '<p>海南中佳健康创建于2017年1月，现主要负责海口经济学院游泳馆和拳星健身俱乐部两大健身场所的经营与管理。</p><p>中佳健康游泳馆占地5000平方米，建筑面积6000平方米，现在游泳馆有室内标准泳池和室外游泳池两个泳池，以及3000平配套场地和700平方米木屋等四个主要设施。室内标准泳池能承接各类游泳比赛；游泳馆除了能满足海口经济学院的日常教学和省内游泳竞技比赛外，还配套了餐饮木屋、台球厅、跆拳道室、泳具房、淋浴房等各类服务设施。</p><p>中佳健康拳星健身俱乐部位于海经院拳星时代体育学院一楼西侧，占地1500平方米，是一所已建成的最先进、最标准的专业运动场所。俱乐部以“运动的脉搏”为设计理念，合理地划分出不同功能区，不仅打造出了一个动感、安全、舒适的健身空间，还能使帮助大家释放压力，享受娱乐和放松心情。俱乐部内部分为力量区、哑铃区、跑步机区、综合操厅、私教厅、体测室、动感单车房、亚运会拳击比赛台、更衣室等功能区域。俱乐部还开设了时尚流行的瑜伽、街舞、肚皮舞、健美操、拉丁舞、普拉提、动感单车、拳击操等丰富多样的课程，科学、时尚的课程，融健身、健美于一体，可以满足所有健身男女的需要。2017年10月俱乐部建成伊始就已成为沙滩排球国家队男队与女队的冬训基地。</p><p>中佳健康拥有一支精诚团结、技术水平一流的专业教练队伍。我们的教练队伍拥有丰富的教学经验, 采用的最新教学方案,针对不同特点的会员,量身制定个性化的专业训练计划及个人营养咨询，使每一位会员都能轻松完成健身及运动目标，享受完美体形。</p>', 'http://127.0.0.1:7001/public/images/compy_img2.png', '海南省海口市桂林洋高校区海口经济学院工程大楼副楼3楼', 'www.cecezhn.com', 'zhncece@163.com', '0898-65731291', 1, 0, '1899-12-30 01:00:00', '2020-11-06 17:27:14', NULL);
INSERT INTO `mzc-company` VALUES (4, 15, '海南昆仑体育文化股份有限公司', '海南中环能检测技术有限公司是一家综合性、专业性的第三方环境服务检测机构，2014年取得省计量认证CMA资质，可向社会独立出具公正环境检测数据', '环境及生态调查与评估、环保竣工验收、环境影响评价、排污许可申报、大气环境检测（废气、室内空气、油烟等）、水环境检测（生活饮用水、海水、地下水、废水等）、土壤环境检测（固体废物、底泥等）、声环境检测、油气回收等', '海南中环能检测技术有限公司', '<p>海南中环能检测技术有限公司是一家综合性、专业性的第三方环境服务检测机构，2014年取得省计量认证CMA资质，可向社会独立出具公正环境检测数据。公司自成立以来，以创建环境检测名牌实验室为目标，以严谨检测为依托，以诚信服务为后盾，以科学品质为保证，全方位致力于环保技术开发、服务、咨询。公司可提供的服务项目具体包括：环境及生态调查与评估、环保竣工验收、环境影响评价、排污许可申报、大气环境检测（废气、室内空气、油烟等）、水环境检测（生活饮用水、海水、地下水、废水等）、土壤环境检测（固体废物、底泥等）、声环境检测、油气回收等。</p>\r\n<p>公司现有员工70余人，其中具有高级、中级、初级职称的技术人员近40人；公司1400余平米的标准化实验室内配备有国内外高端环境检测设备，如GC-MS、ICP-MS、气相色谱仪、离子色谱仪等。公司自开办以来，良好的信誉和专业的技术，为各县市环保、水务等主管部门以及各大企业、公司解决了众多难题，赢得了广大客户和社会的信赖。</p>\r\n<p>志存高远，锐意进取，作为综合性、专业性的检测机构，中环能检测技术有限公司将不断探索求新，勇攀高峰。</p>', 'http://127.0.0.1:7001/public/images/compy_img1.png', '海南省海口市桂林洋高校区海口经济学院工程大楼副楼二楼', 'www.cecezhn.com', 'zhncece@163.com', '0898-65731291', 1, 0, '1899-12-30 01:00:00', '2020-11-06 17:25:17', NULL);
INSERT INTO `mzc-company` VALUES (5, 15, '海南昆仑体育文化股份有限公司', '海南中佳健康创建于2017年1月，现主要负责海口经济学院游泳馆和拳星健身俱乐部两大健身场所的经营与管理。', '中佳健康拥有一支精诚团结、技术水平一流的专业教练队伍。我们的教练队伍拥有丰富的教学经验, 采用的最新教学方案,针对不同特点的会员,量身制定个性化的专业训练计划及个人营养咨询，使每一位会员都能轻松完成健身及运动目标，享受完美体形', '海南中佳健康发展有限公司', '<p>海南中佳健康创建于2017年1月，现主要负责海口经济学院游泳馆和拳星健身俱乐部两大健身场所的经营与管理。</p><p>中佳健康游泳馆占地5000平方米，建筑面积6000平方米，现在游泳馆有室内标准泳池和室外游泳池两个泳池，以及3000平配套场地和700平方米木屋等四个主要设施。室内标准泳池能承接各类游泳比赛；游泳馆除了能满足海口经济学院的日常教学和省内游泳竞技比赛外，还配套了餐饮木屋、台球厅、跆拳道室、泳具房、淋浴房等各类服务设施。</p><p>中佳健康拳星健身俱乐部位于海经院拳星时代体育学院一楼西侧，占地1500平方米，是一所已建成的最先进、最标准的专业运动场所。俱乐部以“运动的脉搏”为设计理念，合理地划分出不同功能区，不仅打造出了一个动感、安全、舒适的健身空间，还能使帮助大家释放压力，享受娱乐和放松心情。俱乐部内部分为力量区、哑铃区、跑步机区、综合操厅、私教厅、体测室、动感单车房、亚运会拳击比赛台、更衣室等功能区域。俱乐部还开设了时尚流行的瑜伽、街舞、肚皮舞、健美操、拉丁舞、普拉提、动感单车、拳击操等丰富多样的课程，科学、时尚的课程，融健身、健美于一体，可以满足所有健身男女的需要。2017年10月俱乐部建成伊始就已成为沙滩排球国家队男队与女队的冬训基地。</p><p>中佳健康拥有一支精诚团结、技术水平一流的专业教练队伍。我们的教练队伍拥有丰富的教学经验, 采用的最新教学方案,针对不同特点的会员,量身制定个性化的专业训练计划及个人营养咨询，使每一位会员都能轻松完成健身及运动目标，享受完美体形。</p><p>公司员工均以“细致专心、客户至上”为工作第一要求，力争为每位会员提供周到、详尽的服务。</p><p>中佳健康积极相应国家全民健身的号召，乘政策东风投身高校体育健康的宏伟盛业，在海南昆仑体育文化股份有限公司的领导下，扎根海经服务社会，打造一个海南高校内项目齐全、环境舒适、培训专业和服务优质的健身体系，以科学快乐的健身理念和舒适活力的健身氛围引领高校体育风潮。</p>', 'http://127.0.0.1:7001/public/images/compy_img2.png', '海南省海口市桂林洋高校区海口经济学院工程大楼副楼二楼', 'www.cecezhn.com', 'zhncece@163.com', '0898-65731291', 1, 0, '1899-12-30 01:00:00', NULL, NULL);
INSERT INTO `mzc-company` VALUES (6, 15, '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南海经院机动车驾驶培训有限公司', '<p>海南中佳健康创建于2017年1月，现主要负责海口经济学院游泳馆和拳星健身俱乐部两大健身场所的经营与管理。</p><p>中佳健康游泳馆占地5000平方米，建筑面积6000平方米，现在游泳馆有室内标准泳池和室外游泳池两个泳池，以及3000平配套场地和700平方米木屋等四个主要设施。室内标准泳池能承接各类游泳比赛；游泳馆除了能满足海口经济学院的日常教学和省内游泳竞技比赛外，还配套了餐饮木屋、台球厅、跆拳道室、泳具房、淋浴房等各类服务设施。</p><p>中佳健康拳星健身俱乐部位于海经院拳星时代体育学院一楼西侧，占地1500平方米，是一所已建成的最先进、最标准的专业运动场所。俱乐部以“运动的脉搏”为设计理念，合理地划分出不同功能区，不仅打造出了一个动感、安全、舒适的健身空间，还能使帮助大家释放压力，享受娱乐和放松心情。俱乐部内部分为力量区、哑铃区、跑步机区、综合操厅、私教厅、体测室、动感单车房、亚运会拳击比赛台、更衣室等功能区域。俱乐部还开设了时尚流行的瑜伽、街舞、肚皮舞、健美操、拉丁舞、普拉提、动感单车、拳击操等丰富多样的课程，科学、时尚的课程，融健身、健美于一体，可以满足所有健身男女的需要。2017年10月俱乐部建成伊始就已成为沙滩排球国家队男队与女队的冬训基地。</p><p>中佳健康拥有一支精诚团结、技术水平一流的专业教练队伍。我们的教练队伍拥有丰富的教学经验, 采用的最新教学方案,针对不同特点的会员,量身制定个性化的专业训练计划及个人营养咨询，使每一位会员都能轻松完成健身及运动目标，享受完美体形。</p>', 'http://127.0.0.1:7001/public/images/compy_img2.png', '海南省海口市桂林洋高校区海口经济学院工程大楼副楼二楼', 'www.cecezhn.com', 'zhncece@163.com', '0898-65731291', 1, 0, '1899-12-30 01:00:00', '2020-11-09 08:55:21', NULL);
INSERT INTO `mzc-company` VALUES (7, 14, '123', '123', '123', '123', '<p>123</p>', 'http://127.0.0.1:7001/public/uploads/20201109/1604887345229.png', '123', '123', '123', '', 1, 0, '2020-11-09 10:02:09', '2020-11-09 10:02:32', NULL);
INSERT INTO `mzc-company` VALUES (8, 14, '123', '123', '123', '12', '<p>123123</p>', '', '', '', '', '', 1, 1, '2020-11-10 10:10:32', '2020-11-10 10:10:32', NULL);
INSERT INTO `mzc-company` VALUES (9, 14, '123', '123', '123', '1', '<p>123123</p>', '', '', '', '', '', 1, 1, '2020-11-10 10:12:28', '2020-11-10 10:12:28', NULL);

-- ----------------------------
-- Table structure for mzc-culture
-- ----------------------------
DROP TABLE IF EXISTS `mzc-culture`;
CREATE TABLE `mzc-culture`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `category_id` int(11) NOT NULL DEFAULT 0 COMMENT '分类id',
  `title` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '海南昆仑体育文化股份有限公司' COMMENT '网站标题',
  `keywords` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '海南昆仑体育文化股份有限公司' COMMENT '公司关键词',
  `companyDescription` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '海南昆仑体育文化股份有限公司' COMMENT '公司描述',
  `cultureTitle` varchar(60) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '标题',
  `cultureDescription` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '描述',
  `filepath` varchar(150) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '图片',
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '内容',
  `click` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT '点击次数',
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `sort` int(11) NOT NULL DEFAULT 0,
  `created_at` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `deleted_at` datetime(0) NULL DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mzc-culture
-- ----------------------------
INSERT INTO `mzc-culture` VALUES (1, 17, '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '1', '1', 'http://127.0.0.1:7001/public/images/wh_img1.png', '<p>本项赛事是经国家体育总局批准列入《全国性单项体育协会竞技体育重要赛事名录》的国家级重要赛事，由国家体育总局排球运动管理中心、海南省旅游和文化广电体育厅、海口市人民政府主办，海口市文化广电出版体育局大力支持，由CCTV-5提供实况转播。</p>\n<p><img src=\"/public/images/banner.png\" alt=\"\" /></p>', 130, 1, 0, '2020-08-19 09:39:04', '2020-11-12 10:25:06', NULL);
INSERT INTO `mzc-culture` VALUES (2, 18, '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '团建强基础，党建上台阶”主题党日活动总结', '为了贯彻落实学校党委工作部署精神，在党委指导和支持下，昆仑股份党支部以培养昆仑股份团队凝聚力为着手点，以创新拓展培训为形式，以“党员做先锋、支部成堡垒”为主要内容，开展了“团建强基础，党建上台阶”主题党日活动。党支部的全体党员、预备党员、入党积极分子及公司其他员工一百余人次积极参加了这次的活动。', 'http://127.0.0.1:7001/public/images/wh_img2.png', '<p>本项赛事是经国家体育总局批准列入《全国性单项体育协会竞技体育重要赛事名录》的国家级重要赛事，由国家体育总局排球运动管理中心、海南省旅游和文化广电体育厅、海口市人民政府主办，海口市文化广电出版体育局大力支持，由CCTV-5提供实况转播。</p><p><img src=\"/public/images/banner.png\" alt=\"\"></p>', 4, 1, 0, '2020-08-19 09:39:04', '2020-11-12 15:46:49', NULL);
INSERT INTO `mzc-culture` VALUES (3, 18, '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '团建强基础，党建上台阶”主题党日活动总结', '', '', '<p>本项赛事是经国家体育总局批准列入《全国性单项体育协会竞技体育重要赛事名录》的国家级重要赛事，由国家体育总局排球运动管理中心、海南省旅游和文化广电体育厅、海口市人民政府主办，海口市文化广电出版体育局大力支持，由CCTV-5提供实况转播。</p><p><img src=\"/public/images/banner.png\" alt=\"\"></p>', 3, 1, 0, '2020-08-19 09:39:04', '2020-11-12 15:46:52', NULL);
INSERT INTO `mzc-culture` VALUES (4, 19, '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '团建强基础，党建上台阶”主题党日活动总结', '', '', '<p>本项赛事是经国家体育总局批准列入《全国性单项体育协会竞技体育重要赛事名录》的国家级重要赛事，由国家体育总局排球运动管理中心、海南省旅游和文化广电体育厅、海口市人民政府主办，海口市文化广电出版体育局大力支持，由CCTV-5提供实况转播。</p><p><img src=\"/public/images/banner.png\" alt=\"\"></p>', 1, 1, 0, '2020-08-19 09:39:04', '2020-11-12 15:44:35', NULL);
INSERT INTO `mzc-culture` VALUES (5, 19, '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '团建强基础，党建上台阶”主题党日活动总结', '', '', '<p>本项赛事是经国家体育总局批准列入《全国性单项体育协会竞技体育重要赛事名录》的国家级重要赛事，由国家体育总局排球运动管理中心、海南省旅游和文化广电体育厅、海口市人民政府主办，海口市文化广电出版体育局大力支持，由CCTV-5提供实况转播。</p><p><img src=\"/public/images/banner.png\" alt=\"\"></p>', 2, 1, 0, '2020-08-19 09:39:04', '2020-08-25 15:27:39', NULL);
INSERT INTO `mzc-culture` VALUES (6, 20, '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '团建强基础，党建上台阶”主题党日活动总结', '', '', '<p>本项赛事是经国家体育总局批准列入《全国性单项体育协会竞技体育重要赛事名录》的国家级重要赛事，由国家体育总局排球运动管理中心、海南省旅游和文化广电体育厅、海口市人民政府主办，海口市文化广电出版体育局大力支持，由CCTV-5提供实况转播。</p><p><img src=\"/public/images/banner.png\" alt=\"\"></p>', 7, 1, 0, '2020-08-19 09:39:04', '2020-11-12 15:44:41', NULL);
INSERT INTO `mzc-culture` VALUES (7, 17, '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '2', '2', '', '<p>本项赛事是经国家体育总局批准列入《全国性单项体育协会竞技体育重要赛事名录》的国家级重要赛事，由国家体育总局排球运动管理中心、海南省旅游和文化广电体育厅、海口市人民政府主办，海口市文化广电出版体育局大力支持，由CCTV-5提供实况转播。</p><p><img src=\"/public/images/banner.png\" alt=\"\"></p>', 71, 1, 0, '2020-08-19 09:39:04', '2020-11-12 09:54:37', NULL);
INSERT INTO `mzc-culture` VALUES (8, 17, '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '3', '3', '', '<p>本项赛事是经国家体育总局批准列入《全国性单项体育协会竞技体育重要赛事名录》的国家级重要赛事，由国家体育总局排球运动管理中心、海南省旅游和文化广电体育厅、海口市人民政府主办，海口市文化广电出版体育局大力支持，由CCTV-5提供实况转播。</p><p><img src=\"/public/images/banner.png\" alt=\"\"></p>', 1, 1, 0, '2020-08-19 09:39:04', '2020-11-12 10:23:29', NULL);
INSERT INTO `mzc-culture` VALUES (9, 17, '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '4', '4', '', '<p>本项赛事是经国家体育总局批准列入《全国性单项体育协会竞技体育重要赛事名录》的国家级重要赛事，由国家体育总局排球运动管理中心、海南省旅游和文化广电体育厅、海口市人民政府主办，海口市文化广电出版体育局大力支持，由CCTV-5提供实况转播。</p><p><img src=\"/public/images/banner.png\" alt=\"\"></p>', 72, 1, 0, '2020-08-19 09:39:04', '2020-11-12 10:08:27', NULL);
INSERT INTO `mzc-culture` VALUES (10, 17, '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '5', '5', '', '<p>本项赛事是经国家体育总局批准列入《全国性单项体育协会竞技体育重要赛事名录》的国家级重要赛事，由国家体育总局排球运动管理中心、海南省旅游和文化广电体育厅、海口市人民政府主办，海口市文化广电出版体育局大力支持，由CCTV-5提供实况转播。</p><p><img src=\"/public/images/banner.png\" alt=\"\"></p>', 6, 1, 0, '2020-08-19 09:39:04', '2020-11-12 10:30:16', NULL);
INSERT INTO `mzc-culture` VALUES (11, 17, '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '6', '6', '', '<p>本项赛事是经国家体育总局批准列入《全国性单项体育协会竞技体育重要赛事名录》的国家级重要赛事，由国家体育总局排球运动管理中心、海南省旅游和文化广电体育厅、海口市人民政府主办，海口市文化广电出版体育局大力支持，由CCTV-5提供实况转播。</p><p><img src=\"/public/images/banner.png\" alt=\"\"></p>', 6, 1, 0, '2020-08-19 09:39:04', '2020-11-12 15:46:43', NULL);
INSERT INTO `mzc-culture` VALUES (12, 17, '123', '123', '123', '7', '7', 'http://127.0.0.1:7001/public/uploads/20201110/1604974493815.jpg', '<p>123</p>', 146, 1, 0, '2020-11-10 10:14:58', '2020-11-12 15:46:57', NULL);

-- ----------------------------
-- Table structure for mzc-exception
-- ----------------------------
DROP TABLE IF EXISTS `mzc-exception`;
CREATE TABLE `mzc-exception`  (
  `id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '群组id',
  `user_id` int(8) NOT NULL DEFAULT 0 COMMENT '用户id',
  `ip` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT 'IP地址',
  `headers` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '头部信息',
  `api` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '访问接口',
  `created_at` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `deleted_at` datetime(0) NULL DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mzc-exception
-- ----------------------------
INSERT INTO `mzc-exception` VALUES (1, 6, '127.0.0.1', '{\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsInVzZXJSb2xlc0lkIjo0LCJpYXQiOjE2MDgwMzM4MzUsImV4cCI6MTYwODA0ODIzNX0.7LpxD4Vrk63YgF4scTkzxK7PjZIxJongKTTKRpO97n4\",\"content-type\":\"application/x-www-form-urlencoded\",\"user-agent\":\"PostmanRuntime/7.15.0\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"2584f04f-e60f-4520-8d19-2e29b483c474\",\"host\":\"127.0.0.1:7001\",\"accept-encoding\":\"gzip, deflate\",\"connection\":\"keep-alive\"}', '/api/menu/index', '2020-12-15 20:10:29', '2020-12-15 20:10:29', NULL);
INSERT INTO `mzc-exception` VALUES (2, 6, '127.0.0.1', '{\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsInVzZXJSb2xlc0lkIjo0LCJpYXQiOjE2MDgwMzM4MzUsImV4cCI6MTYwODA0ODIzNX0.7LpxD4Vrk63YgF4scTkzxK7PjZIxJongKTTKRpO97n4\",\"content-type\":\"application/x-www-form-urlencoded\",\"user-agent\":\"PostmanRuntime/7.15.0\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"e33a115c-f218-485c-ba54-ab0dcf92e47a\",\"host\":\"127.0.0.1:7001\",\"accept-encoding\":\"gzip, deflate\",\"connection\":\"keep-alive\"}', '/api/menu/index', '2020-12-15 20:11:40', '2020-12-15 20:11:40', NULL);
INSERT INTO `mzc-exception` VALUES (3, 3, '127.0.0.1', '{\"host\":\"127.0.0.1:7001\",\"connection\":\"keep-alive\",\"pragma\":\"no-cache\",\"cache-control\":\"no-cache\",\"sec-ch-ua\":\"\\\"Google Chrome\\\";v=\\\"87\\\", \\\" Not;A Brand\\\";v=\\\"99\\\", \\\"Chromium\\\";v=\\\"87\\\"\",\"accept\":\"application/json, text/plain, */*\",\"sec-ch-ua-mobile\":\"?0\",\"user-agent\":\"Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36\",\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJSb2xlc0lkIjozLCJpYXQiOjE2MDgwODAzNjUsImV4cCI6MTYwODA5NDc2NX0.PaVz_wDmv2p9ajBfewI81eoQ_2xmp5Mg9cwYsnS8k8U\",\"origin\":\"http://localhost:9528\",\"sec-fetch-site\":\"cross-site\",\"sec-fetch-mode\":\"cors\",\"sec-fetch-dest\":\"empty\",\"referer\":\"http://localhost:9528/\",\"accept-encoding\":\"gzip, deflate, br\",\"accept-language\":\"zh-CN,zh;q=0.9\"}', '/api/services/list', '2020-12-16 08:59:29', '2020-12-16 08:59:29', NULL);
INSERT INTO `mzc-exception` VALUES (4, 1, '127.0.0.1', '{\"host\":\"127.0.0.1:7001\",\"connection\":\"keep-alive\",\"pragma\":\"no-cache\",\"cache-control\":\"no-cache\",\"sec-ch-ua\":\"\\\"Google Chrome\\\";v=\\\"87\\\", \\\" Not;A Brand\\\";v=\\\"99\\\", \\\"Chromium\\\";v=\\\"87\\\"\",\"accept\":\"application/json, text/plain, */*\",\"sec-ch-ua-mobile\":\"?0\",\"user-agent\":\"Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36\",\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJSb2xlc0lkIjoxLCJpYXQiOjE2MDgwODM1MTYsImV4cCI6MTYwODA5NzkxNn0.y0WKzofZXxUSfsEAccrnPYtEdCh5eIhH1qDNtqd-f4M\",\"origin\":\"http://localhost:9528\",\"sec-fetch-site\":\"cross-site\",\"sec-fetch-mode\":\"cors\",\"sec-fetch-dest\":\"empty\",\"referer\":\"http://localhost:9528/\",\"accept-encoding\":\"gzip, deflate, br\",\"accept-language\":\"zh-CN,zh;q=0.9\"}', '/api/menu/index', '2020-12-16 09:54:36', '2020-12-16 09:54:36', NULL);
INSERT INTO `mzc-exception` VALUES (5, 1, '127.0.0.1', '{\"host\":\"127.0.0.1:7001\",\"connection\":\"keep-alive\",\"pragma\":\"no-cache\",\"cache-control\":\"no-cache\",\"sec-ch-ua\":\"\\\"Google Chrome\\\";v=\\\"87\\\", \\\" Not;A Brand\\\";v=\\\"99\\\", \\\"Chromium\\\";v=\\\"87\\\"\",\"accept\":\"application/json, text/plain, */*\",\"sec-ch-ua-mobile\":\"?0\",\"user-agent\":\"Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36\",\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJSb2xlc0lkIjoxLCJpYXQiOjE2MDgwODM1MTYsImV4cCI6MTYwODA5NzkxNn0.y0WKzofZXxUSfsEAccrnPYtEdCh5eIhH1qDNtqd-f4M\",\"origin\":\"http://localhost:9528\",\"sec-fetch-site\":\"cross-site\",\"sec-fetch-mode\":\"cors\",\"sec-fetch-dest\":\"empty\",\"referer\":\"http://localhost:9528/\",\"accept-encoding\":\"gzip, deflate, br\",\"accept-language\":\"zh-CN,zh;q=0.9\"}', '/api/menu/index', '2020-12-16 09:54:44', '2020-12-16 09:54:44', NULL);
INSERT INTO `mzc-exception` VALUES (6, 1, '127.0.0.1', '{\"host\":\"127.0.0.1:7001\",\"connection\":\"keep-alive\",\"pragma\":\"no-cache\",\"cache-control\":\"no-cache\",\"sec-ch-ua\":\"\\\"Google Chrome\\\";v=\\\"87\\\", \\\" Not;A Brand\\\";v=\\\"99\\\", \\\"Chromium\\\";v=\\\"87\\\"\",\"accept\":\"application/json, text/plain, */*\",\"sec-ch-ua-mobile\":\"?0\",\"user-agent\":\"Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36\",\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJSb2xlc0lkIjoxLCJpYXQiOjE2MDgwODM1MTYsImV4cCI6MTYwODA5NzkxNn0.y0WKzofZXxUSfsEAccrnPYtEdCh5eIhH1qDNtqd-f4M\",\"origin\":\"http://localhost:9528\",\"sec-fetch-site\":\"cross-site\",\"sec-fetch-mode\":\"cors\",\"sec-fetch-dest\":\"empty\",\"referer\":\"http://localhost:9528/\",\"accept-encoding\":\"gzip, deflate, br\",\"accept-language\":\"zh-CN,zh;q=0.9\"}', '/api/menu/index', '2020-12-16 09:56:29', '2020-12-16 09:56:29', NULL);
INSERT INTO `mzc-exception` VALUES (7, 1, '127.0.0.1', '{\"host\":\"127.0.0.1:7001\",\"connection\":\"keep-alive\",\"pragma\":\"no-cache\",\"cache-control\":\"no-cache\",\"sec-ch-ua\":\"\\\"Google Chrome\\\";v=\\\"87\\\", \\\" Not;A Brand\\\";v=\\\"99\\\", \\\"Chromium\\\";v=\\\"87\\\"\",\"accept\":\"application/json, text/plain, */*\",\"sec-ch-ua-mobile\":\"?0\",\"user-agent\":\"Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36\",\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJSb2xlc0lkIjoxLCJpYXQiOjE2MDgwODM1MTYsImV4cCI6MTYwODA5NzkxNn0.y0WKzofZXxUSfsEAccrnPYtEdCh5eIhH1qDNtqd-f4M\",\"origin\":\"http://localhost:9528\",\"sec-fetch-site\":\"cross-site\",\"sec-fetch-mode\":\"cors\",\"sec-fetch-dest\":\"empty\",\"referer\":\"http://localhost:9528/\",\"accept-encoding\":\"gzip, deflate, br\",\"accept-language\":\"zh-CN,zh;q=0.9\"}', '/api/menu/index', '2020-12-16 09:56:44', '2020-12-16 09:56:44', NULL);
INSERT INTO `mzc-exception` VALUES (8, 1, '127.0.0.1', '{\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJSb2xlc0lkIjoxLCJpYXQiOjE2MDgwODM1MTYsImV4cCI6MTYwODA5NzkxNn0.y0WKzofZXxUSfsEAccrnPYtEdCh5eIhH1qDNtqd-f4M\",\"user-agent\":\"PostmanRuntime/7.15.0\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"e2f48708-3233-49c4-93b4-2c0640a961d9\",\"host\":\"127.0.0.1:7001\",\"accept-encoding\":\"gzip, deflate\",\"connection\":\"keep-alive\"}', '/api/roles/index', '2020-12-16 10:11:43', '2020-12-16 10:11:43', NULL);
INSERT INTO `mzc-exception` VALUES (9, 1, '127.0.0.1', '{\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJSb2xlc0lkIjoxLCJpYXQiOjE2MDgwODM1MTYsImV4cCI6MTYwODA5NzkxNn0.y0WKzofZXxUSfsEAccrnPYtEdCh5eIhH1qDNtqd-f4M\",\"user-agent\":\"PostmanRuntime/7.15.0\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"3a8fefea-483a-45dc-bd28-156ffbc9c52c\",\"host\":\"127.0.0.1:7001\",\"accept-encoding\":\"gzip, deflate\",\"connection\":\"keep-alive\"}', '/api/roles/index', '2020-12-16 10:12:37', '2020-12-16 10:12:37', NULL);
INSERT INTO `mzc-exception` VALUES (10, 1, '127.0.0.1', '{\"host\":\"127.0.0.1:7001\",\"connection\":\"keep-alive\",\"sec-ch-ua\":\"\\\"Google Chrome\\\";v=\\\"87\\\", \\\" Not;A Brand\\\";v=\\\"99\\\", \\\"Chromium\\\";v=\\\"87\\\"\",\"accept\":\"application/json, text/plain, */*\",\"sec-ch-ua-mobile\":\"?0\",\"user-agent\":\"Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36\",\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJSb2xlc0lkIjoxLCJpYXQiOjE2MDgxMDY5MjksImV4cCI6MTYwODEyMTMyOX0.eIzzhqGzn3wbhPR7TTzzPBBjen_cCl0fe7LS8JQEeAs\",\"origin\":\"http://localhost:9528\",\"sec-fetch-site\":\"cross-site\",\"sec-fetch-mode\":\"cors\",\"sec-fetch-dest\":\"empty\",\"referer\":\"http://localhost:9528/\",\"accept-encoding\":\"gzip, deflate, br\",\"accept-language\":\"zh-CN,zh;q=0.9\"}', '/api/routes/index', '2020-12-16 16:22:10', '2020-12-16 16:22:10', NULL);
INSERT INTO `mzc-exception` VALUES (11, 1, '127.0.0.1', '{\"host\":\"127.0.0.1:7001\",\"connection\":\"keep-alive\",\"pragma\":\"no-cache\",\"cache-control\":\"no-cache\",\"sec-ch-ua\":\"\\\"Google Chrome\\\";v=\\\"87\\\", \\\" Not;A Brand\\\";v=\\\"99\\\", \\\"Chromium\\\";v=\\\"87\\\"\",\"accept\":\"application/json, text/plain, */*\",\"sec-ch-ua-mobile\":\"?0\",\"user-agent\":\"Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36\",\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJSb2xlc0lkIjoxLCJpYXQiOjE2MDgxMDcwMDIsImV4cCI6MTYwODEyMTQwMn0._dkV1UuZzunFwvwRzh0YqixjS9N7sRLHvotT3K7N6w4\",\"origin\":\"http://localhost:9528\",\"sec-fetch-site\":\"cross-site\",\"sec-fetch-mode\":\"cors\",\"sec-fetch-dest\":\"empty\",\"referer\":\"http://localhost:9528/\",\"accept-encoding\":\"gzip, deflate, br\",\"accept-language\":\"zh-CN,zh;q=0.9\"}', '/api/routes/index', '2020-12-16 16:23:56', '2020-12-16 16:23:56', NULL);
INSERT INTO `mzc-exception` VALUES (12, 1, '127.0.0.1', '{\"host\":\"127.0.0.1:7001\",\"connection\":\"keep-alive\",\"pragma\":\"no-cache\",\"cache-control\":\"no-cache\",\"sec-ch-ua\":\"\\\"Google Chrome\\\";v=\\\"87\\\", \\\" Not;A Brand\\\";v=\\\"99\\\", \\\"Chromium\\\";v=\\\"87\\\"\",\"accept\":\"application/json, text/plain, */*\",\"sec-ch-ua-mobile\":\"?0\",\"user-agent\":\"Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36\",\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJSb2xlc0lkIjoxLCJpYXQiOjE2MDgxMDcwMDIsImV4cCI6MTYwODEyMTQwMn0._dkV1UuZzunFwvwRzh0YqixjS9N7sRLHvotT3K7N6w4\",\"origin\":\"http://localhost:9528\",\"sec-fetch-site\":\"cross-site\",\"sec-fetch-mode\":\"cors\",\"sec-fetch-dest\":\"empty\",\"referer\":\"http://localhost:9528/\",\"accept-encoding\":\"gzip, deflate, br\",\"accept-language\":\"zh-CN,zh;q=0.9\"}', '/api/routes/index', '2020-12-16 16:24:03', '2020-12-16 16:24:03', NULL);
INSERT INTO `mzc-exception` VALUES (13, 1, '127.0.0.1', '{\"host\":\"127.0.0.1:7001\",\"connection\":\"keep-alive\",\"pragma\":\"no-cache\",\"cache-control\":\"no-cache\",\"sec-ch-ua\":\"\\\"Google Chrome\\\";v=\\\"87\\\", \\\" Not;A Brand\\\";v=\\\"99\\\", \\\"Chromium\\\";v=\\\"87\\\"\",\"accept\":\"application/json, text/plain, */*\",\"sec-ch-ua-mobile\":\"?0\",\"user-agent\":\"Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36\",\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJSb2xlc0lkIjoxLCJpYXQiOjE2MDgxMDcwMDIsImV4cCI6MTYwODEyMTQwMn0._dkV1UuZzunFwvwRzh0YqixjS9N7sRLHvotT3K7N6w4\",\"origin\":\"http://localhost:9528\",\"sec-fetch-site\":\"cross-site\",\"sec-fetch-mode\":\"cors\",\"sec-fetch-dest\":\"empty\",\"referer\":\"http://localhost:9528/\",\"accept-encoding\":\"gzip, deflate, br\",\"accept-language\":\"zh-CN,zh;q=0.9\"}', '/api/routes/index', '2020-12-16 16:25:10', '2020-12-16 16:25:10', NULL);
INSERT INTO `mzc-exception` VALUES (14, 1, '127.0.0.1', '{\"host\":\"127.0.0.1:7001\",\"connection\":\"keep-alive\",\"pragma\":\"no-cache\",\"cache-control\":\"no-cache\",\"sec-ch-ua\":\"\\\"Google Chrome\\\";v=\\\"87\\\", \\\" Not;A Brand\\\";v=\\\"99\\\", \\\"Chromium\\\";v=\\\"87\\\"\",\"accept\":\"application/json, text/plain, */*\",\"sec-ch-ua-mobile\":\"?0\",\"user-agent\":\"Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36\",\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJSb2xlc0lkIjoxLCJpYXQiOjE2MDgxMDcwMDIsImV4cCI6MTYwODEyMTQwMn0._dkV1UuZzunFwvwRzh0YqixjS9N7sRLHvotT3K7N6w4\",\"origin\":\"http://localhost:9528\",\"sec-fetch-site\":\"cross-site\",\"sec-fetch-mode\":\"cors\",\"sec-fetch-dest\":\"empty\",\"referer\":\"http://localhost:9528/\",\"accept-encoding\":\"gzip, deflate, br\",\"accept-language\":\"zh-CN,zh;q=0.9\"}', '/api/routes/index', '2020-12-16 16:26:08', '2020-12-16 16:26:08', NULL);
INSERT INTO `mzc-exception` VALUES (15, 1, '127.0.0.1', '{\"host\":\"127.0.0.1:7001\",\"connection\":\"keep-alive\",\"pragma\":\"no-cache\",\"cache-control\":\"no-cache\",\"sec-ch-ua\":\"\\\"Google Chrome\\\";v=\\\"87\\\", \\\" Not;A Brand\\\";v=\\\"99\\\", \\\"Chromium\\\";v=\\\"87\\\"\",\"accept\":\"application/json, text/plain, */*\",\"sec-ch-ua-mobile\":\"?0\",\"user-agent\":\"Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36\",\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJSb2xlc0lkIjoxLCJpYXQiOjE2MDgxMDcwMDIsImV4cCI6MTYwODEyMTQwMn0._dkV1UuZzunFwvwRzh0YqixjS9N7sRLHvotT3K7N6w4\",\"origin\":\"http://localhost:9528\",\"sec-fetch-site\":\"cross-site\",\"sec-fetch-mode\":\"cors\",\"sec-fetch-dest\":\"empty\",\"referer\":\"http://localhost:9528/\",\"accept-encoding\":\"gzip, deflate, br\",\"accept-language\":\"zh-CN,zh;q=0.9\"}', '/api/routes/index', '2020-12-16 16:26:22', '2020-12-16 16:26:22', NULL);
INSERT INTO `mzc-exception` VALUES (16, 1, '127.0.0.1', '{\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJSb2xlc0lkIjoxLCJpYXQiOjE2MDg1MTk2NjcsImV4cCI6MTYwODUzNDA2N30.pW67PwM_d_9M7vlIRdKH0Zad8BU5gTypZdCpDTR94LA\",\"user-agent\":\"PostmanRuntime/7.15.0\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"324d0ce6-1f1e-4680-bc6b-e72651cd8831\",\"host\":\"127.0.0.1:7001\",\"accept-encoding\":\"gzip, deflate\",\"connection\":\"keep-alive\"}', '/api/api/index', '2020-12-21 11:42:01', '2020-12-21 11:42:01', NULL);
INSERT INTO `mzc-exception` VALUES (17, 1, '127.0.0.1', '{\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJSb2xlc0lkIjoxLCJpYXQiOjE2MDg1MzkzNzMsImV4cCI6MTYwODU1Mzc3M30.2aXXlSStUSGelIKhXp66Z0X5bwKOTyUqyMdxrvlwA-g\",\"user-agent\":\"PostmanRuntime/7.15.0\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"f7c2aee9-9470-480b-adf8-c0d1a587e9eb\",\"host\":\"127.0.0.1:7001\",\"accept-encoding\":\"gzip, deflate\",\"connection\":\"keep-alive\"}', '/api/routes/list', '2020-12-21 16:58:04', '2020-12-21 16:58:04', NULL);
INSERT INTO `mzc-exception` VALUES (18, 1, '127.0.0.1', '{\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJSb2xlc0lkIjoxLCJpYXQiOjE2MDg1MzkzNzMsImV4cCI6MTYwODU1Mzc3M30.2aXXlSStUSGelIKhXp66Z0X5bwKOTyUqyMdxrvlwA-g\",\"user-agent\":\"PostmanRuntime/7.15.0\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"38f03cbf-8ae0-4813-97b1-26897e5c13b3\",\"host\":\"127.0.0.1:7001\",\"accept-encoding\":\"gzip, deflate\",\"connection\":\"keep-alive\"}', '/api/routes/list', '2020-12-21 16:59:52', '2020-12-21 16:59:52', NULL);
INSERT INTO `mzc-exception` VALUES (19, 1, '127.0.0.1', '{\"host\":\"127.0.0.1:7001\",\"connection\":\"keep-alive\",\"pragma\":\"no-cache\",\"cache-control\":\"no-cache\",\"sec-ch-ua\":\"\\\"Google Chrome\\\";v=\\\"87\\\", \\\" Not;A Brand\\\";v=\\\"99\\\", \\\"Chromium\\\";v=\\\"87\\\"\",\"accept\":\"application/json, text/plain, */*\",\"sec-ch-ua-mobile\":\"?0\",\"user-agent\":\"Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36\",\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJSb2xlc0lkIjoxLCJpYXQiOjE2MDg2ODQyMDgsImV4cCI6MTYwODY5ODYwOH0.J1xfyVncp22SkMnFCG4dbrfdPMa7gZfP66tnwwDrmYI\",\"origin\":\"http://localhost:9528\",\"sec-fetch-site\":\"cross-site\",\"sec-fetch-mode\":\"cors\",\"sec-fetch-dest\":\"empty\",\"referer\":\"http://localhost:9528/\",\"accept-encoding\":\"gzip, deflate, br\",\"accept-language\":\"zh-CN,zh;q=0.9\"}', '/api/aboutSingle/index', '2020-12-23 09:00:55', '2020-12-23 09:00:55', NULL);
INSERT INTO `mzc-exception` VALUES (20, 1, '127.0.0.1', '{\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJSb2xlc0lkIjoxLCJpYXQiOjE2MDg3OTk1NjEsImV4cCI6MTYwODgyMTE2MX0.7vyzOLQdBdDMN8es34vvUJB6RI-WeETOqqHEngGsLn8\",\"user-agent\":\"PostmanRuntime/7.15.0\",\"accept\":\"*/*\",\"cache-control\":\"no-cache\",\"postman-token\":\"3f15f82d-5ac7-408e-af47-a71cfab026a3\",\"host\":\"127.0.0.1:7001\",\"accept-encoding\":\"gzip, deflate\",\"connection\":\"keep-alive\"}', '/api/admin/list', '2020-12-24 18:22:42', '2020-12-24 18:22:42', NULL);

-- ----------------------------
-- Table structure for mzc-menu
-- ----------------------------
DROP TABLE IF EXISTS `mzc-menu`;
CREATE TABLE `mzc-menu`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `pid` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '父id',
  `title` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '0' COMMENT '标题',
  `url` varchar(150) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '#' COMMENT '超链接',
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '状态',
  `sort` tinyint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT '排序',
  `created_at` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `deleted_at` datetime(0) NULL DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 37 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mzc-menu
-- ----------------------------
INSERT INTO `mzc-menu` VALUES (1, 0, '关于我们', 'about', 1, 0, NULL, '2020-10-29 08:59:33', NULL);
INSERT INTO `mzc-menu` VALUES (2, 1, '公司简介', 'about', 1, 0, NULL, '2020-10-30 15:41:53', NULL);
INSERT INTO `mzc-menu` VALUES (3, 1, '企业架构', 'about', 1, 0, NULL, '2020-10-16 17:30:53', NULL);
INSERT INTO `mzc-menu` VALUES (4, 1, '管理团队', 'about', 1, 0, NULL, '2020-10-19 11:34:48', NULL);
INSERT INTO `mzc-menu` VALUES (5, 1, '大事记', 'about', 1, 0, NULL, '2020-09-21 15:15:34', NULL);
INSERT INTO `mzc-menu` VALUES (6, 1, '企业荣誉', 'about', 1, 0, NULL, '2020-09-21 17:25:45', NULL);
INSERT INTO `mzc-menu` VALUES (7, 0, '服务领域', 'services', 1, 0, NULL, '2020-10-19 11:17:18', NULL);
INSERT INTO `mzc-menu` VALUES (8, 7, '体育赛事', 'services', 1, 0, NULL, '2020-11-02 14:44:30', NULL);
INSERT INTO `mzc-menu` VALUES (9, 7, '文化服务', 'services', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-menu` VALUES (10, 7, '电竞教育', 'services', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-menu` VALUES (11, 7, '体验式培训', 'services', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-menu` VALUES (12, 7, '会议会展', 'services', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-menu` VALUES (13, 0, '旗下公司', 'company', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-menu` VALUES (14, 13, '下属公司', 'company', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-menu` VALUES (15, 13, '下属部门', 'company', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-menu` VALUES (16, 0, '企业文化', 'culture', 1, 0, NULL, '2020-10-16 16:42:16', NULL);
INSERT INTO `mzc-menu` VALUES (17, 16, '企业文化', 'culture', 1, 0, NULL, '2020-10-16 16:41:17', NULL);
INSERT INTO `mzc-menu` VALUES (18, 16, '社会责任', 'culture', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-menu` VALUES (19, 16, '员工活动', 'culture', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-menu` VALUES (20, 16, '党建专栏', 'culture', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-menu` VALUES (21, 0, '新闻中心', 'news', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-menu` VALUES (22, 21, '企业新闻', 'news', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-menu` VALUES (23, 21, '行业动态', 'news', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-menu` VALUES (24, 21, '通知公告', 'news', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-menu` VALUES (25, 0, '合作案例', 'cases', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-menu` VALUES (26, 25, '服务案例', 'cases', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-menu` VALUES (27, 25, '合作伙伴', 'cases', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-menu` VALUES (28, 0, '人力资源', 'recruit', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-menu` VALUES (29, 28, '人才理念', 'recruit', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-menu` VALUES (30, 28, '人才招聘', 'recruit', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-menu` VALUES (31, 0, '联系我们', 'contact', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-menu` VALUES (32, 31, '联系方式', 'contact', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-menu` VALUES (33, 31, '在线留言', 'contact', 1, 0, NULL, '2020-10-12 17:28:43', NULL);
INSERT INTO `mzc-menu` VALUES (34, 1, '2', '#', 1, 0, NULL, NULL, '1899-12-30 01:00:00');
INSERT INTO `mzc-menu` VALUES (35, 0, '1', '#', 1, 0, NULL, NULL, '1899-12-30 01:00:00');
INSERT INTO `mzc-menu` VALUES (36, 1, '2', '#', 1, 0, NULL, NULL, '1899-12-30 01:00:00');

-- ----------------------------
-- Table structure for mzc-message
-- ----------------------------
DROP TABLE IF EXISTS `mzc-message`;
CREATE TABLE `mzc-message`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `name` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '姓名',
  `phone` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '电话',
  `email` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '邮箱',
  `title` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '标题',
  `remarks` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '备注',
  `created_at` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `deleted_at` datetime(0) NULL DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mzc-message
-- ----------------------------
INSERT INTO `mzc-message` VALUES (1, '', '', '', '', '', '2020-08-19 17:27:38', '2020-08-19 17:27:38', '2020-08-21 10:21:11');
INSERT INTO `mzc-message` VALUES (2, '123', '', '', '', '', '2020-08-19 17:27:47', '2020-08-19 17:27:47', '2020-08-21 10:21:11');
INSERT INTO `mzc-message` VALUES (3, '1', '', '', '', '', '2020-08-21 10:14:48', '2020-08-21 10:14:48', '2020-08-21 10:21:11');
INSERT INTO `mzc-message` VALUES (4, '123', '123', '123', '123', '', '2020-08-21 10:19:38', '2020-08-21 10:19:38', '2020-08-21 10:21:11');
INSERT INTO `mzc-message` VALUES (5, '123', '123', '123', '123', '', '2020-08-21 10:19:43', '2020-08-21 10:19:43', '2020-08-21 10:21:11');
INSERT INTO `mzc-message` VALUES (6, '123', '123', '123', '123', '', '2020-08-21 10:19:50', '2020-08-21 10:19:50', '2020-08-21 10:21:11');
INSERT INTO `mzc-message` VALUES (7, '123', '123', '123', '123', '123', '2020-08-21 10:21:11', '2020-08-21 10:21:11', '2020-08-21 10:21:11');
INSERT INTO `mzc-message` VALUES (8, '1', '1', '1', '1', '1', '2020-08-25 17:23:09', '2020-08-25 17:23:09', NULL);
INSERT INTO `mzc-message` VALUES (9, '123', '123', '123', '123', '123', '2020-09-02 11:56:15', '2020-09-02 11:56:15', NULL);
INSERT INTO `mzc-message` VALUES (10, '123', '123', '123', '123', '123', '2020-09-02 14:59:05', '2020-09-02 14:59:05', NULL);
INSERT INTO `mzc-message` VALUES (11, '123', '123', '123', '123', '123', '2020-09-02 15:06:26', '2020-09-02 15:06:26', NULL);
INSERT INTO `mzc-message` VALUES (12, '123', '123', '123', '123', '123', '2020-09-02 15:29:25', '2020-09-02 15:29:25', NULL);
INSERT INTO `mzc-message` VALUES (13, '123', '123', '123', '123', '123', '2020-09-22 11:48:17', '2020-09-22 11:48:17', NULL);
INSERT INTO `mzc-message` VALUES (14, '123', '123', '123', '123', '123', '2020-11-19 15:49:05', '2020-11-19 15:49:05', NULL);
INSERT INTO `mzc-message` VALUES (15, '123', '123', '123', '123', '123', '2020-11-19 15:49:15', '2020-11-19 15:49:15', NULL);
INSERT INTO `mzc-message` VALUES (16, '123', '123', '123', '123', '123', '2020-11-19 15:50:23', '2020-11-19 15:50:23', NULL);

-- ----------------------------
-- Table structure for mzc-news
-- ----------------------------
DROP TABLE IF EXISTS `mzc-news`;
CREATE TABLE `mzc-news`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `category_id` int(11) NOT NULL DEFAULT 0 COMMENT '分类id',
  `title` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '海南昆仑体育文化股份有限公司' COMMENT '网站标题',
  `keywords` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '海南昆仑体育文化股份有限公司' COMMENT '公司关键词',
  `companyDescription` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '海南昆仑体育文化股份有限公司' COMMENT '公司描述',
  `cultureTitle` varchar(60) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '标题',
  `cultureDescription` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '描述',
  `filepath` varchar(150) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '图片',
  `content` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL COMMENT '内容',
  `click` mediumint(8) UNSIGNED NOT NULL DEFAULT 0 COMMENT '点击次数',
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `sort` int(11) NOT NULL DEFAULT 0,
  `created_at` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `deleted_at` datetime(0) NULL DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mzc-news
-- ----------------------------
INSERT INTO `mzc-news` VALUES (1, 22, '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '团建强基础，党建上台阶”主题党日活动总结', '为了贯彻落实学校党委工作部署精神，在党委指导和支持下，昆仑股份党支部以培养昆仑股份团队凝聚力为着手点，以创新拓展培训为形式，以“党员做先锋、支部成堡垒”为主要内容，开展了“团建强基础，党建上台阶”主题党日活动。党支部的全体党员、预备党员、入党积极分子及公司其他员工一百余人次积极参加了这次的活动。', 'http://127.0.0.1:7001/public/images/wh_img1.png', '<p>本项赛事是经国家体育总局批准列入《全国性单项体育协会竞技体育重要赛事名录》的国家级重要赛事，由国家体育总局排球运动管理中心、海南省旅游和文化广电体育厅、海口市人民政府主办，海口市文化广电出版体育局大力支持，由CCTV-5提供实况转播。</p><p><img src=\"/public/images/banner.png\" alt=\"\"></p>', 20, 1, 0, '2020-08-19 09:45:05', '2020-11-18 11:12:15', NULL);
INSERT INTO `mzc-news` VALUES (2, 23, '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '团建强基础，党建上台阶”主题党日活动总结', '为了贯彻落实学校党委工作部署精神，在党委指导和支持下，昆仑股份党支部以培养昆仑股份团队凝聚力为着手点，以创新拓展培训为形式，以“党员做先锋、支部成堡垒”为主要内容，开展了“团建强基础，党建上台阶”主题党日活动。党支部的全体党员、预备党员、入党积极分子及公司其他员工一百余人次积极参加了这次的活动。', 'http://127.0.0.1:7001/public/images/wh_img1.png', '22<p>本项赛事是经', 4, 1, 0, '2020-08-19 09:45:05', '2020-11-12 11:53:32', NULL);
INSERT INTO `mzc-news` VALUES (3, 24, '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '团建强基础，党建上台阶”主题党日活动总结', '为了贯彻落实学校党委工作部署精神，在党委指导和支持下，昆仑股份党支部以培养昆仑股份团队凝聚力为着手点，以创新拓展培训为形式，以“党员做先锋、支部成堡垒”为主要内容，开展了“团建强基础，党建上台阶”主题党日活动。党支部的全体党员、预备党员、入党积极分子及公司其他员工一百余人次积极参加了这次的活动。', 'http://127.0.0.1:7001/public/images/wh_img1.png', '<p>本项赛事是经国家体育总局批准列入《全国性单项体育协会竞技体育重要赛事名录》的国家级重要赛事，由国家体育总局排球运动管理中心、海南省旅游和文化广电体育厅、海口市人民政府主办，海口市文化广电出版体育局大力支持，由CCTV-5提供实况转播。</p><p><img src=\"/public/images/banner.png\" alt=\"\"></p>\n', 11, 1, 0, '2020-08-19 09:45:05', '2020-11-27 18:15:01', NULL);
INSERT INTO `mzc-news` VALUES (4, 24, '123', '123', '123', '123', '123123', 'http://127.0.0.1:7001/public/uploads/20201112/1605153557466.jpg', '<p>123</p>', 2, 1, 1, '2020-11-12 11:59:19', '2020-11-12 15:48:05', '2020-11-12 15:48:05');

-- ----------------------------
-- Table structure for mzc-recruit
-- ----------------------------
DROP TABLE IF EXISTS `mzc-recruit`;
CREATE TABLE `mzc-recruit`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `category_id` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '分类id',
  `title` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '海南昆仑体育文化股份有限公司' COMMENT '网站标题',
  `keywords` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '海南昆仑体育文化股份有限公司' COMMENT '公司关键词',
  `companyDescription` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '海南昆仑体育文化股份有限公司' COMMENT '公司描述',
  `position` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '职位' COMMENT '职位',
  `address` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '地址' COMMENT '地址',
  `people` varchar(5) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '人数' COMMENT '人数',
  `education` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '学历' COMMENT '学历',
  `sex` varchar(5) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '性别' COMMENT '性别',
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '内容',
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `sort` int(11) NOT NULL DEFAULT 0,
  `created_at` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `deleted_at` datetime(0) NULL DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `category_id`(`category_id`) USING BTREE,
  CONSTRAINT `mzc-recruit_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `mzc-recruit-droptype` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mzc-recruit
-- ----------------------------
INSERT INTO `mzc-recruit` VALUES (1, 3, '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海外项目管理经理', '海口', '6人', '本科', '男', '<p>岗位职责：<br>1、负责接待到店咨询客户，为其提供专业的课程咨询服务；<br>2、负责开拓和维护招生渠道，发掘意向客户，与其保持良好的沟通与联络。<br><br>岗位要求：<br>1、18-30岁，男女不限，有相关经验优先；2、有学习意识及意愿，头脑聪明灵活，能够快速掌握相关知识技巧。</p>', 1, 0, '2020-08-19 16:48:27', '2020-12-23 09:18:35', NULL);
INSERT INTO `mzc-recruit` VALUES (2, 2, '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '人力资源主办科员', '海口', '6人', '本科', '男', '<p>岗位职责：<br>1、负责接待到店咨询客户，为其提供专业的课程咨询服务；<br>2、负责开拓和维护招生渠道，发掘意向客户，与其保持良好的沟通与联络。<br><br>岗位要求：<br>1、18-30岁，男女不限，有相关经验优先；2、有学习意识及意愿，头脑聪明灵活，能够快速掌握相关知识技巧。</p>', 1, 0, '2020-08-19 16:48:27', '2020-11-17 17:10:36', NULL);
INSERT INTO `mzc-recruit` VALUES (3, 2, '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '招聘主管', '海口', '6人', '本科', '男', '<p>岗位职责：<br>1、负责接待到店咨询客户，为其提供专业的课程咨询服务；<br>2、负责开拓和维护招生渠道，发掘意向客户，与其保持良好的沟通与联络。<br><br>岗位要求：<br>1、18-30岁，男女不限，有相关经验优先；2、有学习意识及意愿，头脑聪明灵活，能够快速掌握相关知识技巧。</p>', 1, 0, '2020-08-19 16:50:11', '2020-11-17 17:10:36', NULL);
INSERT INTO `mzc-recruit` VALUES (4, 4, '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '', '', '', '', '', '<img src=\"/public/images/about_img.png\" alt=\"\"> <h5>海南昆仑体育文化股份有限公司介绍</h5> <p>海南昆仑体育文化股份有限公司成立于2015年，注册资本1亿人民币。公司以学校为基础，积极整合场地、设备、人力等优质资源，搭建与市场对接的常态机制。对外开展业务涉及：大型文艺体育活动及演出、国际文化合作与交流、影视制作投资、品牌策划推广、旅游会议会展、管理咨询、体育赛事服务管理和拓展培训等。下设体育文化事业部、电竞事业部、拓展培训部三个业务部门，以及三家控股子公司，海南海经院机动车驾驶培训有限公司、海南中佳健康发展有限公司、海南中环能监测技术有限公司。</p><p>公司自成立以来，一直遵循“优质、高效、团结、奉献”的工作态度，不骄不躁、严谨踏实，不断谋求新的发展。几年来，经过公司全体员工的不懈努力和开拓进取，陆续在文化、体育等领域发力，经营状况整体良好，2017年实现营业收入5740.22万元，2018年实现营业收入6917.39万元，2019年实现营业收入7300万元。</p><p>重点业务项目概况如下：</p><p>2016年11月，为海口市国贸繁华中心地段的商业中心宜欣城，全程策划执行了重装开业盛典活动，提供了活动执行、舞台搭建和节目表演等整体服务，获得了高度评价和认可，为海南树立了商场开业庆典活动的全新标杆。</p><p>在2017年5月，策划承办了第55届意大利“威尔第之声国际声乐比赛”（中国赛区），该比赛是中华人民共和国文化部推荐的国际一类声乐比赛；是意大利文化（遗产）部重点文化项目，并且是直接认证的唯一声乐比赛。本公司为活动提供了整体的策划实施和组织执行，为活动的成功举办提供了强大的保障。</p><p>在2017、2018、2019连续三年策划承办了全国沙滩排球巡回赛总决赛及颁奖盛典，本活动由国家体育总局排球运动管理中心、海南省旅游和文化广电体育厅、海口市人民政府主办，得到了海口市文化广电出版体育局的大力支持，CCTV5全程直播，由本公司全程策划执行，提供了开幕式、赛事运营、颁奖盛典的策划实施、宣传推广等服务。2019年举办的全国沙滩排球巡回赛总决赛，是历年全国巡回赛中参赛队伍最多的一次,也是国内迄今为止举办成年组沙排赛参与人数最多的一次。颁奖盛典、半决赛和总决赛通过了央视网络端、爱奇艺、新浪等几大网络平台进行全程直播，使赛事的传播及影响力较往年进一步扩大。</p><p>2018年11月、2019年11月连续两年策划承办了“海南国际旅游岛欢乐节·中国-东盟大学生文化周”活动，该活动被划列为第十九届海南国际旅游岛欢乐节的重点版块活动之一。本公司为活动提供了全程策划执行，人员安排组织、舞美物料搭建和宣传推广等整体活动服务，成功搭建了海南与全国及东盟青年之间在文化、教育和艺术交流合作的重要平台，获得了政府部门、海内外各高校和社会各界的一致好评。</p><p>公司在海口经济学院内斥资近千万建设海南省高校内首家电竞体验馆-“昆仑电竞馆”。2017年7月参加腾讯官方英雄联盟全球高校冠军杯以九战九胜全胜战绩一举夺得全球高校冠军杯世界总冠军。2019年昆仑电竞战队获得腾讯第七届英雄联盟高校联赛海南省冠军、南方大区亚军、全国总决赛殿军。2019年第十四届国际动漫博览交易会电竞项目JEL英雄联盟全国高校总决赛冠军等。</p><p>“大海之南•昆仑为巅”，海南昆仑体育文化股份有限公司依托强大的人力和资源优势，凭借着极具创意的策划思维、专业过硬的执行能力、齐心协作的团队精神以及独家优质的平台资源，正逐步在海南崛起。</p>', 1, 0, '2020-08-19 17:08:47', NULL, '1899-12-30 01:00:00');
INSERT INTO `mzc-recruit` VALUES (5, 1, '123', '123', '123', '123', '123', '123', '123', '123', '<p>123</p>', 1, 1, '2020-11-18 08:48:34', '2020-11-18 08:48:34', NULL);
INSERT INTO `mzc-recruit` VALUES (6, 5, '123', '123', '123', '123', '123', '123', '123', '123', '<p>123</p>', 1, 1, '2020-11-18 09:36:34', '2020-11-18 09:36:34', NULL);

-- ----------------------------
-- Table structure for mzc-recruit-droptype
-- ----------------------------
DROP TABLE IF EXISTS `mzc-recruit-droptype`;
CREATE TABLE `mzc-recruit-droptype`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `dropContent` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '下拉内容',
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '状态',
  `sort` int(11) NULL DEFAULT 0 COMMENT '排序',
  `created_at` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `deleted_at` datetime(0) NULL DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mzc-recruit-droptype
-- ----------------------------
INSERT INTO `mzc-recruit-droptype` VALUES (1, '海南中环能检测技术有限公司', 1, 0, '2020-08-19 16:46:53', '2020-11-18 09:36:07', NULL);
INSERT INTO `mzc-recruit-droptype` VALUES (2, '海南中佳健康发展有限公司', 1, 0, '2020-08-19 16:47:11', '2020-08-19 16:47:11', NULL);
INSERT INTO `mzc-recruit-droptype` VALUES (3, '海南海经院机动车驾驶培训有限公司', 1, 0, '2020-08-19 16:47:19', '2020-11-18 09:35:54', NULL);
INSERT INTO `mzc-recruit-droptype` VALUES (4, '', 1, 0, NULL, NULL, '1899-12-30 01:00:00');
INSERT INTO `mzc-recruit-droptype` VALUES (5, '123', 1, 0, '2020-11-18 09:36:19', '2020-11-18 09:36:19', NULL);

-- ----------------------------
-- Table structure for mzc-roles
-- ----------------------------
DROP TABLE IF EXISTS `mzc-roles`;
CREATE TABLE `mzc-roles`  (
  `id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `menu_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '[]' COMMENT '菜单id',
  `api_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '[]' COMMENT '接口id',
  `roles_name` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '角色名称',
  `describe` varchar(60) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '描述',
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '状态',
  `sort` tinyint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT '排序',
  `created_at` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `deleted_at` datetime(0) NULL DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mzc-roles
-- ----------------------------
INSERT INTO `mzc-roles` VALUES (1, '[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]', '[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71]', '超级管理员', '拥有全部权限', 1, 0, NULL, '2020-12-25 16:51:58', NULL);
INSERT INTO `mzc-roles` VALUES (2, '[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]', '[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60]', '管理员', '拥有部分权限（不可修改系统配置）', 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-roles` VALUES (3, '[13,14,15,16,17,18]', '', '编辑', '文章编辑', 1, 0, NULL, '2020-12-23 09:56:47', NULL);
INSERT INTO `mzc-roles` VALUES (4, '', '', '游客', '没有权限（只可访问首页）', 1, 0, NULL, '2020-12-23 09:55:34', NULL);
INSERT INTO `mzc-roles` VALUES (5, '', '', '0', '0', 1, 0, '2020-12-22 12:00:07', '2020-12-23 09:55:25', '2020-12-25 16:00:30');
INSERT INTO `mzc-roles` VALUES (6, '[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]', '[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,58,59,60,50,51,52,53,54,55,56,57,61,62,63,64,65,66]', '测试', '测试专用', 1, 0, '2020-12-22 18:31:39', '2020-12-23 09:52:24', NULL);

-- ----------------------------
-- Table structure for mzc-routes
-- ----------------------------
DROP TABLE IF EXISTS `mzc-routes`;
CREATE TABLE `mzc-routes`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `pid` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '父id',
  `path` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT '' COMMENT 'url路径',
  `name` varchar(20) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT '' COMMENT '路由名字',
  `redirect` varchar(60) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT '' COMMENT '文件路径',
  `title` varchar(60) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT '' COMMENT 'title名字',
  `icon` varchar(60) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT '' COMMENT 'icon图标',
  `affix` tinyint(1) NULL DEFAULT 0 COMMENT 'nav固定',
  `noCache` tinyint(1) NULL DEFAULT 0 COMMENT '关闭缓存',
  `hidden` tinyint(1) NULL DEFAULT 0 COMMENT '是否显示',
  `breadcrumb` tinyint(1) UNSIGNED NULL DEFAULT 1 COMMENT '面包屑中显示',
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '状态',
  `sort` tinyint(3) UNSIGNED NOT NULL DEFAULT 0 COMMENT '排序',
  `created_at` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `deleted_at` datetime(0) NULL DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 30 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mzc-routes
-- ----------------------------
INSERT INTO `mzc-routes` VALUES (1, 0, '/about', 'About', '/about/single', '关于我们', 'el-icon-user-solid', 0, 1, 0, 1, 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-routes` VALUES (2, 1, 'single', 'Single', 'aboutSingle', '单页', '', 0, 1, 0, 1, 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-routes` VALUES (3, 1, 'list', 'List', 'aboutList', '列表', '', 0, 1, 0, 1, 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-routes` VALUES (4, 1, 'classify', 'Classify', 'aboutClassify', '分类', '', 0, 1, 0, 1, 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-routes` VALUES (5, 0, '/services', '', '', '服务领域', '', 0, 1, 0, 1, 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-routes` VALUES (6, 5, 'index', 'Services', 'servicesIndex', '服务领域', 'el-icon-service', 0, 1, 0, 1, 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-routes` VALUES (7, 0, '/company', '', '', '旗下公司', '', 0, 1, 0, 1, 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-routes` VALUES (8, 7, 'index', 'Company', 'companyIndex', '旗下公司', 'company', 0, 1, 0, 1, 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-routes` VALUES (9, 0, '/culture', '', '', '企业文化', '', 0, 1, 0, 1, 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-routes` VALUES (10, 9, 'index', 'Culture', 'cultureIndex', '企业文化', 'culture', 0, 1, 0, 1, 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-routes` VALUES (11, 0, '/news', '', '', '新闻中心', '', 0, 1, 0, 1, 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-routes` VALUES (12, 11, 'index', 'News', 'newsIndex', '新闻中心', 'news', 0, 1, 0, 1, 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-routes` VALUES (13, 0, '/cases', 'Cases', '/cases/case', '服务案例', 'el-icon-suitcase', 0, 1, 0, 1, 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-routes` VALUES (14, 13, 'case', 'Case', 'casesCase', '服务案例', '', 0, 1, 0, 1, 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-routes` VALUES (15, 13, 'partner', 'Partner', 'casesPartner', '合作伙伴', '', 0, 1, 0, 1, 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-routes` VALUES (16, 0, '/recruit', 'recruit', '/recruit/recruit', '人力资源', 'hr', 0, 1, 0, 1, 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-routes` VALUES (17, 16, 'recruit', 'Recruit', 'recruitIndex', '列表', '', 0, 1, 0, 1, 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-routes` VALUES (18, 16, 'recruitList', 'RecruitList', 'recruitList', '分类', '', 0, 1, 0, 1, 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-routes` VALUES (19, 0, '/menu', '', '/menu/index', '菜单', '', 0, 1, 0, 1, 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-routes` VALUES (20, 19, 'index', 'Menus', 'menusIndex', '菜单', 'el-icon-menu', 0, 1, 0, 1, 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-routes` VALUES (21, 0, '/setting', 'setting', '/setting/bsic', '设置', 'el-icon-setting', 0, 1, 0, 1, 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-routes` VALUES (22, 21, 'bsic', 'Bsic', 'settingBsic', '基本设置', '', 0, 1, 0, 1, 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-routes` VALUES (23, 21, 'advertising', 'Advertising', 'settingAdvertising', '广告设置', '', 0, 1, 0, 1, 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-routes` VALUES (24, 0, '/permissions', 'Permissions', '/permissions/roles', '权限管理', 'el-icon-lock', 0, 1, 0, 1, 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-routes` VALUES (25, 24, 'roles', 'Roles', 'permissionsRoles', '角色权限', '', 0, 1, 0, 1, 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-routes` VALUES (26, 24, 'admin', 'Admin', 'permissionsAdmin', '用户权限', '', 0, 1, 0, 1, 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-routes` VALUES (27, 24, 'power', 'Power', 'permissionsPower', '权限管理', '', 0, 1, 0, 1, 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-routes` VALUES (28, 27, 'api', 'Api', 'permissionsPowerApi', '接口权限', '', 0, 1, 0, 1, 1, 0, NULL, NULL, NULL);
INSERT INTO `mzc-routes` VALUES (29, 27, 'menu', 'Menu', 'permissionsPowerMenu', '菜单权限', '', 0, 1, 0, 1, 1, 0, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for mzc-services
-- ----------------------------
DROP TABLE IF EXISTS `mzc-services`;
CREATE TABLE `mzc-services`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `category_id` int(11) NOT NULL DEFAULT 0 COMMENT '分类id',
  `title` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '海南昆仑体育文化股份有限公司' COMMENT '网站标题',
  `keywords` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '海南昆仑体育文化股份有限公司' COMMENT '公司关键词',
  `companyDescription` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '海南昆仑体育文化股份有限公司' COMMENT '公司描述',
  `servicesImage` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '图片',
  `content` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT '单页内容',
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '状态',
  `sort` int(11) NOT NULL DEFAULT 0 COMMENT '排序',
  `created_at` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `deleted_at` datetime(0) NULL DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mzc-services
-- ----------------------------
INSERT INTO `mzc-services` VALUES (1, 8, '海南昆仑体育文化股份有限公司', '海南中环能检测技术有限公司是一家综合性、专业性的第三方环境服务检测机构，2014年取得省计量认证CMA资质，可向社会独立出具公正环境检测数据', '环境及生态调查与评估、环保竣工验收、环境影响评价、排污许可申报、大气环境检测（废气、室内空气、油烟等）、水环境检测（生活饮用水、海水、地下水、废水等）、土壤环境检测（固体废物、底泥等）、声环境检测、油气回收等', 'http://127.0.0.1:7001/public/images/ser_img1.png', '<p>海南中环能检测技术有限公司是一家综合性、专业性的第三方环境服务检测机构，2014年取得省计量认证CMA资质，可向社会独立出具公正环境检测数据。公司自成立以来，以创建环境检测名牌实验室为目标，以严谨检测为依托，以诚信服务为后盾，以科学品质为保证，全方位致力于环保技术开发、服务、咨询。公司可提供的服务项目具体包括：环境及生态调查与评估、环保竣工验收、环境影响评价、排污许可申报、大气环境检测（废气、室内空气、油烟等）、水环境检测（生活饮用水、海水、地下水、废水等）、土壤环境检测（固体废物、底泥等）、声环境检测、油气回收等。</p>\r\n<p>公司现有员工70余人，其中具有高级、中级、初级职称的技术人员近40人；公司1400余平米的标准化实验室内配备有国内外高端环境检测设备，如GC-MS、ICP-MS、气相色谱仪、离子色谱仪等。公司自开办以来，良好的信誉和专业的技术，为各县市环保、水务等主管部门以及各大企业、公司解决了众多难题，赢得了广大客户和社会的信赖。</p>\r\n<p>志存高远，锐意进取，作为综合性、专业性的检测机构，中环能检测技术有限公司将不断探索求新，勇攀高峰。</p>', 1, 0, '2020-08-21 08:12:23', '2020-11-25 15:37:24', NULL);
INSERT INTO `mzc-services` VALUES (2, 9, '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', 'http://127.0.0.1:7001/public/images/ser_img1.png', '<h5>电竞教育</h5><p>2017年伽马调查报告的数据显示，电竞行业规模年复合增长率已经达到46%，电竞行业人才缺口达26万，需求缺口高达83%，人才稀缺是电竞这一新兴产业面临的瓶颈之一。而现有教育教学尚没有针对性人才培养模式，造成专业人才大量缺失，很大程度上制约了电竞行业的发展。</p><p>2016年9月，教育部职业教育与成人教育司公布的《关于做好2017年高等职业学校拟招生专业申报工作的通知》中增补了新专业“电子竞技运动与管理专业”，专业代码670411。</p><p>2017年，昆仑电竞与海口经济学院联合申报了海南省首批“电子竞技运动与管理专业”获得批准，2018年、2019年两届招生人数达200人。通过校企合作，不但引进电竞圈内一线的电竞明星，知名解说，行业专家等为教师提供教学保障，还通过昆仑电竞与国内其他电竞企业、俱乐部展开深度合作为电竞专业学生提供广阔的实习实训、就业平台。</p><p>本专业面向电子竞技企业，以及与电子竞技相关的职业领域的服务、管理一线岗位，主要培养具有良好的电子竞技综合职业能力，掌握一定的专业理论知识，具有较强实践能力的高素质技能型人才。专业主要培养的是电竞产业相关从业人员，包括电竞运动员、教练员、裁判员、职业经纪人、赛事策划与执行、战术与数据分析、场地运营与维护、俱乐部经营与管理、电竞主持与主播、电竞商务等相关人才。</p><p>本专业面向电子竞技企业，以及与电子竞技相关的职业领域的服务、管理一线岗位，主要培养具有良好的电子竞技综合职业能力，掌握一定的专业理论知识，具有较强实践能力的高素质技能型人才。专业主要培养的是电竞产业相关从业人员，包括电竞运动员、教练员、裁判员、职业经纪人、赛事策划与执行、战术与数据分析、场地运营与维护、俱乐部经营与管理、电竞主持与主播、电竞商务等相关人才。</p><h5>电竞赛事</h5><p>组织及参与的赛事：2017年第六届问道杯电子竞技大赛；2018年首届桫椤湾“绝地求生”电竞大赛；WUCG世界大学生电子竞技大赛海南赛区总执行；2018年，成功在海口经济学院举办了首届昆仑杯电子竞技大赛，该赛事共招募队伍79支，报名人数超400余人。赛事举办期间，校园影响力超万人，总决赛当日观赛人数约2700人，座无虚席。昆仑杯的成功举办，为海南电竞赛事奠定了良好基础及赛事的优良口碑，深受海南高校电竞选手的喜爱与追捧。</p><p>继2018年昆仑杯电子竞技大赛成功举办之后， 2019昆仑杯电子竞技大赛又一次带动全省电竞发展。本次活动集结了全省12所高校：海口经济学院、海南大学、 三亚学院、海南医学院、海南经贸职业技术学院、海南师范大学、海南热带海洋学院、海南职业技术学院、海南科技职业学院、海南工商职业学院、海南政法职业学院、琼台师范学院； 本次活动参赛人数超600人，路演场次6场，校园宣传次数超1000次，通过一系列的校园传播，本次赛事影响力度超5万人！通过与AJXCACC动漫展会的结合，奖昆仑杯成功打造成海南本省精品赛事。</p><h5>昆仑海经电竞战队</h5><p>近两年昆仑战队战绩：<br>\n        2017年7月，英雄联盟战队以九战九胜全胜战绩一举夺得全球高校杯世界冠军<br>\n        2017年8月，英雄联盟战队出征台湾世界大学生明星邀请赛亚军<br>\n        2017年9月，技嘉杯英雄联盟南区区域赛冠军<br>\n        2017年11月，技嘉杯英雄联盟年度总亚军<br>\n        2017年12月，WUCG世界大学生电子竞技联赛英雄联盟中国总冠军，国际赛亚军<br>\n        2017年12月，海口电子竞技嘉年华大赛海南总冠军、季军<br>\n        2017年12月，英雄联盟战队受邀出征德玛西亚杯线下预选赛，与职业战队BLG进行了激烈的对战，并深入的进行了学习交流。<br>\n        2018年6月，英雄联盟全国高校联赛四强；<br>\n        2018年8月，英雄联盟2018第二届全球高校冠军杯殿军；<br>\n        2018年12月，DOTA2全国高校联赛秋季赛冠军；<br>\n        2018年12月，王者荣耀2018海南省电子竞技联赛亚军。\n        </p><h5>昆仑海经电竞战队</h5><p>公司致力在海口打造高端电竞场馆，为广大电竞爱好者提供更舒适、更专业的环境。</p><p>为配合专业教育，公司在海口经济学院内斥资建设海南省内一流、国内领先的电竞教育基地和电竞体验馆。</p>\n', 1, 0, '2020-08-21 08:12:23', '2020-11-02 11:06:34', NULL);
INSERT INTO `mzc-services` VALUES (3, 10, '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', 'http://127.0.0.1:7001/public/images/ser_img1.png', '<h5>电竞教育</h5><p>2017年伽马调查报告的数据显示，电竞行业规模年复合增长率已经达到46%，电竞行业人才缺口达26万，需求缺口高达83%，人才稀缺是电竞这一新兴产业面临的瓶颈之一。而现有教育教学尚没有针对性人才培养模式，造成专业人才大量缺失，很大程度上制约了电竞行业的发展。</p><p>2016年9月，教育部职业教育与成人教育司公布的《关于做好2017年高等职业学校拟招生专业申报工作的通知》中增补了新专业“电子竞技运动与管理专业”，专业代码670411。</p><p>2017年，昆仑电竞与海口经济学院联合申报了海南省首批“电子竞技运动与管理专业”获得批准，2018年、2019年两届招生人数达200人。通过校企合作，不但引进电竞圈内一线的电竞明星，知名解说，行业专家等为教师提供教学保障，还通过昆仑电竞与国内其他电竞企业、俱乐部展开深度合作为电竞专业学生提供广阔的实习实训、就业平台。</p><p>本专业面向电子竞技企业，以及与电子竞技相关的职业领域的服务、管理一线岗位，主要培养具有良好的电子竞技综合职业能力，掌握一定的专业理论知识，具有较强实践能力的高素质技能型人才。专业主要培养的是电竞产业相关从业人员，包括电竞运动员、教练员、裁判员、职业经纪人、赛事策划与执行、战术与数据分析、场地运营与维护、俱乐部经营与管理、电竞主持与主播、电竞商务等相关人才。</p><p>本专业面向电子竞技企业，以及与电子竞技相关的职业领域的服务、管理一线岗位，主要培养具有良好的电子竞技综合职业能力，掌握一定的专业理论知识，具有较强实践能力的高素质技能型人才。专业主要培养的是电竞产业相关从业人员，包括电竞运动员、教练员、裁判员、职业经纪人、赛事策划与执行、战术与数据分析、场地运营与维护、俱乐部经营与管理、电竞主持与主播、电竞商务等相关人才。</p><h5>电竞赛事</h5><p>组织及参与的赛事：2017年第六届问道杯电子竞技大赛；2018年首届桫椤湾“绝地求生”电竞大赛；WUCG世界大学生电子竞技大赛海南赛区总执行；2018年，成功在海口经济学院举办了首届昆仑杯电子竞技大赛，该赛事共招募队伍79支，报名人数超400余人。赛事举办期间，校园影响力超万人，总决赛当日观赛人数约2700人，座无虚席。昆仑杯的成功举办，为海南电竞赛事奠定了良好基础及赛事的优良口碑，深受海南高校电竞选手的喜爱与追捧。</p><p>继2018年昆仑杯电子竞技大赛成功举办之后， 2019昆仑杯电子竞技大赛又一次带动全省电竞发展。本次活动集结了全省12所高校：海口经济学院、海南大学、 三亚学院、海南医学院、海南经贸职业技术学院、海南师范大学、海南热带海洋学院、海南职业技术学院、海南科技职业学院、海南工商职业学院、海南政法职业学院、琼台师范学院； 本次活动参赛人数超600人，路演场次6场，校园宣传次数超1000次，通过一系列的校园传播，本次赛事影响力度超5万人！通过与AJXCACC动漫展会的结合，奖昆仑杯成功打造成海南本省精品赛事。</p><h5>昆仑海经电竞战队</h5><p>近两年昆仑战队战绩：<br>\n        2017年7月，英雄联盟战队以九战九胜全胜战绩一举夺得全球高校杯世界冠军<br>\n        2017年8月，英雄联盟战队出征台湾世界大学生明星邀请赛亚军<br>\n        2017年9月，技嘉杯英雄联盟南区区域赛冠军<br>\n        2017年11月，技嘉杯英雄联盟年度总亚军<br>\n        2017年12月，WUCG世界大学生电子竞技联赛英雄联盟中国总冠军，国际赛亚军<br>\n        2017年12月，海口电子竞技嘉年华大赛海南总冠军、季军<br>\n        2017年12月，英雄联盟战队受邀出征德玛西亚杯线下预选赛，与职业战队BLG进行了激烈的对战，并深入的进行了学习交流。<br>\n        2018年6月，英雄联盟全国高校联赛四强；<br>\n        2018年8月，英雄联盟2018第二届全球高校冠军杯殿军；<br>\n        2018年12月，DOTA2全国高校联赛秋季赛冠军；<br>\n        2018年12月，王者荣耀2018海南省电子竞技联赛亚军。\n        </p><h5>昆仑海经电竞战队</h5><p>公司致力在海口打造高端电竞场馆，为广大电竞爱好者提供更舒适、更专业的环境。</p><p>为配合专业教育，公司在海口经济学院内斥资建设海南省内一流、国内领先的电竞教育基地和电竞体验馆。</p>\n\n', 1, 0, '2020-08-21 08:12:23', '2020-08-21 08:12:23', NULL);
INSERT INTO `mzc-services` VALUES (4, 11, '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', 'http://127.0.0.1:7001/public/images/ser_img1.png', '<h5>电竞教育</h5><p>2017年伽马调查报告的数据显示，电竞行业规模年复合增长率已经达到46%，电竞行业人才缺口达26万，需求缺口高达83%，人才稀缺是电竞这一新兴产业面临的瓶颈之一。而现有教育教学尚没有针对性人才培养模式，造成专业人才大量缺失，很大程度上制约了电竞行业的发展。</p><p>2016年9月，教育部职业教育与成人教育司公布的《关于做好2017年高等职业学校拟招生专业申报工作的通知》中增补了新专业“电子竞技运动与管理专业”，专业代码670411。</p><p>2017年，昆仑电竞与海口经济学院联合申报了海南省首批“电子竞技运动与管理专业”获得批准，2018年、2019年两届招生人数达200人。通过校企合作，不但引进电竞圈内一线的电竞明星，知名解说，行业专家等为教师提供教学保障，还通过昆仑电竞与国内其他电竞企业、俱乐部展开深度合作为电竞专业学生提供广阔的实习实训、就业平台。</p><p>本专业面向电子竞技企业，以及与电子竞技相关的职业领域的服务、管理一线岗位，主要培养具有良好的电子竞技综合职业能力，掌握一定的专业理论知识，具有较强实践能力的高素质技能型人才。专业主要培养的是电竞产业相关从业人员，包括电竞运动员、教练员、裁判员、职业经纪人、赛事策划与执行、战术与数据分析、场地运营与维护、俱乐部经营与管理、电竞主持与主播、电竞商务等相关人才。</p><p>本专业面向电子竞技企业，以及与电子竞技相关的职业领域的服务、管理一线岗位，主要培养具有良好的电子竞技综合职业能力，掌握一定的专业理论知识，具有较强实践能力的高素质技能型人才。专业主要培养的是电竞产业相关从业人员，包括电竞运动员、教练员、裁判员、职业经纪人、赛事策划与执行、战术与数据分析、场地运营与维护、俱乐部经营与管理、电竞主持与主播、电竞商务等相关人才。</p><h5>电竞赛事</h5><p>组织及参与的赛事：2017年第六届问道杯电子竞技大赛；2018年首届桫椤湾“绝地求生”电竞大赛；WUCG世界大学生电子竞技大赛海南赛区总执行；2018年，成功在海口经济学院举办了首届昆仑杯电子竞技大赛，该赛事共招募队伍79支，报名人数超400余人。赛事举办期间，校园影响力超万人，总决赛当日观赛人数约2700人，座无虚席。昆仑杯的成功举办，为海南电竞赛事奠定了良好基础及赛事的优良口碑，深受海南高校电竞选手的喜爱与追捧。</p><p>继2018年昆仑杯电子竞技大赛成功举办之后， 2019昆仑杯电子竞技大赛又一次带动全省电竞发展。本次活动集结了全省12所高校：海口经济学院、海南大学、 三亚学院、海南医学院、海南经贸职业技术学院、海南师范大学、海南热带海洋学院、海南职业技术学院、海南科技职业学院、海南工商职业学院、海南政法职业学院、琼台师范学院； 本次活动参赛人数超600人，路演场次6场，校园宣传次数超1000次，通过一系列的校园传播，本次赛事影响力度超5万人！通过与AJXCACC动漫展会的结合，奖昆仑杯成功打造成海南本省精品赛事。</p><h5>昆仑海经电竞战队</h5><p>近两年昆仑战队战绩：<br>\n        2017年7月，英雄联盟战队以九战九胜全胜战绩一举夺得全球高校杯世界冠军<br>\n        2017年8月，英雄联盟战队出征台湾世界大学生明星邀请赛亚军<br>\n        2017年9月，技嘉杯英雄联盟南区区域赛冠军<br>\n        2017年11月，技嘉杯英雄联盟年度总亚军<br>\n        2017年12月，WUCG世界大学生电子竞技联赛英雄联盟中国总冠军，国际赛亚军<br>\n        2017年12月，海口电子竞技嘉年华大赛海南总冠军、季军<br>\n        2017年12月，英雄联盟战队受邀出征德玛西亚杯线下预选赛，与职业战队BLG进行了激烈的对战，并深入的进行了学习交流。<br>\n        2018年6月，英雄联盟全国高校联赛四强；<br>\n        2018年8月，英雄联盟2018第二届全球高校冠军杯殿军；<br>\n        2018年12月，DOTA2全国高校联赛秋季赛冠军；<br>\n        2018年12月，王者荣耀2018海南省电子竞技联赛亚军。\n        </p><h5>昆仑海经电竞战队</h5><p>公司致力在海口打造高端电竞场馆，为广大电竞爱好者提供更舒适、更专业的环境。</p><p>为配合专业教育，公司在海口经济学院内斥资建设海南省内一流、国内领先的电竞教育基地和电竞体验馆。</p>\n\n', 1, 0, '2020-08-21 08:12:23', '2020-08-21 08:12:23', NULL);
INSERT INTO `mzc-services` VALUES (5, 12, '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', '海南昆仑体育文化股份有限公司', 'http://127.0.0.1:7001/public/images/ser_img1.png', '<h5>电竞教育</h5><p>2017年伽马调查报告的数据显示，电竞行业规模年复合增长率已经达到46%，电竞行业人才缺口达26万，需求缺口高达83%，人才稀缺是电竞这一新兴产业面临的瓶颈之一。而现有教育教学尚没有针对性人才培养模式，造成专业人才大量缺失，很大程度上制约了电竞行业的发展。</p><p>2016年9月，教育部职业教育与成人教育司公布的《关于做好2017年高等职业学校拟招生专业申报工作的通知》中增补了新专业“电子竞技运动与管理专业”，专业代码670411。</p><p>2017年，昆仑电竞与海口经济学院联合申报了海南省首批“电子竞技运动与管理专业”获得批准，2018年、2019年两届招生人数达200人。通过校企合作，不但引进电竞圈内一线的电竞明星，知名解说，行业专家等为教师提供教学保障，还通过昆仑电竞与国内其他电竞企业、俱乐部展开深度合作为电竞专业学生提供广阔的实习实训、就业平台。</p><p>本专业面向电子竞技企业，以及与电子竞技相关的职业领域的服务、管理一线岗位，主要培养具有良好的电子竞技综合职业能力，掌握一定的专业理论知识，具有较强实践能力的高素质技能型人才。专业主要培养的是电竞产业相关从业人员，包括电竞运动员、教练员、裁判员、职业经纪人、赛事策划与执行、战术与数据分析、场地运营与维护、俱乐部经营与管理、电竞主持与主播、电竞商务等相关人才。</p><p>本专业面向电子竞技企业，以及与电子竞技相关的职业领域的服务、管理一线岗位，主要培养具有良好的电子竞技综合职业能力，掌握一定的专业理论知识，具有较强实践能力的高素质技能型人才。专业主要培养的是电竞产业相关从业人员，包括电竞运动员、教练员、裁判员、职业经纪人、赛事策划与执行、战术与数据分析、场地运营与维护、俱乐部经营与管理、电竞主持与主播、电竞商务等相关人才。</p><h5>电竞赛事</h5><p>组织及参与的赛事：2017年第六届问道杯电子竞技大赛；2018年首届桫椤湾“绝地求生”电竞大赛；WUCG世界大学生电子竞技大赛海南赛区总执行；2018年，成功在海口经济学院举办了首届昆仑杯电子竞技大赛，该赛事共招募队伍79支，报名人数超400余人。赛事举办期间，校园影响力超万人，总决赛当日观赛人数约2700人，座无虚席。昆仑杯的成功举办，为海南电竞赛事奠定了良好基础及赛事的优良口碑，深受海南高校电竞选手的喜爱与追捧。</p><p>继2018年昆仑杯电子竞技大赛成功举办之后， 2019昆仑杯电子竞技大赛又一次带动全省电竞发展。本次活动集结了全省12所高校：海口经济学院、海南大学、 三亚学院、海南医学院、海南经贸职业技术学院、海南师范大学、海南热带海洋学院、海南职业技术学院、海南科技职业学院、海南工商职业学院、海南政法职业学院、琼台师范学院； 本次活动参赛人数超600人，路演场次6场，校园宣传次数超1000次，通过一系列的校园传播，本次赛事影响力度超5万人！通过与AJXCACC动漫展会的结合，奖昆仑杯成功打造成海南本省精品赛事。</p><h5>昆仑海经电竞战队</h5><p>近两年昆仑战队战绩：<br>\n        2017年7月，英雄联盟战队以九战九胜全胜战绩一举夺得全球高校杯世界冠军<br>\n        2017年8月，英雄联盟战队出征台湾世界大学生明星邀请赛亚军<br>\n        2017年9月，技嘉杯英雄联盟南区区域赛冠军<br>\n        2017年11月，技嘉杯英雄联盟年度总亚军<br>\n        2017年12月，WUCG世界大学生电子竞技联赛英雄联盟中国总冠军，国际赛亚军<br>\n        2017年12月，海口电子竞技嘉年华大赛海南总冠军、季军<br>\n        2017年12月，英雄联盟战队受邀出征德玛西亚杯线下预选赛，与职业战队BLG进行了激烈的对战，并深入的进行了学习交流。<br>\n        2018年6月，英雄联盟全国高校联赛四强；<br>\n        2018年8月，英雄联盟2018第二届全球高校冠军杯殿军；<br>\n        2018年12月，DOTA2全国高校联赛秋季赛冠军；<br>\n        2018年12月，王者荣耀2018海南省电子竞技联赛亚军。\n        </p><h5>昆仑海经电竞战队</h5><p>公司致力在海口打造高端电竞场馆，为广大电竞爱好者提供更舒适、更专业的环境。</p><p>为配合专业教育，公司在海口经济学院内斥资建设海南省内一流、国内领先的电竞教育基地和电竞体验馆。</p>\n\n', 1, 0, '2020-08-21 08:12:23', '2020-08-21 08:12:23', NULL);

-- ----------------------------
-- Table structure for mzc-settings
-- ----------------------------
DROP TABLE IF EXISTS `mzc-settings`;
CREATE TABLE `mzc-settings`  (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `value` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `created_at` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `updated_at` datetime(0) NULL DEFAULT NULL COMMENT '修改时间',
  `deleted_at` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of mzc-settings
-- ----------------------------
INSERT INTO `mzc-settings` VALUES (1, 'title', '海南昆仑体育文化股份有限公司', NULL, NULL, NULL);
INSERT INTO `mzc-settings` VALUES (2, 'companyName', '海南昆仑体育文化股份有限公司', NULL, NULL, NULL);
INSERT INTO `mzc-settings` VALUES (3, 'keywords', '海南昆仑体育文化股份有限公司', NULL, NULL, NULL);
INSERT INTO `mzc-settings` VALUES (4, 'companyDescription', '海南昆仑体育文化股份有限公司对外开展业务涉及：大型文艺体育活动及演出、国际文化合作与交流、影视制作投资、品牌策划推广、旅游会议会展、管理咨询、体育赛事服务管理和拓展培训等。', NULL, NULL, NULL);
INSERT INTO `mzc-settings` VALUES (5, 'logo', 'http://127.0.0.1:7001/public/images/logo.png', NULL, NULL, NULL);
INSERT INTO `mzc-settings` VALUES (6, 'address', '海南省海口市桂林洋高校区海口经济学院昆仑体1育文化大厦', NULL, NULL, NULL);
INSERT INTO `mzc-settings` VALUES (7, 'phone', '0898-657', NULL, NULL, NULL);
INSERT INTO `mzc-settings` VALUES (8, 'email', 'xuhao7jump@msn.cn', NULL, NULL, NULL);
INSERT INTO `mzc-settings` VALUES (9, 'longitude', '110.492659', NULL, NULL, NULL);
INSERT INTO `mzc-settings` VALUES (10, 'latitude', '19.971976', NULL, NULL, NULL);
INSERT INTO `mzc-settings` VALUES (11, 'record', '琼ICP备1号', NULL, NULL, NULL);
INSERT INTO `mzc-settings` VALUES (12, 'weChatCode', 'http://127.0.0.1:7001/public/images/qrcode.png', NULL, NULL, NULL);
INSERT INTO `mzc-settings` VALUES (13, 'weiboCode', 'http://127.0.0.1:7001/public/images/qrcode2.png', NULL, NULL, NULL);
INSERT INTO `mzc-settings` VALUES (14, 'menuLogo', 'http://127.0.0.1:7001/public/images/menu-logo.png', NULL, NULL, NULL);
INSERT INTO `mzc-settings` VALUES (15, 'mp4', 'http://127.0.0.1:7001/public/uploads/20201119/1605756083163.mp4', NULL, NULL, NULL);

SET FOREIGN_KEY_CHECKS = 1;
