package dailyReport.resource;

import java.text.SimpleDateFormat;
import java.util.Date;

import dailyReport.Constants;

/**
 * クラス名：	SearchContentDetailSummary
 * 概要：		Top画面における詳細情報の取得（バインドによって種別ごとに取得）
 * 作成日：	2016/12/01
 * 作成者：	k.urabe
 */
public class SearchContentDetailSummary {

	private int content_id;				// コンテンツIDマッピング
	private int detail_id;				// 詳細IDマッピング
	private int fixed_item_id;			// 固定IDマッピング
	private String index_name;			// 見出し文字マッピング
	private String main_text;			// 本文マッピング
	
	// コンストラクタ（引数あり）
	public SearchContentDetailSummary(
			int content_id,
			int detail_id,
			Integer fixed_item_id,
			String index_name,
			String main_text
			) {
		this.content_id = content_id;
		this.detail_id = detail_id;
		this.fixed_item_id = fixed_item_id == null ? 0 : new Integer(fixed_item_id);
		this.index_name = index_name;
		this.main_text = main_text;
	}
	/*
	public SearchContentDetailSummary(
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
			Object favorite_count
			) {

		this.report_date = new SimpleDateFormat(Constants.DATE_FORMAT).format(report_date);
		//this.reportDate = report_date;
		this.content_id = content_id;
		this.user_id = user_id;
		this.user_name = user_name;
		this.entry_format = entry_format;
		this.entry_status = entry_status;
		this.base_parent_content_id = base_parent_content_id;
		this.grand_parent_content_id = grand_parent_content_id;
		this.parent_content_id = parent_content_id;
		this.read_count = read_count == null ? 0 : new Integer(read_count.toString());
		this.read_status = read_status == null ? 0 : new Integer(read_status.toString());
		this.comment_count = comment_count == null ? 0 : new Integer(comment_count.toString());
		this.favorite_count = favorite_count == null ? 0 : new Integer(favorite_count.toString());
	}
	*/

	public int getContent_id() {
		return content_id;
	}

	public void setContent_id(int content_id) {
		this.content_id = content_id;
	}

	public int getDetail_id() {
		return detail_id;
	}

	public void setDetail_id(int detail_id) {
		this.detail_id = detail_id;
	}

	public int getFixed_item_id() {
		return fixed_item_id;
	}

	public void setFixed_item_id(int fixed_item_id) {
		this.fixed_item_id = fixed_item_id;
	}

	public String getIndex_name() {
		return index_name;
	}

	public void setIndex_name(String index_name) {
		this.index_name = index_name;
	}

	public String getMain_text() {
		return main_text;
	}

	public void setMain_text(String main_text) {
		this.main_text = main_text;
	}
}
