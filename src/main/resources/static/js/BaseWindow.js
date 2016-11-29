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
		
		// 引数で受けたセレクタに対してクリックイベントをバインドする
		$(clickTarget).on(CLICK, function() {
			
			// アコーディオン内のレポート詳細が展開済みでなければ
			if($(this).parent(SELECTOR_PARENT_AREA).children(SELECTOR_REPORT_DETAIL).hasClass(SELECTOR_PARENT_AREA)) {
				// データが未展開であるため、データを展開する
				
				// 日報の詳細部分を展開する
				// コンテンツIDをセットする
				jsonArray[KEY_CONTENT_ID] = $(this).parent().children(SELECTOR_CONTENT_ID).text();
				// 登録書式を日報でセットする
				jsonArray[SELECTOR_CONTENT_ID] = FLAG_ENTRY_FORMAT_REPORT;
				// サーバから日報詳細のデータを取得する
				this.getJsonData(PATH_TOP_PAGE_DETAIAL_CONTENT, jsonArray, STR_READ);
				// 取得したデータを展開する
				this.createReportDetail($(this).parent().children(SELECTOR_REPORT_DETAIL));
				
				// コメントの見出し部分を展開する
				// 登録書式を日報でセットする
				jsonArray[SELECTOR_CONTENT_ID] = FLAG_ENTRY_FORMAT_COMMENT;
				// サーバからコメント概要のデータを取得する
				this.getJsonData(PATH_TOP_PAGE_DETAIAL_CONTENT, jsonArray, STR_READ);
				// 取得したデータを展開する
				this.createContentIndex($(this).parent().children(SELECTOR_COMMENT_AREA));
				
				// コメントの詳細部分を展開するcreateCommentDetail
				this.createCommentDetail($(this).parent().children(SELECTOR_COMMENT_AREA).children(SELECTOR_PARENT_AREA));
				
			}
			
			// TODO:【未実装】アコーディオン開く前に、配下にデータが展開済みか確認し、ないならデータを展開する。大元の設計は画面表示時にすべて展開する予定であったが処理の負荷も考え、アコーディオン開く際に行う
			// TODO:【セレクタ】押下された行もしくはボタンを包括するエリア配下のアコーディオン対象を指定しないと、これでは画面全部のアコーディオンが開く
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
	this.writeHtmlAttribute = function(target, detail, addValue) {
		
		// TODO:【セレクタ】targetは行（trタグ）を指定する想定。detailはその中のtdタグの一要素を指定するイメージ
		// TODO:【メモ】textの値そのまま加算できないかも。parseIntなどでステップ踏む必要あり？
		// 引数で受けたセレクタに対して、同じく引数で受けた値を加算する
		$(target + MARK_SPACE + detail).text() + addValue;
		
		// 加算値によってユーザの当該コンテンツの状態を変更する
		// 登録状態への遷移かを検証する
		if(parseInt(addValue)) {
			// 当該コンテンツを登録状態に書き換える
			$(target + MARK_SPACE + SELECTOR_CATEGORY_STATUS).text(FLAG_CATEGORY_STATUS_REG);
		// 削除状態への遷移かを検証する
		} else {
			// 当該コンテンツを削除状態に書き換える
			$(target + MARK_SPACE + SELECTOR_CATEGORY_STATUS).text(FLAG_CATEGORY_STATUS_DEL);
		}
		
	}
	
	/**
	 * 関数名：	changeButtonStatus
	 * 概要：		いいね、未読にするを押下した際に、ボタンの状態を変更する
	 * 引数：		String:target	状態を変更する対象のセレクタ(行単位)
	 * 			String:detail	状態を変更する対象のセレクタ（ボタン）
	 * 戻り値：	なし
	 * 作成日：	2016/11/22
	 * 作成者：	k.urabe
	 */
	this.changeButtonStatus = function(target, detail) {
		
		var contentType;		// 押されたボタンのタイプを格納するための変数
		var categoryStatus;	// 対象となったコンテンツのいいね、もしくは未読状態を格納するための変数
		
		// TODO:【セレクタ】ボタンにはcontentTypeという要素を入れて、その値を機能FLAGにする
		// ボタンに設定されている機能タイプを取得する
		contentType = parseInt($(target + MARK_SPACE + detail[contentType]).val());
		// 対象となったコンテンツの機能登録状態を取得する
		categoryStatus = parseInt($(target + MARK_SPACE + ELECTOR_CATEGORY_STATUS).text());
		// 押下されボタンの機能を検証する（いいねボタンであるか検証する）
		if(FLAG_ADD_CATEGORY_FAVORITE & contentTyp) {
			// いいねが登録状態であるか検証する
			if(FLAG_CATEGORY_STATUS_REG & categoryStatus) {
				// ボタンの画像イメージをいいね登録中のものに変更する
				$(target + MARK_SPACE + detail).attr(KEY_SRC, PATH_FAVORITE_ON);
			// 削除（未登録）状態であるか検証する
			} else {
				// ボタンの画像イメージをいいね削除中（未登録）のものに変更する
				$(target + MARK_SPACE + detail).attr(KEY_SRC, PATH_FAVORITE_OFF);
			}	
		// 押下されボタンの機能を検証する（未読にするボタンであるか検証する）
		} else if(FLAG_ADD_CATEGORY_NOREAD & contentTyp) {
			// 未読機能が登録状態(既読状態)であるか検証する
			if(FLAG_CATEGORY_STATUS_REG & categoryStatus) {
				// ボタンを無効化する
				$(target + MARK_SPACE + detail).prop(KEY_DISABLED, STR_TRUE);
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
	this.openConfirmationDialog = function(func, message, selector) {
		
		// 確認ダイアログを開き、OKが押下されたかを検証する
		if(window.confirm(message)) {
			// OK押下時に引数で受けた関数を実行する
			func(selector);
		} else {
			// キャンセル時は何もしない
		}
		
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
	 * 戻り値：	なし
	 * 作成日：	2016/11/22
	 * 作成者：	k.urabe
	 */
	this.setClickEvent = function(target, func) {
		
		// thisオブジェクトをボタン先の関数で使用できるよう保持する
		var thisElem = this;
		
		// 引数のセレクタでクリックイベントをバインドする
		$(target).on(CLICK, function() {
			
			// コールバック関数を実行する
			func(this, thisElem);
			
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
	this.clickAddContentButton = function(selector) {
		
		var contentId;			// 対象のコンテンツIDを格納
		var add_category;		// 対象の追加種別を格納（いいね、未読にする）
		var category_status;	// 対象の登録状態を格納
		
		// 対象のコンテンツIDを取得
		// TODO:【メモ】引数のselectorはボタンを指している
		contentId = parseInt($($(selector).parent(SELECTOR_PARENT_AREA) + MARK_SPACE + SELECTOR_CONTENT_ID).text());
		// TODO:【セレクタ】ボタンにはcontentTypeという要素を入れて種別の値を入れる、その値を機能FLAGにする
		// ボタンに設定されている追加種別を取得する
		add_category = parseInt($(selector[contentType]).val());
		// 対象の登録状態を取得
		category_status = parseInt($($(selector).parent(SELECTOR_PARENT_AREA) + MARK_SPACE + SELECTOR_CATEGORY_STATUS).text());
		// 取得した各値を処理振り分け用の関数に渡す
		this.addContentBranch(contentId, add_category, category_status, $(selector).parent(SELECTOR_PARENT_AREA));
		
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
	this.addContentBranch = function(contentId, add_category, category_status, selector) {
		
		var jsonArray = {};			// サーバへのリクエスト用JSON連想配列
		var addValue;				// 追加機能の集計数への加算値を格納
		var detail;					// selector内の詳細項目のセレクタ
		
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
			addValue = -1;
		// 押下した時の状態が削除であるかを検証する
		} else if(FLAG_CATEGORY_STATUS_DEL & category_status) {
			// JSON連想配列に更新すべき登録状態をセットする
			jsonArray[KEY_CATEGORY_STATUS] = FLAG_CATEGORY_STATUS_REG;
			// JSON連想配列を用いてDBの値を更新する
			this.getJsonData(PATH_COMMON_SAVE_ADD_CONTENT, jsonArray, STR_UPDATE);
			// 加算値をセットする
			addValue = 1;
		} else {
			// JSON連想配列に更新すべき登録状態をセットする
			jsonArray[KEY_CATEGORY_STATUS] = FLAG_CATEGORY_STATUS_DEL;
			// JSON連想配列を用いてDBの値を登録する
			this.getJsonData(PATH_COMMON_SAVE_ADD_CONTENT, jsonArray, STR_CREATE);
			// 加算値をセットする
			addValue = 1;
		}
		
		// 機能がいいねか検証
		if(FLAG_ADD_CATEGORY_FAVORITE & add_category) {
			// 項目単位のセレクタをセットする
			detail = SELECTOR_FAVORITE_COUNT;
		// 機能が未読にするか検証
		} else if(FLAG_ADD_CATEGORY_NOREAD & add_category) {
			// 項目単位のセレクタをセットする
			detail = SELECTOR_READ_COUNT;
		}
		
		// TODO:【セレクタ】行単位は引数でまかなえるが、項目単位のセレクタを判定する必要がある
		// 更新状態に合わせて、集計数を更新する
		this.writeHtmlAttribute(selector, detail, addValue);
		// 更新状態に合わせて、ボタンの状態を更新する
		this.changeButtonStatus(selector, detail);
		
	}
	
	/**
	 * 関数名：	clickDeleteButton
	 * 概要：		削除ボタンが押下された際の処理
	 * 引数：		object:selector		押下されたボタンのセレクタ
	 * 戻り値：	なし
	 * 作成日：	2016/11/22
	 * 作成者：	k.urabe
	 */
	this.clickDeleteButton = function(selector) {
		
		var jsonArray = {};			// サーバへのリクエスト用JSON連想配列
		var content_id;				// 対象のコンテンツIDを格納
		var entry_status;			// 対象の登録状態を格納
		
		// 対象のコンテンツIDを取得
		// TODO:【メモ】引数のselectorはボタンを指している
		contentId = parseInt($($(selector).parent(SELECTOR_PARENT_AREA) + MARK_SPACE + SELECTOR_CONTENT_ID).text());
		// 対象の登録状態を取得
		category_status = parseInt($($(selector).parent(SELECTOR_PARENT_AREA) + MARK_SPACE + SELECTOR_ENTRY_STATUS).text());
		// JSON連想配列にコンテンツIDをセットする
		jsonArray[KEY_CONTENT_ID] = content_id;
		
		// 当該コンテンツの状態が登録であるか検証する
		if(FLAG_ENTRY_STATUS_REG & category_status) {
			// JSON連想配列に更新する登録状態をセットする
			jsonArray[KEY_ENTRY_STATUS] = FLAG_ENTRY_STATUS_DEL;
			// JSON連想配列を用いてDBの値を更新する
			this.getJsonData(PATH_CREATE_DELETE_CONTENT, jsonArray, STR_UPDATE);
		// 当該コンテンツの状態が下書であるか検証する
		} else if(FLAG_ENTRY_STATUS_NOTE & category_status) {
			// JSON連想配列を用いてDBのレコードを削除する
			this.getJsonData(PATH_CREATE_DELETE_CONTENT, jsonArray, STR_DELETE);
		}
		
		// 一覧を再描画する
		this.clickSearchButton();
		
	}
	
	/**
	 * 関数名：	prepareAnotherWindow
	 * 概要：		別ウインドウを開く準備処理
	 * 引数：		object:selector		押下されたボタンのセレクタ
	 * 戻り値：	なし
	 * 作成日：	2016/11/22
	 * 作成者：	k.urabe
	 */
	this.prepareAnotherWindow = function(selector) {
		
		var parent_content_id;		// 対象の親コンテンツIDを格納
		var content_id;				// 対象のコンテンツIDを格納
		var button_type;			// 押下されたボタンのタイプを格納
		var path;					// リクエストのpathを格納
		
		// 対象の親コンテンツIDを取得
		// TODO:【メモ】引数のselectorはボタンを指している
		parent_content_id = parseInt($($(selector).parent(SELECTOR_PARENT_AREA) + MARK_SPACE + SELECTOR_PARENT_CONTENT_ID).text());
		// 対象のコンテンツIDを取得
		// TODO:【メモ】引数のselectorはボタンを指している
		contentId = parseInt($($(selector).parent(SELECTOR_PARENT_AREA) + MARK_SPACE + SELECTOR_CONTENT_ID).text());
		// 押下されたボタンのタイプを取得
		// TODO:【セレクタ】ボタンのname属性にはボタンの機能を表す名称をセットする。名称は定数クラスを参照
		button_type = $(selector[name]).val();
		
		// TODO:【未実装】以下の条件判定を別関数へ定義検討
		// 取得したボタンの種類によってリクエストのpathを判定する
		// 日報作成画面ならば
		if(button_type === KEY_NEW_REPORT_CREATE) {
			// 日報作成画面のpathをセットする
			path = PATH_REPORT_CREATE;
		// コメント作成画面ならば
		} else if(button_type === KEY_NEW_COMMENT_CREATE) {
			// コメント作成画面のpathをセットする
			path = PATH_COMMENT_CREATE;
		} else {
			// コメント詳細画面のpathをセットする
			path = PATH_COMMENT_VIEW;
			// 対象のコメントを既読にする
			this.addContentBranch(content_id, FLAG_ADD_CATEGORY_NOREAD, FLAG_CATEGORY_STATUS_DEL, selector);
		}
		
		// TODO:【未実装】HTMLをサーバから取得せず、openAnotherWindow関数から直接URLを指定する形にする方が、URLも取得できて、後続の処理が繋がると考えられる。
		// HTML文字列を取得する
		this.getHtmlData(path);
		
		// TODO:【未実装】以下の2ステップについて。無理矢理埋めているが、別ウインドウに渡すスマートな方法を考える
		// 取得したHTML文字列に親コンテンツIDを埋める
		this.dom += (TAG_NEW_PAGE_PARENT_CONTENT_ID + parent_content_id + TAG_DIV_END);
		// 取得したHTML文字列にコンテンツIDを埋める
		this.dom += (TAG_NEW_PAGE_CONTENT_ID + content_id + TAG_DIV_END);
		
		// 取得したHTMLで別ウインドウを開く
		this.openAnotherWindow(this.dom);
		
	}
	
	
	
	
}