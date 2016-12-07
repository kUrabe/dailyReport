package dailyReport.resource;

/**
 * クラス名：	GetContentByDayQuery
 * 概要：		日報作成画面の前日以前の指定コンテンツの内容取得をマッピングするクラス
 * 作成日：	2016/12/07
 * 作成者：	k.urabe
 */
public class GetContentByDayQuery {
	private String main_text;			// 本文マッピング
	
	public GetContentByDayQuery(
			String main_text
			) {
		this.setMain_text(main_text == null ? "" : main_text);
	}

	public String getMain_text() {
		return main_text;
	}

	public void setMain_text(String main_text) {
		this.main_text = main_text;
	}
}
