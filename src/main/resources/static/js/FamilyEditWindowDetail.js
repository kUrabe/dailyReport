/**
 * ファイル名：	FamilyEditWindowDetail.js
 * 概要：		家族構成編集画面系の処理を集めたクラスを定義したファイル。
 * 作成日：	2016/12/14
 * 作成者：	k.urabe
 * path：		js/TopWindowDetail.js
 */

/**
 * クラス名：	FamilyEditWindowDetail
 * 概要：		家族構成編集画面系の処理を集めたクラス。WindowDesignクラスを継承する。
 * 作成日：	2016/12/14
 * 作成者：	k.urabe
 */
function FamilyEditWindowDetail() {
	
	WindowDesign.call(this);	//スーパークラスのコンストラクタを呼ぶ
	// 親ウインドウを取得する
	this.parentWindow = window.opener;
	
	/**
	 * 関数名：	createFamilyEditWindow
	 * 概要：		家族構成編集画面の初期表示機能
	 * 引数：		なし
	 * 戻り値：	なし
	 * 作成日：	2016/12/15
	 * 作成者：	k.urabe
	 */
	this.createFamilyEditWindow = function() {
		
		// 
		
		// 親から受け取ったデータがあれば展開する
		if(parentWindowButton === KEY_EDIT_FAMILY) {
			// 親から受け取ったデータを展開する
			this.createFamilyEditContent();
			// 削除ボタンを設置する
			$(SELECTOR_DOWN_MENU).append(TAG_DELETE_BUTTON);
			// 削除ボタンにイベントを登録する
			this.setClickEvent(SELECTOR_B_DELETE, this.clickDeleteButton);
		}
		
		// 画面上の更新ボタンに対して押下時に実行されるイベントを登録する。
		this.setClickEvent(SELECTOR_B_UPDATE, this.clickUpdateButton);
		// 画面上の閉じるボタンに対して押下時に実行されるイベントを登録する。
		this.setClickEvent(SELECTOR_B_CANCEL, this.closeWindow);
		
	}
	
	/**
	 * 関数名：	createFamilyEditContent
	 * 概要：		家族構成編集画面の親からの取得データを展開する
	 * 引数：		なし
	 * 戻り値：	なし
	 * 作成日：	2016/12/15
	 * 作成者：	k.urabe
	 */
	this.createFamilyEditContent = function() {
		// 親から家族の名前を取得する
		$(SELECTOR_FAMILY_NAME).val(this.parentWindow.$(parentWindowDate).children(SELECTOR_FAMILY_NAME).val());
		// 親から家族（カナ）の名前を取得する
		$(SELECTOR_FAMILY_NAME_KANA).val(this.parentWindow.$(parentWindowDate).children(SELECTOR_FAMILY_NAME_KANA).val());
		// 親から家族の続柄を取得する
		$(SELECTOR_FAMILY_RELATION).val(this.parentWindow.$(parentWindowDate).children(SELECTOR_FAMILY_RELATION).val());
		// 親から家族の扶養を取得する
		$(SELECTOR_FAMILY_SUPPORT).val(this.parentWindow.$(parentWindowDate).children(SELECTOR_FAMILY_SUPPORT).val());
		
	}
	
	/**
	 * 関数名：	clickUpdateButton
	 * 概要：		更新ボタンがクリックされた時のイベント
	 * 引数：		selector, thisElem
	 * 戻り値：	なし
	 * 作成日：	2016/12/15
	 * 作成者：	k.urabe
	 */
	this.clickUpdateButton = function(selector, thisElem) {
		
		var $_target;
		
		// 親のデータがあるか検証する
		if(parentWindowButton === KEY_EDIT_FAMILY) {
			// 親で選択された入力エリアを対象とする
			$_target = thisElem.parentWindow.$(parentWindowDate);
		} else {
			// 行の追加を行うボタンをクリックする
			thisElem.parentWindow.$(parentWindowDate).parent().children(KEY_BUTTON).click();
			// 追加した最終行を入力エリアの対象とする
			$_target = thisElem.parentWindow.$(parentWindowDate).parent().children(SELECTOR_PARENT_AREA_LAST);
		}
		
		// 親にタグをセットする
		thisElem.parentWindow.$(parentWindowDate).parent().children(SELECTOR_PARENT_AREA_LAST).append(TAG_FAMILY_LINE);
		// 追加した親のタグに値をセットする
		// 家族の名前をセットする
		thisElem.parentWindow.$(parentWindowDate).children(SELECTOR_FAMILY_NAME).val($(SELECTOR_FAMILY_NAME).val());
		// 家族の名前（カナ）をセットする
		thisElem.parentWindow.$(parentWindowDate).children(SELECTOR_FAMILY_NAME_KANA).val($(SELECTOR_FAMILY_NAME_KANA).val());
		// 続柄をセットする
		thisElem.parentWindow.$(parentWindowDate).children(SELECTOR_FAMILY_RELATION).val($(SELECTOR_FAMILY_RELATION).val());
		// 扶養をセットする
		thisElem.parentWindow.$(parentWindowDate).children(SELECTOR_FAMILY_SUPPORT).val($(SELECTOR_FAMILY_SUPPORT).val);
		
		// ウインドウを閉じる
		thisElem.closeWindow();
	}
	
	/**
	 * 関数名：	clickDeleteButton
	 * 概要：		削除ボタンがクリックされた時のイベント
	 * 引数：		なし
	 * 戻り値：	なし
	 * 作成日：	2016/12/15
	 * 作成者：	k.urabe
	 */
	this.clickDeleteButton = function(selector, thisElem) {
		// 親のタグを削除する
		thisElem.parentWindow.$(parentWindowDate).remove();
		
		// ウインドウを閉じる
		thisElem.closeWindow();
	}
	
	/**
	 * 関数名：	clickCancelButton
	 * 概要：		戻るボタンがクリックされた時のイベント
	 * 引数：		なし
	 * 戻り値：	なし
	 * 作成日：	2016/12/15
	 * 作成者：	k.urabe
	 */
	this.clickCancelButton = function() {
		
	}
	
}

FamilyEditWindowDetail.prototype = new WindowDesign();
//サブクラスのコンストラクタを有効にする
FamilyEditWindowDetail.prototype.constructor = WindowDesign;