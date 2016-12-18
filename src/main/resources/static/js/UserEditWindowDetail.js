/**
 * ファイル名：	UserEditWindowDetail.js
 * 概要：		ユーザ編集画面系の処理を集めたクラスを定義したファイル。
 * 作成日：	2016/12/14
 * 作成者：	k.urabe
 * path：		js/TopWindowDetail.js
 */

/**
 * クラス名：	UserEditWindowDetail
 * 概要：		ユーザ編集画面系の処理を集めたクラス。WindowDesignクラスを継承する。
 * 作成日：	2016/12/14
 * 作成者：	k.urabe
 */
function UserEditWindowDetail() {
	
	WindowDesign.call(this);	//スーパークラスのコンストラクタを呼ぶ
	// 親ウインドウを取得する
	this.parentWindow = window.opener;
	
	// タグ判定用の配列を作成する
	this.tagArray = {};
	// セレクタに対応するタグの一覧を作成していく。
	this.tagArray[KEY_B_ADD_MAIL] = TAG_MAIL_BLOCK;
	this.tagArray[KEY_B_ADD_ADDRESS] = TAG_ADDRESS_BLOCK;
	this.tagArray[KEY_B_ADD_TEL] = TAG_TEL_BLOCK;
	this.tagArray[KEY_B_ADD_QUALIFICATION] = TAG_QUA_BLOCK;
	this.tagArray[KEY_B_ADD_FAMILY_H] = TAG_FAMILY_LINE;
	
	/**
	 * 関数名：	createUserEditWindow
	 * 概要：		ユーザ編集画面の初期表示機能
	 * 引数：		なし
	 * 戻り値：	なし
	 * 作成日：	2016/12/15
	 * 作成者：	k.urabe
	 */
	this.createUserEditWindow = function() {
		
		var selectUserId;			// 親で選択されているuser_idを格納するための変数
		var jsonArray = {};			// リクエストに使用するjson連想配列を作成する
		var jsonLen;				// jsonの長さを取得するための変数
		
		// 親の画面が存在するか判定する
		if(this.parentWindow !== null && this.parentWindow !== undefined) {

			// 親から取得したuser_idを取得する
			selectUserId = this.parentWindow.$(parentWindowDate).children(SELECTOR_USER_ID).text();
		
		}
		
		// 共通の各ボタンへイベントを登録する
		// 重複チェックボタンへイベントを登録する
		this.setClickEvent(SELECTOR_B_OVER_LAP, this.clickOverLapButton, null, $(SELECTOR_USER_ID).text());
		// メールアドレス追加ボタンへイベントを登録する
		this.setClickEvent(SELECTOR_B_ADD_MAIL, this.clickAddContentButton);
		// 住所追加ボタンへイベントを登録する
		this.setClickEvent(SELECTOR_B_ADD_ADDRESS, this.clickAddContentButton);
		// 電話番号追加ボタンへイベントを登録する
		this.setClickEvent(SELECTOR_B_ADD_TEL, this.clickAddContentButton);
		// 資格追加ボタンへイベントを登録する
		this.setClickEvent(SELECTOR_B_ADD_QUALIFICATION, this.clickAddContentButton);
		// 家族構成追加ボタン(隠し)へイベントを登録する
		this.setClickEvent(SELECTOR_B_ADD_FAMILY_H, this.clickAddContentButton);
		// 家族構成追加ボタンへイベントを登録する
		this.setClickEvent(SELECTOR_B_ADD_FAMILY, this.clickFamliyEditButton);
		// 画面上の閉じるボタンに対して押下時に実行されるイベントを登録する。
		this.setClickEvent(SELECTOR_B_CANCEL, this.closeWindow);
		
		// ユーザIDが取得出来ているか（編集として開くのか、新規登録としてひらくのか）判定する
		if(selectUserId != "" && selectUserId !== null && selectUserId !== undefined) {
			
			// ユーザに紐付くベース情報を取得するためのリクエスト用連想配列にuser_idをセットする
			jsonArray[KEY_USER_ID] = selectUserId;
			// JSON連想配列を用いてDBから値を取得する
			this.getJsonData(PATH_USER_GET_BASE_INF, jsonArray, STR_READ);
			// 取得したJSONを用いてHTMLへタグを展開する
			this.createUserEdit(SELECTOR_CONTENT_AREA);
			
			// 変数内でthisを使えるように待避する
			thisElem = this;
			
			// 増減コンテンツ（メールアドレス等）のデータを展開するため、コンテンツを走査する
			$(SELECTOR_ADD_CONTENT).each(function(index, elem){
				// 現在の増減コンテンツが何を示しているか取得してリクエスト用連想配列にセットする
				jsonArray[STR_CONTENT_TYPE] = $(this).attr("value");
				// 現在の増減コンテンツをDBから取得する
				thisElem.getJsonData(PATH_USER_GET_ADD_INF, jsonArray, STR_READ);
				
				// JSONの長さを取得
				jsonLen = thisElem.json.length;
				// 現在の増減コンテンツが取得出来たか検証する
				if(thisElem.json !== null && thisElem.json !== undefined && jsonLen !== 0) {
					// 取得した増減コンテンツを展開する
					thisElem.createUserEditContent($(this));
				}
			});
			
			// 管理者権限を有している、かつ対象ユーザの認証状態が未承認か検証
			if(this.getUserAuth() == STR_SUCCESS && $(SELECTOR_USER_STATUS).val() & FLAG_USER_STATUS_TMP) {
				// 承認ボタンを設置する
				$(SELECTOR_DOWN_MENU).append(TAG_APPROVAL_BUTTON);
				// 承認ボタンにイベントを登録する
				this.setClickEvent(SELECTOR_B_APPROVAL_USER, this.clickEntryButton);
			} else {
				// 更新ボタンを設置する
				$(SELECTOR_DOWN_MENU).append(TAG_UPDATE_BUTTON);
				// 更新ボタンにイベントを登録する
				this.setClickEvent(SELECTOR_B_EDIT, this.clickEntryButton);
			}
			// 削除ボタンを設置する
			$(SELECTOR_DOWN_MENU).append(TAG_DELETE_BUTTON);
			// 削除ボタンにイベントを登録する
			this.setClickEvent(SELECTOR_B_DELETE, this.clickDeleteButton);
		} else {
			// ユーザIDが取得出来ていない
			// 新規画面として登録ボタンを設置する
			$(SELECTOR_DOWN_MENU).append(TAG_NEW_USER);
			// 登録ボタンにイベントをセットする
			this.setClickEvent(SELECTOR_B_NEW_USER, this.clickEntryButton);
			// ユーザステータスに承認ステータスをセットする
			$(SELECTOR_USER_STATUS).val(STR_STATUS_TNP_NUM);
		}
	}
	
	/**
	 * 関数名：	clickOverLapButton
	 * 概要：		重複チェックボタン押下時のイベント
	 * 引数：		selecor, thisElem, funcTarget, valueTarget
	 * 戻り値：	なし
	 * 作成日：	2016/12/15
	 * 作成者：	k.urabe
	 */
	this.clickOverLapButton = function(selecor, thisElem, funcTarget, valueTarget) {
		
		var jsonArray = {};			// リクエストに使用するjson連想配列を作成する
		var message = "";			// 返却用メッセージを格納するための変数
		
		// 設定対象のユーザIDが存在するかチェック（存在しなければSUCCESS）
		if(thisElem.chackUser(valueTarget) == STR_SUCCESS) {
			// メッセージに重複していない旨をセットする
			message = MASSAGE_OVER_LAP_OK;
		} else {
			// メッセージに重複している旨をセットする
			message = MASSAGE_OVER_LAP_NG;
		}
		// セットされたメッセージを出力する
		thisElem.openWarnigDialog(message);
		
	}
	
	/**
	 * 関数名：	clickAddContentButton
	 * 概要：		○○追加ボタン押下時のイベント
	 * 引数：		selector, thisElem, funcTarget, valueTarget
	 * 戻り値：	なし
	 * 作成日：	2016/12/15
	 * 作成者：	k.urabe
	 */
	this.clickAddContentButton = function(selector, thisElem, funcTarget, valueTarget) {
		
		// セレクタに応じたタグ一式を追加ボタンの上に追加する
		 $(selector).before(thisElem.tagArray[$(selector).val()]);
		 
		 // 家族構成追加ボタン（隠し）か判定する
		 if(KEY_B_ADD_FAMILY_H == $(selector).attr("class")) {
			 // 行に対して家族構成編集画面を開くイベントを登録する
			 thisElem.setClickEvent(SELECTOR_EDIT_FAMILY, thisElem.clickFamliyEditButton, null, $(selector).parent().children(SELECTOR_PARENT_AREA_LAST));
		 // それ以外のボタンなのでイベントを削除ボタンのイベントを登録する
		 } else {
			 // 追加したタグ一式に含まれる削除ボタンに対してイベントを設定する
			 thisElem.setClickEvent(SELECTOR__B_CONTENT_DEL, thisElem.clickDeleteContentButton);
		 }
		 
	}
	
	/**
	 * 関数名：	clickDeleteContentButton
	 * 概要：		○○系削除ボタン押下時のイベント
	 * 引数：		selector, thisElem, funcTarget, valueTarget
	 * 戻り値：	なし
	 * 作成日：	2016/12/15
	 * 作成者：	k.urabe
	 */
	this.clickDeleteContentButton = function(selector, thisElem, funcTarget, valueTarget) {
		// 押下されたボタンがあるblockAreaを削除する
		$(selector).parent(SELECTOR_PARENT_AREA).remove();
	}
	
	/**
	 * 関数名：	clickFamliyEditButton
	 * 概要：		家族構成ボタンもしくは行をクリックされた時のイベント
	 * 引数：		なし
	 * 戻り値：	なし
	 * 作成日：	2016/12/15
	 * 作成者：	k.urabe
	 */
	this.clickFamliyEditButton = function(selector, thisElem) {
		// 別ウインドウで家族構成編集画面を開く
		thisElem.prepareAnotherWindow(selector, thisElem, null, selector);
	}
	
	/**
	 * 関数名：	clickEntryButton
	 * 概要：		登録ボタンがクリックされた時のイベント
	 * 引数：		なし
	 * 戻り値：	なし
	 * 作成日：	2016/12/15
	 * 作成者：	k.urabe
	 */
	this.clickEntryButton = function(selector, thisElem) {
		
		var jsonArray = {};			// リクエストに使用するjson連想配列を作成する
		var path;
		
		// ユーザIDの重複チェックを行う。
		
		// パスワードが一致しているかチェックを行う。
		
		// まず増減しないベース情報一式を集める
		// user_idを取得する
		jsonArray[KEY_USER_ID] = $(SELECTOR_USER_ID).val();
		// login_passwordを取得する
		jsonArray[KEY_LOGIN_PASSWORD] = $(SELECTOR_LOGIN_PASSWORD).val();
		// user_nameを取得する
		jsonArray[KEY_USER_NAME] = $(SELECTOR_USER_NAME).val();
		// user_nameを取得する
		jsonArray[KEY_USER_NAME_KANA] = $(SELECTOR_USER_NAME_KANA).val();
		// user_birthdayを取得する
		jsonArray[KEY_USER_BIRTHDAY] = $(SELECTOR_USER_BIRTHDAY).val();
		// user_sexを取得する
		jsonArray[KEY_USER_SEX] = $(SELECTOR_USER_SEX).val();
		// campany_idを取得する
		jsonArray[KEY_CAMPANY_ID] = $(SELECTOR_CAMPANY_ID).val();
		// department_idを取得する
		jsonArray[KEY_DEPARTMENT_ID] = $(SELECTOR_DEPARTMENT_ID).val();
		// postion_idを取得する
		jsonArray[KEY_POSITION_ID] = $(SELECTOR_POSITION_ID).val();
		// user_statusを取得する
		jsonArray[KEY_USER_SATTUS] = $(SELECTOR_USER_STATUS).val();
		
		// 押下されているボタンが承認ボタンか検証する
		if($(selector).val() === KEY_B_APPROVAL_USER) {
			// user_statusを登録済みに設定する
			jsonArray[KEY_USER_SATTUS] = FLAG_USER_STATUS_REG;
		}
		
		// 新規登録ボタンかどうかを検証する
		if($(selector).val() === KEY_B_NEW_USER) {
			// 登録リクエストURLをセットする
			path = PATH_USER_SAVE_BASE_INF;
		} else {
			// 更新リクエストURLをセットする
			path = PATH_USER_UPDATE_BASE_INF;
		}
		// ベース情報をDBに登録する
		thisElem.getJsonData(path, jsonArray, STR_CREATE);
		
		// 増減コンテンツ（メールアドレス等）のデータを取得するため、コンテンツを走査する
		$(SELECTOR_ADD_CONTENT).each(function(index, elem){
			
			// 増減コンテンツの登録に備えて、jsonArrayを初期化する
			jsonArray = {};
			// リクエスト用連想配列に増減コンテンツの種類をセットする
			jsonArray[STR_CONTENT_TYPE] = $(this).attr("value");
			// ユーザIDをセットする
			jsonArray[KEY_USER_ID] = $(SELECTOR_USER_ID).val();
			
			// 増減コンテンツ毎のblockareaを走査する
			$(this).children(SELECTOR_PARENT_AREA).each(function(index, elem) {
				// 行に対してjsonの連想配列を拡張する
				jsonArray[index] = {}
				// ユーザIDをセットする
				jsonArray[index][KEY_USER_ID] = $(SELECTOR_USER_ID).val();
			
				// それぞれのblockarea内のinput要素を走査する
				$(this).children("input").each(function(index_in, elem_in) {
					// 順番にinputの要素を取得していく
					jsonArray[index][$(elem_in).attr("class")] = $(elem_in).val();
				});
				// それぞれのblockarea内のselect要素を走査する
				$(this).children("select").each(function(index_in, elem_in) {
					// 順番にinputの要素を取得していく
					jsonArray[index][$(elem_in).get(0).className.split(" ")[0]] = $(elem_in).val();
				});
			});
			
			// 増減コンテンツの塊をDBに登録する
			thisElem.getJsonData(PATH_USER_SAVE_ADD_INF, jsonArray, STR_CREATE);

		});
		
		// ウインドウを閉じる
		thisElem.closeWindow();
		
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
		var jsonArray = {};			// リクエストに使用するjson連想配列を作成する
		
		// user_idを取得する
		jsonArray[KEY_USER_ID] = $(SELECTOR_USER_ID).val();
		// user_statusを削除みに設定する
		jsonArray[KEY_USER_SATTUS] = FLAG_USER_STATUS_DEL;
		// DBに削除のリクエストを送信する。
		thisElem.getJsonData(PATH_USER_DELETE_INF, jsonArray, STR_DELETE);
		// ログインしているユーザかどうか判定する
		if(!(thisElem.getUserAuth() == STR_SUCCESS)) {
			// ログアウトさせる
			thisElem.parentWindow.$(SELECTOR_B_LOGOUT).click();
		}
		
		// ウインドウを閉じる
		thisElem.closeWindow();
	}
	
	
	/**
	 * 関数名：	clickApprovalButton
	 * 概要：		承認ボタンがクリックされた時のイベント
	 * 引数：		なし
	 * 戻り値：	なし
	 * 作成日：	2016/12/15
	 * 作成者：	k.urabe
	 */
	this.clickApprovalButton = function() {

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

UserEditWindowDetail.prototype = new WindowDesign();
//サブクラスのコンストラクタを有効にする
UserEditWindowDetail.prototype.constructor = WindowDesign;