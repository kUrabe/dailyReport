package dailyReport.resource;


/**
 * クラス名：	GetReportByDayQuery
 * 概要：		日報作成画面の日報データもしくはテンプレートデータの取得
 * 作成日：	2016/12/05
 * 作成者：	k.urabe
 */
public class GetReportByDayQuery {

	private int content_id;				// コンテンツIDマッピング
	private int detail_id;				// 詳細IDマッピング
	private int fixed_item_id;			// 固定IDマッピング
	private String index_name;			// 見出し文字マッピング
	private String main_text;			// 本文マッピング
	private int item_status;			// 固定アイテムの状態マッピング
	private int output_order;			// 固定アイテムの出力順序マッピング
	private int button_function;		// 固定アイテムの関数マッピング
	private String button_name;			// 固定アイテムのボタン名
	private String get_index_name;		// 固定アイテムの取得項目名マッピング
	
	// コンストラクタ（引数あり）
	public GetReportByDayQuery(
			int content_id,
			int detail_id,
			Integer fixed_item_id,
			String index_name,
			String main_text,
			int item_status,
			int output_order,
			int button_function,
			String button_name,
			String get_index_name
			) {
		this.content_id = content_id;
		this.detail_id = detail_id;
		this.fixed_item_id = fixed_item_id == null ? 0 : new Integer(fixed_item_id);
		this.index_name = index_name == null ? "" : index_name;
		this.main_text = main_text == null ? "" : main_text;
		this.item_status = item_status;
		this.output_order = output_order;
		this.button_function = button_function;
		this.button_name = button_name == null ? "" : button_name;
		this.get_index_name = get_index_name == null ? "" : get_index_name;
	}

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

	public int getItem_status() {
		return item_status;
	}

	public void setItem_status(int item_status) {
		this.item_status = item_status;
	}

	public int getOutput_order() {
		return output_order;
	}

	public void setOutput_order(int output_order) {
		this.output_order = output_order;
	}

	public int getButton_function() {
		return button_function;
	}

	public void setButton_function(int button_function) {
		this.button_function = button_function;
	}

	public String getButton_name() {
		return button_name;
	}

	public void setButton_name(String button_name) {
		this.button_name = button_name;
	}

	public String getGet_index_name() {
		return get_index_name;
	}

	public void setGet_index_name(String get_index_name) {
		this.get_index_name = get_index_name;
	}

}
