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
	 * 引数：		String selector 使用しない想定
	 * 			object thisElem ボタン押下時に取得したobject
	 * 戻り値：	なし
	 * 作成日：	2016/11/23
	 * 作成者：	k.urabe
	 */
	this.clickSearchButton = function(selector, thisElem) {
		
		var jsonArray = {};			// リクエストに使用するjson連想配列を作成する
		var readTemp;				// サーバに渡す値に置き換えるために一時的に保持する変数
		var noteTemp;				// サーバに渡す値に置き換えるために一時的に保持する変数
		var fromTime;				// 時間チェックのためfromの値を格納する変数
		var toTime;					// 時間チェックのためtoの値を格納する変数
		
		// 検索領域のfromを取得する
		fromTime = thisElem.getWindowItem(SELECTOR_SERACH_FROM_DATE);
		// 検索領域のtoを取得する
		toTime = thisElem.getWindowItem(SELECTOR_SERACH_TO_DATE);
		
		// fromとtoの入力値がfrom<=toとなっているか検証する
		if(thisElem.isCheckDateFromTo(fromTime, toTime)) {

			// 日報の描画領域をすべて削除する
			$(KEY_DIV).remove(SELECTOR_PARENT_AREA);
			// 件数取得なしのメッセージを削除する
			$(SELECTOR_SERACH_MESSAGE).text("");
			// 行の見出しを削除する
			$(KEY_DIV).remove(SELECTOR_INDEX_LINE);
		
			// JSON連想配列にユーザID（ログインユーザ）をセットする
			jsonArray[KEY_USER_ID] = $(SELECTOR_TOP_MENU + MARK_SPACE + SELECTOR_USER_ID).text();
			// 検索領域のfromを取得する
			jsonArray[KEY_SERACH_FROM_DATE] = fromTime;
			// 検索領域のtoを取得する
			jsonArray[KEY_SERACH_TO_DATE] = toTime;
			// 検索領域のユーザを取得する
			jsonArray[KEY_SERACH_USER] = thisElem.getWindowItem(SELECTOR_SERACH_USER);
			// 検索領域の既読を取得する
			jsonArray[KEY_SERACH_READ] = thisElem.getWindowItem(SELECTOR_SERACH_READ + MARK_SPACE + SELECTOR_OPTION);
			// 検索領域の下書を取得する
			jsonArray[KEY_SERACH_NOTE] = thisElem.getWindowItem(SELECTOR_SERACH_NOTE + MARK_SPACE + SELECTOR_OPTION);

			// JSON連想配列を用いてDBから値を取得する
			thisElem.getJsonData(PATH_TOP_PAGE_CONTENT, jsonArray, STR_READ);
			// 取得したJSONを用いてHTMLへタグを展開する
			thisElem.createContentIndex(SELECTOR_REPORT_AREA, 0);

		} else {
			// fromとtoの値が正しく入力されていない旨のメッセージを出力する
			thisElem.openWarnigDialog(MASSAGE_FROM_TO_ERROR);
		}
	}
	
	/**
	 * 関数名：	logout
	 * 概要：		logout処理を実行する
	 * 引数：		なし
	 * 戻り値：	なし
	 * 作成日：	2016/11/23
	 * 作成者：	k.urabe
	 */
	this.logout = function() {
		// 確認ダイアログを表示
		if(window.confirm(MESSAGE_LOGOUT)){
			// 「OK」時は送信を実行
			// logout用のリクエストform要素を作成する
			var form = document.createElement(KEY_FORM);
			// 作成したformのmethod属性にPOSTを指定する
			form.setAttribute(KEY_METHOD, STR_POST);
			// 作成したformのaction属性にログアウト用のpathを指定する
			form.setAttribute(KEY_ACTION, STR_LOGOUT_PATH);
			// formの内容を送信する
			form.submit();
		}
	}
	
	/**
	 * 関数名：	logoutAuto
	 * 概要：		logout処理を実行する
	 * 引数：		なし
	 * 戻り値：	なし
	 * 作成日：	2016/11/23
	 * 作成者：	k.urabe
	 */
	this.logoutAuto = function() {

		// 「OK」時は送信を実行
		// logout用のリクエストform要素を作成する
		var form = document.createElement(KEY_FORM);
		// 作成したformのmethod属性にPOSTを指定する
		form.setAttribute(KEY_METHOD, STR_POST);
		// 作成したformのaction属性にログアウト用のpathを指定する
		form.setAttribute(KEY_ACTION, STR_LOGOUT_PATH);
		// formの内容を送信する
		form.submit();
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
		
		// 画面共通部分のボタンにイベントを登録する
		// ログアウトボタンのイベントを登録する(/logoutへリクエストするとSpringが制御する)
		this.setClickEvent(SELECTOR_B_LOGOUT, this.logout);
		this.setClickEvent(SELECTOR_B_LOGOUT_AUTO, this.logoutAuto);
		// 検索ボタンのイベントを登録する
		this.setClickEvent(SELECTOR_B_SERACH, this.clickSearchButton);
		// 新規日報ボタンのイベントを登録する
		this.setClickEvent(SELECTOR_B_NEW_REPORT, this.prepareAnotherWindow, null, null);
		
		// ログインユーザが管理者であるか検証する
		if(this.getUserAuth() == STR_SUCCESS) {
			// ユーザ一覧画面へのボタンを配置する
			$(SELECTOR_TOP_MENU).append(TAG_USER_LIST_WINDOW_BUTTON);
			// ボタンへイベントを登録する
			this.setClickEvent(SELECTOR_B_USER_LIST_WINDOW, this.prepareAnotherWindow, null, null);
		} else {
			// ユーザ編集画面へのボタンを配置する
			$(SELECTOR_TOP_MENU).append(TAG_USER_EDIT_WINDOW_BUTTON);
			// ボタンイベントを登録する
			this.setClickEvent(SELECTOR_B_USER_EDIT_WINDOW, this.prepareAnotherWindow, null, SELECTOR_TOP_MENU);
		}
		
		// TODO:【メモ】サーバから取得したHTMLには、初期表示として値が入っていることを想定
		// 初期の検索条件にて画面項目の取得を行う。
		$(SELECTOR_B_SERACH).click();
		
	}
	
}

TopWindowDetail.prototype = new WindowDesign();
//サブクラスのコンストラクタを有効にする
TopWindowDetail.prototype.constructor = WindowDesign;