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
FLAG_BUTTON_FUNCTION_BEFOR_PLAN = '2';		// fixed_item_infテーブルのボタン機能（前日予定）を表す
FLAG_BUTTON_FUNCTION_TODAY_RESULT = '4';		// fixed_item_infテーブルのボタン機能（当日結果）を表す
FLAG_ITEM_STATUS_REG = 2;					// fixed_item_infテーブルの固定項目登録状態
FLAG_ITEM_STATUS_REG_LOCK = 3;				// fixed_item_infテーブルの固定項目登録かつロック状態
FLAG_ITEM_STATUS_DEL = 4;					// fixed_item_infテーブルの固定項目削除状態

FLAG_USER_STATUS_REG = 1;					// user_infテーブルのユーザが登録状態
FLAG_USER_STATUS_DEL = 2;					// user_infテーブルのユーザが削除状態
FLAG_USER_STATUS_TMP = 4;					// user_infテーブルのユーザが未承認状態


FLAG_EAD_STATUS_ON = 1;

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
KEY_READ_STATUS = 'read_status';				// 既読未読状態項目のキー
KEY_DETAIL_ID = 'detail_id';				// コンテンツ詳細の番号

KEY_DB_USER_ID = 'userId';
KEY_DB_ENTRY_STATUS = 'entryStatus';
KEY_DB_CONTENT_ID = 'contentId';
KEY_DB_BASE_PARENT_CONTENT_ID = 'baseParentContentId';
KEY_DB_GRAND_PARENT_CONTENT_ID = 'grandParentContentId';
KEY_DB_PARENT_CONTENT_ID = 'parentContentId';

KEY_BASE_PARENT_CONTENT_ID = 'base_parent_content_id';
KEY_GRAND_PARENT_CONTENT_ID = 'grand_parent_content_id';
KEY_PARENT_CONTENT_ID = 'parent_content_id';

KEY_FAVORITE_COUNT = 'favorite_count';		// いいね集計項目のセレクタ
KEY_FAVARITE_STATUS = 'favorite_status';		// 対象記事に対してその人がいいねを付けているか。1は付けてる。0は付けてない

KEY_SRC = 'src';								// src属性
KEY_DISABLED = 'disabled';						// disabled属性
KEY_NEW_REPORT_CREATE = 'report_create';		// 別ウインドウの開くボタンのname属性（日報作成画面）
KEY_NEW_COMMENT_CREATE = 'comment_create';		// 別ウインドウの開くボタンのname属性（コメント作成画面）
KEY_NEW_COMMENT_VIEW = 'comment_view';			// 別ウインドウの開くボタンのname属性（コメント詳細画面）
KEY_BUTTON_FUNCTION = 'button_function';		// コメント作成画面の固定機能ボタンのname属性
KEY_DIV = 'div';								// div要素
KEY_FORM = 'form';								// form要素
KEY_METHOD = 'method';							// method属性
KEY_ACTION = 'action';							// action属性
KEY_TEXT_AREA = 'textarea';						// textarea要素
KEY_DISPLAY = 'display';						// display属性
KEY_DISABLED = 'disabled';						// disabled属性
KEY_BUTTON = 'button';							// button要素
KEY_PARENT_AREA = 'blockArea';					// ボタンからみた親要素を囲むセレクタ(.report_areaやcomment_areaの中で、1行ごとにこれで囲む)

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
KEY_LOGIN_PASSWORD = 'login_password';
KEY_USER_BIRTHDAY = 'user_birthday';

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
KEY_B_NEW_COMMENT = 'b_new_comment';		// コメントするボタン
KEY_B_NEW_REPORT = 'b_new_report';		// 新規日報ボタン

// ユーザ一覧・編集画面（以下のボタン以外は、他画面の名称を流用）
KEY_USER_LINE = 'user_line';					// ユーザ一覧1行ごとにセットされている別ウインドウオープン用判別value
KEY_MIN = 'min';								// 検索項目のminキー名
KEY_MAX = 'max';								// 検索項目のmaxキー名
KEY_USER_SEX = 'user_sex';						// 検索項目の性別キー名
KEY_B_NEW_USER = 'b_new_user';					// 登録ボタン
KEY_B_APPROVAL_USER = 'b_approval_user';		// 承認ボタン
KEY_B_OVER_LAP = 'b_over_lap';					// 重複チェックボタン
KEY_B_ADD_MAIL = 'b_add_mail';					// メールアドレス追加ボタン
KEY_B_DEL_MAIL = 'b_del_mail';					// メールアドレス削除ボタン
KEY_B_ADD_ADDRESS = 'b_add_address';				// 住所追加ボタン
KEY_B_DEL_ADDRESS = 'b_del_address';				// 住所削除ボタン
KEY_B_ADD_TEL = 'b_add_tel';						// 電話番号加ボタン
KEY_B_DEL_TEL = 'b_del_tel';						// 電話番号削除ボタン
KEY_B_ADD_QUALIFICATION = 'b_add_qualification';	// 住所追加ボタン
KEY_B_DEL_QUALIFICATION = 'b_del_qualification';	// 住所削除ボタン
KEY_B_ADD_FAMILY = 'b_add_family';					// 家族構成追加ボタン
KEY_EDIT_FAMILY = 'edit_family';					// 家族の行（対象を編集）
KEY_B_CONTENT_DEL = 'b_content_del';				// 追加コンテンツの削除ボタン
KEY_CAMPANY_ID = 'campany_id';
KEY_DEPARTMENT_ID = 'department_id';
KEY_POSITION_ID = 'position_id';
KEY_USER_SATTUS = 'user_status';
KEY_FAMILY_NAME = '.family_name';
KEY_FAMILY_NAME_KANA = 'family_name_kana';
KEY_FAMILY_RELATION = 'family_relation';
KEY_FAMILY_SUPPORT = 'family_support';

KEY_B_USER_LIST_WINDOW = 'b_user_list_window';
KEY_B_USER_EDIT_WINDOW = 'b_user_edit_window';

KEY_F_ON = 'f-on';								// いいねボタンを押下している状態のボタンに付与
KEY_R_ON = 'r-on';								// 未読にするボタンを押下している状態（未読状態）のボタンに付与
KEY_INDEX_LINE = 'indexLine';					// アコーディオン開閉時に押下されたのが、行なのかボタンなのか判定するためのクラス名
KEY_B_EDIT='b_edit';							// 編集ボタン機能を持たすタグに付与するValue 
KEY_B_COMMENT_EDIT='b_comment_edit';			// 編集ボタン機能（コメント編集）

KEY_OPEN = 'open';					// 展開済みデータに与えるキー
KEY_OPEN_FLAG = '1';				// 展開済みデータに与えるflag値

/*
 * セレクタ名
 * 
 * 命名規則
 * SELECTOR + _ + キー名
 */
SELECTOR_LEFT_MENU = '.leftMenu';			// トップ画面の左領域
SELECTOR_TOP_MENU = '.topMenu';				// トップ画面の上領域
SELECTOR_MAIN_MENU = '.mainMenu';			// トップ画面のメイン領域
SELECTOR_DOWN_MENU = '.downMenu';			// 下領域


SELECTOR_CATEGORY_STATUS = '.category_status';		// いいね、既読数の登録状態を管理するセレクタ
SELECTOR_BASE_PARENT_CONTENT_ID = '.base_parent_content_id';
SELECTOR_GRAND_PARENT_CONTENT_ID = '.grand_parent_content_id';
SELECTOR_PARENT_CONTENT_ID = '.parent_content_id';	// 親コンテンツIDを管理するセレクタ
SELECTOR_CONTENT_ID = '.content_id';				// コンテンツIDを管理するセレクタ
SELECTOR_TEMP_CONTENT_ID = '.temp_content_id';		// テンプレート用コンテンツIDを管理するセレクタ	
SELECTOR_FAVORITE_COUNT = '.favorite_count';		// いいね集計項目のセレクタ
SELECTOR_FAVARITE_STATUS = '.favorite_status';		// 対象記事に対してその人がいいねを付けているか。1は付けてる。0は付けてない
SELECTOR_READ_COUNT = '.read_count';				// 既読集計項目のセレクタ
SELECTOR_ENTRY_STATUS = '.entry_status';			// コンテンツの登録状態（下書、登録、削除）を管理するセレクタ
SELECTOR_ENTRY_FORMAT = '.entry_format';			// コンテンツの登録様式
SELECTOR_SERACH_MESSAGE = '.serach_message';		// 検索結果が0件の際にメッセージを表示するセレクタ
SELECTOR_READ_STATUS = '.read_status';				// 既読未読状態項目のセレクタ
SELECTOR_COMMENT_COUNT = '.comment_count';			// コメント集計項目のセレクタ
SELECTOR_MAIN_TEXT = '.main_text';					// コメント本文のセレクタ

SELECTOR_SERACH_FROM_DATE = '.serach_from_date';	// 検索領域のfrom
SELECTOR_SERACH_TO_DATE = '.serach_to_date';		// 検索領域のto
SELECTOR_SERACH_USER = '.serach_user';				// 検索領域の対象ユーザ
SELECTOR_SERACH_READ = '.serach_read';				// 検索領域の既読
SELECTOR_SERACH_NOTE = '.serach_note';				// 検索領域の下書
SELECTOR_OPTION = 'option:selected';				// 既読と下書きの選択されている値を取得するためのセレクタ

SELECTOR_CONTENT_AREA = '.content_area';			// コンテンツ全体を囲む領域
SELECTOR_REPORT_AREA = '.report_area';				// レポートの概要と詳細を囲む領域
SELECTOR_CONTENT_DETAIL = '.content_detail';			// レポートの詳細を囲む
SELECTOR_COMMENT_AREA = '.comment_area';			// コメントの概要と1行文を囲む領域
SELECTOR_PARENT_AREA = '.blockArea';				// ボタンからみた親要素を囲むセレクタ(.report_areaやcomment_areaの中で、1行ごとにこれで囲む)
SELECTOR_PARENT_AREA_LAST = '.blockArea:last';		// blockArea（行とアコーディオンを囲む1つの範囲）の最後を指定
SELECTOR_ACCORDION_AREA = '.accordion_area';		// アコーディオンの対象を囲む領域
SELECTOR_DIV_LAST = 'div:last';						// divの最後の要素を指定
	
SELECTOR_USER_ID = '.user_id';
SELECTOR_USER_NAME = '.user_name';
SELECTOR_LOGIN_NAME = '.login_name';
SELECTOR_LOGIN_ID = '.login_id';
SELECTOR_LOGIN_PASSWORD = '.login_password';
SELECTOR_USER_BIRTHDAY = '.user_birthday';


// ユーザ一覧・編集画面系（以下のボタン以外は、他画面の名称を流用）
SELECTOR_USER_LINE = '.user_line';					// ユーザ一覧1行ごとにセットされている別ウインドウオープン用判別value
SELECTOR_MIN = '.min';								// 検索項目のminセレクター名
SELECTOR_MAX = '.max';								// 検索項目のmaxセレクター名
SELECTOR_USER_SEX = '.user_sex';					// 検索項目の性別キー名
SELECTOR_B_NEW_USER = '.b_new_user';					// 登録ボタン
SELECTOR_B_APPROVAL_USER = '.b_approval_user';		// 承認ボタン
SELECTOR_B_OVER_LAP = '.b_over_lap';					// 重複チェックボタン
SELECTOR_B_ADD_MAIL = '.b_add_mail';					// メールアドレス追加ボタン
SELECTOR_B_DEL_MAIL = '.b_del_mail';					// メールアドレス削除ボタン
SELECTOR_B_ADD_ADDRESS = '.b_add_address';				// 住所追加ボタン
SELECTOR_B_DEL_ADDRESS = '.b_del_address';				// 住所削除ボタン
SELECTOR_B_ADD_TEL = '.b_add_tel';						// 電話番号加ボタン
SELECTOR_B_DEL_TEL = '.b_del_tel';						// 電話番号削除ボタン
SELECTOR_B_ADD_QUALIFICATION = '.b_add_qualification';	// 資格追加ボタン
SELECTOR_B_DEL_QUALIFICATION = '.b_del_qualification';	// 資格削除ボタン
SELECTOR_B_ADD_FAMILY = '.b_add_family';					// 家族構成追加ボタン
SELECTOR_EDIT_FAMILY = '.edit_family';					// 家族の行（対象を編集）
SELECTOR_ADD_CONTENT = '.add_content';				// 増減コンテンツ識別用のクラス名
SELECTOR_NOMAL_CONTENT = '.nomal_content';			// 増減コンテンツ以外の識別用クラス名
SELECTOR__B_CONTENT_DEL = '.b_content_del';				// 追加コンテンツの削除ボタン
SELECTOR_CAMPANY_ID = '.campany_id';					// 会社ID
SELECTOR_DEPARTMENT_ID = '.department_id';				// 部署ID
SELECTOR_POSITION_ID = '.position_id';					// 役職ID
SELECTOR_USER_STATUS = '.user_status';				// ユーザステータス（登録、削除、未承認）

SELECTOR_FAMILY_NAME = '.family_name';
SELECTOR_FAMILY_NAME_KANA = '.family_name_kana';
SELECTOR_FAMILY_RELATION = '.family_relation';
SELECTOR_FAMILY_SUPPORT = '.family_support';
SELECTOR_B_UPDATE = '.b_update';

SELECTOR_B_USER_LIST_WINDOW = '.b_user_list_window';
SELECTOR_B_USER_EDIT_WINDOW = '.b_user_edit_window';


// top画面のボタンセレクタ
SELECTOR_B_SERACH = '.b_serach';				// 検索ボタン
SELECTOR_B_NEW_REPORT = '.b_new_report';		// 新規日報ボタン
SELECTOR_B_LOGOUT = '.b_logout';				// ログアウトボタン
SELECTOR_B_NEW_COMMENT = '.b_new_comment';		// コメントするボタン
SELECTOR_B_CLOSE = '.b_close';					// 閉じる（アコーディオン）ボタン
SELECTOR_B_NO_READ = '.b_no_read';				// 未読にするボタン
SELECTOR_B_FAVORITE = '.b_favorite';			// いいねボタン
SELECTOR_B_EDIT = '.b_edit';					// 編集ボタン
SELECTOR_B_COMMENT_EDIT='.b_comment_edit';			// 編集ボタン機能（コメント編集）
SELECTOR_B_DELETE = '.b_delete';				// 削除ボタン
SELECTOR_B_ACCORDION = '.b_accordion';			// アコーディオンが仕掛けられるセレクタ
SELECTOR_B_ACCORDION_LAST = '.b_accordion:last';
SELECTOR_LAST = ':last';

// 日報作成、コメント詳細、コメント作成画面のセレクタ
SELECTOR_MAIN = '.main';						// 各画面のJSONデータ展開先
SELECTOR_MAIN_LAST = '.main:last';				// 上記のLast要素
SELECTOR_TITLE = '.title';						// ページタイトル
SELECTOR_REPORT_DATE = '.report_date';			// 日報作成画面の日報報告日
SELECTOR_NUMBER = '.number';					// 見出し番号
SELECTOR_INDEX_AREA = '.index_area';			// 見出し文字列
SELECTOR_FIXED_ITEM_ID = '.fixed_item_id';		// 固定ID
SELECTOR_ITEM_STATUS = '.item_status';			// 固定アイテムのステータス
SELECTOR_BUTTON_FUNCTION = '.button_function';		// コメント作成画面の固定機能ボタンのname属性
SELECTOR_MAIN_TEXT = '.main_text';				// 本文
SELECTOR_B_DEL_INDEX = '.b_del_index';			// 見出し削除ボタン
SELECTOR_B_FIXED = '.b_fixed';					// 固定機能ボタン（前日予定、本日結果など）
SELECTOR_GET_INDEX_NAME = '.get_index_name';
SELECTOR_B_FIXED_BEORE_PLAN = '.b_fixed[name="' + FLAG_BUTTON_FUNCTION_BEFOR_PLAN + '"]';		// 固定機能ボタン（前日予定）を表すname属性
SELECTOR_B_FIXED_TODAY_RESULT = '.b_fixed[name="' + FLAG_BUTTON_FUNCTION_TODAY_RESULT + '"]';	// 固定機能ボタン（当日結果）を表すname属性
SELECTOR_B_ADD_INDEX = '.b_add_index';			// 見出し追加ボタン
SELECTOR_C_NOTE = '.c_note';					// 下書チェックボックス
SELECTOR_B_ADD_REPORT = '.b_add_report';		// 報告ボタン
SELECTOR_B_ADD_TEMPLATE = '.b_add_template';	// フォーマット保存ボタン
SELECTOR_B_CANCEL = '.b_cancel';				// キャンセル、閉じるボタン
SELECTOR_B_ADD_COMMENT = '.b_add_comment';		// コメント作成画面のコメントボタン(詳細画面のコメントするボタンにはTop画面と同じくSELECTOR_B_NEW_COMMENTを使用)
SELECTOR_COMMENT_DATE = '.comment_date';		// コメント詳細の当該コメント日付
SELECTOR_COMMENT_USER = '.comment_user';		// コメント詳細の当該コメント投稿ユーザ名
SELECTOR_SEND_TO = '.sendTo';					// コメント作成画面の誰宛の何へのコメントなのか表示する領域
SELECTOR_TABLE_INDEX = '.tableIndex';
SELECTOR_INDEX_TR = '.indexTR';
SELECTOR_INDEX_LINE = '.index_line';			// トップ画面の見出し項目を囲むセレクタ（報告日、報告者など）
SELECTOR_CONTENT_INDEX = '.content_index';		// トップ画面の1行概要を囲むセレクタ。（当該タグにはb_accordionも付く）
SELECTOR_DIV_NAME_START = 'div[name=';			// divダグのname属性をしていする際に使用するセレクタ
SELECTOR_DIV_NAME_END = ']';					// divダグのname属性をしていする際に使用するセレクタ
SELECTOR_NAME_START = '[name=';					// name属性で何かを指定する際
SELECTOR_NAME_END = ']';						// name属性で何かを指定する際
SELECTOR_BUTTON_NAME = '.button_name';

SELECTOR_LINE = '.line';							// blockAreaに付与される行番号セレクタ
SELECTOR_COMMENT_LINE = '.comment_line';		// コメント1行分の領域セレクタ

SELECTOR_F_ON = '.f-on';								// いいねボタンを押下している状態のボタンに付与
SELECTOR_R_ON = '.r-on';								// 未読にするボタンを押下している状態（未読状態）のボタンに付与

/*
 * path名(file名)
 * 
 * 命名規則
 * PATH + _ + キー名
 */
PATH_USER_AUTH = '/common/userAuth';						// ログインユーザが管理者権限を持つか判定
PATH_FAVORITE_ON = 'img/XXX.jpg';							// いいねが登録されている時のボタン画像
PATH_FAVORITE_OFF = 'img/XXX.jpg';							// いいねが解除されている時のボタン画像
PATH_COMMON = '/common';									// 共通処理系のリクエストpath
PATH_COMMON_SAVE_ADD_CONTENT = '/common/saveAddContent';	// 追加機能（いいね）等に対する処理リクエスト
PATH_TOP = '/top';											// top処理系のリクエストpath
PATH_TOP_PAGE_CONTENT = '/top/topPageContent';				// アコーディオン内を除くコンテンツの取得
PATH_TOP_PAGE_DETAIAL_CONTENT = '/top/topPageDetailContent';// アコーディオン内のコンテンツの取得(コメント除く)
PATH_TOP_PAGE_DETAIAL_COMMENT = '/top/topPageDetailComment';// アコーディオン内のコンテンツの取得（コメント）

PATH_CREATE = '/create';									// create処理系のリクエストpath
PATH_COMMON_DELETE_CONTENT = '/common/deleteContent';		// 削除ボタン押下時のリクエストPATH
PATH_CREATE_BY_DAY = '/create/contentByDay';				// 作成画面の日付選択に応じたリクエストpath
PATH_CREATE_SAVE_CONTENT = '/create/saveContent';			// コンテンツ（日報・コメント）の新規・更新処理
PATH_CREATE_BEFORE_CONTENT = '/create/beforeContent';		// 前日以前の日報（予定）を取得
PATH_CREATE_SAVE_TEMPLATE = '/create/saveTemplate';			// テンプレートの新規・更新処理
PATH_LOGOUT = "/logout";									// ログアウトのリクエストパス

PATH_REPORT_CREATE = '/createWindow/report_create.html';			// 日報作成画面のPATH
PATH_COMMENT_CREATE = '/createWindow/comment_create.html';		// コメント作成画面のPATH
PATH_COMMENT_VIEW = '/createWindow/comment_view.html';			// コメント詳細画面のPATH

PATH_USER_GET_BASE_INF = '/user/getBaseInf';					// ユーザ編集画面（ユーザ指定時）開いた際のベース情報取得
PATH_USER_GET_ADD_INF = '/user/getAddInf';						// ユーザ編集画面（ユーザ指定時）開いた際の追加（ユーザに対して複数紐付く）情報取得
PATH_USER_SAVE_BASE_INF = '/user/saveBaseInf';					// ユーザ編集画面のユーザ新規登録時（ベース）
PATH_USER_UPDATE_BASE_INF = '/user/updateBaseInf';				// ユーザ編集画面のユーザ承認・更新時（ベース）
PATH_USER_SAVE_ADD_INF = '/user/saveAddInf';					// ユーザ編集画面の登録・承認・更新時（追加情報）
PATH_USER_DELETE_INF = '/user/deleteUserInf';					// ユーザ編集画面の削除時
PATH_USER_MATCH_INF = '/user/matchUserInf';						// ユーザ一覧画面の検索結果取得

PATH_USER_WINDOW_EDIT = '/userWindow/userEditWindow.html';		// ユーザ編集画面のPATH(認証済み)
PATH_USER_WINDOW_FAMILY = '/userWindow/familyEditWindow.html';	// 家族構成編集画面のPATH
PATH_USER_WINDOW_LIST = '/userWindow/userListWindow.html';		// ユーザ一覧画面のPATH
PATH_USRE_CHACK = 'common/userId';								// ユーザID存在チェックのPATH


/*
 * tag名
 * 
 * 命名規則
 * TAG + _ + 内容
 */
TAG_NEW_PAGE_PARENT_CONTENT_ID = '<div class="parent_content_id">';		// 別ウインドウのHTML文字列に親コンテンツID埋めるため
TAG_NEW_PAGE_CONTENT_ID = '<div class="content_id">';					// 別ウインドウのHTML文字列にコンテンツID埋めるため
TAG_DIV_START = '<div>';												// divタグの開始
TAG_DIV_END = '</div>';													// divタグの終了
TAG_TOP_TABLE_START ='<table class="">';								// tableの開始タグ
TAG_TOP_TABLE_END = '</table>';

// トップ画面 日報概要の見出し
TAG_REPORT_INDEX_LINE = '<div class="index_line"><div>報告日</div><div>報告者</div><div>既読者</div><div>ステータス</div><div>コメント数</div><div>いいね数</div></div>';
// トップ画面 コメントの概要の見出し
TAG_COMMENT_INDEX_LINE = '<div class="index_line"><div>投稿日</div><div>投稿者</div><div>既読者</div><div>ステータス</div><div>コメント数</div><div>いいね数</div></div>';

// トップ画面日報概要の見出し
TAG_REPORT_LINE = '<div class="report_date" name="reportDate"></div><div class="content_id" name="contentId"></div><div class="user_id" name="userId"></div><div class="user_name" name="userName"></div><div class="entry_format" name="entryFormat"></div><div class="entry_status" name="entryStatus"></div><div class="base_parent_content_id" name="baseParentContentId"></div><div class="grand_parent_content_id" name="grandParentContentId"></div><div class="parent_content_id" name="parentContentId"></div><div class="read_count" name="read_count"></div><div class="read_status" name="read_status"></div><div class="comment_count" name="comment_count"></div><div class="favorite_count" name="favorite_count"></div><div class="favorite_status" name="favorite_status"></div>';
// トップ画面コメント1行分の見出し
TAG_COMMENT_LINE = '<div class="report_date" name="reportDate"></div><div class="content_id" name="contentId"></div><div class="user_id" name="userId"></div><div class="user_name" name="userName"></div><div class="entry_format" name="entryFormat"></div><div class="entry_status" name="entryStatus"></div><div class="base_parent_content_id" name="baseParentContentId"></div><div class="grand_parent_content_id" name="grandParentContentId"></div><div class="parent_content_id" name="parentContentId"></div><div class="read_count" name="read_count"></div><div class="read_status" name="read_status"></div><div class="comment_count" name="comment_count"></div><div class="favorite_count" name="favorite_count"></div><div class="favorite_status" name="favorite_status"></div><div class="main_text" name="main_text"></div>';


// トップ画面日報詳細の1レコード文
TAG_REPORT_DETAIL_LINE = '<div class="content_id" name="content_id"></div><div class="detail_id" name="detail_id"></div><div class="fixed_item_id" name="fixed_item_id"></div><div class="index_name" name="index_name"></div><div class="main_text" name="main_text"></div>';

// 日報概要の1行とアコーディオン範囲を包むブロックエリアのタグ
TAG_BLOCK_AREA = '<div class="blockArea"></div>';
// 日報概要の1行を表すタグ
TAG_LINE_START = '<div class="content_index b_accordion indexLine"></div>';
// コメント1行分を表すタグ
TAG_LINE_START_COMMENT = '<div class="comment_line"></div>';

// 日報概要の行内の1項目を表すタグ
TAG_IN_LINE_ITEM = '<span class=""></span>';
// アコーディオンエリアのフォーマットタグを追加する（共通のボタンも）
TAG_REPORT_ACCORDION = '<div class="accordion_area"><div class="content_detail"></div><div class="comment_area"><div class="title">コメント一覧</div><button type="button" class="b_new_comment" value="b_new_comment">コメントする</button><div class="serach_message"></div></div><button type="button" class="b_accordion">閉じる</button></div>';



TAG_REPORT_AREA_START = '<div class="blockArea"><table class="tableIndex ">';
TAG_REPORT_AREA_END = '</table>';

// top画面のボタン
TAG_EDIT_BUTTON = '<button type="button" class="b_edit" value="b_edit">編集</button>';	// 編集ボタン
TAG_DELETE_BUTTON = '<button type="button" class="b_delete" value="b_delete">削除</button>';	// 削除ボタン
TAG_FAVORITE_BUTTON = '<button type="button" class="b_favorite" value="2">いいね</button>';	// いいねボタン(日報用)
TAG_NO_READ_BUTTON = '<button type="button" class="b_no_read" value="1">未読にする</button>';	// 未読にするボタン(日報用)
TAG_FAVORITE_BUTTON_COMMENT = '<button type="button" class="b_favorite" value="2" style="display:none">いいね</button>';	// いいねボタン(コメント用)
TAG_NO_READ_BUTTON_COMMENT = '<button type="button" class="b_no_read" value="1" style="display:none">未読にする</button>';	// 未読にするボタン(コメント用)
TAG_NEW_COMMENT_BUTTON = '<button type="button" class="b_new_comment" value="b_new_comment">コメントする</button>';	// コメントするボタン
TAG_ACCORDION_BUTTON = '<button type="button" class="b_accordion">閉じる</button>';	// ボタン

TAG_USER_LIST_WINDOW_BUTTON = '<button type="button" class="b_user_list_window" name="b_user_list_window" value="b_user_list_window">ユーザ一覧画面</button>';	// ボタン
TAG_USER_EDIT_WINDOW_BUTTON = '<button type="button" class="b_user_edit_window" name="b_user_edit_window" value="b_user_edit_window">ユーザ編集画面</button>';	// ボタン

TAG__BUTTON = '<button type="button" class="" name=""></button>';	// ボタン


TAG_INDENT = '<span width="200"></span>';
TAG_TR_START = '<tr>';
TAG_TR_REPORT_INDEX_START = '<tr class="indexTR b_accordion">';
TAG_TR_REPORT_DETAIL_START = '<tr class="detailTR">';
TAG_TR_COMMENT_START = '<tr class="commentTR">';
TAG_TR_END = '</tr>';



// レポート編集、一覧画面
// ユーザ一覧画面の見出し
//TAG_USER_INDEX_LINE = '<div class="index_line"><div>続柄</div><div>氏名（漢字）</div><div>氏名（カナ）</div><div>扶養</div></div>';
TAG_USER_INDEX_LINE = '<div class="index_line"><div>氏名</div><div>生年月日</div><div>性別</div><div>会社</div><div>部署</div><div>役職</div><div>承認</div></div>';

// ユーザ一覧画面の1行タグ
TAG_USER_LINE = '<div class="user_id" name="user_id"></div><div class="user_name" name="user_name"></div><div class="user_birthday" name="user_birthday"></div><div class="user_sex" name="user_sex"></div><div class="campany_id" name="campany_id"><div class="campany_title" name="campany_title"></div><div class="department_id" name="department_id"></div><div class="department_title" name="department_title"></div><div class="position_id" name="position_id"></div><div class="position_title" name="position_title"></div><div class="user_status" name="user_status"></div>';
// 家族構成の1行
TAG_FAMILY_LINE = '<div class="blockArea"><div class="family_relation" value="family_relation"></div><div class="family_name" value="family_name"></div><div class="family_name_kana" value="family_name_kana"></div><div class="family_support" value="family_support"></div></div>';
TAG_APPROVAL_BUTTON = '<button type="button" class="b_approval_user" value="b_approval_user">承認</button>';		// 承認ボタン
TAG_UPDATE_BUTTON = '<button type="button" class="b_edit" value="b_edit">編集</button>';							// 更新ボタン
TAG_NEW_USER = '<button type="button" class="b_new_user" value="b_new_user">登録</button>';						// 登録ボタン
//メールアドレス
TAG_MAIL_BLOCK = '<div class="blockArea"><span>名称</span><input class="mail_title" type="text"></input><span>アドレス</span><input class="mail" type="text"></input><button type="button" class="b_content_del" value="b_content_del">削除</button></div>';
// 住所
TAG_ADDRESS_BLOCK = '<div class="blockArea"><span>名称</span><input class="address_title" type="text"></input><span>郵便番号</span><input class="post_number" type="text"></input><span>住所</span><input class="address" type="text"></input><button type="button" class="b_content_del" value="b_content_del">削除</button></div>';
// 電話番号
TAG_TEL_BLOCK = '<div class="blockArea"><span>名称</span><input class="tel_title" type="text"></input><span>番号</span><input class="tel" type="text"></input><button type="button" class="b_content_del" value="b_content_del">削除</button></div>';
// 所持資格
TAG_QUA_BLOCK = '';
/*
<div class="blockArea">
	<select class="qualification_title" type="text">
	<option value="">含んで表示</option>
	</select>
	<button type="button" class="b_del_qualification" value="b_del_qualification">削除</button>
</div>
*/

// 家族構成


// レポート作成画面の見出し追加ボタンによって追加される一式
TAG_REPORT_CREATE_WINDOW_INDEX = '<div class="blockArea"><div class="number" name="detail_id"></div><div class="fixed_item_id" name="fixed_item_id" style="display:none">0</div><textarea class="index_area" name="index_name"></textarea><input type="button" class="b_del_index" value="見出し削除"><textarea class="main_text" name="main_text"></textarea><div class="item_status" name="item_status" style="display:none"></div><div class="button_function" name="button_function" style="display:none"></div><input type="button" class="button_name" name="button_name"><div class="get_index_name" name="get_index_name" style="display:none"></div></div>';
// レポート作成画面のデータ展開時に追加される一式
TAG_REPORT_DATE_OPEN = '<div class="number" name="detail_id"></div><div class="fixed_item_id" name="fixed_item_id" style="display:none"></div><textarea class="index_area" name="index_name"></textarea><input type="button" class="b_del_index" value="見出し削除"><textarea class="main_text" name="main_text"></textarea><div class="item_status" name="item_status" style="display:none"></div><div class="button_function" name="button_function" style="display:none"></div><input type="button" class="button_name" name="button_name"></div><div class="get_index_name" name="get_index_name" style="display:none"></div>';



/*
 * メッセージ、単語、区切り記号等
 * 
 * 命名規則
 * メッセージ → MESSAGE + _ + 内容
 * 単語 → STR + _ + 内容
 * 区切り等 → MARK + _ + 内容
 */
STR_POST = 'post';									// POST
STR_LOGOUT_PATH = '/logout';						// ログアウト用path
STR_NONE = 'none';										// display属性のプロパティnone

STR_TRUE = 'true';
STR_FALSE = 'false';
STR_CREATE = 'create';								// サーバへ渡すパラメータにリクエストする処理をマッピングさせるための単語
STR_READ = 'read';									// サーバへ渡すパラメータにリクエストする処理をマッピングさせるための単語
STR_UPDATE = 'update';								// サーバへ渡すパラメータにリクエストする処理をマッピングさせるための単語
STR_DELETE = 'delete';								// サーバへ渡すパラメータにリクエストする処理をマッピングさせるための単語
STR_MESSAGE = 'message';
STR_PLAN = '予定';
SRT_SHOW_HIDE = 'ShowHide';							// 非表示にしたい要素のクラス名に付与する
STR_SUCCESS = 'success';
STR_NONE_EDIT = 'noneEdit';							// 非活性にしたい要素のクラス名に付与する

STR_CONTENT_TYPE = 'contentType';					// 増減コンテンツのコンテンツタイプを格納するためのキー名

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

STR_READ_OFF = '未読';								// 未読状態の日報に対して返す
STR_READ_ON = '既読';								// 既読状態の日報に対して返す
STR_READ_MYSELF = '本人';							// ログインユーザ本人の日報に対して返す
STR_READ_NOTE = '下書';								// 下書状態の日報に対して返す

// 固定ボタンで返されるファンクション名
STR_GET_BEFORE_PLAN = 'this.getBeforePlan';
STR_GET_TODAY_RESULT = 'this.getTodayResult';


// トップ画面の日報概要の1行を囲むタグに付与するクラス名の一部
STR_LINE = 'line';

STR_NUMBER = 'number';

// セレクタで隣接要素を表すセレクタ
STR_PLUS = ' + ';

STR_SLASH = '/';
STR_DOT = '.';
STR_TIME_SEPARATOR = '-';
STR_GET_PARA_CONTENT_ID = '?contentId=';
STR_GET_PARA_P_CONTENT_ID = '&parentContentId=';

// コメント作成画面のタイトル作成用の固定文字列
STR_TITLES = 'さんの';
STR_REPORT_COMMENT = '日報へのコメント';
STR_COMMENT_COMMENT = 'コメントへのコメント';

// テンプレート用日付
STR_DATE_TEMP = '0002-11-30';
/*
KEY_DB_BASE_PARENT_CONTENT_ID = 'baseParentContentId';
KEY_DB_GRAND_PARENT_CONTENT_ID = 'grandParentContentId';
KEY_DB_PARENT_CONTENT_ID = 'parentContentId';
*/

// 画面名
STR_COMMENT_VIEW = 'コメント詳細表示画面';
STR_COMMENT_CREATE = 'コメント作成画面';
STR_REPORT_CREATE = '日報作成画面';
STR_USER_EDIT = 'ユーザ編集画面';
STR_USER_LIST = 'ユーザ一覧画面';
STR_FAMILY_EDIT = '家族構成編集画面';

//TODO:【未実装】ダイアログのコメント系が未定義
MESSAGE_DEL_INDEX = '見出しエリアを削除します。\n入力していたデータは消えますがよろしいですか？';
MESSAGE_FORMAT_ERROR = '見出しが1つもないため登録できません。';
MESSAGE_REPORT_ERROR = '内容に空白がある状態で報告は出来ません。\n下書きを保存する場合、チェックを入れてから報告してください。';
MESSAGE_COMMENT_ERROR = '内容が空白ではコメントできません。';
MESSAGE_LOGOUT = 'ログアウトしますか？';
MESSAGE_AJAX_ERROR = '通信に失敗しました。';
MESSAGE_SEARCH_NOT_DATA = '検索条件に一致する日報がありません。';
MESSAGE_SEARCH_NOT_COMMENT = 'この日報にコメントはありません。';
MESSAGE_REPORT_DELETE = '当該日報を削除しますか？';
MESSAGE_COMMENT_DELETE = 'コメントを削除します。よろしいですか？';
MESSAGE_REPORT_NOREAD = '当該日報を未読にしますか？';
MESSAGE_COMMENT_NOREAD = 'コメントを未読にします。よろしいですか？';
MESSAGE_NOT_TODAY_CONTENT = '結果の情報がありません。';
MESSAGE_NOT_BEFORE_CONTENT = '前日予定の取得に失敗しました。';
MASSAGE_FROM_TO_ERROR = '日付はFROM <= TOで指定してください。';
MASSAGE_OVER_LAP_OK = 'このIDは使用可能です。';
MASSAGE_OVER_LAP_NG = 'ユーザIDが重複しています。<br>別の値を入力してください。';
MASSAGE_SEARCH_NOT_USER = '検索条件に一致するユーザがいません。';

MARK_SPACE = " ";		// 半角スペース


