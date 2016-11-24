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
	
}
