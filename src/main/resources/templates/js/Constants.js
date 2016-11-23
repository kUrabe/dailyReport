/**
 * ファイル名：	Constants.js
 * 概要：		システム内で使用する各種定数を宣言するファイル。
 * 作成日：	2016/11/22
 * 作成者：	k.urabe
 * path：		js/Constants.js
 */

/*
 * 共通命名規則
 * 1.すべて大文字(数字は使用可)
 * 2.分野ごとに分けて定義
 * 3.内容やキー名などを表す単語が複数個になる場合は、「_」でつなぐ
 */

/* 以下より定義領域 */

/*
 * イベント名
 */
CLICK = 'click';		// クリックイベント

/*
 * フラグ
 * 
 * 命名規則
 * FLAG + _ + 内容
 */
FLAG_CATEGORY_STATUS_REG = 1;				// record_content_addテーブルの登録状態を表す
FLAG_CATEGORY_STATUS_DEL = 2;				// record_content_addテーブルの削除状態を表す
FLAG_ADD_CATEGORY_NOREAD = 1;				// record_content_addテーブルの未読機能（既読状態）
FLAG_ADD_CATEGORY_FAVORITE = 2;				// record_content_addテーブルのいいね機能
FLAG_ENTRY_STATUS_NOTE = 1;					// record_content_infテーブルの下書状態を表す
FLAG_ENTRY_STATUS_REG = 2;					// record_content_infテーブルの登録状態を表す
FLAG_ENTRY_STATUS_DEL = 4;					// record_content_infテーブルの削除状態を表す

/*
 * キー名
 * 
 * 命名規則
 * KEY + _ + キー名
 */
KEY_CATEGORY_STATUS = 'category_status';		// いいね、既読数の登録状態を管理するキー
KEY_PARENT_CONTENT_ID = 'parent_content_id';	// 親コンテンツIDを管理するキー
KEY_CONTENT_ID = 'content_id';					// コンテンツIDを管理するキー
KEY_ADD_CATEGORY = 'add_category';				// 追加種別（いいね、未読）を管理するキー
KEY_ENTRY_STATUS = 'entry_status';				// コンテンツの登録状態（下書、登録、削除）を管理するキー

KEY_SRC = 'src';								// src属性
KEY_DISABLED = 'disabled';						// disabled属性
KEY_PARENT_AREA = 'div .blockArea';				// ボタンからみた親要素を囲むセレクタ
KEY_NEW_REPORT_CREATE = 'report_create';		// 別ウインドウの開くボタンのname属性（日報作成画面）
KEY_NEW_COMMENT_CREATE = 'comment_create';		// 別ウインドウの開くボタンのname属性（コメント作成画面）
KEY_NEW_COMMENT_VIEW = 'comment_view';			// 別ウインドウの開くボタンのname属性（コメント詳細画面）

/*
 * セレクタ名
 * 
 * 命名規則
 * SELECTOR + _ + キー名
 */
SELECTOR_CATEGORY_STATUS = '.category_status';		// いいね、既読数の登録状態を管理するセレクタ
SELECTOR_PARENT_CONTENT_ID = '.parent_content_id';	// 親コンテンツIDを管理するセレクタ
SELECTOR_CONTENT_ID = '.content_id';				// コンテンツIDを管理するセレクタ
SELECTOR_FAVORITE_COUNT = '.favorite_count';		// いいね集計項目のセレクタ
SELECTOR_READ_COUNT = '.read_count';				// 既読集計項目のセレクタ
SELECTOR_ENTRY_STATUS = '.entry_status';			// コンテンツの登録状態（下書、登録、削除）を管理するセレクタ
SELECTOR_SERACH_MESSAGE = '.serach_message';		// 検索結果が0件の際にメッセージを表示するセレクタ

/*
 * path名(file名)
 * 
 * 命名規則
 * PATH + _ + キー名
 */
PATH_FAVORITE_ON = 'img/XXX.jpg';					// いいねが登録されている時のボタン画像
PATH_FAVORITE_OFF = 'img/XXX.jpg';					// いいねが登録されている時のボタン画像
PATH_COMMON = '/common';							// 共通処理系のリクエストpath
PATH_TOP = '/top';									// top処理系のリクエストpath
PATH_CREATE = '/create';							// create処理系のリクエストpath
PATH_REPORT_CREATE = '/create/report_create.html';	// 日報作成画面のPATH
PATH_COMMENT_CREATE = '/create/comment_create.html';	// コメント作成画面のPATH
PATH_COMMENT_VIEW = '/create/comment_view.html';	// コメント詳細画面のPATH

/*
 * tag名
 * 
 * 命名規則
 * TAG + _ + 内容
 */
TAG_NEW_PAGE_PARENT_CONTENT_ID = '<div class="parent_content_id">';		// 別ウインドウのHTML文字列に親コンテンツID埋めるため
TAG_NEW_PAGE_CONTENT_ID = '<div class="content_id">';					// 別ウインドウのHTML文字列にコンテンツID埋めるため
TAG_DIV_END = '</div>';													// divタグの終了
TAG_TOP_TABLE_START ='<table class="">';


/*
 * メッセージ、単語、区切り記号等
 * 
 * 命名規則
 * メッセージ → MESSAGE + _ + 内容
 * 単語 → STR + _ + 内容
 * 区切り等 → MARK + _ + 内容
 */
STR_TRUE = 'true';
STR_FALSE = 'false';
STR_CREATE = 'create';								// サーバへ渡すパラメータにリクエストする処理をマッピングさせるための単語
STR_READ = 'read';									// サーバへ渡すパラメータにリクエストする処理をマッピングさせるための単語
STR_UPDATE = 'update';								// サーバへ渡すパラメータにリクエストする処理をマッピングさせるための単語
STR_DELETE = 'delete';								// サーバへ渡すパラメータにリクエストする処理をマッピングさせるための単語



