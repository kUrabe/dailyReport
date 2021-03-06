SET SESSION FOREIGN_KEY_CHECKS=0;

/* Drop Tables */

DROP TABLE IF EXISTS record_content_detail;
DROP TABLE IF EXISTS fixed_item_inf;
DROP TABLE IF EXISTS record_content_add;
DROP TABLE IF EXISTS record_content_inf;
DROP TABLE IF EXISTS user_inf;




/* Create Tables */

CREATE TABLE fixed_item_inf
(
	-- 固定項目ID
	fixed_item_id int NOT NULL AUTO_INCREMENT COMMENT '固定項目ID',
	-- 固定項目の状態を管理。bit管理
	item_status int COMMENT '固定項目の状態を管理。bit管理',
	-- 画面への出力順序（優先順位）。
	output_order int COMMENT '画面への出力順序（優先順位）。',
	-- 固定項目の見出し名
	index_name varchar(30) COMMENT '固定項目の見出し名',
	-- ボタンの提供有無や、機能特定。bit管理。
	button_function int COMMENT 'ボタンの提供有無や、機能特定。bit管理。',
	-- ボタン名。
	button_name varchar(30) COMMENT 'ボタン名。',
	-- 取得ボタン名。ボタン機能で他のテキストエリアを取得する場合に使用。
	get_index_name varchar(30) COMMENT '取得ボタン名。ボタン機能で他のテキストエリアを取得する場合に使用。',
	PRIMARY KEY (fixed_item_id),
	UNIQUE (fixed_item_id)
) ENGINE = InnoDB DEFAULT CHARACTER SET utf8;


CREATE TABLE record_content_add
(
	-- 主キーのID
	id int NOT NULL AUTO_INCREMENT COMMENT '主キーのID',
	-- コンテンツ情報を一意に紐付けるID。
	content_id int NOT NULL COMMENT 'コンテンツ情報を一意に紐付けるID。',
	-- 一意なユーザID。
	user_id varchar(30) NOT NULL COMMENT '一意なユーザID。',
	-- 追加種別。bit管理
	add_category int NOT NULL COMMENT '追加種別。bit管理',
	-- 登録状態。bit管理
	category_status int NOT NULL COMMENT '登録状態。bit管理',
	PRIMARY KEY (id)
) ENGINE = InnoDB DEFAULT CHARACTER SET utf8;


CREATE TABLE record_content_detail
(
	id int NOT NULL AUTO_INCREMENT,
	-- 主キー。コンテンツ情報を一意に紐付けるID
	content_id int NOT NULL COMMENT '主キー。コンテンツ情報を一意に紐付けるID',
	-- コンテンツ詳細ID。
	detail_id int NOT NULL COMMENT 'コンテンツ詳細ID。',
	-- 固定項目ID
	fixed_item_id int COMMENT '固定項目ID',
	-- 項目名
	index_name varchar(30) COMMENT '項目名',
	-- コンテンツの内容。本文。
	main_text text COMMENT 'コンテンツの内容。本文。',
	PRIMARY KEY (id)
) ENGINE = InnoDB DEFAULT CHARACTER SET utf8;


CREATE TABLE record_content_inf
(
	-- 主キー。コンテンツ情報を一意に紐付けるID
	content_id int NOT NULL AUTO_INCREMENT COMMENT '主キー。コンテンツ情報を一意に紐付けるID',
	-- 一意なユーザID。
	user_id varchar(30) NOT NULL COMMENT '一意なユーザID。',
	-- 登録書式。bit管理
	entry_format int NOT NULL COMMENT '登録書式。bit管理',
	-- 登録状態。bit管理
	entry_status int NOT NULL COMMENT '登録状態。bit管理',
	-- 基底となる親コンテンツID
	base_parent_content_id int COMMENT '基底となる親コンテンツID',
	-- 祖先コンテンツID。親の親となるコンテンツIDを値を保持。
	grand_parent_content_id int COMMENT '祖先コンテンツID。親の親となるコンテンツIDを値を保持。',
	-- 親コンテンツID。親となるコンテンツIDを値を保持。
	parent_content_id int COMMENT '親コンテンツID。親となるコンテンツIDを値を保持。',
	-- コンテンツ情報の報告日
	-- 時刻なし
	report_date date NOT NULL COMMENT 'コンテンツ情報の報告日
時刻なし',
	-- コンテンツ情報の作成日
	create_date datetime NOT NULL COMMENT 'コンテンツ情報の作成日',
	-- コンテンツ情報の更新日
	update_dated datetime NOT NULL COMMENT 'コンテンツ情報の更新日',
	PRIMARY KEY (content_id),
	UNIQUE (content_id)
) ENGINE = InnoDB DEFAULT CHARACTER SET utf8;


CREATE TABLE user_inf
(
	-- 一意なユーザID。
	user_id varchar(30) NOT NULL COMMENT '一意なユーザID。',
	-- ユーザに紐付くパスワード。ハッシュ化されてDB保存。
	login_password varchar(512) COMMENT 'ユーザに紐付くパスワード。ハッシュ化されてDB保存。',
	-- ユーザに紐付く名前
	user_name varchar(30) NOT NULL COMMENT 'ユーザに紐付く名前',
	-- ユーザに紐付く性別。1：男、2：女、3：その他。
	user_sex tinyint NOT NULL COMMENT 'ユーザに紐付く性別。1：男、2：女、3：その他。',
	-- ユーザに紐付く権限。bit管理を行う。
	-- 
	user_authority int NOT NULL COMMENT 'ユーザに紐付く権限。bit管理を行う。
',
	-- ユーザに紐付く電話番号
	user_tel varchar(30) COMMENT 'ユーザに紐付く電話番号',
	-- ユーザに紐付くメールアドレス。
	user_mail varchar(30) COMMENT 'ユーザに紐付くメールアドレス。',
	-- コンテンツ情報の作成日
	create_date datetime NOT NULL COMMENT 'コンテンツ情報の作成日',
	-- コンテンツ情報の更新日
	update_dated datetime NOT NULL COMMENT 'コンテンツ情報の更新日',
	PRIMARY KEY (user_id),
	UNIQUE (user_id)
) ENGINE = InnoDB DEFAULT CHARACTER SET utf8;



/* Create Foreign Keys */

ALTER TABLE record_content_detail
	ADD FOREIGN KEY (fixed_item_id)
	REFERENCES fixed_item_inf (fixed_item_id)
	ON UPDATE RESTRICT
	ON DELETE RESTRICT
;


ALTER TABLE record_content_add
	ADD FOREIGN KEY (content_id)
	REFERENCES record_content_inf (content_id)
	ON UPDATE CASCADE
	ON DELETE CASCADE
;


ALTER TABLE record_content_detail
	ADD FOREIGN KEY (content_id)
	REFERENCES record_content_inf (content_id)
	ON UPDATE RESTRICT
	ON DELETE RESTRICT
;


ALTER TABLE record_content_inf
	ADD FOREIGN KEY (user_id)
	REFERENCES user_inf (user_id)
	ON UPDATE CASCADE
	ON DELETE CASCADE
;



