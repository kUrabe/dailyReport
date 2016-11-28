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
FLAG_ENTRY_FORMAT_TEMPLATE = 1;				// record_content_infテーブルの書式（テンプレート）を表す
FLAG_ENTRY_FORMAT_REPORT = 2;				// record_content_infテーブルの書式（日報）を表す
FLAG_ENTRY_FORMAT_COMMENT = 4;				// record_content_infテーブルの書式（コメント）を表す
FLAG_BUTTON_FUNCTION_BEFOR_PLAN = 2;		// fixed_item_infテーブルのボタン機能（前日予定）を表す
FLAG_BUTTON_FUNCTION_TODAY_RESULT = 4;		// fixed_item_infテーブルのボタン機能（当日結果）を表す

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
KEY_ENTRY_FORMAT = 'entry_format';				// 登録書式（日報、コメント、テンプレート）を管理するキー

KEY_BASE_PARENT_CONTENT_ID = 'base_parent_content_id';
KEY_GRAND_PARENT_CONTENT_ID = 'grand_parent_content_id';
KEY_PARENT_CONTENT_ID = 'parent_content_id';


KEY_SRC = 'src';								// src属性
KEY_DISABLED = 'disabled';						// disabled属性
KEY_NEW_REPORT_CREATE = 'report_create';		// 別ウインドウの開くボタンのname属性（日報作成画面）
KEY_NEW_COMMENT_CREATE = 'comment_create';		// 別ウインドウの開くボタンのname属性（コメント作成画面）
KEY_NEW_COMMENT_VIEW = 'comment_view';			// 別ウインドウの開くボタンのname属性（コメント詳細画面）
KEY_BUTTON_FUNCTION = 'button_function';		// コメント作成画面の固定機能ボタンのname属性
KEY_DIV = 'div';								// div要素
KEY_TEXT_AREA = 'textarea';						// textarea要素

KEY_SERACH_FROM_DATE = 'serach_from_date';		// 検索領域のfrom
KEY_SERACH_TO_DATE = 'serach_to_date';			// 検索領域のto
KEY_SERACH_USER = 'serach_user';				// 検索領域の対象ユーザ
KEY_SERACH_READ = 'serach_read';				// 検索領域の既読
KEY_SERACH_NOTE = 'serach_note';				// 検索領域の下書

KEY_USER_ID = 'user_id';
KEY_USER_NAME = 'user_name';
KEY_LOGIN_NAME = 'login_name';					// ログイン
KEY_INDEX_NAME = 'index_name';					// 見出し項目の値が入るのクラス名（ここに「予定」とか「結果」とか入る）。
KEY_DATE = 'date';

//日報作成画面のキー
KEY_MAIN = 'main';
KEY_TITLE = 'title';
KEY_REPORT_DATE = 'report_date';
KEY_NUMBER = 'number';
KEY_INDEX_AREA = 'index_area';
KEY_FIXED_ITEM_ID = 'fixed_item_id';
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
SELECTOR_LEFT_MENU = ".leftMenu";
SELECTOR_TOP_MENU = ".topMenu";
SELECTOR_MAIN_MENU = ".mainMenu";


SELECTOR_CATEGORY_STATUS = '.category_status';		// いいね、既読数の登録状態を管理するセレクタ
SELECTOR_BASE_PARENT_CONTENT_ID = '.base_parent_content_id';
SELECTOR_GRAND_PARENT_CONTENT_ID = '.grand_parent_content_id';
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
SELECTOR_REPORT_DETAIL = '.report_detail';			// レポートの詳細を囲む
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

// 日報作成、コメント詳細、コメント作成画面のセレクタ
SELECTOR_MAIN = '.main';
SELECTOR_MAIN_LAST = '.main:last';
SELECTOR_TITLE = '.title';
SELECTOR_REPORT_DATE = '.report_date';
SELECTOR_NUMBER = '.number';
SELECTOR_INDEX_AREA = '.index_area';
SELECTOR_FIXED_ITEM_ID = '.fixed_item_id';
SELECTOR_MAIN_TEXT = '.main_text';
SELECTOR_B_DEL_INDEX = '.b_del_index';
SELECTOR_B_FIXED = '.b_fixed';
SELECTOR_B_FIXED_BEORE_PLAN = '.b_fixed[name="' + FLAG_BUTTON_FUNCTION_BEFOR_PLAN + '"]';
SELECTOR_B_FIXED_TODAY_RESULT = '.b_fixed[name="' + FLAG_BUTTON_FUNCTION_TODAY_RESULT + '"]';
SELECTOR_B_ADD_INDEX = '.b_add_index';
SELECTOR_C_NOTE = '.c_note';
SELECTOR_B_ADD_REPORT = '.b_add_report';
SELECTOR_B_CANCEL = '.b_cancel';
SELECTOR_B_ADD_COMMENT = '.b_add_comment';				// コメント作成画面のコメントボタン(詳細画面のコメントするボタンにはTop画面と同じくSELECTOR_B_NEW_COMMENTを使用)


/*
 * path名(file名)
 * 
 * 命名規則
 * PATH + _ + キー名
 */
PATH_FAVORITE_ON = 'img/XXX.jpg';							// いいねが登録されている時のボタン画像
PATH_FAVORITE_OFF = 'img/XXX.jpg';							// いいねが解除されている時のボタン画像
PATH_COMMON = '/common';									// 共通処理系のリクエストpath
PATH_COMMON_SAVE_ADD_CONTENT = '/common/saveAddContent';	// 追加機能（いいね）等に対する処理リクエスト
PATH_TOP = '/top';											// top処理系のリクエストpath
PATH_TOP_PAGE_CONTENT = '/top/topPageContent';				// アコーディオン内を除くコンテンツの取得
PATH_TOP_PAGE_DETAIAL_CONTENT = '/top/topPageDetailContent';// アコーディオン内のコンテンツの取得
PATH_CREATE = '/create';									// create処理系のリクエストpath
PATH_CREATE_DELETE_CONTENT = '/create/deleteContent';		// 削除ボタン押下時のリクエストPATH
PATH_CREATE_BY_DAY = '/create/contentByDay';				// 作成画面の日付選択に応じたリクエストpath
PATH_CREATE_SAVE_CONTENT = '/create/saveContent';			// コンテンツ（日報・コメント）の新規・更新処理
PATH_CREATE_BEFORE_CONTENT = '/create/beforeContent';		// 前日以前の日報（予定）を取得
PATH_CREATE_SAVE_TEMPLATE = '/create/saveTemplate';			// テンプレートの新規・更新処理
PATH_LOGOUT = "/logout";

PATH_REPORT_CREATE = '/createWindow/report_create.html';			// 日報作成画面のPATH
PATH_COMMENT_CREATE = '/createWindow/comment_create.html';		// コメント作成画面のPATH
PATH_COMMENT_VIEW = '/createWindow/comment_view.html';			// コメント詳細画面のPATH

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

TAG_REPORT_AREA_START = '<div class="blockArea"><table class="tableIndex ">';
TAG_REPORT_AREA_END = '</table>';
TAG_REPORT_ACCORDION = '<div class="accordion_area"><div class="report_detail"></div><div class="comment_area"><div class="search_message"></div></div></div>';

// top画面のボタン
TAG_EDIT_BUTTON = '<button type="button" class="b_edit" name="">編集</button>';	// 編集ボタン
TAG_DELETE_BUTTON = '<button type="button" class="b_delete" name="">削除</button>';	// 削除ボタン
TAG_FAVORITE_BUTTON = '<button type="button" class="b_favorite" name="">いいね</button>';	// いいねボタン
TAG_NO_READ_BUTTON = '<button type="button" class="b_no_read" name="">未読にする</button>';	// ボタン
TAG_NEW_COMMENT_BUTTON = '<button type="button" class="b_new_comment" name="">コメントする</button>';	// ボタン
TAG_ACCORDION_BUTTON = '<button type="button" class="b_accordion" name="">閉じる</button>';	// ボタン
TAG__BUTTON = '<button type="button" class="" name=""></button>';	// ボタン


TAG_INDENT = '<div width="10"></div>';
TAG_TR_START = '<tr>';
TAG_TR_REPORT_INDEX_START = '<tr class="indexTR b_accordion">';
TAG_TR_REPORT_DETAIL_START = '<tr class="detailTR">';
TAG_TR_COMMENT_START = '<tr class="commentTR">';
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
SRT_SHOW_HIDE = 'ShowHide';							// 非表示にしたい要素のクラス名に付与する

STR_READ_IN = '含んで表示';							// 既読　含んで表示
STR_READ_OUT = '除いて表示';							// 既読　除いて表示
STR_READ_ONLY = 'のみ表示';							// 既読　のみ表示
STR_READ_IN_VAL = '1, null';						// 既読　含んで表示
STR_READ_OUT_VAL = 'null';							// 既読　除いて表示
STR_READ_ONLY_VAL = '1';							// 既読　のみ表示

STR_NOTE_IN = '含んで表示';							// 下書　含んで表示
STR_NOTE_OUT = '除いて表示';							// 下書　除いて表示
STR_NOTE_ONLY = 'のみ表示';							// 下書　のみ表示
STR_NOTE_IN_VAL = '1, 2';							// 下書　含んで表示
STR_NOTE_OUT_VAL = '2';								// 下書　除いて表示
STR_NOTE_ONLY_VAL = '1';							// 下書　のみ表示


//TODO:【未実装】ダイアログのコメント系が未定義
MESSAGE_DEL_INDEX = '見出しエリアを削除します。\n入力していたデータは消えますがよろしいですか？';
MESSAGE_FORMAT_ERROR = '見出しが1つもないため登録できません。';
MESSAGE_REPORT_ERROR = '内容に空白がある状態で報告は出来ません。\n下書きを保存する場合、チェックを入れてから報告してください。';
MESSAGE_COMMENT_ERROR = '内容が空白ではコメントできません。';
MESSAGE_LOGOUT = 'ログアウトしますか？';
MESSAGE_AJAX_ERROR = '通信に失敗しました。';
MESSAGE_SEARCH_NOT_DATA = '検索条件に一致する日報がありません。';


