/**
 * ファイル名：	ChartSummaryWindowDetail.js
 * 概要：		グラフ集計画面系の処理を集めたクラスを定義したファイル。
 * 作成日：	2016/12/21
 * 作成者：	k.urabe
 * path：		js/ChartSummaryWindowDetail.js
 */

/**
 * クラス名：	ChartSummaryWindowDetail
 * 概要：		グラフ集計画面系の処理を集めたクラス。WindowDesignクラスを継承する。
 * 作成日：	2016/12/21
 * 作成者：	k.urabe
 */
function ChartSummaryWindowDetail() {
	
	WindowDesign.call(this);	//スーパークラスのコンストラクタを呼ぶ
	
	/**
	 * 関数名：	createUserListWindow
	 * 概要：		画面の初期表示機能
	 * 引数：		なし
	 * 戻り値：	なし
	 * 作成日：	2016/12/21
	 * 作成者：	k.urabe
	 */
	this.createChartSummaryWindow = function() {
		
		
		
		
		
		// 画面を表示する
		$("body").css("visibility", "visible");
		
	}
	
	/**
	 * 関数名：	clickChartViewButton
	 * 概要：		グラフ表示ボタンを押下した際の処理
	 * 引数：		なし
	 * 戻り値：	なし
	 * 作成日：	2016/12/21
	 * 作成者：	k.urabe
	 */
	this.clickChartViewButton = function() {
		
		
	}
	
	/**
	 * 関数名：	checkSearchValue
	 * 概要：		グラフ表示ボタンを押下した際の処理
	 * 引数：		なし
	 * 戻り値：	なし
	 * 作成日：	2016/12/21
	 * 作成者：	k.urabe
	 */
	this.checkSearchValue = function() {
		
		
	}
	
	/**
	 * 関数名：	createChartData
	 * 概要：		DBから取得したデータを基にグラフ用の設定値に加工する
	 * 引数：		なし
	 * 戻り値：	なし
	 * 作成日：	2016/12/21
	 * 作成者：	k.urabe
	 */
	this.createChartData = function() {
		
		
	}

}

ChartSummaryWindowDetail.prototype = new WindowDesign();
//サブクラスのコンストラクタを有効にする
ChartSummaryWindowDetail.prototype.constructor = WindowDesign;