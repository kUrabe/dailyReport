package dailyReport.resource;

import java.text.SimpleDateFormat;
import java.util.Date;

import dailyReport.Constants;

/**
 * クラス名：	TopSearchContentSummary
 * 概要：		Top画面の情報表示用のサマリークラス
 * 作成日：	2016/11/29
 * 作成者：	k.urabe
 */
public class TopSearchContentSummary {

	private String report_date;				// 報告日マッピング
	private int content_id;				// コンテンツIDマッピング
	private String user_id;					// ユーザID(投稿者)マッピング
	private String user_name;				// ユーザ名（投稿者）マッピング
	private int entry_format;			// 登録書式マッピング
	private int entry_status;			// 登録状態マッピング
	private int base_parent_content_id;	// 基底親コンテンツIDマッピング
	private int grand_parent_content_id;	// 祖先コンテンツIDマッピング
	private int parent_content_id;		// 親コンテンツIDマッピング
	private int read_count;				// 既読カウント数マッピング
	private int read_status;			// 既読ステータス　// 未読なら0件、既読なら1件になる想定
	private int comment_count;			// コメントカウント数マッピング
	private int favorite_count;			// いいねカウント数マッピング
	private int favorite_status;		// ログインユーザが対象コンテンツにいいねを付けているか
	
	// コンストラクタ（引数あり）
	public TopSearchContentSummary(
			Date report_date,
			int content_id,
			String user_id,
			String user_name,
			int entry_format,
			int entry_status,
			int base_parent_content_id,
			int grand_parent_content_id,
			int parent_content_id,
			Object read_count,
			Object read_status,
			Object comment_count,
			Object favorite_count,
			Object favorite_status
			) {

		this.report_date = new SimpleDateFormat(Constants.DATE_FORMAT).format(report_date);
		this.content_id = content_id;
		this.user_id = user_id;
		this.user_name = user_name;
		this.entry_format = entry_format;
		this.entry_status = entry_status;
		this.base_parent_content_id = base_parent_content_id;
		this.grand_parent_content_id = grand_parent_content_id;
		this.parent_content_id = parent_content_id;
		this.read_count = read_count == null ? 0 : new Integer(read_count.toString());
		this.read_status = read_status == null ? 2 : new Integer(read_status.toString());
		this.comment_count = comment_count == null ? 0 : new Integer(comment_count.toString());
		this.favorite_count = favorite_count == null ? 0 : new Integer(favorite_count.toString());
		this.favorite_status = favorite_status == null ? 2 : new Integer(favorite_status.toString());
	}
	
	// コンストラクタ（引数なし）
	//public TopSearchContentSummary() {
	//}
	
	
	public int getContentId() {
		return content_id;
	}
	public void setContentId(int contentId) {
		this.content_id = contentId;
	}
	public String getUserId() {
		return user_id;
	}
	public void setUserId(String userId) {
		this.user_id = userId;
	}
	public int getEntryFormat() {
		return entry_format;
	}
	public void setEntryFormat(int entryFormat) {
		this.entry_format = entryFormat;
	}
	public int getEntryStatus() {
		return entry_status;
	}
	public void setEntryStatus(int entryStatus) {
		this.entry_status = entryStatus;
	}
	public int getBaseParentContentId() {
		return base_parent_content_id;
	}
	public void setBaseParentContentId(int baseParentContentId) {
		this.base_parent_content_id = baseParentContentId;
	}
	public int getGrandParentContentId() {
		return grand_parent_content_id;
	}
	public void setGrandParentContentId(int grandParentContentId) {
		this.grand_parent_content_id = grandParentContentId;
	}
	public int getParentContentId() {
		return parent_content_id;
	}
	public void setParentContentId(int parentContentId) {
		this.parent_content_id = parentContentId;
	}
	public String getReportDate() {
		return report_date;
	}
	public void setReportDate(Date reportDate) {
		this.report_date = new SimpleDateFormat(Constants.DATE_FORMAT).format(reportDate);
	}
	public int getFavorite_count() {
		return favorite_count;
	}
	public void setFavorite_count(int favorite_count) {
		this.favorite_count = favorite_count;
	}
	public int getRead_count() {
		return read_count;
	}
	public void setRead_count(int read_count) {
		this.read_count = read_count;
	}

	public String getUserName() {
		return user_name;
	}

	public void setUserName(String userName) {
		this.user_name = userName;
	}

	public int getComment_count() {
		return comment_count;
	}

	public void setComment_count(int comment_count) {
		this.comment_count = comment_count;
	}

	public int getRead_status() {
		return read_status;
	}

	public void setRead_status(int read_status) {
		this.read_status = read_status;
	}

	public int getFavorite_status() {
		return favorite_status;
	}

	public void setFavorite_status(int favorite_status) {
		this.favorite_status = favorite_status;
	}
	
}
