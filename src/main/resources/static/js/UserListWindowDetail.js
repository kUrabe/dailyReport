/**
 * ファイル名：	UserListWindowDetail.js
 * 概要：		ユーザ一覧画面系の処理を集めたクラスを定義したファイル。
 * 作成日：	2016/12/14
 * 作成者：	k.urabe
 * path：		js/TopWindowDetail.js
 */

/**
 * クラス名：	UserListWindowDetail
 * 概要：		ユーザ一覧画面系の処理を集めたクラス。WindowDesignクラスを継承する。
 * 作成日：	2016/12/14
 * 作成者：	k.urabe
 */
function UserListWindowDetail() {
	
	WindowDesign.call(this);	//スーパークラスのコンストラクタを呼ぶ
	
	/**
	 * 関数名：	createUserListWindow
	 * 概要：		ユーザ一覧画面の初期表示機能
	 * 引数：		なし
	 * 戻り値：	なし
	 * 作成日：	2016/12/14
	 * 作成者：	k.urabe
	 */
	this.createUserListWindow = function() {
		
		// 画面上の検索ボタンに対して押下時に実行されるイベントを登録する。
		this.setClickEvent(SELECTOR_B_SERACH, this.clickSearchButton);
		// 画面上の閉じるボタンに対して押下時に実行されるイベントを登録する。
		this.setClickEvent(SELECTOR_B_CANCEL, this.closeWindow);
		
		// 検索ボタンを押下して初期の画面表示として、ユーザ一覧を取得する
		$(SELECTOR_B_SERACH).click();
		
	}
	
	/**
	 * 関数名：	clickSearchButton
	 * 概要：		検索ボタン押下時に実行されるイベント
	 * 引数：		なし
	 * 戻り値：	なし
	 * 作成日：	2016/12/14
	 * 作成者：	k.urabe
	 */
	this.clickSearchButton = function(selector, thisElem) {
		
		var jsonArray = {};			// リクエストに使用するjson連想配列を作成する
		
		// 検索実行前に描画エリア全体を初期状態に戻す
		// ユーザ一覧の描画領域をすべて削除する
		$(KEY_DIV).remove(SELECTOR_PARENT_AREA);
		// 件数取得なしのメッセージを削除する
		$(SELECTOR_SERACH_MESSAGE).text("");
		// 行の見出しを削除する
		$(KEY_DIV).remove(SELECTOR_INDEX_LINE);
		
		// 検索領域の各値を取得する
		// JSON連想配列に検索対象のuser_idをセットする
		jsonArray[KEY_USER_ID] = thisElem.getWindowItem(SELECTOR_LEFT_MENU + MARK_SPACE + SELECTOR_USER_ID);
		// JSON連想配列に検索対象のuser_nameをセットする
		jsonArray[KEY_USER_NAME] = thisElem.getWindowItem(SELECTOR_LEFT_MENU + MARK_SPACE + SELECTOR_USER_NAME);
		// JSON連想配列に検索対象のminをセットする
		jsonArray[KEY_MIN] = thisElem.getWindowItem(SELECTOR_LEFT_MENU + MARK_SPACE + SELECTOR_MIN);
		// JSON連想配列に検索対象のmaxをセットする
		jsonArray[KEY_MAX] = thisElem.getWindowItem(SELECTOR_LEFT_MENU + MARK_SPACE + SELECTOR_MAX);
		// JSON連想配列に検索対象の性別をセットする
		jsonArray[KEY_USER_SEX] = thisElem.getWindowItem(SELECTOR_LEFT_MENU + MARK_SPACE + SELECTOR_USER_SEX);
		
		// JSON連想配列を用いてDBから値を取得する
		thisElem.getJsonData(PATH_USER_MATCH_INF, jsonArray, STR_READ);
		// 取得したJSONを用いてHTMLへタグを展開する
		thisElem.createUserList(SELECTOR_CONTENT_AREA);
		
		
	}
	
	/**
	 * 関数名：	clickUserList
	 * 概要：		ユーザ一覧の行がクリックされた際に実行されるイベント
	 * 引数：		なし
	 * 戻り値：	なし
	 * 作成日：	2016/12/14
	 * 作成者：	k.urabe
	 */
	this.clickUserList = function(selector, thisElem) {
		// 別ウインドウでユーザ編集画面を開く
		thisElem.prepareAnotherWindow(selector, thisElem, null, selector);
	}

}

UserListWindowDetail.prototype = new WindowDesign();
//サブクラスのコンストラクタを有効にする
UserListWindowDetail.prototype.constructor = WindowDesign;