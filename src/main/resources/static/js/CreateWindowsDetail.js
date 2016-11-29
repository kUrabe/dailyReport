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
		if($_parentArea.children(SELECTOR_INDEX_AREA).text() == "" && $_parentArea.children(SELECTOR_MAIN_TEXT).text() == "") {
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
			if($(this).text() == "") {
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
	// TODO:【未実装】取得失敗した際のメッセージが未実装
	this.getBeforePlan = function(selector) {
		
		var jsonArray = {};			// リクエストに使用するjson連想配列を作成する
		var user;					// ユーザ識別の値を格納するための変数
		var date;					// 当該日の日付を格納するための変数（前日までの検索はサーバ側で行う。ここでは当該日をとる）
		
		// TODO:【セレクタ】画面にセットするユーザ識別子が未定のため、現状はuser_idをセット
		// ユーザ識別の値を取得する
		user = $(SELECTOR_USER_ID).text();
		// 当該日の日付を取得する
		date = $(SELECTOR_REPORT_DATE).text();
		
		// リクエスト用JSON連想配列に追加する
		// ユーザIDをセット
		jsonArray[KEY_USER_ID] = user;
		// 日付をセット
		jsonArray[KEY_DATE] = date;
		// 取得対象の項目名をセット
		jsonArray[KEY_INDEX_NAME] = STR_PLAN;
		
		// JSON連想配列を用いてDBの値を取得する
		this.getJsonData(PATH_CREATE_BEFORE_CONTENT, jsonArray, STR_READ);
		
		// 対象のテキストエリアに取得した値をセットする
		$(selector).parent(SELECTOR_PARENT_AREA).children(SELECTOR_MAIN_TEXT).text(this.json[KEY_MAIN_TEXT]);
		
	}
	
	/**
	 * 関数名：	getTodayResult
	 * 概要：		当日の結果から値を取得する
	 * 引数：		selector	押下されたボタンのセレクタ
	 * 戻り値：	なし
	 * 作成日：	2016/11/23
	 * 作成者：	k.urabe
	 */
	// TODO:【未実装】取得失敗した際のメッセージが未実装
	this.getTodayResult = function(selector) {
		
		var getText;			// 取得したテキストを保持するための変数

		// 当日の結果からテキストを取得してセットする
		getText = $(selector).parent(SELECTOR_MAIN).children(SELECTOR_INDEX_AREA).next(SELECTOR_MAIN_TEXT).text();
		// 押されたボタンが管理するテキストエリアに、取得した値をセットする
		$(selector).prev(SELECTOR_MAIN_TEXT).text(getText);

	}
	
	/**
	 * 関数名：	deleteIndex
	 * 概要：		見出し削除ボタンから呼ばれる処理内容
	 * 引数：		selector	押下されたボタンのセレクタ
	 * 戻り値：	なし
	 * 作成日：	2016/11/23
	 * 作成者：	k.urabe
	 */
	this.deleteIndex = function(selector) {
		
		// 対象の見出しエリアが空白か検証する
		if(this.isCheckDeleteItem(selector)) {
			// 対象の見出しエリアを削除
			this.deleteIndexDetail(selector);
		// 対象の見出しエリアが空白ではなかった。
		} else {
			// 空白でないエリアがあるため、確認ダイアログを開く
			this.openConfirmationDialog(this.deleteIndexDetail, MESSAGE_DEL_INDEX, selector);
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
	this.deleteIndexDetail = function(selector) {
		
		// 対象の見出しエリアを削除
		$(selector).parent(SELECTOR_PARENT_AREA).remove();
		// 各見出しの番号を振り直す
		this.changeIndexNumber;
		
	}
	
	/**
	 * 関数名：	addIndex
	 * 概要：		見出し追加ボタンから呼ばれる処理内容
	 * 引数：		selector	押下されたボタンのセレクタ
	 * 戻り値：	なし
	 * 作成日：	2016/11/23
	 * 作成者：	k.urabe
	 */
	this.addIndex = function(selector) {
		
		// TODO:【未実装】タグの詳細はまだ詰められていない
		// 見出し項目が並ぶエリアの最後に見出し項目一式のタグをセットする
		$(SELECTOR_MAIN).append(TAG_REPORT_CREATE_WINDOW_INDEX);
		// 追加したボタンに対してボタンイベントを登録する
		setClickEvent($(SELECTOR_PARENT_AREA_LAST).children(SELECTOR_B_DEL_INDEX), this.deleteIndex);
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
		
		// 日付選択エリアをチェンジイベントでバインドする
		$(SELECTOR_REPORT_DATE).on(CHANGE, function() {
			
			var jsonArray = {};			// リクエストに使用するjson連想配列を作成する
			var user;					// ユーザ識別の値を格納するための変数
			var date;					// 当該日の日付を格納するための変数（前日までの検索はサーバ側で行う。ここでは当該日をとる）
			var content_id;				// 当該日報のコンテンツIDを格納するための変数
			
			// TODO:【セレクタ】画面にセットするユーザ識別子が未定のため、現状はuser_idをセット
			// ユーザ識別の値を取得する
			user = $(SELECTOR_USER_ID).text();
			// 当該日の日付を取得する
			date = $(SELECTOR_REPORT_DATE).text();
			// TODO:【セレクタ】コンテンツIDはページ内に埋め込まれていなければサーバへのリクエストに含まない方がよい？
			// 当該コンテンツIDを取得する
			content_id = $(SELECTOR_CONTENT_ID).text();
			
			// リクエスト用JSON連想配列に追加する
			// ユーザIDをセット
			jsonArray[KEY_USER_ID] = user;
			// 日付をセット
			jsonArray[KEY_DATE] = date;
			// コンテンツIDをセット
			jsonArray[KEY_CONTENT_ID] = content_id;
			
			// JSON連想配列を用いてDBの値を取得する
			this.getJsonData(PATH_CREATE_BY_DAY, jsonArray, STR_READ);

			// 見出しエリアをすべて削除する
			$(SELECTOR_PARENT_AREA).remove();
			// 紐付くデータが取得出来ているか検証する(messageが返ってきていないか)
			if(!this.json.hasOwnProperty(STR_MESSAGE)) {
				// 取得したJSONを展開する
				this.createReportDetail(SELECTOR_MAIN);
				// 画面内の所定の位置に取得したコンテンツIDを埋める
				$(SELECTOR_CONTENT_ID).text(this.json[KEY_CONTENT_ID]);
			// 取得できなかった場合、テンプレートの取得を試みる
			} else {
				// 新たなリクエストを作成するためJSON連想配列を初期化する
				jsonArray = {};
				// リクエスト用JSON連想配列に追加する
				jsonArray[KEY_USER_ID] = user;
				jsonArray[KEY_ENTRY_FORMAT] = FLAG_ENTRY_FORMAT_TEMPLATE;
				
				// JSON連想配列を用いてDBの値を取得する
				this.getJsonData(PATH_CREATE_BY_DAY, jsonArray, STR_READ);
				
				// 紐付くデータが取得出来ているか検証する(messageが返ってきていないか)
				if(!this.json.hasOwnProperty(STR_MESSAGE)) {
					// 取得したJSONを展開する
					this.createReportDetail(SELECTOR_MAIN);
				} 
				// 画面内の所定の位置（コンテンツID）に空白文字を埋める
				$(SELECTOR_CONTENT_ID).text("");	
			}
		});
		
	}
	
	/**
	 * 関数名：	saveFormat
	 * 概要：		フォーマットを登録する
	 * 引数：		なし
	 * 戻り値：	なし
	 * 作成日：	2016/11/23
	 * 作成者：	k.urabe
	 */
	this.saveFormat = function() {
		
		var jsonArray = {};			// リクエストに使用するjson連想配列を作成する
		
		// 見出しが1つでもあるか検証する
		if(this.isCheckFormatIndex()) {
			// 見出しエリアの個数分走査する
			$(SELECTOR_PARENT_AREA).each(function(index) {
				
				// リクエスト用JSON連想配列に必要な値をセットする
				// ユーザIDをセット
				jsonArray[KEY_USER_ID] = $(SELECTOR_USER_ID).text();
				// 登録書式を日報のフラグでセット
				jsonArray[KEY_ENTRY_FORMAT] = FLAG_ENTRY_FORMAT_TEMPLATE;
				// 登録状態を下書でセット
				jsonArray[KEY_ENTRY_STATUS] = FLAG_ENTRY_STATUS_NOTE;
				// 当該日の日報日付を取得する
				jsonArray[KEY_DATE] = "";
				// 基底親コンテンツIDを取得してセット
				jsonArray[KEY_BASE_PARENT_CONTENT_ID] = "";
				// 祖先コンテンツIDを取得してセットする
				jsonArray[KEY_GRAND_PARENT_CONTENT_ID] = "";
				// 親コンテンツIDを取得してセットする
				jsonArray[KEY_PARENT_CONTENT_ID] = "";
				
				// TODO:【セレクタ】画面にセットするユーザ識別子が未定のため、現状はuser_idをセット
				// TODO:【セレクタ】fixed_item_idは、固定項目を使用している
				// リクエスト用JSON連想配列に必要な値をセットする
				// 見出し番号をセット
				jsonArray[index + 1][KEY_NUMBER] = $(this).children(SELECTOR_NUMBER).text();
				// 見出し文字をセット
				jsonArray[index + 1][KEY_INDEX_AREA] = $(this).children(SELECTOR_INDEX_AREA).text();
				// 本文をセット
				jsonArray[index + 1][KEY_MAIN_TEXT] = "";
				// 固定IDをセット
				jsonArray[index + 1][KEY_FIXED_ITEM_ID] = $(this).children(SELECTOR_FIXED_ITEM_ID).text();
			});
		} else {
			// 見出しが1つもないため登録できない旨を表示する
			alert(MESSAGE_FORMAT_ERROR);
		}
		// JSON連想配列を用いてDBに値を登録する
		this.getJsonData(PATH_CREATE_SAVE_TEMPLATE, jsonArray, STR_CREATE);
	}
	
	/**
	 * 関数名：	saveReport
	 * 概要：		日報を登録する
	 * 引数：		なし
	 * 戻り値：	なし
	 * 作成日：	2016/11/23
	 * 作成者：	k.urabe
	 */
	this.saveReport = function() {
		
		var jsonArray = {};								// リクエストに使用するjson連想配列を作成する
		var draftBox = FLAG_ENTRY_STATUS_REG;			// 下書チェックの結果。登録状態をどうするかを格納する。初期値は登録済みとなる
		
		// 見出しが1つでもあるか、空白エリアはないか検証する
		if(this.isCheckFormatIndex() && this.isCheckTextArea) {
			
			// 下書チェックボックスにチャックが付いているか
			if(this.isCheckDraftBox) {
				draftBox = FLAG_ENTRY_STATUS_NOTE;
			}
			
			// リクエスト用JSON連想配列に必要な値をセットする
			// ユーザIDをセット
			jsonArray[KEY_USER_ID] = $(SELECTOR_USER_ID).text();
			// 登録書式を日報のフラグでセット
			jsonArray[KEY_ENTRY_FORMAT] = FLAG_ENTRY_FORMAT_REPORT;
			// 登録状態を登録済み OR 下書でセット
			jsonArray[KEY_ENTRY_STATUS] = draftBox;
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
				// 見出し番号をセット
				jsonArray[index + 1][KEY_NUMBER] = $(this).children(SELECTOR_NUMBER).text();
				// 見出し文字をセット
				jsonArray[index + 1][KEY_INDEX_AREA] = $(this).children(SELECTOR_INDEX_AREA).text();
				// 本文をセット
				jsonArray[index + 1][KEY_MAIN_TEXT] = $(this).children(SELECTOR_MAIN_TEXT).text();
				// 固定IDをセット
				jsonArray[index + 1][KEY_FIXED_ITEM_ID] = $(this).children(SELECTOR_FIXED_ITEM_ID).text();
			});
		} else {
			// 登録できない旨を表示する
			alert(MESSAGE_REPORT_ERROR);
		}
		// 当該コンテンツIDを取得する
		var content_id = $(SELECTOR_CONTENT_ID).text();
		// 画面内にコンテンツIDがあるか検証(存在するなら更新リクエスト)
		if(content_id != "") {
			jsonArray[KEY_CONTENT_ID] = content_id;
			// JSON連想配列を用いてDBに値を更新する
			this.getJsonData(PATH_CREATE_SAVE_CONTENT, jsonArray, STR_UPDATE);
		} else {
			// JSON連想配列を用いてDBに値を登録する
			this.getJsonData(PATH_CREATE_SAVE_CONTENT, jsonArray, STR_CREATE);
		}
		
	}
	
	/**
	 * 関数名：	saveComment
	 * 概要：		コメントを登録する
	 * 引数：		なし
	 * 戻り値：	なし
	 * 作成日：	2016/11/23
	 * 作成者：	k.urabe
	 */
	// TODO:【未実装】saveReportと統合予定
	this.saveComment = function() {
		
		var jsonArray = {};			// リクエストに使用するjson連想配列を作成する
		
		// 見出しが1つでもあるか、空白エリアはないか検証する
		if(this.isCheckFormatIndex() && this.isCheckTextArea) {
			
			// ユーザIDをセット
			jsonArray[index + 1][KEY_USER_ID] = $(SELECTOR_USER_ID).text();
			// 登録書式を日報のフラグでセット
			jsonArray[KEY_ENTRY_FORMAT] = FLAG_ENTRY_FORMAT_COMMENT;
			// 登録状態を登録済み OR 下書でセット
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
				// 見出し番号をセット
				jsonArray[index + 1][KEY_NUMBER] = $(this).children(SELECTOR_NUMBER).text();
				// 見出し文字をセット
				jsonArray[index + 1][KEY_INDEX_AREA] = $(this).children(SELECTOR_INDEX_AREA).text();
				// 本文をセット
				jsonArray[index + 1][KEY_MAIN_TEXT] = $(this).children(SELECTOR_MAIN_TEXT).text();
				// 固定IDをセット
				jsonArray[index + 1][KEY_FIXED_ITEM_ID] = $(this).children(SELECTOR_FIXED_ITEM_ID).text();
			});
		} else {
			// 登録できない旨を表示する
			alert(MESSAGE_COMMENT_ERROR);
		}
		// 当該コンテンツIDを取得する
		var content_id = $(SELECTOR_CONTENT_ID).text();
		// 画面内にコンテンツIDがあるか検証(存在するなら更新リクエスト)
		if(content_id != "") {
			// リクエスト用JSON連想配列にコンテンツIDをセットする
			jsonArray[KEY_CONTENT_ID] = content_id;
			// JSON連想配列を用いてDBに値を更新する
			this.getJsonData(PATH_CREATE_SAVE_CONTENT, jsonArray, STR_UPDATE);
		} else {
			// JSON連想配列を用いてDBに値を登録する
			this.getJsonData(PATH_CREATE_SAVE_CONTENT, jsonArray, STR_CREATE);
		}
		
	}
	
	/**
	 * 関数名：	isCheckFormatIndex
	 * 概要：		コメントを登録する
	 * 引数：		なし
	 * 戻り値：	なし
	 * 作成日：	2016/11/23
	 * 作成者：	k.urabe
	 */
	this.isCheckFormatIndex = function() {
		
		var returnBoolean = false;		// 返却用の変数に初期値としてfalseを格納する
		
		// 画面内の見出し項目が1つ以上あるか検証
		if(1 <= $(SELECTOR_INDEX_AREA).length()) {
			// 見出し項目が存在するため、trueをセット
			returnBoolean = true;
		}
		
		// 判定結果を返す
		return returnBoolean;
		
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
		this.setClickEvent(SELECTOR_B_ADD_INDEX, this.addIndex);
		// フォーマット保存ボタンを登録する
		this.setClickEvent(SELECTOR_B_ADD_TEMPLATE, this.saveFormat);
		// 報告ボタンを登録する
		this.setClickEvent(SELECTOR_B_ADD_REPORT, this.saveReport);
		// キャンセルボタンを登録する
		this.setClickEvent(SELECTOR_B_CANCEL, this.closeWindow);
		// 日付エリアのイベントを登録する
		this.getDayContent();
		
		// 当該コンテンツIDを取得する
		var content_id = $(SELECTOR_CONTENT_ID).text();
		// 画面内にコンテンツIDがあるか検証(存在するなら更新リクエスト)
		if(content_id != "") {
			// リクエスト用JSON連想配列にコンテンツIDをセットする
			jsonArray[KEY_CONTENT_ID] = content_id;
			// JSON連想配列を用いてDBに値を取得する
			this.getJsonData(PATH_CREATE_BY_DAY, jsonArray, STR_READ);
			// 取得したJSONを展開する
			this.createReportDetail(SELECTOR_MAIN);
			// 画面内の所定の位置に取得したコンテンツIDを埋める
			$(SELECTOR_CONTENT_ID).text(this.json[KEY_CONTENT_ID]);
			
			// TODO:【未実装】ボタンの数だけステップが増えるので、別関数検討
			// TODO:【メモ】ボタンの設置は画面初期表示（固定パーツ）と、タグ展開時（流動パーツ）で行う。ここではイベント登録のみ
			// TODO:【メモ】↑ 現在はタグ展開時にボタンの配置までやっていない
			// TODO:【メモ】同じタグの複数箇所に一気にイベント登録しようとしているが、これが可能か不明。場合によってはタグの展開時に1つ1つボタンの展開に合わせてイベント登録が必要かも
			// 追加された項目に付随するボタンイベント等を登録する
			// 見出し削除ボタンのイベントを登録する
			this.setClickEvent(SELECTOR_B_DEL_INDEX, this.deleteIndex);
			// TODO:【未実装】固定機能は共通のイベント登録に渡すための、機能振り分け用の関数を作成するべきか
			// 固定機能（前日予定継承）ボタンのイベントを登録する
			this.setClickEvent(SELECTOR_B_FIXED_BEORE_PLAN, this.getBeforePlan);
			// 固定機能（当日結果継承）ボタンのイベントを登録する
			this.setClickEvent(SELECTOR_B_FIXED_TODAY_RESULT, this.getTodayResult);
			
		}
		
		/**
		 * 関数名：	ViewCommentWindow
		 * 概要：		コメント詳細画面を開いた時の処理
		 * 引数：		なし
		 * 戻り値：	なし
		 * 作成日：	2016/11/24
		 * 作成者：	k.urabe
		 */
		this.ViewCommentWindow = function() {
			
			var jsonArray = {};			// リクエストに使用するjson連想配列を作成する
			
			// 当該コンテンツIDを取得する
			var content_id = $(SELECTOR_CONTENT_ID).text();
			// リクエスト用JSON連想配列にコンテンツIDをセットする
			jsonArray[KEY_CONTENT_ID] = content_id;
			// JSON連想配列を用いてDBに値を取得する
			this.getJsonData(PATH_CREATE, jsonArray, STR_READ);
			// 取得したJSONを展開する
			this.createReportDetail(SELECTOR_MAIN);
			
			// TODO:【未実装】ログインユーザは所定の位置（'.user_id'）に埋め込んでいる想定だが、開かれたコメントの投稿ユーザは取得したJSONデータから取得する必要がある
			// TODO:【未実装】JSONの結果はコメントなので1件しかないが、行ごとに結果が格納されてくる想定で記述
			// ログインユーザとコメントの投稿者が同一人物か検証する
			if($(SELECTOR_TOP_MENU + MARK_SPACE + SELECTOR_USER_ID).text() == this.json[1].user_id) {
				// TODO:【メモ】画面表示時には画面のボタンが全て揃っている想定。そこからユーザ種別ごとにボタンイベント登録と、非表示設定を行う
				// 本人用のボタンイベントを登録する
				
				// 編集ボタンのイベントを登録する
				this.setClickEvent(SELECTOR_B_EDIT, this.prepareAnotherWindow);
				// 削除ボタンのイベントを登録する
				this.setClickEvent(SELECTOR_B_DELETE, this.clickDeleteButton);
				
				// TODO:【未実装】ボタンの非表示は、クラス名に追加付与して、その名称をcssで指定することにより変更する
				// 不要なボタンを非表示にする。
				// 未読にするボタンを非表示にする
				$(SELECTOR_B_NO_READ).addClass(SRT_SHOW_HIDE);
				// いいねボタンを非表示にする。
				$(SELECTOR_B_FAVORITE).addClass(SRT_SHOW_HIDE);
				
			} else {
				// TODO:【メモ】画面表示時には画面のボタンが全て揃っている想定。そこからユーザ種別ごとにボタンイベント登録と、非表示設定を行う
				// 他人用のボタンイベントを登録する
				// 未読にするボタンのイベントを登録する
				this.setClickEvent(SELECTOR_B_NO_READ, this.clickAddContentButton);
				// いいねボタンのイベントを登録する
				this.setClickEvent(SELECTOR_B_FAVORITE, this.clickAddContentButton);
				// コメントするボタンのイベントを登録する
				this.setClickEvent(SELECTOR_B_NEW_COMMENT, this.prepareAnotherWindow);
				
				// TODO:【未実装】ボタンの非表示は、クラス名に追加付与して、その名称をcssで指定することにより変更する
				// 不要なボタンを非表示にする。
				// 編集ボタンを非表示にする
				$(SELECTOR_B_EDIT).addClass(SRT_SHOW_HIDE);
				// 削除ボタンを非表示にする。
				$(SELECTOR_B_DELETE).addClass(SRT_SHOW_HIDE);
			}
			// TODO:【メモ】画面設計上、ボタン名は閉じるだが、他画面との兼ね合い上、クラス名はキャンセルボタンのものを指定する想定
			// 共通のキャンセルボタンを登録する
			this.setClickEvent(SELECTOR_B_CANCEL, this.closeWindow);
			
		}

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
		
		// TODO:【メモ】共通ボタンは初期表示のHTMLに展開されている想定
		// 画面共通のボタンイベント等を登録する
		// コメントボタンを登録する
		this.setClickEvent(SELECTOR_B_ADD_COMMENT, this.saveComment);
		// キャンセルボタンを登録する
		this.setClickEvent(SELECTOR_B_CANCEL, this.closeWindow);
		
		// 当該コンテンツIDを取得する
		var content_id = $(SELECTOR_CONTENT_ID).text();
		// 画面内にコンテンツIDがあるか検証(存在するなら更新リクエスト)
		if(content_id != "") {
			// JSON連想配列にユーザID（ログインユーザ）をセットする
			jsonArray[KEY_USER_ID] = $(SELECTOR_TOP_MENU + MARK_SPACE + SELECTOR_USER_ID).text();
			// 当該日の日付を取得する
			jsonArray[KEY_DATE] = $(SELECTOR_REPORT_DATE).text();
			// リクエスト用JSON連想配列にコンテンツIDをセットする
			jsonArray[KEY_CONTENT_ID] = content_id;
			// JSON連想配列を用いてDBに値を取得する
			this.getJsonData(PATH_CREATE_BY_DAY, jsonArray, STR_READ);
			// 取得したJSONを展開する
			this.createReportDetail(SELECTOR_MAIN);
			// 画面内の所定の位置に取得したコンテンツIDを埋める
			$(SELECTOR_CONTENT_ID).text(this.json[KEY_CONTENT_ID]);
		}
		
	}
	
}

CreateWindowsDetail.prototype = new WindowDesign();
//サブクラスのコンストラクタを有効にする
CreateWindowsDetail.prototype.constructor = WindowDesign;
