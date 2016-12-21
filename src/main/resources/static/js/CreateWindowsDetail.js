/**
 * ファイル名：	CreateWindowsDetail.js
 * 概要：		作成画面系の処理を集めたクラスを定義したファイル。
 * 作成日：	2016/11/22
 * 作成者：	k.urabe
 * path：		js/CreateWindowsDetail.js
 */

/**
 * クラス名：	CreateWindowsDetail
 * 概要：		作成画面系の処理を集めたクラス。WindowDesignクラスを継承する。
 * 作成日：	2016/11/22
 * 作成者：	k.urabe
 */
function CreateWindowsDetail() {
	
	WindowDesign.call(this);	//スーパークラスのコンストラクタを呼ぶ
	// 親ウインドウを取得する
	this.parentWindow = window.opener;
	/**
	 * 関数名：	getIndexLastNumber
	 * 概要：		指定したセレクタの個数を返す（最終番号）
	 * 			引数は数えたい領域を限定できるように指定すること
	 * 引数：		selector
	 * 戻り値：	なし
	 * 作成日：	2016/11/23
	 * 作成者：	k.urabe
	 */
	this.getIndexLastNumber = function(selector) {
		
		// 指定の要素数（最終番号）を返す
		return $(selector).length();
		
	}
	
	/**
	 * 関数名：	isCheckDeleteItem
	 * 概要：		見出し削除の対象となるテキストエリアが空かどうかをチェックする
	 * 引数：		selector	押されたボタン
	 * 戻り値：	boolean
	 * 作成日：	2016/11/23
	 * 作成者：	k.urabe
	 */
	this.isCheckDeleteItem = function(selector) {
		
		var returnBoolean = false;		// 返却用の変数に初期値としてfalseを格納する
		var $_parentArea;				// 押されたボタンの親セレクタを格納する変数
		
		// 押下されたボタンの親領域のセレクタを取得する（テキストエリアなどを包括する領域）
		$_parentArea = $(selector).parent(SELECTOR_PARENT_AREA);
		
		// 見出しエリアとテキストエリアが空白ではないか検証
		if($_parentArea.children(SELECTOR_INDEX_AREA).val() == "" && $_parentArea.children(SELECTOR_MAIN_TEXT).val() == "") {
			// 空白なので、trueをセットする
			returnBoolean = true;
		}
		
		// 判定結果を返す
		return returnBoolean;
		
	}
	
	/**
	 * 関数名：	changeIndexNumber
	 * 概要：		見出し数の増減後に見出し番号を振り直す
	 * 引数：		なし
	 * 戻り値：	なし
	 * 作成日：	2016/11/23
	 * 作成者：	k.urabe
	 */
	this.changeIndexNumber = function() {

		// 見出しの個数分ループして番号を振り直す
		$(SELECTOR_NUMBER).each(function(index) {
			// indexを使用して番号を付与し直す
			$(this).text(index + 1);
		});
		
	}
	
	/**
	 * 関数名：	isCheckDraftBox
	 * 概要：		下書にチェックが入っているか返す
	 * 引数：		なし
	 * 戻り値：	boolean
	 * 作成日：	2016/11/23
	 * 作成者：	k.urabe
	 */
	this.isCheckDraftBox = function() {
		
		var returnBoolean = false;		// 返却用の変数に初期値としてfalseを格納する
		
		// チェックが入っているか検証
		if($(SELECTOR_C_NOTE).prop(CHECKED)) {
			// チェックが入っているので、trueをセットする
			returnBoolean = true;
		}
		// 判定結果を返す
		return returnBoolean;
		
	}
	
	/**
	 * 関数名：	isCheckTextArea
	 * 概要：		報告ボタン押下時に、記入漏れ箇所がないかをチェック
	 * 引数：		なし
	 * 戻り値：	boolean
	 * 作成日：	2016/11/23
	 * 作成者：	k.urabe
	 */
	this.isCheckTextArea = function() {
		
		var returnBoolean = true;		// 返却用の変数に初期値としてtrueを格納する
		
		// 画面内のテキストエリアを走査する
		$(KEY_TEXT_AREA).each(function(index) {
			// 空白であるか検証する
			if($(this).val() == "") {
				// 空白があったため、返却用の変数にfalseをセットする
				returnBoolean = false;
				// ループを抜ける
				return false;
			}
		});
		// 判定結果を返す
		return returnBoolean;
		
	}
	
	/**
	 * 関数名：	getBeforePlan
	 * 概要：		前日（前日がない場合は、最新日付）の予定を取得して対象のエリアにセットする
	 * 引数：		selector	押下されたボタンのセレクタ
	 * 戻り値：	なし
	 * 作成日：	2016/11/23
	 * 作成者：	k.urabe
	 */
	this.getBeforePlan = function(selector, thisElem) {
		
		var jsonArray = {};			// リクエストに使用するjson連想配列を作成する
		var jsonLen;		// jsonの長さを保持するための変数
		var user;					// ユーザ識別の値を格納するための変数
		var date;					// 当該日の日付を格納するための変数（前日までの検索はサーバ側で行う。ここでは当該日をとる）
		var getTitle;				// 当該ボタンが取得したい見出し名を保持するための変数
		
		// 押下されたボタンが取得したい見出し名を取得する
		getTitle = $(selector).parent().children(SELECTOR_GET_INDEX_NAME).val();
		
		// TODO:【セレクタ】画面にセットするユーザ識別子が未定のため、現状はuser_idをセット
		// ユーザ識別の値を取得する
		user = $(SELECTOR_USER_ID).text();
		// 当該日の日付を取得する
		date = $(SELECTOR_REPORT_DATE).val();
		
		// リクエスト用JSON連想配列に追加する
		// ユーザIDをセット
		jsonArray[KEY_USER_ID] = user;
		// 日付をセット
		jsonArray[KEY_DATE] = date;
		// 取得対象の項目名をセット
		jsonArray[KEY_INDEX_NAME] = getTitle;
		
		// JSON連想配列を用いてDBの値を取得する
		thisElem.getJsonData(PATH_CREATE_BEFORE_CONTENT, jsonArray, STR_READ);
		// JSONの長さを取得
		jsonLen = thisElem.json.length;
		// jsonが取得出来ているか、および取得したテキストの内容が空白でないか検証する
		if(thisElem.json !== null && thisElem.json !== undefined && jsonLen !== 0 && thisElem.json[0][KEY_MAIN_TEXT] != "") {
			// 対象のテキストエリアに取得した値をセットする
			$(selector).parent().children(SELECTOR_MAIN_TEXT).val(thisElem.json[0][KEY_MAIN_TEXT]);
		} else {
			// 取得出来ていない旨のメッセージを表示する
			thisElem.openWarnigDialog(MESSAGE_NOT_BEFORE_CONTENT);
		}
	}
	
	/**
	 * 関数名：	getTodayResult
	 * 概要：		当日の結果から値を取得する
	 * 引数：		selector	押下されたボタンのセレクタ
	 * 戻り値：	なし
	 * 作成日：	2016/11/23
	 * 作成者：	k.urabe
	 */
	this.getTodayResult = function(selector, thisElem) {
		
		var getText;			// 取得したテキストを保持するための変数
		var getTitle;			// 当該ボタンが取得したい見出し名を保持するための変数
		var getFlag = false;	// 値が取得できたかのflag（初期はfalse）
		
		// 押下されたボタンが取得したい見出し名を取得する
		getTitle = $(selector).parent().children(SELECTOR_GET_INDEX_NAME).val();
		
		// 各項目の塊があるblockAreaを走査する
		$(SELECTOR_PARENT_AREA).each(function(index) {
			// 取得した見出し名が一致し、かつそのblockAreaの内容が空白でないか判定する
			if($(this).children(SELECTOR_INDEX_AREA).val() == getTitle && !($(this).children(SELECTOR_MAIN_TEXT).val() == "")) {
				// 対象項目の内容をボタンが押下されたblockの内容にコピーする
				$(selector).parent().children(SELECTOR_MAIN_TEXT).val($(this).children(SELECTOR_MAIN_TEXT).val());
				// 値が取得出来たことを示すフラグを有効にする
				getFlag = true;
				// jQueryのeachを抜ける
				return false;
			}

		});
		// 値が取得できたか検証する
		if(!getFlag) {
			// 値が取得出来なかった旨のメッセージを出力する
			thisElem.openWarnigDialog(MESSAGE_NOT_TODAY_CONTENT);
		}
		
		// 当日の結果からテキストを取得してセットする
		//getText = $(selector).parent(SELECTOR_MAIN).children(SELECTOR_INDEX_AREA).next(SELECTOR_MAIN_TEXT).val();
		// 押されたボタンが管理するテキストエリアに、取得した値をセットする
		//$(selector).prev(SELECTOR_MAIN_TEXT).val(getText);

	}
	
	/**
	 * 関数名：	deleteIndex
	 * 概要：		見出し削除ボタンから呼ばれる処理内容
	 * 引数：		selector	押下されたボタンのセレクタ
	 * 戻り値：	なし
	 * 作成日：	2016/11/23
	 * 作成者：	k.urabe
	 */
	this.deleteIndex = function(selector, thisElem) {
		
		// 対象の見出しエリアが空白か検証する
		if(thisElem.isCheckDeleteItem(selector)) {
			// 対象の見出しエリアを削除
			thisElem.deleteIndexDetail(selector, thisElem);
		// 対象の見出しエリアが空白ではなかった。
		} else {
			// 空白でないエリアがあるため、確認ダイアログを開く
			thisElem.openConfirmationDialog(selector, thisElem, null, null, thisElem.deleteIndexDetail, MESSAGE_DEL_INDEX);
		}
		
	}
	
	/**
	 * 関数名：	deleteIndexDetail
	 * 概要：		見出し削除ボタンから呼ばれる処理詳細内容
	 * 引数：		selector	押下されたボタンのセレクタ
	 * 戻り値：	なし
	 * 作成日：	2016/11/23
	 * 作成者：	k.urabe
	 */
	this.deleteIndexDetail = function(selector, thisElem) {
		
		// 対象の見出しエリアを削除
		$(selector).parent(SELECTOR_PARENT_AREA).remove();
		// 各見出しの番号を振り直す
		thisElem.changeIndexNumber();
		
	}
	
	/**
	 * 関数名：	addIndex
	 * 概要：		見出し追加ボタンから呼ばれる処理内容
	 * 引数：		selector	押下されたボタンのセレクタ
	 * 戻り値：	なし
	 * 作成日：	2016/11/23
	 * 作成者：	k.urabe
	 */
	this.addIndex = function(selector, thisElem) {
		
		// TODO:【未実装】タグの詳細はまだ詰められていない
		// 見出し項目が並ぶエリアの最後に見出し項目一式のタグをセットする
		$(SELECTOR_MAIN).append(TAG_REPORT_CREATE_WINDOW_INDEX);
		// 追加したボタンに対してボタンイベントを登録する
		thisElem.setClickEvent($(SELECTOR_PARENT_AREA_LAST).children(SELECTOR_B_DEL_INDEX), thisElem.deleteIndex);
		// 追加された固定ボタンを非表示にする
		$(SELECTOR_PARENT_AREA_LAST).children(SELECTOR_BUTTON_NAME).addClass(SRT_SHOW_HIDE);
		// ナンバーを振り直す
		thisElem.changeIndexNumber();
	}
	
	/**
	 * 関数名：	getDayContent
	 * 概要：		日付エリアの変更をバインドして処理を実行する
	 * 引数：		なし
	 * 戻り値：	なし
	 * 作成日：	2016/11/23
	 * 作成者：	k.urabe
	 */
	this.getDayContent = function() {
		
		// イベント内でthisオブジェクトを使用できるよう待避
		thisElem = this;
		
		// 日付選択エリアをチェンジイベントでバインドする
		$(SELECTOR_REPORT_DATE).on(CHANGE, function() {
			
			var jsonArray = {};			// リクエストに使用するjson連想配列を作成する
			var user;					// ユーザ識別の値を格納するための変数
			var date;					// 当該日の日付を格納するための変数（前日までの検索はサーバ側で行う。ここでは当該日をとる）
			var jsonLen;				// jsonの長さを取得する
			//var content_id;				// 当該日報のコンテンツIDを格納するための変数
			
			// TODO:【セレクタ】画面にセットするユーザ識別子が未定のため、現状はuser_idをセット
			// ユーザ識別の値を取得する
			user = $(SELECTOR_USER_ID).text();
			// 当該日の日付を取得する
			date = $(SELECTOR_REPORT_DATE).val();
			// TODO:【セレクタ】コンテンツIDはページ内に埋め込まれていなければサーバへのリクエストに含まない方がよい？
			// 当該コンテンツIDを取得する
			//content_id = $(SELECTOR_CONTENT_ID).text();
			
			// リクエスト用JSON連想配列に追加する
			// ユーザIDをセット
			jsonArray[KEY_USER_ID] = user;
			// 日付をセット
			jsonArray[KEY_DATE] = date;
			// 登録様式を日報でセット
			jsonArray[KEY_ENTRY_FORMAT] = FLAG_ENTRY_FORMAT_REPORT;
			// コンテンツIDをセット
			//jsonArray[KEY_CONTENT_ID] = content_id;

			// JSON連想配列を用いてDBの値を取得する
			thisElem.getJsonData(PATH_CREATE_BY_DAY, jsonArray, STR_READ);

			// 見出しエリアをすべて削除する
			$(SELECTOR_PARENT_AREA).remove();
			// 画面内の所定の位置（コンテンツID）に空白文字を埋める
			$(SELECTOR_CONTENT_ID).text("");
			// 画面内の所定の位置（テンプレート用コンテンツID）に空白文字を埋める
			$(SELECTOR_TEMP_CONTENT_ID).text("");
			
			// jsonの長さを取得する
			jsonLen = thisElem.json.length;
			
			// jsonが取得出来ているか検証する
			if(thisElem.json !== null && thisElem.json !== undefined && jsonLen !== 0) {
				// 取得したJSONを展開する
				thisElem.createReportContent(SELECTOR_MAIN);
				// 画面内の所定の位置に取得したコンテンツIDを埋める
				$(SELECTOR_CONTENT_ID).text(thisElem.json[0][KEY_CONTENT_ID]);
			// 取得できなかった場合、テンプレートの取得を試みる
			} else {
				// 新たなリクエストを作成するためJSON連想配列を初期化する
				jsonArray = {};
				// リクエスト用JSON連想配列に追加する
				jsonArray[KEY_USER_ID] = user;
				// 様式をテンプレートでセット
				jsonArray[KEY_ENTRY_FORMAT] = FLAG_ENTRY_FORMAT_TEMPLATE;
				// 日付をセット（テンプレートは0000-00-00）
				jsonArray[KEY_DATE] = STR_DATE_TEMP;
				
				// JSON連想配列を用いてDBの値を取得する
				thisElem.getJsonData(PATH_CREATE_BY_DAY, jsonArray, STR_READ);
				
				// jsonの長さを取得する
				jsonLen = thisElem.json.length;
				
				// 紐付くデータが取得出来ているか検証する(messageが返ってきていないか)
				if(thisElem.json !== null && thisElem.json !== undefined && jsonLen !== 0) {
					// 取得したJSONを展開する
					thisElem.createReportContent(SELECTOR_MAIN);
					// 画面内の所定の位置に取得したコンテンツIDを埋める（テンプレート用）
					$(SELECTOR_TEMP_CONTENT_ID).text(thisElem.json[0][KEY_CONTENT_ID]);
				} 
					
			}
		});
		
	}
	
	/**
	 * 関数名：	saveFormat
	 * 概要：		フォーマットを登録する
	 * 引数：		selector	押下されたボタンのセレクタ
	 * 			thisElem	ボタンの中でthisオブジェクトを使うためのオブジェ
	 * 戻り値：	なし
	 * 作成日：	2016/11/23
	 * 作成者：	k.urabe
	 */
	this.saveFormat = function(selector, thisElem) {
		
		var jsonArray = {};			// リクエストに使用するjson連想配列を作成する
		
		// 見出しが1つでもあるか検証する
		if(thisElem.isCheckFormatIndex()) {
			// 見出しエリアの個数分走査する
			$(SELECTOR_PARENT_AREA).each(function(index) {
				
				// リクエスト用JSON連想配列に必要な値をセットする
				// ユーザIDをセット
				jsonArray[KEY_USER_ID] = $(SELECTOR_USER_ID).text();
				// 登録書式を日報のフラグでセット
				jsonArray[KEY_ENTRY_FORMAT] = FLAG_ENTRY_FORMAT_TEMPLATE;
				// 登録状態を登録済みでセット
				jsonArray[KEY_ENTRY_STATUS] = FLAG_ENTRY_STATUS_REG;
				// 当該日の日報日付を取得する
				jsonArray[KEY_DATE] = STR_DATE_TEMP;
				// 基底親コンテンツIDを取得してセット
				jsonArray[KEY_BASE_PARENT_CONTENT_ID] = $(SELECTOR_BASE_PARENT_CONTENT_ID).text();
				// 祖先コンテンツIDを取得してセットする
				jsonArray[KEY_GRAND_PARENT_CONTENT_ID] = $(SELECTOR_GRAND_PARENT_CONTENT_ID).text();
				// 親コンテンツIDを取得してセットする
				jsonArray[KEY_PARENT_CONTENT_ID] = $(SELECTOR_PARENT_CONTENT_ID).text();
				
				// TODO:【セレクタ】画面にセットするユーザ識別子が未定のため、現状はuser_idをセット
				// TODO:【セレクタ】fixed_item_idは、固定項目を使用している
				// リクエスト用JSON連想配列に必要な値をセットする
				// jsonArrayの所定インデックス内をオブジェクトで宣言
				jsonArray[index + 1] = {};
				// 見出し番号をセット
				jsonArray[index + 1][KEY_NUMBER] = $(this).children(SELECTOR_NUMBER).text();
				// 見出し文字をセット
				jsonArray[index + 1][KEY_INDEX_AREA] = $(this).children(SELECTOR_INDEX_AREA).val();
				// 本文をセット
				jsonArray[index + 1][KEY_MAIN_TEXT] = "";
				// 固定IDをセット
				jsonArray[index + 1][KEY_FIXED_ITEM_ID] = $(this).children(SELECTOR_FIXED_ITEM_ID).text();
			});
			
			
			// 当該コンテンツIDを取得する
			var content_id = $(SELECTOR_TEMP_CONTENT_ID).text();
			// 画面内にコンテンツIDがあるか検証(存在するなら更新リクエスト)
			if(content_id != "") {
				jsonArray[KEY_CONTENT_ID] = content_id;
				// JSON連想配列を用いてDBに値を更新する
				thisElem.getJsonData(PATH_CREATE_SAVE_TEMPLATE, jsonArray, STR_UPDATE);
			} else {
				// JSON連想配列を用いてDBに値を登録する
				thisElem.getJsonData(PATH_CREATE_SAVE_TEMPLATE, jsonArray, STR_CREATE);
			}
			
			// 自分を閉じる
			thisElem.closeWindow();
			
		} else {
			// 見出しが1つもないため登録できない旨を表示する
			alert(MESSAGE_FORMAT_ERROR);
		}
		
	}
	
	/**
	 * 関数名：	saveReport
	 * 概要：		日報を登録する
	 * 引数：		selector	押下されたボタンのセレクタ
	 * 			thisElem	ボタンの中でthisオブジェクトを使うためのオブジェ
	 * 戻り値：	なし
	 * 作成日：	2016/11/23
	 * 作成者：	k.urabe
	 */
	this.saveReport = function(selector, thisElem) {
		
		var jsonArray = {};								// リクエストに使用するjson連想配列を作成する
		var draftBox = FLAG_ENTRY_STATUS_REG;			// 下書チェックの結果。登録状態をどうするかを格納する。初期値は登録済みとなる
		
		// 下書チェックボックスにチャックが付いているか
		if(thisElem.isCheckDraftBox()) {
			draftBox = FLAG_ENTRY_STATUS_NOTE;
		}
		
		// 見出しが1つでもあるか、空白エリアはないか、もしくは下書きにチェックが入っているか検証する
		if((thisElem.isCheckFormatIndex() && thisElem.isCheckTextArea()) || (draftBox & FLAG_ENTRY_STATUS_NOTE)) {
			
			// リクエスト用JSON連想配列に必要な値をセットする
			// ユーザIDをセット
			jsonArray[KEY_USER_ID] = $(SELECTOR_USER_ID).text();
			// 登録書式を日報のフラグでセット
			jsonArray[KEY_ENTRY_FORMAT] = FLAG_ENTRY_FORMAT_REPORT;
			// 登録状態を登録済み OR 下書でセット
			jsonArray[KEY_ENTRY_STATUS] = draftBox;
			// 当該日の日報日付を取得する
			jsonArray[KEY_DATE] = $(SELECTOR_REPORT_DATE).val();
			// 基底親コンテンツIDを取得してセット
			jsonArray[KEY_BASE_PARENT_CONTENT_ID] = $(SELECTOR_BASE_PARENT_CONTENT_ID).text();
			// 祖先コンテンツIDを取得してセットする
			jsonArray[KEY_GRAND_PARENT_CONTENT_ID] = $(SELECTOR_GRAND_PARENT_CONTENT_ID).text();
			// 親コンテンツIDを取得してセットする
			jsonArray[KEY_PARENT_CONTENT_ID] = $(SELECTOR_PARENT_CONTENT_ID).text();
			
			// 見出しエリアの個数分走査する
			$(SELECTOR_PARENT_AREA).each(function(index) {
				// TODO:【セレクタ】画面にセットするユーザ識別子が未定のため、現状はuser_idをセット
				// TODO:【セレクタ】fixed_item_idは、固定項目を使用している
				// リクエスト用JSON連想配列に必要な値をセットする
				// jsonArrayの所定インデックス内をオブジェクトで宣言
				jsonArray[index + 1] = {};
				// 行番号をセット
				jsonArray[index + 1][KEY_NUMBER] = $(this).children(SELECTOR_NUMBER).text();
				// 見出し文字をセット
				jsonArray[index + 1][KEY_INDEX_AREA] = $(this).children(SELECTOR_INDEX_AREA).val();
				// 本文をセット
				jsonArray[index + 1][KEY_MAIN_TEXT] = $(this).children(SELECTOR_MAIN_TEXT).val();
				// 固定IDをセット
				jsonArray[index + 1][KEY_FIXED_ITEM_ID] = $(this).children(SELECTOR_FIXED_ITEM_ID).text();
			});
			
			// 当該コンテンツIDを取得する
			var content_id = $(SELECTOR_CONTENT_ID).text();
			// 画面内にコンテンツIDがあるか検証(存在するなら更新リクエスト)
			if(content_id != "") {
				jsonArray[KEY_CONTENT_ID] = content_id;
				// JSON連想配列を用いてDBに値を更新する
				thisElem.getJsonData(PATH_CREATE_SAVE_CONTENT, jsonArray, STR_UPDATE);
			} else {
				// JSON連想配列を用いてDBに値を登録する
				thisElem.getJsonData(PATH_CREATE_SAVE_CONTENT, jsonArray, STR_CREATE);
			}
			
			// 自分を閉じる
			thisElem.closeWindow();
			
		} else {
			// 登録できない旨を表示する
			alert(MESSAGE_REPORT_ERROR);
		}

	}
	
	/**
	 * 関数名：	saveComment
	 * 概要：		コメントを登録する
	 * 引数：		selector	押下されたボタンのセレクタ
	 * 			thisElem	ボタンの中でthisオブジェクトを使うためのオブジェ
	 * 戻り値：	なし
	 * 作成日：	2016/11/23
	 * 作成者：	k.urabe
	 */
	// TODO:【未実装】saveReportと統合予定
	this.saveComment = function(selector, thisElem) {
		
		var jsonArray = {};			// リクエストに使用するjson連想配列を作成する
		
		// 見出しが1つでもあるか、空白エリアはないか検証する
		if(thisElem.isCheckFormatIndex() && thisElem.isCheckTextArea()) {
			
			// ユーザIDをセット
			jsonArray[KEY_USER_ID] = $(SELECTOR_LOGIN_ID).text();
			// 登録書式をコメントのフラグでセット
			jsonArray[KEY_ENTRY_FORMAT] = FLAG_ENTRY_FORMAT_COMMENT;
			// 登録状態を登録済みでセット
			jsonArray[KEY_ENTRY_STATUS] = FLAG_ENTRY_STATUS_REG;
			// 当該日の日報日付を取得する
			jsonArray[KEY_DATE] = $(SELECTOR_REPORT_DATE).text();
			// 基底親コンテンツIDを取得してセット
			jsonArray[KEY_BASE_PARENT_CONTENT_ID] = $(SELECTOR_BASE_PARENT_CONTENT_ID).text();
			// 祖先コンテンツIDを取得してセットする
			jsonArray[KEY_GRAND_PARENT_CONTENT_ID] = $(SELECTOR_GRAND_PARENT_CONTENT_ID).text();
			// 親コンテンツIDを取得してセットする
			jsonArray[KEY_PARENT_CONTENT_ID] = $(SELECTOR_PARENT_CONTENT_ID).text();
			
			// 見出しエリアの個数分走査する
			$(SELECTOR_PARENT_AREA).each(function(index) {
				// TODO:【セレクタ】画面にセットするユーザ識別子が未定のため、現状はuser_idをセット
				// TODO:【セレクタ】fixed_item_idは、固定項目を使用している
				// リクエスト用JSON連想配列に必要な値をセットする
				// jsonArrayの所定インデックス内をオブジェクトで宣言
				jsonArray[index + 1] = {};
				// 見出し番号をセット
				jsonArray[index + 1][KEY_NUMBER] = $(this).children(SELECTOR_MAIN).children(SELECTOR_NUMBER).text();
				// 見出し文字をセット
				jsonArray[index + 1][KEY_INDEX_AREA] = $(this).children(SELECTOR_MAIN).children(SELECTOR_INDEX_AREA).val();
				// 本文をセット
				jsonArray[index + 1][KEY_MAIN_TEXT] = $(this).children(SELECTOR_MAIN).children(SELECTOR_MAIN_TEXT).val();
				// 固定IDをセット
				//jsonArray[index + 1][KEY_FIXED_ITEM_ID] = $(this).children().children(SELECTOR_FIXED_ITEM_ID).text();
			});
			
			// 当該コンテンツIDを取得する
			var content_id = $(SELECTOR_CONTENT_ID).text();
			// 画面内にコンテンツIDがあるか検証(存在するなら更新リクエスト)
			if(content_id != "") {
				// リクエスト用JSON連想配列にコンテンツIDをセットする
				jsonArray[KEY_CONTENT_ID] = content_id;
				// JSON連想配列を用いてDBに値を更新する
				thisElem.getJsonData(PATH_CREATE_SAVE_CONTENT, jsonArray, STR_UPDATE);
			} else {
				// JSON連想配列を用いてDBに値を登録する
				thisElem.getJsonData(PATH_CREATE_SAVE_CONTENT, jsonArray, STR_CREATE);
			}
			
			// 自分と親画面（あれば）を閉じる
			// 親が2ついるか検証（直近の親のみ閉じる）
			if(thisElem.parentWindow.parentWindowDate) {
				// 親を閉じる
				thisElem.parentWindow.close();
			}
			// 自分を閉じる
			thisElem.closeWindow();
			
		} else {
			// 登録できない旨を表示する
			alert(MESSAGE_COMMENT_ERROR);
		}

	}
	
	/**
	 * 関数名：	isCheckFormatIndex
	 * 概要：		見出し項目が1つ以上あるかチェックする（主として日報報告で使用）
	 * 引数：		なし
	 * 戻り値：	なし
	 * 作成日：	2016/11/23
	 * 作成者：	k.urabe
	 */
	this.isCheckFormatIndex = function() {
		
		var returnBoolean = false;		// 返却用の変数に初期値としてfalseを格納する
		
		// 画面内の見出し項目が1つ以上あるか検証
		if(1 <= $(SELECTOR_INDEX_AREA).length) {
			// 見出し項目が存在するため、trueをセット
			returnBoolean = true;
		}
		
		// 判定結果を返す
		return returnBoolean;
		
	}
	
	/**
	 * 関数名：	fixdButtonEvent
	 * 概要：		日報作成画面の固定項目ボタンに対して、表示・非表示の設定や、イベントの登録を行う
	 * 引数：		selector		
	 * 戻り値：	なし
	 * 作成日：	2016/12/06
	 * 作成者：	k.urabe
	 */
	this.fixdButtonEvent = function(selector) {
		
		var item_status;			// ステータス取得して保持する変数
		var button_function;		// ボタンに対する関数を取得して保持する変数
		
		// 対象エリア内の固定アイテムの状態を取得する
		item_status = $(selector).children(SELECTOR_ITEM_STATUS).text();
		
		// 固定アイテムのステータスが削除済みであるか検証する
		if(item_status & FLAG_ITEM_STATUS_DEL) {
			// 固定機能ボタンを非表示にする
			$(selector).children(SELECTOR_BUTTON_NAME).addClass(SRT_SHOW_HIDE);
		} else {
			// 登録済みかつロック対象か検証する
			if(item_status == FLAG_ITEM_STATUS_REG_LOCK) {
				// 見出し削除ボタンを非表示にする
				$(selector).children(SELECTOR_B_DEL_INDEX).addClass(SRT_SHOW_HIDE);
				// 見出し文字を編集不可にする
				$(selector).children(SELECTOR_INDEX_AREA).prop("disabled", true);
			}
			// 対象エリア内の固定アイテムの対象関数を取得する
			button_function = button_function = $(selector).children(SELECTOR_BUTTON_FUNCTION).text();
			// 対象の関数を取得してボタンイベントを登録する
			this.setClickEvent($(selector).children(SELECTOR_BUTTON_NAME), this.fixdButtonFunction(button_function));
			
		}
		
	}
	
	/**
	 *  関数名：	fixdButtonFunction
	 * 概要：		日報作成画面の固定項目の機能に合わせた関数を返す
	 * 引数：		button_function
	 * 戻り値：	なし
	 * 作成日：	2016/12/06
	 * 作成者：	k.urabe
	 */
	this.fixdButtonFunction = function(buttonFunction) {
		var returnFunction;			// 返却する関数を格納する変数
		
		// 受け取った機能に合わせた関数を返す
		switch(buttonFunction) {
			case FLAG_BUTTON_FUNCTION_BEFOR_PLAN:
				//returnFunction = STR_GET_BEFORE_PLAN;
				returnFunction = this.getBeforePlan;
				break;
			case FLAG_BUTTON_FUNCTION_TODAY_RESULT:
				//returnFunction = STR_GET_TODAY_RESULT;
				returnFunction = this.getTodayResult;
				break;
		}
		
		// 決定した関数を返す
		return returnFunction;
	}
	
	/**
	 * 関数名：	getChangeParentItem
	 * 概要：		親画面の指定したセレクタの値が変わった際に、その値を取得、設定する
	 * 引数：		targetButton	イベントをバインドするボタン
	 * 			targetSelector	親から値を取得して変更したいセレクタ
	 * 			getParentSelector	値を取得する親のセレクタ
	 * 戻り値：	なし
	 * 作成日：	2016/12/11
	 * 作成者：	k.urabe
	 */
	this.getChangeParentItem = function(targetButton, targetSelector, getParentSelector) {
		
		// コールバックの中でthisを使用できるよう待避
		thisElem = this;
		// clickイベントバインドして親の画面から所定の値を取得する
		$(targetButton).on(CLICK, function() {
				$(targetSelector).text(thisElem.parentWindow.$(parentWindowDate).children(getParentSelector).text());

		});
		
	}
	
	/**
	 * 関数名：	createReportWindow
	 * 概要：		レポート作成画面を開いた時の処理
	 * 引数：		なし
	 * 戻り値：	なし
	 * 作成日：	2016/11/24
	 * 作成者：	k.urabe
	 */
	this.createReportWindow = function() {
		var jsonArray = {};			// リクエストに使用するjson連想配列を作成する
		
		// TODO:【メモ】共通ボタンは初期表示のHTMLに展開されている想定
		// 画面共通のボタンイベント等を登録する
		// 見出し追加ボタンを登録する
		this.setClickEvent(SELECTOR_B_ADD_INDEX, this.addIndex, null , null);
		// フォーマット保存ボタンを登録する
		this.setClickEvent(SELECTOR_B_ADD_TEMPLATE, this.saveFormat, null, SELECTOR_MAIN);
		// 報告ボタンを登録する
		this.setClickEvent(SELECTOR_B_ADD_REPORT, this.saveReport, null, SELECTOR_MAIN);
		// キャンセルボタンを登録する
		this.setClickEvent(SELECTOR_B_CANCEL, this.closeWindow);
		// 日付エリアのイベントを登録する
		this.getDayContent();
		
		// 親の画面に押下されたボタンを判定する(新規日報なのか、編集なのか)
		// 編集なのか判定する
		if(parentWindowButton == KEY_B_EDIT) {
			// 親画面から取得した日報報告日をセットする(新規日報の場合の当日日付は、デフォルトでサーバから取得してセットしてい)
			$(SELECTOR_REPORT_DATE).val(this.parentWindow.$(parentWindowDate).children(SELECTOR_REPORT_DATE).text());
			
			// ログインユーザが管理者権限を有しているか検証する（管理人の場合は、当該日報の編集に限定する）
			if(this.getUserAuth() == STR_SUCCESS) {
				// 所定のユーザIDに日報の報告者のIDをセットする
				$(SELECTOR_USER_ID).text(this.parentWindow.$(parentWindowDate).children(SELECTOR_USER_ID).text());
				// 日報報告日を非活性化し、編集できないようにする
				$(SELECTOR_REPORT_DATE).prop(KEY_DISABLED, true);
			}
			
		}
		
		// チェンジイベントを発生させ、セットした日付に紐付くデータがあれば取得・展開する
		$(SELECTOR_REPORT_DATE).change();
		
		// 画面を表示する
		$("body").css("visibility", "visible");
		
	}
	
	/**
	 * 関数名：	createCommentWindow
	 * 概要：		コメント作成画面を開いた時の処理
	 * 引数：		なし
	 * 戻り値：	なし
	 * 作成日：	2016/11/24
	 * 作成者：	k.urabe
	 */
	this.createCommentWindow = function() {
		var jsonArray = {};			// リクエストに使用するjson連想配列を作成する
		var title = "";				// ページのタイトルを格納する変数
		
		// TODO:【メモ】共通ボタンは初期表示のHTMLに展開されている想定
		// 画面共通のボタンイベント等を登録する
		// コメントボタンを登録する
		this.setClickEvent(SELECTOR_B_NEW_COMMENT, this.saveComment, null, SELECTOR_PARENT_AREA);
		// キャンセルボタンを登録する
		this.setClickEvent(SELECTOR_B_CANCEL, this.closeWindow);
		
		// 親から取得した各値を画面にセットしていく（一部、押下されてボタンにより設定箇所が変化）
		// ここでいうユーザIDとユーザネームはログインユーザとは限らず、コメント使用としているコンテンツの持ち主の値が入る。ログインユーザは.login_idにある
		$(SELECTOR_USER_ID).text(this.parentWindow.$(parentWindowDate).children(SELECTOR_USER_ID).text());
		$(SELECTOR_USER_NAME).text(this.parentWindow.$(parentWindowDate).children(SELECTOR_USER_NAME).text());
		$(SELECTOR_BASE_PARENT_CONTENT_ID).text(this.parentWindow.$(parentWindowDate).children(SELECTOR_BASE_PARENT_CONTENT_ID).text());
		$(SELECTOR_ENTRY_FORMAT).text(this.parentWindow.$(parentWindowDate).children(SELECTOR_ENTRY_FORMAT).text());
		
		// 親の画面に押下されたボタンを判定する(新規コメントなのか、編集なのか)
		// 新規コメントなのか判定する
		if(parentWindowButton == KEY_B_NEW_COMMENT) {
			// 新規日報にあたり、本日日付を取得するためのdateオブジェクトを取得する
			var today = new Date();
			
			// 新規コメントなので、親のIDを1つずつ移動し、コンテンツIDは空とする。日付は当日とする
			$(SELECTOR_GRAND_PARENT_CONTENT_ID).text(this.parentWindow.$(parentWindowDate).children(SELECTOR_PARENT_CONTENT_ID).text());
			$(SELECTOR_PARENT_CONTENT_ID).text(this.parentWindow.$(parentWindowDate).children(SELECTOR_CONTENT_ID).text());
			$(SELECTOR_CONTENT_ID).text("");
			$(SELECTOR_MAIN_TEXT).text("");
			$(SELECTOR_REPORT_DATE).text(today.getFullYear() + STR_TIME_SEPARATOR + (today.getMonth() + 1) + STR_TIME_SEPARATOR + today.getDate());
			// 取得したコンテンツIDが0か検証する（0とは日報に対するコメントであり、ここでコンテンツIDをベースコンテンツIDに埋める）
			if(this.parentWindow.$(parentWindowDate).children(SELECTOR_BASE_PARENT_CONTENT_ID).text() == 0) {
				// 日報に対するコメントであったため、ベースコンテンツIDに取得したコンテンツIDをセットする
				$(SELECTOR_BASE_PARENT_CONTENT_ID).text(this.parentWindow.$(parentWindowDate).children(SELECTOR_CONTENT_ID).text());
			}
			
		// 編集なのか判定する
		} else if(parentWindowButton == KEY_B_COMMENT_EDIT) {
			// 編集コメントなので、IDはずらさずにそのままにする。日付も既に報告している日付とする
			$(SELECTOR_GRAND_PARENT_CONTENT_ID).text(this.parentWindow.$(parentWindowDate).children(SELECTOR_GRAND_PARENT_CONTENT_ID).text());
			$(SELECTOR_PARENT_CONTENT_ID).text(this.parentWindow.$(parentWindowDate).children(SELECTOR_PARENT_CONTENT_ID).text());
			$(SELECTOR_CONTENT_ID).text(this.parentWindow.$(parentWindowDate).children(SELECTOR_CONTENT_ID).text());
			$(SELECTOR_MAIN_TEXT).text(this.parentWindow.$(parentWindowDate).children(SELECTOR_MAIN_TEXT).text());
			$(SELECTOR_REPORT_DATE).text(this.parentWindow.$(parentWindowDate).children(SELECTOR_REPORT_DATE).text());
		}
		
		// 取得した各値でページのタイトルを作成し、セットする
		// 日付を連結する
		title += this.parentWindow.$(parentWindowDate).children(SELECTOR_REPORT_DATE).text() + MARK_SPACE;
		// ユーザの名前を連結する
		title += $(SELECTOR_USER_NAME).text() + STR_TITLES;
		// コンテンツの種類を連結する
		title += $(SELECTOR_ENTRY_FORMAT).text() == FLAG_ENTRY_FORMAT_REPORT ? STR_REPORT_COMMENT : STR_COMMENT_COMMENT;
		// 作成したタイトルをセットする
		$(SELECTOR_SEND_TO).text(title);
		
		// 画面を表示する
		$("body").css("visibility", "visible");
		
	}
	
	/**
	 * 関数名：	viewCommentWindow
	 * 概要：		コメント詳細画面を開いた時の処理
	 * 引数：		なし
	 * 戻り値：	なし
	 * 作成日：	2016/11/24
	 * 作成者：	k.urabe
	 */
	this.viewCommentWindow = function() {
		var jsonArray = {};			// リクエストに使用するjson連想配列を作成する

		// 親ウインドウの各値を自分にセットする
		$(SELECTOR_USER_ID).text(this.parentWindow.$(parentWindowDate).children(SELECTOR_USER_ID).text());
		$(SELECTOR_BASE_PARENT_CONTENT_ID).text(this.parentWindow.$(parentWindowDate).children(SELECTOR_BASE_PARENT_CONTENT_ID).text());
		$(SELECTOR_GRAND_PARENT_CONTENT_ID).text(this.parentWindow.$(parentWindowDate).children(SELECTOR_GRAND_PARENT_CONTENT_ID).text());
		$(SELECTOR_PARENT_CONTENT_ID).text(this.parentWindow.$(parentWindowDate).children(SELECTOR_PARENT_CONTENT_ID).text());
		$(SELECTOR_CONTENT_ID).text(this.parentWindow.$(parentWindowDate).children(SELECTOR_CONTENT_ID).text());
		$(SELECTOR_FAVORITE_COUNT).text(this.parentWindow.$(parentWindowDate).children(SELECTOR_FAVORITE_COUNT).text());
		$(SELECTOR_NONE_FAVORITE_COUNT).text(this.parentWindow.$(parentWindowDate).children(SELECTOR_NONE_FAVORITE_COUNT).text());
		$(SELECTOR_READ_COUNT).text(this.parentWindow.$(parentWindowDate).children(SELECTOR_READ_COUNT).text());
		$(SELECTOR_MAIN_TEXT).text(this.parentWindow.$(parentWindowDate).children(SELECTOR_MAIN_TEXT).text());
		$(SELECTOR_USER_NAME).text(this.parentWindow.$(parentWindowDate).children(SELECTOR_USER_NAME).text());
		$(SELECTOR_REPORT_DATE).text(this.parentWindow.$(parentWindowDate).children(SELECTOR_REPORT_DATE).text());
		$(SELECTOR_ENTRY_FORMAT).text(this.parentWindow.$(parentWindowDate).children(SELECTOR_ENTRY_FORMAT).text());
		
		// TODO:【未実装】ログインユーザは所定の位置（'.user_id'）に埋め込んでいる想定だが、開かれたコメントの投稿ユーザは取得したJSONデータから取得する必要がある
		// TODO:【未実装】JSONの結果はコメントなので1件しかないが、行ごとに結果が格納されてくる想定で記述
		// ログインユーザとコメントの投稿者が同一人物か検証する もしくは管理者権限を有している
		if($(SELECTOR_USER_ID).text() == $(SELECTOR_LOGIN_ID).text() || this.getUserAuth() == STR_SUCCESS) {
			// TODO:【メモ】画面表示時には画面のボタンが全て揃っている想定。そこからユーザ種別ごとにボタンイベント登録と、非表示設定を行う
			// 本人用のボタンイベントを登録する
			
			// 編集ボタンのイベントを登録する
			this.setClickEvent(SELECTOR_B_COMMENT_EDIT, this.prepareAnotherWindow, null, this.parentWindow.$(parentWindowDate));
			// 削除ボタンのイベントを登録する
			//this.setClickEvent(SELECTOR_B_DELETE, this.clickDeleteButton);
			this.setClickEvent(SELECTOR_B_DELETE, this.clickDeleteButton, null, this.parentWindow.$(parentWindowDate), MESSAGE_COMMENT_DELETE);
			
			// TODO:【未実装】ボタンの非表示は、クラス名に追加付与して、その名称をcssで指定することにより変更する
			// 不要なボタンを非表示にする。
			// 未読にするボタンを非表示にする
			$(SELECTOR_B_NO_READ).addClass(SRT_SHOW_HIDE);
			// いいねボタンを非表示にする。
			$(SELECTOR_B_FAVORITE).addClass(SRT_SHOW_HIDE);
			// わるいねボタンを非表示にする。
			$(SELECTOR_B_NONE_FAVORITE).addClass(SRT_SHOW_HIDE);
			
			
		} else {
			// TODO:【メモ】画面表示時には画面のボタンが全て揃っている想定。そこからユーザ種別ごとにボタンイベント登録と、非表示設定を行う
			// 他人用のボタンイベントを登録する
			// 未読にするボタンのイベントを登録する
			this.setClickEvent(SELECTOR_B_NO_READ, this.clickAddContentButton, null, this.parentWindow.$(parentWindowDate), MESSAGE_COMMENT_NOREAD);
			// いいねボタンのイベントを登録する
			this.setClickEvent(SELECTOR_B_FAVORITE, this.clickAddContentButton, null, this.parentWindow.$(parentWindowDate));
			// ユーザいいねをした状態であればクラス名にフラグ名を追加する
			this.changeButtonStatus($(SELECTOR_B_FAVORITE), $(SELECTOR_B_FAVORITE).val(), $(parentWindowDate).children(SELECTOR_FAVARITE_STATUS).text());
			// わるいねボタンのイベントを登録する
			this.setClickEvent(SELECTOR_B_NONE_FAVORITE, this.clickAddContentButton, null, this.parentWindow.$(parentWindowDate));
			// ユーザわるいねをした状態であればクラス名にフラグ名を追加する
			this.changeButtonStatus($(SELECTOR_B_NONE_FAVORITE), $(SELECTOR_B_NONE_FAVORITE).val(), $(parentWindowDate).children(SELECTOR_NONE_FAVARITE_STATUS).text());

			
			// 未読にするボタンのイベント後に、親の所定位置から値を取得するようにする。
			this.getChangeParentItem(SELECTOR_B_NO_READ, SELECTOR_READ_COUNT, SELECTOR_READ_COUNT);
			// いいねボタンのイベント後に、親の所定位置から値を取得するようにする。
			this.getChangeParentItem(SELECTOR_B_FAVORITE, SELECTOR_FAVORITE_COUNT, SELECTOR_FAVORITE_COUNT);

			// わるいねボタンのイベント後に、親の所定位置から値を取得するようにする。
			this.getChangeParentItem(SELECTOR_B_NONE_FAVORITE, SELECTOR_NONE_FAVORITE_COUNT, SELECTOR_NONE_FAVORITE_COUNT);

			// 不要なボタンを非表示にする。
			// 編集ボタンを非表示にする
			$(SELECTOR_B_COMMENT_EDIT).addClass(SRT_SHOW_HIDE);
			// 削除ボタンを非表示にする。
			$(SELECTOR_B_DELETE).addClass(SRT_SHOW_HIDE);
		}
		// TODO:【メモ】画面設計上、ボタン名は閉じるだが、他画面との兼ね合い上、クラス名はキャンセルボタンのものを指定する想定
		// 共通のキャンセルボタンを登録する
		this.setClickEvent(SELECTOR_B_CANCEL, this.closeWindow);
		// コメントするボタンのイベントを登録する
		this.setClickEvent(SELECTOR_B_NEW_COMMENT, this.prepareAnotherWindow, null, this.parentWindow.$(parentWindowDate));
		
		// 画面を表示する
		$("body").css("visibility", "visible");		
	}
	
}

CreateWindowsDetail.prototype = new WindowDesign();
//サブクラスのコンストラクタを有効にする
CreateWindowsDetail.prototype.constructor = WindowDesign;
