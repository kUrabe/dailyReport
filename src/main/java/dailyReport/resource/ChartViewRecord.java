package dailyReport.resource;

import java.text.SimpleDateFormat;
import java.util.Date;

import dailyReport.Constants;

/**
 * クラス名：	ChartViewRecord
 * 概要：		バーチャート用マッピングクラス
 * 作成日：	2016/12/21
 * 作成者：	k.urabe
 */
public class ChartViewRecord {

	private String user_name;				// ユーザ名（投稿者）マッピング
	private int favorite_count;			// いいねカウント数マッピング
	private int none_favorite_count;	// わるいねカウント数マッピング
	
	// コンストラクタ（引数あり）
	public ChartViewRecord(
			String user_name,
			Object favorite_count,
			Object none_favorite_count
			) {
		this.setUser_name(user_name);
		this.setFavorite_count(favorite_count == null ? 0 : new Integer(favorite_count.toString()));
		this.setNone_favorite_count(none_favorite_count == null ? 0 : new Integer(none_favorite_count.toString()));
	}

	public String getUser_name() {
		return user_name;
	}

	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}

	public int getFavorite_count() {
		return favorite_count;
	}

	public void setFavorite_count(int favorite_count) {
		this.favorite_count = favorite_count;
	}

	public int getNone_favorite_count() {
		return none_favorite_count;
	}

	public void setNone_favorite_count(int none_favorite_count) {
		this.none_favorite_count = none_favorite_count;
	}
	
	// コンストラクタ（引数なし）
	//public TopSearchContentSummary() {
	//}
	
	}
