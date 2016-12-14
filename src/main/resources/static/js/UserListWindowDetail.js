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
	this.clickSearchButton = function() {
		
		
		
		
	}
	
	/**
	 * 関数名：	clickUserList
	 * 概要：		ユーザ一覧の行がクリックされた際に実行されるイベント
	 * 引数：		なし
	 * 戻り値：	なし
	 * 作成日：	2016/12/14
	 * 作成者：	k.urabe
	 */
	this.clickUserList = function() {
		
	}

}

UserListWindowDetail.prototype = new WindowDesign();
//サブクラスのコンストラクタを有効にする
UserListWindowDetail.prototype.constructor = WindowDesign;