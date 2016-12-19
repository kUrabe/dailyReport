/**
 * ファイル名：	BaseWindow.js
 * 概要：		各Windowの共通処理を集めたクラスを定義したファイル。
 * 作成日：	2016/11/22
 * 作成者：	k.urabe
 * path：		js/BaseWindow.js
 */

/**
 * クラス名：	BaseWindow
 * 概要：		各Windowの共通処理を集めたクラス。基底クラスとなる。
 * 作成日：	2016/11/22
 * 作成者：	k.urabe
 */
function BaseWindow() {
	
	this.anotherWindow;			// 別Windowを格納する変数
	this.contentCheck = {};		// 入力値チェック
	
	// 入力値チェック用の連想配列を作成する
	this.contentCheck[KEY_USER_ID] = MASSAGE_USER_ID;
	this.contentCheck[KEY_LOGIN_PASSWORD] = MASSAGE_LOGIN_PASSWORD;
	this.contentCheck[KEY_LOGIN_PASSWORD_SAI] = MASSAGE_LOGIN_PASSWORD_SAI;
	this.contentCheck[KEY_USER_NAME] = MASSAGE_USER_NAME;
	this.contentCheck[KEY_USER_NAME_KANA] = MASSAGE_USER_NAME_KANA;
	this.contentCheck[KEY_USER_BIRTHDAY] = MASSAGE_USER_BIRTHDAY;
	this.contentCheck[KEY_MAIL_TITLE] = MASSAGE_MAIL_TITLE;
	this.contentCheck[KEY_MAIL] = MASSAGE_MAIL;
	this.contentCheck[KEY_ADDRESS_TITLE] = MASSAGE_ADDRESS_TITLE;
	this.contentCheck[KEY_POST_NUMBER] = MASSAGE_POST_NUMBER;
	this.contentCheck[KEY_ADDRESS] = MASSAGE_ADDRESS;
	this.contentCheck[KEY_FAMILY_NAME] = MASSAGE_FAMILY_NAME;
	this.contentCheck[KEY_FAMILY_NAME_KANA] = MASSAGE_FAMILY_NAME_KANA;
	this.contentCheck[KEY_FAMILY_RELATION] = MASSAGE_FAMILY_RELATION;
	this.contentCheck[KEY_FAMILY_SUPPORT] = MASSAGE_FAMILY_SUPPORT;
	
	/**
	 * 関数名：	chackUser
	 * 概要：		入力されたユーザIDが存在するかチェックする
	 * 引数：		なし
	 * 戻り値：	String
	 * 作成日：	2016/12/12
	 * 作成者：	k.urabe
	 */
	this.chackUser = function(valueTarget) {
		var tmp;		// サーバからの返却値を格納して返す

		// ajax通信を行う
		$.ajax({
			// リクエストURL
			url: PATH_USRE_CHACK,
			// postメソッドで通信する
			type: 'POST',
			// 同期通信を行う
			async: false,
			// サーバへ渡すデータを連想配列にする
			data: {user:valueTarget},
			// キャッシュを無効にする
			cache: false,
			// 通信成功時の処理
			success: function(user) {
				// 取得したjsonをメンバへ格納する
				tmp = user;
			},
			error: function(xhr, status, error) {
				// TODO:【未実装】メッセージおよび例外処理について未実装
				// 処理失敗の旨を出力する
				alert(MESSAGE_AJAX_ERROR);
			}
		});
		
		return tmp;
	}
	/**
	 * 関数名：	getUserAuth
	 * 概要：		ログインユーザが管理者権限を有しているか取得する
	 * 引数：		なし
	 * 戻り値：	String
	 * 作成日：	2016/12/12
	 * 作成者：	k.urabe
	 */
	this.getUserAuth = function() {
		var tmp;		// サーバからの返却値を格納して返す

		// ajax通信を行う
		$.ajax({
			// リクエストURL
			url: PATH_USER_AUTH,
			// postメソッドで通信する
			type: 'POST',
			// 同期通信を行う
			async: false,
			// キャッシュを無効にする
			cache: false,
			// 通信成功時の処理
			success: function(auth) {
				// 取得したjsonをメンバへ格納する
				tmp = auth;
			},
			error: function(xhr, status, error) {
				// TODO:【未実装】メッセージおよび例外処理について未実装
				// 処理失敗の旨を出力する
				alert(MESSAGE_AJAX_ERROR);
			}
		});
		
		return tmp;
	}
	
	
	/**
	 * 関数名：	managementAccordion
	 * 概要：		アコーディオンの開閉を管理する
	 * 引数：		String:clickTarget	クリックイベント対象のセレクタ
	 * 			String:accordionTarget	アコーディオンにする部分のセレクタ
	 * 戻り値：	なし
	 * 作成日：	2016/11/22
	 * 作成者：	k.urabe
	 */
	this.managementAccordion = function(clickTarget, accordionTarget) {
		
		var jsonArray = {};			// リクエストに使用するjson連想配列を作成する
		var thisElem = this;		// クリックイベント内でthisオブジェトを使用するために保持
		
		// 引数で受けたセレクタに対してクリックイベントをバインドする
		$(clickTarget).on(CLICK, function() {
			
			// アコーディオンが一度でも展開済みか確認するためのセレクタを取得する
			$_accordion = $(accordionTarget).children(SELECTOR_CONTENT_DETAIL).children(KEY_DIV);
								
			// アコーディオン内のレポート詳細が展開していないなら展開する
			if(!($_accordion.hasClass(KEY_PARENT_AREA))) {
				// データが未展開であるため、データを展開する
				// 日報の詳細部分を展開する
				// にユーザID（ログインユーザ）をセットする
				jsonArray[KEY_USER_ID] = $(SELECTOR_TOP_MENU + MARK_SPACE + SELECTOR_USER_ID).text();
				// コンテンツIDをセットする
				jsonArray[KEY_CONTENT_ID] = $(this).children(SELECTOR_CONTENT_ID).text();
				// 登録書式を当該日報から取得してセットする
				jsonArray[KEY_ENTRY_FORMAT] = $(this).children(SELECTOR_ENTRY_FORMAT).text();
				// 登録状態を当該日報から取得してセットする
				jsonArray[KEY_ENTRY_STATUS] = $(this).children(SELECTOR_ENTRY_STATUS).text();
				// サーバから日報詳細のデータを取得する
				thisElem.getJsonData(PATH_TOP_PAGE_DETAIAL_CONTENT, jsonArray, STR_READ);
				// 取得した日報データを展開する
				thisElem.createReportDetail($($(this).parent()).children(SELECTOR_ACCORDION_AREA).children(SELECTOR_CONTENT_DETAIL));
				
				// サーバからコメントに関するデータを取得する
				thisElem.getJsonData(PATH_TOP_PAGE_DETAIAL_COMMENT, jsonArray, STR_READ);
				// 取得したコメントデータを展開する（parentIdとして日報のコンテンツIDを渡す）
				thisElem.createCommentDetail($($(this).parent()).children(SELECTOR_ACCORDION_AREA).children(SELECTOR_COMMENT_AREA), jsonArray[KEY_CONTENT_ID]);

			}
			
			// 対象コンテンツが未読状態かつ、アコーディオンが閉じているならば既読へ更新する
			if($(this).children(SELECTOR_READ_STATUS).text() == STR_READ_OFF && ($(this).parent(SELECTOR_PARENT_AREA).children(SELECTOR_ACCORDION_AREA).css(KEY_DISPLAY) == STR_NONE)) {
				// 未読にするボタンを押下する
				// $(this).parent(SELECTOR_PARENT_AREA).children(SELECTOR_ACCORDION_AREA).children(SELECTOR_CONTENT_DETAIL).children(SELECTOR_B_NO_READ).click();
				// 未読にするボタンが押下された際の関数をコールする
				thisElem.clickAddContentButton($(this).parent(SELECTOR_PARENT_AREA).children(SELECTOR_ACCORDION_AREA).children(SELECTOR_CONTENT_DETAIL).children(SELECTOR_B_NO_READ), thisElem, null, $(this));
			}
			
			// 対象セレクタがクリックされた場合に、引数で受けたセレクタのアコーディオン開閉を行う。
			$(accordionTarget).slideToggle();
		});	
		
	}
	
	/**
	 * 関数名：	writeHtmlAttribute
	 * 概要：		「いいね」や「既読数」が変更された際に、HTML内の該当箇所を書き換える。
	 * 引数：		String:target	値を書き換える対象のセレクタ(行単位)
	 * 			String:detail	値書き換える対象のセレクタ（行内の項目単位）
	 * 			int:addValue	追加する値（+1 or -1）
	 * 戻り値：	なし
	 * 作成日：	2016/11/22
	 * 作成者：	k.urabe
	 */
	this.writeHtmlAttribute = function(target,　addCountSelector, addCount, changeValueSelector, changeValue) {
		
		// 現在の集計数を取得する
		var plusValue = parseInt($(target).children(addCountSelector).text());
		// 登録状態に合わせて加算値を設定する
		$(target).children(addCountSelector).text(plusValue + addCount);
		
		// いいね、未読にするの状態を更新する
		$(target).children(changeValueSelector).text(changeValue);
		
	}
	
	/**
	 * 関数名：	changeButtonStatus
	 * 概要：		いいね、未読にするを押下した際に、ボタンの状態を変更する
	 * 引数：		String:target		ボタンのセレクタ
	 * 			String:category		いいね、もしくは未読ボタン
	 * 			Strgin:value		ボタンに関わる機能の登録状態
	 * 戻り値：	なし
	 * 作成日：	2016/11/22
	 * 作成者：	k.urabe
	 */
	this.changeButtonStatus = function(target, category, value) {
		
		// 押下されボタンの機能を検証する（いいねボタンであるか検証する）
		if(FLAG_ADD_CATEGORY_FAVORITE & category) {
			// いいねが登録状態であるか検証する
			if(FLAG_CATEGORY_STATUS_REG & value) {
				// 登録状態のクラス名を付与する
				$(target).addClass(KEY_F_ON);
			// 削除（未登録）状態であるか検証する
			} else {
				// 登録状態のクラス名を削除する
				$(target).removeClass(KEY_F_ON);
			}	
		// 押下されボタンの機能を検証する（未読にするボタンであるか検証する）
		} else if(FLAG_ADD_CATEGORY_NOREAD & category) {
			// 未読機能が未読状態であるか検証する
			if(STR_READ_OFF == value) {
				// 未読状態のボタンを無効化する
				$(target).prop(KEY_DISABLED, true);
			} else {
				// 未読状態のボタンを有効化する
				$(target).prop(KEY_DISABLED, false);
			}
		}
	
	}
	
	/**
	 * 関数名：	openConfirmationDialog
	 * 概要：		確認ダイアログを開く
	 * 引数：		function:func	OK押下時に呼ばれる関数
	 * 			String:message	ダイアログに表示されるメッセージ
	 * 			selector		コールバックに使用する引数（セレクタ）
	 * 戻り値：	なし
	 * 作成日：	2016/11/22
	 * 作成者：	k.urabe
	 */
	this.openConfirmationDialog = function(selector, thisElem, funcTarget, valueTarget, func, message) {
		
		// 確認ダイアログを開き、OKが押下されたかを検証する
		if(window.confirm(message)) {
			// OK押下時に引数で受けた関数を実行する
			func(selector, thisElem, funcTarget, valueTarget);
		} else {
			// キャンセル時は何もしない
		}
		
	}
	
	/**
	 * 関数名：	compareValue
	 * 概要：		二値の重複チェックを行う
	 * 引数：		なし
	 * 戻り値：	真偽値
	 * 作成日：	2016/12/15
	 * 作成者：	k.urabe
	 */
	this.compareValue = function(val1, val2) {
		var returnBoolean = false;		// 返却用の真偽値を格納するための変数
		
		// 二値が等しいか検証する
		if(val1 === val2) {
			// 等しいのでtrueをセットする
			returnBoolean = true;
		}
		
		// 真偽値を返す
		return returnBoolean;
		
	}
	
	/**
	 * 関数名：	openWarnigDialog
	 * 概要：		警告ダイアログを開く
	 * 引数：		String:message	ダイアログに表示されるメッセージ
	 * 戻り値：	なし
	 * 作成日：	2016/11/22
	 * 作成者：	k.urabe
	 */
	this.openWarnigDialog = function(message) {
		
		// 警告ダイアログを開く
		alert(message);
		
	}
	
	/**
	 * 関数名：	openAnotherWindow
	 * 概要：		別ウインドウを開く
	 * 引数：		String:html	別ウインドウ用の
	 * 戻り値：	なし
	 * 作成日：	2016/11/22
	 * 作成者：	k.urabe
	 */
	this.openAnotherWindow = function(html) {

		// TODO:【未実装】今の方法だと、URLが無いため、開いた画面での処理が実行できないと思われる。
		// TODO:【未実装】サーバからHTMLを取得して開くのではなく、この関数内で直にURLを指定して開いた方がよいと考えられる。
		
		// TODO:【メモ】ウインドウの高さと幅は後々修正（合わせて定数化する）
		// 空のウインドウを開いてメンバ変数へ保持する
		this.anotherWindow = window.open("", "", "scrollbars=no, width=600, height=400");
		// 別ウインドウに対する書き込みを有効にする
		this.anotherWindow.document.open();
		// 別ウインドウにhtmlの内容を書き込む
		this.anotherWindow.document.write(html);
		// 別ウインドウへの書き込みを無効にする
		this.anotherWindow.document.close();
		
	}
	
	/**
	 * 関数名：	getWindowItem
	 * 概要：		画面項目の値を取得する
	 * 引数：		String:target	値を取得する対象のセレクタ
	 * 戻り値：	String			取得した値
	 * 作成日：	2016/11/22
	 * 作成者：	k.urabe
	 */
	this.getWindowItem = function(target) {
		
		// 取得した項目の値を返す
		return $(target).text() != "" ? $(target).text() : $(target).val();
		
	}
	
	/**
	 * 関数名：	setClickEvent
	 * 概要：		セレクタとコールバック関数を用いてクリックイベントを登録する
	 * 引数：		String:target	クリックイベントを登録する対象のセレクタ
	 * 			function:func	コールバックする関数
	 * 			String:funcTarget	:関数の処理対象となるセレクタ
	 * 			String:valueTarget	:処理に必要な値を取得するためのセレクタ
	 * 戻り値：	なし
	 * 作成日：	2016/11/22
	 * 作成者：	k.urabe
	 */
	this.setClickEvent = function(target, func, funcTarget, valueTarget, message = null) {
		
		// thisオブジェクトをボタン先の関数で使用できるよう保持する
		var thisElem = this;
		
		// 引数のセレクタでクリックイベントをバインドする
		$(target).on(CLICK, function() {
			
			// メッセージを受け取っているならば
			if(message) {
				// 確認ダイアログを表示して処理を行うか確認する。
				thisElem.openConfirmationDialog(this, thisElem, funcTarget, valueTarget, func, message);
			} else {
				// コールバック関数を実行する
				func(this, thisElem, funcTarget, valueTarget);
			}
		});
		
	}
	
	/**
	 * 関数名：	closeWindow
	 * 概要：		現在のウインドウを閉じる
	 * 引数：		なし
	 * 戻り値：	なし
	 * 作成日：	2016/11/22
	 * 作成者：	k.urabe
	 */
	this.closeWindow = function() {
		
		// TODO:【メモ】不要の可能性あり。もしくは修正
		// 現在のウインドウを閉じる
		window.close();
		
	}
	
	/**
	 * 関数名：	clickAddContentButton
	 * 概要：		いいね、未読にするボタンを押下した際のコールバック関数
	 * 引数：		object:selector		押下されたボタンのセレクタ
	 * 戻り値：	なし
	 * 作成日：	2016/11/22
	 * 作成者：	k.urabe
	 */
	this.clickAddContentButton = function(selector, thisElem, funcTarget, valueTarget) {
		
		var content_id;			// 対象のコンテンツIDを格納
		var add_category;		// 対象の追加種別を格納（いいね、未読にする）
		var category_status;	// 対象の登録状態を格納
		
		// 対象のコンテンツIDを取得
		content_id = parseInt($(valueTarget).children(SELECTOR_CONTENT_ID).text());
		// ボタンに設定されている追加種別を取得する
		add_category = parseInt($(selector).val());
		// ボタンの機能を判定して登録状態を取得する
		if(add_category & FLAG_ADD_CATEGORY_NOREAD) {
			// 未読にするボタンが押下されているため、登録状態を取得する
			category_status = $(valueTarget).children(SELECTOR_READ_STATUS).text() == STR_READ_ON ? FLAG_CATEGORY_STATUS_REG : FLAG_CATEGORY_STATUS_DEL;
		} else {
			// いいねボタンが押下されているため、登録状態を取得する
			category_status = $(valueTarget).children(SELECTOR_FAVARITE_STATUS).text() == FLAG_CATEGORY_STATUS_REG ? FLAG_CATEGORY_STATUS_REG : FLAG_CATEGORY_STATUS_DEL
		}
		// 取得した各値を処理振り分け用の関数に渡す
		thisElem.addContentBranch(content_id, add_category, category_status, valueTarget, selector);
		
	}
	
	/**
	 * 関数名：	addContentBranch
	 * 概要：		いいね、未読にするボタンの状況により処理を振り分ける
	 * 引数：		int:contentId
	 * 			int:add_category
	 * 			int:category_status
	 * 			String selector
	 * 戻り値：	なし
	 * 作成日：	2016/11/22
	 * 作成者：	k.urabe
	 */
	this.addContentBranch = function(contentId, add_category, category_status, selector, buttonSelector) {
		
		var jsonArray = {};			// サーバへのリクエスト用JSON連想配列
		var addCount;				// 追加機能の集計数への加算値を格納
		var addCountSelector;		// 追加機能の集計数へのセレクタ
		var changeValue;			// 登録状態を表す値を格納
		var changeValueSelector;	// 登録状態を表す値へのセレクタ
		
		// JSON連想配列にユーザID（ログインユーザ）をセットする
		jsonArray[KEY_USER_ID] = $(SELECTOR_TOP_MENU + MARK_SPACE + SELECTOR_USER_ID).text();
		// JSON連想配列にコンテンツIDをセットする
		jsonArray[KEY_CONTENT_ID] = contentId;
		// JSON連想配列に追加種別をセットする
		jsonArray[KEY_ADD_CATEGORY] = add_category;
		
		// TODO:【未実装】条件分岐の中が同じ処理ばかり、共通化を検討
		// 押下した時の状態が登録であるかを検証する
		if(FLAG_CATEGORY_STATUS_REG & category_status) {
			// JSON連想配列に更新すべき登録状態をセットする
			jsonArray[KEY_CATEGORY_STATUS] = FLAG_CATEGORY_STATUS_DEL;
			// JSON連想配列を用いてDBの値を更新する
			this.getJsonData(PATH_COMMON_SAVE_ADD_CONTENT, jsonArray, STR_UPDATE);
			// 加算値をセットする
			addCount = -1;
		// 押下した時の状態が削除であるかを検証する
		} else if(FLAG_CATEGORY_STATUS_DEL & category_status) {
			// JSON連想配列に更新すべき登録状態をセットする
			jsonArray[KEY_CATEGORY_STATUS] = FLAG_CATEGORY_STATUS_REG;
			// JSON連想配列を用いてDBの値を更新する
			this.getJsonData(PATH_COMMON_SAVE_ADD_CONTENT, jsonArray, STR_UPDATE);
			// 加算値をセットする
			addCount = 1;
		} else {
			// JSON連想配列に更新すべき登録状態をセットする
			jsonArray[KEY_CATEGORY_STATUS] = FLAG_CATEGORY_STATUS_DEL;
			// JSON連想配列を用いてDBの値を登録する
			this.getJsonData(PATH_COMMON_SAVE_ADD_CONTENT, jsonArray, STR_CREATE);
			// 加算値をセットする
			addCount = 1;
		}
		
		// 機能がいいねか検証
		if(FLAG_ADD_CATEGORY_FAVORITE & add_category) {
			// 集計数へのセレクタをセットする
			addCountSelector = SELECTOR_FAVORITE_COUNT;
			// ユーザがいいねしているかのフラグ(addCountが-1ということは削除となるので、いいねをしていないフラグとして0をセット)
			changeValue = addCount == -1 ? FLAG_CATEGORY_STATUS_DEL : FLAG_CATEGORY_STATUS_REG;
			// ユーザがいいねしているかのフラグを格納するセレクタ
			changeValueSelector = SELECTOR_FAVARITE_STATUS;
		// 機能が未読にするか検証
		} else if(FLAG_ADD_CATEGORY_NOREAD & add_category) {
			// 集計数へのセレクタをセットする
			addCountSelector = SELECTOR_READ_COUNT;
			// ユーザが既読なのかフラグ(addCountが-1ということは削除となるので、未読のフラグをセット)
			changeValue = addCount == -1 ? STR_READ_OFF : STR_READ_ON;
			// ユーザが既読なのかのフラグを格納するセレクタ
			changeValueSelector = SELECTOR_READ_STATUS;
		}
		
		// TODO:【セレクタ】行単位は引数でまかなえるが、項目単位のセレクタを判定する必要がある
		// 更新状態に合わせて、集計数を更新する
		this.writeHtmlAttribute(selector, addCountSelector, addCount, changeValueSelector, changeValue);
		// 更新状態に合わせて、ボタンの状態を更新する
		this.changeButtonStatus(buttonSelector, add_category, changeValue);
		
	}
	
	/**
	 * 関数名：	clickDeleteButton
	 * 概要：		削除ボタンが押下された際の処理
	 * 引数：		selector		押下されたボタンのセレクタ
	 * 			thisElem		トップ画面のインスタンス
	 * 			funcTarget		処理対象となるセレクタ
	 * 			valueTarget		処理に必要な値があるセレクタ
	 * 戻り値：	なし
	 * 作成日：	2016/11/22
	 * 作成者：	k.urabe
	 */
	this.clickDeleteButton = function(selector, thisElem, funcTarget, valueTarget) {
		
		var jsonArray = {};			// サーバへのリクエスト用JSON連想配列
		var content_id;				// 対象のコンテンツIDを格納
		var entry_status;			// 対象の登録状態を格納

		// 対象のコンテンツIDを取得
		// TODO:【メモ】引数のselectorはボタンを指している
		content_id = $(valueTarget).children(SELECTOR_CONTENT_ID).text();
		// 対象の登録状態を取得
		category_status = $(valueTarget).children(SELECTOR_ENTRY_STATUS).text();
		// JSON連想配列にコンテンツIDをセットする
		jsonArray[KEY_CONTENT_ID] = content_id;
		
		// 当該コンテンツの状態が登録であるか検証する
		if(FLAG_ENTRY_STATUS_REG & category_status) {
			// JSON連想配列に更新する登録状態をセットする
			jsonArray[KEY_ENTRY_STATUS] = FLAG_ENTRY_STATUS_DEL;
			// JSON連想配列を用いてDBの値を更新する
			thisElem.getJsonData(PATH_COMMON_DELETE_CONTENT, jsonArray, STR_UPDATE);
		// 当該コンテンツの状態が下書であるか検証する
		} else if(FLAG_ENTRY_STATUS_NOTE & category_status) {
			// JSON連想配列を用いてDBのレコードを削除する
			thisElem.getJsonData(PATH_COMMON_DELETE_CONTENT, jsonArray, STR_DELETE);
		}
		
		// 親ウインドウがいるか判定する
		if(thisElem.parentWindow) {
			// 親ウインドウを再描画する
			thisElem.parentWindow.$(SELECTOR_B_SERACH).click();
			// 子ウインドウを閉じる
			window.close();
		// 子ウインドウがいない
		} else {
			// 一覧を再描画する
			$(SELECTOR_B_SERACH).click();
		}
		
	}
	
	/**
	 * 関数名：	prepareAnotherWindow
	 * 概要：		別ウインドウを開く準備処理
	 * 引数：		object:selector		押下されたボタンのセレクタ
	 * 			thisElem		トップ画面のインスタンス
	 * 			funcTarget		処理対象となるセレクタ
	 * 			valueTarget		処理に必要な値があるセレクタ
	 * 戻り値：	なし
	 * 作成日：	2016/11/22
	 * 作成者：	k.urabe
	 */
	this.prepareAnotherWindow = function(selector, thisElem, funcTarget, valueTarget) {
		
		var parent_content_id;		// 対象の親コンテンツIDを格納
		var content_id;				// 対象のコンテンツIDを格納
		var button_type;			// 押下されたボタンのタイプを格納
		var path;					// リクエストのpathを格納
		var name;					// 別ウインドウの名前を格納

		// 対象のコンテンツIDを取得
		contentId = $(valueTarget).children(SELECTOR_CONTENT_ID).text();
		// 押下されたボタンのタイプを取得
		//button_type = $(selector).val();
		button_type = $(selector).attr("value");
		// button_typeが取得出来ていなかったら
		if(button_type == null && button_type == undefined) {
			button_type = $(selector).val();
		}
		
		// TODO:【未実装】以下の条件判定を別関数へ定義検討
		// 取得したボタンの種類によってリクエストのpathを判定する
		// 日報作成画面ならば
		if(button_type === KEY_B_NEW_REPORT || button_type === KEY_B_EDIT) {
			// 日報作成画面のpathをセットする
			path = PATH_REPORT_CREATE;
			// 画面名をセットする
			name = STR_REPORT_CREATE;
		// コメント作成画面ならば
		} else if(button_type === KEY_B_NEW_COMMENT || button_type === KEY_B_COMMENT_EDIT) {
			// コメント作成画面のpathをセットする
			path = PATH_COMMENT_CREATE;
			// 画面名をセットする
			name = STR_COMMENT_CREATE;
		// ユーザ編集画面ならば
		} else if(button_type === KEY_USER_LINE || button_type === KEY_B_USER_EDIT_WINDOW) {
			// ユーザ編集画面のpathをセットする
			path = PATH_USER_WINDOW_EDIT;
			// 画面名をセットする
			name = STR_USER_EDIT;
		// ユーザ一覧画面ならば
		} else if(button_type === KEY_B_USER_LIST_WINDOW) {
			// ユーザ編集画面のpathをセットする
			path = PATH_USER_WINDOW_LIST;
			// 画面名をセットする
			name = STR_USER_LIST;
		// 家族構成画面ならば
		} else if(button_type === KEY_B_ADD_FAMILY || button_type === KEY_EDIT_FAMILY) {
			// 家族構成編集画面のpathをセットする
			path = PATH_USER_WINDOW_FAMILY;
			// 画面名をセットする
			name = STR_FAMILY_EDIT;
		} else {
			// コメント詳細画面のpathをセットする
			path = PATH_COMMENT_VIEW;
			// 画面名をセットする
			name = STR_COMMENT_VIEW;
			// 対象のコメントを既読にする
			// 対象コンテンツが未読状態ならば既読へ更新する
			if(valueTarget.children(SELECTOR_READ_STATUS).text() == STR_READ_OFF) {
				// 未読にするボタンを押下する
				valueTarget.children(SELECTOR_B_NO_READ).click();
			}
			// thisElem.addContentBranch(content_id, FLAG_ADD_CATEGORY_NOREAD, FLAG_CATEGORY_STATUS_DEL, selector);
		}
		
		// pathにコンテンツIDを付与する
		//path += STR_GET_PARA_CONTENT_ID + contentId;
		
		// 別ウインドウを開く
		this.anotherWindow = window.open(path, name, "location=no,alwaysRaised=yes,dependent=yes");
		
		thisElem = this;
		
		// 子ウインドウが開くのを待ち、親のオブジェクトを渡す
		setTimeout(function() {
			// 子のウインドウに親ウインドウで押下されたボタンタイプを渡す
			thisElem.anotherWindow.parentWindowButton = button_type;
			// 子のウインドウにデータの取得元のセレクタを渡す
			thisElem.anotherWindow.parentWindowDate = valueTarget;
		}, 200);
		
		
		// 取得したログインユーザを開いたウインドウにセットする
		//this.anotherWindow.$(".base_parent_content_id").text(user);
		/*
		// TODO:【未実装】HTMLをサーバから取得せず、openAnotherWindow関数から直接URLを指定する形にする方が、URLも取得できて、後続の処理が繋がると考えられる。
		// HTML文字列を取得する
		thisElem.getHtmlData(path);
		
		// TODO:【未実装】以下の2ステップについて。無理矢理埋めているが、別ウインドウに渡すスマートな方法を考える
		// 取得したHTML文字列に親コンテンツIDを埋める
		thisElem.dom += (TAG_NEW_PAGE_PARENT_CONTENT_ID + parent_content_id + TAG_DIV_END);
		// 取得したHTML文字列にコンテンツIDを埋める
		thisElem.dom += (TAG_NEW_PAGE_CONTENT_ID + content_id + TAG_DIV_END);
		
		// 取得したHTMLで別ウインドウを開く
		thisElem.openAnotherWindow(thisElem.dom);
		*/
	}
	
	/**
	 * 関数名：	checkRequired
	 * 概要：		入力値チェック
	 * 引数：		なし
	 * 戻り値：	String
	 * 作成日：	2016/12/19
	 * 作成者：	k.urabe
	 */
	this.checkRequired = function() {
		
		var message = "";
		
		thisElem = this;
		
		// 全入力エリアを走査する
		$("input").each(function(index, elem){
			
			// 空白の入力エリアがあるか検証する
			if($(this).val() == "") {
				// クラス名を取得する
				var target = $(this).get(0).className.split(" ")[0];
				// メッセージが追加済みか検証する
				if(message.indexOf(thisElem.contentCheck[target]) == -1) {
					// メッセージにエラーメッセージを追加する。
					message += thisElem.contentCheck[target];
				}
			}
			
		});
		
		return message;
		
	}
	
	
}