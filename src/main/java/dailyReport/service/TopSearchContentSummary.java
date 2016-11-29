package dailyReport.service;

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
	
	private Integer contentId;				// コンテンツIDマッピング
	private String userId;					// ユーザID(投稿者)マッピング
	private String userName;				// ユーザ名（投稿者）マッピング
	private Integer entryFormat;			// 登録書式マッピング
	private Integer entryStatus;			// 登録状態マッピング
	private Integer baseParentContentId;	// 基底親コンテンツIDマッピング
	private Integer grandParentContentId;	// 祖先コンテンツIDマッピング
	private Integer parentContentId;		// 親コンテンツIDマッピング
	private String reportDate;				// 報告日マッピング
	private Integer favorite_count;			// いいねカウント数マッピング
	private Integer read_count;				// 既読カウント数マッピング
	
	// コンストラクタ（引数あり）
	public TopSearchContentSummary(Date reportDate) {

		//this.reportDate = new SimpleDateFormat(Constants.DATE_FORMAT).format(reportDate);

	}
	
	// コンストラクタ（引数なし）
	public TopSearchContentSummary() {
	}
	
	
	public Integer getContentId() {
		return contentId;
	}
	public void setContentId(Integer contentId) {
		this.contentId = contentId;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public Integer getEntryFormat() {
		return entryFormat;
	}
	public void setEntryFormat(Integer entryFormat) {
		this.entryFormat = entryFormat;
	}
	public Integer getEntryStatus() {
		return entryStatus;
	}
	public void setEntryStatus(Integer entryStatus) {
		this.entryStatus = entryStatus;
	}
	public Integer getBaseParentContentId() {
		return baseParentContentId;
	}
	public void setBaseParentContentId(Integer baseParentContentId) {
		this.baseParentContentId = baseParentContentId;
	}
	public Integer getGrandParentContentId() {
		return grandParentContentId;
	}
	public void setGrandParentContentId(Integer grandParentContentId) {
		this.grandParentContentId = grandParentContentId;
	}
	public Integer getParentContentId() {
		return parentContentId;
	}
	public void setParentContentId(Integer parentContentId) {
		this.parentContentId = parentContentId;
	}
	public String getReportDate() {
		return reportDate;
	}
	public void setReportDate(Date reportDate) {
		this.reportDate = new SimpleDateFormat(Constants.DATE_FORMAT).format(reportDate);
	}
	public Integer getFavorite_count() {
		return favorite_count;
	}
	public void setFavorite_count(Integer favorite_count) {
		this.favorite_count = favorite_count;
	}
	public Integer getRead_count() {
		return read_count;
	}
	public void setRead_count(Integer read_count) {
		this.read_count = read_count;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}
	
}
