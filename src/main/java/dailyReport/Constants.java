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
	
	// その他定数
	public static final String DATE_FORMAT = "yyyy-MM-dd";
}
