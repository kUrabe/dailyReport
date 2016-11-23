/**
 * ファイル名：	TopWindowDetail.js
 * 概要：		Top画面系の処理を集めたクラスを定義したファイル。
 * 作成日：	2016/11/22
 * 作成者：	k.urabe
 * path：		js/TopWindowDetail.js
 */

/**
 * クラス名：	TopWindowDetail
 * 概要：		Top画面系の処理を集めたクラス。WindowDesignクラスを継承する。
 * 作成日：	2016/11/22
 * 作成者：	k.urabe
 */
function TopWindowDetail() {
	
	WindowDesign.call(this);	//スーパークラスのコンストラクタを呼ぶ
	
	/**
	 * 関数名：	isCheckDateFromTo
	 * 概要：		検索実行時のFromToの日付大小関係を検証する
	 * 引数：		date:from	fromに入力された日付
	 * 			date:to		toに入力された日付
	 * 戻り値：	boolean		正しいならtrue、エラーならfalseを返す
	 * 作成日：	2016/11/23
	 * 作成者：	k.urabe
	 */
	this.isCheckDateFromTo = function(from, to) {
		
		var returnBoolean = false;		// 返却用の変数を宣言し、初期値としてfalseをセットする
		
		// from toの大小関係を検証する
		if(from <= to) {
			// 正しい関係にあるのでtrueをセットする
			returnBoolean = true;
		}
		
		// 判定した結果を返す
		return returnBoolean;
		
	}
	
	/**
	 * 関数名：	clickSearchButton
	 * 概要：		Top画面の検索実行時や、初期表示処理、リロード時に実行
	 * 引数：		なし
	 * 戻り値：	なし
	 * 作成日：	2016/11/23
	 * 作成者：	k.urabe
	 */
	this.clickSearchButton = function() {
		
		var jsonArray = {};			// リクエストに使用するjson連想配列を作成する
		
		// 日報の描画領域をすべて削除する
		$(KEY_DIV).remove(SELECTOR_PARENT_AREA);
		
		// 検索領域のfromを取得する
		jsonArray[KEY_SERACH_FROM_DATE] = getWindowItem(SELECTOR_SERACH_FROM_DATE);
		// 検索領域のtoを取得する
		jsonArray[KEY_SERACH_TO_DATE] = getWindowItem(SELECTOR_SERACH_TO_DATE);
		// 検索領域のユーザを取得する
		jsonArray[KEY_SERACH_USER] = getWindowItem(SELECTOR_SERACH_USER);
		// 検索領域の既読を取得する
		jsonArray[KEY_SERACH_READ] = getWindowItem(SELECTOR_SERACH_READ);
		// 検索領域の下書を取得する
		jsonArray[KEY_SERACH_NOTE] = getWindowItem(SELECTOR_SERACH_NOTE);

		// JSON連想配列を用いてDBから値を取得する
		this.getJsonData(PATH_TOP, jsonArray, STR_READ);
		// 取得したJSONを用いてHTMLへタグを展開する
		this.createContentIndex(SELECTOR_REPORT_AREA, 0);
		
		// TODO:【未実装】ボタンの数だけステップが増えるので、別関数検討
		// TODO:【メモ】ボタンの設置は画面初期表示（固定パーツ）と、タグ展開時（流動パーツ）で行う。ここではイベント登録のみ
		// TODO:【メモ】↑ 現在はタグ展開時にボタンの配置までやっていない
		// TODO:【メモ】同じタグの複数箇所に一気にイベント登録しようとしているが、これが可能か不明。場合によってはタグの展開時に1つ1つボタンの展開に合わせてイベント登録が必要かも
		// 流動的なパーツのイベントを登録する
		// 新規コメントボタンのイベントを登録する
		this.setClickEvent(SELECTOR_B_NEW_COMMENT, prepareAnotherWindow);
		// TODO:【メモ】アコーディオンと共通化するため、個別には必要ない？
		// 閉じるボタンのイベントを登録する
		//setClickEvent(SELECTOR_B_CLOSE, );
		// 未読にするボタンのイベントを登録する
		this.setClickEvent(SELECTOR_B_NO_READ, clickAddContentButton);
		// いいねボタンのイベントを登録する
		this.setClickEvent(SELECTOR_B_FAVORITE, clickAddContentButton);
		// 編集ボタンのイベントを登録する
		this.setClickEvent(SELECTOR_B_EDIT, prepareAnotherWindow);
		// 削除ボタンのイベントを登録する
		this.setClickEvent(SELECTOR_B_DELETE, clickDeleteButton);
		// アコーディオン対象ボタンのイベントを登録する
		this.managementAccordion(SELECTOR_B_ACCORDION, SELECTOR_ACCORDION_AREA);
		
	}
	
	/**
	 * 関数名：	createTopWindow
	 * 概要：		Top画面を開いた時の処理
	 * 引数：		なし
	 * 戻り値：	なし
	 * 作成日：	2016/11/23
	 * 作成者：	k.urabe
	 */
	this.createTopWindow = function() {
		
		// TODO:【未実装】logoutボタンはサーバ側のSpringで制御予定のため、特に記述なし。ただし、ダイアログを出さないといけないので、追加する必要あり
		// 画面共通部分のボタンにイベントを登録する
		// 検索ボタンのイベントを登録する
		this.setClickEvent(SELECTOR_B_SERACH, clickSearchButton);
		// 新規日報ボタンのイベントを登録する
		this.setClickEvent(SELECTOR_B_NEW_REPORT, prepareAnotherWindow);
		
		// TODO:【メモ】サーバから取得したHTMLには、初期表示として値が入っていることを想定
		// 初期の検索条件にて画面項目の取得を行う。
		this.clickSearchButton();
		
	}
	
}

TopWindowDetail.prototype = new WindowDesign();
//サブクラスのコンストラクタを有効にする
TopWindowDetail.prototype.constructor = WindowDesign;