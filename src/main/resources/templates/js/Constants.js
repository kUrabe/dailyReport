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
CHECKED = 'checked';	// チェックイベント
CHANGE = 'change';		// チェンジイベント

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
KEY_MAIN_TEXT = 'main_text';					// 各コンテンツの本文

KEY_SRC = 'src';								// src属性
KEY_DISABLED = 'disabled';						// disabled属性
KEY_NEW_REPORT_CREATE = 'report_create';		// 別ウインドウの開くボタンのname属性（日報作成画面）
KEY_NEW_COMMENT_CREATE = 'comment_create';		// 別ウインドウの開くボタンのname属性（コメント作成画面）
KEY_NEW_COMMENT_VIEW = 'comment_view';			// 別ウインドウの開くボタンのname属性（コメント詳細画面）
KEY_DIV = 'div';								// div要素
KEY_TEXT_AREA = 'textarea';						// textarea要素

KEY_SERACH_FROM_DATE = 'serach_from_date';		// 検索領域のfrom
KEY_SERACH_TO_DATE = 'serach_to_date';			// 検索領域のto
KEY_SERACH_USER = 'serach_user';				// 検索領域の対象ユーザ
KEY_SERACH_READ = 'serach_read';				// 検索領域の既読
KEY_SERACH_NOTE = 'serach_note';				// 検索領域の下書

KEY_USER_ID = 'user_id';
KEY_USER_NAME = 'user_name';
KEY_LOGIN_NAME = 'login_name';
KEY_INDEX_NAME = 'index_name';
KEY_DATE = 'date';

//日報作成画面のキー
KEY_MAIN = 'main';
KEY_TITLE = 'title';
KEY_REPORT_DATE = 'report_date';
KEY_NUMBER = 'number';
KEY_INDEX_AREA = 'index_area';
KEY_MAIN_TEXT = 'main_text';
KEY_B_DEL_INDEX = 'b_del_index';
KEY_B_FIXED = 'b_fixed';
KEY_B_ADD_INDEX = 'b_add_index';
KEY_C_NOTE = 'c_note';
KEY_B_ADD_REPORT = 'b_add_report';
KEY_B_CANCEL = 'b_cancel';


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

SELECTOR_SERACH_FROM_DATE = '.serach_from_date';	// 検索領域のfrom
SELECTOR_SERACH_TO_DATE = '.serach_to_date';		// 検索領域のto
SELECTOR_SERACH_USER = '.serach_user';				// 検索領域の対象ユーザ
SELECTOR_SERACH_READ = '.serach_read';				// 検索領域の既読
SELECTOR_SERACH_NOTE = '.serach_note';				// 検索領域の下書

SELECTOR_CONTENT_AREA = '.content_area';			// コンテンツ全体を囲む領域
SELECTOR_REPORT_AREA = '.report_area';				// レポートの概要と詳細を囲む領域
SELECTOR_COMMENT_AREA = '.comment_area';			// コメントの概要と1行文を囲む領域
SELECTOR_PARENT_AREA = '.blockArea';				// ボタンからみた親要素を囲むセレクタ(.report_areaやcomment_areaの中で、1行ごとにこれで囲む)
SELECTOR_PARENT_AREA_LAST = '.blockArea:last';
SELECTOR_ACCORDION_AREA = '.accordion_area'			// アコーディオンの対象を囲む領域
	
SELECTOR_USER_ID = '.user_id';
SELECTOR_USER_NAME = '.user_name';
SELECTOR_LOGIN_NAME = '.login_name';

// top画面のボタンセレクタ
SELECTOR_B_SERACH = '.b_serach';
SELECTOR_B_NEW_REPORT = '.b_new_report';
SELECTOR_B_LOGOUT = '.b_logout';
SELECTOR_B_NEW_COMMENT = '.b_new_comment';
SELECTOR_B_CLOSE = '.b_close';
SELECTOR_B_NO_READ = '.b_no_read';
SELECTOR_B_FAVORITE = '.b_favorite';
SELECTOR_B_EDIT = '.b_edit';
SELECTOR_B_DELETE = '.b_delete';
SELECTOR_B_ACCORDION = '.b_accordion';

// 日報作成画面のセレクタ
SELECTOR_MAIN = '.main';
SELECTOR_MAIN_LAST = '.main:last';
SELECTOR_TITLE = '.title';
SELECTOR_REPORT_DATE = '.report_date';
SELECTOR_NUMBER = '.number';
SELECTOR_INDEX_AREA = '.index_area';
SELECTOR_MAIN_TEXT = '.main_text';
SELECTOR_B_DEL_INDEX = '.b_del_index';
SELECTOR_B_FIXED = '.b_fixed';
SELECTOR_B_ADD_INDEX = '.b_add_index';
SELECTOR_C_NOTE = '.c_note';
SELECTOR_B_ADD_REPORT = '.b_add_report';
SELECTOR_B_CANCEL = '.b_cancel';


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
TAG_TOP_TABLE_START ='<table class="">';								// tableの開始タグ
TAG_TOP_TABLE_END = '</table>';
TAG_INDENT = '<div width="10"></div>';
TAG_TR_START = '<tr>';
TAG_TR_END = '</tr>';
TAG_TD_START = '<td>';
TAG_TD_END = '</td>';

// レポート作成画面の見出し追加ボタンによって追加される一式
TAG_REPORT_CREATE_WINDOW_INDEX = '<div class="blockArea"><div class="number"></div><textarea class="index_area"></textarea><input type="button" class="b_del_index" value="見出し削除"><textarea class="main_text"></textarea></div>';




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
STR_MESSAGE = 'message';
STR_PLAN = '予定';

//TODO:【未実装】ダイアログのコメント系が未定義
MESSAGE_DEL_INDEX = '見出しエリアを削除します。\n入力していたデータは消えますがよろしいですか？';
