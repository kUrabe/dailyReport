-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2016 年 11 朁E30 日 05:06
-- サーバのバージョン： 10.1.13-MariaDB
-- PHP Version: 5.6.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `daily-report-ddthink`
--

-- --------------------------------------------------------

--
-- テーブルの構造 `fixed_item_inf`
--

CREATE TABLE `fixed_item_inf` (
  `fixed_item_id` int(11) NOT NULL COMMENT '固定項目ID',
  `item_status` int(11) DEFAULT NULL COMMENT '固定項目の状態を管理。bit管理',
  `output_order` int(11) DEFAULT NULL COMMENT '画面への出力順序（優先順位）。',
  `index_name` varchar(30) DEFAULT NULL COMMENT '固定項目の見出し名',
  `button_function` int(11) DEFAULT NULL COMMENT 'ボタンの提供有無や、機能特定。bit管理。',
  `button_name` varchar(30) DEFAULT NULL COMMENT 'ボタン名。',
  `get_index_name` varchar(30) DEFAULT NULL COMMENT '取得ボタン名。ボタン機能で他のテキストエリアを取得する場合に使用。'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- テーブルのリレーション `fixed_item_inf`:
--

--
-- テーブルのデータのダンプ `fixed_item_inf`
--

INSERT INTO `fixed_item_inf` (`fixed_item_id`, `item_status`, `output_order`, `index_name`, `button_function`, `button_name`, `get_index_name`) VALUES
(1, 2, 1, '結果', 2, '前日予定継承', '予定'),
(2, 2, 2, '予定', 4, '結果継承', '結果');

-- --------------------------------------------------------

--
-- テーブルの構造 `record_content_add`
--

CREATE TABLE `record_content_add` (
  `id` int(11) NOT NULL COMMENT '主キーのID',
  `content_id` int(11) NOT NULL COMMENT 'コンテンツ情報を一意に紐付けるID。',
  `user_id` varchar(30) NOT NULL COMMENT '一意なユーザID。',
  `add_category` int(11) NOT NULL COMMENT '追加種別。bit管理',
  `category_status` int(11) NOT NULL COMMENT '登録状態。bit管理'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- テーブルのリレーション `record_content_add`:
--   `content_id`
--       `record_content_inf` -> `content_id`
--

--
-- テーブルのデータのダンプ `record_content_add`
--

INSERT INTO `record_content_add` (`id`, `content_id`, `user_id`, `add_category`, `category_status`) VALUES
(1, 1, 'user2', 1, 1),
(2, 1, 'user3', 1, 1),
(3, 1, 'user2', 2, 1),
(4, 1, 'user3', 2, 1),
(5, 2, 'user3', 1, 1),
(6, 2, 'user3', 2, 1),
(7, 11, 'user1', 1, 1),
(8, 11, 'user2', 2, 1),
(9, 17, 'user3', 1, 1),
(10, 19, 'user1', 1, 2),
(11, 19, 'user2', 1, 1);

-- --------------------------------------------------------

--
-- テーブルの構造 `record_content_detail`
--

CREATE TABLE `record_content_detail` (
  `id` int(11) NOT NULL,
  `content_id` int(11) NOT NULL COMMENT '主キー。コンテンツ情報を一意に紐付けるID',
  `detail_id` int(11) NOT NULL COMMENT 'コンテンツ詳細ID。',
  `fixed_item_id` int(11) DEFAULT NULL COMMENT '固定項目ID',
  `index_name` varchar(30) DEFAULT NULL COMMENT '項目名',
  `main_text` text COMMENT 'コンテンツの内容。本文。'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- テーブルのリレーション `record_content_detail`:
--   `fixed_item_id`
--       `fixed_item_inf` -> `fixed_item_id`
--   `content_id`
--       `record_content_inf` -> `content_id`
--

--
-- テーブルのデータのダンプ `record_content_detail`
--

INSERT INTO `record_content_detail` (`id`, `content_id`, `detail_id`, `fixed_item_id`, `index_name`, `main_text`) VALUES
(13, 1, 1, 1, '結果', '結果のテキスト。実際にコメント入ります。'),
(14, 1, 2, NULL, '予定', '予定のテキスト。日報の初期値。あがｓｄ'),
(15, 1, 3, NULL, '問題点', '問題点のダミーテキストです。'),
(16, 1, 4, NULL, '原因', '原因のダミーテキスト。ダミーです。ダミーです。'),
(17, 2, 1, NULL, '予定', '2つめの予定です。'),
(18, 2, 2, NULL, '結果', '結果と予定の位置が逆です。'),
(19, 2, 3, NULL, '所感', '所感のテキストだよ。\r\n改行も入れてみるよ'),
(20, 3, 1, NULL, '予定', '2つめの予定です。'),
(21, 3, 2, NULL, '結果', '結果と予定の位置が逆です。'),
(22, 3, 3, NULL, '予定', '別に同じ名称もいけます。'),
(23, 3, 4, NULL, '所感', '思うところはいろいろあります。'),
(24, 3, 5, NULL, '特定', '難しいです。'),
(25, 3, 1, NULL, '予定', '1つめの予定です。'),
(26, 3, 2, NULL, '結果', '結果と予定の位置が逆です。'),
(27, 3, 3, NULL, '予定', '別に同じ名称もいけます。'),
(28, 3, 4, NULL, '所感', '思うところはいろいろあります。'),
(29, 3, 5, NULL, '特定', '難しいです。'),
(30, 4, 1, NULL, '所感', 'コーディングが難しい'),
(31, 4, 2, NULL, '所感', '2つめの所感です'),
(32, 4, 3, NULL, '所感', 'まさかの3つめ'),
(33, 4, 4, NULL, '所感', '4つめ…'),
(34, 5, 1, NULL, '所感', '項目1つしかない'),
(35, 6, 1, NULL, '結果', 'Javaの結果'),
(36, 6, 2, NULL, '結果', 'SQLの結果'),
(37, 7, 1, NULL, '感想', '感想です'),
(38, 7, 2, NULL, 'PA', 'プロジェクトAの進捗です'),
(39, 7, 3, NULL, '進捗', '全体の進捗です'),
(40, 7, 4, NULL, '全体', '全体に対するコメントです'),
(41, 8, 1, NULL, '所感', 'コーディングが難しい'),
(42, 8, 2, NULL, '所感', '2つめの所感です'),
(43, 8, 3, NULL, '所感', 'まさかの3つめ'),
(44, 8, 4, NULL, '所感', '4つめ…'),
(45, 9, 1, NULL, '進捗', '80％です。'),
(46, 9, 2, NULL, '所感', '困難さを感じています。'),
(47, 9, 3, NULL, '結果', '結果はなにもありません。'),
(48, 9, 4, NULL, '予定', '予定が最後'),
(49, 10, 1, NULL, 'シングル', '1つです'),
(50, 10, 2, NULL, 'ダブル', '2つです'),
(51, 11, 1, NULL, NULL, 'コメントです。'),
(52, 12, 1, NULL, NULL, '長めのコメントです長めのコメントです長めのコメントです長めのコメントです長めのコメントです長めのコメントです'),
(53, 13, 1, NULL, NULL, 'いいと思います'),
(54, 14, 1, NULL, NULL, 'ちょっと問題あると思います'),
(55, 15, 1, NULL, NULL, '正しい！'),
(56, 16, 1, NULL, NULL, '意味がわかりかねる'),
(57, 17, 1, NULL, NULL, 'コメントに対するコメントです。'),
(58, 18, 1, NULL, NULL, 'これもコメントに対するコメントです。'),
(59, 19, 1, NULL, NULL, 'コメントに対するコメントへのコメントです。'),
(60, 20, 1, NULL, NULL, 'これもコメントに対するコメントへのコメントです。');

-- --------------------------------------------------------

--
-- テーブルの構造 `record_content_inf`
--

CREATE TABLE `record_content_inf` (
  `content_id` int(11) NOT NULL COMMENT '主キー。コンテンツ情報を一意に紐付けるID',
  `user_id` varchar(30) NOT NULL COMMENT '一意なユーザID。',
  `entry_format` int(11) NOT NULL COMMENT '登録書式。bit管理',
  `entry_status` int(11) NOT NULL COMMENT '登録状態。bit管理',
  `base_parent_content_id` int(11) DEFAULT NULL COMMENT '基底となる親コンテンツID',
  `grand_parent_content_id` int(11) DEFAULT NULL COMMENT '祖先コンテンツID。親の親となるコンテンツIDを値を保持。',
  `parent_content_id` int(11) DEFAULT NULL COMMENT '親コンテンツID。親となるコンテンツIDを値を保持。',
  `report_date` date NOT NULL COMMENT 'コンテンツ情報の報告日',
  `create_date` datetime NOT NULL COMMENT 'コンテンツ情報の作成日',
  `update_dated` datetime NOT NULL COMMENT 'コンテンツ情報の更新日'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- テーブルのリレーション `record_content_inf`:
--   `user_id`
--       `user_inf` -> `user_id`
--

--
-- テーブルのデータのダンプ `record_content_inf`
--

INSERT INTO `record_content_inf` (`content_id`, `user_id`, `entry_format`, `entry_status`, `base_parent_content_id`, `grand_parent_content_id`, `parent_content_id`, `report_date`, `create_date`, `update_dated`) VALUES
(1, 'user1', 2, 2, 0, 0, 0, '2016-11-02', '2016-11-01 00:00:00', '2016-11-01 00:00:00'),
(2, 'user1', 2, 2, 0, 0, 0, '2016-11-03', '2016-11-01 00:00:00', '2016-11-01 00:00:00'),
(3, 'user1', 2, 2, 0, 0, 0, '2016-11-04', '2016-11-01 00:00:00', '2016-11-01 00:00:00'),
(4, 'user2', 2, 2, 0, 0, 0, '2016-11-05', '2016-11-01 00:00:00', '2016-11-01 00:00:00'),
(5, 'user3', 2, 2, 0, 0, 0, '2016-11-06', '2016-11-01 00:00:00', '2016-11-01 00:00:00'),
(6, 'user2', 2, 2, 0, 0, 0, '2016-11-07', '2016-11-01 00:00:00', '2016-11-01 00:00:00'),
(7, 'user1', 2, 2, 0, 0, 0, '2016-11-07', '2016-11-01 00:00:00', '2016-11-01 00:00:00'),
(8, 'user3', 2, 2, 0, 0, 0, '2016-11-07', '2016-11-01 00:00:00', '2016-11-01 00:00:00'),
(9, 'user1', 2, 2, 0, 0, 0, '2016-11-08', '2016-11-01 00:00:00', '2016-11-01 00:00:00'),
(10, 'user3', 2, 2, 0, 0, 0, '2016-11-09', '2016-11-01 00:00:00', '2016-11-01 00:00:00'),
(11, 'user2', 4, 2, 1, 0, 1, '2016-11-16', '2016-11-16 00:00:00', '2016-11-16 00:00:00'),
(12, 'user3', 4, 2, 1, 0, 1, '2016-11-17', '2016-11-16 00:00:00', '2016-11-16 00:00:00'),
(13, 'user3', 4, 2, 2, 0, 2, '2016-11-15', '2016-11-16 00:00:00', '2016-11-16 00:00:00'),
(14, 'user1', 4, 2, 4, 0, 4, '2016-11-20', '2016-11-16 00:00:00', '2016-11-16 00:00:00'),
(15, 'user3', 4, 2, 4, 0, 4, '2016-11-20', '2016-11-16 00:00:00', '2016-11-16 00:00:00'),
(16, 'user1', 4, 2, 5, 0, 5, '2016-11-28', '2016-11-16 00:00:00', '2016-11-16 00:00:00'),
(17, 'user1', 4, 2, 1, 1, 11, '2016-11-27', '2016-11-27 00:00:00', '2016-11-27 00:00:00'),
(18, 'user2', 4, 2, 1, 1, 11, '2016-11-28', '2016-11-28 00:00:00', '2016-11-28 00:00:00'),
(19, 'user3', 4, 2, 1, 11, 17, '2016-11-28', '2016-11-28 00:00:00', '2016-11-28 00:00:00'),
(20, 'user2', 4, 2, 1, 11, 17, '2016-11-29', '2016-11-29 00:00:00', '2016-11-29 00:00:00');

-- --------------------------------------------------------

--
-- テーブルの構造 `user_inf`
--

CREATE TABLE `user_inf` (
  `user_id` varchar(30) NOT NULL COMMENT '一意なユーザID。',
  `login_password` varchar(512) DEFAULT NULL COMMENT 'ユーザに紐付くパスワード。ハッシュ化されてDB保存。',
  `user_name` varchar(30) NOT NULL COMMENT 'ユーザに紐付く名前',
  `user_sex` tinyint(4) NOT NULL COMMENT 'ユーザに紐付く性別。1：男、2：女、3：その他。',
  `user_authority` int(11) NOT NULL COMMENT 'ユーザに紐付く権限。bit管理を行う。\r\n',
  `user_tel` varchar(30) DEFAULT NULL COMMENT 'ユーザに紐付く電話番号',
  `user_mail` varchar(30) DEFAULT NULL COMMENT 'ユーザに紐付くメールアドレス。',
  `create_date` datetime NOT NULL COMMENT 'コンテンツ情報の作成日',
  `update_dated` datetime NOT NULL COMMENT 'コンテンツ情報の更新日'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- テーブルのリレーション `user_inf`:
--

--
-- テーブルのデータのダンプ `user_inf`
--

INSERT INTO `user_inf` (`user_id`, `login_password`, `user_name`, `user_sex`, `user_authority`, `user_tel`, `user_mail`, `create_date`, `update_dated`) VALUES
('admin1', '$2a$10$oxSJl.keBwxmsMLkcT9lPeAIxfNTPNQxpeywMrF7A3kVszwUTqfTK', '管理者', 1, 2, NULL, NULL, '2016-11-29 00:00:00', '2016-11-29 00:00:00'),
('user1', '$2a$10$oxSJl.keBwxmsMLkcT9lPeAIxfNTPNQxpeywMrF7A3kVszwUTqfTK', '山田　太郎', 1, 1, '03-2222-1111', 'hhh@gmail.com', '2016-11-28 00:00:00', '2016-11-28 00:00:00'),
('user2', '$2a$10$oxSJl.keBwxmsMLkcT9lPeAIxfNTPNQxpeywMrF7A3kVszwUTqfTK', '山田　花子', 2, 1, NULL, NULL, '2016-11-29 00:00:00', '2016-11-29 00:00:00'),
('user3', '$2a$10$oxSJl.keBwxmsMLkcT9lPeAIxfNTPNQxpeywMrF7A3kVszwUTqfTK', '山田　二郎', 1, 1, NULL, NULL, '2016-11-29 00:00:00', '2016-11-29 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `fixed_item_inf`
--
ALTER TABLE `fixed_item_inf`
  ADD PRIMARY KEY (`fixed_item_id`),
  ADD UNIQUE KEY `fixed_item_id` (`fixed_item_id`);

--
-- Indexes for table `record_content_add`
--
ALTER TABLE `record_content_add`
  ADD PRIMARY KEY (`id`),
  ADD KEY `content_id` (`content_id`);

--
-- Indexes for table `record_content_detail`
--
ALTER TABLE `record_content_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fixed_item_id` (`fixed_item_id`),
  ADD KEY `content_id` (`content_id`);

--
-- Indexes for table `record_content_inf`
--
ALTER TABLE `record_content_inf`
  ADD PRIMARY KEY (`content_id`),
  ADD UNIQUE KEY `content_id` (`content_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user_inf`
--
ALTER TABLE `user_inf`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `fixed_item_inf`
--
ALTER TABLE `fixed_item_inf`
  MODIFY `fixed_item_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '固定項目ID', AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `record_content_add`
--
ALTER TABLE `record_content_add`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主キーのID', AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `record_content_detail`
--
ALTER TABLE `record_content_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;
--
-- AUTO_INCREMENT for table `record_content_inf`
--
ALTER TABLE `record_content_inf`
  MODIFY `content_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主キー。コンテンツ情報を一意に紐付けるID', AUTO_INCREMENT=21;
--
-- ダンプしたテーブルの制約
--

--
-- テーブルの制約 `record_content_add`
--
ALTER TABLE `record_content_add`
  ADD CONSTRAINT `record_content_add_ibfk_1` FOREIGN KEY (`content_id`) REFERENCES `record_content_inf` (`content_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- テーブルの制約 `record_content_detail`
--
ALTER TABLE `record_content_detail`
  ADD CONSTRAINT `record_content_detail_ibfk_1` FOREIGN KEY (`fixed_item_id`) REFERENCES `fixed_item_inf` (`fixed_item_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `record_content_detail_ibfk_2` FOREIGN KEY (`content_id`) REFERENCES `record_content_inf` (`content_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- テーブルの制約 `record_content_inf`
--
ALTER TABLE `record_content_inf`
  ADD CONSTRAINT `record_content_inf_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_inf` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
