package dailyReport;

public class Constants {
	
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
	// fixed_item_infテーブル
	public static final String KEY_FIXED_ITEM_ID = "fixed_item_id";
	public static final String KEY_ITEM_STATUS = "item_status";
	public static final String KEY_OUTPUT_ORDER = "output_order";
	public static final String KEY_BUTTON_FUNCTION = "button_function";
	public static final String KEY_BUTTON_NAME = "button_name";
	public static final String KEY_GET_INDEX_NAME = "get_index_name";
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
	public static final String STR_QUERY_ORDER__REPOT_DATE = " ORDER BY ri.report_date, ri.content_id";
	
	// その他定数
	public static final String DATE_FORMAT = "yyyy-MM-dd";
	
	// クエリ
	// トップ画面の初期表示および検索実行時に使用するクエリ
	public static final String TOP_SEARCH_CONTENT_SUMMARY = 
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
				+ " t_favorite_count.content_id = ri.content_id"
				
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
				+ " rd.content_id, rd.detail_id"
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
				+ " t_favorite_count.content_id = ri.content_id"
				
				+ " WHERE"
				+ " ri.base_parent_content_id = ?2"
				+ " AND"
				+ " ri.entry_status = 2"
				+ " ORDER BY"
				+ " ri.content_id, ri.base_parent_content_id, ri.parent_content_id, ri.grand_parent_content_id"
			;
	
}
