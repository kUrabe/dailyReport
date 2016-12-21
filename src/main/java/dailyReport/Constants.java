package dailyReport;

public class Constants {
	
	// 状態関連
	public static final int FLAG_USER_AUTH_USER = 1;
	public static final int FLAG_USER_AUTH_MASTER = 2;
	public static final int FLAG_USER_STATUS_REG = 1;
	public static final int FLAG_ENTRY_FORMAT_REPORT = 2;
	public static final int FLAG_ENTRY_FORMAT_COMMENT = 4;
	public static final int FLAG_ENTRY_FORMAT_REPORT_AND_COMMENT = 6;
	
	// パラメータ内のcrud判定用
	public static final String STR_CREATE = "create";
	public static final String STR_READ = "read";
	public static final String STR_UPDATE = "update";
	public static final String STR_DELETE = "delete";
	
	// 返却JSON用
	public static final String STR_MESSAGE = "message";		// キー名
	public static final String STR_SUCCESS = "success";		// 成功時の値
	public static final String STR_FAILURE = "failure";		// 失敗時の値
	public static final String STR_NO_GET = "検索条件に一致する日報がありません。";		// 検索条件にあう日報を取得出来なかった場合の値
	public static final String STR_NO_COMMENT = "この日報にコメントはありません。";		// 日報に紐付くコメントが取得出来なかった場合の値
	public static final String STR_NO_BEFORE_PLAN = "前日予定の取得に失敗しました。";	// 前日以前の日報（予定）の取得に失敗
	public static final String STR_READ_OFF = "未読";			// 未読状態の日報に対して返す
	public static final String STR_READ_ON = "既読";				// 既読状態の日報に対して返す
	public static final String STR_READ_MYSELF = "本人";			// ログインユーザ本人の日報に対して返す
	public static final String STR_READ_NOTE = "下書";			// 下書状態の日報に対して返す
	
	// json内から値を取得するためのキー名
	// UserInfテーブル
	public static final String KEY_USER_ID = "user_id";
	public static final String KEY_LOGIN_PASSWORD = "login_password";
	public static final String KEY_USER_NAME = "user_name";
	public static final String KEY_USER_NAME_KANA = "user_name_kana";
	public static final String KEY_USER_SEX = "user_sex";
	public static final String KEY_USER_BIRTHDAY = "user_birthday";
	public static final String KEY_USER_AUTHORITY = "user_authority";
	public static final String KEY_USER_STATUS = "user_status";
	// UserInfテーブル(検索時クライアントからのキー名)
	public static final String MIN = "min";
	public static final String MAX = "max";
	// RecordContentInfテーブル
	public static final String KEY_CONTENT_ID = "content_id";
	public static final String KEY_ENTRY_FORMAT = "entry_format";
	public static final String KEY_ENTRY_STATUS = "entry_status";
	public static final String KEY_BASE_PARENT_CONTENT_ID = "base_parent_content_id";
	public static final String KEY_GRAND_PARENT_CONTENT_ID = "grand_parent_content_id";
	public static final String KEY_PARENT_CONTENT_ID = "parent_content_id";
	public static final String KEY_REPORT_DATE = "report_date";
	public static final String KEY_CREATE_DATE = "create_date";
	public static final String KEY_UPDATE_DATE = "update_dated";
	// RecordContentInfテーブル(検索時クライアントからのキー名)
	public static final String KEY_SERACH_FROM_DATE = "serach_from_date";		// 検索領域のfrom
	public static final String KEY_SERACH_TO_DATE = "serach_to_date";			// 検索領域のto
	public static final String KEY_SERACH_USER = "serach_user";				// 検索領域の対象ユーザ
	public static final String KEY_SERACH_READ = "serach_read";				// 検索領域の既読
	public static final String KEY_SERACH_NOTE = "serach_note";
	// RecordContentAddテーブル
	public static final String KEY_ADD_CATEGORY = "add_category";
	public static final String KEY_CATEGORY_STATUS = "category_status";
	// record_content_detailテーブル
	public static final String KEY_DETAIL_ID = "detail_id";
	public static final String KEY_INDEX_NAME = "index_name";
	public static final String KEY_MAIN_TEXT = "main_text";
	// record_content_detailテーブル(日付検索時)
	public static final String KEY_DATE = "date";
	// record_content_detailテーブル(detail_idが実際にクライアントから送られてくる時)
	public static final String KEY_NUMBER = "number";
	// record_content_detailテーブル(index_nameが実際にクライアントから送られてくる時)
	public static final String KEY_INDEX_AREA = "index_area";
	// fixed_item_infテーブル
	public static final String KEY_FIXED_ITEM_ID = "fixed_item_id";
	public static final String KEY_ITEM_STATUS = "item_status";
	public static final String KEY_OUTPUT_ORDER = "output_order";
	public static final String KEY_BUTTON_FUNCTION = "button_function";
	public static final String KEY_BUTTON_NAME = "button_name";
	public static final String KEY_GET_INDEX_NAME = "get_index_name";
	// campany_statusテーブル
	public static final String KEY_CAMPANY_ID = "campany_id";
	public static final String KEY_DEPARTMENT_ID = "department_id";
	public static final String KEY_POSITION_ID = "position_id";
	// mail_infテーブル
	public static final String KEY_MAIL_TITLE = "mail_title";
	public static final String KEY_MAIL = "mail";
	// address_infテーブル
	public static final String KEY_ADDRESS_TITLE = "address_title"; 
	public static final String KEY_POST_NUMBER = "post_number";
	public static final String KEY_ADDRESS = "address";
	// tel_infテーブル
	public static final String KEY_TEL_TITLE = "tel_title";
	public static final String KEY_TEL = "tel";
	// qualification_infテーブル
	public static final String KEY_QUALIFICATION_ID = "qualification_id";
	// family_infテーブル
	public static final String KEY_FAMILY_NAME = "family_name";
	public static final String KEY_FAMILY_NAME_KANA = "family_name_kana";
	public static final String KEY_FAMILY_RELATION = "family_relation";
	public static final String KEY_FAMILY_SUPPORT = "family_support";
	// 検索用キー名等
	public static final String STR_READ_NOTE_IN = "含んで表示";				// 既読・下書　含んで表示
	public static final String STR_READ_NOTE_OUT = "除いて表示";				// 既読・下書　除いて表示
	public static final String STR_READ_NOTE_ONLY = "のみ表示";				// 既読・下書　のみ表示
	public static final String STR_QUERY_READ_IN =" AND (t_read_status.in_count = 1 OR t_read_status.in_count IS NULL)";
	public static final String STR_QUERY_READ_OUT =" AND t_read_status.in_count IS NULL";
	public static final String STR_QUERY_READ_ONLY =" AND t_read_status.in_count = 1";
	public static final String STR_QUERY_NOTE_IN =" AND (((ri.entry_status = 1 OR ri.entry_status = 2) AND ri.user_id = ?1) OR (ri.user_id <> ?1 AND ri.entry_status = 2))";
	public static final String STR_QUERY_NOTE_OUT =" AND ((ri.entry_status = 2 AND ri.user_id = ?1) OR (ri.user_id <> ?1 AND ri.entry_status = 2))";
	public static final String STR_QUERY_NOTE_ONLY =" AND (ri.entry_status = 1 AND ri.user_id = ?1)";
	public static final String STR_QUERY_ORDER__REPOT_DATE = " ORDER BY ri.report_date, ri.content_id, ri.parent_content_id, ri.grand_parent_content_id";
	public static final String STR_MIN_DATE = " AND ui.user_birthday <= ";
	public static final String STR_MAX_DATE = " AND ui.user_birthday >= ";
	public static final String STR_SEARCH_FROM_REPORT_DATE = " AND ri.report_date >= ";
	public static final String STR_SEARCH_TO_REPORT_DATE = " AND ri.report_date <= ";
	public static final String STR_ENTRY_FORMAT_REPORT = " AND ri.entry_format = 2";
	public static final String STR_ENTRY_FORMAT_COMMENT = " AND ri.entry_format = 4";
	public static final String STR_ENTRY_FORMAT_STR_ENTRY_FORMAT_REPORT_AND_COMMENT = " AND ri.entry_format IN(2, 4)";
	public static final String STR_GRUOUP_BY_USER_ID = " GROUP BY ui.user_id";
	
	// その他定数
	public static final String DATE_FORMAT = "yyyy-MM-dd";
	public static final String USER_EDIT_WINDOW = "userEditWindow";		// ユーザ編集画面のpath名
	public static final String STR_CONTENT_TYPE = "contentType";		// 増減情報の種別が格納されているキー名
	public static final String STR_MAIL = "mail";						// 増減情報（mail）
	public static final String STR_ADDRESS = "address";					// 増減情報（address）
	public static final String STR_TEL = "tel";							// 増減情報（tel）
	public static final String STR_QUALIFICATION = "qualification";		// 増減情報（qualification）
	public static final String STR_FAMILY = "family";					// 増減情報（family）
	public static final String STR_SINGLE = "'";
	
	// クエリ
	// トップ画面の初期表示および検索実行時に使用するクエリ
	public static final String TOP_SEARCH_CONTENT_SUMMARY = 
			"SELECT "
				+ " DISTINCT"
				+ " ri.report_date AS report_date"
				+ ", ri.content_id AS content_id"
				+ ", ri.user_id AS user_id"
				+ ", ui.user_name AS user_name"
				+ ", ri.entry_format AS entry_format"
				+ ", ri.entry_status AS entry_status"
				+ ", ri.base_parent_content_id AS base_parent_content_id"
				+ ", ri.grand_parent_content_id AS grand_parent_content_id"
				+ ", ri.parent_content_id AS parent_content_id"
				+ ", t_read_count.in_count AS read_count"
				+ ", t_read_status.in_count AS read_status"
				+ ", t_comment_count.in_count AS comment_count"
				+ ", t_favorite_count.in_count AS favorite_count"
				+ ", t_favorite_status.in_count AS favorite_status"
				+ ", t_none_favorite_count.in_count AS none_favorite_count"
				+ ", t_none_favorite_status.in_count AS none_favorite_status"
				+ " FROM"
				+ " record_content_inf ri"
				+ " LEFT JOIN"
				+ " user_inf ui"
				+ " ON"
				+ " ri.user_id = ui.user_id"
				+ " LEFT JOIN"
				+ " (SELECT "
				+ "ra.content_id AS content_id"
				+ ", COUNT(ra.content_id) AS in_count"
				+ " FROM"
				+ " record_content_add ra"
				+ " WHERE"
				+ " ra.add_category = 1"
				+ " AND"
				+ " ra.category_status = 1"
				+ " GROUP BY"
				+ " ra.content_id) AS t_read_count"
				+ " ON"
				+ " t_read_count.content_id = ri.content_id"
				+ " LEFT JOIN"
				+ " (SELECT ra.content_id AS content_id,"
				+ " COUNT(ra.content_id) AS in_count"
				+ " FROM"
				+ " record_content_add ra"
				+ " WHERE"
				+ " ra.add_category = 1"
				+ " AND"
				+ " ra.category_status = 1"
				+ " AND"
				+ " ra.user_id = ?1"
				+ " GROUP BY"
				+ " ra.content_id) AS t_read_status"
				+ " ON"
				+ " t_read_status.content_id = ri.content_id"
				
				+ " LEFT JOIN"
				+ " (SELECT"
				+ " ri2.parent_content_id AS parent_content_id"
				+ ", COUNT(ri2.parent_content_id) AS in_count"
				+ " FROM"
				+ " record_content_inf ri2"
				+ " WHERE"
				+ " ri2.entry_status = 2"
				+ " GROUP BY"
				+ " ri2.parent_content_id) AS t_comment_count"
				+ " ON"
				+ " t_comment_count.parent_content_id = ri.content_id"
				
				+ " LEFT JOIN"
				+ " (SELECT"
				+ " ra.content_id AS content_id"
				+ ", COUNT(ra.content_id) AS in_count"
				+ " FROM"
				+ " record_content_add ra"
				+ " WHERE"
				+ " ra.add_category = 2"
				+ " AND"
				+ " ra.category_status = 1"
				+ " GROUP BY"
				+ " ra.content_id) AS t_favorite_count"
				+ " ON"
				+ " t_favorite_count.content_id = ri.content_id"
				
				+ " LEFT JOIN"
				+ " (SELECT"
				+ " ra.content_id AS content_id"
				+ ", COUNT(ra.content_id) AS in_count"
				+ " FROM"
				+ " record_content_add ra"
				+ " WHERE"
				+ " ra.add_category = 2"
				+ " AND"
				+ " ra.category_status = 1"
				+ " AND"
				+ " ra.user_id = ?1"
				+ " GROUP BY"
				+ " ra.content_id) AS t_favorite_status"
				+ " ON"
				+ " t_favorite_status.content_id = ri.content_id"

				+ " LEFT JOIN"
				+ " (SELECT"
				+ " ra.content_id AS content_id"
				+ ", COUNT(ra.content_id) AS in_count"
				+ " FROM"
				+ " record_content_add ra"
				+ " WHERE"
				+ " ra.add_category = 4"
				+ " AND"
				+ " ra.category_status = 1"
				+ " GROUP BY"
				+ " ra.content_id) AS t_none_favorite_count"
				+ " ON"
				+ " t_none_favorite_count.content_id = ri.content_id"
				
				+ " LEFT JOIN"
				+ " (SELECT"
				+ " ra.content_id AS content_id"
				+ ", COUNT(ra.content_id) AS in_count"
				+ " FROM"
				+ " record_content_add ra"
				+ " WHERE"
				+ " ra.add_category = 4"
				+ " AND"
				+ " ra.category_status = 1"
				+ " AND"
				+ " ra.user_id = ?1"
				+ " GROUP BY"
				+ " ra.content_id) AS t_none_favorite_status"
				+ " ON"
				+ " t_none_favorite_status.content_id = ri.content_id"
				
				+ " WHERE"
				+ " ri.entry_format = 2"
				+ " AND"
				+ " ui.user_name LIKE ?2"
				+ " AND"
				+ " ri.report_date BETWEEN ?3 AND ?4"
				+ " AND"
				+ " ri.entry_status <> 4"
			;
	
	// トップ画面におけるコンテンツ詳細テーブルの情報取得（バインドによって登録状態を選別して取得できる）
	public static final String SEARCH_CONTENT_DETAIL_SUMMARY = 
			"SELECT "
				+ "rd.content_id AS content_id"
				+ ", rd.detail_id AS detail_id"
				+ ", rd.fixed_item_id AS fixed_item_id"
				+ ", rd.index_name AS index_name"
				+ ", rd.main_text AS main_text"
				+ " FROM"
				+ " record_content_inf ri"
				+ " LEFT JOIN"
				+ " record_content_detail rd"
				+ " ON"
				+ " ri.content_id = rd.content_id"
				+ " WHERE"
				+ " rd.content_id = ?1"
//				+ " AND"
//				+ " ri.entry_format = ?2"
//				+ " AND"
//				+ " ri.entry_status = ?3"
				+ " ORDER BY"
				+ " ri.content_id, ri.parent_content_id, ri.grand_parent_content_id, rd.detail_id"
			;
	
	// トップ画面のアコーディオン内のコメント内容
	public static final String TOP_COMMENT_CONTENT = 
			"SELECT "
				+ "ri.report_date AS report_date"
				+ ", ri.content_id AS content_id"
				+ ", ri.user_id AS user_id"
				+ ", ui.user_name AS user_name"
				+ ", ri.entry_format AS entry_format"
				+ ", ri.entry_status AS entry_status"
				+ ", ri.base_parent_content_id AS base_parent_content_id"
				+ ", ri.grand_parent_content_id AS grand_parent_content_id"
				+ ", ri.parent_content_id AS parent_content_id"
				+ ", t_read_count.in_count AS read_count"
				+ ", t_read_status.in_count AS read_status"
				+ ", t_comment_count.in_count AS comment_count"
				+ ", t_favorite_count.in_count AS favorite_count"
				+ ", t_favorite_status.in_count AS favorite_status"
				+ ", t_none_favorite_count.in_count AS none_favorite_count"
				+ ", t_none_favorite_status.in_count AS none_favorite_status"
				+ ", rd.main_text AS main_text"
				+ " FROM"
				+ " record_content_inf ri"
				+ " LEFT JOIN"
				+ " record_content_detail rd"
				+ " ON"
				+ " ri.content_id = rd.content_id"
				+ " LEFT JOIN"
				+ " user_inf ui"
				+ " ON"
				+ " ri.user_id = ui.user_id"
				+ " LEFT JOIN"
				+ " (SELECT "
				+ "ra.content_id AS content_id"
				+ ", COUNT(ra.content_id) AS in_count"
				+ " FROM"
				+ " record_content_add ra"
				+ " WHERE"
				+ " ra.add_category = 1"
				+ " AND"
				+ " ra.category_status = 1"
				+ " GROUP BY"
				+ " ra.content_id) AS t_read_count"
				+ " ON"
				+ " t_read_count.content_id = ri.content_id"
				+ " LEFT JOIN"
				+ " (SELECT ra.content_id AS content_id,"
				+ " COUNT(ra.content_id) AS in_count"
				+ " FROM"
				+ " record_content_add ra"
				+ " WHERE"
				+ " ra.add_category = 1"
				+ " AND"
				+ " ra.category_status = 1"
				+ " AND"
				+ " ra.user_id = ?1"
				+ " GROUP BY"
				+ " ra.content_id) AS t_read_status"
				+ " ON"
				+ " t_read_status.content_id = ri.content_id"
				
				+ " LEFT JOIN"
				+ " (SELECT"
				+ " ri2.parent_content_id AS parent_content_id"
				+ ", COUNT(ri2.parent_content_id) AS in_count"
				+ " FROM"
				+ " record_content_inf ri2"
				+ " WHERE"
				+ " ri2.entry_status = 2"
				+ " GROUP BY"
				+ " ri2.parent_content_id) AS t_comment_count"
				+ " ON"
				+ " t_comment_count.parent_content_id = ri.content_id"
				
				+ " LEFT JOIN"
				+ " (SELECT"
				+ " ra.content_id AS content_id"
				+ ", COUNT(ra.content_id) AS in_count"
				+ " FROM"
				+ " record_content_add ra"
				+ " WHERE"
				+ " ra.add_category = 2"
				+ " AND"
				+ " ra.category_status = 1"
				+ " GROUP BY"
				+ " ra.content_id) AS t_favorite_count"
				+ " ON"
				+ " t_favorite_count.content_id = ri.content_id"

				+ " LEFT JOIN"
				+ " (SELECT"
				+ " ra.content_id AS content_id"
				+ ", COUNT(ra.content_id) AS in_count"
				+ " FROM"
				+ " record_content_add ra"
				+ " WHERE"
				+ " ra.add_category = 4"
				+ " AND"
				+ " ra.category_status = 1"
				+ " GROUP BY"
				+ " ra.content_id) AS t_none_favorite_count"
				+ " ON"
				+ " t_none_favorite_count.content_id = ri.content_id"
				
				+ " LEFT JOIN"
				+ " (SELECT"
				+ " ra.content_id AS content_id"
				+ ", COUNT(ra.content_id) AS in_count"
				+ " FROM"
				+ " record_content_add ra"
				+ " WHERE"
				+ " ra.add_category = 4"
				+ " AND"
				+ " ra.category_status = 1"
				+ " AND"
				+ " ra.user_id = ?1"
				+ " GROUP BY"
				+ " ra.content_id) AS t_none_favorite_status"
				+ " ON"
				+ " t_none_favorite_status.content_id = ri.content_id"
				
				+ " LEFT JOIN"
				+ " (SELECT"
				+ " ra.content_id AS content_id"
				+ ", COUNT(ra.content_id) AS in_count"
				+ " FROM"
				+ " record_content_add ra"
				+ " WHERE"
				+ " ra.add_category = 2"
				+ " AND"
				+ " ra.category_status = 1"
				+ " AND"
				+ " ra.user_id = ?1"
				+ " GROUP BY"
				+ " ra.content_id) AS t_favorite_status"
				+ " ON"
				+ " t_favorite_status.content_id = ri.content_id"
				
				+ " WHERE"
				+ " ri.base_parent_content_id = ?2"
				+ " AND"
				+ " ri.entry_status = 2"
				+ " ORDER BY"
				+ " ri.content_id, ri.base_parent_content_id, ri.parent_content_id, ri.grand_parent_content_id"
			;
	
	// コンテンツ詳細更新前の削除クエリ
	public static final String CONTENT_DELETE = 
			"DELETE"
				+ " rd"
				+ " FROM"
				+ " record_content_detail rd"
				+ " LEFT JOIN"
				+ " record_content_inf ri"
				+ " ON"
				+ " rd.content_id = ri.content_id"
				+ " WHERE"
				+ " ri.content_id = ?1"
				+ " AND"
				+ " ri.entry_format = ?2"
		;
	
	// 日報作成画面の日付に応じたデータの取得（テンプレート取得にも使用）
	public static final String GET_REPORT_BY_DYA = 
			"SELECT "
			+ "ri.content_id AS content_id"
			+ ", rd.detail_id AS detail_id"
			+ ", rd.fixed_item_id AS fixed_item_id"
			+ ", rd.index_name AS index_name,"
			+ " rd.main_text AS main_text,"
			+ " fi.item_status AS item_status,"
			+ " fi.output_order AS output_order,"
			+ " fi.button_function AS button_function,"
			+ " fi.button_name AS button_name,"
			+ " fi.get_index_name AS get_index_name"
			+ " FROM"
			+ " record_content_detail rd"
			+ " LEFT JOIN"
			+ " record_content_inf ri"
			+ " ON"
			+ " rd.content_id = ri.content_id"
			+ " LEFT JOIN"
			+ " fixed_item_inf fi"
			+ " ON"
			+ " rd.fixed_item_id = fi.fixed_item_id"
			+ " WHERE"
			+ " ri.user_id = ?1"
			+ " AND"
			+ " ri.entry_format = ?2"
			+ " AND"
			+ " ri.entry_status IN(1, 2)"
			+ " AND"
			+ " ri.report_date = ?3"
			+ " ORDER BY"
			+ " ri.content_id, rd.detail_id"
			;
	
	// 日報作成画面の前日以前の指定見出し項目の内容取得
	public static final String GET_CONTENT_BY_DAY =
			"SELECT"
			+ " rd.main_text AS main_text"
			+ " FROM"
			+ " record_content_detail rd"
			+ " LEFT JOIN"
			+ " record_content_inf ri"
			+ " ON"
			+ " rd.content_id = ri.content_id"
			+ " LEFT JOIN"
			+ " user_inf ui"
			+ " ON"
			+ " ri.user_id = ui.user_id"
			+ " WHERE"
			+ " ri.user_id = ?1"
			+ " AND"
			+ " ri.report_date < ?2"
			+ " AND"
			+ " rd.index_name = ?3"
			+ " AND"
			+ " ri.entry_format = 2"
			+ " AND"
			+ " ri.entry_status = 2"
			+ " ORDER BY"
			+ " ri.report_date DESC"
			+ " LIMIT 1"
			;
	
	// ユーザ編集画面のユーザIDに紐付くBase情報取得用
	public static final String GET_USER_BASE_INF = 
			"SELECT"
			+ " ui.user_id AS user_id"
			+ ", ui.user_name AS user_name"
			+ ", ui.user_name_kana AS user_name_kana"
			+ ", ui.user_sex AS user_sex"
			+ ", ui.user_birthday AS user_birthday"
			+ ", ui.user_status AS user_status"
			+ ", cs.campany_id AS campany_id"
			+ ", cd.campany_title AS campany_title"
			+ ", cs.department_id AS department_id"
			+ ", dd.department_title AS department_title"
			+ ", cs.position_id AS position_id"
			+ ", pd.position_title AS position_title"
			+ " FROM"
			+ " user_inf ui"
			+ " LEFT JOIN"
			+ " company_status cs"
			+ " ON"
			+ " ui.user_id = cs.user_id"
			+ " LEFT JOIN"
			+ " campany_detail cd"
			+ " ON"
			+ " cs.campany_id = cd.campany_id"
			+ " LEFT JOIN"
			+ " department_detail dd"
			+ " ON"
			+ " cs.department_id = dd.department_id"
			+ " LEFT JOIN"
			+ " position_detail pd"
			+ " ON"
			+ " cs.position_id = pd.position_id"
			+ " WHERE"
			+ " ui.user_id = ?1"
			;
	
	// ユーザ一覧画面の検索取得用
	public static final String GET_USER_SEARCH_INF = 
			"SELECT"
			+ " ui.user_id AS user_id"
			+ ", ui.user_name AS user_name"
			+ ", ui.user_name_kana AS user_name_kana"
			+ ", ui.user_sex AS user_sex"
			+ ", ui.user_birthday AS user_birthday"
			+ ", ui.user_status AS user_status"
			+ ", cs.campany_id AS campany_id"
			+ ", cd.campany_title AS campany_title"
			+ ", cs.department_id AS department_id"
			+ ", dd.department_title AS department_title"
			+ ", cs.position_id AS position_id"
			+ ", pd.position_title AS position_title"
			+ " FROM"
			+ " user_inf ui"
			+ " LEFT JOIN"
			+ " company_status cs"
			+ " ON"
			+ " ui.user_id = cs.user_id"
			+ " LEFT JOIN"
			+ " campany_detail cd"
			+ " ON"
			+ " cs.campany_id = cd.campany_id"
			+ " LEFT JOIN"
			+ " department_detail dd"
			+ " ON"
			+ " cs.department_id = dd.department_id"
			+ " LEFT JOIN"
			+ " position_detail pd"
			+ " ON"
			+ " cs.position_id = pd.position_id"
			+ " WHERE"
			+ " ui.user_id LIKE ?1"
			+ " AND"
			+ " ui.user_name LIKE ?2"
			+ " AND"
			+ " ui.user_sex LIKE ?3"
			+ " AND"
			+ " ui.user_authority <> 2"
			;
	
	public static final String GET_CHART_RECORD = 
			"SELECT"
			+ " ui.user_name AS user_name"
			+ ", COUNT(t_favorite_count.in_count) AS favorite_count"
			+ ", COUNT(t_none_favorite_count.in_count) AS none_favorite_count"
			+ " FROM"
			+ " user_inf ui"
			+ " LEFT JOIN"
			+ " record_content_inf ri"
			+ " ON"
			+ " ui.user_id = ri.user_id"
			+ " LEFT JOIN"
			+ " (SELECT"
			+ " ra.content_id AS content_id"
			+ ", COUNT(ra.content_id) AS in_count"
			+ " FROM"
			+ " record_content_add ra"
			+ " WHERE"
			+ " ra.add_category = 2"
			+ " AND"
			+ " ra.category_status = 1"
			+ " GROUP BY ra.content_id) AS t_favorite_count"
			+ " ON"
			+ " t_favorite_count.content_id = ri.content_id"
			+ " LEFT JOIN"
			+ " (SELECT ra.content_id AS content_id"
			+ ", COUNT(ra.content_id) AS in_count"
			+ " FROM"
			+ " record_content_add ra"
			+ " WHERE"
			+ " ra.add_category = 4"
			+ " AND"
			+ " ra.category_status = 1"
			+ " GROUP BY ra.content_id) AS t_none_favorite_count"
			+ " ON"
			+ " t_none_favorite_count.content_id = ri.content_id"
			+ " WHERE"
			+ " ui.user_authority = 1"
			;


}
